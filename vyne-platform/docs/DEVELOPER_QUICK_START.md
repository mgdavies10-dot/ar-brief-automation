# VYNE Developer Quick Start

One page. Details live in the linked documents — this tells you where.

**Read first, in order:** repository root `CLAUDE.md` → `docs/governance/GOVERNANCE_MANUAL.md`
→ `vyne-docs/01` (EA-001, binding) and `02` (CR-001) → `docs/DECISION_LOG.md` →
`docs/HANDOFF.md` (current state) → `docs/SETUP.md` (environment).

**What's authoritative:** `docs/governance/SOURCE_OF_TRUTH_MAP.md` names the governing
document per subject and the 7-level hierarchy. Repository copies are canonical for
engineering; `vyne-docs/` is read-only; code never silently redefines an approved
document.

**Classifying work (Level 0–3):** use the council-trigger table, then the decision
tree, in `docs/governance/CHANGE_CLASSIFICATION.md`. Rough shape: typo/formatting = 0;
detail inside approved design = 1; new workflow/schema/financial logic/Studio
behavior = 2; auth/RLS/publication boundary/sensitive data/legal/compensation/
Method-neutrality = 3. Under reasonable uncertainty: classify at the higher plausible
level and ask the founder first.

**Council review:** required for Level 2–3 (roles/lenses: `PRODUCT_COUNCIL_CHARTER.md`;
reviewers/approvers per category: `AUTHORITY_MATRIX.md`). Level 0 never gets council
review. **Decision Log entry:** always for Level 2–3, before implementation; Level 1
only when approved behavior materially changes (mechanism:
`governance/decision-log/README.md`).

**EA-001 milestone rules:** build only the authorized vertical slice, milestone by
milestone; synthetic data only; local only; no hosted deployment, email sending, or
AI features; stop for founder review at milestone gates (M5 and M6 remain) and at any
EA-001 stop condition — never invent or substitute silently. Current standing gate:
**M2's real-Supabase re-verification (DL-2026-012 / ADR-001 / HANDOFF.md) must be
completed, reported, and pushed before substantive M3 work; the M3 plan needs founder
review before M3 code.**

**Testing claims:** every "tests passed" states environment, target, counts, skips,
shims/mocks, limitations, and whether execution was production-equivalent
(`RELEASE_GOVERNANCE.md` §2). Mark each verification **executed / mocked / shimmed /
deferred** — a shimmed result is never "production-equivalent."

**Never without founder approval:** artifact approval/publication/withdrawal;
ownership reassignment; user/role administration; RLS or permission changes; schema
changes; anything Level 2+; milestone acceptance; weakening or deferring any
acceptance test.

**Never in this repository:** secrets or real credentials (`.env*` stays untracked);
real advisor/firm/client data; privileged legal advice, counsel communications,
personnel or restricted commercial material — reference those by `LR-YYYY-NNN` only
(`OUTSIDE_COUNSEL_REGISTER.md` carries IDs and status, nothing more).

**Workflow before material implementation:**
1. Classify (trigger table → tree). 2. Identify authoritative documents (Source of
Truth Map). 3. For Level 2–3: council review (templates in `governance/templates/`)
and founder approval. 4. Decision Log entry if required. 5. Confirm authorization +
frozen acceptance criteria. 6. Implement on branch
`claude/vyne-ea-001-vertical-slice-xly1ws`, referencing DL/ADR IDs in commits.
7. Execute tests; state claims per the standard. 8. Update affected documents.
9. Stop at required gates.
