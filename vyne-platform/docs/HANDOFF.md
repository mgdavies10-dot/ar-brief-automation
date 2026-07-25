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

### VYNE Development Phases (founder, 2026-07-24)

The company (internally, **The VYNE Consulting System** — philosophy, methodology,
digital experience, intelligence, research, technology, people; software is *one*
component) is built in strict phase order:

- **Phase 0 — Foundation: ✅ COMPLETE.** Outcome: one coherent company; every future
  decision has a philosophical home (`docs/foundation/`).
- **Phase 1 — Expression: IN PROGRESS.** Make the company visible through
  *experience*, not software. No code, UI, CRM, or database in this phase.
- **Phase 2 — Product Experience** (later): design what the workspaces / intelligence
  layers are trying to *accomplish*, now that the experience defines them.
- **Phase 3 — Platform** (later): decide what software supports the experience.
  (M5 — advisor-facing publishing — lives here; still an EA-001 milestone stop
  requiring an approved plan before code.)

**Phase 1 deliverables (in order), each experience-strategy BEFORE UX:**
1. **Digital Experience Strategy** — `docs/experience/DIGITAL_EXPERIENCE_STRATEGY.md`
   **(rev 2, for founder review).** Ten-stage Advisor + Emotional Journey (added a
   **Perspective** stage; per-stage *Advisor Needs* + *How Trust Is Earned*);
   **direct-firm digital path** + **self-directed path**; assumes an already-informed,
   already-leaning advisor. No pages/UI/color.
2. **Advisor Journey** — `docs/experience/ADVISOR_JOURNEY.md` **(drafted, for founder
   review).** Built around the real consulting engagement (12 non-linear stages;
   engagement levels; graduated disclosure; where the modular assessment + calibrated
   recommendation enter; stay/pause/return as valid outcomes) — not a funnel.
