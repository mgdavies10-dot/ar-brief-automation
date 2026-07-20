import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Ends the auth session and returns to sign-in. Used when a session exists
 * but no active public.users row backs it (e.g. account disabled): RLS has
 * already gone dark; this clears the now-useless cookies. The full calm
 * unauthorized page (§4.1) arrives in M3-3 with revocation.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/login?status=ended", request.url));
}
