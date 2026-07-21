import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Ends the Studio auth session and returns to sign-in. */
export async function GET(request: Request): Promise<NextResponse> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/login?status=ended", request.url));
}
