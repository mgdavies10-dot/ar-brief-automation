"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { markPasswordRotated } from "@/lib/supabase/admin";

/** A1 ceremony (Studio): the advisor sets their own password. */
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
