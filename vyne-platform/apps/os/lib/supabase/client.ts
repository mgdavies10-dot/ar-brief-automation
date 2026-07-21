import { createBrowserSupabase } from "@vyne/auth/browser";

/** OS browser-side Supabase client (cookie-scoped to this app). */
export function createClient() {
  return createBrowserSupabase("vyne-os");
}
