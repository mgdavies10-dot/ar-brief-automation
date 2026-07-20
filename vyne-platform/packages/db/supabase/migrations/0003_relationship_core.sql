-- 0003_relationship_core — firms(min), teams(min), advisors (EA-001 M2)
-- "(min)" per CR-001 §1.2: only the §4 columns the slice touches; the
-- implemented subset is recorded in ADR-002 for council review.
-- §0.2: advisor practice data is aggregate-only; no client entity exists.

create table public.firms (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  channel            text,
  restricted         boolean not null default false,
  restriction_reason text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  created_by         uuid references public.users (id),
  deleted_at         timestamptz
);
alter table public.firms enable row level security;
create trigger firms_updated_at before update on public.firms
  for each row execute function vyne_private.set_updated_at();

create table public.teams (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  primary_advisor_id uuid, -- fk added below after advisors exists
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  created_by         uuid references public.users (id),
  deleted_at         timestamptz
);
alter table public.teams enable row level security;
create trigger teams_updated_at before update on public.teams
  for each row execute function vyne_private.set_updated_at();

create table public.advisors (
  id                    uuid primary key default gen_random_uuid(),
  first_name            text not null,
  last_name             text not null,
  email                 text,
  phone                 text,
  city                  text,
  state                 text,
  current_firm_id       uuid references public.firms (id),
  channel               text,
  aum                   numeric,
  t12_reported          numeric,
  t12_verified          numeric,
  t12_verified_at       timestamptz,
  t12_evidence_doc_id   uuid, -- fk added in 0005 (documents created there)
  client_count_band     text,          -- aggregate band only (§0.2)
  segment_mix           jsonb,         -- aggregates only (§0.2)
  revenue_mix           jsonb,         -- aggregates only (§0.2)
  source                text,
  source_detail         text,
  relationship_owner_id uuid references public.users (id),
  commercial_owner_id   uuid references public.users (id),
  restrictions          text,
  confidentiality_level text,
  team_id               uuid references public.teams (id),
  status                text not null default 'active',
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  created_by            uuid references public.users (id),
  deleted_at            timestamptz
);
alter table public.advisors enable row level security;
create trigger advisors_updated_at before update on public.advisors
  for each row execute function vyne_private.set_updated_at();
create index advisors_relationship_owner_idx on public.advisors (relationship_owner_id);
create index advisors_commercial_owner_idx on public.advisors (commercial_owner_id);

alter table public.teams
  add constraint teams_primary_advisor_fk
  foreign key (primary_advisor_id) references public.advisors (id);
alter table public.advisor_accounts
  add constraint advisor_accounts_advisor_fk
  foreign key (advisor_id) references public.advisors (id);

-- Advisor identities the current user owns (recruiter scope). Security definer
-- so other tables' policies can scope by advisor ownership without recursive
-- RLS evaluation on advisors.
create or replace function vyne_private.owned_advisor_ids()
returns setof uuid
language sql stable security definer
set search_path = ''
as $$
  select a.id from public.advisors a
  where a.deleted_at is null
    and (a.relationship_owner_id = vyne_private.app_user_id()
      or a.commercial_owner_id  = vyne_private.app_user_id())
$$;
revoke all on function vyne_private.owned_advisor_ids() from public;
grant execute on function vyne_private.owned_advisor_ids() to authenticated;

-- Ownership reassignment is founder-only (§6). Service-identity writes pass.
create or replace function vyne_private.guard_advisors_update()
returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or vyne_private.is_founder() then
    return new;
  end if;
  if new.relationship_owner_id is distinct from old.relationship_owner_id
     or new.commercial_owner_id is distinct from old.commercial_owner_id
     or new.deleted_at is distinct from old.deleted_at then
    raise exception 'only the founder may reassign ownership or delete';
  end if;
  return new;
end;
$$;
create trigger advisors_guard before update on public.advisors
  for each row execute function vyne_private.guard_advisors_update();

-- ---------------------------------------------------------------------------
-- RLS (§12, permissions matrix §6).
-- advisors: founder all; recruiter owned only. The advisor role has NO path
-- here: every policy requires an internal role, so advisor sessions match
-- nothing (zero-grant posture, §12.1).
-- ---------------------------------------------------------------------------

create policy advisors_select on public.advisors for select to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder() or id in (select vyne_private.owned_advisor_ids()))
  );
create policy advisors_insert on public.advisors for insert to authenticated
  with check (
    vyne_private.is_founder()
    or (vyne_private.app_role() = 'recruiter'
        and relationship_owner_id = vyne_private.app_user_id()) -- create → auto-assigned (§6)
  );
create policy advisors_update on public.advisors for update to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder() or id in (select vyne_private.owned_advisor_ids()))
  )
  with check (
    vyne_private.is_founder() or id in (select vyne_private.owned_advisor_ids())
  );

-- firms(min): internal read (recruiters need firm identity for owned records;
-- the approved-for-work subset control belongs to the excluded firm-intel
-- module — recorded in ADR-002); writes founder-only in the slice.
create policy firms_select on public.firms for select to authenticated
  using (deleted_at is null and vyne_private.is_internal());
create policy firms_insert on public.firms for insert to authenticated
  with check (vyne_private.is_founder());
create policy firms_update on public.firms for update to authenticated
  using (vyne_private.is_founder()) with check (vyne_private.is_founder());

-- teams(min): same posture as firms.
create policy teams_select on public.teams for select to authenticated
  using (deleted_at is null and vyne_private.is_internal());
create policy teams_insert on public.teams for insert to authenticated
  with check (vyne_private.is_founder());
create policy teams_update on public.teams for update to authenticated
  using (vyne_private.is_founder()) with check (vyne_private.is_founder());

grant select, insert, update on public.firms, public.teams, public.advisors to authenticated;
revoke delete, truncate, references, trigger on public.firms, public.teams, public.advisors from authenticated;
revoke all on public.firms, public.teams, public.advisors from anon;
grant select, insert, update on public.firms, public.teams, public.advisors to service_role;
