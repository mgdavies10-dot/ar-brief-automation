-- rollback of 0006_activity_tasks
drop trigger if exists tasks_guard on public.tasks;
drop function if exists vyne_private.guard_tasks_update() cascade;
drop table if exists public.tasks cascade;
drop table if exists public.activities cascade;
