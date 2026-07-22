import { z } from "zod";
import {
  type CurrentReality,
  type CurrentRealityDimension,
  CURRENT_REALITY_DIMENSIONS,
  isDimensionComplete,
  understandingScore,
} from "./current-reality";

/**
 * The Conviction Engine (M4-F2). Founder direction 2026-07-21: measure
 * CONVICTION (VYNE's confidence in its own understanding), never READINESS
 * (software judging the advisor). It expresses professional judgment in calm
 * language — no scores, no traffic lights, no gauges — and it always keeps the
 * burden on us. Recommendations emerge from the digital twin, not a scorecard.
 */

export const CONVICTION_LEVELS = ["forming", "developing", "sufficient", "confident"] as const;
export type ConvictionLevel = (typeof CONVICTION_LEVELS)[number];

/** How each dimension of understanding currently stands. */
export type Standing = "known" | "working" | "unknown";

/** Human phrasing for each twin dimension (advisor-first, no internal jargon). */
const DIMENSION_PHRASE: Record<CurrentRealityDimension, string> = {
  overview: "practice overview",
  practiceProfile: "practice",
  goals: "goals",
  motivations: "motivations for a change",
  constraints: "constraints",
  strengths: "strengths",
  frictions: "frictions",
  findings: "situation",
};

export interface DimensionUnderstanding {
  dimension: CurrentRealityDimension;
  standing: Standing;
  phrase: string;
}

export interface ConvictionReading {
  level: ConvictionLevel;
  /** A calm, first-person-plural statement of where our understanding stands. */
  headline: string;
  /** Earned, not gated: true once we understand enough to discuss paths. */
  canBeginDiscussion: boolean;
  /** Per-dimension understanding, expressed in language. */
  understanding: DimensionUnderstanding[];
  /** Dimensions we still need to understand (human phrases). */
  stillToLearn: string[];
  /** Question 4: would more information materially change our recommendation? */
  materialUncertainty: boolean;
}

/**
 * Assess VYNE's conviction in its understanding of an advisor, from the twin.
 * Returns language, not numbers — the caller renders calm sentences.
 */
export function assessConviction(cr: CurrentReality, advisorName: string): ConvictionReading {
  const first = advisorName.split(" ")[0] || "this advisor";
  const score = understandingScore(cr); // used only to band the language, never shown

  const level: ConvictionLevel =
    score < 0.25 ? "forming" : score < 0.5 ? "developing" : score < 0.75 ? "sufficient" : "confident";

  const headline: string = {
    forming: `Our understanding of ${first}'s business is still forming.`,
    developing: `Our understanding of ${first}'s business is developing.`,
    sufficient: `We understand ${first}'s business well enough to begin discussing potential paths forward.`,
    confident: `We have strong conviction in our understanding of ${first}'s business.`,
  }[level];

  const understanding: DimensionUnderstanding[] = CURRENT_REALITY_DIMENSIONS.map((d) => {
    const captured = isDimensionComplete(cr, d);
    const conf = cr.dimensionConfidence[d];
    const standing: Standing = !captured ? "unknown" : conf === "confirmed" ? "known" : "working";
    const noun = DIMENSION_PHRASE[d];
    const phrase =
      standing === "known"
        ? `We understand ${first}'s ${noun} well.`
        : standing === "working"
          ? `We have a working read on ${first}'s ${noun}, though we'd want to confirm it.`
          : `We still need to understand ${first}'s ${noun}.`;
    return { dimension: d, standing, phrase };
  });

  const stillToLearn = understanding.filter((u) => u.standing === "unknown").map((u) => DIMENSION_PHRASE[u.dimension]);

  return {
    level,
    headline,
    canBeginDiscussion: score >= 0.5,
    understanding,
    stillToLearn,
    materialUncertainty: understanding.some((u) => u.standing !== "known"),
  };
}

/**
 * The recommendation content a recruiter authors on a decision — narrative
 * first, then explainability (why / assumptions / what could change). Stored as
 * JSONB on `decisions.recommendation`; extensible without a migration.
 */
export const recommendationSchema = z.object({
  /** "Our Current Perspective" — the narrative the advisor reads first. */
  perspective: z.string().optional(),
  /** Why we're saying this. */
  rationale: z.string().optional(),
  /** What we're assuming. */
  assumptions: z.string().optional(),
  /** What could change our view. */
  whatCouldChange: z.string().optional(),
});
export type Recommendation = z.infer<typeof recommendationSchema>;
