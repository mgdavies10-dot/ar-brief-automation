# M2 Report — Database + RLS + audit (EA-001)

**Date:** 2026-07-20 · **Milestone:** M2 of the accepted plan (DL-2026-010) · **Status:** **Accepted** — real-Supabase binding verification complete (see final section; ADR-001 / DL-2026-012 conditions discharged)

## Environment decision executed
Per the M1 report's flag, the founder was offered the three M2-environment options and
expressed no preference. The recommended path was taken: **all M2 database work executed
and verified against the container's native PostgreSQL 16.13** using a test-only
Supabase-semantics auth shim, with a **binding condition** that the identical migration
set and security suite re-run on a real local Supabase stack before slice acceptance.
Recorded as **ADR-001**; this is a reported substitution of verification environment,
not a silent one, per EA-001.

## What was built
`packages/db/supabase/migrations` — seven migrations, each with a paired rollback
script in `supabase/rollbacks`:

| Migration | Contents |
|---|---|
| 0001_conventions | `vyne_private` helper schema; `updated_at` maintenance; append-only guard function |
| 0002_identity | `users`, `advisor_accounts`; §12 helper functions (`app_user_id`, `app_role`, `is_founder`, `is_internal`, `my_advisor_ids`) embedding the immediate-revocation check; founder-only identity-field guard; RLS + grants |
| 0003_relationship_core | `firms`(min), `teams`(min), `advisors` (full §4 columns); ownership-reassignment guard (founder-only); recruiter auto-assignment on create; RLS + grants |
| 0004_decisions | `decision_types` lookup seeded with the ten CR-001 §1.1 values; `decisions`; `decision_evidence`(min); RLS inheriting decision visibility |
| 0005_documents_artifacts | `documents` (attestation NOT NULL + completeness CHECK, §0.2); `artifacts` with lifecycle-authority guard (recruiters: draft/in_review only; approval fields founder-only); `published_artifacts` with snapshot-immutability guard; the publication-boundary RLS (§0.8) |
| 0006_activity_tasks | `activities` (internal-only); `tasks` with the advisor's sole write path (status→done + note) enforced by trigger; dual internal/advisor RLS |
| 0007_audit | `audit_events` append-only: INSERT-only grants, UPDATE/DELETE/TRUNCATE revoked from all API roles **and** trigger-blocked at the owner level; founder-only read policy |

All 13 EA-listed tables exist (plus the `decision_types` lookup — 14 total), all with
§4 conventions: uuid pk, `created_at`/`updated_at`/`created_by`, `deleted_at` soft
delete, **RLS enabled at creation**. Test infrastructure: auth shim
(`test/shim/auth_shim.sql`), provisioning harness, synthetic fixtures (clearly-marked
demonstration data), 42-test suite.

## Executed and verified (nothing below is authored-only)
- **All seven migrations execute cleanly** on PostgreSQL 16.13 (applied in order to
  fresh scratch databases on every test run).
- **RLS suite: 42/42 tests passing**, covering:
  - founder full visibility; recruiter own-scope only; **cross-recruiter invisibility**
    including direct-id probing (URL-manipulation analog);
  - **advisor zero-grant posture**: zero rows from all nine internal tables, own
    `users` row only, inserts rejected;
  - **publication boundary**: advisor sees exactly own non-withdrawn snapshots;
    withdrawn invisible to advisor but preserved internally; recruiter cannot publish;
    snapshots immutable even to the founder (metadata-only withdrawal allowed);
  - **lifecycle authority**: recruiter can draft/submit, cannot approve or touch
    approved artifacts; founder approves;
  - **advisor task surface**: sees own advisor-visible tasks only; can mark done with
    note; every other field/status/foreign task rejected;
  - **immediate revocation**: disabled user reads zero rows everywhere (incl. own user
    row) and cannot write;
  - **audit append-only**: authenticated append works (write-only, no read-back);
    founder-only read; UPDATE/DELETE blocked at privilege level for API roles and at
    trigger level for the table owner;
  - **soft delete** filtering; **anon** fully locked out; **attestation** NOT NULL
    enforced (§0.2).
- **Rollback verified**: latest migration (0007) rolled back and re-applied (EA
  acceptance criterion); additionally the **full down-chain** leaves an empty public
  schema and full re-apply restores all 14 tables.
- Monorepo remains green: `turbo run build typecheck test` — 12/12 tasks.

