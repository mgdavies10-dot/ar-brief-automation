# Handoff — current build state (EA-001 vertical slice)

**Updated:** 2026-07-22 (local session on the founder's machine). M4 product
milestone in progress.

## Status

- **M1, M2: accepted** (M2 real-Supabase binding verification 2026-07-20, 42/42;
  see `docs/milestone-reports/M2_report.md`).
- **G1/G2 governance milestones: complete** (see `docs/governance/`).
- **M3: accepted** — shared auth extraction (M3-S), session integrity /
  revocation / recovery (M3-3), forced rotation + real TOTP MFA. Interim session
  policy documented in ADR-003 (role-specific caps deferred).
- **Brand: adopted** — official VYNE palette + canonical brand package
  (`docs/brand/`), tokens in `@vyne/ui`, in-app design-system reference page.
- **M4 (product milestone) — in progress.** Sequence: F1 → F2 → F3 → F4.
  - **F1 — Advisor Workspace + Current Reality (the digital twin): accepted**
    (founder, 2026-07-21), then deepened (editable executive summary, per-dimension
    confidence, understanding). Proposal: `docs/milestone-reports/M4-F1_current_reality.md`.
  - **F2 — the Conviction Engine: BUILT, awaiting founder walkthrough.** Founder
    reframe (2026-07-21): measure *Conviction* (VYNE's confidence in its own
    understanding), never *Readiness*; narrative-first, no scores/gauges/traffic
    lights; explainable; honest about uncertainty. Proposal:
    `docs/milestone-reports/M4-F2_decision_readiness.md`. Product philosophy:
    `M4_product_plan.md` ("Express professional judgment, not algorithmic certainty").
  - **F3 — Artifact Builder + lifecycle + cooling rule: not started.**
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
npx turbo run typecheck build        # 9/9 expected
cd packages/db
npx supabase start                   # requires Docker Desktop running
npx supabase db reset                # re-apply committed migrations (through 0011)
npm run demo:reset                   # restore demo accounts + synthetic advisors
$env:VYNE_REAL_STACK="1"; npx vitest run   # regression: 60/60 expected
npm run dev --workspace @vyne/os     # OS app on http://localhost:3000
```

(`packages/domain` unit suite: `npx vitest run` → 10/10, incl. the Conviction
Engine.) A local demo dev server can also be started through the harness via
`.claude/launch.json` (config `os`, port 3000).

## Next required action

**Founder walkthrough of F2 — the Conviction Engine.** Open an advisor
(demo: Robert Halvorsen) → **Direction** tab. Verify it measures VYNE's
conviction in *its own understanding* (never scores the advisor), speaks in calm
language (no numbers/gauges/traffic lights), leads with "Our Current Perspective"
narrative, and is honest about what we still need to understand. After sign-off,
proceed to **F3 (Artifact Builder)**. The real-stack suite is the standing
regression gate: it must stay green (`60/60`) after every M4 change.
