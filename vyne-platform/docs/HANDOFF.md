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

**Foundation phase (founder-directed pause before M5).** The company's foundation
lives in `docs/foundation/` — read in order, precedence **Constitution → Memo →
Story** (see `FOUNDATION_README.md`):
- **The VYNE Constitution** — RATIFIED v1.0 (frozen; amend only via
  `FOUNDATION_CHANGE_LOG.md` + Decision Log).
- **Founder Alignment Memo** — adopted, living (strategy/interpretation; evolves,
  the Constitution does not).
- **The VYNE Story** — draft, for founder review.

**Governing identity — protect it everywhere:** VYNE is an **independent
consulting firm with a proprietary technology + market-intelligence edge — NOT a
software company, NOT recruiting software.** Standing governance gate: test every
idea against the Constitution (*should VYNE build this? does it strengthen the
consulting relationship?*) before discussing how. **Founder directive:** after the
VYNE Story, **stop adding foundational documents** — future work references these
three, never expands them. (The old `docs/product/PRODUCT_STORY.md` was retired;
`docs/foundation/THE_VYNE_STORY.md` supersedes it.)

**Foundation validated (2026-07-24), architecture sharpened by the founder:** a
coherence audit (read only the three docs, as a five-years-later newcomer)
confirmed one coherent company on identity, customer, value, boundaries,
technology's role, and decision-making. The audit surfaced that the docs never
state **how VYNE is compensated** — but the founder ruled this a **business-model
question, not a constitutional or strategy gap.** The Constitution is
compensation-independent *by design* (it must survive any future revenue model);
compensation, conflicts, disclosure, and neutrality safeguards live in a separate
**operational** document, registered as a future work item:
`docs/commercial/BUSINESS_MODEL_AND_COMMERCIAL_PRINCIPLES.md`. Intended model:
**firm-paid** (like established transition consultancies), made compatible with
advisor-first advice by an **Incentive-Alignment** principle (advisor's long-term
interests take precedence) plus disclosure. **Constitution and Memo are
unchanged.** Design/strategy reviews open with three questions (see
`FOUNDATION_README.md`).

**Remaining founder-level deliverables (in order), then code:**
1. **Website Strategy** — experience-first; must reflect the Memo (a trusted
   consulting relationship, not a software landing page). Public-website *build*
   stays EA-001-excluded — this is a strategy document.
2. **Advisor Journey** — what an advisor actually experiences, from first
   discovering VYNE through becoming an advocate: the bridge between what we
   believe (Constitution) and why (Story) and a real human experience, mapped
   before any software.
3. **Brand Standards** — core identity (voice, tone, typography, color,
   photography, illustration, writing principles), extending `docs/brand/`.
4. **M5 Plan** — advisor-facing publishing (Advisor Studio): `published_artifacts`
   snapshot, residue scan, publish "gold moment," the advisor's first Studio
   sign-in on the Record. **An EA-001 milestone stop — no M5 code until the founder
   approves the plan.**

Milestone retrospective: `docs/milestone-reports/M4_learnings.md`. The real-stack
suite remains the standing regression gate (`60/60`) whenever code resumes.

**Two non-blocking engineering follow-ups (from the M4 walkthrough):**
1. A Next.js **dev-mode** webpack bug on `/challenge` (`__webpack_require__.n is
   not a function`) — the interop helper isn't emitted in `next dev`; the
   production build is unaffected. Likely a Next version bump (overlay flagged it
   outdated) or a config tweak. The local app is currently served in **production
   mode** (`next build` + `next start`) as the interim workaround.
2. Consider folding `seed:golden-path` into `demo:reset` so the canonical demo
   advisor is always present after a reset.
