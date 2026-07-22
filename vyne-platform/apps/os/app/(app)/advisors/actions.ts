"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { writeAuditEvent } from "@vyne/auth/audit";

/** Create an advisor the creator owns (auto-assignment, §6), then open them. */
export async function createAdvisor(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase
    .from("users")
    .select("id, role")
    .eq("auth_id", user.id)
    .maybeSingle();
  if (!profile) redirect("/unauthorized");

  const firstName = String(formData.get("first_name") ?? "").trim();
  const lastName = String(formData.get("last_name") ?? "").trim();
  if (!firstName || !lastName) redirect("/advisors/new?error=name");

  const city = String(formData.get("city") ?? "").trim() || null;
  const state = String(formData.get("state") ?? "").trim() || null;
  const firmId = String(formData.get("firm_id") ?? "").trim() || null;

  const { data, error } = await supabase
    .from("advisors")
    .insert({
      first_name: firstName,
      last_name: lastName,
      city,
      state,
      current_firm_id: firmId,
      relationship_owner_id: profile.id,
      commercial_owner_id: profile.id,
    })
    .select("id")
    .single();

  if (error || !data) redirect("/advisors/new?error=save");

  await writeAuditEvent({
    eventType: "advisor.created",
    actorId: profile.id,
    actorRole: profile.role,
    recordType: "advisor",
    recordId: data.id,
    advisorId: data.id,
    after: { name: `${firstName} ${lastName}` },
  });

  redirect(`/advisors/${data.id}`);
}
