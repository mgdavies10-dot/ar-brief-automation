# Definition of Done (DoD) — canonical

**Adopted:** 2026-07-21 (founder direction) · **Status:** Standing standard.
Every milestone and every major feature is "done" only when all applicable items
below are satisfied. The completed checklist appears in the milestone report;
"N/A" items are marked with a one-line reason. This keeps quality consistent as
the project grows.

## The checklist

| # | Item | What it means | When required |
|---|---|---|---|
| 1 | **Functional implementation** | The feature works end-to-end against the real local stack; no mocked/shimmed happy paths presented as complete. | Always |
| 2 | **Unit / integration tests** | Automated tests cover the logic and its edge/negative cases; executed on the real stack; counts and skips reported per the verification-honesty standard. | Always |
| 3 | **End-to-end verification** | The user-facing flow is exercised through the UI (browser walkthrough and/or Playwright e2e). | Where a UI/flow exists |
| 4 | **Accessibility review** | WCAG 2.1 AA for any new/changed UI: contrast, focus states, labels, keyboard path, status-not-by-color-alone. | Where UI changes |
| 5 | **Design system compliance** | Uses `@vyne/ui` tokens (no hardcoded values); matches `docs/brand/DESIGN_SYSTEM.md`; no drift. | Where UI changes |
| 6 | **Security review** | Authn/authz paths reviewed: RLS remains the authority, revocation works, no secret leakage, negative tests present. Cite the specific controls. | If authentication/authorization is involved |
| 7 | **Documentation update** | Affected docs updated (brand, setup, handoff, ADRs, decision log). One source of truth. | Always |
| 8 | **Changelog / milestone report** | A milestone report (or changelog entry) with the earned-progress dashboard, token/change log where relevant, and verification summary. | Always |
| 9 | **Founder acceptance** | Founder reviews at the milestone gate and explicitly accepts. Nothing is "done" without this. | Always |

## How it's applied

- Each milestone report opens with its DoD checklist (status per item) alongside
  the earned-progress dashboard (per the milestone reporting standard in
  `ROADMAP.md`).
- Items 1–8 are the engineer's responsibility to satisfy and evidence **before**
  the gate; item 9 is the founder's at the gate.
- Retroactive note: milestones completed before 2026-07-21 (M1, M2, M3-1, M3-2,
  M3-S, Brand) already satisfied most items (tests, reports, founder acceptance);
  from M3-3 onward the explicit checklist is mandatory in every report.
