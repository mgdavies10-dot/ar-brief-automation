import { createServerSupabase } from "@vyne/auth/server";

/** Studio server-side Supabase client (cookie-scoped to this app). */
export function createClient() {
  return createServerSupabase("vyne-studio");
}
