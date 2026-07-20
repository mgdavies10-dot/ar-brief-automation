# VYNE Decision Log — Non-Confidential Repository Copy

Per Charter v1.1 Amendment 1: this file holds non-confidential decision summaries and IDs.
Full governance records live in the institutional knowledge base; confidential matters live
in the restricted Legal & Risk Register (referenced by LR ID only, never reproduced here).
Commits implementing a decision reference its ID (e.g., `DL-2026-006`) in the commit message.

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

## Founder directions recorded by the Lead Engineer (pending council DL numbering)
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
