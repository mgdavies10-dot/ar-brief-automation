-- 0011_decision_recommendation — F2 Conviction Engine storage (EA-001 M4).
-- Founder direction 2026-07-21: measure Conviction (VYNE's confidence in its own
-- understanding), not Readiness. Conviction is DERIVED from the twin at read
-- time (not stored). What we store on a decision:
--   • question: the decision in plain language ("Should Robert pursue supported
--     independence?").
--   • recommendation: the recruiter-authored narrative + explainability
--     (perspective / rationale / assumptions / what-could-change), JSONB and
--     typed by zod in @vyne/domain so it extends without a migration.
-- The legacy `readiness` column is intentionally left behind (we don't score
-- readiness). Additive only; RLS unchanged (still inherits the advisor).

alter table public.decisions
  add column question       text,
  add column recommendation jsonb not null default '{}'::jsonb;
