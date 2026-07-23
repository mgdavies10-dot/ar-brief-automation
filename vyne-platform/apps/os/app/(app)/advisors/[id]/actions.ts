"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  currentRealitySchema,
  currentRealityCompleteness,
  recommendationSchema,
  currentRealityRecordSchema,
  coolingStatus,
  DECISION_TYPES,
} from "@vyne/domain";

type DbClient = Awaited<ReturnType<typeof createClient>>;

/** The advisor's single primary decision id (the Record + Perspective attach here). */
async function primaryDecisionId(supabase: DbClient, advisorId: string): Promise<string | null> {
  const { data } = await supabase
    .from("decisions")
    .select("id")
    .eq("advisor_id", advisorId)
    .eq("is_primary", true)
    .is("deleted_at", null)
    .maybeSingle();
  return (data?.id as string) ?? null;
}

/** The current Record artifact (current_reality) for a decision, if any. */
async function currentRecord(supabase: DbClient, decisionId: string) {
  const { data } = await supabase
    .from("artifacts")
    .select("id, status, content, content_edited_at")
    .eq("decision_id", decisionId)
    .eq("artifact_type", "current_reality")
    .is("deleted_at", null)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

async function appUserId(supabase: DbClient): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("users").select("id").eq("auth_id", user.id).maybeSingle();
  return (profile?.id as string) ?? null;
}

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

/**
 * The Direction input (F2): the decision framed in plain language plus the
 * recruiter-authored recommendation (narrative first, then explainability).
 * Conviction itself is NOT stored — it is derived from the twin at read time.
 */
const directionSchema = z.object({
  decisionType: z.enum(DECISION_TYPES),
  question: z.string().trim().max(280).optional(),
  recommendation: recommendationSchema,
});

/**
 * Save (create-or-update) an advisor's primary Direction. Targets the single
 * primary decision for the advisor; creates it if absent. RLS is the authority:
 * the write only lands for an advisor the caller owns.
 */
export async function saveDirection(
  advisorId: string,
  input: unknown,
): Promise<{ ok: boolean; error?: string }> {
  const parsed = directionSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Some entries need attention." };
  const { decisionType, question, recommendation } = parsed.data;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Your session has ended." };
  const { data: profile } = await supabase.from("users").select("id").eq("auth_id", user.id).maybeSingle();

  const row = {
    decision_type: decisionType,
    question: question ?? null,
    recommendation,
  };

  const { data: existing } = await supabase
    .from("decisions")
    .select("id")
    .eq("advisor_id", advisorId)
    .eq("is_primary", true)
    .is("deleted_at", null)
    .maybeSingle();

  const result = existing
    ? await supabase.from("decisions").update(row).eq("id", existing.id)
    : await supabase
        .from("decisions")
        .insert({ ...row, advisor_id: advisorId, is_primary: true, created_by: profile?.id ?? null });

  if (result.error) return { ok: false, error: "That didn’t save — please try again." };

  revalidatePath(`/advisors/${advisorId}`);
  return { ok: true };
}

// ---------------------------------------------------------------------------
// F3 — the Premium Current Reality Record (Artifact Builder). The Record is a
// `current_reality` artifact on the advisor's primary decision. Editing anchors
// the cooling rule (content_edited_at) and returns it to draft; the founder-only
// approval is enforced by the DB guard, re-checked here for a calm message.
// ---------------------------------------------------------------------------

