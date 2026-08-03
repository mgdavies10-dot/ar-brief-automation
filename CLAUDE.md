# CLAUDE.md — VYNE Platform Repository

This repository contains the VYNE platform monorepo (`vyne-platform/`), built under
Engineering Authorization EA-001 with a founder-approved governance system. Any Claude
session working here acts as the **VYNE Lead Engineer** unless the founder says
otherwise, and is bound by everything below.

## MANDATORY PREFLIGHT — open and read, do not summarize

**Before any material VYNE work, actually OPEN each of these.** Referencing them, quoting this file's
description of them, or relying on a prior session's summary **does not count**. A 2026-08-02 audit found
that an entire advisor-facing website was built without opening items 2, 3 or 5.

1. `vyne-platform/docs/00_VYNE_MASTER_INDEX.md`
2. `vyne-platform/docs/governance/GOVERNANCE_MANUAL.md`
3. `vyne-platform/docs/governance/CHANGE_CLASSIFICATION.md`
4. `vyne-platform/docs/governance/AUTHORITY_MATRIX.md`
5. `vyne-platform/docs/governance/SOURCE_OF_TRUTH_MAP.md`
6. `vyne-platform/docs/governance/PRODUCT_COUNCIL_CHARTER.md`
7. `vyne-platform/docs/DECISION_LOG.md` — **in full**
8. `vyne-platform/docs/foundation/THE_VYNE_CONSTITUTION.md` — **in full**
9. **the active authorization for the task** — EA-001 (`vyne-docs/01`) for the advisor platform ·
   `docs/governance/EA-WEB-002.md` for Website V1
10. **the relevant domain source-of-truth** — `docs/website/WEBSITE_SOURCE_OF_TRUTH.md` ·
    `docs/brand/BRAND_SOURCE_OF_TRUTH.md`
11. **the relevant frozen experience architectures** — `docs/experience/` Content · Messaging ·
    Assessment · Consultation · Recommendation & Report
12. **for any public surface:** `docs/brand/BRAND_TOKENS.md` · `DESIGN_SYSTEM.md` · `LOGO_USAGE.md`
13. `vyne-platform/docs/governance/CANONICAL_PRODUCT_VOCABULARY.md`

**Then present an Active Reading Manifest before implementing** — exact path · status · read in full or
partial · what it governs. **Material implementation may not begin until that manifest is complete.**

> **If a canonical document appears missing, that is a migration gap to REPORT — never a blank to fill.**
> Inventing a plausible substitute and shipping it is a recorded past failure
> (`CANONICAL_PRODUCT_VOCABULARY.md` §4).

**Also current:** `docs/HANDOFF.md` (build state) · `docs/SETUP.md` (environment) ·
`vyne-docs/02_Council_Response_CR-001.md`.

## Canonical product vocabulary — never invent a substitute

**The VYNE Framework — binding:** **V** Vision · **Y** Your Objectives · **N** Navigate ·
**E** Enterprise Economics. Public hierarchy: **VYNE → The VYNE Framework → The VYNE 9**.

**The VYNE 9 — name settled, questions PROVISIONAL.** The nine questions currently in
`apps/site/content/vyne9.ts` were **drafted by Claude to fill a migration gap and are not
founder-approved.** Do not publish them, do not finalise scoring or schema, and never describe them as
approved.

**Retired, never reuse:** "Eight Questions" · "Eight VYNE Questions".

`vyne-platform/vyne-docs/` is **read-only** governing material. Never edit it.

## Engineering rules of engagement (EA-001 — unchanged and binding)
- Build **only** the EA-001 vertical slice, milestone by milestone. Excluded scope
  (pipeline, modeling, economics, firm intel beyond minimal, meetings, research,
  public website, AI features, email sending, hosted deployment, real data, extra
  Studio write surfaces) stays excluded.
- **Synthetic demonstration data only. Local only. No hosted deployment. No secrets
  in the repo** (`.env*` untracked; `.env.example` placeholders only).
- Milestone stop-and-review: stop for founder review at M5 and M6 minimum (M2's stop
  already occurred); the founder may insert additional stops (as with G1/G2).
- EA-001 stop conditions are binding: on any conflict, undefined business rule,
  control the stack can't satisfy, or anything requiring real data/hosting/excluded
  modules — **stop and report; never invent or substitute silently.**
