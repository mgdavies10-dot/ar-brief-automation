import { createBrowserSupabase } from "@vyne/auth/browser";

/** Studio browser-side Supabase client (cookie-scoped to this app). */
export function createClient() {
  return createBrowserSupabase("vyne-studio");
}
