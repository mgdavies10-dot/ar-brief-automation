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
