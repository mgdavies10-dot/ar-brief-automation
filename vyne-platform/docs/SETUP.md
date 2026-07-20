# VYNE platform — developer setup (EA-001 slice)

Binding environment rules (DL-2026-003 / DL-2026-006): **local development only,
synthetic data only, no hosted deployment, no secrets in the repo.**

**Before beginning material work**, read: the [Developer Quick Start](DEVELOPER_QUICK_START.md),
the repository root `CLAUDE.md`, the [Governance Manual](governance/GOVERNANCE_MANUAL.md),
the applicable EA/CR documents in `../vyne-docs/`, and the current
[Decision Log](DECISION_LOG.md). Material changes require governance classification
before implementation (see `CLAUDE.md`).

## Prerequisites
- **Node 20+** (`node --version`)
- **Docker** running (`docker info`) — required by the local Supabase stack from M2 on.
  On Windows, Docker Desktop requires the **WSL 2** backend
  (`wsl --install --no-distribution`, admin + reboot, if WSL is absent).
- **Supabase CLI** — installed as a repo devDependency by `npm install`; run every
  Supabase command as **`npx supabase …`** (no global install). Pinned via
  `package.json`/lockfile; 2.109.1 at the time of the M2 verification.
- **`psql` client** (`psql --version`) — the `packages/db` test harness shells out to
  the `psql` binary for every migration/rollback apply. Any PostgreSQL 16+ client
  works; a server is **not** required. On Windows, the official EDB binaries zip
  extracted to a per-user directory (e.g. `%LOCALAPPDATA%\Programs\pgsql-16`) is
  sufficient — add its `bin` to the session `PATH` when running db tests.

## Install & verify
```sh
cd vyne-platform
npm install
npx turbo run build typecheck test
```
All three must pass before starting work. Apps: `npm run dev` runs OS on
http://localhost:3000 and Studio on http://localhost:3001.

## Local Supabase workflow (M2+)
From `packages/db`, with Docker running:
```sh
npx supabase start      # brings up the local stack (first run pulls images)
npx supabase db reset   # recreates the DB and applies committed migrations in order
npx supabase stop       # shuts the stack down
```
The managed database listens on `127.0.0.1:54322` (`postgres`/`postgres`). Run the
db suite against the real stack with `npm run test:real` (bash/zsh) or, on Windows
PowerShell (the npm script's inline env var is bash-only):
```powershell
$env:VYNE_REAL_STACK="1"; npx vitest run
```
Windows notes from the M2 verification: the stack's Postgres major version follows
the Supabase CLI default (17.x currently; the shim harness used 16.x — both
verified); the CLI's analytics warning about the Docker daemon on tcp:2375 is
harmless and needs no action; transient registry rate-limit errors during first
image pull resolve on the CLI's own retry.

## Environment files
Copy `.env.example` values into untracked `.env.local` files per app once the local
Supabase stack exists (M2+). `npx supabase start` prints the local anon/service keys —
these are the CLI's well-known local-only development defaults, never hosted credentials.

## Layout
```
apps/os        VYNE OS (internal)        apps/studio    Advisor Studio
packages/ui    design tokens             packages/domain vocabularies + zod schemas
packages/audit audit event dictionary    packages/db     migrations + RLS (M2)
docs/          decision log, ADRs, milestone reports
vyne-docs/     read-only governing documents — never edit
```
