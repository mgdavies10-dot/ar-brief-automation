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
  it("seeds each movement in a letter's voice — second person, addressed to the advisor", () => {
    const cr = twin({
      overview: "A planning-led practice in Greenwich.",
      practiceProfile: { serviceModel: "planning-led", yearsInBusiness: 22, custodianOrPlatform: "a national wirehouse", clientAcquisition: "referrals" },
      goals: [{ text: "Own the direction of the practice" }],
      motivations: [{ text: "a payout grid that keeps shifting" }],
      dimensionConfidence: { overview: "confirmed", practiceProfile: "confirmed", goals: "confirmed", motivations: "confirmed" },
    });
    const rec: Recommendation = { perspective: "We believe supported independence deserves consideration." };
    const r = composeRecordDraft(cr, rec, "Robert Halvorsen");

    // Speaks TO the advisor (you/your), never ABOUT them (no third-person name).
    expect(r.understand).toContain("You've built");
    expect(r.understand).not.toMatch(/\bRobert\b/);
    expect(r.mattersMost).toContain("For you, the priorities are clear: own the direction");
    expect(r.mattersMost).not.toMatch(/\bRobert\b/);
    expect(r.perspective).toBe("We believe supported independence deserves consideration.");
    // "Where we'd focus next" is the consultant's judgment — never auto-padded.
    expect(r.focusNext).toBe("");
  });

  it("stays honest — offers to confirm what we're only assuming, not just what's missing", () => {
    const cr = twin({
      overview: "x",
      constraints: [{ text: "a non-solicit he hasn't fully reviewed", kind: "non_solicit" }],
      dimensionConfidence: { overview: "confirmed", constraints: "assumed" },
    });
    const r = composeRecordDraft(cr, null, "Robert Halvorsen");
    // The assumed constraint should be offered up as something to confirm.
    expect(r.understandFurther).toContain("confirm");
    expect(r.understandFurther).toContain("constraints");
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
