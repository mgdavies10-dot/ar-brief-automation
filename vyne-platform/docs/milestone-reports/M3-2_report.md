# M3-2 Report — Credential ceremony + Studio sign-in (EA-001)

**Date:** 2026-07-20 · **Milestone:** M3-2 (roadmap; under M3 of DL-2026-010) ·
**Status:** **Accepted** (founder, 2026-07-20, after interactive walkthrough)

## Progress dashboard (earned milestone progress)

| Milestone | Status |
|---|---|
| M1 | ✅ Complete |
| M2 | ✅ Complete |
| M3-1 | ✅ Complete |
| M3-2 | ✅ Complete |
| M3-S | ⏳ Planned (next) |
| Brand Update | ⏳ Planned |
| M3-3 | ⏳ Planned |
| M4 | ⏳ Planned |
| M5 | ⏳ Planned |
| M6 | ⏳ Planned |

- **Earned milestone progress:** 4 of 10 = **40%**.
- **Est. engineering sessions remaining:** ~15–19.
- **Technical debt:** OS/Studio auth duplication (M3-S resolves it next) ·
  ceremony/MFA screen copy is engineer-drafted (no UX Blueprint section) ·
  `test:real` npm script is bash-only on Windows (PowerShell form documented).
- **Open founder decisions:** exact official hex values from the source design
  file for the Brand step.
- **Risks:** M4 scope creep (largest ahead) · refactor regression in M3-S
  (tests are the net).
- **Features complete vs. planned:** password ceremony, real TOTP enroll, MFA
  challenge, Studio sign-in, role guards ✅ · revocation, session lifetimes,
  password reset (M3-3) ⏳.

## What was built

- **Forced first-login password change** — server-controlled
  `password_rotated` flag in GoTrue `app_metadata` (no schema change);
  middleware blocks every app surface until rotation completes.
- **Real TOTP MFA enrollment** (founder ruling A1) — genuine authenticator-app
  enrollment (QR + manual key), enforced for internal roles before any surface;
  no simulation.
- **MFA challenge at sign-in** — internal session starts at aal1, held at the
  challenge until a valid code steps it to aal2.
- **Advisor Studio sign-in + landing** — §4.1 pattern with the approved skin
  line; app-scoped cookie namespace isolates OS and Studio sessions.
- **Role-scoped route guards** — advisor refused by OS, internal refused by
  Studio, both via the calm unauthorized page. Authorization authority remains
  live RLS; the JWT `user_role` claim is routing convenience only.
- **Dev tooling** — `npm run demo:reset` regenerates all synthetic demo
  accounts and fresh onboarding state on demand (founder direction; replaces ad
  hoc account deletion).

## Executed and verified

- **Real Supabase stack, 49/49 tests** (M2 regression 42/42 unchanged; 7 M3
  auth integration tests incl. real TOTP enroll + challenge and the aal1→aal2
  step-up). `turbo build typecheck` 8/8.
- Full ceremony (password change → TOTP enroll → challenge → sign-out/in →
  role routing) verified end-to-end in-browser, and independently in the
  founder's interactive walkthrough (approval basis).

## Defect summary (found and fixed during founder review)

Three issues surfaced while the founder walked the internal MFA flow. All were
in M3-2 code (or my diagnosis of it) and were corrected before this commit.

1. **QR code did not render (root cause).** Supabase's `mfa.enroll` returns
   `totp.qr_code` **already as an SVG data URL** (`data:image/svg+xml;utf-8,…`).
   The enrollment page wrapped it a *second* time
   (`data:image/svg+xml;utf8,${encodeURIComponent(qr)}`), producing an invalid
   nested data URL; the `<img>` rendered only its alt text, so the code could
   not be scanned. **Fix:** consume `qr_code` directly, with a defensive
   fallback that wraps raw SVG only if the format ever changes.

2. **Enrollment flakiness (root cause — React Strict Mode).** The enrollment
   `useEffect` ran a non-idempotent async sequence (list → unenroll unverified
   → enroll) with **no run-once guard**. React's dev-mode Strict Mode
   deliberately invokes effects twice to surface exactly this pattern; the two
   runs raced, which could leave the on-screen secret inconsistent with the
   server's active factor and made verification intermittently fail. **Fix:** a
   `useRef` run-once guard so enrollment executes exactly once per mount. This
   is a **dev-only** behavior (Strict Mode does not double-invoke in production
   builds), but the guard is correct hygiene regardless.

3. **Admin-API factor-visibility correction (verification honesty).** While
   diagnosing, I initially treated the GoTrue admin endpoint
   (`GET /admin/users/{id}`) `factors` array as authoritative and read
   "0 factors" as proof of an orphaned enrollment. **That was incorrect:** this
   GoTrue version does not return TOTP factor records in that admin payload —
   the array is empty even for a *verified* factor. The "0 factors" reading was
   therefore not diagnostic. The authoritative signal is the
   enroll → challenge → verify flow reaching aal2 and the signed-in shell, which
   both the integration tests and a manual end-to-end run confirm. Recorded here
   per the verification-honesty standard so the flawed intermediate inference is
   not mistaken for a finding.

4. **Tests added to prevent regression.** The M3-2 TOTP integration test now
   asserts the enrollment response carries renderable SVG QR content
   (`<svg…>` at the raw REST layer, or an `data:image/svg+xml` URL via the
   client). Honest scope note: the specific defect (#1) is at the **client
   render** layer — the page re-wrapping the client's already-formed data URL —
   and the double-wrap regression itself is **not** catchable by the current
   db/integration harness (no React renderer); nor is the Strict Mode guard
   (#2). Both are covered by manual end-to-end verification and the founder
   walkthrough, and are listed as a known coverage gap — a React component test
   harness (jsdom + Testing Library) is a candidate addition in a later
   milestone. The added assertion guards the backend contract the fix relies on.

## Known limitations / deviations

- No client-side React component test harness yet (see defect #4) — client
  render behavior is verified manually.
- Ceremony/MFA/unauthorized screen copy is engineer-drafted (no UX Blueprint
  section covers these states) — flagged for founder wording review.
- A dev-mode hydration warning caused by browser extensions (e.g. Grammarly)
  injecting `<body>` attributes was suppressed with `suppressHydrationWarning`
  on `<body>` in both apps — the Next.js-recommended handling; it relaxes only
  that element's attribute check.
