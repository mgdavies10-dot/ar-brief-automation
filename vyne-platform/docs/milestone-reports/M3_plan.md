# M3 Implementation Plan — Auth, sessions, revocation (for founder review)

**Status:** PROPOSED — no M3 implementation begins until founder approval
**Change level:** 3 (authentication) · **Authorization:** EA-001 scope item 3; plan
M3 (DL-2026-010) · **Preconditions:** M2 real-stack verification completed and pushed
(DL-2026-012 conditions 3–4) — this plan may be *reviewed* in parallel but not
*executed* before that gate closes.

## 1. Objectives and scope

Deliver working authentication for the slice: email + password sign-in, TOTP MFA
capability (internal roles required-capable, advisors optional), role claims, session
lifetimes per Architecture §12 (internal 12h with 30-min idle; advisor 24h; 10-minute
access tokens with refresh rotation), immediate revocation, and password reset —
against the real local Supabase Auth (GoTrue), with every auth event audited.

**Out of scope (EA-001):** SSO, magic links, outbound email of any kind, hosted
deployment, advisor self-registration (provisioning is VYNE-initiated only), analyst/
operations/finance role activation.

## 2. Features to be implemented

1. **Supabase Auth configuration** (`packages/db/supabase/config.toml`): 10-min JWT
   expiry, refresh-token rotation with reuse detection, TOTP enabled, signups
   disabled (admin-provisioned accounts only).
2. **Provisioning path (no email):** founder-run script (`packages/db`) creates auth
   users + `public.users` rows for the seed identities with temporary passwords;
   **first-login forced password change**, and for internal roles **forced MFA
   enrollment before any app surface renders**. Activation = manual credential
   delivery outside the platform (consistent with the Architecture's
   communication-outside-platform posture). *This replaces an email invitation flow;
   see Risk R2.*
3. **OS sign-in** (apps/os) per UX §4.1: centered card on ivory, email+password, MFA
   challenge step, "That email and password don't match" (never revealing which),
   disabled account → calm unauthorized page with contact line.
