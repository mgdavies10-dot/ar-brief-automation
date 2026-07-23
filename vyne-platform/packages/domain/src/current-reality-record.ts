import { z } from "zod";
import { type CurrentReality, generateSummaryDraft } from "./current-reality";
import { assessConviction, type Recommendation } from "./conviction";

/**
 * The Premium Current Reality Record (M4-F3) — the artifact's content.
 *
 * Founder doctrine (2026-07-22): the Record is professional correspondence, a
 * milestone in the relationship, not a deliverable. Its structure is a STORY in
 * five movements, not a set of sections. VYNE composes a starting draft from the
 * twin (F1) + Our Perspective (F2); the recruiter always holds the pen. No AI
 * (EA-001) — the composer is deterministic. Stored as `content` jsonb on the
 * existing `artifacts` row (artifact_type='current_reality').
 */

/** The five movements, in narrative order, with their letter headings. */
export const RECORD_MOVEMENTS = [
  { key: "understand", title: "What we've come to understand" },
  { key: "mattersMost", title: "What appears to matter most" },
  { key: "perspective", title: "Our current perspective" },
  { key: "understandFurther", title: "What we'd like to understand further" },
  { key: "focusNext", title: "Where we'd focus next" },
] as const;

export type RecordMovementKey = (typeof RECORD_MOVEMENTS)[number]["key"];

export const currentRealityRecordSchema = z.object({
  understand: z.string().optional(),
  mattersMost: z.string().optional(),
  perspective: z.string().optional(),
  understandFurther: z.string().optional(),
  focusNext: z.string().optional(),
});
export type CurrentRealityRecord = z.infer<typeof currentRealityRecordSchema>;

function listPhrase(items: string[]): string {
  const xs = items.map((s) => s.trim()).filter(Boolean);
  if (xs.length <= 1) return xs.join("");
  if (xs.length === 2) return `${xs[0]} and ${xs[1]}`;
  return `${xs.slice(0, -1).join(", ")}, and ${xs[xs.length - 1]}`;
}

/**
 * Compose a STARTING-POINT Record from the twin + Our Perspective. Deterministic;
 * the recruiter edits every word. Voice: a partner writing to a partner — never
 * "Summary / Analysis / Findings." Movements with no basis yet are left empty for
 * the author (silence is part of premium design), never padded.
 */
export function composeRecordDraft(
  cr: CurrentReality,
  recommendation: Recommendation | null | undefined,
  advisorName: string,
): CurrentRealityRecord {
  const first = advisorName.split(" ")[0] || "this advisor";

  const understand = cr.executiveSummary?.trim() || generateSummaryDraft(cr, advisorName);

  const goals = cr.goals.map((g) => g.text);
  const motivations = cr.motivations.map((m) => m.text);
  const mattersParts: string[] = [];
  // Colon-led lists read cleanly whether goals are phrased as nouns or aims.
  if (goals.length) mattersParts.push(`For ${first}, the priorities are clear: ${listPhrase(goals)}.`);
  if (motivations.length) mattersParts.push(`What's bringing this to a head: ${listPhrase(motivations)}.`);
  const mattersMost = mattersParts.join(" ");

  const perspective = recommendation?.perspective?.trim() ?? "";

  // Honest about the limits of our understanding: what we don't yet know AND
  // what we're only assuming (a working read we'd want to confirm).
  const conviction = assessConviction(cr, advisorName);
  const furtherParts: string[] = [];
  if (conviction.stillToLearn.length) {
    furtherParts.push(`we'd like to understand ${first}'s ${listPhrase(conviction.stillToLearn)} more fully`);
  }
  if (conviction.toConfirm.length) {
    furtherParts.push(`we'd want to confirm what we believe about ${first}'s ${listPhrase(conviction.toConfirm)}`);
  }
  const understandFurther = furtherParts.length
    ? `Before we'd make a stronger recommendation, ${furtherParts.join(", and ")}.`
    : `We feel we have a well-rounded understanding of ${first}'s practice.`;

  return {
    understand,
    mattersMost,
    perspective,
    understandFurther,
    focusNext: "", // a considered next step — the recruiter's judgment to add
  };
}

/** True once the Record carries real content in any movement. */
export function recordHasContent(record: CurrentRealityRecord): boolean {
  return RECORD_MOVEMENTS.some(({ key }) => Boolean(record[key]?.trim()));
}

/**
 * The cooling rule (CR-001 §1.4 / UX §5.5): approval is unavailable until the
 * next calendar day after the draft was last edited — the founder cannot approve
 * in the same session/day they last touched it. Configurable (default ON); an
 * override exists but must carry a logged reason (handled by the caller).
 */
export interface CoolingPolicy {
  enabled: boolean;
}
export const DEFAULT_COOLING_POLICY: CoolingPolicy = { enabled: true };

export interface CoolingStatus {
  /** May the founder approve now (absent an override)? */
  available: boolean;
  /** When approval becomes available (local midnight after the last edit). */
  clearedAt: Date | null;
  /** Calm, product-facing language for the Approve control when not yet available. */
  message: string;
}

function localMidnight(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function coolingStatus(
  contentEditedAt: Date | null | undefined,
  now: Date,
  policy: CoolingPolicy = DEFAULT_COOLING_POLICY,
): CoolingStatus {
  if (!policy.enabled || !contentEditedAt) {
    return { available: true, clearedAt: null, message: "" };
  }
  const edited = localMidnight(contentEditedAt);
  const clearedAt = new Date(edited.getFullYear(), edited.getMonth(), edited.getDate() + 1);
  const available = localMidnight(now).getTime() >= clearedAt.getTime();
  return {
    available,
    clearedAt,
    message: available ? "" : "Available after cooling period — tomorrow.",
  };
}
