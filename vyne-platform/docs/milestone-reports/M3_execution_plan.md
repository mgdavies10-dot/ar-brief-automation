# M3 Execution Plan — phase sequencing for founder-reviewable delivery

**Status:** PROPOSED — companion to `M3_plan.md` (the technical plan; its
acceptance criteria and §10 decision requests stand unchanged). No M3 production
code begins until the founder approves both documents.
**Founder direction implemented here (2026-07-20, recorded in DECISION_LOG):**
every milestone — and within M3, every phase — ends with something the founder
can open, click, evaluate, and give feedback on. Visible product functionality
takes priority over infrastructure unless a critical blocker surfaces.
**Preconditions met:** M1 accepted; M2 finally accepted (42/42 on the real
Supabase stack, DL-2026-012 conditions 3–4 discharged).

## 1. First visible user-facing features

Authentication is the gateway to every slice screen, and it is itself the first
visible product surface. In founder-visible terms, M3 delivers:

1. **The VYNE OS sign-in experience** (UX §4.1): centered card on ivory,
   email + password, the exact error language ("That email and password don't
   match"), and a signed-in OS landing showing who you are and your role.
2. **The Advisor Studio sign-in experience** with its own skin ("Your workspace
   is private and prepared for you by VYNE Strategies.") — the first time the
   advisor-facing product is visitable.
3. **Credential ceremony**: first-login forced password change; TOTP enrollment
   with a real authenticator app (required for internal roles, optional for
   advisors); the MFA challenge step.
4. **Trust behaviors you can watch work**: a disabled account dying mid-session,
   idle and absolute session timeouts, password reset completing end-to-end in
   the local mail-capture inbox, and every auth event landing in the audit log.

Data-rich screens (advisor lists, decisions, artifacts, publication) are M4+
scope by the accepted plan — the same phase-gate structure will apply to them,
and M3's session/role foundation is exactly what those screens sit behind.

## 2. Build order and phases

Three phases, each ending in a founder review gate with a working, clickable
state. Order is driven by "visible earliest": the OS sign-in screen lands in
phase 1, not after the backbone is polished.

### Phase M3-1 — First sign-in (estimate: 1–2 working sessions)
Build: Supabase auth config (`config.toml`: 10-min JWTs, refresh rotation,
TOTP enabled, signups disabled); migration 0008 role-claims hook (+ rollback);
provisioning script creating the synthetic founder/recruiter/advisor accounts;
OS sign-in screen per UX §4.1; minimal session middleware; signed-in OS landing
(identity, role, sign out).
**Founder can review:** open `http://localhost:3000`, sign in as the synthetic
founder, see the landing, try a wrong password (exact §4.1 error), sign out.

### Phase M3-2 — Credential ceremony + Studio (estimate: ~2 working sessions)
Build: first-login forced password change; TOTP enrollment (QR + authenticator
app) enforced for internal roles before any app surface renders; MFA challenge
step; Studio sign-in screen and signed-in Studio landing; advisor optional-MFA
path; role-scoped route guards (advisor session cannot reach OS routes).
**Founder can review:** complete the full first-login ceremony (temp password →
rotation → MFA enrollment → challenge) as a synthetic recruiter; sign into
Studio as a synthetic advisor at `http://localhost:3001`; watch an advisor
session get refused by OS routes.

### Phase M3-3 — Session integrity, revocation, recovery (estimate: 2–3 sessions)
Build: idle timeout (30-min internal) and absolute lifetimes (12h/24h); refresh
rotation with reuse detection; immediate revocation (disable → all paths die
within one request cycle); disabled-account calm page; password reset via the
local Mailpit capture inbox (subject to the R1 ruling in `M3_plan.md` §10);
audit wiring for all listed auth events; full integration + Playwright e2e
suites; M2 real-stack regression re-run.
**Founder can review:** disable a signed-in synthetic recruiter and watch the
session die live; run password reset end-to-end in Mailpit
(`http://127.0.0.1:54324`) with zero external email; see the disabled-account
page; inspect the auth audit trail (founder-only SQL for now — an audit UI is a
later-milestone surface). Milestone report delivered; full M3 stop-and-review.

**Gate structure note:** `M3_plan.md` §9 proposed a mid-flight checkpoint
without a mandatory stop. Under the new founder direction this execution plan
supersedes that recommendation: **each phase ends with a founder review gate.**
Feedback at a gate is folded in before the next phase begins.

## 3. Technical risks

Carried from `M3_plan.md` §6 (still accurate): **R1** recovery-email posture
(needs the founder ruling at approval), **R2** no invitation emails (script
provisioning + manual credential delivery), **R3** GoTrue behavioral surprises
(mitigated — M2 real-stack verification found zero differences), **R4** two
apps sharing one auth project (separate cookie keys + guards), **A1** the
strict MFA-enrollment reading (confirmation requested).

New/execution-level risks:
- **E1 — `@supabase/ssr` + Next.js 15 middleware integration** is the fiddliest
  part of phase 1–2; sequenced early deliberately so problems surface at the
  first gate, not the last.
- **E2 — Idle/absolute lifetime enforcement** may need server-side session
  metadata if GoTrue's session data proves insufficient (anticipated in
  `M3_plan.md` §4 as a possible small migration; any RLS-touching need is a
  Level 3 stop).
- **E3 — Windows dev environment**: PowerShell-specific commands and session
  PATH for `psql` (documented in SETUP.md); low residual risk after M2.
- **E4 — TOTP time-skew** on local clocks can make MFA tests flaky; tests will
  use the server-generated secrets/codes rather than screen-scraping.
- **E5 — Serial real-stack suite duration** grows as M3 tests join the M2 42;
  acceptable locally, monitored at each gate.

## 4. Standing constraints (unchanged)

EA-001 scope only: synthetic data, local only, no hosted deployment, no real
email leaves the machine, no AI features, no excluded modules. Authentication
acceptance tests are frozen at plan approval and may not be weakened or
deferred without a new, explicitly approved stop condition. The M2 real-stack
suite (42/42) is the regression gate after every M3 change. Any conflict,
undefined rule, or stack limitation → stop and report, never invent.

## 5. Approvals requested

1. Approve this phase structure and its three founder review gates.
2. Approve `M3_plan.md` (freezes acceptance criteria) and rule on its §10
   items: R1 (local-capture recovery vs. admin-reset-only) and A1 (MFA
   enforced-enrollment reading). Its §9 gate recommendation is superseded by
   §2 above.
