# VYNE Governance Manual

**Status:** Approved (founder, 2026-07-20, with rulings incorporated) · **Owner:** Founder (Council Chair)
**Authority:** Founder direction of 2026-07-20 inserting governance milestones G1/G2
before M3 (recorded in `docs/DECISION_LOG.md`, pending council DL numbering).
This manual operationalizes Product Council Charter v1.1 (DL-2026-001) inside the
repository. Per Charter Amendment 1, only **non-confidential** governance material
lives here; the founder has explicitly directed that these repository versions are the
canonical working copies for the engineering workflow. Restricted legal/risk content
never enters this repo — reference by `LR-YYYY-NNN` only.

---

## 1. Purpose

Governance exists to improve decision quality, preserve alignment with approved source
documents, reduce legal and security risk, and prevent undocumented technical or
commercial shortcuts. It is a control system, not a ceremony system: its output is
better decisions with traceable reasoning, made at the right level, by the right
authority, before implementation.

## 2. Principles

1. Better decisions, not more process.
2. Review is proportional to risk.
3. "Stay" and "do not build" are valid outcomes.
4. No material shortcut is accepted silently.
5. Founder approval does not erase unresolved legal or security risk.
6. AI-generated analysis does not replace qualified human professionals.
7. Approved source documents remain authoritative until formally changed.
8. Implementation must not begin before required approval.
9. Every material decision must be traceable (proposal → review → decision → log →
   document update → implementation → acceptance).

## 3. Scope

Governance covers material decisions in: product, UX, methodology, engineering,
architecture, data, authentication, security, privacy, legal, compliance, AI,
financial calculations, recruiter compensation, operational workflows, marketing
claims, and production releases. "Material" is determined by change level (§5); Level 0
administrative work is explicitly outside full-council review.

## 4. Review Process

Eleven stages. Stages compress for lower change levels (§5): Level 0 uses stage 12
only; Level 1 uses stages 1, 3 (product+engineering only), 8, 9; Levels 2–3 use all
applicable stages.

### Stage 1 — Proposal
- **Responsible:** anyone (usually founder or Lead Engineer); proposal owner is named.
- **Input:** the problem, proposed behavior, affected documents (template: G2).
- **Output:** a written proposal with requested change level.
- **Approval standard:** complete enough that reviewers need no oral context.
- **Stop condition:** none — proposing is always permitted.
- **Documentation:** proposal file or Decision Log draft entry.

### Stage 2 — Change classification
- **Responsible:** proposal owner proposes; Council Chair confirms.
- **Input:** proposal + `CHANGE_CLASSIFICATION.md` (G2; summary in §5).
- **Output:** confirmed Level 0–3.
- **Approval standard:** when in doubt, classify up.
- **Stop condition:** the level cannot be determined → treat as Level 3 until ruled.
- **Documentation:** level recorded on the proposal and in any DL entry.

### Stage 3 — Required functional reviews
- **Responsible:** reviewers per `AUTHORITY_MATRIX.md` for the category and level.
- **Input:** proposal, authoritative source documents (per `SOURCE_OF_TRUTH_MAP.md`),
  evidence.
- **Output:** written lens assessments meeting the Amendment-3 evidence standard
  (evidence reviewed; source and date; facts vs. assumptions; confidence; unresolved
  questions; what would change the conclusion; whether a human professional must
  validate).
- **Approval standard:** an assessment lacking Amendment-3 elements is returned, not
  debated.
- **Stop condition:** a reviewer raises a mandatory stop (§6).
- **Documentation:** assessments attached to the council review record.

### Stage 4 — Council recommendation
- **Responsible:** Product Council (Charter roles).
- **Input:** all lens assessments.
- **Output:** consolidated recommendation with rationale, confidence, assumptions,
  dissent, unresolved questions, required outside review, affected documents.
- **Approval standard:** agreement in writing is a decision; sessions exist only to
  resolve disagreement (Amendment 5 timeboxes apply).
- **Stop condition:** material legal or security objection — may not be deleted,
  softened, or marked resolved without evidence.
- **Documentation:** council review record.

### Stage 5 — Founder decision
- **Responsible:** Founder.
- **Input:** council recommendation.
- **Output:** approve / approve with conditions / return / reject / escalate.
- **Approval standard:** the founder decides the business question; the founder cannot
  waive a mandatory stop (§6) — those require the stop's own resolution path.
- **Stop condition:** decision requires outside professional input not yet obtained
  and classified as material → remains open (external-review track).
- **Documentation:** decision recorded with reasoning.

### Stage 6 — Decision Log entry
- **Responsible:** proposal owner writes; Council Chair confirms numbering.
- **Input:** the decision and its conditions.
- **Output:** `DL-YYYY-NNN` entry (non-confidential summary in-repo).
- **Approval standard:** entry states decision, conditions, affected documents, and
  review date; confidential detail referenced by LR ID only.
