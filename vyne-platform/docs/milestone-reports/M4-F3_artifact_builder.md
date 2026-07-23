# M4 · Feature F3 — the Premium Current Reality Record (Artifact Builder)

**Status:** PROPOSED → building (founder authorized autonomous implementation
after the proposal, 2026-07-22) · **Scope:** EA-001 M4 core flow (authorized).
Grounded in UX Blueprint §5.5, CR-001 §1.4, Method Ch. 9.
**Depends on:** F1 (twin) + F2 (Our Perspective). **Principles:** premium /
differentiated · trust before persuasion · the artifact is *a milestone in the
relationship, not a deliverable*.

> **Governing doctrine (founder, 2026-07-22).** The Record reads like
> **professional correspondence** — a partner writing to a partner: *"After
> spending time learning about your practice, here's how we're thinking about it
> today…"* Never "Report Summary / Analysis / Findings." **Structure is a story,
> not sections.** **Premium means restraint** — every sentence earns its place;
> silence is part of the design. It must **age well** (timeless; nothing tied to
> the software). And: *"Our artifacts should be remembered for their insight, not
> their formatting."*

## Advisor Problem

An advisor deciding whether to change firms is handed slick, generic pitch decks
that are really about the sender. What they've never received is a considered,
honest letter that reflects *their* practice back to them with more clarity than
they hold themselves — something that makes the decision clearer without pushing.

## Why It Matters

This is where the twin and the perspective become a **thing the advisor holds**.
F1 built the understanding; F2 formed the perspective; F3 turns both into a
premium artifact whose usefulness *is* the persuasion. It's the moment VYNE's
philosophy becomes tangible: the deliverable does the trust-building by being
genuinely, unusually thoughtful.

## Alternatives Considered

1. **A generated report with sections and charts (the CRM/BI instinct).** Proves
   value by showing everything; reads as software output. Rejected — the opposite
   of the doctrine.
2. **A free-form rich-text document the recruiter writes from scratch.** Loses the
   twin's leverage (the understanding must *flow in*), and loses discipline.
   Rejected.
3. **A composed letter, seeded from the twin + perspective, refined by the
   recruiter, carried through a governed lifecycle — SELECTED.** VYNE drafts the
   five movements deterministically from Current Reality + Our Perspective; the
   recruiter shapes the prose (human always holds the pen); the founder approves
   after the cooling period. The result reads like correspondence, not a report.

## The five movements (structure is a story)

1. **What we've come to understand** — the practice, synthesized (not listed).
2. **What appears to matter most** — goals and motivations, in their words.
3. **Our current perspective** — the F2 recommendation, as narrative.
4. **What we'd like to understand further** — honest, never a gap report.
5. **Where we'd focus next** — a considered next step, not a CTA.

Everything else supports these. No dashboards, no scores, no charts in v1 — a
letter.

## Advisor Experience (internal-facing in M4; the advisor receives it at M5)

- **A Record tab** on the Advisor Workspace, reading like a letter on the page:
  serif, generous measure (~66ch), room to breathe, no chrome competing with the
  words.
- **A quiet lifecycle bar** — Draft → In review → Approved (→ Published, shown as
  the M5 horizon, not yet reachable). The current stage in navy; each completed
  transition shows **actor + timestamp inline** ("Approved by … — Jul 14").
- **Composed, then refined** — "Draft from the twin" seeds the five movements from
  Current Reality + Our Perspective; the recruiter edits every word. Generated
  text is only ever a starting point.
- **The cooling rule, felt as care** — the founder cannot approve in the same
  session/day the draft was last edited; the Approve control reads *"Available
  after cooling period — tomorrow."* Configurable (default ON); an override
  exists but **requires a logged reason.** This is the Method's discipline made
  physical: no rushing a consequential document.
- **Founder-only approval** — recruiters author drafts and submit for review;
  only the founder approves (already enforced by the `artifacts` DB trigger).

## Business Value

- **Differentiation you can feel:** a deliverable no CRM or pitch deck resembles —
  restraint and judgment, not density.
- **Trust before the ask:** the Record persuades by being useful; VYNE never
  pushes.
- **Compounding asset:** each Record is a dated record of judgment; over time an
  advisor accrues a *history* of them (design-for; not built now).

## Founder Acceptance Criteria

1. The Record reads like **professional correspondence**, not a report — no
   "Summary/Analysis/Findings," no software references; it would still feel
   thoughtful six months later.
2. **Five movements**, story-ordered; everything else supports them; restraint is
   visible (it breathes; nothing decorative).
3. **Composed from the twin + Our Perspective**, then fully editable — generated
   content is a starting point only.
4. **Lifecycle** Draft → In review → Approved with actor + timestamp inline;
   Published shown as the M5 horizon, not reachable.
5. **Cooling rule** enforced and felt: no same-day approval after the last edit;
   "Available after cooling period — tomorrow"; configurable; override requires a
   logged reason.
6. **Founder-only approval**; recruiter augmentation intact; RLS inherits the
   advisor/decision (real-stack tested); design-system + AA; advisor-first,
   timeless language.
7. Leaves room for **versioned history** of Records without a redesign.

## Architecture / scope notes

- Reuses the existing `artifacts` table (M2, migration 0005): `artifact_type =
  'current_reality'`, the Draft→…→Withdrawn lifecycle, founder-only approval
  guard, `content` jsonb, `version`, tied to a `decision_id`. The Record attaches
  to the advisor's **primary decision** (created in F2).
- **Migration 0012 (additive, reviewed, rollback + real-stack test):** small
  columns on `artifacts` to make the lifecycle legible and the cooling rule real —
  `content_edited_at` (the cooling anchor), `submitted_at` / `submitted_by` (the
  In-review transition actor+time), `cooling_override_reason` (the logged
  override). No RLS/guard changes; approval stays founder-only.
- **Domain (`@vyne/domain`):** `current-reality-record.ts` — the five-movement
  content schema, a deterministic `composeRecordDraft(twin, recommendation,
  advisorName)` (no AI; EA-001), and `coolingStatus(contentEditedAt, now,
  policy)` returning whether approval is available and the "tomorrow" language.
- **Publishing / `published_artifacts` stays out (M5).** Modeling/economics stay
  Horizon B. No advisor read path is added.
