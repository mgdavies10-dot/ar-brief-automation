/**
 * Integration adapters — DISABLED under EA-WEB-002 §2 (activation gate).
 *
 * Every outbound integration is mocked so the complete user experience can be
 * built and tested WITHOUT collecting any real advisor information.
 * Nothing is transmitted, stored, emailed, written to a CRM, or tracked.
 */
export const ACTIVATION_ENABLED = false as const;

export type ConsentState = {
  granted: boolean;
  version: string;
  grantedAt: string | null;
  scope: "newsletter" | "report" | "conversation" | "offer-review" | "comparison";
};

export type CrmHandoff = {
  source: string; page: string; topic: string; tool: string | null;
  requestedNextAction: string; consent: ConsentState; disclosureVersion: string;
};

/** Mocked. Returns the payload it WOULD send. Sends nothing. */
export async function submitLead(payload: CrmHandoff) {
  if (!ACTIVATION_ENABLED) {
    return { ok: true as const, mocked: true as const, wouldSend: payload };
  }
  throw new Error("Activation gate not authorized (EA-WEB-002 §2).");
}

/** Mocked. Records nothing. */
export function trackEvent(name: string, props: Record<string, unknown> = {}) {
  if (!ACTIVATION_ENABLED) return { mocked: true as const, name, props };
  throw new Error("Analytics transmission not authorized (EA-WEB-002 §2).");
}

/** Analytics EVENT SPECIFICATION — defined now, transmitted never (yet). */
export const ANALYTICS_EVENTS = [
  "page_view", "nav_open", "tool_start", "tool_complete", "assessment_start",
  "assessment_complete", "report_requested", "newsletter_submit",
  "conversation_requested", "offer_review_requested", "comparison_requested",
  "consent_granted", "consent_withdrawn",
] as const;
