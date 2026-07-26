# VYNE Decision Log — Non-Confidential Repository Copy

Per Charter v1.1 Amendment 1: this file holds non-confidential decision summaries and IDs.
Full governance records live in the institutional knowledge base; confidential matters live
in the restricted Legal & Risk Register (referenced by LR ID only, never reproduced here).
Commits implementing a decision reference its ID (e.g., `DL-2026-006`) in the commit message.
Governance metadata index and full records from DL-2026-012 onward:
`governance/decision-log/` (mechanism in its README).

| ID | Date | Status | Summary |
|---|---|---|---|
| DL-2026-001 | 2026-07-17 | Approved | Product Council Charter v1.0 adopted with Amendments 1–5 → v1.1 |
| DL-2026-002 | 2026-07-17 | Approved | Three-location information model; Legal & Risk Register founded (restricted; LR-2026-001…008) |
| DL-2026-003 | 2026-07-17 | Approved | Environment/data rules: local & shared dev synthetic-only; production gated |
| DL-2026-004 | 2026-07-17 | Resolved | Q-6: CRM v4 confirmed synthetic/demo data only; no migration or purge; v4 archived reference-only |
| DL-2026-005 | — | Pending founder | Ratification of Method [PROPOSED] items (cooling rule ships configurable, default ON) |
| DL-2026-006 | 2026-07-17 | Approved w/ conditions | Vertical slice authorized (EA-001): synthetic-only, local-only, cooling rule configurable |
| DL-2026-007 | 2026-07-17 | Approved | QA/Red-Team review required before slice acceptance |
| DL-2026-008 | — | Reserved | Slice acceptance review |
| DL-2026-009 | 2026-07-18 | Approved | Future Agent Center / callable agents recorded as Phase 7 requirement; no build now |
| DL-2026-010 | 2026-07-19 | Approved | Engineer M1–M6 plan accepted; ambiguity rulings incl. decision_type seed taxonomy (CR-001) |
| DL-2026-011 | 2026-07-19 | Resolved | Build environment: Option 3 — Claude Code on founder's machine, local synthetic-only |
| DL-2026-012 | 2026-07-20 | Approved — Option B (conditions open) | M2 verification environment; provisional M2 acceptance; real-Supabase rerun binding — see governance/decision-log/DL-2026-012-m2-environment-decision.md |

## Founder directions recorded by the Lead Engineer (pending council DL numbering)
- 2026-07-25 — **Phase 1 (Expression) FROZEN; Phase 2 (Architecture) begins. Ontology final: Ownership
  and Enterprise Value are separate families; advisor-paid consulting deferred as Future Business Model
  Expansion.** The founder ruled Phase 1 complete and directed a stop to strategy refinement. Two final
  Ontology revisions: (1) **Ownership** (a decision — employee/partner/owner, equity structure, what I
  own) and **Enterprise Value** (a consequence + management discipline — valuation, how buyers price
  me, increasing value, growth's effect, monetization, capital) are kept as **separate families** (not
  merged); (2) **Capability Requirements** preserved exactly (capabilities drive the model; the model
  drives the firm). **Advisor-paid consulting** and hands-on RIA-launch engagements are **deferred as
  Future Business Model Expansion** — not open blockers — to be learned from real post-launch demand.
  Strategic identity crystallized: **VYNE is a decision advisory for financial advisors making
  consequential business decisions; recruiting is one outcome the methodology can support.** **Phase 1
  strategy docs frozen** (Constitution · Founder Memo · Story · Method · Journey · Messaging · Brand ·
  Decision Question Library · Decision Ontology · Commercial Principles) — factual corrections only, no
  redesign; the Question Library still accrues new questions (not a redesign). **Phase 2 begins with
  Content Architecture**, now downstream of the Ontology (Content · AEO · Assessment · Consultation ·
  AI · CRM architectures). Change level 2 (strategy/docs; no code/scope change).
