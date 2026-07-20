# ADR-001 — M2 verification against native PostgreSQL 16 with a test-only auth shim

**Status:** Accepted for M2, flagged for council review at slice acceptance (DL-2026-008)
**Authorization context:** DL-2026-011 (build environment), CR-001 §3 (no unexecuted security code)
**Date:** 2026-07-20

## Context
The build is running in a Claude Code cloud session. The session's egress policy blocks
Docker image-layer downloads (CloudFront CDN hosts return 403 on CONNECT for both
docker.io and public.ecr.aws), so `supabase start` cannot bring up the local Supabase
stack here, while the Supabase CLI itself and native PostgreSQL 16.13 are installed and
working. CR-001 §3 rejects authored-but-never-executed RLS; EA-001 requires reporting
before substituting any stack element. The founder was presented three options
(broaden network policy / move to local machine / verify on native Postgres 16 with a
shim) and expressed no preference, deferring to the engineering recommendation.

## Decision
Execute and verify all M2 database work — migrations, RLS policies, triggers, grants,
rollback scripts — against the container's native **PostgreSQL 16.13**, with a
**test-only auth shim** (`packages/db/test/shim/auth_shim.sql`) that reproduces the
Supabase objects the migrations depend on, with identical semantics:
roles `anon` / `authenticated` / `service_role` (BYPASSRLS), schema `auth` with
`auth.users`, and `auth.uid()` / `auth.role()` / `auth.jwt()` reading the
`request.jwt.*` GUCs exactly as supabase/postgres defines them.

The shim is never part of the migration set and is never applied to a real Supabase
stack. Migrations remain plain Supabase-compatible SQL in the CLI's
`supabase/migrations` layout.

## Condition (binding on slice acceptance)
Before the slice is accepted under DL-2026-008, the **identical migration set and the
full RLS/security suite must be re-executed against a real local Supabase stack**
(Docker images reachable). Any behavioral difference is a stop-condition report.

## Why this is acceptable
- Supabase's database *is* standard Postgres; the RLS engine under test is the same
  engine version-for-version (16.x), and the only emulated surface is the tiny,
  well-documented claims-reading layer, mirrored from Supabase's own definitions.
- The alternative (writing M2 SQL without ever executing it) is exactly what CR-001 §3
  rejected. This variant maximizes executed verification available in the authorized
  environment while preserving a mandatory full-stack re-verification gate.

## Consequences
- `packages/db/test` carries the shim and a harness that provisions scratch databases,
  applies migrations in order, and runs policy tests per role via
  `SET ROLE` + `request.jwt.claims`, matching PostgREST's per-request behavior.
- M3 (Supabase Auth, TOTP, sessions) has parts that cannot be emulated this way;
  M3's verification plan must be reassessed against the environment at that point
  and reported before implementation if blocked.
