-- Rollback 0009_current_reality: drop the current_reality table (and its
-- policies/trigger/index, which fall with it).
drop table if exists public.current_reality;
