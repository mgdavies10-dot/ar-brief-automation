import { z } from "zod";

/**
 * The advisor's "digital twin" — the typed contract for Current Reality (M4-F1).
 *
 * Stored as JSONB in `public.current_reality` and validated here so new
 * dimensions/fields extend the shape WITHOUT a database migration (the
 * "future-ready, no schema redesign" guarantee). Every downstream workflow —
 * decision readiness, artifacts, and later modeling / firm intelligence / AI —
 * reads from this one coherent understanding.
 *
 * Design notes:
 * - Small controlled vocabularies (priority, horizon, constraint/finding kinds)
 *   keep the twin coherent and machine-reasonable; all are extend-in-code.
 * - `practiceProfile` is structured-but-optional: future modeling inputs slot in
 *   as new optional fields, never a rebuild.
 */

export const GOAL_PRIORITIES = ["high", "medium", "low"] as const;
export const GOAL_HORIZONS = ["near_term", "mid_term", "long_term"] as const;
export const CONSTRAINT_KINDS = [
  "contractual",
  "deferred_comp",
  "non_solicit",
  "garden_leave",
  "financial",
  "personal",
  "other",
] as const;
export const FINDING_KINDS = ["strength", "risk", "opportunity", "consideration"] as const;

export type GoalPriority = (typeof GOAL_PRIORITIES)[number];
export type GoalHorizon = (typeof GOAL_HORIZONS)[number];
export type ConstraintKind = (typeof CONSTRAINT_KINDS)[number];
export type FindingKind = (typeof FINDING_KINDS)[number];

const nonEmpty = z.string().trim().min(1);

export const goalSchema = z.object({
  text: nonEmpty,
  priority: z.enum(GOAL_PRIORITIES).optional(),
  horizon: z.enum(GOAL_HORIZONS).optional(),
});

export const motivationSchema = z.object({ text: nonEmpty });

export const constraintSchema = z.object({
  text: nonEmpty,
  kind: z.enum(CONSTRAINT_KINDS).optional(),
});

export const observationSchema = z.object({ text: nonEmpty });

export const findingSchema = z.object({
  text: nonEmpty,
  kind: z.enum(FINDING_KINDS).optional(),
});

/**
 * Structured practice facts beyond the commercial record on `advisors`
 * (which owns AUM / T12 / segment & revenue mix). Every field optional so the
 * twin fills in progressively; future modeling inputs extend this object.
 */
export const practiceProfileSchema = z.object({
  teamStructure: z.string().optional(), // solo / partnership / ensemble; roles
  staffCount: z.number().int().nonnegative().optional(),
  yearsInBusiness: z.number().int().nonnegative().optional(),
  custodianOrPlatform: z.string().optional(),
  serviceModel: z.string().optional(), // planning-led, investment-led, family-office…
  clientAcquisition: z.string().optional(), // referrals, COIs, marketing…
  growthTrajectory: z.string().optional(), // narrative or trend
  successionStatus: z.string().optional(),
});

/**
 * Confidence in each captured dimension (begins confidence scoring). Absent =
 * not yet understood ("still to learn"); the twin always communicates what it
 * knows vs. what needs learning.
 */
export const CONFIDENCE_LEVELS = ["confirmed", "assumed"] as const;
export type ConfidenceLevel = (typeof CONFIDENCE_LEVELS)[number];
export const dimensionConfidenceSchema = z.record(z.string(), z.enum(CONFIDENCE_LEVELS)).default({});
export type DimensionConfidence = z.infer<typeof dimensionConfidenceSchema>;

/** The full Current Reality shape (the digital twin). */
export const currentRealitySchema = z.object({
  /** Recruiter-owned narrative — "here's how we understand your business."
   *  Generated drafts only ever seed this; the human always holds the truth. */
  executiveSummary: z.string().optional(),
  overview: z.string().optional(),
  practiceProfile: practiceProfileSchema.default({}),
  goals: z.array(goalSchema).default([]),
  motivations: z.array(motivationSchema).default([]),
  constraints: z.array(constraintSchema).default([]),
  strengths: z.array(observationSchema).default([]),
  frictions: z.array(observationSchema).default([]),
  findings: z.array(findingSchema).default([]),
  recruiterNotes: z.string().optional(),
  dimensionConfidence: dimensionConfidenceSchema,
});

export type Goal = z.infer<typeof goalSchema>;
export type Motivation = z.infer<typeof motivationSchema>;
export type Constraint = z.infer<typeof constraintSchema>;
export type Observation = z.infer<typeof observationSchema>;
export type Finding = z.infer<typeof findingSchema>;
export type PracticeProfile = z.infer<typeof practiceProfileSchema>;
export type CurrentReality = z.infer<typeof currentRealitySchema>;

