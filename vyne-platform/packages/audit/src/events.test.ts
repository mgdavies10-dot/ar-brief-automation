import { describe, expect, it } from "vitest";
import { AUDIT_EVENT_TYPES } from "./events";

describe("audit event vocabulary", () => {
  it("contains no duplicate event types", () => {
    expect(new Set(AUDIT_EVENT_TYPES).size).toBe(AUDIT_EVENT_TYPES.length);
  });

  it("records blocked publishes as a security-relevant event (CR-001 §2)", () => {
    expect(AUDIT_EVENT_TYPES).toContain("artifact.publish_blocked");
  });

  it("covers the full artifact lifecycle transitions of the slice", () => {
    for (const evt of [
      "artifact.submitted_for_review",
      "artifact.approved",
      "artifact.published",
      "artifact.superseded",
      "artifact.withdrawn",
      "artifact.cooling_override",
    ]) {
      expect(AUDIT_EVENT_TYPES).toContain(evt);
    }
  });
});