- 2026-07-25 — **Core business model established: hiring-firm-paid, success-based; manage-and-disclose
  conflicts, never claim none. Fee economics are confidential (founder-only).** The founder
  moved the compensation model from "open" to **established direction**: the advisor generally does
  not pay for the traditional recruiting engagement; the **hiring firm** pays a success-based
  placement/transition fee only if the advisor authorizes a submission, joins a firm, and fee
  conditions are met — so **stay / wait / renegotiate / non-paying destination / RIA-launch can yield
  no fee.** Recorded the resulting **structural incentives** (outcome · destination · contracted-market
  · timing · production) and the governing rule **"manage and disclose conflicts, not claim they do
  not exist."** **Prohibited claims:** conflict-free · compensation-neutral · inherently unbiased ·
  paid regardless of recommendation · represents the complete market · identical economics across
  destinations. Credibility comes from **transparent conflict management + demonstrated method** —
  compensation is **one component of trust, not the differentiator, and not gating.** Added to
  `docs/commercial/BUSINESS_MODEL_AND_COMMERCIAL_PRINCIPLES.md`: the operating model, incentive
  analysis, trust model, **28 governance questions**, an **Advisor Submission Standard**, and **7
  method controls** (compensation-blind initial assessment; fit scoring separated from VYNE revenue;
  open-market notation incl. non-paying options; recommendation rationale; higher-conflict review;
  disclosure record; no unsupported "best firm"). Compensation/disclosure questions added to the
  Decision Question Library (classified PE/D/C/L/ASI). **Legal/contractual items (fee earn/pay timing,
  T12 verification, clawbacks, procuring-cause/lead-ownership, dual/referral comp, submission terms)
  flagged for counsel — not resolved.** Not a blocker to the Advisor Decision Ontology. Change level 2
  (commercial/operational strategy; docs only; no code/scope change).
- 2026-07-25 — **Advisor Decision Ontology inserted before Content Architecture.** The founder
  requested a strategy layer between the Decision Question Library and Content Architecture: the ~33
  fundamental advisor decisions (13 families; everything else a sub-question), how they relate, and
  the mapping spine (question → decision → family → PTA framework → assessment module → content → AI →
  report) with a public-education-vs-personalized-consulting delivery axis. Created
  `docs/experience/ADVISOR_DECISION_ONTOLOGY.md`. Also corrected the Wave-2 finding: the business model
  is **not** the gating differentiator — the moat is **how VYNE reaches conclusions** (the combination
  no one else fields). Content Architecture stays **PAUSED** until the Ontology is reviewed. Change
  level 2 (strategy/docs; no code/scope change).
- 2026-07-25 — **Phase 1 (Expression) direction: signature engagement, engagement model,
  and brand strategy.** Building the company's *expression* before software. Key
  founder decisions/directions (all in `docs/` — foundation untouched): (1) elevate Book
  Portability into the flagship **VYNE Practice Transition Assessment** (working title) —
  answers *"what happens to my business if I make this move?"* across twelve areas;
  portability is one module (`docs/method/`). (2) **Comprehensive framework, tailored
  (modular) engagement** — always scan all areas, go deep only where warranted. (3)
  **Calibrated recommendations** — VYNE gives the strongest conclusion the evidence
  supports (decision-support · conditional · full); advisor always decides. Quality bar =
  **The VYNE Standard**. (4) Advisor-facing deliverable is three layers (executive
  narrative · comparison · supporting record), not locked to a letter. (5) **Digital
  Experience Strategy** + standalone **Advisor Journey** built around the real consulting
  relationship, not a funnel; direct-firm + self-directed paths; stay/pause/return valid.
  (6) **Brand Standards** (strategy level) created and the existing visual identity
  (navy/ivory/warm-bronze; serif+sans) **evaluated and affirmed** — not reinvented.
  (7) Competitive read: recruiting commoditizing, consulting judgment durable; two of the
  four cited 2026 articles are Diamond (industry-participant). **Open founder decisions:**
  final assessment name · VYNE-Standard public vs internal · always-included diagnostic
  elements · how much methodology is public · IP/trademark strategy. Next: **Messaging
  Architecture**. Change level 2 (strategy/docs; no code/scope change).