export const CURRENT_REALITY_STATUSES = ["draft", "in_progress", "complete"] as const;
export type CurrentRealityStatus = (typeof CURRENT_REALITY_STATUSES)[number];

/**
 * The eight substantive dimensions used to gauge completeness (the "feel
 * understood" bar). Kept here so the UI and any future readiness logic agree.
 */
export const CURRENT_REALITY_DIMENSIONS = [
  "overview",
  "practiceProfile",
  "goals",
  "motivations",
  "constraints",
  "strengths",
  "frictions",
  "findings",
] as const;
export type CurrentRealityDimension = (typeof CURRENT_REALITY_DIMENSIONS)[number];

/** True when a dimension carries real content (drives completeness + status). */
export function isDimensionComplete(cr: CurrentReality, dim: CurrentRealityDimension): boolean {
  switch (dim) {
    case "overview":
      return Boolean(cr.overview && cr.overview.trim().length > 0);
    case "practiceProfile":
      return Object.values(cr.practiceProfile ?? {}).some((v) => v !== undefined && v !== "");
    default:
      return Array.isArray(cr[dim]) && (cr[dim] as unknown[]).length > 0;
  }
}

/** Fraction (0–1) of dimensions with content — used for the calm progress cue. */
export function currentRealityCompleteness(cr: CurrentReality): number {
  const done = CURRENT_REALITY_DIMENSIONS.filter((d) => isDimensionComplete(cr, d)).length;
  return done / CURRENT_REALITY_DIMENSIONS.length;
}

export const DIMENSION_LABELS: Record<CurrentRealityDimension, string> = {
  overview: "Overview",
  practiceProfile: "The practice",
  goals: "Goals",
  motivations: "Why now",
  constraints: "Constraints",
  strengths: "Strengths",
  frictions: "Frictions",
  findings: "Findings",
};

/** Dimensions with no content yet — "what we still need to learn." */
export function dimensionsToLearn(cr: CurrentReality): CurrentRealityDimension[] {
  return CURRENT_REALITY_DIMENSIONS.filter((d) => !isDimensionComplete(cr, d));
}

/**
 * Understanding (0–1) — completeness weighted by confidence. A confirmed
 * dimension counts full; a captured-but-assumed dimension counts half; an
 * empty dimension counts zero. This is what the platform reports as "how well
 * we understand this business," distinct from raw completeness.
 */
export function understandingScore(cr: CurrentReality): number {
  let score = 0;
  for (const d of CURRENT_REALITY_DIMENSIONS) {
    if (!isDimensionComplete(cr, d)) continue;
    score += cr.dimensionConfidence[d] === "confirmed" ? 1 : 0.5;
  }
  return score / CURRENT_REALITY_DIMENSIONS.length;
}

function listPhrase(items: string[]): string {
  const xs = items.map((s) => s.trim()).filter(Boolean);
  if (xs.length <= 1) return xs.join("");
  if (xs.length === 2) return `${xs[0]} and ${xs[1]}`;
  return `${xs.slice(0, -1).join(", ")}, and ${xs[xs.length - 1]}`;
}

/**
 * Compose a STARTING-POINT executive narrative from the captured structure.
 * Deterministic (no AI; EA-001) — the recruiter always edits this into the
 * final. Voice: a consultant summarizing the business, not a data dump.
 */
export function generateSummaryDraft(cr: CurrentReality, advisorName: string): string {
  const first = advisorName.split(" ")[0] || "The advisor";
  const parts: string[] = [];
  if (cr.overview?.trim()) parts.push(cr.overview.trim());

  const pp = cr.practiceProfile;
  const facts: string[] = [];
  if (pp.serviceModel) facts.push(`a ${pp.serviceModel} practice`);
  if (pp.teamStructure) facts.push(pp.teamStructure);
  if (pp.yearsInBusiness) facts.push(`${pp.yearsInBusiness} years in business`);
  if (pp.custodianOrPlatform) facts.push(`on ${pp.custodianOrPlatform}`);
  if (facts.length) parts.push(`${first} runs ${listPhrase(facts)}.`);

  if (cr.goals.length) parts.push(`${first} is focused on ${listPhrase(cr.goals.map((g) => g.text))}.`);
  if (cr.motivations.length) parts.push(`What's driving the conversation now: ${listPhrase(cr.motivations.map((m) => m.text))}.`);
  if (cr.strengths.length) parts.push(`Notable strengths include ${listPhrase(cr.strengths.map((s) => s.text))}.`);
  if (cr.frictions.length) parts.push(`Frictions holding the practice back: ${listPhrase(cr.frictions.map((f) => f.text))}.`);
  if (cr.constraints.length) parts.push(`Constraints to navigate: ${listPhrase(cr.constraints.map((c) => c.text))}.`);
  if (cr.findings.length) parts.push(`Our read: ${listPhrase(cr.findings.map((f) => f.text))}.`);

  return parts.join("\n\n");
}
