import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import type { Client } from "pg";
import { IS_REAL_STACK, freshDatabase, ownerClient } from "./helpers";

/**
 * M3-1 auth integration tests — real Supabase stack ONLY (GoTrue is not
 * emulatable; ADR-001). Skipped entirely in shim mode. Verifies:
 *   - admin-provisioned user can sign in with email+password (real GoTrue);
 *   - the 0008 access-token hook embeds `user_role` from public.users;
 *   - 10-minute access tokens (config: jwt_expiry = 600);
 *   - wrong password vs. nonexistent account are indistinguishable (§4.1);
 *   - public signups are disabled (admin-provisioned accounts only).
 * Keys are read from `supabase status` at runtime — never committed.
 */

const d = describe.skipIf(!IS_REAL_STACK);

const PKG_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

interface StackEnv {
  apiUrl: string;
  anonKey: string;
  serviceKey: string;
}

function stackEnv(): StackEnv {
  const raw = execFileSync("npx", ["supabase", "status", "-o", "env"], {
    cwd: PKG_DIR,
    shell: process.platform === "win32",
  }).toString();
  const get = (name: string): string => {
    const m = raw.match(new RegExp(`^${name}="([^"]+)"`, "m"));
    if (!m) throw new Error(`supabase status did not report ${name}`);
    return m[1];
  };
  return { apiUrl: get("API_URL"), anonKey: get("ANON_KEY"), serviceKey: get("SERVICE_ROLE_KEY") };
}

function decodeJwtPayload(token: string): Record<string, unknown> {
  const payload = token.split(".")[1];
  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Record<string, unknown>;
}

