# VYNE Product Council — Response CR-001 to the Lead Engineer's EA-001 Plan Report

**Reference:** EA-001 (DL-2026-006) · Rulings logged as DL-2026-010; environment as DL-2026-011.

## Plan status: ACCEPTED
The M1–M6 plan conforms to EA-001, Architecture v1.2, and the UX Blueprint. Reading discipline, exclusion confirmations, and the decision to hold at the blocker rather than work around it are all noted with approval. Proceed under the rulings below once the environment decision (§3) is executed.

## 1. Ambiguity rulings (binding)

**1.1 decision_type taxonomy — RESOLVED with supplied values.** The Decision Library (Volume IV) exists outside your uploaded set; its ten founding decision types are the seed taxonomy:
`stay` · `stay_and_strengthen` · `move_employee_firm` · `supported_independence` · `launch_or_join_ria` · `acquire_practice` · `merge_teams` · `sell_or_monetize` · `internal_family_succession` · `external_capital_partner`
Implement as lookup-constrained text, extensible by migration, exactly as you proposed — but seed with these real values, not placeholders. Synthetic personas may reference any of them.

**1.2 "(min)" table scope — APPROVED as proposed.** Implement the §4 columns the slice touches; record the implemented subset in an ADR (`ADR-00x — Minimal-scope tables under EA-001`) for council review at slice acceptance.

**1.3 Residue-scan list — APPROVED as configurable.** Seed with: the UX §5.5 examples; the complete commercial-stage vocabulary (`prospect, discovery, modeling, presented, in contention, submitted, offer, signed, hired, pipeline, stage, opportunity, lead`); economic-internal terms (`T12, fee, commission, clawback, expected fee`); and internal-user first names from the seed data. Store as a maintainable list; the council may extend it without code change.

**1.4 Cooling default — APPROVED.** Next-calendar-day, configurable, default ON; override requires a logged reason. Consistent with Method Ch. 9 pending DL-2026-005.

## 2. One addition to your M5 acceptance behavior
When the residue scan fires on a planted fixture (your M6 test), verify the *audit trail* also records the scan result on the publish attempt — a blocked publish is a security-relevant event, not just a UI state.

## 3. Environment decision (DL-2026-011)
Option 2 is **rejected**: security-critical RLS authored but never executed will not be accepted at any milestone. The council's recommendation to the founder is **Option 3 — run the build in Claude Code on the founder's machine**, with EA-001 plus your M1–M6 plan as the complete handoff; Option 1 (enabling network access for your environment) is an acceptable alternative if the founder prefers to keep the build in the current context. You will receive the founder's choice as your next instruction. All environment/data rules (DL-2026-003) apply identically in either case: local, synthetic-only, no hosted deployment.

## 4. Standing expectations, restated once
Milestone reports at M2, M5, and M6 minimum. Every milestone report states: what was built, what was *executed and verified* vs. authored, tests run with results, ADRs added, and any new stop-condition contact. The QA/Red-Team handoff at M6 includes the full security-suite output, not a summary of it.

*— Product Council, per DL-2026-010/011*
