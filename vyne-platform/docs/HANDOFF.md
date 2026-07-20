# Handoff — current build state (EA-001 vertical slice)

**Updated:** 2026-07-20 (local session on the founder's machine, per DL-2026-011
Option 3 / DL-2026-012 Option B). Supersedes the cloud→local handoff of the same
date; that procedure was executed and is preserved in the M2 report.

## Status

- **M1: accepted** (founder, 2026-07-20).
- **M2: accepted.** The ADR-001 / DL-2026-012 binding real-Supabase verification
  was executed on the founder's machine 2026-07-20: identical committed
  migrations, full suite, **42/42 passing on the genuine local Supabase stack**
  (no shim; zero behavioral differences). Results, environment, and exact
  commands: `docs/milestone-reports/M2_report.md`, final section. Conditions 3–4
  of DL-2026-012 are discharged with that report's commit and push.
- **G1/G2 governance milestones: complete** (see `docs/governance/`, DECISION_LOG
  founder directions of 2026-07-20).
- **M3: not started — no production code may be written yet.** Two documents
  await founder approval:
  1. `docs/milestone-reports/M3_plan.md` — technical implementation plan
     (auth architecture, acceptance criteria; §10 lists the founder decisions
     it needs).
  2. `docs/milestone-reports/M3_execution_plan.md` — phase-by-phase execution
     sequencing per the founder's 2026-07-20 direction that every milestone end
     with visible, clickable product for founder review.
- EA-001 rules unchanged: synthetic data only, local only, no hosted deployment,
  no secrets in the repo, milestone stops at M5 and M6 minimum.

## Local environment (established and verified 2026-07-20)

- Windows 11 · Node v24.18.0 · Docker Desktop (engine 29.6.1, WSL 2 backend).
- Supabase CLI 2.109.1 as a `vyne-platform` devDependency — always `npx supabase`.
- `psql` 16.12 client tools (per-user EDB binaries install; no local PG server).
- See `docs/SETUP.md` for prerequisites and Windows-specific notes.

## Resume commands

```powershell
cd vyne-platform
npm install
npx turbo run build typecheck        # 8/8 expected
cd packages/db
npx supabase start                   # requires Docker Desktop running
npx supabase db reset                # re-apply committed migrations
$env:VYNE_REAL_STACK="1"; npx vitest run   # M2 regression: 42/42 expected
```

(bash/zsh equivalent for the last step: `npm run test:real`.)

## Next required action

Founder review and approval of the M3 plan documents above (including the §10
decisions in `M3_plan.md`). Only after that approval does M3 implementation
begin. Authentication acceptance tests may not be weakened or deferred without a
new, explicitly approved stop condition. The M2 real-stack suite is the standing
regression gate: it must stay green (`42/42`) after every M3 change.
