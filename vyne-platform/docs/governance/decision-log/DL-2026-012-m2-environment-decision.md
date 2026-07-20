# DL-2026-012 — M2 verification environment and continuation path

- **Decision ID:** DL-2026-012
- **Date:** 2026-07-20
- **Status:** Approved — Option B (conditions 3–4 discharged 2026-07-20; see Discharge record below)
- **Owner:** Founder
- **Participants:** Founder; Lead Engineer (proposal and options); Product Council
  precedent CR-001 §3 / DL-2026-011
- **Change level:** 3 — affects authentication verification, execution evidence, and
  milestone acceptance

## Proposal / situation

M2 (database + RLS + audit) required executed verification, and CR-001 §3 rejects
authored-but-unexecuted security code. The cloud build session could not run the
local Supabase stack: the session's egress policy blocks Docker image-layer downloads
(CloudFront CDN hosts return 403 on CONNECT for both docker.io and public.ecr.aws),
while the Supabase CLI itself (v2.109.1) and native PostgreSQL 16.13 were available.

## What was actually verified (scope of evidence, stated precisely)

- All seven migrations and the full M2 suite were executed against **native
  PostgreSQL 16.13** using a **test-only Supabase-semantics auth shim**
  (`packages/db/test/shim/auth_shim.sql`; ADR-001).
- Result: **42/42 tests passing** in that environment, including rollback
  verification of the latest migration and a full down-chain/re-apply cycle.
- **This is not production-equivalent Supabase Auth verification.** It proves policy
  behavior under the native-PostgreSQL harness; it does not prove interaction with
  real Supabase Auth claims, service roles, token refresh, or GoTrue behavior.

## Options considered

- **A** — broaden the cloud environment's egress policy to allow Docker registries and
  their CDN hosts, then run `supabase start` in place.
- **B** — move the build to Claude Code on the founder's machine, where Docker can
  pull and run the genuine Supabase stack.
- **C** — proceed in the cloud with maximal shim-based verification and defer the
  remainder to a pre-acceptance real-stack re-run.

## Council recommendation

Option B (consistent with DL-2026-011's original Option 3 recommendation): real
services where the code lives; no accumulation of M3 work on an unverified
foundation; Option C only if running locally is genuinely impractical.

## Founder decision

**Approved — Option B.** Continue on local Claude Code with Docker and the genuine
Supabase stack. Repository evidence of the founder decision: commit `d899b7c`
(Decision Log founder-directions entry, HANDOFF.md, M2 report addendum), confirmed by
founder ruling of 2026-07-20 assigning this DL number.

## Binding conditions (open until discharged)

1. **M1 is accepted.**
2. **M2 is provisionally accepted** — not finally accepted.
3. Final M2 acceptance requires rerunning the **identical committed migrations,
   unmodified**, and the complete applicable suite against the **genuine local
   Supabase stack**, with results and exact commands recorded in the M2 report
   (procedure: `docs/HANDOFF.md`).
4. **Substantive M3 implementation may not begin** until that verification is
   completed, reported, committed, and pushed.
5. **The M3 implementation plan must be reviewed by the founder before M3 code
   begins** (required coverage listed in `docs/HANDOFF.md`).
6. Any behavioral difference found between the shim and real Supabase is documented
   and corrected with written rationale — never adjusted "solely to make tests pass."

## Risks and trade-offs

Accepted: short delay moving environments. Avoided: weakening the acceptance standard
before the first vertical slice; building authentication (M3) on approximated
foundations. Residual: none identified beyond the open conditions.

## Classifications and approvals

- **Legal classification:** not applicable (no legal question raised).
- **Security classification:** security-relevant; CTSO-lens standard applied
  (execution-verification discipline).
- **Outside approvals:** none required.

## Affected documents

ADR-001 (implements), `docs/HANDOFF.md` (procedure), M2 milestone report (addendum),
`RELEASE_GOVERNANCE.md` §5 (standing condition), `SOURCE_OF_TRUTH_MAP.md` (status
columns).

- **Implementation owner:** Lead Engineer (local session)
- **Acceptance conditions:** §Binding conditions above
- **Review date:** at M2 final acceptance
- **Superseded by:** —

## Discharge record (2026-07-20)

Conditions 3–4 discharged: the identical committed migrations and the complete
42-test suite were executed against the genuine local Supabase stack on the
founder's machine (Supabase CLI 2.109.1, PostgreSQL 17.6, real GoTrue `auth`
schema and roles, no shim) — **42/42 passing, zero shim-vs-real behavioral
differences, no corrections required** (condition 6 had nothing to document).
Results, environment, and exact commands recorded in the M2 report final section
and pushed with it. Founder reviewed and accepted the results the same day —
**M2 is finally accepted.** Conditions 1–2 are thereby superseded by final
acceptance; condition 5 (M3 plan review before M3 code) remains in force.
