-- 0005_documents_artifacts — documents, artifacts, published_artifacts
-- §0.2: every document row carries the client-PII attestation, NOT NULL.
-- §0.8 / ADR-2 (Architecture §3): publication is a snapshot COPY across the
-- internal/advisor boundary — published_artifacts is the ONLY content table
-- with an advisor-role read path.

create table public.documents (
  id                    uuid primary key default gen_random_uuid(),
  storage_key           text not null,
  filename              text not null,
  mime                  text,
  size                  bigint,
  classification        text not null check (classification in
    ('internal_only','advisor_provided','firm_provided','deliverable_draft','published')),
  advisor_id            uuid references public.advisors (id),
  firm_id               uuid references public.firms (id),
  decision_id           uuid references public.decisions (id),
  uploaded_by           uuid references public.users (id),
  received_via          text check (received_via in ('email','secure_mail','in_person')),
  no_client_pii_attested boolean not null, -- intake attestation, §0.2; no default: an explicit act
  attested_by           uuid references public.users (id),
  attested_at           timestamptz,
  virus_scanned_at      timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  created_by            uuid references public.users (id),
  deleted_at            timestamptz,
  constraint documents_attestation_complete
    check (no_client_pii_attested = false or (attested_by is not null and attested_at is not null))
);
alter table public.documents enable row level security;
create trigger documents_updated_at before update on public.documents
  for each row execute function vyne_private.set_updated_at();
create index documents_advisor_idx on public.documents (advisor_id);

alter table public.advisors
  add constraint advisors_t12_evidence_doc_fk
  foreign key (t12_evidence_doc_id) references public.documents (id);
alter table public.decision_evidence
  add constraint decision_evidence_doc_fk
  foreign key (doc_id) references public.documents (id);

create table public.artifacts (
  id            uuid primary key default gen_random_uuid(),
  decision_id   uuid not null references public.decisions (id),
  artifact_type text not null check (artifact_type in
    ('current_reality','future_state_mandate','vynes_9_profile','constraint_map',
     'alternative_comparison','scorecard','economic_model_report','decision_record','action_path')),
  version       int not null default 1,
  status        text not null default 'draft' check (status in
    ('draft','in_review','approved','published','superseded','withdrawn')),
  content       jsonb,
  reviewed_by   uuid references public.users (id),
  approved_by   uuid references public.users (id),
  approved_at   timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid references public.users (id),
  deleted_at    timestamptz
);
alter table public.artifacts enable row level security;
create trigger artifacts_updated_at before update on public.artifacts
  for each row execute function vyne_private.set_updated_at();
create index artifacts_decision_idx on public.artifacts (decision_id);

-- Approval and publication are founder acts (§6; Q-3 v1 founder-only).
-- Recruiters may author drafts and submit for review; they can never set
-- approved/published states or approval fields.
create or replace function vyne_private.guard_artifacts()
returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or vyne_private.is_founder() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if new.status not in ('draft') then
      raise exception 'artifacts are created as drafts';
    end if;
    if new.approved_by is not null or new.approved_at is not null then
      raise exception 'only the founder may set approval fields';
    end if;
    return new;
  end if;
  -- UPDATE by a non-founder internal user:
  if old.status not in ('draft','in_review') then
    raise exception 'only the founder may modify an artifact beyond review';
  end if;
  if new.status not in ('draft','in_review') then
    raise exception 'only the founder may approve, publish, supersede, or withdraw';
  end if;
  if new.approved_by is not null or new.approved_at is not null then
    raise exception 'only the founder may set approval fields';
  end if;
  return new;
end;
$$;
create trigger artifacts_guard before insert or update on public.artifacts
  for each row execute function vyne_private.guard_artifacts();

