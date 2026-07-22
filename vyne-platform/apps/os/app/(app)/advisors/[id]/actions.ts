"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { currentRealitySchema, currentRealityCompleteness } from "@vyne/domain";

/**
 * Save (create-or-update) an advisor's Current Reality — the single living
 * record. Validated against the digital-twin contract; status is derived from
 * completeness so "complete" always means the twin is genuinely filled in.
 * RLS is the authority: the write only lands for an advisor the caller owns.
 */
export async function saveCurrentReality(
  advisorId: string,
  input: unknown,
): Promise<{ ok: boolean; error?: string }> {
  const parsed = currentRealitySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Some entries need attention." };
  const cr = parsed.data;

  const pct = currentRealityCompleteness(cr);
  const status = pct === 0 ? "draft" : pct === 1 ? "complete" : "in_progress";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Your session has ended." };
  const { data: profile } = await supabase.from("users").select("id").eq("auth_id", user.id).maybeSingle();

  const row = {
    executive_summary: cr.executiveSummary ?? null,
    overview: cr.overview ?? null,
    practice_profile: cr.practiceProfile,
    goals: cr.goals,
    motivations: cr.motivations,
    constraints: cr.constraints,
    strengths: cr.strengths,
    frictions: cr.frictions,
    findings: cr.findings,
    recruiter_notes: cr.recruiterNotes ?? null,
    dimension_confidence: cr.dimensionConfidence,
    status,
  };

  const { data: existing } = await supabase
    .from("current_reality")
    .select("id")
    .eq("advisor_id", advisorId)
    .maybeSingle();

  const result = existing
    ? await supabase.from("current_reality").update(row).eq("advisor_id", advisorId)
    : await supabase.from("current_reality").insert({ ...row, advisor_id: advisorId, created_by: profile?.id ?? null });

  if (result.error) return { ok: false, error: "That didn’t save — please try again." };

  revalidatePath(`/advisors/${advisorId}`);
  return { ok: true };
}
