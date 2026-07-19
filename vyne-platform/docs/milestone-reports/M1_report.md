# M1 Report — Monorepo foundation (EA-001)

**Date:** 2026-07-19 · **Milestone:** M1 of the accepted plan (DL-2026-010) · **Status:** Complete

## Environment note (prerequisite check, per kickoff instruction)
Build environment is a Claude Code cloud session (DL-2026-011 context). Verified/installed:
- Node **v22.22.2** ✓ (requirement: 20+)
- Docker daemon: was stopped → **started, running** ✓
- Supabase CLI: was absent → **installed v2.109.1** via npm ✓ (GitHub release
  downloads are blocked by this session's egress policy; npm distribution worked)
- PostgreSQL 16 (native) present in the container.

**⚠️ Flag for M2 (reported, not worked around):** Docker *image pulls* fail in this
session — the egress policy denies Docker's CDN hosts (`production.cloudfront.docker.com`,
`d2glxqk2uabbnd.cloudfront.net` → 403 on CONNECT) for both docker.io and public.ecr.aws.
`supabase start` therefore cannot bring up the local stack **in this environment**.
This does not affect M1. See "Decision needed" below.

## What was built
Per plan M1, all under `vyne-platform/`:
- Turborepo + npm-workspaces monorepo, TypeScript strict base config, `packageManager` pinned.
- `apps/os` and `apps/studio` — Next.js 15.5 App Router shells importing the shared tokens
  (foundation pages only; no slice screens yet, per plan).
- `packages/ui` — design tokens (`tokens.ts` + `tokens.css`): BRAND_TOKENS palette per
  Architecture §11, UX §1.3 type scale, 8px spacing unit, motion + reading-measure
  constants; palette/pairing unit tests.
- `packages/domain` — status dictionaries: artifact lifecycle, commercial vocabulary
  (for the M5 residue scan only), decision states, the ten CR-001 §1.1 decision_type
  seed values, roles (v1-active subset), artifact types, document classifications; zod
  dependency in place for M2+ schemas.
- `packages/audit` — audit event dictionary incl. `artifact.publish_blocked` (CR-001 §2);
  writer deferred to M2 with the database.
- `packages/db` — placeholder package; migrations/RLS are M2 scope.
- `.env.example` (no secrets), `docs/SETUP.md`, ADR-000.

## Executed-and-verified vs. authored
**Executed and verified:**
- `npm install` — clean (2 moderate upstream advisories, see ADR-000 consequences).
- `npx turbo run build typecheck test` — **11/11 tasks successful**:
  both apps `next build` ✓, four packages + two apps `tsc --noEmit` ✓,
  three vitest suites ✓ (**10 tests passed, 0 failed**: domain 4, ui 3, audit 3).
- Runtime smoke test: `next start` on both apps; OS served the token-styled page on
  :3000, Studio on :3001 (content verified by HTTP fetch).
- Docker daemon start, Supabase CLI install (versions above).

**Authored only (by design, M1):** `packages/db` placeholder; audit writer types
(`AuditEventInput`) pending the M2 database.

## Tests run
| Suite | Result |
|---|---|
| `@vyne/domain` vocabulary tests (CR-001 taxonomy pinned verbatim; two-vocabulary disjointness) | 4/4 ✓ |
| `@vyne/ui` token tests (palette values; TS↔CSS lockstep; type scale) | 3/3 ✓ |
| `@vyne/audit` event dictionary tests (no duplicates; publish_blocked present; lifecycle coverage) | 3/3 ✓ |

## ADRs added
- **ADR-000 — Monorepo foundation under EA-001** (tooling choices, Q-8 font posture,
  vocabulary/audit dictionaries fixed at foundation, upstream advisory note).

## Stop-condition contact
None within M1 scope. One **environment decision needed before M2 execution**:

M2's RLS work must be *executed and verified*, and CR-001 §3 explicitly rejects
authored-but-never-executed security code. In this cloud session `supabase start`
cannot pull its images (egress policy). Options, in council-preference order:
1. **Allow Docker registry + CDN hosts** in this environment's network policy
   (docker.io, public.ecr.aws, and their CloudFront CDN hosts) — M2 proceeds exactly
   per plan here.
2. **Run the build in Claude Code on the founder's machine** (the original
   DL-2026-011 Option 3) — this repo/branch is the complete handoff.
3. **Council-approved variant:** verify migrations + RLS against this container's
   native PostgreSQL 16 with a minimal, documented `auth.uid()`/`auth.jwt()` shim
   matching Supabase semantics, then re-run the full suite on the real Supabase stack
   before slice acceptance (DL-2026-008). This is a stack substitution for
   verification purposes and is **not** being done without approval, per EA-001.
