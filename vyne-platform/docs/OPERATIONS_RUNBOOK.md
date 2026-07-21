# VYNE Operations Runbook

Practical, copy-pasteable procedures for running the VYNE platform locally
(EA-001: local, synthetic-data-only). All commands run from `vyne-platform/`
unless a path is given. Windows PowerShell shown; bash equivalents noted where
they differ.

**Prerequisites:** Node 20+ · Docker Desktop (WSL2 backend) · `psql` 16+ client
on PATH · Supabase CLI via `npx supabase`. See `docs/SETUP.md`.

---

## 1. Local development checklist

Start-of-session, in order:

1. **Docker Desktop running?** `docker info` (or launch Docker Desktop, wait for
   "Engine running").
2. **Stack up?** `cd packages/db && npx supabase start` (first run pulls images).
3. **Sanity:** `npm install && npx turbo run build typecheck` → expect 9/9.
4. **Demo accounts:** `cd packages/db && npm run demo:reset`.
5. **Apps:** `npm run dev` (OS :3000, Studio :3001) or per app.
6. **Design system reference:** `http://localhost:3000/design-system`.
7. **Mail (password resets):** Mailpit at `http://127.0.0.1:54324`.

Real-stack tests: `cd packages/db` then `$env:VYNE_REAL_STACK="1"; npx vitest run`
(bash: `npm run test:real`). Ensure `psql` bin is on PATH first.

---

## 2. Local setup (first time)

```powershell
git clone https://github.com/mgdavies10-dot/ar-brief-automation.git
cd ar-brief-automation ; git checkout claude/vyne-ea-001-vertical-slice-xly1ws
cd vyne-platform ; npm install
cd packages/db ; npx supabase init   # if supabase/config.toml absent; leave migrations/ & rollbacks/ untouched
npx supabase start
```
Create untracked `apps/os/.env.local` and `apps/studio/.env.local` with
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
`SUPABASE_SERVICE_ROLE_KEY` from `npx supabase status -o env`. Never commit them.

---

## 3. User administration

**Provision the synthetic demo users** (`cd packages/db`):
```powershell
npm run provision       # idempotent: create missing, keep existing state
```
Accounts: `demo.founder@`, `demo.recruiter@`, `demo.recruiter2@` (internal),
`demo.advisor@` — all `@synthetic.vyne.test`. Temp passwords in
`scripts/provision-local.mjs`.

**Disable / enable a user (immediate revocation):**
```powershell
npm run user:status demo.recruiter@synthetic.vyne.test disabled   # revoke now
npm run user:status demo.recruiter@synthetic.vyne.test active     # restore
```
Disable sets `status='disabled'` (RLS denies every path on the next query, even
with a valid token) + bans the GoTrue user (blocks refresh/re-login) + writes
`user.disabled` / `auth.session_revoked` audit events.

**Real user provisioning (future):** VYNE-initiated only — no self-signup. The
provisioning script pattern (admin create + `public.users` row + forced
first-login ceremony) is the template.

---

## 4. Password resets

**User-facing (R1):** sign-in page → "Forgot your password?" → enter email →
open the email in **Mailpit** (`http://127.0.0.1:54324`) → follow the link →
set a new password → sign in. Nothing leaves the machine.

**Admin backup (no email):** issue a recovery link directly —
```powershell
# from packages/db; needs SERVICE_ROLE_KEY from `npx supabase status -o env`
# POST /auth/v1/admin/generate_link { "type":"recovery", "email":"<addr>" }
```
The response `hashed_token` opens `http://localhost:3000/reset/update?token_hash=<hashed_token>&type=recovery`.

---

## 5. Demo account management

```powershell
cd packages/db
npm run demo:reset      # wipe + recreate ALL demo users, fresh first-login state
npm run provision       # create only missing accounts (non-destructive)
```
Use `demo:reset` whenever accounts drift (consumed temp passwords, mid-ceremony,
disabled). It removes the referencing `public.users` rows before deleting each
GoTrue user, then recreates them.

---

## 6. Rotate secrets

Local dev uses the Supabase CLI's **well-known default** keys (not secrets; safe
to be in `.env.local`, never committed). To rotate for a real deployment (out of
EA-001 scope): regenerate the JWT secret + keys in the hosted project, update the
untracked env files, restart apps. Never place real keys in the repo; `.env*`
stays untracked (`.env.example` placeholders only).

