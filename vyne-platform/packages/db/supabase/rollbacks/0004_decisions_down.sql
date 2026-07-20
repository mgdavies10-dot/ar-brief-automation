-- rollback of 0004_decisions
drop table if exists public.decision_evidence cascade;
drop table if exists public.decisions cascade;
drop table if exists public.decision_types cascade;
