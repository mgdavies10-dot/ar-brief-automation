```
INTERNAL — BACKLOG DECISION RECORD
NOT A SPECIFICATION · NO FORMULA OR DEFAULT IS APPROVED
```

# Public Scenario Calculators — Backlog Decision Record

**Status:** BACKLOG — Phase 3 website product · **Opened:** 2026-07-25
**Not part of the Operating Artifact Sprint.** This record exists so the initiative is captured without
interrupting or altering the current sprint.

> **Nothing in this document is a specification.** No formula, default, percentage, multiple, tax rule,
> or disclaimer here is approved. No design, copy, or code may be drafted from it in its current state.

---

## 1 · Business purpose

Public numerical scenario tools are the clearest "interpretive value" surface a transition consultancy
can put in front of an advisor. A competitor (Bridgemark Strategies) has published four, which tells us
something about where the category is going. VYNE wants tools that produce **genuinely useful numbers**
— not weakened tools that produce nothing an advisor can use.

The founder's framing, and the reason this is buildable at all: **calculation is not recommendation.**

| | |
|---|---|
| **Calculation** | *"Based on these assumptions, the modeled result is $X–$Y."* |
| **Recommendation** | *"Therefore you should move, go independent, sell, or select this firm."* |

## 2 · Approved narrow exception (founder, 2026-07-25)

> **VYNE may provide public scenario calculators that generate transparent numerical estimates or ranges
> from user-selected assumptions. These tools may explain formulas, mechanics, sensitivities, and
> information gaps. They may not issue a strategic recommendation, formal valuation, firm ranking,
> portability conclusion, best-fit conclusion, or other advisor-specific consulting conclusion.**

**This is a narrow product exception, not a broad amendment.** VYNE's doctrine is **not** amended to
permit automated advisor recommendations. Content Architecture's launch prohibition on "calculators
promising personal numbers" stands for launch; this exception governs a **future Phase-3 product** and
does not reopen the frozen document.

**Why the exception holds against frozen doctrine:** the prohibitions in Content Architecture §3 and
Recommendation & Report §8 target *advisor-specific conclusions* and *bare scores presented as
findings*. A tool that shows the arithmetic of the advisor's own assumptions, with every input visible
and editable, produces a **model output**, not a VYNE conclusion. The boundary is enforced by §4 below.

## 3 · The four planned tools

*Concepts only. Names are working names.*

**1 · Independent Advisor Economics Explorer**
Outputs: gross revenue · platform/broker-dealer deductions · operating expenses · owner compensation ·
estimated pre-tax operating income · estimated total owner economic benefit.
*Every assumption advisor-editable. No single "industry average" hidden inside the calculation.*

**2 · Employee Advisor Economics Explorer**
Outputs: grid compensation · cash compensation · deferred compensation · advisor-paid expenses ·
employer benefits (entered separately) · estimated current cash · estimated total compensation ·
potential forfeiture exposure.
*Deferred compensation is never treated as equivalent to current cash.*

**3 · Practice Value Scenario Explorer**
At least two approaches: **normalized EBITDA × selected multiple** and **recurring revenue × selected
multiple**. Shows a **range**, the normalization adjustments made, the assumptions driving the range,
and why the result is **not a formal valuation**. The multiple is user-editable; any suggested default
range must be sourced, dated, and reviewed.

**4 · Sunset Program Scenario Explorer**
Advisor-entered: eligible production · program percentage · retention assumption · payout period ·
growth or decline · eligibility adjustments · forfeiture or performance conditions.
*No generic "wirehouse sunset percentage" is published.* Firm-specific presets, if ever used, require an
authoritative source, effective date, and refresh governance.

## 4 · Governance constraints

**Boundary**
- Tools may explain formulas, mechanics, sensitivities, and information gaps.
- Tools **may not** issue a strategic recommendation · formal valuation · firm ranking · portability
  conclusion · best-fit conclusion · or any advisor-specific consulting conclusion.
- Every tool carries a **"What this calculation cannot tell you"** element and a consultation handoff.

**Assumptions**
- **User-entered assumptions remain visible and editable.**
- **Hidden industry assumptions are prohibited.**
- **If a defensible default cannot be sourced, leave the field blank or require user entry.**

**Language**
- Numerical outputs are described as **modeled estimates or ranges**.
- **Do not use "take-home pay" unless taxes are actually modeled.** Preferred: *estimated pre-tax owner
  economics · estimated pre-tax cash compensation · modeled annual economic benefit.*
- Practice-value outputs are **ranges** and are never described as formal, certified, or defensible
  valuations.

**IP and independence**
- **Do not copy Bridgemark's** exact layout, field wording, help text, assumptions presentation, charts,
  disclaimers, code, or overall visual expression.
- **Build independently from the underlying mathematics and VYNE's methodology.**
- **Do not claim that any VYNE formula matches Bridgemark's formulas.** Copyright does not protect facts,
  formulas, systems, or methods of operation; it can protect original wording, graphics, code, and other
  expression.

**Standing VYNE constraints that apply unchanged:** no fee percentages, amounts, step-ups, payment
timing, clawbacks, or firm-specific commercial terms anywhere in a public tool · no client PII
collection · no neutrality, independence, conflict-free, or best-firm claims · approved compensation
disclosure only.

## 5 · Status of the formulas discussed so far

> **The mechanics described in conversation on 2026-07-25 are preliminary industry mechanics. They are
> not a verified functional specification, and they are not proof of Bridgemark's exact mechanics.**

What was and was not established:

