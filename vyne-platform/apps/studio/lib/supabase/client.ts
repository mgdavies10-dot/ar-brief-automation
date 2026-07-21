import { createBrowserClient } from "@supabase/ssr";

/** Studio browser-side client (client components only). */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example)");
  }
  return createBrowserClient(url, anonKey, { cookieOptions: { name: "vyne-studio" } });
}
