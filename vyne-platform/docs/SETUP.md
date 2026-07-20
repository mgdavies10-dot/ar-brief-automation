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
- **Docker** running (`docker info`) — required by the local Supabase stack from M2 on
- **Supabase CLI** (`supabase --version`) — install via `npm install -g supabase`
  (GitHub-release installers also work where GitHub is reachable)

## Install & verify
```sh
cd vyne-platform
npm install
npx turbo run build typecheck test
```
All three must pass before starting work. Apps: `npm run dev` runs OS on
http://localhost:3000 and Studio on http://localhost:3001.

## Environment files
Copy `.env.example` values into untracked `.env.local` files per app once the local
Supabase stack exists (M2+). `supabase start` prints the local anon/service keys —
these are local-only development keys, never hosted credentials.

## Layout
```
apps/os        VYNE OS (internal)        apps/studio    Advisor Studio
packages/ui    design tokens             packages/domain vocabularies + zod schemas
packages/audit audit event dictionary    packages/db     migrations + RLS (M2)
docs/          decision log, ADRs, milestone reports
vyne-docs/     read-only governing documents — never edit
```
