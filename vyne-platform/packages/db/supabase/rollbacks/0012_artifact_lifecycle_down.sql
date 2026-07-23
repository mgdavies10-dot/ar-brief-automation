-- Rollback 0012: remove the artifact lifecycle/cooling columns.
alter table public.artifacts
  drop column if exists content_edited_at,
  drop column if exists submitted_at,
  drop column if exists submitted_by,
  drop column if exists cooling_override_reason;