3. **Brand Standards** — `docs/brand/BRAND_STANDARDS.md` **(strategy-level; accepted with
   minor revisions, founder 2026-07-25).** How VYNE sounds/feels/behaves (19 sections);
   evaluates & **affirms** the existing palette/type/logo (warm bronze on ivory, not bank
   navy-and-gold; no final creative selected). Revisions applied: varied over-used
   "independent"; "whole-practice"→"the business"; brand promise kept **open** with a
   confidence-framed family added; bronze/ivory flagged as a **digital-validation
   hypothesis**; craftsmanship question added to the decision test; "behavior is the
   brand" elevated to a guardrail. *Left open:* brand promise, signature-assessment name,
   bronze-on-screen validation.
   4. **Messaging Architecture** — `docs/experience/MESSAGING_ARCHITECTURE.md` **(FROZEN,
   founder 2026-07-25).** Organized around the **advisor's evolving questions, not VYNE's
   features**: the three conversations — advisor **internal** · advisor **external** · **the
   interpretive** conversation (renamed from "VYNE's" to center the advisor; VYNE
   *facilitates* it) — a question map by journey stage (questions that *don't name VYNE*),
   and "one conversation, many surfaces."
   4b. **Decision Question Library** — `docs/experience/DECISION_QUESTION_LIBRARY.md`
   **(living inventory; drafted).** The canonical inventory of advisor questions (~55 seed,
   tagged stage · conversation · complexity; grows to hundreds). Every future content/AEO/
   report/consultation/AI artifact must trace to ≥1 question here. The connective tissue
   between Messaging and everything downstream.
   4c. **Advisor Decision Intelligence Research** —
   `docs/market/ADVISOR_DECISION_INTELLIGENCE_RESEARCH.md` **(first evidence-grounded pass,
   for founder review).** Real cited sources (Kitces, Diamond, Bridgemark, WealthManagement,
   AdvisorHub, Financial Planning, Fidelity, checklists); every claim tagged **[E]** evidenced
   / **[H]** hypothesis; no fabricated demand scores. Deliverables: exec summary · methodology
   · decision landscape · expanded question set (folded into 4b) · competitor coverage matrix ·
   gap analysis · a Decision Intelligence Framework (classification taxonomy) · recommendations.
   **Key neutral finding:** "independent/unbiased/advisor-centric" is **table-stakes** (every
   competitor claims it) — VYNE must differentiate on *demonstrated method*, not the claim; the
   real **white space** is confidential, advisor-specific, whole-business decision analysis
   (nobody publishes it). Founder **paused Content Architecture** until this research is
   reviewed.
   5. **Content Architecture** *(paused pending research review — "which advisor question
   deserves which answer FORMAT?"; complexity drives format, reading from 4b)* ·
   6. **AEO Strategy** · 7. **Lead-Capture Philosophy** · 8. **Consultation Experience.**

Company operating logic (founder framing): **Foundation (why) → Method (how we think) →
Journey (how it's experienced) → Brand (how it feels) → Messaging (what we say).**

**Competitive intelligence & method (added 2026-07-25):**
- `docs/market/2026_RECRUITER_RELEVANCE_AND_DIRECT_FIRM_COMPETITION.md` — direct-firm
  digital recruiting (LPL, Raymond James) + AEO as a first-order competitive force;
  recruiting activities commoditizing, consulting advantages (interpretation ·
  verification · comparison · advisor-specific analysis · portability · judgment ·
  decision quality) durable. Per-article analysis **completed** (founder provided
  summaries 2026-07-25): source-independence separated — two of four are Diamond
  Consultants (industry-participant positioning/data), one is independent trade press
  (Financial Planning), one is unattributed trend commentary. Crystallized
  positioning captured: *"Advisors do not need more information or more options — they
  need a better way to determine which option, if any, is right for their business,
  clients, and future."*
- **VYNE Method — flagship framework** (`docs/method/`): the signature engagement is the
  **VYNE Practice Transition Assessment** (`PRACTICE_TRANSITION_ASSESSMENT.md`, concept)
  — answers *"what happens to my business if I make this move?"* across twelve areas
  (advisor objectives · current-practice profile · **book portability** · capability
  compatibility · transition economics · enterprise continuity/value · client impact ·
  team impact · operating-model impact · risk · due-diligence/verification · integrated
  conclusion). **Book Portability** (`BOOK_PORTABILITY.md`) is preserved in full as
  Area 3. Every material output is delivered to **The VYNE Standard**
  (`THE_VYNE_STANDARD.md`, preliminary internal). Methodology is largely **undeveloped
  by design** (flagged, not invented). Registry: `README.md`.
- **Engagement decisions DECIDED (2026-07-25):** *comprehensive framework, tailored
  (modular) engagement*; and *calibrated recommendation* — VYNE gives the strongest
  conclusion the evidence supports (Levels 1–3: decision-support · conditional · full),
  no stronger/weaker. Advisor-facing deliverable is three layers (executive narrative ·
  decision comparison · supporting record), not locked to a "letter." Recorded in
  `PRACTICE_TRANSITION_ASSESSMENT.md` + `THE_VYNE_STANDARD.md`.
- **Founder decisions still open** (before Brand Standards): final assessment name;
  VYNE-Standard internal-vs-public; always-included ("scan") elements + which need L2/L3
  disclosure; how much methodology is public; later IP/trademark review.

**Registered future work (no code/UI):** Book Portability Methodology · Firm &
Channel Portability Intelligence · Product & Program Compatibility Taxonomy · Revenue
Portability Modeling · Portability Confidence & Evidence Standards · Advisor
Information Requirements by Disclosure Level · Portability Comparison Deliverable (all
in `docs/method/BOOK_PORTABILITY.md`) · Professional Standards for VYNE Consultants
(`docs/method/README.md`) · Compensation & Conflict Disclosure Standards
(`docs/commercial/BUSINESS_MODEL_AND_COMMERCIAL_PRINCIPLES.md`) · Self-Directed Advisor
Research Experience (`docs/experience/DIGITAL_EXPERIENCE_STRATEGY.md` §7).

Each Phase-1 doc derives from the foundation and passes the three-question review
gate. Milestone retrospective: `docs/milestone-reports/M4_learnings.md`. The
real-stack suite remains the standing regression gate (`60/60`) when code resumes
(Phase 2/3).

**Two non-blocking engineering follow-ups (from the M4 walkthrough):**
1. A Next.js **dev-mode** webpack bug on `/challenge` (`__webpack_require__.n is
   not a function`) — the interop helper isn't emitted in `next dev`; the
   production build is unaffected. Likely a Next version bump (overlay flagged it
   outdated) or a config tweak. The local app is currently served in **production
   mode** (`next build` + `next start`) as the interim workaround.
2. Consider folding `seed:golden-path` into `demo:reset` so the canonical demo
   advisor is always present after a reset.
