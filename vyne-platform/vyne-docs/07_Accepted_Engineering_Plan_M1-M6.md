# VYNE Lead Engineer — Accepted Implementation Plan (M1–M6) under EA-001

*Accepted by the Product Council per DL-2026-010. Ambiguity rulings in 02_Council_Response_CR-001.md are binding and supersede any conflicting detail below.*

**M1 — Monorepo foundation.** Turborepo + TypeScript strict; `apps/os`, `apps/studio`; `packages/db`, `ui`, `domain`, `audit` (`apps/web` and `packages/pdf` deferred). Design tokens in `packages/ui` (Architecture §11 palette; Source Serif 4 + Inter per Q-8 fallback). Setup docs, `.env.example` (no secrets), ADR-000 referencing DL-2026-006.

**M2 — Database + RLS + audit.** Migrations for the 13 EA-listed tables with §4 conventions (uuid pk, timestamps, soft delete, RLS enabled on creation). RLS per §12: founder/recruiter ownership policies; advisor role: zero policies on internal tables — grants only on own `published_artifacts`, advisor-visible `tasks` (read + complete), own account. Append-only `audit_events` (app role INSERT-only). Rollback script per migration; rollback of latest migration verified.

**M3 — Auth + sessions + revocation.** Email+password, TOTP MFA capability (required-capable internal, optional advisor), role claims, session lifetimes per §12, immediate revocation (`users.status='disabled'` checked in RLS + short-lived tokens).

**M4 — Synthetic seed + OS core flow.** Seed: 1 founder, 1 recruiter, 3 clearly-synthetic demonstration personas, 1 synthetic firm set. OS: create advisor → create decision → Current Reality structured authoring → Artifact Builder with lifecycle bar (Draft → In review → Approved), cooling rule as configurable policy (default ON, next-calendar-day per CR-001 §1.4; override requires logged reason).

**M5 — Publication boundary + Studio.** Publish Dialog: advisor's-eye Document Frame preview, checklist (correct advisor · version · provenance · residue scan · attestation), snapshot copy to `published_artifacts`, two-beat confirmation, log-only notification stub. Studio: sign-in, Home (status line, featured deliverable), Deliverables reader in the pixel-identical Frame, Tasks (mark done + note → OS activity), withdrawal (removed from Studio, preserved internally, slate pill). Per CR-001 §2: blocked publishes (residue-scan hits) must write audit events.

**M6 — Full security acceptance suite + completion report.** Unit (domain), integration, and the §12/EA suite: cross-recruiter invisibility (list/search/URL/API), advisor probing internal routes and tables, disabled-user session death, withdrawn-artifact invisibility with audit persistence, UI/API authorization parity, residue scan flags a planted fixture, audit log reconstructs the full flow. Completion report for QA/Red-Team review.

**Stack (Architecture §16, unmodified):** Next.js 15 (App Router) + TypeScript, Turborepo, PostgreSQL via local Supabase (CLI/Docker), Supabase Auth + TOTP, Drizzle + zod in `packages/domain`, Vitest, Playwright, SQL-based RLS tests as first-class.

**decision_type seed values (CR-001 §1.1, binding):** `stay` · `stay_and_strengthen` · `move_employee_firm` · `supported_independence` · `launch_or_join_ria` · `acquire_practice` · `merge_teams` · `sell_or_monetize` · `internal_family_succession` · `external_capital_partner`

**Stop conditions (EA-001, binding):** stop and report if any requirement conflicts with Architecture v1.2 or EA-001; if implementation would weaken an RLS policy or §0 guardrail; if a needed business rule is undefined (do not invent); if the stack proves unfit for a required control (report before substituting); if anything would require real data, hosted deployment, or an excluded module; or if the security suite cannot pass without design change.

**Data rule (DL-2026-003, binding):** local development, synthetic demonstration personas only. No hosted deployment of any kind under this authorization.
