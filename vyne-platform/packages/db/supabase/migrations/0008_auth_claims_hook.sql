-- 0008_auth_claims_hook — custom access token hook (EA-001 M3-1; M3_plan §2.6/§4)
-- Embeds `user_role` in the JWT as a routing convenience for app route guards.
-- The claim is never the authority: RLS continues to resolve role/status live
-- from public.users via the §12 helpers, so revocation never waits on a token.
-- SECURITY DEFINER (owner) so no grant or policy on public.users changes —
-- the M2-accepted RLS surface is untouched.

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql stable security definer
set search_path = ''
as $$
declare
  claims jsonb := coalesce(event->'claims', '{}'::jsonb);
  v_role text;
begin
  select u.role into v_role
  from public.users u
  where u.auth_id = (event->>'user_id')::uuid
    and u.status = 'active'
    and u.deleted_at is null;
  if v_role is not null then
    claims := jsonb_set(claims, '{user_role}', to_jsonb(v_role));
  end if;
  return jsonb_set(event, '{claims}', claims);
end;
$$;

-- Callable by GoTrue only; not exposed as an API RPC to any client role.
revoke all on function public.custom_access_token_hook(jsonb) from public;
revoke all on function public.custom_access_token_hook(jsonb) from anon;
revoke all on function public.custom_access_token_hook(jsonb) from authenticated;
grant execute on function public.custom_access_token_hook(jsonb) to supabase_auth_admin;
