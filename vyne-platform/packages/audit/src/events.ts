/**
 * Audit event vocabulary for the EA-001 slice (Architecture §12: append-only
 * audit_events; every slice action logged). The writer lands in M2 with the
 * database; event types are fixed here first so migrations, app code, and
 * tests share one dictionary.
 *
 * CR-001 §2 addition: a blocked publish (residue-scan hit) is a security-
 * relevant event and MUST be recorded — hence `artifact.publish_blocked`.
 */
export const AUDIT_EVENT_TYPES = [
  // Auth & sessions
  "auth.login",
  "auth.login_failed",
  "auth.logout",
  "auth.session_revoked",
  // Users & access
  "user.created",
  "user.disabled",
  "user.role_changed",
  // Core records
  "advisor.created",
  "advisor.updated",
  "decision.created",
  "decision.updated",
  "task.created",
  "task.completed",
  "document.attested_upload",
  // Artifact lifecycle
  "artifact.created",
  "artifact.updated",
  "artifact.submitted_for_review",
  "artifact.returned_to_draft",
  "artifact.approved",
  "artifact.cooling_override",
  "artifact.publish_blocked",
  "artifact.published",
  "artifact.superseded",
  "artifact.withdrawn",
  // Studio-side
  "studio.artifact_viewed",
  "studio.task_completed",
] as const;

export type AuditEventType = (typeof AUDIT_EVENT_TYPES)[number];

export interface AuditEventInput {
  eventType: AuditEventType;
  actorId: string | null;
  actorRole: string | null;
  recordType: string;
  recordId: string | null;
  advisorId?: string | null;
  before?: unknown;
  after?: unknown;
  ip?: string | null;
  userAgent?: string | null;
}
