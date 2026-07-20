-- rollback of 0005_documents_artifacts
drop table if exists public.published_artifacts cascade;
drop function if exists vyne_private.guard_published_artifacts() cascade;
drop trigger if exists artifacts_guard on public.artifacts;
drop function if exists vyne_private.guard_artifacts() cascade;
drop table if exists public.artifacts cascade;
alter table public.decision_evidence drop constraint if exists decision_evidence_doc_fk;
alter table public.advisors drop constraint if exists advisors_t12_evidence_doc_fk;
drop table if exists public.documents cascade;
