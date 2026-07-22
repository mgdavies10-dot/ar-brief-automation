-- Rollback 0010: remove the twin-understanding columns.
alter table public.current_reality
  drop column if exists executive_summary,
  drop column if exists dimension_confidence;
