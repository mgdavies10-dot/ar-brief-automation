import { describe, expect, it } from "vitest";
import {
  ARTIFACT_LIFECYCLE,
  COMMERCIAL_STAGES,
  DECISION_TYPES,
  ROLES,
  V1_ACTIVE_ROLES,
} from "./vocabulary";

describe("status vocabularies", () => {
  it("keeps the commercial and artifact-lifecycle vocabularies disjoint (UX design principle 5)", () => {
    const lifecycle = new Set<string>(ARTIFACT_LIFECYCLE);
    for (const stage of COMMERCIAL_STAGES) {
      expect(lifecycle.has(stage)).toBe(false);
    }
  });

  it("has the exact artifact lifecycle from Architecture §4", () => {
    expect(ARTIFACT_LIFECYCLE).toEqual([
      "draft",
      "in_review",
      "approved",
      "published",
      "superseded",
      "withdrawn",
    ]);
  });

  it("seeds exactly the ten CR-001 §1.1 decision types, in ruling order", () => {
    expect(DECISION_TYPES).toEqual([
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
    ]);
  });

  it("activates only founder, recruiter, advisor in v1", () => {
    expect(V1_ACTIVE_ROLES).toEqual(["founder", "recruiter", "advisor"]);
    for (const role of V1_ACTIVE_ROLES) {
      expect(ROLES).toContain(role);
    }
  });
});
