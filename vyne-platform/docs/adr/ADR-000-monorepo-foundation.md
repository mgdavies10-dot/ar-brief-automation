# ADR-000 — Monorepo foundation under EA-001

**Status:** Accepted (M1) · **Authorization:** DL-2026-006 (EA-001), plan accepted per DL-2026-010
**Date:** 2026-07-19

## Context
EA-001 scope item 1 requires the monorepo foundation per Architecture §3: apps `os` and
`studio`; packages `db`, `ui`, `domain`, `audit`; `apps/web` and `packages/pdf` deferred.
The accepted M1 plan fixes the stack: Turborepo, TypeScript strict, Next.js 15 App Router.

## Decisions
1. **Workspace tooling: npm workspaces + Turborepo 2.** npm 10 ships with the required
   Node 20+ runtime; adding pnpm would be an unrequested dependency. Turborepo per the
   accepted plan. `packageManager: npm@10.9.7` pinned (Turborepo requires it).
2. **TypeScript strict everywhere** via a shared `tsconfig.base.json`
   (`strict` + `noUncheckedIndexedAccess` + `noImplicitOverride`). All packages typecheck
   with `tsc --noEmit`; Next.js apps build with `next build`.
3. **Design tokens live once in `packages/ui`** as a TypeScript module (`tokens.ts`) and a
   CSS custom-property sheet (`tokens.css`), value-locked to the BRAND_TOKENS palette as
   recorded in Architecture §11 / UX Part 1 (C-3: BRAND_TOKENS.md canonical). A unit test
   guards the palette values and the TS↔CSS pairing.
4. **Typography per Q-8 fallback:** font-family *stacks* naming Source Serif 4 and Inter
   with system fallbacks. Font files are deliberately **not vendored** in M1 — Q-8
   (serif license) is an open founder decision, and fetching fonts at build time would
   add a network dependency. Vendoring self-hosted files is a later, additive step.
5. **Status dictionaries fixed at foundation** in `packages/domain`: artifact lifecycle,
   commercial-stage vocabulary (defined only for the M5 residue scan — the pipeline
   module remains excluded scope), decision states, the ten CR-001 §1.1 `decision_type`
   seed values, roles, artifact types, document classifications. Unit tests pin the
   CR-001 taxonomy verbatim and assert the two-vocabulary disjointness rule (UX design
   principle 5).
6. **Audit event dictionary fixed at foundation** in `packages/audit`, including
   `artifact.publish_blocked` per CR-001 §2 (a blocked publish is a security-relevant
   event). The append-only writer lands in M2 with the database.
7. **`packages/db` is a placeholder** in M1; migrations, RLS, and rollback scripts are
   M2 scope in Supabase CLI layout (`supabase/migrations`).

## Consequences
- One canonical source for palette, type scale, and vocabularies before any screen code.
- The two Next.js apps exist and build from day one; every later milestone lands into a
  compiling, tested workspace.
- Known upstream advisory: `next@15.5.x` pins a `postcss` version with a moderate
  advisory (GHSA-qx2v-qp2m-jg93, XSS via unescaped `</style>` in stringified output);
  no fix exists on the Next 15 line and the platform does not stringify untrusted CSS.
  Tracked for dependency bumps; not a slice control failure.
