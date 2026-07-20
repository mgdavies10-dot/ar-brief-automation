"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { markPasswordRotated } from "@/lib/supabase/admin";

/**
 * A1 ceremony, step one: the user sets their own password, replacing the
 * provisioned temporary one. Only after GoTrue accepts the change does the
 * server clear the rotation flag (app_metadata — admin-only surface).
 */
export async function setPassword(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (!password || password !== confirm) {
    redirect("/welcome?status=mismatch");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    redirect("/welcome?status=rejected");
  }

  await markPasswordRotated(user.id);
  redirect("/");
}
