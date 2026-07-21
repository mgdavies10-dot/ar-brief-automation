import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { AuditEventInput } from "@vyne/audit";

/**
 * Server-only audit writer (M3-3). Writes to the append-only public.audit_events
 * via the service role (BYPASSRLS) so auth events with no user session yet
 * (login_failed) and admin actions (user.disabled) are still recorded. The
 * table grants forbid UPDATE/DELETE/TRUNCATE even to service_role, so this can
 * only ever append. Local stack only — the key is the CLI's dev default.
 *
 * Audit is best-effort observability: a write failure is logged but never
 * blocks or fails the auth action it accompanies.
 */
function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (see .env.example)");
  }
  return createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function writeAuditEvent(input: AuditEventInput): Promise<void> {
  try {
    const supabase = serviceClient();
    const { error } = await supabase.from("audit_events").insert({
      actor_id: input.actorId,
      actor_role: input.actorRole,
      event_type: input.eventType,
      record_type: input.recordType,
      record_id: input.recordId,
      advisor_id: input.advisorId ?? null,
      before: input.before ?? null,
      after: input.after ?? null,
      ip: input.ip ?? null,
      user_agent: input.userAgent ?? null,
    });
    if (error) console.error(`[audit] failed to write ${input.eventType}: ${error.message}`);
  } catch (e) {
    console.error(`[audit] writer error for ${input.eventType}:`, e);
  }
}
