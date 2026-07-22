-- Rollback 0011: remove the decision question + recommendation columns.
alter table public.decisions
  drop column if exists question,
  drop column if exists recommendation;
