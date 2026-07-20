-- 0001_conventions — EA-001 M2 (DL-2026-006/010)
-- Shared conventions: private helper schema, updated_at maintenance,
-- append-only guard. §4: all tables get uuid pk, timestamps, created_by,
-- soft delete, RLS enabled on creation. §0.5: surfaces ship closed.

create schema if not exists vyne_private;

-- Helper schema: API roles may execute granted helpers (policies depend on
-- them) but can never create objects here; PostgREST does not expose it.
revoke all on schema vyne_private from public;
grant usage on schema vyne_private to authenticated, service_role;

create or replace function vyne_private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Append-only guard for audit_events (§4: no UPDATE/DELETE for any role;
-- trigger-level block is defense in depth beyond revoked grants).
create or replace function vyne_private.block_mutation()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'table % is append-only', tg_table_name
    using errcode = 'raise_exception';
end;
$$;
