# ADR-003 — Role-specific session policies

- **Status:** Proposed (founder-directed 2026-07-21; not yet implemented)
- **Milestone:** M3-3 · **Change level:** 3 (authentication/session security)
- **References:** Architecture §12; M3-3 report; DL session-lifetime direction

## Context

The product requires **role-specific** session lifetimes:

| Role | Access token | Idle timeout | Absolute cap |
|---|---|---|---|
| Internal (founder, recruiter, admin) | 10 min | 30 min | 12 h |
| Advisor (Studio) | 10 min | 60 min | 24 h |

The local Supabase GoTrue exposes session timeouts (`[auth.sessions]` `timebox`,
`inactivity_timeout`) only **globally** — one policy for all roles. Access-token
lifetime (10 min) and refresh-token rotation are already configured correctly and
are not role-specific concerns.

A one-size global value forces a bad tradeoff: the strict internal caps
(12 h/30 min) would **degrade the advisor experience** (premature logout); the
lenient advisor caps (24 h/60 min) would **loosen internal security**. Neither is
acceptable as permanent product behavior.

## Decision (interim)

**Do not set a global session cap.** Carry role-specific idle/absolute
enforcement as a documented limitation rather than degrade any role. In the
interim, session security rests on the controls already verified in M3-3:
10-minute access tokens, refresh-token rotation with reuse detection, and
**immediate revocation** (disable → RLS denies every path on the next query +
GoTrue ban). Idle/absolute caps are defense-in-depth, not the primary control.

## Proposed target architecture (application layer)

Enforce the role caps in the **shared middleware** (`@vyne/auth`), stateless:

1. On sign-in, the middleware stamps two `httpOnly`, `SameSite=Lax`, signed
   cookies: `vyne-session-start` and `vyne-session-seen` (issued-at + last-seen).
2. On every request, read the JWT `user_role` claim → look up that role's
   `{ idleMs, absoluteMs }` from a single policy table in `@vyne/auth`.
3. If `now − seen > idleMs` **or** `now − start > absoluteMs` → sign out
   (clear the Supabase cookies) and route to `/login?status=ended`. Otherwise
   refresh `vyne-session-seen` on the outgoing response.
4. Cookies are signed (HMAC with a server secret) so lifetime hints can't be
   extended by tampering; even if they were, RLS + revocation remain the
   authority, so the blast radius is a longer-than-intended session hint, never
   data access.

Chosen for: no schema change, no per-request DB round-trip, per-role by
construction, and it lives beside the existing middleware gates. Escalation path
if server-authoritative session state is ever required: a `sessions_meta` table
(session_id → started_at, last_seen, role) checked in middleware — deferred
until a concrete need (it adds a query per request and a migration).

## Consequences

- **Now:** no idle/absolute cap enforced; documented and accepted; other session
  controls hold. Long-term product target above is preserved, not overwritten.
- **When implemented:** a reviewed change under EA-001 auth scope, with real-stack
  tests (idle expiry, absolute expiry, per-role differentiation) and e2e.
