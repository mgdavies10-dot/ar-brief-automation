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
- **M4 (product milestone) — ACCEPTED / closed** (founder, 2026-07-23, after the
  golden-path walkthrough). Sequence delivered: F1 → F2 → F3 → M4 Integration.
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
  - **M4 Integration (was "F4") — accepted; M4 closed.** Golden path seeded
    (`npm run seed:golden-path` — Robert's full arc); consulting-quality review done
    (`docs/milestone-reports/M4_Integration_report.md`, ACCEPTED). Three
    improvements landed from reading it end-to-end: the Record now speaks in the
    second person (a letter), it offers to *confirm* what it only assumes, and the
    Overview's "% understood" gauge became calm language. Founder walked the golden
    path and accepted 2026-07-23.
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
npm run seed:golden-path             # Robert Halvorsen's full M4 journey (idempotent)
$env:VYNE_REAL_STACK="1"; npx vitest run   # regression: 60/60 expected
npm run dev --workspace @vyne/os     # OS app on http://localhost:3000
```

(`packages/domain` unit suite: `npx vitest run` → 16/16, incl. the Conviction
Engine and the Record composer + cooling rule.) A local demo dev server can also
be started through the harness via `.claude/launch.json` (config `os`, port 3000).

## Next required action

**Founder-directed strategic pause before M5 (2026-07-23).** Not code — shaping the
company. Four deliverables, in order, each after the previous:
1. **VYNE Product Story** — `docs/product/PRODUCT_STORY.md` (drafted; for founder
   refinement). The canonical "what VYNE is" doctrine.
2. **Website Strategy** — experience-first (what an advisor should *feel* in 30
   seconds), only after the Story is settled. Not built here (public website is
   EA-001-excluded) — a strategy document.
3. **M5 Planning** — the plan for advisor-facing publishing (Advisor Studio):
   `published_artifacts` snapshot, residue scan, the publish "gold moment," the
   advisor's first Studio sign-in on the Record. **M5 is an EA-001 milestone stop —
   no M5 code until the founder approves the plan.**
4. **Brand Standards** — core identity only (voice, tone, typography, colors,
   photography, illustration philosophy, writing principles), extending
   `docs/brand/`.

Milestone retrospective done: `docs/milestone-reports/M4_learnings.md`. Governing
identity to protect across all four: **VYNE is the operating system for advisor
transition consulting, not recruiting software.** The real-stack suite remains the
standing regression gate (`60/60`) whenever code resumes.

**Two non-blocking engineering follow-ups (from the M4 walkthrough):**
1. A Next.js **dev-mode** webpack bug on `/challenge` (`__webpack_require__.n is
   not a function`) — the interop helper isn't emitted in `next dev`; the
   production build is unaffected. Likely a Next version bump (overlay flagged it
   outdated) or a config tweak. The local app is currently served in **production
   mode** (`next build` + `next start`) as the interim workaround.
2. Consider folding `seed:golden-path` into `demo:reset` so the canonical demo
   advisor is always present after a reset.
