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
  - **F2 — the Conviction Engine: accepted** (founder, 2026-07-22), with binding
    refinements applied: the engine is *internal* only — advisors experience
    **"Our Perspective"**; consulting voice, not software/AI; conversational
    affordances; and the new principle **recommendations evolve, not flip**. Measures
    *Conviction* (VYNE's confidence in its own understanding), never *Readiness*;
    narrative-first, no scores/gauges/traffic lights. Proposal:
    `docs/milestone-reports/M4-F2_decision_readiness.md`. Decision recorded in
    `DECISION_LOG.md` (2026-07-22, pending DL numbering).
  - **F3 — the Premium Current Reality Record (Artifact Builder): accepted**
    (founder, 2026-07-22). A `current_reality` artifact on the primary decision,
    composed from twin + Our Perspective into a five-movement **letter**; lifecycle
    Draft → In review → Approved (Published = M5 horizon) with actor+timestamp
    inline; cooling rule enforced and felt (no same-day approval; override needs a
    logged reason); founder-only approval (DB guard). Elevated per founder: the
    Record reads as **"Our perspective as of {Month Year}"** (not a version number)
    and preserves **authorship** (prepared / submitted / approved). Proposal:
    `docs/milestone-reports/M4-F3_artifact_builder.md`.
  - **M4 Integration (was "F4") — the closing M4 milestone: not started.** Not a
    new feature — proof that Twin → Perspective → Record behaves like *one*
    consulting product: synthetic seed telling one advisor's transition story,
    recruiter + founder workflow validation, end-to-end lifecycle + usability,
    polish, design consistency, docs. Gated by the **believability exercise** (walk
    one fictional advisor end-to-end; "would an advisor believe this came from a
    thoughtful consulting engagement?"). **M4 closes after Integration.**
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
npx supabase db reset                # re-apply committed migrations (through 0012)
npm run demo:reset                   # restore demo accounts + synthetic advisors
$env:VYNE_REAL_STACK="1"; npx vitest run   # regression: 60/60 expected
npm run dev --workspace @vyne/os     # OS app on http://localhost:3000
```

(`packages/domain` unit suite: `npx vitest run` → 16/16, incl. the Conviction
Engine and the Record composer + cooling rule.) A local demo dev server can also
be started through the harness via `.claude/launch.json` (config `os`, port 3000).

## Next required action

**M4 Integration — prove the core experience is one product.** Build the synthetic
seed that tells one fictional advisor's transition story end-to-end, then run the
**believability exercise**: walk them advisor-created → Current Reality → twin →
perspective → Record → review → approval, and judge *"would an advisor believe
this came from a thoughtful consulting engagement?"* Fix what falls short (polish,
copy, design consistency, recruiter/founder workflow gaps) before any new
capability. Close M4 at this milestone gate; M5 (advisor-facing publishing) comes
next. The real-stack suite is the standing regression gate: it must stay green
(`60/60`) after every change.