/** Save (create-or-update) the Record's five movements. Editing returns it to draft. */
export async function saveRecord(
  advisorId: string,
  content: unknown,
): Promise<{ ok: boolean; error?: string }> {
  const parsed = currentRealityRecordSchema.safeParse(content);
  if (!parsed.success) return { ok: false, error: "Some entries need attention." };

  const supabase = await createClient();
  const uid = await appUserId(supabase);
  if (!uid) return { ok: false, error: "Your session has ended." };

  const decisionId = await primaryDecisionId(supabase, advisorId);
  if (!decisionId) return { ok: false, error: "Set a Direction for this advisor before drafting a Record." };

  const now = new Date().toISOString();
  const existing = await currentRecord(supabase, decisionId);

  const result = existing
    ? await supabase
        .from("artifacts")
        .update({ content: parsed.data, content_edited_at: now, status: "draft", submitted_at: null, submitted_by: null })
        .eq("id", existing.id)
    : await supabase.from("artifacts").insert({
        decision_id: decisionId,
        artifact_type: "current_reality",
        status: "draft",
        content: parsed.data,
        content_edited_at: now,
        created_by: uid,
      });

  if (result.error) return { ok: false, error: "That didn’t save — please try again." };
  revalidatePath(`/advisors/${advisorId}`);
  return { ok: true };
}

/** Submit the Record for the founder's review. */
export async function submitRecordForReview(advisorId: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const uid = await appUserId(supabase);
  if (!uid) return { ok: false, error: "Your session has ended." };
  const decisionId = await primaryDecisionId(supabase, advisorId);
  if (!decisionId) return { ok: false, error: "There’s no Record to submit yet." };
  const existing = await currentRecord(supabase, decisionId);
  if (!existing) return { ok: false, error: "There’s no Record to submit yet." };

  const { error } = await supabase
    .from("artifacts")
    .update({ status: "in_review", submitted_at: new Date().toISOString(), submitted_by: uid })
    .eq("id", existing.id);
  if (error) return { ok: false, error: "That didn’t submit — please try again." };
  revalidatePath(`/advisors/${advisorId}`);
  return { ok: true };
}

/** Return the Record to draft (from review). */
export async function returnRecordToDraft(advisorId: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const decisionId = await primaryDecisionId(supabase, advisorId);
  if (!decisionId) return { ok: false, error: "There’s no Record here." };
  const existing = await currentRecord(supabase, decisionId);
  if (!existing) return { ok: false, error: "There’s no Record here." };

  const { error } = await supabase
    .from("artifacts")
    .update({
      status: "draft",
      submitted_at: null,
      submitted_by: null,
      approved_by: null,
      approved_at: null,
      cooling_override_reason: null,
    })
    .eq("id", existing.id);
  if (error) return { ok: false, error: "That didn’t update — please try again." };
  revalidatePath(`/advisors/${advisorId}`);
  return { ok: true };
}

/**
 * Approve the Record (founder only — enforced by the DB guard). The cooling rule
 * blocks same-day approval after the last edit; an override is allowed but must
 * carry a logged reason.
 */
export async function approveRecord(
  advisorId: string,
  overrideReason?: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const uid = await appUserId(supabase);
  if (!uid) return { ok: false, error: "Your session has ended." };
  const decisionId = await primaryDecisionId(supabase, advisorId);
  if (!decisionId) return { ok: false, error: "There’s no Record here." };
  const existing = await currentRecord(supabase, decisionId);
  if (!existing) return { ok: false, error: "There’s no Record here." };

  const editedAt = existing.content_edited_at ? new Date(existing.content_edited_at as string) : null;
  const cooling = coolingStatus(editedAt, new Date());
  const reason = overrideReason?.trim();
  if (!cooling.available && !reason) {
    return { ok: false, error: "This Record is still in its cooling period. Approve tomorrow, or add a reason to approve early." };
  }

  const { error } = await supabase
    .from("artifacts")
    .update({
      status: "approved",
      approved_by: uid,
      approved_at: new Date().toISOString(),
      cooling_override_reason: cooling.available ? null : (reason ?? null),
    })
    .eq("id", existing.id);
  // The DB guard rejects approval by a non-founder; surface that calmly.
  if (error) return { ok: false, error: "Only the founder can approve a Record." };
  revalidatePath(`/advisors/${advisorId}`);
  return { ok: true };
}