4. **Studio sign-in** (apps/studio): same pattern, Studio skin ("Your workspace is
   private and prepared for you by VYNE Strategies."), MFA offered not required.
5. **Session middleware** (both apps, `@supabase/ssr`): token refresh; app-enforced
   idle timeout (30-min internal) and absolute lifetimes (12h internal / 24h advisor)
   tracked server-side against session start/last-activity; role-scoped route guards
   mirroring RLS (§12 defense in depth); unauthorized states per UX §2.4.
6. **Role claims:** custom access-token hook embeds `user_role` in the JWT for route
   guards; **RLS continues to resolve role/status live from `public.users`** (as
   verified in M2) so revocation never waits on token expiry. The JWT claim is a
   convenience, never the authority.
7. **Immediate revocation:** founder disables a user → `users.status='disabled'`
   (already kills every RLS path, M2-verified) + GoTrue admin sign-out invalidating
   refresh tokens; 10-min token cap bounds any residual window; route guards
   re-check status per request.
8. **Password reset:** GoTrue recovery flow with links captured by the local stack's
   mail-capture inbox (Mailpit/Inbucket) — nothing leaves the machine. See Risk R1.
9. **Audit wiring:** `packages/audit` writer (server-side) records `auth.login`,
   `auth.login_failed`, `auth.logout`, `auth.session_revoked`, `user.created`,
   `user.disabled` with actor/role/ip/user-agent; `users.last_login_at` maintained.

## 3. Architecture impact

None to the approved architecture — this implements §12 as written. Additions are
config, app middleware, one auth hook, and the audit writer. No new packages.

## 4. Database changes

Expected minimal; each lands as a reviewed migration with rollback:
- Migration 0008: custom access-token hook function (reads `public.users.role`) +
  grant to `supabase_auth_admin`.
- Possibly a `sessions_meta` helper (only if idle/absolute enforcement cannot be
  done statelessly from GoTrue session data — decided during M3-A, reported in the
  milestone report either way).
- **No changes to existing tables or policies are anticipated.** Any RLS-touching
  need = Level 3 stop → founder before implementation.

## 5. Security and RLS impact

RLS policies are untouched; M2's verified posture is the foundation. New negative
tests (all executed, real stack): disabled user with a live session (UI, API, and DB
paths all die), refresh-after-disable rejected, advisor session probing OS routes,
internal user without MFA enrollment blocked from app surfaces, login rate-limit
behavior (GoTrue local defaults), token-reuse detection.

## 6. Risks and assumptions

- **R1 — Recovery email vs. "no email sending" (needs founder ruling at plan
  approval):** EA-001 excludes email sending. Password reset uses the local stack's
  capture inbox only — no real email leaves the machine, and production email would
  require Q-2 vendor sign-off anyway. **Assumption: local-capture recovery is
  consistent with EA-001's exclusion; alternative if you disagree: founder-run
  admin password reset script, no recovery flow in v1-slice.**
- **R2 — No invitation emails:** provisioning is script + manual credential delivery
  with forced rotation on first login. Real invitation flow deferred to post-Q-2.
- **R3 — GoTrue behavioral differences** vs. the M2 shim may surface (claims format,
  session semantics). Mitigated by the M2 real-stack verification landing first;
  differences documented per DL-2026-012 condition 6.
- **R4 — Two apps, one auth project:** OS and Studio on different localhost ports
  share the Supabase project; separate cookie storage keys prevent a Studio session
  from riding into OS (and route guards + RLS make it inert if it did).
- **A1:** MFA "required-capable" for internal roles is interpreted as *enforced
  enrollment at first internal login* (not merely available). Flagged for
  confirmation since "capability" could be read weaker; the stronger reading matches
  §12 ("mandatory for internal roles").

## 7. Acceptance criteria (frozen at approval)

1. Founder and recruiter can sign in with email+password+TOTP; advisor with
   email+password (TOTP optional, enrollable in settings).
2. Internal login without completed MFA enrollment cannot reach any app surface.
3. Session lifetimes enforced: 10-min access tokens; refresh rotation; 30-min idle
   logout (internal); 12h/24h absolute caps.
4. Disabling a user kills existing sessions across UI, API, and DB paths within one
   request cycle (executed test), and refresh attempts fail.
5. Password reset completes locally end-to-end with zero external email.
6. Role claims present in JWT and consistent with `public.users.role`; guards and
   RLS agree (authorization parity test).
7. Every listed auth event appears in `audit_events` with actor, role, ip, user agent.
8. Sign-in error and disabled-account states match UX §4.1 exactly (both skins).
9. Full M2 RLS suite still green in real-stack mode after all M3 changes.

## 8. Testing strategy

Integration (vitest + supabase-js against the real local stack): provisioning, login,
MFA enroll/challenge, refresh rotation, revocation, reset — the §5 negative suite.
E2E (Playwright, both apps): sign-in flows, idle timeout, disabled-account page.
Regression: `npm run test:real` (M2 suite) after every M3 sub-phase. All claims per
the RELEASE_GOVERNANCE §2 seven-element standard.

## 9. Implementation order and proposed sub-milestones

- **M3-A — Auth backbone (no UI):** config.toml auth settings; claims hook migration
  (+rollback); provisioning script; audit writer; integration tests for
  login/MFA/refresh/revocation/reset via API. *Checkpoint report.*
- **M3-B — App integration:** middleware/guards both apps; OS + Studio sign-in
  screens; forced password-change and MFA-enrollment flows; idle/absolute session
  enforcement; unauthorized/disabled states; Playwright e2e; full regression.
  *Milestone report.*

**Recommendation:** keep M3 as one milestone with the M3-A checkpoint report
delivered mid-flight (no mandatory stop unless something surfaces), full stop and
founder review at M3-B completion. Splitting into two founder-gated milestones is the
more conservative alternative; I don't recommend it — the backbone alone has little
reviewable surface without the flows on top.

## 10. Founder decisions requested with plan approval

1. Approve the plan and acceptance criteria (freezes them).
2. Rule on **R1** (local-capture recovery vs. admin-reset-only).
3. Confirm **A1** (MFA enforced-enrollment reading).
4. Confirm the M3-A checkpoint / M3-B stop structure (§9).
