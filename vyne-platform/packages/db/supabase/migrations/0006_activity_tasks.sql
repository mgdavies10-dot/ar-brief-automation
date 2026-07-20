-- 0006_activity_tasks — activities, tasks (EA-001 M2)
-- tasks carry the sole advisor write surface in the platform besides
-- credentials: marking an advisor-visible task done, with a note
-- (Architecture §12: "advisor-visible tasks (read + status update to done)").

create table public.activities (
  id            uuid primary key default gen_random_uuid(),
  actor_id      uuid references public.users (id),
  advisor_id    uuid references public.advisors (id),
  decision_id   uuid references public.decisions (id),
  firm_id       uuid references public.firms (id),
  type          text not null,
  occurred_at   timestamptz not null default now(),
  summary       text not null,
  detail        text,
  internal_only boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid references public.users (id),
  deleted_at    timestamptz
);
alter table public.activities enable row level security;
create trigger activities_updated_at before update on public.activities
  for each row execute function vyne_private.set_updated_at();
create index activities_advisor_idx on public.activities (advisor_id);

create table public.tasks (
  id                  uuid primary key default gen_random_uuid(),
  owner_id            uuid not null references public.users (id),
  title               text not null,
  detail              text,
  due_at              timestamptz,
  priority            text check (priority in ('low','normal','high')),
  status              text not null default 'open' check (status in ('open','done','cancelled')),
  source_activity_id  uuid references public.activities (id),
  advisor_id          uuid references public.advisors (id),
  decision_id         uuid references public.decisions (id),
  firm_id             uuid references public.firms (id),
  completion_evidence text,
  advisor_visible     boolean not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  created_by          uuid references public.users (id),
  deleted_at          timestamptz
);
alter table public.tasks enable row level security;
create trigger tasks_updated_at before update on public.tasks
  for each row execute function vyne_private.set_updated_at();
create index tasks_owner_idx on public.tasks (owner_id);
create index tasks_advisor_idx on public.tasks (advisor_id);

-- The advisor's one write: status -> 'done' plus a completion note on their
-- own advisor-visible task. Everything else on the row is immutable to them.
create or replace function vyne_private.guard_tasks_update()
returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or vyne_private.is_internal() then
    return new;
  end if;
  -- Advisor session:
  if old.advisor_visible is not true then
    raise exception 'not permitted';
  end if;
  if new.status is distinct from old.status and new.status <> 'done' then
    raise exception 'advisors may only mark tasks done';
  end if;
  if new.owner_id            is distinct from old.owner_id
     or new.title            is distinct from old.title
     or new.detail           is distinct from old.detail
     or new.due_at           is distinct from old.due_at
     or new.priority         is distinct from old.priority
     or new.source_activity_id is distinct from old.source_activity_id
     or new.advisor_id       is distinct from old.advisor_id
     or new.decision_id      is distinct from old.decision_id
     or new.firm_id          is distinct from old.firm_id
     or new.advisor_visible  is distinct from old.advisor_visible
     or new.created_by       is distinct from old.created_by
     or new.deleted_at       is distinct from old.deleted_at then
    raise exception 'advisors may only update task status and completion note';
  end if;
  return new;
end;
$$;
create trigger tasks_guard before update on public.tasks
  for each row execute function vyne_private.guard_tasks_update();

-- ---------------------------------------------------------------------------
-- RLS
-- activities: internal only (advisor task notes arrive as activities written
--   by the service identity in M5 — advisors never read this table).
-- tasks: internal scope by ownership; advisor scope strictly own +
--   advisor_visible (UI/DB parity for the Studio task list).
-- ---------------------------------------------------------------------------

create policy activities_select on public.activities for select to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder()
         or actor_id = vyne_private.app_user_id()
         or advisor_id in (select vyne_private.owned_advisor_ids()))
  );
create policy activities_insert on public.activities for insert to authenticated
  with check (
    vyne_private.is_internal()
    and (vyne_private.is_founder()
         or advisor_id is null
         or advisor_id in (select vyne_private.owned_advisor_ids()))
  );
create policy activities_update on public.activities for update to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder() or actor_id = vyne_private.app_user_id())
  )
  with check (vyne_private.is_founder() or actor_id = vyne_private.app_user_id());

create policy tasks_internal_select on public.tasks for select to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder()
         or owner_id = vyne_private.app_user_id()
         or advisor_id in (select vyne_private.owned_advisor_ids()))
  );
create policy tasks_advisor_select on public.tasks for select to authenticated
  using (
    deleted_at is null
    and advisor_visible = true
    and advisor_id in (select vyne_private.my_advisor_ids())
  );
create policy tasks_insert on public.tasks for insert to authenticated
  with check (
    vyne_private.is_internal()
    and (vyne_private.is_founder()
         or advisor_id is null
         or advisor_id in (select vyne_private.owned_advisor_ids()))
  );
create policy tasks_internal_update on public.tasks for update to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder()
         or owner_id = vyne_private.app_user_id()
         or advisor_id in (select vyne_private.owned_advisor_ids()))
  )
  with check (
    vyne_private.is_founder()
    or owner_id = vyne_private.app_user_id()
    or advisor_id in (select vyne_private.owned_advisor_ids())
  );
create policy tasks_advisor_update on public.tasks for update to authenticated
  using (
    deleted_at is null
    and advisor_visible = true
    and advisor_id in (select vyne_private.my_advisor_ids())
  )
  with check (
    advisor_visible = true
    and advisor_id in (select vyne_private.my_advisor_ids())
  );

grant select, insert, update on public.activities, public.tasks to authenticated;
revoke delete, truncate, references, trigger on public.activities, public.tasks from authenticated;
revoke all on public.activities, public.tasks from anon;
grant select, insert, update on public.activities, public.tasks to service_role;
