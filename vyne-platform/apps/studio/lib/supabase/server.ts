import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Studio server-side Supabase client. Cookie name is app-scoped
 * ("vyne-studio") so a Studio session can never ride into OS and vice versa
 * on the shared localhost origin (M3_plan risk R4).
 */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example)");
  }
  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookieOptions: { name: "vyne-studio" },
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