## Findings fixed during verification (why executed verification matters)
1. An initial `advisor_accounts` policy let advisors read their own mapping row —
   tightened to founder-only (§12's grant enumeration is exhaustive); test now pins it.
2. `INSERT … RETURNING` on `audit_events` is subject to the founder-only SELECT policy —
   the audit writer contract is write-only, tests pin that shape.
3. Rollback 0002 initially dropped helper functions before dependent policies — reordered.

## ADRs added
- **ADR-001** — M2 verification on native PostgreSQL 16 with test-only auth shim
  (environment substitution, binding re-verification condition).
- **ADR-002** — Minimal-scope tables under EA-001 (per CR-001 §1.2): firms/teams
  subsets, `decisions.opportunity_id` omitted, `record_access` not created,
  `decision_types` lookup added, advisor_accounts read posture.

## Stop-condition contact
None triggered. One forward flag: **M3 (Supabase Auth + TOTP + sessions) cannot be
fully verified in this environment** if Docker images remain unreachable — GoTrue is
not emulatable the way `auth.uid()` is. Resolution options are the same three from the
M1 report; this needs deciding before M3 implementation begins.

## Stopped for review
Per the rules of engagement (mandatory stop at M2). Awaiting founder/council direction
on: (a) acceptance of ADR-001/ADR-002, (b) the M3 environment question above.

## Founder ruling (2026-07-20, post-review addendum)
M1 **accepted**. M2 **provisionally accepted** — implementation complete, but final
acceptance is conditional on re-verification against the real Supabase stack
(ADR-001 binding condition; procedure in docs/HANDOFF.md). Scope note on this
report's test claims: the 42/42 result proves the policies under the native
PostgreSQL harness; it does not yet prove interaction with real Supabase Auth
claims, service roles, token refresh, or GoTrue behavior. M3 environment decision:
**Option B** — the build moves to Claude Code on the founder's machine. The
real-stack verification must be completed and pushed before substantive M3 work.

## Real-Supabase binding verification (2026-07-20, founder's machine — ADR-001 / DL-2026-012)

**Result: 42/42 tests passed against the genuine local Supabase stack. 0 failed,
0 skipped, no shim applied, no code/test/migration/fixture changes required.**
Founder reviewed and accepted the results the same day; DL-2026-012 conditions
3–4 are discharged by this commit and push. **M2 is finally accepted.**

### Environment (verification honesty standard)
- Founder's machine: Windows 11 Pro (10.0.26200), PowerShell.
- Docker Desktop, engine 29.6.1 on WSL 2 (WSL 2.7.10.0 installed for this
  verification), 16 CPUs / ~8 GB engine memory.
- Node v24.18.0; Supabase CLI **2.109.1** installed as a `vyne-platform`
  devDependency and run via `npx supabase` (same CLI version as the cloud M2
  session); `psql` 16.12 client from the official EDB PostgreSQL 16.12-1
  binaries (per-user install, client tools only — no local PostgreSQL server).
- The stack's managed database is **PostgreSQL 17.6** (CLI default) at
  `127.0.0.1:54322`, with the real GoTrue-owned `auth` schema and real
  `anon`/`authenticated`/`service_role` roles.

### Exact commands executed
```powershell
cd vyne-platform
npm install
npx turbo run build typecheck        # 8/8 tasks successful (test task excluded:
                                     # shim mode needs a native PG at 5432 that
                                     # does not exist on this machine; the db
                                     # suite is verified for real below)
cd packages/db
npx supabase init                    # created only supabase/config.toml and
                                     # supabase/.gitignore; migrations/ and
                                     # rollbacks/ untouched (git-verified clean)
npx supabase start                   # all services healthy (imgproxy/pooler
                                     # intentionally stopped by default profile)
npx supabase db reset                # applied 0001–0007 in order, unmodified
$env:VYNE_REAL_STACK="1"; npx vitest run   # (pgsql-16 bin on session PATH)
```
Vitest: `test/rls.test.ts` 40/40, `test/rollback.test.ts` 2/2 — **42/42 in
8.52s**, serial execution (real-stack mode disables file parallelism). The
committed migrations and every test assertion were byte-identical to the
shim-mode runs (git status clean over `supabase/migrations` and
`supabase/rollbacks` throughout). Post-run check: all 14 tables present in
`public`. This is executed, production-equivalent database-layer verification.

### Observations
1. **No shim-vs-real behavioral differences surfaced.** The anticipated
   difference (GoTrue's `auth.users` rejecting the fixtures' minimal idempotent
   `(id, email)` inserts) did not materialize — the inserts were accepted.
   DL-2026-012 condition 6 required documenting/correcting differences; there
   were none to document.
2. **PostgreSQL major version:** the shim verification ran on PostgreSQL 16.13;
   the real stack runs PostgreSQL 17.6. M2 is therefore verified on both 16.x
   and 17.x. No behavior differed. Pinning a major version for the slice is an
   open (non-blocking) choice for a future decision if desired.
3. **Windows notes:** the `test:real` npm script uses bash env-var syntax and
   does not run under npm's cmd shell on Windows — the PowerShell form above is
   the equivalent (documented in SETUP.md). `psql` is a required client-side
   prerequisite of the test harness (now listed in SETUP.md).
4. Transient Docker registry rate-limit error during the first `edge-runtime`
   image pull; the CLI retried and the stack started cleanly. The Windows
   analytics warning (Logflare needs the daemon on tcp:2375) is irrelevant to
   this verification and was not acted on.
