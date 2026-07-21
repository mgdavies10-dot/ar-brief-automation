# VYNE Project Health Report — pre-M4 checkpoint

**Date:** 2026-07-21 · **Prepared at:** completion of the security foundation
(M1–M3-3 + Brand) · **Purpose:** the founder-directed checkpoint before shifting
from foundation-building to advisor-facing feature velocity (M4+).

**Earned progress:** 6 of 10 milestones complete (60%). Foundation done: monorepo,
database + RLS + audit, authentication (sign-in, MFA, sessions, revocation,
recovery), shared auth package, official brand + design system.

---

## 1. What technical debt remains?

Tracked, none blocking M4:

- **Auth screen React components are still per-app** (login/welcome/mfa/challenge/
  unauthorized/reset). Logic and styles are shared (`@vyne/auth`, `@vyne/ui`);
  the thin view components are duplicated. Candidate: shared client components.
- **No React component test harness** — client render behavior is verified
  manually (and caught real bugs, e.g. the MFA QR). A jsdom + Testing Library
  harness is the right next investment as UI grows in M4.
- **No Playwright e2e** — flows are browser-verified; automation deferred.
- **Role-specific session caps deferred** (ADR-003) — GoTrue is global-only;
  proposed app-layer architecture documented.
- **Custom recovery email template** doesn't load in local GoTrue (default used;
  link works in a real browser).
- **`test:real` npm script is bash-only** on Windows (PowerShell form documented).
- **Brand gaps:** vector/reversed logo, icon library, an "information" semantic
  color; commercial fonts deferred (Source Serif 4 + Inter in use).
- **`vyne-docs/` (read-only) still shows the old palette** — superseded by the
  brand package; cannot be edited by the engineer.

## 2. What architectural risks remain?

- **RLS is the authorization authority** — sound and heavily tested (40 RLS
  tests). The standing risk is *discipline*: any future code path that uses the
  service role or bypasses RLS must stay server-only and narrowly scoped. The
  audit writer is the one service-role path today (correctly `server-only`).
- **Two apps, one Supabase project** — cookie isolation verified; low risk.
- **Session-lifetime enforcement gap** (ADR-003) — interim security rests on
  10-min tokens + rotation + immediate revocation (all verified). Acceptable and
  documented; close it when the app-layer approach lands.
- **No production hardening yet** (out of EA-001 scope) — CI, secrets management,
  backups + restore tests, rate limiting, monitoring are all Horizon B and gated
  on a new authorization.

## 3. What is the current test coverage?

- **55 real-stack integration tests** (executed against genuine Supabase):
  RLS/security 40, rollback 2, auth 13 (sign-in, MFA enroll/challenge, rotation,
  revocation, refresh rotation, audit path). The **security-critical surface is
  well covered** — cross-recruiter isolation, advisor zero-grant, publication
  boundary, immediate revocation, disabled-user session death.
- **Unit tests:** domain vocabulary, UI tokens (palette lockstep), audit
  dictionary.
- **Gaps:** no client-component tests, no Playwright e2e, no coverage-% metric
  instrumented. Coverage is strong where it matters most (data/authz), thin on
  client rendering.

## 4. What are the biggest scalability concerns?

This is a local, synthetic slice, so scale is a Horizon-B concern — but looking
ahead from the current architecture:

- **`audit_events` grows unbounded** — append-only by design; at real scale it
  needs partitioning by time + a retention policy (Architecture §12 anticipates
  this).
- **M4's data surfaces** (advisors, decisions, artifacts) need pagination,
  deliberate indexing, and query discipline; some indexes exist, more will be
  needed as list/search screens arrive.
- **RLS on every query** is the right model and scales, but complex policies can
  cost query planning time — worth watching as tables and joins grow.
- No current design choice is a scaling dead-end; these are normal
  growth-management items, not rework.

## 5. Which areas are intentionally deferred?

- **All EA-001 excluded scope:** pipeline, modeling, economics, meetings,
  research, public website, AI features, email sending, hosted deployment, real
  data. (Horizon B — each needs a new authorization.)
- **Within the slice:** role-specific session caps (ADR-003), Playwright e2e,
  shared auth view components, brand vector/icon/font items, "information" color.

## 6. Is the platform ready for feature velocity?

**Yes — the foundation is solid and the process is proven.** Concretely:

- The **security spine** (RLS, revocation, audit, MFA) is built and tested — M4
  features hang off a trustworthy frame.
- **Shared packages** (`@vyne/ui`, `@vyne/auth`, `@vyne/domain`, `@vyne/audit`)
  mean M4 builds on foundations, not copies.
- The **design system** is canonical and drift-proof; new screens are a
  token-composition exercise, not a design exercise.
- The **real-stack test harness + Ops Runbook + DoD + milestone cadence** make
  each increment verifiable and reviewable.

**Caveats to carry into M4 (not blockers):** (1) add a client-component test
harness as UI grows; (2) hold RLS discipline as write surfaces expand — every new
table/policy gets negative tests; (3) keep the deferred list visible so it's paid
down deliberately, not forgotten.

**Recommendation:** proceed to M4 with the focus the founder set — advisor value
(Current Reality, discovery, decision support, Artifact Builder, the VYNE
Method). The engineering foundation will not be the bottleneck; the product
questions will be.
