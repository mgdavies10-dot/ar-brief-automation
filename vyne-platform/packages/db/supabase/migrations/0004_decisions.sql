-- 0004_decisions — decision_types lookup, decisions, decision_evidence(min)
-- decision_type per CR-001 §1.1 (binding): lookup-constrained text seeded with
-- the ten founding Decision Library types; extensible by migration only.
-- decisions.opportunity_id is omitted: opportunities/pipeline are excluded
-- scope under EA-001 (recorded in ADR-002).

create table public.decision_types (
  code       text primary key,
  created_at timestamptz not null default now()
);
alter table public.decision_types enable row level security;

insert into public.decision_types (code) values
  ('stay'),
  ('stay_and_strengthen'),
  ('move_employee_firm'),
  ('supported_independence'),
  ('launch_or_join_ria'),
  ('acquire_practice'),
  ('merge_teams'),
  ('sell_or_monetize'),
  ('internal_family_succession'),
  ('external_capital_partner');

create policy decision_types_select on public.decision_types for select to authenticated
  using (vyne_private.is_internal());

create table public.decisions (
  id            uuid primary key default gen_random_uuid(),
  advisor_id    uuid not null references public.advisors (id),
  decision_type text not null references public.decision_types (code),
  status        text not null default 'open' check (status in ('open','closed')),
  is_primary    boolean not null default false,
  readiness     jsonb,   -- 8 readiness dimensions
  current_state text check (current_state in ('STAY','STRENGTHEN','PREPARE','MOVE','CONTINUE_DILIGENCE')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid references public.users (id),
  deleted_at    timestamptz
);
alter table public.decisions enable row level security;
create trigger decisions_updated_at before update on public.decisions
  for each row execute function vyne_private.set_updated_at();
create index decisions_advisor_idx on public.decisions (advisor_id);

create table public.decision_evidence (
  id          uuid primary key default gen_random_uuid(),
  decision_id uuid not null references public.decisions (id),
  dimension   text not null,
  description text,
  status      text not null default 'requested' check (status in ('requested','obtained','overdue')),
  due_at      timestamptz,
  doc_id      uuid, -- fk added in 0005 (documents created there)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  created_by  uuid references public.users (id),
  deleted_at  timestamptz
);
alter table public.decision_evidence enable row level security;
create trigger decision_evidence_updated_at before update on public.decision_evidence
  for each row execute function vyne_private.set_updated_at();
create index decision_evidence_decision_idx on public.decision_evidence (decision_id);

-- ---------------------------------------------------------------------------
-- RLS: decisions scope to advisor ownership; evidence inherits decision
-- visibility through an RLS-filtered EXISTS on decisions. Advisor role: no
-- matching policy branch anywhere (zero-grant posture).
-- ---------------------------------------------------------------------------

create policy decisions_select on public.decisions for select to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder() or advisor_id in (select vyne_private.owned_advisor_ids()))
  );
create policy decisions_insert on public.decisions for insert to authenticated
  with check (
    vyne_private.is_internal()
    and (vyne_private.is_founder() or advisor_id in (select vyne_private.owned_advisor_ids()))
  );
create policy decisions_update on public.decisions for update to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder() or advisor_id in (select vyne_private.owned_advisor_ids()))
  )
  with check (
    vyne_private.is_founder() or advisor_id in (select vyne_private.owned_advisor_ids())
  );

create policy decision_evidence_select on public.decision_evidence for select to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and exists (select 1 from public.decisions d where d.id = decision_id)
  );
create policy decision_evidence_insert on public.decision_evidence for insert to authenticated
  with check (
    vyne_private.is_internal()
    and exists (select 1 from public.decisions d where d.id = decision_id)
  );
create policy decision_evidence_update on public.decision_evidence for update to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and exists (select 1 from public.decisions d where d.id = decision_id)
  )
  with check (exists (select 1 from public.decisions d where d.id = decision_id));

grant select on public.decision_types to authenticated;
grant select, insert, update on public.decisions, public.decision_evidence to authenticated;
revoke delete, truncate, references, trigger on public.decision_types, public.decisions, public.decision_evidence from authenticated;
revoke all on public.decision_types, public.decisions, public.decision_evidence from anon;
grant select on public.decision_types to service_role;
grant select, insert, update on public.decisions, public.decision_evidence to service_role;
