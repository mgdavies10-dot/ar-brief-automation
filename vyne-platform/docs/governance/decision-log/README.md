# VYNE Decision Log — mechanism

**Status:** G2, for founder review · **Owner:** Founder (Council Chair)

## What lives where

- **`../../DECISION_LOG.md`** — the existing non-confidential summary table
  (DL-2026-001 onward) plus founder directions pending numbering. It remains the
  quick-scan summary.
- **`DECISION_LOG_INDEX.md`** (here) — the governance metadata index: change level,
  related ADR/milestone, review date, per decision.
- **`DL-YYYY-NNN-*.md`** files (here) — full individual decision records, using the
  Decision Record Template. Created for new decisions from DL-2026-012 onward; prior
  decisions (001–011) keep their authoritative record in
  `vyne-docs/01_EA-001_and_Governance_Record.md` and are **not recreated**
  (founder instruction: do not recreate prior decisions unless existing files provide
  enough evidence — the vyne-docs record *is* the evidence, and duplicating it would
  create divergence risk).

## When an entry is required

Per the Authority Matrix "Decision Log" column: always for Level 2–3 changes; for
Level 1 only when approved behavior materially changes; never for Level 0. Founder
directions given outside a council session are recorded immediately in
`DECISION_LOG.md`'s "Founder directions" section and receive DL numbering at the next
council pass.

## Numbering

`DL-YYYY-NNN`, assigned sequentially by the Council Chair. **Numbers are never reused
or renumbered** (founder ruling 2026-07-20: DL-2026-009 stays as issued; the M2
environment decision is DL-2026-012). Filename: `DL-YYYY-NNN-short-slug.md`.

## Status conventions

`Proposed` → `Approved` / `Approved with conditions` / `Rejected` / `Returned` ·
`Pending founder` · `Resolved` (for question-type entries) · `Superseded by DL-…`.
Conditions are listed in the record and tracked until discharged; a conditioned
approval is not final acceptance.

## Amendment and supersession rules

- Records are append-only after approval: corrections and updates are added as dated
  addenda, never edits that change history.
- Material supersession requires a **new** DL entry identifying the exact provision
  changed, and the old record gains a `Superseded-by` line (founder ruling 2026-07-20).
- A material legal or security objection recorded in a decision may not be deleted,
  softened, or marked resolved without evidence (Charter §4).

## How Decision IDs connect to everything else

- **ADRs** cite the authorizing DL ID in their headers; the index links back.
- **Commits / pull requests** reference DL IDs in messages when implementing a decision
  (e.g., `DL-2026-006`).
- **Milestone reports** cite the DL entries they execute and any new ones they trigger.
- **Tests** encoding a ruled behavior cite the DL/CR ruling in a comment (e.g., the
  CR-001 §1.1 taxonomy test).
- **Releases** list every DL entry whose conditions they discharge (Release Approval
  Template).