- 2026-07-23 — **The VYNE Constitution ratified (v1.0).** After two founder board
  reviews, the founder ratified `docs/foundation/THE_VYNE_CONSTITUTION.md` as the
  **highest authority at VYNE** — a worldview preamble + ten enduring principles +
  a decision standard + a two-question governance gate. Core identity fixed: **VYNE
  is an independent consulting firm with a proprietary technology and market-
  intelligence edge — not a software company.** Advisor-first mission; *Decisions
  Over Transactions* (measured by better decisions, never placements); *Evidence
  Before Opinion*; "the platform is our advantage, never our identity." Governance:
  nothing (roadmap, feature, marketing, website) may contradict it; every idea is
  first tested — *should VYNE build this? does it strengthen the consulting
  relationship?* — before *how.* Amendments are rare, dated, and explained (logged
  in `docs/foundation/FOUNDATION_CHANGE_LOG.md`). Read order + precedence:
  `docs/foundation/FOUNDATION_README.md` (Constitution → Founder Alignment Memo →
  VYNE Story). **Next (in order): draft the Founder Alignment Memo, then rewrite
  the VYNE Story.** No production code during this founder-level phase.
- 2026-07-23 — **M4 ACCEPTED — the milestone is closed.** After walking the golden
  path end-to-end (Robert Halvorsen: Overview → Direction → Record → approval), the
  founder accepted M4 Integration and closed the milestone. M4 delivered the
  decision spine of the VYNE Method as one coherent consulting experience:
  **F1** Advisor Workspace + Current Reality (the digital twin) · **F2** the
  Conviction Engine surfaced as "Our Perspective" · **F3** the Premium Current
  Reality Record (a letter, lifecycle, cooling rule, founder-only approval) ·
  **M4 Integration** (golden path + consulting-quality review; three
  improvements: second-person Record, honest-about-assumptions, the last gauge
  removed). EA-001 scope held throughout (Modeling / Firm Intelligence remain
  Horizon B; synthetic + local; no secrets). Report:
  `docs/milestone-reports/M4_Integration_report.md`. **Next: M5 (advisor-facing
  publishing) — an EA-001 milestone stop; no M5 production code until the founder
  approves an M5 plan.** Two engineering follow-ups noted, neither blocking: a
  Next.js dev-mode webpack bug on `/challenge` (`__webpack_require__.n`; production
  build unaffected) and the local app currently served in production mode.
- 2026-07-22 — **F3 accepted; the Record documents judgment; F4 becomes M4
  Integration; M4 closes after integration.** Founder accepted F3 and elevated
  the product philosophy. Rulings: (1) **The Record documents professional
  judgment at a moment in time**, not merely understanding — framed as *"Our
  perspective as of July 2026,"* never *"Version 4"*; this makes the artifact
  history a *history of thinking*. (2) **Authorship is preserved** on every
  Record — prepared by / submitted for review by / approved by / date of
  perspective — because consulting judgment has authorship (trust, not
  compliance). (3) **Intentional incompleteness is a feature** — the composer
  leaves "Where we'd focus next" for the human; the platform must never pretend
  certainty where human judgment adds value. (4) **New foundational principle:**
  *"The platform should amplify human judgment, never replace it"* (twin captures
  understanding · perspective organizes thinking · Record communicates judgment ·
  the human consultant stays accountable). (5) **Core identity thread:** CRM
  records facts, AI generates answers — **VYNE builds an evolving understanding**;
  protect *understanding before recommendation · judgment before automation ·
  conversation before workflow.* (6) **F4 is redefined as "M4 Integration"** — not
  a feature milestone but proof that M4 behaves like one product (complete advisor
  journey; recruiter + founder workflow validation; lifecycle validation;
  usability; polish; design consistency; docs). (7) **Believability exercise
  before M5:** walk one fictional advisor through the entire journey and ask
  *"would an advisor believe this came from a thoughtful consulting engagement?"*
  — if not an unqualified yes, improve before adding capability. (8) **M4 closes
  after Integration**, giving a clean stop before M5's advisor-facing publishing.
  Change level 2. Recorded in `M4_product_plan.md`; Record elevation implemented
  in the commit following `71acc1f`.
