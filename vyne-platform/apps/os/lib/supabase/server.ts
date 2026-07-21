import { createServerSupabase } from "@vyne/auth/server";

/** OS server-side Supabase client (cookie-scoped to this app). */
export function createClient() {
  return createServerSupabase("vyne-os");
}