create table public.published_artifacts (
  id               uuid primary key default gen_random_uuid(),
  artifact_id      uuid not null references public.artifacts (id),
  advisor_id       uuid not null references public.advisors (id),
  published_by     uuid not null references public.users (id),
  published_at     timestamptz not null default now(),
  content_snapshot jsonb not null,
  pdf_doc_id       uuid references public.documents (id),
  withdrawn_at     timestamptz,
  withdrawn_by     uuid references public.users (id),
  superseded_by    uuid references public.published_artifacts (id),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  created_by       uuid references public.users (id),
  deleted_at       timestamptz
);
alter table public.published_artifacts enable row level security;
create trigger published_artifacts_updated_at before update on public.published_artifacts
  for each row execute function vyne_private.set_updated_at();
create index published_artifacts_advisor_idx on public.published_artifacts (advisor_id);

-- Snapshots are immutable content: after insert, only withdrawal/supersession
-- metadata may change, and only by the founder (enforced with the RLS below).
create or replace function vyne_private.guard_published_artifacts()
returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  if new.content_snapshot is distinct from old.content_snapshot
     or new.artifact_id   is distinct from old.artifact_id
     or new.advisor_id    is distinct from old.advisor_id
     or new.published_by  is distinct from old.published_by
     or new.published_at  is distinct from old.published_at then
    raise exception 'published snapshots are immutable; only withdrawal/supersession metadata may change';
  end if;
  return new;
end;
$$;
create trigger published_artifacts_guard before update on public.published_artifacts
  for each row execute function vyne_private.guard_published_artifacts();

-- ---------------------------------------------------------------------------
-- RLS
-- documents: internal, advisor-ownership scoped; advisors have NO document
--   surface in v1.1 (uploads removed) — no advisor policy branch.
-- artifacts: internal, decision-visibility scoped (drafts are internal-only
--   forever, §0.8); advisors never see this table.
-- published_artifacts: the boundary. Internal read for founder/owner;
--   advisor read strictly own + not withdrawn + not deleted. Founder-only
--   writes (publication/withdrawal authority, Q-3).
-- ---------------------------------------------------------------------------

create policy documents_select on public.documents for select to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder()
         or advisor_id in (select vyne_private.owned_advisor_ids())
         or (advisor_id is null and created_by = vyne_private.app_user_id()))
  );
create policy documents_insert on public.documents for insert to authenticated
  with check (
    vyne_private.is_internal()
    and (vyne_private.is_founder()
         or advisor_id is null
         or advisor_id in (select vyne_private.owned_advisor_ids()))
  );
create policy documents_update on public.documents for update to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder() or advisor_id in (select vyne_private.owned_advisor_ids()))
  )
  with check (
    vyne_private.is_founder() or advisor_id in (select vyne_private.owned_advisor_ids())
  );

create policy artifacts_select on public.artifacts for select to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and exists (select 1 from public.decisions d where d.id = decision_id)
  );
create policy artifacts_insert on public.artifacts for insert to authenticated
  with check (
    vyne_private.is_internal()
    and exists (select 1 from public.decisions d where d.id = decision_id)
  );
create policy artifacts_update on public.artifacts for update to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and exists (select 1 from public.decisions d where d.id = decision_id)
  )
  with check (exists (select 1 from public.decisions d where d.id = decision_id));

create policy published_artifacts_internal_select on public.published_artifacts
  for select to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder() or advisor_id in (select vyne_private.owned_advisor_ids()))
  );
create policy published_artifacts_advisor_select on public.published_artifacts
  for select to authenticated
  using (
    deleted_at is null
    and withdrawn_at is null
    and advisor_id in (select vyne_private.my_advisor_ids())
  );
create policy published_artifacts_insert on public.published_artifacts for insert to authenticated
  with check (vyne_private.is_founder());
create policy published_artifacts_update on public.published_artifacts for update to authenticated
  using (vyne_private.is_founder())
  with check (vyne_private.is_founder());

grant select, insert, update on public.documents, public.artifacts, public.published_artifacts to authenticated;
revoke delete, truncate, references, trigger on public.documents, public.artifacts, public.published_artifacts from authenticated;
revoke all on public.documents, public.artifacts, public.published_artifacts from anon;
grant select, insert, update on public.documents, public.artifacts, public.published_artifacts to service_role;