d("M3-1 authentication backbone (real Supabase stack)", () => {
  let env: StackEnv;
  let owner: Client;
  let authUserId = "";
  const email = `m3test-${randomUUID()}@synthetic.vyne.test`;
  const password = `Synthetic-${randomUUID()}`;

  async function adminFetch(pathname: string, init: RequestInit = {}): Promise<Response> {
    return fetch(`${env.apiUrl}${pathname}`, {
      ...init,
      headers: {
        apikey: env.serviceKey,
        Authorization: `Bearer ${env.serviceKey}`,
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    });
  }

  async function passwordGrant(grantEmail: string, grantPassword: string): Promise<Response> {
    return fetch(`${env.apiUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { apikey: env.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email: grantEmail, password: grantPassword }),
    });
  }

  beforeAll(async () => {
    env = stackEnv();
    await freshDatabase("auth_m3"); // real mode: reset + re-apply committed migrations
    const created = await adminFetch("/auth/v1/admin/users", {
      method: "POST",
      body: JSON.stringify({ email, password, email_confirm: true }),
    });
    expect(created.status).toBe(200);
    authUserId = ((await created.json()) as { id: string }).id;
    owner = await ownerClient("auth_m3");
    await owner.query(
      "insert into public.users (auth_id, email, full_name, role) values ($1, $2, $3, 'recruiter')",
      [authUserId, email, "M3 Test Recruiter (Synthetic)"],
    );
  }, 60_000);

  afterAll(async () => {
    if (owner) {
      await owner.query("delete from public.users where auth_id = $1", [authUserId]).catch(() => undefined);
      await owner.end();
    }
    if (authUserId) {
      await adminFetch(`/auth/v1/admin/users/${authUserId}`, { method: "DELETE" }).catch(() => undefined);
    }
  });

  it("signs in with email+password and receives a 10-minute JWT carrying user_role", async () => {
    const res = await passwordGrant(email, password);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { access_token: string; refresh_token: string };
    expect(body.refresh_token).toBeTruthy();
    const claims = decodeJwtPayload(body.access_token);
    expect(claims.user_role).toBe("recruiter"); // 0008 hook
    expect((claims.exp as number) - (claims.iat as number)).toBe(600); // 10-min tokens
  });

  it("wrong password and nonexistent account fail identically (no existence leak)", async () => {
    const wrongPw = await passwordGrant(email, "definitely-not-the-password");
    const noAccount = await passwordGrant(`absent-${randomUUID()}@synthetic.vyne.test`, "irrelevant");
    expect(wrongPw.status).toBeGreaterThanOrEqual(400);
    expect(noAccount.status).toBe(wrongPw.status);
    const a = (await wrongPw.json()) as Record<string, unknown>;
    const b = (await noAccount.json()) as Record<string, unknown>;
    expect(b.error_code).toBe(a.error_code); // same machine-readable failure
    expect(b.msg).toBe(a.msg); // same human-readable message
  });

  it("public signup is disabled — accounts are admin-provisioned only", async () => {
    const res = await fetch(`${env.apiUrl}/auth/v1/signup`, {
      method: "POST",
      headers: { apikey: env.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email: `signup-${randomUUID()}@synthetic.vyne.test`, password: "Sup3r-long-enough" }),
    });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});

d("M3-2 forced password rotation — A1 ceremony backbone (real Supabase stack)", () => {
  let env: StackEnv;
  let authUserId = "";
  const email = `m3rotate-${randomUUID()}@synthetic.vyne.test`;
  const tempPassword = `Temp-${randomUUID()}`;
  const newPassword = `Chosen-${randomUUID()}`;

  async function adminFetch(pathname: string, init: RequestInit = {}): Promise<Response> {
    return fetch(`${env.apiUrl}${pathname}`, {
      ...init,
      headers: {
        apikey: env.serviceKey,
        Authorization: `Bearer ${env.serviceKey}`,
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    });
  }

  async function passwordGrant(grantPassword: string): Promise<Response> {
    return fetch(`${env.apiUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { apikey: env.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: grantPassword }),
    });
  }

  beforeAll(async () => {
    env = stackEnv();
    const created = await adminFetch("/auth/v1/admin/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        password: tempPassword,
        email_confirm: true,
        app_metadata: { password_rotated: false },
      }),
    });
    expect(created.status).toBe(200);
    authUserId = ((await created.json()) as { id: string }).id;
  }, 60_000);

  afterAll(async () => {
    if (authUserId) {
      await adminFetch(`/auth/v1/admin/users/${authUserId}`, { method: "DELETE" }).catch(() => undefined);
    }
  });

  it("provisioned session carries the unrotated flag, and the user cannot clear it themselves", async () => {
    const grant = await passwordGrant(tempPassword);
    expect(grant.status).toBe(200);
    const { access_token } = (await grant.json()) as { access_token: string };
    const claims = decodeJwtPayload(access_token);
    expect((claims.app_metadata as Record<string, unknown>).password_rotated).toBe(false);

    // Self-service update may not touch app_metadata (server-controlled).
    const attack = await fetch(`${env.apiUrl}/auth/v1/user`, {
      method: "PUT",
      headers: { apikey: env.anonKey, Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ app_metadata: { password_rotated: true } }),
    });
    const after = await adminFetch(`/auth/v1/admin/users/${authUserId}`);
    const record = (await after.json()) as { app_metadata: Record<string, unknown> };
    expect(attack.status).toBeLessThan(500);
    expect(record.app_metadata.password_rotated).toBe(false); // flag survived the attempt
  });

  it("user sets a new password; admin clears the flag; old credential dies, new one carries flag=true", async () => {
    const grant = await passwordGrant(tempPassword);
    expect(grant.status).toBe(200);
    const { access_token } = (await grant.json()) as { access_token: string };

    const change = await fetch(`${env.apiUrl}/auth/v1/user`, {
      method: "PUT",
      headers: { apikey: env.anonKey, Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword }),
    });
    expect(change.status).toBe(200);

    const clear = await adminFetch(`/auth/v1/admin/users/${authUserId}`, {
      method: "PUT",
      body: JSON.stringify({ app_metadata: { password_rotated: true } }),
    });
    expect(clear.status).toBe(200);

    const oldGrant = await passwordGrant(tempPassword);
    expect(oldGrant.status).toBeGreaterThanOrEqual(400); // temporary credential is dead

    const newGrant = await passwordGrant(newPassword);
    expect(newGrant.status).toBe(200);
    const claims = decodeJwtPayload(((await newGrant.json()) as { access_token: string }).access_token);
    expect((claims.app_metadata as Record<string, unknown>).password_rotated).toBe(true);
  });
});
