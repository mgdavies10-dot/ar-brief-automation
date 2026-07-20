# ADR-002 — Minimal-scope tables under EA-001

**Status:** Accepted for the slice; for council review at slice acceptance (per CR-001 §1.2)
**Authorization:** EA-001 scope item 4; CR-001 §1.2 ruling
**Date:** 2026-07-20

## Context
EA-001 lists `teams(min)`, `firms(min)`, and `decision_evidence(min)`; CR-001 §1.2
approved implementing only the Architecture §4 columns the slice touches and requires
this ADR to record the implemented subset. Adjacent minimal-scope choices made in M2
are recorded here as well, so the council reviews one complete list.

## Implemented subsets (vs. Architecture §4 full definitions)
- **firms(min):** `name`, `channel`, `restricted`, `restriction_reason` + conventions.
  Omitted: `parent_company`, `headcount_estimate`, `fee_agreement_status`,
  `research_confidence`, `profile` (firm-intelligence module is excluded scope).
- **teams(min):** `name`, `primary_advisor_id` + conventions. Omitted: `total_aum`,
  `total_t12`, `notes_summary` (team economics are outside the slice).
- **decision_evidence(min):** `decision_id`, `dimension`, `description`, `status`,
  `due_at`, `doc_id` + conventions. This is the full §4 set — nothing the slice
  needed could be cut.

## Adjacent minimal-scope decisions (same rationale, recorded for review)
1. **`decisions.opportunity_id` omitted.** Opportunities/pipeline are excluded scope;
   a dangling nullable FK to a non-existent table cannot be created. Additive
   migration restores it when the pipeline module is authorized.
2. **`record_access` table not created.** Architecture §12's ownership policy mentions
   an `EXISTS record_access` branch, but the table is not in EA-001's thirteen-table
   list and no slice flow grants explicit access. RLS policies implement the
   founder/ownership branches only. Additive migration + policy amendment restores it.
3. **`meetings`, `contacts`, `firm_intel`, modeling and economics tables:** not
   created — excluded modules (EA-001 exclusion list).
4. **`decision_types` lookup table added** (not in the thirteen-table list) as the
   implementation vehicle for CR-001 §1.1's "lookup-constrained text, extensible by
   migration," seeded with the ten ruled values.
5. **advisor_accounts read posture:** founder-only. §12 enumerates the advisor role's
   grants exhaustively (own `published_artifacts`, advisor-visible `tasks`, own
   `users` row); the user→advisor mapping resolves through a security-definer helper,
   so no advisor-facing grant on `advisor_accounts` exists.

## Consequences
Every omission is restorable by additive migration without touching slice behavior.
No excluded module gained a foothold in the schema.