- 2026-07-22 — **F3 approved: the Premium Artifact is a milestone in the
  relationship, not a deliverable.** Founder authorized F3 (Current Reality
  Record / Artifact Builder) and set its product doctrine. Rulings: (1) The
  artifact reads like **professional correspondence** from a partner to a
  partner ("After spending time learning about your practice, here's how we're
  thinking about it today…") — never "Report Summary / Analysis / Findings"; the
  advisor should feel real thought went in, never "software generated this."
  (2) **Structure is a story, not sections** — five movements (what we've come to
  understand · what appears to matter most · our current perspective · what we'd
  like to understand further · where we'd focus next); everything else supports
  them. (3) **Premium means restraint** — every sentence earns its place; silence
  is part of premium design; resist showing everything. (4) **It must age well /
  be timeless** — no references tied to the software itself; still feels
  thoughtful six months later. (5) **New final Product Philosophy principle:**
  *"Our artifacts should be remembered for their insight, not their formatting."*
  (6) **Design-for (don't build):** advisors accrue a *history* of these letters
  documenting how VYNE's judgment evolved. (7) **Anchoring insight:** VYNE is not
  automating consulting — it is *capturing, organizing, refining, and
  communicating consulting judgment.* Sequence remains **Digital Twin → Our
  Perspective → Premium Artifact**; scope unchanged (Modeling / Firm Intelligence
  stay Horizon B). **Autonomy grant:** after the F3 proposal is written, proceed
  to implementation; stop only for a material philosophy change, a material
  architecture change, or a genuine founder decision — otherwise build and bring
  F3 back at the milestone gate. Change level 2. Recorded in `M4_product_plan.md`.
- 2026-07-22 — **Conviction, not Readiness; the engine is internal; "Our
  Perspective" is the experience; recommendations evolve, not flip.** Founder
  approved the F2 Conviction Engine direction and set binding refinements (a
  genuine product decision future contributors must understand). Rulings:
  (1) **Measure Conviction (VYNE's confidence in its own understanding), never
  Readiness** — the advisor is never scored; the burden stays on VYNE.
  (2) **The "Conviction Engine" is an internal concept only.** Advisors never see
  it; externally they experience **"Our Perspective" / "Our Current
  Perspective."** Internal reasoning (coverage / confidence / freshness /
  evidence / assumptions) never surfaces as the experience.
  (3) **Consulting voice, not software/AI/compliance** — every recommendation
  reads like a senior consultant ("We've spent time understanding your practice;
  here's how we're currently thinking about it; here's why; here's what we'd
  still like to learn"). Narrative precedes indicators; uncertainty is stated
  honestly. Conversational affordances only ("Share our perspective," "Continue
  building our understanding," "Discuss potential paths forward," "Explore
  transition options") — the mechanical "Begin our perspective" is removed.
  (4) **New first-class Product Philosophy principle — recommendations *evolve,
  not flip*:** a recommendation matures gradually as the twin becomes more
  complete; never a sudden jump from "no recommendation" to "strong
  recommendation." (5) **F3 north star (before building the Artifact Builder):**
  *"If I removed every field, chart, progress indicator, and internal state — what
  conversation would remain? Build the artifact around that conversation, not the
  data."* Scope stays exactly where it is: finish **Digital Twin → Our Perspective
  → Premium Artifact**; Modeling / Firm Intelligence remain Horizon B (new EA).
  Change level 2. Recorded in `M4_product_plan.md` (Product Philosophy) and the
  F2 proposal; implemented in commit following `6257dca`.
- 2026-07-21 — **Digital twin is VYNE's moat; twin-evolution direction; F2
  framing.** Founder approved F1 + the twin deepening (editable Executive
  Summary, confidence model, "what we still need to learn"). Strategic rulings
  (recorded in `M4_product_plan.md` Product Philosophy): (1) VYNE's deepest moat
  is **the industry's best structured understanding of an advisory practice** —
  the sequence Digital Twin → Decision Readiness → Artifact Builder → Modeling →
  Firm Intelligence compounds. (2) **The twin becomes smarter, not larger** —
  every field must improve understanding of the advisor or it's not added (guard
  against CRM-bloat). (3) **The twin is continuously refined, never finished** —
  every interaction strengthens it. (4) **Architect (don't build yet):**
  three-axis confidence (coverage / confidence / freshness) and **evidence per
  dimension** (explainability). (5) **F2 framing:** recommendations must *emerge
  from the twin and feel earned* — not a scorecard to complete. Continue to F2.
- 2026-07-21 — **Definition of Done + Project Health Report adopted.** (1) Every
  milestone/major feature is "done" only against a **Definition of Done
  checklist** (`docs/governance/DEFINITION_OF_DONE.md`): functional
  implementation · unit/integration tests · e2e verification · accessibility
  review · design-system compliance · security review (if authn/authz) ·
  documentation update · changelog/milestone report · founder acceptance.
  Mandatory in every milestone report from **M3-3 onward** (earlier milestones
  already met most items). (2) **A Project Health Report is a required checkpoint
  between M3-3 and M4** (before any M4 code), answering: remaining technical debt;
  remaining architectural risks; current test coverage; biggest scalability
  concerns; intentionally deferred areas; readiness for feature velocity. Both
  recorded in `ROADMAP.md` (milestone reporting standard).
- 2026-07-21 — **Official VYNE brand adopted; new canonical brand package;
  standing design-system mandate.** The original identity sheet could not be
  located; the founder ruled the following the **official VYNE brand and the
  canonical source of truth** going forward: Midnight Navy `#081B36`, Ivory
  `#F8F5EF`, Warm Bronze `#B88A5A`, Stone Gray `#D7D2C6`, Charcoal `#1A1A1A`.
  Engineering decisions: (1) Stone Gray is the standard border/hairline color;
  (2) the existing Slate `#425066` stays a **functional** secondary-text token
  (not a brand token); (3) an **accessible bronze text token** derived from Warm
  Bronze (`#8A6234`, meets WCAG AA) is used only where text contrast requires —
  Warm Bronze is used for accents/borders/icons/highlights/surfaces;
  (4) existing semantic success/warning/danger stay (information has no distinct
  hue yet — flagged). A **new version-controlled brand package** (`docs/brand/`:
  `Brand_Guide_v1.0.md`, `BRAND_TOKENS.md`, `DESIGN_SYSTEM.md`, `LOGO_USAGE.md`)
  becomes canonical, superseding Architecture §11's palette and the never-created
  `BRAND_TOKENS.md` it referenced. **Standing mandate:** from Brand-milestone
  approval onward, every future feature and every future public-website page uses
  this Design System by default unless the founder explicitly approves an
  exception. Brand implementation preserves layouts/spacing/typography/UX/
  accessibility/functionality (tokens only); stop at the Brand gate before M3-3.
- 2026-07-20 — **Sequencing ruled; dashboard standard finalized.** Founder ruled
  the order **M3-2 → M3-S → Brand Token Update → M3-3 → M4** (resolves the open
  M3-3-placement question from the prior entry): finish the auth foundation
  before expanding business functionality; remove duplicated auth code before
  adding auth features; adopt the final palette before the larger M4 surface;
  keep current typography pending a separate commercial-licensing decision; treat
  M3-3 as completion of the security foundation, not optional. Pipeline executes
  in that order **only after the founder's M3-2 walkthrough approval**. Milestone
  gates continue after each major phase. **Progress dashboard is now a permanent
  section of every milestone report going forward**, and reports **earned
  milestone progress** (completed ÷ total milestones) rather than effort-based
  percentages.
- 2026-07-20 — **M3-2 gate decisions.** (1) **M3-2 approved pending the founder's
  interactive browser walkthrough** of the auth flows; the Lead Engineer is
  authorized to commit and push M3-2 only after the founder confirms that
  walkthrough (commit held until then). (2) **Shared authentication package
  approved** — extract the duplicated OS/Studio auth components (middleware,
  clients, ceremony screens, shared styles) into a shared foundation
  **immediately after M3-2**, before M4 consumes it. (3) **Brand colors: adopt
  the official VYNE palette before M4**; keep current typography (Source Serif 4
  + Inter) and defer any commercial font-licensing decision to a later
  milestone; update design tokens to the official brand colors while maintaining
  WCAG AA — if any bronze usage fails contrast as text, use an accessible bronze
  text variant while preserving the official palette for surfaces/accents.
  (4) **Milestone dashboard required from M4 onward** in every milestone report:
  overall completion %, remaining milestones, estimated sessions remaining,
  technical debt, open founder decisions, risks, features complete vs. planned.
  **Open question flagged to founder:** the message sequences refactor → brand →
  M4 without restating M3-3 (session integrity, immediate revocation, R1
  password-reset); M3-3 is security-critical and is not dropped — placement
  pending founder confirmation (LE recommendation: refactor → brand → M3-3 → M4).
- 2026-07-20 — **Roadmap approved; checkpoint authorized; demo-account reset
  mechanism directed.** Founder approved `docs/ROADMAP.md` (Horizon A sequencing,
  founder-first M4 split, Horizon B gated on new authorization) and M3-1's
  visible product. Checkpoint commit+push of the reviewed work authorized.
  Standing direction: demo accounts are never deleted ad hoc — a reusable
  provisioning/reset mechanism regenerates fresh demo users and onboarding
  states on demand. Brand reconciliation: engineering tokens stay unchanged
  until a single founder decision before M4, made against a written proposal
  comparing tokens vs. the official brand guide with visual swatches.
- 2026-07-20 — **Q-9 (vector logo) resolved for the v1 slice.** The founder supplied
  and approved the VYNE Strategies primary logo (symbol + wordmark, navy on
  white). Canonical asset: `packages/ui/assets/brand/vyne-logo-primary.png`
  (usage rules in the adjacent README: exact asset only — never redrawn,
  recreated, cropped, distorted, or filtered). Integrated into the OS sign-in
  screen and authenticated top bar (presentation-only change). Still open per
  Architecture §18: vector master and reversed variants for print — raster is
  acceptable for v1 only.
- 2026-07-20 — **M3 plans approved; R1/A1 ruled; M3-1 authorized.** Founder approved
  the M3 phase structure and the acceptance criteria in `M3_plan.md` +
  `M3_execution_plan.md`. **R1 (password recovery):** implement and test the
  complete user-facing local reset workflow (Supabase Auth + Mailpit capture);
  founder review includes request → Mailpit email → new password → sign-in.
  Admin reset may exist only as a controlled backup, never the primary flow.
  **A1 (MFA enrollment):** internal VYNE OS users must complete the
  password-change + real TOTP enrollment ceremony at first successful login
  before any normal application access; standard authenticator apps; no
  simulated MFA. **M3-1 only** authorized to proceed (sign-in, §4.1 language,
  synthetic accounts, error handling without account-existence leaks,
  authenticated shell, sign-out); no M3-2 work, no commit/push until founder
  reviews the visible product.
- 2026-07-20 — **M2 finally accepted; DL-2026-012 conditions 3–4 discharged.** The
  binding real-Supabase verification ran on the founder's machine: identical
  committed migrations, full suite, **42/42 passing on the genuine local Supabase
  stack** (CLI 2.109.1, PostgreSQL 17.6, no shim, zero shim-vs-real behavioral
  differences, no code changes). Founder reviewed and accepted the results. Full
  record: M2 report final section. Standing direction going forward: **every future
  milestone must end with visible, clickable product functionality the founder can
  open and evaluate** — infrastructure-only milestones require a critical-blocker
  justification. M3 remains gated on founder approval of the M3 plan documents
  (`M3_plan.md`, `M3_execution_plan.md`); no M3 production code before that.
- 2026-07-20 — **G1 approved with three rulings** (incorporated in the G1 amendment
  commit): **(1)** The M2 environment decision takes number **DL-2026-012**
  (`DL-2026-012-m2-environment-decision.md`, full record created in G2); DL-2026-009
  is never reused or renumbered; all existing DL identifiers and references are
  preserved. **(2)** The M2 environment decision status is **Approved — Option B**
  (continue on local Claude Code with Docker and the genuine Supabase stack);
  repository evidence: commit `d899b7c`. The record preserves: M1 accepted; M2
  provisionally accepted; the 42/42 result applies to PostgreSQL 16.13 with the
  test-only Supabase-semantics auth shim and is **not** production-equivalent
  Supabase Auth verification; final M2 acceptance remains conditioned on rerunning
  the identical migrations and complete applicable suite on the genuine local
  Supabase stack; substantive M3 implementation may not begin until that verification
  is completed and reported; the M3 implementation plan must be reviewed before M3
  code. **(3)** The repository copy of the governance system is the canonical
  operational source; knowledge-base copies are reference mirrors; the new Council
  Charter is an implementation elaboration of Charter v1.1 Part B; material
  supersession requires a DL entry naming the exact provision changed; confidential
  legal/privileged/personnel/commercial material never enters the repository.
  **G2 authorized** upon this amendment.
- 2026-07-20 — **Governance milestones G1/G2 inserted before M3** (engineering
  paused). G1: Governance Manual, Product Council Charter, Source of Truth Map,
  Authority Matrix, CLAUDE.md integration + docs navigation — then full stop for
  founder review. G2 (only after G1 approval): Change Classification, Release
  Governance, Outside Counsel Register, decision-log restructure, templates. M3 only
  after G2 approval, and still gated on the ADR-001 real-Supabase re-verification.
  Founder also directed that the governance system live in this repository as the
  canonical working copies (non-confidential material only, per Charter Amendment 1).
- 2026-07-20 — M3 environment: proceed per DL-2026-011 Option 3 — build moves to
  Claude Code on the founder's machine (real Docker/Supabase stack). **M1 accepted.
  M2 provisionally accepted** subject to the ADR-001 binding condition (identical
  migrations + full 42-test suite re-run on the real Supabase stack, results and exact
  commands added to the M2 report, committed and pushed before substantive M3 work).
  M3 requires a written implementation plan for founder review before code. See
  docs/HANDOFF.md.

## ADR index
- ADR-000 — Monorepo foundation under EA-001 (M1, 2026-07-19) — references DL-2026-006/010
- ADR-001 — M2 verification on native PostgreSQL 16 with test-only auth shim (M2, 2026-07-20) — references DL-2026-011, CR-001 §3; re-verification on real Supabase stack required before DL-2026-008
- ADR-002 — Minimal-scope tables under EA-001 (M2, 2026-07-20) — references CR-001 §1.2; for council review at slice acceptance
- ADR-003 — Role-specific session policies (M3-3, 2026-07-21, **Proposed**) — GoTrue global-only session timeouts; role-specific idle/absolute caps deferred with a proposed application-layer architecture
