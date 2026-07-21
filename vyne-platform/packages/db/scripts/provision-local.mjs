// M3-1 local provisioning — synthetic demonstration accounts ONLY (DL-2026-003).
// Creates real GoTrue auth users via the admin API and matching public.users
// rows via the owner connection (provisioning is VYNE-initiated; no signup,
// no email — M3_plan §2.2). Idempotent: safe to re-run after any
// `supabase db reset` or real-stack test run (both wipe public.users).
// Keys are read from `supabase status` at runtime — nothing here is a secret
// and no hosted credential is ever involved.
//
// Usage (from packages/db, with the stack running):
//   npm run provision          — idempotent: creates missing accounts, keeps
//                                existing passwords/ceremony state
//   npm run demo:reset         — founder direction 2026-07-20: regenerates every
//                                demo account from scratch (deletes + recreates
//                                the GoTrue user), restoring temporary passwords
//                                and the fresh first-login onboarding state
//
// NOTE (M3-2): the advisor account gets its advisor_accounts mapping in M4
// when advisor records exist; Studio sign-in works without it.

import { execFileSync } from "node:child_process";
import pg from "pg";

const ACCOUNTS = [
  { email: "demo.founder@synthetic.vyne.test",   password: "VYNE-demo-founder-2026",   full_name: "Demo Founder (Synthetic)",   role: "founder" },
  { email: "demo.recruiter@synthetic.vyne.test", password: "VYNE-demo-recruiter-2026", full_name: "Demo Recruiter (Synthetic)", role: "recruiter" },
  { email: "demo.advisor@synthetic.vyne.test",   password: "VYNE-demo-advisor-2026",   full_name: "Demo Advisor (Synthetic)",   role: "advisor" },
  // Fresh internal account for reviewing the A1 first-login ceremony
  // (password rotation now; MFA enrollment joins it later in M3-2).
  { email: "demo.recruiter2@synthetic.vyne.test", password: "VYNE-temp-recruiter2-2026", full_name: "Demo Recruiter Two (Synthetic)", role: "recruiter" },
];

function stackEnv() {
  const raw = execFileSync("npx", ["supabase", "status", "-o", "env"], {
    shell: process.platform === "win32",
  }).toString();
  const get = (name) => {
    const m = raw.match(new RegExp(`^${name}="([^"]+)"`, "m"));
    if (!m) throw new Error(`supabase status did not report ${name} — is the stack running?`);
    return m[1];
  };
  return { apiUrl: get("API_URL"), serviceKey: get("SERVICE_ROLE_KEY"), dbUrl: get("DB_URL") };
}

async function admin(env, pathname, init = {}) {
  const res = await fetch(`${env.apiUrl}${pathname}`, {
    ...init,
    headers: {
      apikey: env.serviceKey,
      Authorization: `Bearer ${env.serviceKey}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`${init.method ?? "GET"} ${pathname} -> ${res.status}: ${await res.text()}`);
  return res.json();
}

async function findAuthUserByEmail(env, email) {
  const page = await admin(env, "/auth/v1/admin/users?page=1&per_page=1000");
  return (page.users ?? []).find((u) => u.email === email);
}

async function upsertAuthUser(env, account) {
  const existing = await findAuthUserByEmail(env, account.email);
  if (existing) {
    await admin(env, `/auth/v1/admin/users/${existing.id}`, {
      method: "PUT",
      body: JSON.stringify({ password: account.password, email_confirm: true }),
    });
    return existing.id;
  }
  // A1 ceremony: newly provisioned accounts carry the server-controlled
  // rotation flag; the app blocks every surface until the password is changed.
  // (Existing accounts keep their state on idempotent re-runs.)
  const created = await admin(env, "/auth/v1/admin/users", {
    method: "POST",
    body: JSON.stringify({
      email: account.email,
      password: account.password,
      email_confirm: true,
      app_metadata: { password_rotated: false },
    }),
  });
  return created.id;
}

const RESET = process.argv.includes("--reset");
const env = stackEnv();
const db = new pg.Client({ connectionString: env.dbUrl });
await db.connect();

if (RESET) {
  for (const account of ACCOUNTS) {
    const existing = await findAuthUserByEmail(env, account.email);
    if (existing) {
      // public.users.auth_id references auth.users: remove referencing rows
      // first (owner context; synthetic demo data only) or GoTrue's delete
      // fails with a foreign-key violation.
      await db.query(
        "delete from public.advisor_accounts where user_id in (select id from public.users where auth_id = $1)",
        [existing.id],
      );
      await db.query("delete from public.users where auth_id = $1", [existing.id]);
      await admin(env, `/auth/v1/admin/users/${existing.id}`, { method: "DELETE" });
      console.log(`reset: removed ${account.email}`);
    }
  }
}

for (const account of ACCOUNTS) {
  const authId = await upsertAuthUser(env, account);
  await db.query(
    `insert into public.users (auth_id, email, full_name, role)
     values ($1, $2, $3, $4)
     on conflict (email) do update
       set auth_id = excluded.auth_id, full_name = excluded.full_name,
           role = excluded.role, status = 'active', deleted_at = null`,
    [authId, account.email, account.full_name, account.role],
  );
  console.log(`provisioned ${account.role.padEnd(9)} ${account.email}`);
}

await db.end();
console.log("\nSynthetic demo accounts ready (passwords are demonstration values, local only).");
