-- rollback of 0003_relationship_core
alter table public.advisor_accounts drop constraint if exists advisor_accounts_advisor_fk;
drop trigger if exists advisors_guard on public.advisors;
drop function if exists vyne_private.guard_advisors_update();
drop function if exists vyne_private.owned_advisor_ids() cascade;
drop table if exists public.advisors cascade;
drop table if exists public.teams cascade;
drop table if exists public.firms cascade;