| | |
|---|---|
| **Established** | the four tools' names, stated purposes, broad inputs and outputs, and public framing ("industry-typical assumptions," "directional estimates," "only a starting point and does not reflect a final valuation") — from Bridgemark's own public pages |
| **Not established** | embedded formulas · default values · slider ranges · calculation logic · rounding · tax treatment · disclaimer wording. The individual calculator pages do not expose these in fetchable HTML. |

**No multiples, payout percentages, or sunset program percentages were supplied**, deliberately — those
are market data that moves, varies by channel, and (for sunset programs) is contractual to each firm.

## 6 · Research required before any specification

**Per calculator, per field, every one of these must be documented:**

input name · definition · required or optional · default · allowed range · **source** · **effective
date** · formula · calculation order · tax treatment · rounding · output · sensitivity · override rule ·
validation rule · edge cases · disclaimer · **professional reviewer** · **refresh cadence**.

**Specifically flagged for verification — nothing on this list may be used until independently sourced:**

- every claimed Bridgemark default · every payout percentage · every valuation multiple · every sunset
  payment curve;
- all tax brackets, deductions, wage bases, retirement limits, QBI rules, FICA rules, and filing-status
  assumptions **for the applicable year**;
- treatment of deferred compensation;
- tax treatment of owner health insurance and retirement contributions;
- employer-benefit add-backs;
- self-employment tax · state income tax · capital-gains and ordinary-income allocation · NIIT;
- present-value assumptions;
- replacement compensation and valuation normalization;
- retention and attrition assumptions.

## 7 · Known formula risks

- **`Enterprise Value × (1 − capital-gains rate)` is too simplistic** for after-tax sale proceeds.
- **W-2 taxable wages, self-employment tax, QBI, benefits, deferred compensation, and owner add-backs**
  need substantially more precise treatment than a single-line formula.
- **Sunset-program economics vary by firm and contract** and cannot be generalized.
- **"Net equivalent compensation" becomes misleading** if expenses and benefits are subtracted and added
  back inconsistently between the employee and independent models — the comparison is the whole point of
  tools 1 and 2, and an inconsistency there invalidates it.
- **Normalization is the step most often got wrong** in practice valuation: owner compensation must be
  replaced with the market cost of hiring someone to do the owner's client-facing work, or EBITDA is
  overstated.

> **A formula can be mathematically correct while its assumptions, tax treatment, defaults, and
> interpretation are still wrong for a particular advisor.** That gap is the reason for the boundary in
> §2 and for the professional-review gates in §9.

## 8 · Tax-engine maintenance risk

A centralized tax engine would create a **significant annual maintenance and professional-review
obligation** — brackets, limits, wage bases, and rules change yearly, and a stale tax engine producing
confident numbers is worse than no tax engine. **Deferred to Phase D**, and only after an explicit
decision that the ongoing burden is justified.

## 9 · Professional-review gates

Required before publication:

| Gate | Covers |
|---|---|
| **Counsel** | disclaimers · valuation positioning · data collection · IP and trade-dress boundaries |
| **CPA / tax** | any tax logic, at all — and annual re-review if a tax engine is ever built |
| **Valuation specialist** | normalization methodology · multiple ranges · range presentation |
| **Testing** | edge cases · validation rules · calculation-order correctness |

## 10 · Phased product approach

| Phase | Content |
|---|---|
| **A** | pre-tax economics · editable assumptions · visible formulas · scenario comparisons · **no hidden tax or valuation assumptions** |
| **B** | practice-value ranges · normalization · sensitivity analysis · valuation-professional review |
| **C** | sunset scenarios using **advisor-entered** program terms; firm-specific presets only when authoritatively sourced and governed |
| **D** | optional tax engine — **only** after CPA review, source validation, annual update procedures, testing, and a decision that the maintenance burden is justified |

## 11 · Design direction

**Permitted interaction qualities** *(the experience the founder liked)*: polished sliders · direct-entry
fields · live calculation · clear steps · sticky results · scenario cards · waterfall explanations ·
printable results · visible assumptions · consultation handoff.

**Required to be unmistakably VYNE**: VYNE's visual hierarchy · different field organization · original
wording · different charts and result presentation · a transparent **assumption drawer** · a **"What
moves this result?"** sensitivity section · a **"What this calculation cannot tell you"** section.

*The last two are the differentiators. A calculator that states its own limits honestly is doing
something Bridgemark's tools cannot say about themselves — and it is the version consistent with VYNE's
method rather than merely a recoloured copy.*

## 12 · Timing

**Phase 3 (Platform).** The public website is excluded scope under EA-001, and VYNE is pre-software
through Phase 2. This initiative does not begin until Phase 3 and does not affect the Operating Artifact
Sprint.

---

## Appendix A — Second external analysis *(research input, not received)*

**Status: NOT RECEIVED.** The founder's 2026-07-25 direction referenced a second analysis to be
appended as research input, but the message contained only the placeholder
`[PASTE THE OTHER CHATGPT RESPONSE HERE]` — the content itself did not come through.

**Accordingly, §6's verification list and §7's formula risks were built from the founder's summary of
that analysis, not from the analysis itself.** The specific claims it reportedly contains — Bridgemark
default percentages, payment curves, tax limits, and proposed formulas — **are not recorded here,
because they were not received and must not be reconstructed from memory or inference.**

*When the analysis is supplied, it is filed here under the same standing rule: **research input only —
not a verified formula specification, not proof of Bridgemark's mechanics, not approved tax logic, not
approved valuation methodology, not approved legal language, and not permission to begin design or
development.***

## Appendix B — What is explicitly NOT approved

No formula · no default · no percentage · no multiple · no tax rule · no payout curve · no disclaimer
wording · no design · no copy · no code · no UI · no data collection · no publication date.