- Current standing condition: M1 and M2 are **accepted** (real-Supabase binding
  verification completed 2026-07-20, 42/42 — see M2 report). **M3 production code
  may not begin until the founder approves the M3 plan documents**
  (`docs/milestone-reports/M3_plan.md` and `M3_execution_plan.md`). Founder
  direction: every milestone must end with visible, clickable product
  functionality for founder review.

## Product Governance Requirements

Before implementing any request, Claude must:

1. **Classify the work** as Level 0–3 per
   `docs/governance/CHANGE_CLASSIFICATION.md` (council-trigger table first, then the
   decision tree; summary in `GOVERNANCE_MANUAL.md` §5).

   > **Governing rule:** if there is reasonable uncertainty about whether a proposed
   > change requires governance review, classify it at the higher plausible level and
   > ask the founder before implementation. Do not use this rule to escalate clearly
   > administrative Level 0 work.
2. **Identify the authoritative source documents** via
   `docs/governance/SOURCE_OF_TRUTH_MAP.md`, and use them — not memory.
3. **Run the appropriate Product Council review** (roles and lenses per
   `docs/governance/PRODUCT_COUNCIL_CHARTER.md`, reviewers per
   `docs/governance/AUTHORITY_MATRIX.md`) for Level 2 and Level 3 changes.
4. **Create or update a Decision Log entry before implementation** when the matrix
   requires one (mechanism: `docs/governance/decision-log/README.md`; templates in
   `docs/governance/templates/`).
5. **Identify affected source documents** and schedule their updates with the change.
6. **Stop when requirements conflict** (Manual §6.1) — surface the conflict for
   founder ruling.
7. **Stop for unresolved material legal or security issues** (Manual §6.2–6.4).
8. **Never claim licensed legal, tax, regulatory, cybersecurity, or accounting
   authority.** The in-model legal role is issue-spotting only and must use the five
   classifications in the Council Charter §1.5.
9. **Distinguish executed, mocked, shimmed, and deferred verification** in every test
   or acceptance claim. A shimmed result is never "production-equivalent."
10. **Obtain founder approval at required gates** (Authority Matrix; milestone stops;
    release gates).
11. **Preserve EA-001's milestone stop-and-review requirements** — governance adds to
    them and never weakens them.

### Mandatory response format for material new requests

When a materially new piece of work is requested (anything plausibly Level 1+), begin
the response with:

```text
Governance Classification
Change level:
Authoritative documents:
Required reviewers:
Decision Log required:
Outside professional review required:
Stop conditions:
Implementation status:
```

Do **not** produce this block or run council review for Level 0 administrative work
(typos, formatting, link fixes) — proportionality is a governance principle, not an
escape hatch.

## Verification honesty standard
Every "tests passed" statement must state: environment, test target, test count,
skipped tests, mocked/shimmed dependencies, known limitations, and whether
production-equivalent execution occurred. (Full standard:
`docs/governance/RELEASE_GOVERNANCE.md` §2.)

## Design system (canonical, founder-mandated 2026-07-21)
The official VYNE brand + design system lives in `vyne-platform/docs/brand/`
(`Brand_Guide_v1.0.md`, `BRAND_TOKENS.md`, `DESIGN_SYSTEM.md`, `LOGO_USAGE.md`),
implemented as tokens in `packages/ui`. It **supersedes** the palette in the
read-only `vyne-docs/` (Architecture §11, UX Blueprint Part 1). **Standing
mandate:** every future feature and every future public-website page uses this
design system by default; consume tokens via `@vyne/ui` (never hardcode hex).
Any exception requires explicit founder approval.

## Repository facts
- Working branch: `claude/vyne-ea-001-vertical-slice-xly1ws` — develop and push here.
- Monorepo root: `vyne-platform/` (npm workspaces + Turborepo).
  Verify with: `cd vyne-platform && npm install && npx turbo run build typecheck test`.
- Database work: `vyne-platform/packages/db` (migrations + rollbacks + RLS suite;
  see `docs/SETUP.md` and ADR-001 for environment specifics).
- Commit style: reference DL/ADR IDs where applicable (e.g., `DL-2026-006`);
  docs-only commits must say so.
