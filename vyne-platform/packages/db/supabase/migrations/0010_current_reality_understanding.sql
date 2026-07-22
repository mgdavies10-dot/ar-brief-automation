-- 0010_current_reality_understanding — deepen the digital twin (M4-F1+).
-- Founder direction 2026-07-21 (the twin is VYNE's differentiator):
--   • executive_summary: a recruiter-OWNED narrative ("here's how we understand
--     your business"). Generated content is only ever a starting point; this
--     column always holds the human-editable truth.
--   • dimension_confidence: begins confidence scoring — per-dimension the twin
--     records how well we understand it (confirmed vs. assumed), so the platform
--     can always say what it knows and what still needs to be learned.
-- Additive columns only; no policy/table change (RLS still inherits the advisor).

alter table public.current_reality
  add column executive_summary   text,
  add column dimension_confidence jsonb not null default '{}'::jsonb;
