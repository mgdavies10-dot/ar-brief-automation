# M4 · Feature F2 — the Conviction Engine

**Status:** PROPOSED (founder product review, before implementation) · **Date:** 2026-07-22
**Scope:** EA-001 M4 core flow (authorized). Grounded in UX Blueprint §5.4, reframed.
**Depends on:** F1 (the digital twin). **Principles:** decision support · advisor
confidence · reduce transition uncertainty · trust before persuasion ·
**express professional judgment, not algorithmic certainty**.

> **The governing reframe (founder, 2026-07-21).** Do **not** build a *Readiness*
> score. Build a **Conviction Engine** that continuously evaluates **VYNE's own
> confidence in its understanding** and communicates it with transparency,
> humility, and professional judgment. "Readiness" sounds like software judging
> the advisor; **Conviction is VYNE judging its own understanding** — the burden
> stays on us, and the advisor is *never scored*. This distinction is important
> enough that it shapes everything from the copy to the information architecture.

> **Internal engine vs. external experience (founder, 2026-07-22).** "Conviction
> Engine" is an **internal** name — the advisor never sees it. Externally they
> experience **"Our Perspective" / "Our Current Perspective."** Internally VYNE
> reasons about coverage / confidence / freshness / evidence / assumptions;
> externally the advisor simply experiences thoughtful, senior-consultant
> guidance. Affordances are conversational (*"Share our perspective," "Continue
> building our understanding," "Discuss potential paths forward"*), never a
> mechanical "Begin our perspective." And **recommendations evolve, not flip** —
> the perspective matures with the twin rather than switching on.

## Advisor Problem

An advisor facing a consequential decision — stay, move, go independent — is
surrounded by people with an incentive in the answer. What they lack is a
disciplined, honest read from someone whose only stake is understanding their
situation well enough to advise on it. Rushed recommendations (the industry norm)
erode trust; so does false confidence dressed up as a number.

## Why It Matters

This is where the twin becomes a **decision**. F1 built the understanding; F2 is
where VYNE states, out loud and honestly, *how confident it is in that
understanding* — and only recommends when that confidence is earned. It's the
moment the moat pays off: a perspective grounded in a coherent twin, expressed as
professional judgment, not assembled from isolated inputs and stamped with a
score.

## Alternatives Considered

1. **A readiness scorecard the recruiter fills (the literal §5.4 read).** Clear
   and gated, but it *feels like a scorecard* judging the advisor — exactly what
   the founder ruled against. Rejected.
2. **A readiness percentage / traffic-light gauge derived from the twin.** Still a
   number that reads as "the advisor is 82% ready," still algorithmic certainty.
   Rejected — no gauges, no red/yellow/green, no gamification.
3. **The Conviction Engine — SELECTED.** VYNE continuously assesses *its own*
   confidence in its understanding and says so in calm language. The
   recommendation **begins with a narrative** ("Our Current Perspective…"), and is
   available only when conviction is genuinely sufficient — presented as *earned*,
   never unlocked-by-checklist. Every recommendation is explainable.

## The four questions VYNE answers internally (before any recommendation)

1. **What do we know?** (the twin's covered dimensions)
2. **How do we know it?** (confirmed vs. a working read — the seam for evidence)
3. **What are we uncertain about?** (the honest gaps)
4. **Would more information materially change our recommendation?** If yes, we
   **say so** rather than projecting false confidence.

## Advisor Experience

Internal-facing in M4 (the advisor feels it via the eventual recommendation and
consultation). What the internal team sees, on a **Direction** surface:

- **The decision in plain language** (serif) — *"Should Robert pursue supported
  independence?"* — not "Decision #47"; a calm state, no score anywhere.
- **A conviction statement in words**, not a meter — *"Our understanding of
  Robert's business is developing,"* rising to *"We understand Robert's business
  well enough to begin discussing potential paths forward"* only when earned.
- **"What we understand" in language** — per-dimension sentences drawn from the
  twin: *"We understand Robert's goals well," "We have a working read on his
  constraints, though we'd want to confirm it," "We still need to understand his
  client relationships."* Understanding thinking, not completion thinking.
- **"Our Current Perspective"** — the recommendation as a **narrative first**,
  followed by explainability: *why we're saying this · what informed it · what
  we're assuming · what could change our view.*
- **An honest uncertainty note** when more information would materially change the
  view — surfaced, not hidden.
- **A conversational affordance** ("Share our perspective") appears only when
  conviction is sufficient; when it isn't, the space calmly invites *"Continue
  building our understanding"* and names what we'd still like to learn —
  discipline felt as care, not friction.

## Business Value

- **Better advisor decisions & trust:** a perspective the advisor can believe
  because VYNE is honest about the limits of its own understanding.
- **Differentiation:** competitors pitch with certainty; VYNE reasons with
  humility from a coherent twin. The long-term test — *"they understand my
  business better than anyone I've spoken to."*
- **Operational leverage & data:** the recommendation narrative + explainability
  compound into the Decision Record and downstream artifacts (F3).

## Founder Acceptance Criteria

1. The surface measures **Conviction, not Readiness** — it expresses VYNE's
   confidence in *its own understanding*; the advisor is never scored.
2. **No number, gauge, or traffic light** anywhere on the surface; conviction is
   language.
3. The recommendation **begins with a narrative** ("Our Current Perspective"),
   with supporting explainability after (why · what informed · assumptions · what
   could change).
4. Understanding is expressed **per dimension in calm sentences**, drawn from the
   twin (F1) — understanding thinking, not completion thinking.
5. When more information would **materially change** the view, VYNE says so.
6. **The perspective is earned** — the "Share our perspective" affordance is
   present only when conviction is sufficient; otherwise the space invites
   continued learning and names what we'd still like to understand.
7. A decision has a **plain-language question**; recruiter augmentation intact;
   RLS inherits the advisor (real-stack tested); design-system + AA; advisor-first
   language.
8. It leaves room for **evidence-per-dimension** and **three-axis confidence**
   without a redesign.

## Architecture / scope notes

- **Conviction is derived, not stored.** `assessConviction(currentReality,
  advisorName)` in `@vyne/domain` reads the twin and returns *language* (a level
  banded internally, a headline, per-dimension sentences, still-to-learn, and the
  question-4 uncertainty flag). No score is persisted or shown.
- **Migration 0011** (additive, reviewed, with rollback + real-stack test) adds to
  `decisions`: `question text` (plain-language decision) and `recommendation
  jsonb` (perspective / rationale / assumptions / what-could-change), typed by
  `recommendationSchema`. The legacy `readiness` column is intentionally left
  behind. No RLS changes (inherits the advisor).
- Modeling/economics stay out (Horizon B). The recommendation *artifact* is F3.
