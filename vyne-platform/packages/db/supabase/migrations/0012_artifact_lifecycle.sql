-- 0012_artifact_lifecycle — F3 Artifact Builder support (EA-001 M4).
-- The Premium Current Reality Record reuses the existing `artifacts` table
-- (0005): artifact_type='current_reality', the Draft→…→Withdrawn lifecycle, the
-- founder-only approval guard, and content jsonb. This migration adds only what
-- makes the lifecycle legible and the cooling rule (CR-001 §1.4 / UX §5.5) real:
--   • content_edited_at       — the cooling anchor: when the draft was last
--                               EDITED (not merely transitioned). Approval is
--                               unavailable until the next calendar day after it.
--   • submitted_at / submitted_by — the In-review transition's actor + time,
--                               shown inline ("Submitted by … — Jul 14").
--   • cooling_override_reason — the logged reason when the founder overrides the
--                               cooling period (override exists but must be
--                               justified).
-- Additive only. RLS and the founder-only approval guard are UNCHANGED; approval
-- stays a founder act. Publishing (published_artifacts) remains M5.

alter table public.artifacts
  add column content_edited_at       timestamptz,
  add column submitted_at            timestamptz,
  add column submitted_by            uuid references public.users (id),
  add column cooling_override_reason text;
