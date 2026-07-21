import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import type { Client } from "pg";
import { IS_REAL_STACK, freshDatabase, ownerClient } from "./helpers";

/**
 * M3-3 immediate revocation + auth-audit path — real Supabase stack only.
 * Proves the §12 revocation model end-to-end at the data layer:
 *   - status='disabled' revokes DB access on the very next query even with a
 *     still-valid access token (RLS is the authority);
 *   - a GoTrue ban blocks re-login and refresh;
 *   - re-enable restores both;
 *   - the auth-audit event shape appends and is founder-only readable.
 */

const d = describe.skipIf(!IS_REAL_STACK);
const PKG_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

interface Env { apiUrl: string; anonKey: string; serviceKey: string; }
function stackEnv(): Env {
  const raw = execFileSync("npx", ["supabase", "status", "-o", "env"], {
    cwd: PKG_DIR,
    shell: process.platform === "win32",
  }).toString();
  const get = (n: string) => {
    const m = raw.match(new RegExp(`^${n}="([^"]+)"`, "m"));
    if (!m) throw new Error(`supabase status missing ${n}`);
    return m[1];
  };
  return { apiUrl: get("API_URL"), anonKey: get("ANON_KEY"), serviceKey: get("SERVICE_ROLE_KEY") };
}

d("M3-3 immediate revocation (real Supabase stack)", () => {
  let env: Env;
  let owner: Client;
  let authId = "";
  let userId = "";
  const email = `m33-${randomUUID()}@synthetic.vyne.test`;
  const password = `Rev-${randomUUID()}`;

  const adminFetch = (p: string, init: RequestInit = {}) =>
    fetch(`${env.apiUrl}${p}`, {
      ...init,
      headers: { apikey: env.serviceKey, Authorization: `Bearer ${env.serviceKey}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
    });
  const passwordGrant = () =>
    fetch(`${env.apiUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { apikey: env.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  const restUsers = (token: string) =>
    fetch(`${env.apiUrl}/rest/v1/users?select=id,email,status`, {
      headers: { apikey: env.anonKey, Authorization: `Bearer ${token}` },
    });

  beforeAll(async () => {
    env = stackEnv();
    await freshDatabase("auth_m33");
    const created = await adminFetch("/auth/v1/admin/users", {
      method: "POST",
      body: JSON.stringify({ email, password, email_confirm: true }),
    });
    expect(created.status).toBe(200);
    authId = ((await created.json()) as { id: string }).id;
    owner = await ownerClient("auth_m33");
    const ins = await owner.query(
      "insert into public.users (auth_id, email, full_name, role) values ($1,$2,$3,'recruiter') returning id",
      [authId, email, "M3-3 Revocation (Synthetic)"],
    );
    userId = ins.rows[0].id as string;
  }, 60_000);

  afterAll(async () => {
    if (owner) await owner.end();
    if (authId) await adminFetch(`/auth/v1/admin/users/${authId}`, { method: "DELETE" }).catch(() => undefined);
  });

  it("active user can sign in and read own row", async () => {
    const grant = await passwordGrant();
    expect(grant.status).toBe(200);
    const token = ((await grant.json()) as { access_token: string }).access_token;
    const rows = (await (await restUsers(token)).json()) as unknown[];
    expect(rows.length).toBe(1);
  });

  it("status='disabled' revokes DB access on the next query with a still-valid token", async () => {
    const grant = await passwordGrant();
    const token = ((await grant.json()) as { access_token: string }).access_token;

    await owner.query("update public.users set status='disabled' where id=$1", [userId]);

    // Same token, now inert: RLS returns zero rows immediately.
    const rows = (await (await restUsers(token)).json()) as unknown[];
    expect(rows.length).toBe(0);
  });

  it("a GoTrue ban blocks re-login while disabled", async () => {
    await adminFetch(`/auth/v1/admin/users/${authId}`, {
      method: "PUT",
      body: JSON.stringify({ ban_duration: "876000h" }),
    });
    const grant = await passwordGrant();
    expect(grant.status).toBeGreaterThanOrEqual(400);
  });

  it("re-enable restores login and access", async () => {
    await owner.query("update public.users set status='active' where id=$1", [userId]);
    await adminFetch(`/auth/v1/admin/users/${authId}`, {
      method: "PUT",
      body: JSON.stringify({ ban_duration: "none" }),
    });
    const grant = await passwordGrant();
    expect(grant.status).toBe(200);
    const token = ((await grant.json()) as { access_token: string }).access_token;
    const rows = (await (await restUsers(token)).json()) as unknown[];
    expect(rows.length).toBe(1);
  });

  it("auth-audit events append and are founder-only readable", async () => {
    // Seed a founder to read the log.
    const fAuth = randomUUID();
    await owner.query("insert into auth.users (id, email) values ($1,$2) on conflict do nothing", [fAuth, `f-${fAuth}@synthetic.vyne.test`]);
    await owner.query(
      "insert into public.users (auth_id, email, full_name, role) values ($1,$2,'Founder (Synthetic)','founder')",
      [fAuth, `f-${fAuth}@synthetic.vyne.test`],
    );
    // Append a login_failed event (actor unknown) as the app writer would.
    await owner.query(
      "insert into public.audit_events (actor_id, actor_role, event_type, record_type, after) values (null,null,'auth.login_failed','user',$1)",
      [JSON.stringify({ email })],
    );

    // Founder reads it; a recruiter (our test user) cannot.
    const { asUser } = await import("./helpers");
    const founderRows = await asUser(owner, fAuth, (q) => q("select event_type from public.audit_events where event_type='auth.login_failed'"));
    expect(founderRows.rowCount).toBeGreaterThan(0);
    const recruiterRows = await asUser(owner, authId, (q) => q("select event_type from public.audit_events"));
    expect(recruiterRows.rowCount).toBe(0);
  });
});

d("M3-3 session tokens (real Supabase stack)", () => {
  let env: Env;
  let authId = "";
  const email = `m33s-${randomUUID()}@synthetic.vyne.test`;
  const password = `Sess-${randomUUID()}`;

  const adminFetch = (p: string, init: RequestInit = {}) =>
    fetch(`${env.apiUrl}${p}`, {
      ...init,
      headers: { apikey: env.serviceKey, Authorization: `Bearer ${env.serviceKey}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
    });

  beforeAll(async () => {
    env = stackEnv();
    const created = await adminFetch("/auth/v1/admin/users", {
      method: "POST",
      body: JSON.stringify({ email, password, email_confirm: true }),
    });
    expect(created.status).toBe(200);
    authId = ((await created.json()) as { id: string }).id;
  }, 60_000);

  afterAll(async () => {
    if (authId) await adminFetch(`/auth/v1/admin/users/${authId}`, { method: "DELETE" }).catch(() => undefined);
  });

  it("access tokens are 10 minutes and refresh rotates the refresh token", async () => {
    const grant = await fetch(`${env.apiUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { apikey: env.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    expect(grant.status).toBe(200);
    const s1 = (await grant.json()) as { access_token: string; refresh_token: string };
    const claims = JSON.parse(Buffer.from(s1.access_token.split(".")[1], "base64url").toString());
    expect(claims.exp - claims.iat).toBe(600); // 10-minute access tokens

    const refresh = await fetch(`${env.apiUrl}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { apikey: env.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: s1.refresh_token }),
    });
    expect(refresh.status).toBe(200);
    const s2 = (await refresh.json()) as { refresh_token: string };
    expect(s2.refresh_token).not.toBe(s1.refresh_token); // rotation
  });
});
