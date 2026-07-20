-- Rollback 0008_auth_claims_hook: remove the custom access token hook.
-- (GoTrue tolerates a missing hook only if the config no longer references it;
-- rolling back in a running stack also requires disabling the hook in
-- supabase/config.toml.)

drop function if exists public.custom_access_token_hook(jsonb);
