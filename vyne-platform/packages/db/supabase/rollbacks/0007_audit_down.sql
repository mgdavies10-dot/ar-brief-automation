-- rollback of 0007_audit
drop table if exists public.audit_events cascade;
