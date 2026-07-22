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

/** The full Current Reality shape (the JSONB dimensions of the twin). */
export const currentRealitySchema = z.object({
  overview: z.string().optional(),
  practiceProfile: practiceProfileSchema.default({}),
  goals: z.array(goalSchema).default([]),
  motivations: z.array(motivationSchema).default([]),
  constraints: z.array(constraintSchema).default([]),
  strengths: z.array(observationSchema).default([]),
  frictions: z.array(observationSchema).default([]),
  findings: z.array(findingSchema).default([]),
  recruiterNotes: z.string().optional(),
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