---

## 7. Recover the local environment

Symptoms → fix, in order of likelihood:

1. **Tests skip / "connection refused" on 54322, or `supabase status` errors
   about the Docker pipe** → **Docker Desktop stopped.** Launch it, wait for
   "Engine running", then `cd packages/db && npx supabase start`.
2. **App shows "missing NEXT_PUBLIC…"** → `.env.local` absent/stale. Rewrite from
   `npx supabase status -o env`.
3. **App 500 / stale bundle** → a lingering dev server on the port. Stop it
   (see §8) and restart `npm run dev`.
4. **Auth flows fail after a `db reset` or test run** → `npm run demo:reset`.
5. **Nuclear:** `npx supabase stop` then `npx supabase start` (preserves the
   data volume), then `npm run demo:reset`.

---

## 8. Docker troubleshooting

- **Engine not running:** launch Docker Desktop; `docker info` should print a
  server version. On Windows it needs the **WSL2** backend
  (`wsl --install --no-distribution`, admin + reboot, if WSL is absent).
- **`docker` not on PATH:** use `"C:\Program Files\Docker\Docker\resources\bin\docker.exe"`.
- **Transient image-pull "rate exceeded":** the Supabase CLI retries; re-run
  `npx supabase start`.
- **Kill a stuck port (dev server):**
  ```powershell
  Get-NetTCPConnection -LocalPort 3000 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
  ```

---

## 9. Supabase troubleshooting

- **`supabase status` / start fails** → Docker down (see §8), or a bad
  `config.toml` edit (the CLI prints the offending key). Note: `content_path`
  values resolve from the CLI working directory (`packages/db`), e.g.
  `./supabase/templates/recovery.html`.
- **Config change not taking effect** → `npx supabase stop && npx supabase start`
  (some settings need a container recreate).
- **DB reachable?** `psql -h 127.0.0.1 -p 54322 -U postgres -d postgres -c "select 1"`
  (password `postgres`).
- **Studio (DB UI):** `http://127.0.0.1:54323`.

---

## 10. Mailpit (local email capture)

- **UI/API:** `http://127.0.0.1:54324`. All app email is captured here, never
  sent. Used for password-reset links.
- **List messages:** `GET /api/v1/messages` · **read one:** `GET /api/v1/message/{id}`
  · **clear all:** `DELETE /api/v1/messages`.

---

## 11. Database reset procedures

```powershell
cd packages/db
npx supabase db reset   # recreate DB, re-apply committed migrations 0001..N in order
```
This drops and rebuilds `public`; it does **not** touch Supabase's own
`auth`/`storage` schemas. Re-run `npm run demo:reset` afterward to restore demo
users. The committed migrations are the source of truth — never edit them to
"fix" state; add a new migration.

**Rollbacks:** every migration has a paired down script in `supabase/rollbacks/`;
the real-stack test harness applies the full down-chain and re-applies to verify.

---

## 12. Backups

- **Local dev:** state lives in the Docker volume; `supabase stop` backs it up
  ("Local data are backed up to docker volume"). Demo data is synthetic and
  reproducible via `npm run demo:reset`, so local backups are rarely needed.
- **Production (out of EA-001 scope):** Architecture §12 specifies daily
  automated backups + weekly restore test in staging — to be set up with hosting.

---

## Appendix — quick command reference

| Task | Command (from `vyne-platform/`) |
|---|---|
| Start stack | `cd packages/db && npx supabase start` |
| Stop stack | `cd packages/db && npx supabase stop` |
| Build + typecheck | `npx turbo run build typecheck` |
| Real-stack tests | `cd packages/db` → `$env:VYNE_REAL_STACK="1"; npx vitest run` |
| Provision demo users | `cd packages/db && npm run provision` |
| Reset demo users | `cd packages/db && npm run demo:reset` |
| Disable / enable user | `cd packages/db && npm run user:status <email> disabled\|active` |
| DB reset | `cd packages/db && npx supabase db reset` |
| Run apps | `npm run dev` (OS :3000, Studio :3001) |
| Mailpit | `http://127.0.0.1:54324` |
| Design system | `http://localhost:3000/design-system` |
