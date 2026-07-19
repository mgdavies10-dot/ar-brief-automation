/**
 * VYNE status dictionaries — the two disjoint vocabularies (UX Blueprint Part 3,
 * Status Pill; design principle 5: "Two vocabularies, never mixed").
 *
 * Commercial vocabulary is OS-only and belongs to the pipeline module, which is
 * EXCLUDED from the EA-001 slice — it is defined here only because the residue
 * scan (M5, CR-001 §1.3) must detect it in advisor-facing content.
 */

/** Artifact lifecycle (Architecture §4 `artifacts.status`). */
export const ARTIFACT_LIFECYCLE = [
  "draft",
  "in_review",
  "approved",
  "published",
  "superseded",
  "withdrawn",
] as const;
export type ArtifactStatus = (typeof ARTIFACT_LIFECYCLE)[number];

/**
 * Commercial pipeline stages (Architecture §2 KEEP list). OS-only vocabulary —
 * must never appear in any Studio string or published artifact (residue scan).
 * The pipeline module itself is excluded scope under EA-001.
 */
export const COMMERCIAL_STAGES = [
  "prospect",
  "discovery",
  "modeling",
  "presented",
  "in_contention",
  "submitted",
  "offer",
  "signed",
  "hired",
  "on_hold",
  "lost",
] as const;
export type CommercialStage = (typeof COMMERCIAL_STAGES)[number];

/** Decision current-state values (Architecture §4 `decisions.current_state`). */
export const DECISION_STATES = [
  "STAY",
  "STRENGTHEN",
  "PREPARE",
  "MOVE",
  "CONTINUE_DILIGENCE",
] as const;
export type DecisionState = (typeof DECISION_STATES)[number];

/**
 * decision_type seed taxonomy — CR-001 §1.1 (binding, DL-2026-010): the ten
 * founding decision types from the Decision Library (Vol IV). Stored as
 * lookup-constrained text, extensible by migration only.
 */
export const DECISION_TYPES = [
  "stay",
  "stay_and_strengthen",
  "move_employee_firm",
  "supported_independence",
  "launch_or_join_ria",
  "acquire_practice",
  "merge_teams",
  "sell_or_monetize",
  "internal_family_succession",
  "external_capital_partner",
] as const;
export type DecisionType = (typeof DECISION_TYPES)[number];

/** User roles (Architecture §4). v1 provisions founder, recruiter, advisor only. */
export const ROLES = [
  "founder",
  "recruiter",
  "analyst",
  "operations",
  "finance",
  "advisor",
] as const;
export type Role = (typeof ROLES)[number];
export const V1_ACTIVE_ROLES = ["founder", "recruiter", "advisor"] as const;

/** Artifact types (Architecture §4 `artifacts.artifact_type`). */
export const ARTIFACT_TYPES = [
  "current_reality",
  "future_state_mandate",
  "vynes_9_profile",
  "constraint_map",
  "alternative_comparison",
  "scorecard",
  "economic_model_report",
  "decision_record",
  "action_path",
] as const;
export type ArtifactType = (typeof ARTIFACT_TYPES)[number];

/** Document classifications (Architecture §4 `documents.classification`). */
export const DOCUMENT_CLASSIFICATIONS = [
  "internal_only",
  "advisor_provided",
  "firm_provided",
  "deliverable_draft",
  "published",
] as const;
export type DocumentClassification = (typeof DOCUMENT_CLASSIFICATIONS)[number];
