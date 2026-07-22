-- 0009_current_reality — the advisor's "digital twin" decision-support layer
-- (EA-001 M4 · F1). One living record per advisor: the single source of truth
-- every downstream workflow (readiness, artifacts, and — later, under a new
-- authorization — modeling, firm intel, AI) reasons over.
--
-- Design (M4-F1 proposal): `advisors` stays the commercial record; this holds
-- the decision-support understanding. Structured dimensions are JSONB, typed by
-- zod in @vyne/domain, so new dimensions extend the shape WITHOUT a migration.
-- Narrative fields carry the "trusted consultant" voice. Visibility inherits the
-- advisor's (founder all; recruiter owned-only; advisor role zero-grant).

create table public.current_reality (
  id            uuid primary key default gen_random_uuid(),
  advisor_id    uuid not null unique references public.advisors (id),
  status        text not null default 'draft'
                  check (status in ('draft', 'in_progress', 'complete')),

  -- Narrative (human prose — reads like a consultant, not a form).
  overview      text,

  -- Structured, extensible dimensions of the twin. JSONB shape is validated in
  -- @vyne/domain (zod); future fields/dimensions are additive, no schema change.
  practice_profile jsonb not null default '{}'::jsonb,   -- structured facts beyond `advisors` (team, staff, platform, service model, growth)
  goals            jsonb not null default '[]'::jsonb,    -- [{ text, priority, horizon }]
  motivations      jsonb not null default '[]'::jsonb,    -- [{ text }] what's driving the consideration
  constraints      jsonb not null default '[]'::jsonb,    -- [{ text, kind }] contractual / deferred-comp / non-solicit / personal
  strengths        jsonb not null default '[]'::jsonb,    -- [{ text }]
  frictions        jsonb not null default '[]'::jsonb,    -- [{ text }] what isn't working
  findings         jsonb not null default '[]'::jsonb,    -- [{ text, kind }] synthesized observations

  -- Recruiter augmentation — human judgment, always addable, never removed by the system.
  recruiter_notes  text,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid references public.users (id),
  deleted_at    timestamptz
);
alter table public.current_reality enable row level security;
create trigger current_reality_updated_at before update on public.current_reality
  for each row execute function vyne_private.set_updated_at();
create index current_reality_advisor_idx on public.current_reality (advisor_id);

-- RLS (§12): visibility inherits the advisor. Founder all; recruiter only where
-- they own the advisor; the advisor role has NO path (zero-grant posture).
create policy current_reality_select on public.current_reality for select to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder() or advisor_id in (select vyne_private.owned_advisor_ids()))
  );
create policy current_reality_insert on public.current_reality for insert to authenticated
  with check (
    vyne_private.is_internal()
    and (vyne_private.is_founder() or advisor_id in (select vyne_private.owned_advisor_ids()))
  );
create policy current_reality_update on public.current_reality for update to authenticated
  using (
    deleted_at is null and vyne_private.is_internal()
    and (vyne_private.is_founder() or advisor_id in (select vyne_private.owned_advisor_ids()))
  )
  with check (
    vyne_private.is_founder() or advisor_id in (select vyne_private.owned_advisor_ids())
  );

grant select, insert, update on public.current_reality to authenticated;
revoke delete, truncate, references, trigger on public.current_reality from authenticated;
revoke all on public.current_reality from anon;
grant select, insert, update on public.current_reality to service_role;
