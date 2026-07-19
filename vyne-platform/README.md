# VYNE Platform

Monorepo for the VYNE platform: VYNE OS (internal), Advisor Studio (advisor-facing),
and the shared secure foundation. Built under Engineering Authorization EA-001.

## Structure
- `vyne-docs/` — READ-ONLY governing documents: EA-001, council rulings, architecture,
  UX blueprint, and the accepted M1–M6 plan. The Lead Engineer must not modify these.
- `docs/` — living project records maintained during the build: the non-confidential
  Decision Log, ADRs, setup docs, milestone reports.
- `apps/`, `packages/` — created by the Lead Engineer in Milestone 1 per the plan.
  (Deliberately absent now; M1 scaffolds the monorepo.)

## Rules (binding, from EA-001 / DL-2026-003)
- Synthetic demonstration data only. No real advisor, firm, fee, or client information.
- Local development only. No hosted deployment of any kind under this authorization.
- No secrets in this repository. `.env` files stay untracked.
- Confidential legal/security material never enters this repo — reference by
  Legal Register ID only (Charter Amendment 1).

## Getting started
Open this folder in Claude Code and paste the contents of
`vyne-docs/00_KICKOFF_PROMPT.md` as your first message.
