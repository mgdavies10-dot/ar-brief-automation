import { createBrowserClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

/**
 * Browser-side Supabase client (client components only), scoped to the app's
 * cookie name. Shared by both apps (M3-S).
 */
export function createBrowserSupabase(cookieName: string) {
  const { url, anonKey } = supabaseEnv();
  return createBrowserClient(url, anonKey, { cookieOptions: { name: cookieName } });
}
