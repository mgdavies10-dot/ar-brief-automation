# M3-S Report — Shared authentication extraction (EA-001)

**Date:** 2026-07-21 · **Milestone:** M3-S (roadmap; founder-directed refactor) ·
**Status:** **Complete — awaiting founder gate review** (uncommitted)

## Progress dashboard (earned milestone progress)

| Milestone | Status |
|---|---|
| M1 | ✅ Complete |
| M2 | ✅ Complete |
| M3-1 | ✅ Complete |
| M3-2 | ✅ Complete |
| M3-S | 🟡 Pending founder approval |
| Brand Update | ⏳ Planned (next) |
| M3-3 | ⏳ Planned |
| M4 | ⏳ Planned |
| M5 | ⏳ Planned |
| M6 | ⏳ Planned |

- **Earned milestone progress:** 4 of 10 = **40%** (M3-S → 50% on approval).
- **Est. engineering sessions remaining:** ~14–18.
- **Technical debt:** *reduced* — OS/Studio auth duplication eliminated. Remaining:
  auth screen React components still live per-app (thin, mostly skin-specific);
  no React component test harness; `test:real` bash-only on Windows.
- **Open founder decisions:** exact official hex values from the source design
  file for the Brand step (next milestone).
- **Risks:** M4 scope creep (largest ahead). Refactor regression risk retired by
  full re-verification below.
- **Features complete vs. planned:** unchanged from M3-2 (this was a
  no-behavior-change refactor) — auth foundation complete; M3-3
  revocation/lifetimes/reset ⏳.

## Objective

Eliminate the OS/Studio authentication duplication so M4 (and M3-3) consume one
foundation instead of copying it a third time — per founder direction
(2026-07-20), executed immediately after M3-2.

## What was extracted

New package **`@vyne/auth`** (single source of truth for auth logic):
- `server` — `createServerSupabase(cookieName)` (request-cookie-bound client).
- `browser` — `createBrowserSupabase(cookieName)` (client-component client).
- `admin` — `markPasswordRotated` (server-only GoTrue admin call).
- `middleware` — `createAuthMiddleware(config)`: one gate builder covering
  authentication, role routing, the A1 rotation gate, MFA challenge (step-up),
  and mandatory MFA enrollment — parameterized per app by four predicates
  (`cookieName`, `blockRole`, `gatesApplyTo`, `mfaEnrollmentRequired`).
- `actions` — shared `performSignIn` / `performSignOut` / `performSetPassword`
  logic; each app keeps a thin `"use server"` boundary that delegates with its
  cookie name.

Shared styles: the identical `.signin-*` card/ceremony/MFA/unauthorized block
moved to **`@vyne/ui/auth.css`**, imported by both apps.

Both apps reduced to thin, app-specific wiring: `lib/supabase/*` are 3-line
cookie-binding adapters; `middleware.ts` is a config object; action files are
one-line delegations; app-specific chrome (top bars, home surfaces) stays local.

## Acceptance criteria — met

- **No behavioral change.** Full auth surface re-verified in-browser on both
  apps (see below).
- **Full suite green.** Real Supabase stack **49/49** (unchanged); `turbo build
  typecheck` **9/9**.
- **Net line count down.** Apps + packages: **512 insertions, 693 deletions =
  net −181 lines**, despite adding the new package.
- **No auth logic duplicated.** Client construction, admin call, middleware
  gate, action logic, and auth CSS are now single-sourced; per-app files carry
  only the cookie name and the role/MFA policy predicates.

## Verification (executed, this session)

Both dev apps, real Supabase stack, every auth path exercised end-to-end:
- Sign-in error (shared action) → §4.1 message; shared `@vyne/ui/auth.css`
  applied (card confirmed styled from the shared sheet).
- Rotation gate → `/welcome`; password set (shared action).
- MFA enrollment → QR renders (231px), code verifies, reaches signed-in shell.
- MFA challenge on re-login → "One more step".
- OS role guard: advisor → calm unauthorized page.
- Studio: advisor ceremony → landing (MFA optional, none forced); skin line
  present.
- Studio role guard: internal role → calm unauthorized page.

## Defect found and fixed during M3-S

**`transpilePackages` omission.** Moving the `NEXT_PUBLIC_*` env reads into the
shared package broke the browser client at first: neither app listed
`@vyne/auth` in `next.config.ts` `transpilePackages`, so Next did not transpile
it or inline the public env vars into the client bundle — the MFA enrollment
page threw a client-side exception. **Fix:** added `@vyne/auth` to
`transpilePackages` in both apps (matching the existing `@vyne/ui`/`@vyne/domain`
entries). Re-verified end-to-end after a clean dev-server restart. A transient
turbo typecheck failure was also observed and traced to a race with the running
dev server regenerating `.next/types` (direct `tsc` clean; re-run 9/9 green) —
not a code issue.

## Known limitations

- Auth **screen React components** (login/welcome/mfa/challenge/unauthorized)
  remain per-app — they are thin and carry the per-app skin (e.g. the Studio
  line, the OS role chip). Consolidating them into shared client components is a
  candidate future cleanup; the logic they call is already shared.
- No React component test harness (carried from M3-2) — client render behavior
  verified manually.
