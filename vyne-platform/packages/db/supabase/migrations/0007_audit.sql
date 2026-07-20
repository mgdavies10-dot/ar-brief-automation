-- 0007_audit — append-only audit_events (EA-001 M2; Architecture §4/§12, §0.6)
-- Deliberate deviations from the shared conventions, per §4's audit spec:
-- no updated_at, no soft delete, no update path of any kind. If an action
-- matters, it is reconstructable; nothing here is ever rewritten.

create table public.audit_events (
  id          uuid primary key default gen_random_uuid(),
  occurred_at timestamptz not null default now(),
  actor_id    uuid,
  actor_role  text,
  event_type  text not null,
  record_type text not null,
  record_id   uuid,
  advisor_id  uuid,
  before      jsonb,
  after       jsonb,
  ip          inet,
  user_agent  text
);
alter table public.audit_events enable row level security;
create index audit_events_occurred_idx on public.audit_events (occurred_at);
create index audit_events_record_idx on public.audit_events (record_type, record_id);

-- Append-only, layer 1: privileges. INSERT for app identities; nothing may
-- UPDATE/DELETE/TRUNCATE — including the service identity.
grant insert on public.audit_events to authenticated, service_role;
grant select on public.audit_events to authenticated, service_role;
revoke update, delete, truncate, references, trigger on public.audit_events from authenticated, service_role;
revoke all on public.audit_events from anon;

-- Append-only, layer 2: trigger block (also stops the table owner path).
create trigger audit_events_block_update before update on public.audit_events
  for each row execute function vyne_private.block_mutation();
create trigger audit_events_block_delete before delete on public.audit_events
  for each row execute function vyne_private.block_mutation();
create trigger audit_events_block_truncate before truncate on public.audit_events
  for each statement execute function vyne_private.block_mutation();

-- RLS: any authenticated identity may append; only the founder reads (§6:
-- audit log — founder read; no other role, and never the advisor role).
create policy audit_events_insert on public.audit_events for insert to authenticated
  with check (auth.uid() is not null);
create policy audit_events_select on public.audit_events for select to authenticated
  using (vyne_private.is_founder());
