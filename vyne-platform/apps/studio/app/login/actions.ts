"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Studio sign-in / sign-out. One §4.1 error for every failure. */
export async function signIn(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (email && password) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) redirect("/");
  }
  redirect("/login?status=failed");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
