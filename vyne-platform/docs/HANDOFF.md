# Handoff — cloud session → Claude Code on the founder's machine

**Date:** 2026-07-20 · **Per founder direction executing DL-2026-011 (Option B/3: build
locally where Docker can run the real Supabase stack).**

## Status at handoff
- **M1: accepted** (founder, 2026-07-20).
- **M2: provisionally accepted**, subject to the binding condition of ADR-001 /
  DL-2026-008: full re-verification against the real Supabase stack (steps below)
  **before any substantive M3 implementation**.
- Branch `claude/vyne-ea-001-vertical-slice-xly1ws` at commit `401522e` holds all work.
  Working tree clean at handoff; no secrets tracked (only `.env.example` placeholders
  and the Supabase CLI's well-known local-dev connection string).

## Local prerequisites
Git · Node 20+ · Docker Desktop (running) · Supabase CLI · Claude Code.

## Resume commands (local machine)
```sh
git clone https://github.com/mgdavies10-dot/ar-brief-automation.git
cd ar-brief-automation
git checkout claude/vyne-ea-001-vertical-slice-xly1ws
cd vyne-platform
npm install
npx turbo run build typecheck test   # sanity: expect 12/12 tasks; db suite needs Postgres (next step)
```
Read `docs/SETUP.md`, `docs/milestone-reports/M1_report.md`, `M2_report.md`,
`docs/adr/ADR-001*` before touching anything.

## M2 binding verification procedure (do this FIRST, before M3 code)
1. `cd packages/db && supabase init` (creates `supabase/config.toml`; the existing
   `supabase/migrations` and `supabase/rollbacks` folders must be left untouched)
   then `supabase start`.
2. `supabase db reset` — applies the **identical committed migrations, unmodified**,
   to the managed local database (real `auth` schema, real GoTrue-owned `auth.users`,
   real `anon`/`authenticated`/`service_role` roles).
3. Add a *real-stack mode* to the test harness (`test/helpers.ts`) that
   (a) does **not** apply `test/shim/auth_shim.sql`, (b) targets the Supabase-managed
   database (default `postgresql://postgres:postgres@127.0.0.1:54322/postgres`), and
   (c) leaves every migration file and every test assertion unchanged. Harness
   plumbing may change; acceptance criteria may not weaken.
4. Run the complete M2 suite (RLS, audit append-only, rollback + re-apply). Confirm
   all 42 tests pass, or document and correct any shim-vs-Supabase behavioral
   differences (corrections must not be "solely to make tests pass" — each one gets a
   written rationale in the report).
5. Update `docs/milestone-reports/M2_report.md` with the real-Supabase results and the
   exact commands used.
6. Commit and push that verification **before beginning substantive M3 implementation**.

## Then: M3 plan before M3 code
Present the founder a written M3 implementation plan covering: Supabase Auth
architecture; founder/recruiter/advisor account creation; invitation and activation
flows; MFA/TOTP requirements by role; session creation and refresh; immediate account
revocation; password-reset behavior; authorization claims and their relationship to
RLS; advisor-account linkage; audit events; authentication failure and recovery
states; automated integration and acceptance tests. Authentication acceptance tests
may not be weakened or deferred without a new, explicitly approved stop condition.
EA-001 milestone stop-and-review rules continue to apply (stops at M5 and M6 minimum).