- **Stop condition:** none.
- **Documentation:** the entry itself; index updated.

### Stage 7 — Source-document update
- **Responsible:** owner of each affected document (per `SOURCE_OF_TRUTH_MAP.md`).
- **Input:** the DL entry.
- **Output:** updated document(s) with version note referencing the DL ID.
- **Approval standard:** documents and decisions may not disagree; until updated, the
  DL entry governs.
- **Stop condition:** update reveals a conflict with another approved document →
  return to Stage 3.
- **Documentation:** document changelog line citing the DL ID.

### Stage 8 — Implementation authorization
- **Responsible:** Founder (or standing authorization, e.g., an EA).
- **Input:** approved decision + updated documents.
- **Output:** explicit authorization (EA for engineering work; DL conditions
  otherwise), with frozen acceptance criteria.
- **Approval standard:** implementation without authorization is a governance
  violation regardless of outcome quality.
- **Stop condition:** EA stop conditions are binding on the implementer.
- **Documentation:** EA / DL reference in commits.

### Stage 9 — Acceptance testing
- **Responsible:** implementer executes; QA/Red-Team verifies for Level 2–3.
- **Input:** frozen acceptance criteria.
- **Output:** executed test results stating environment, target, counts, skips,
  shims/mocks, limitations, and whether production-equivalent execution occurred
  (full standard: `RELEASE_GOVERNANCE.md`, G2).
- **Approval standard:** a shimmed result is never described as production-equivalent
  verification.
- **Stop condition:** security controls that cannot be execution-tested (§6).
- **Documentation:** milestone/test report.

### Stage 10 — Release approval
- **Responsible:** Council (release function) recommends; Founder approves.
- **Input:** QA report, security-suite results, acceptance checklist.
- **Output:** release / release-with-conditions / return / escalate.
- **Approval standard:** all release gates for the affected surfaces pass (gates:
  `RELEASE_GOVERNANCE.md`, G2). Under EA-001 no hosted release gate is reachable;
  "release" means acceptance of work as a foundation for the next phase.
- **Stop condition:** any gate fails.
- **Documentation:** release approval record (template: G2).

### Stage 11 — Post-release review
- **Responsible:** Council Chair schedules; relevant roles attend asynchronously.
- **Input:** post-release validation results, incidents, override frequency metrics.
- **Output:** confirmations or new proposals (loop to Stage 1).
- **Approval standard:** honest accounting; incidents logged, never edited away.
- **Stop condition:** none.
- **Documentation:** review notes; DL entries for resulting decisions.

### Stage 12 — Administrative path (Level 0 only)
Functional owner reviews and applies. No council review, no DL entry unless the change
alters meaning — if it does, it was not Level 0; reclassify.

## 5. Change levels (summary)

Full definitions, examples, requirements, and the decision tree arrive in
`CHANGE_CLASSIFICATION.md` (G2). Working summary, binding until then:

- **Level 0 — Administrative:** typos, formatting, link fixes, non-substantive copy.
  Functional owner only.
- **Level 1 — Normal change:** minor features, internal workflow adjustments,
  non-sensitive UI behavior. Product + engineering review; normal tests; DL only if
  approved behavior materially changes.
- **Level 2 — Material change:** new workflows, schema changes, financial logic, role
  permissions, Studio behavior, publication logic, AI-assisted analysis. Formal
  council review, founder approval, DL entry, affected-document review.
- **Level 3 — Critical/regulated change:** authentication, RLS, encryption, sensitive
  data handling, legal terms, compensation agreements, external recommendations,
  security incidents, breaches, regulatory boundaries. Everything in Level 2 plus
  security approval, legal classification, outside counsel where applicable, executed
  acceptance tests, and a release gate.

When in doubt between two levels, use the higher.

## 6. Mandatory stop conditions

Work halts and returns to the council when any of the following occurs. A mandatory
stop cannot be waived by enthusiasm, deadline, or founder preference — it is resolved
by evidence, decision, or qualified outside review, and the resolution is logged.

1. Conflicting approved requirements (two authoritative documents disagree).
2. An unresolved legal question classified as material.
3. A security control that cannot be execution-tested in the available environment.
4. Production data exposure risk.
5. Any change affecting recommendation neutrality.
6. Financial calculations without independent tests.
7. Permission or RLS changes without negative-access tests.
8. AI-generated external recommendations without human approval (§0.7 — permanent).
9. Unapproved deviation from an ADR or Decision Log entry.
10. Inability to identify the authoritative requirement for the work at hand.

## 7. Relationship to EA-001

This manual adds governance around engineering authorizations; it does not modify
EA-001. EA-001's scope, exclusions, stop conditions, environment/data rules
(DL-2026-003), and milestone stop-and-review requirements remain binding exactly as
written. The M2 provisional acceptance condition (ADR-001: real-Supabase
re-verification before substantive M3 work) is unaffected by the governance milestones.
