// M3-3 immediate revocation — founder-run admin action (synthetic/local only).
//   node scripts/set-user-status.mjs <email> disabled   # revoke access now
//   node scripts/set-user-status.mjs <email> active      # restore access
//
// Disable performs the full §12 revocation: sets public.users.status='disabled'
// (RLS kills every DB path on the next query — M2-verified) AND bans the GoTrue
// user (invalidates refresh tokens + blocks re-login; short 10-min access
// tokens bound any residual window). Writes user.disabled + auth.session_revoked
// audit events. Enable reverses both.

import { execFileSync } from "node:child_process";
import pg from "pg";

const [email, status] = process.argv.slice(2);
if (!email || (status !== "disabled" && status !== "active")) {
  console.error("usage: set-user-status.mjs <email> <disabled|active>");
  process.exit(2);
}

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

const env = stackEnv();
const db = new pg.Client({ connectionString: env.dbUrl });
await db.connect();

const found = await db.query("select id, auth_id, role from public.users where email = $1", [email]);
if (found.rowCount === 0) {
  console.error(`no public.users row for ${email}`);
  process.exit(1);
}
const { id: userId, auth_id: authId, role } = found.rows[0];

await db.query("update public.users set status = $1 where id = $2", [status, userId]);

// GoTrue: ban to revoke sessions + block re-login; 'none' restores.
await admin(env, `/auth/v1/admin/users/${authId}`, {
  method: "PUT",
  body: JSON.stringify({ ban_duration: status === "disabled" ? "876000h" : "none" }),
});

if (status === "disabled") {
  for (const eventType of ["user.disabled", "auth.session_revoked"]) {
    await db.query(
      `insert into public.audit_events (actor_id, actor_role, event_type, record_type, record_id, after)
       values ($1, 'founder', $2, 'user', $1, $3)`,
      [userId, eventType, JSON.stringify({ email, role, by: "admin-script" })],
    );
  }
}

await db.end();
console.log(`${email} -> ${status}${status === "disabled" ? " (RLS revoked + GoTrue banned + audited)" : " (restored)"}`);
