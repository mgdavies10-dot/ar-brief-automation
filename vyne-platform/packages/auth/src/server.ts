import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

/**
 * Server-side Supabase client bound to the request's cookies, scoped to the
 * app's cookie name so OS and Studio sessions never cross on the shared
 * localhost origin. Shared by both apps (M3-S).
 */
export async function createServerSupabase(cookieName: string) {
  const { url, anonKey } = supabaseEnv();
  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookieOptions: { name: cookieName },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component render — middleware handles refresh.
        }
      },
    },
  });
}
