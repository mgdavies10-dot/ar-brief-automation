# M4 · Feature F2 — Decision Readiness

**Status:** PROPOSED (founder product review, before implementation) · **Date:** 2026-07-21
**Scope:** EA-001 M4 core flow (authorized). Grounded in UX Blueprint §5.4.
**Depends on:** F1 (the digital twin). **Principles:** decision support · advisor
confidence · reduce transition uncertainty · trust before persuasion.

> **The governing constraint (founder, 2026-07-21):** recommendations must
> *emerge from the digital twin and feel earned* — never a scorecard to complete.
> The advisor should feel *"VYNE understands me well enough to make a thoughtful
> recommendation,"* not *"I filled out a form and it scored me."* This reframes
> §5.4: readiness is the twin's understanding **applied to a specific decision**,
> not a checklist bolted on top.

## Advisor Problem

An advisor facing a consequential decision — stay, move, go independent — is
surrounded by people with an incentive in the answer. What they lack is a
disciplined, honest read of whether *their own situation* actually supports a
given direction yet, and what would make the answer clear. Rushed recommendations
(the industry norm) erode trust; endless deliberation erodes momentum.

## Why It Matters

This is where the twin becomes a **decision**. F1 built the understanding; F2 is
where that understanding matures — visibly — into a recommendation the advisor
can trust *because* it's grounded in how well VYNE actually understands them. It's
the moment the moat pays off: a recommendation grounded in a coherent twin, not
assembled from isolated inputs.

## Alternatives Considered

1. **A readiness scorecard the recruiter fills (the literal §5.4 read).** Clear
   and gated, but it *feels like a scorecard* — exactly what the founder ruled
   against. Rejected as the primary frame.
2. **Free-form recommendation whenever the recruiter wants.** Fast, but abandons
   the Method's discipline (premature recommendations are the failure mode the
   product exists to prevent). Rejected.
3. **Readiness that reads from the twin — SELECTED.** The decision draws its
   readiness from Current Reality: which dimensions of understanding this
   decision *depends on* are covered and confident, and where the gaps are. The
   UI speaks in understanding ("Here's what we know that bears on this decision;
   here's what we'd want to confirm before recommending"), and the recommendation
   becomes available when the understanding is genuinely sufficient — presented
   as *earned*, not unlocked-by-checklist.

## Advisor Experience

Internal-facing in M4 (the advisor feels it via the eventual recommendation and
consultation). What the internal team sees:

- **The decision in plain language** (serif) — *"Should Robert pursue supported
  independence?"* — not "Decision #47"; the decision type and a calm state.
- **"What we understand that bears on this"** — the twin's relevant dimensions,
  each showing coverage + confidence (reusing F1's model), and *why* it matters
  to this decision. This is the twin, focused — not a new form.
- **"What would make this recommendation sound"** — the honest gaps, phrased as
  next steps, not red X's. (This is where the future evidence model deepens it.)
- **A decision log** — a dated, append-only narrative of judgment calls, feeding
  the eventual Decision Record.
- **"Begin recommendation"** appears when the understanding is sufficient — and
  *only* then. Not a disabled button: when we're not ready, the space explains
  what's still needed, so discipline is felt as care, not friction.

## Business Value

- **Better advisor decisions & trust:** a recommendation the advisor can believe
  because it visibly rests on how well they're understood.
- **Differentiation:** competitors pitch; VYNE reasons from a coherent twin. The
  recommendation *feels earned* — a felt-quality no CRM or spreadsheet delivers.
- **Operational leverage & data:** the decision log + readiness compound into the
  Decision Record and downstream artifacts.

## Founder Acceptance Criteria

1. Opening a decision **feels like the twin thinking about it**, not a scorecard
   to fill — the language is understanding, not check-boxes.
2. Readiness is **drawn from Current Reality** (coverage + confidence of the
   dimensions this decision depends on), not entered separately.
3. The path to a recommendation is **honest and calm**: what we know, what we'd
   confirm — gaps read as next steps, never failures.
4. **"Begin recommendation" is earned** — present only when understanding is
   sufficient; otherwise the space explains what's still needed.
5. A decision has a **plain-language question** and an append-only **decision
   log** of judgment calls.
6. Recruiter augmentation intact; RLS inherits the advisor (real-stack tested);
   design-system + AA; advisor-first language.
7. It leaves room for **evidence-per-dimension** (why we believe what we believe)
   without a redesign.

## Architecture / scope notes

- Uses the existing `decisions` / `decision_types` / `decision_evidence` tables
  (M2); likely a small reviewed migration to relate a decision's readiness to the
  twin dimensions it depends on (with rollback + RLS + real-stack tests). No
  changes to existing policies anticipated; any RLS-touching need is a Level-3
  stop.
- Modeling/economics stay out (Horizon B). The recommendation *artifact* is F3.
