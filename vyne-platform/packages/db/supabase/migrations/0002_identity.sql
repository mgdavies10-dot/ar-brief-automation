-- 0002_identity — users, advisor_accounts, role helpers (EA-001 M2)
-- Architecture §4 identity tables; §12 authorization helpers.
-- Why these fields exist (§0.1): identity, role scoping, and the
-- immediate-revocation control (`status` checked in RLS on every query).

create table public.users (
  id            uuid primary key default gen_random_uuid(),
  auth_id       uuid unique references auth.users (id),
  email         text not null unique,
  full_name     text not null,
  role          text not null check (role in ('founder','recruiter','analyst','operations','finance','advisor')),
  status        text not null default 'active' check (status in ('active','disabled')),
  mfa_enrolled  boolean not null default false,
  last_login_at timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid references public.users (id),
  deleted_at    timestamptz
);
alter table public.users enable row level security;
create trigger users_updated_at before update on public.users
  for each row execute function vyne_private.set_updated_at();

create table public.advisor_accounts (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.users (id),
  advisor_id     uuid not null, -- fk added in 0003 (advisors created there)
  status         text not null default 'active' check (status in ('active','disabled')),
  provisioned_by uuid references public.users (id),
  provisioned_at timestamptz not null default now(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  created_by     uuid references public.users (id),
  deleted_at     timestamptz,
  unique (user_id, advisor_id)
);
alter table public.advisor_accounts enable row level security;
create trigger advisor_accounts_updated_at before update on public.advisor_accounts
  for each row execute function vyne_private.set_updated_at();

-- ---------------------------------------------------------------------------
-- §12 helpers. SECURITY DEFINER with pinned search_path; they read users /
-- advisor_accounts without triggering policy recursion. Every helper embeds
-- the immediate-revocation check: a disabled or soft-deleted user resolves to
-- NULL/empty, so every dependent policy evaluates false at once.
-- ---------------------------------------------------------------------------

create or replace function vyne_private.app_user_id()
returns uuid
language sql stable security definer
set search_path = ''
as $$
  select u.id from public.users u
  where u.auth_id = auth.uid() and u.status = 'active' and u.deleted_at is null
$$;

create or replace function vyne_private.app_role()
returns text
language sql stable security definer
set search_path = ''
as $$
  select u.role from public.users u
  where u.auth_id = auth.uid() and u.status = 'active' and u.deleted_at is null
$$;

create or replace function vyne_private.is_founder()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select coalesce(vyne_private.app_role() = 'founder', false)
$$;

-- v1 activates founder + recruiter as internal roles (Architecture §7);
-- analyst/operations/finance are added by migration when built.
create or replace function vyne_private.is_internal()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select coalesce(vyne_private.app_role() in ('founder','recruiter'), false)
$$;

-- Advisor identities the current user's account maps to (normally one).
create or replace function vyne_private.my_advisor_ids()
returns setof uuid
language sql stable security definer
set search_path = ''
as $$
  select aa.advisor_id
  from public.advisor_accounts aa
  join public.users u on u.id = aa.user_id
  where u.auth_id = auth.uid()
    and u.status = 'active'     and u.deleted_at is null
    and aa.status = 'active'    and aa.deleted_at is null
$$;

revoke all on function vyne_private.app_user_id() from public;
revoke all on function vyne_private.app_role() from public;
revoke all on function vyne_private.is_founder() from public;
revoke all on function vyne_private.is_internal() from public;
revoke all on function vyne_private.my_advisor_ids() from public;
grant execute on function
  vyne_private.app_user_id(), vyne_private.app_role(),
  vyne_private.is_founder(), vyne_private.is_internal(),
  vyne_private.my_advisor_ids()
to authenticated;

-- Field-change guard: only the founder may change identity/authorization
-- fields; any authenticated user may maintain their own profile fields
-- (Architecture §6: users & roles admin = founder only). Service-identity
-- writes (no JWT) pass through.
create or replace function vyne_private.guard_users_update()
returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or vyne_private.is_founder() then
    return new;
  end if;
  if new.role       is distinct from old.role
     or new.status  is distinct from old.status
     or new.auth_id is distinct from old.auth_id
     or new.email   is distinct from old.email
     or new.deleted_at is distinct from old.deleted_at then
    raise exception 'only the founder may change identity or authorization fields';
  end if;
  return new;
end;
$$;
create trigger users_guard before update on public.users
  for each row execute function vyne_private.guard_users_update();

-- ---------------------------------------------------------------------------
-- RLS (§12). users: founder full; everyone reads/maintains own active row.
-- advisor_accounts: founder-only administration; users may read their own.
-- ---------------------------------------------------------------------------

create policy users_select on public.users for select to authenticated
  using (
    vyne_private.is_founder()
    or (auth_id = auth.uid() and status = 'active' and deleted_at is null)
  );
create policy users_insert on public.users for insert to authenticated
  with check (vyne_private.is_founder());
create policy users_update on public.users for update to authenticated
  using (vyne_private.is_founder() or (auth_id = auth.uid() and status = 'active' and deleted_at is null))
  with check (vyne_private.is_founder() or (auth_id = auth.uid()));

-- Founder-only: §12 enumerates the advisor role's grants exhaustively
-- (own published_artifacts, advisor-visible tasks, own users row) and
-- advisor_accounts is not among them. The user→advisor mapping is resolved
-- by the security-definer helper, never by a direct advisor read.
create policy advisor_accounts_select on public.advisor_accounts for select to authenticated
  using (vyne_private.is_founder());
create policy advisor_accounts_insert on public.advisor_accounts for insert to authenticated
  with check (vyne_private.is_founder());
create policy advisor_accounts_update on public.advisor_accounts for update to authenticated
  using (vyne_private.is_founder())
  with check (vyne_private.is_founder());

-- §0.5 grants: no anon access; no hard DELETE for the API role (soft delete only).
grant select, insert, update on public.users, public.advisor_accounts to authenticated;
revoke delete, truncate, references, trigger on public.users, public.advisor_accounts from authenticated;
revoke all on public.users, public.advisor_accounts from anon;
grant select, insert, update on public.users, public.advisor_accounts to service_role;
