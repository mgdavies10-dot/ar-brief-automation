import { describe, expect, it } from "vitest";
import { currentRealitySchema, type CurrentReality } from "./current-reality";
import { assessConviction, CONVICTION_LEVELS } from "./conviction";

/** Build a valid twin, overriding pieces. */
function twin(over: Partial<CurrentReality> = {}): CurrentReality {
  return currentRealitySchema.parse(over);
}

describe("assessConviction — Conviction Engine (F2)", () => {
  it("an empty twin forms conviction, not a verdict on the advisor", () => {
    const c = assessConviction(twin(), "Robert Halvorsen");
    expect(c.level).toBe("forming");
    // Speaks about OUR understanding, never scores the advisor.
    expect(c.headline).toBe("Our understanding of Robert's business is still forming.");
    expect(c.canBeginDiscussion).toBe(false);
    // Every dimension reads as something WE still need to understand.
    expect(c.understanding.every((u) => u.standing === "unknown")).toBe(true);
    expect(c.stillToLearn.length).toBe(8);
    expect(c.materialUncertainty).toBe(true);
  });

  it("expresses conviction as language only — no numbers, gauges, or percentages", () => {
    const c = assessConviction(twin({ overview: "A planning-led ensemble." }), "Robert Halvorsen");
    const text = [c.headline, ...c.understanding.map((u) => u.phrase), ...c.stillToLearn].join(" ");
    expect(text).not.toMatch(/\d/); // no digits anywhere in what the user reads
    expect(CONVICTION_LEVELS).toContain(c.level);
  });

  it("distinguishes confirmed understanding from a working read", () => {
    const cr = twin({
      overview: "Ensemble RIA, planning-led.",
      goals: [{ text: "Grow through acquisition" }],
      dimensionConfidence: { overview: "confirmed", goals: "assumed" },
    });
    const c = assessConviction(cr, "Robert Halvorsen");
    const overview = c.understanding.find((u) => u.dimension === "overview")!;
    const goals = c.understanding.find((u) => u.dimension === "goals")!;
    expect(overview.standing).toBe("known");
    expect(overview.phrase).toBe("We understand Robert's practice overview well.");
    expect(goals.standing).toBe("working");
    expect(goals.phrase).toContain("working read");
    expect(goals.phrase).toContain("confirm");
  });

  it("earns the discussion affordance only when understanding is sufficient", () => {
    // Four of eight dimensions confirmed => understanding 0.5 => sufficient.
    const cr = twin({
      overview: "x",
      goals: [{ text: "g" }],
      motivations: [{ text: "m" }],
      constraints: [{ text: "c" }],
      dimensionConfidence: {
        overview: "confirmed",
        goals: "confirmed",
        motivations: "confirmed",
        constraints: "confirmed",
      },
    });
    const c = assessConviction(cr, "Robert Halvorsen");
    expect(c.canBeginDiscussion).toBe(true);
    expect(c.headline).toContain("begin discussing potential paths forward");
  });

  it("reaches confident, and still admits material uncertainty while any gap remains", () => {
    const dims = {
      overview: "x",
      practiceProfile: { serviceModel: "planning-led" },
      goals: [{ text: "g" }],
      motivations: [{ text: "m" }],
      constraints: [{ text: "c" }],
      strengths: [{ text: "s" }],
      frictions: [{ text: "f" }],
      // findings deliberately left empty — one honest gap remains
    };
    const confidence = Object.fromEntries(
      ["overview", "practiceProfile", "goals", "motivations", "constraints", "strengths", "frictions"].map((d) => [
        d,
        "confirmed" as const,
      ]),
    );
    const c = assessConviction(twin({ ...dims, dimensionConfidence: confidence }), "Robert Halvorsen");
    expect(c.level).toBe("confident");
    expect(c.stillToLearn).toEqual(["situation"]);
    // Question 4: because a gap remains, we say more info could change the view.
    expect(c.materialUncertainty).toBe(true);
  });

  it("falls back gracefully when no advisor name is available", () => {
    const c = assessConviction(twin(), "");
    expect(c.headline).toBe("Our understanding of this advisor's business is still forming.");
  });
});
