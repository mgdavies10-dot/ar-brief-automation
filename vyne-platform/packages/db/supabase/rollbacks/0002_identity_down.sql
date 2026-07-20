-- rollback of 0002_identity
-- Tables first (dropping them removes the policies that depend on the
-- helper functions), then the helpers.
drop table if exists public.advisor_accounts cascade;
drop table if exists public.users cascade;
drop function if exists vyne_private.guard_users_update();
drop function if exists vyne_private.my_advisor_ids();
drop function if exists vyne_private.is_internal() cascade;
drop function if exists vyne_private.is_founder() cascade;
drop function if exists vyne_private.app_role() cascade;
drop function if exists vyne_private.app_user_id() cascade;
