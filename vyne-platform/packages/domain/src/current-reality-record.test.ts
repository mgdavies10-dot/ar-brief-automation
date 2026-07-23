import { describe, expect, it } from "vitest";
import { currentRealitySchema, type CurrentReality } from "./current-reality";
import type { Recommendation } from "./conviction";
import {
  composeRecordDraft,
  recordHasContent,
  coolingStatus,
  RECORD_MOVEMENTS,
} from "./current-reality-record";

function twin(over: Partial<CurrentReality> = {}): CurrentReality {
  return currentRealitySchema.parse(over);
}

describe("composeRecordDraft — the five-movement letter (F3)", () => {
  it("seeds each movement from the twin and Our Perspective", () => {
    const cr = twin({
      executiveSummary: "Robert runs a planning-led ensemble in Greenwich.",
      goals: [{ text: "grow through acquisition" }],
      motivations: [{ text: "his firm's shrinking payout" }],
      dimensionConfidence: { overview: "confirmed" },
    });
    const rec: Recommendation = { perspective: "We believe supported independence deserves consideration." };
    const r = composeRecordDraft(cr, rec, "Robert Halvorsen");

    expect(r.understand).toBe("Robert runs a planning-led ensemble in Greenwich.");
    expect(r.mattersMost).toContain("grow through acquisition");
    expect(r.mattersMost).toContain("shrinking payout");
    expect(r.perspective).toBe("We believe supported independence deserves consideration.");
    expect(r.understandFurther).toContain("we'd like to understand");
    // "Where we'd focus next" is the recruiter's judgment — never auto-padded.
    expect(r.focusNext).toBe("");
  });

  it("reads like correspondence — never Summary / Analysis / Findings", () => {
    const cr = twin({ overview: "A solo advisor considering independence.", goals: [{ text: "more autonomy" }] });
    const r = composeRecordDraft(cr, { perspective: "We think independence fits." }, "Dana Whitfield");
    const all = RECORD_MOVEMENTS.map(({ key }) => r[key] ?? "").join(" ");
    expect(all).not.toMatch(/\b(summary|analysis|findings)\b/i);
  });

  it("leaves movements empty (not padded) when there's no basis, and reports content honestly", () => {
    const empty = composeRecordDraft(twin(), null, "Robert Halvorsen");
    expect(empty.mattersMost).toBe("");
    expect(empty.perspective).toBe("");
    // An empty twin still has an honest "what we'd like to understand further".
    expect(empty.understandFurther).toContain("more fully");
    expect(recordHasContent(empty)).toBe(true); // understandFurther carries content

    const blank = { understand: "", mattersMost: "", perspective: "", understandFurther: "", focusNext: "" };
    expect(recordHasContent(blank)).toBe(false);
  });
});

describe("coolingStatus — CR-001 §1.4 cooling rule", () => {
  const editedAt = new Date(2026, 6, 20, 15, 0, 0); // Jul 20, 3:00pm local

  it("blocks same-day approval with calm 'tomorrow' language", () => {
    const laterSameDay = new Date(2026, 6, 20, 23, 59, 0);
    const s = coolingStatus(editedAt, laterSameDay);
    expect(s.available).toBe(false);
    expect(s.message).toBe("Available after cooling period — tomorrow.");
    expect(s.clearedAt).toEqual(new Date(2026, 6, 21));
  });

  it("clears at the next calendar day", () => {
    const nextDay = new Date(2026, 6, 21, 0, 1, 0);
    const s = coolingStatus(editedAt, nextDay);
    expect(s.available).toBe(true);
    expect(s.message).toBe("");
  });

  it("is a no-op when disabled or when nothing has been edited", () => {
    expect(coolingStatus(editedAt, editedAt, { enabled: false }).available).toBe(true);
    expect(coolingStatus(null, editedAt).available).toBe(true);
  });
});
