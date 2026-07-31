```
INTERNAL — BACKLOG DECISION RECORD
NOT A SPECIFICATION · NO FORMULA OR DEFAULT IS APPROVED
```

# Public Scenario Calculators — Backlog Decision Record

**Status:** BACKLOG — Phase 3 website product · **Opened:** 2026-07-25 · **Updated:** 2026-07-25
*(second external analysis received and classified — Appendix A)*
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

## Appendix A — Second external analysis *(unverified research input)*

**Received 2026-07-25.** Filed under the standing rule: **research input only — not a verified formula
specification, not proof of Bridgemark's mechanics, not approved tax logic, not approved valuation
methodology, not approved legal language, and not permission to begin design or development.**

*The analysis carried inline citation markers to sources the Lead Engineer cannot open or follow. **No
citation in it constitutes verification for VYNE's purposes.** Every factual claim below is treated as
unverified regardless of whether the analysis attributed a source to it.*

### A.1 · Classification of substantive claims

| # | Claim / proposal | Class |
|---|---|---|
| 1 | Four VYNE calculators paralleling Bridgemark's four | **1** product idea |
| 2 | Quick Estimate vs. Detailed Analysis vs. Compare-to-Current modes | **1** product idea |
| 3 | Deferred Compensation Risk panel (vesting, annual vest, forfeiture by year, PV, excluded from current cash) | **1** product idea |
| 4 | Three-tier practice value output (Conservative / Base / Strategic-Buyer) | **1** product idea |
| 5 | Sunset vs. Transition vs. Sale three-way comparison as "signature differentiator" | **1** product idea — **but see A.4(a), governance conflict** |
| 6 | No email gate; result first, then consultation offer | **1** product idea — consistent with VYNE doctrine |
| 7 | Independent-advisor formula chain (gross revenue → grid retention → implied AUM → program fee → net payout → after-tax → net equivalent) | **2** preliminary formula |
| 8 | W-2 formula chain (leakage → payable production → cash/deferred split → taxable wages → true after-tax → net equivalent) | **2** preliminary formula |
| 9 | Practice-value chain (revenue → opex → owner replacement comp → normalized EBITDA → adjusted multiple → EV) | **2** preliminary formula |
| 10 | Sunset chain (award % → gross award → annual weights → after-tax → PV) | **2** preliminary formula |
| 11 | `Simplified After-Tax Value = EV × (1 − capital-gains rate)` | **2** preliminary formula — **already flagged as a known risk, §7** |
| 12 | Bridgemark defaults: platform expense 10% of revenue · employee expense 13% · other expense 4% · advisor replacement comp 25% | **3** claimed Bridgemark behavior |
| 13 | Bridgemark sunset curve: Y1 32% / Y2 24% / Y3 20% / Y4 16% / Y5 8% of a 250%-of-T12 award | **3** claimed Bridgemark behavior |
| 14 | Bridgemark auto-suggests BD payout, advisory program fee, staffing, rent, technology, marketing, professional services | **3** claimed Bridgemark behavior |
| 15 | Bridgemark itself describes its expense percentages, multiples, and growth adjustments as **illustrative placeholders**, not dataset-supported | **3** claimed Bridgemark behavior — **materially useful if true, see A.3(f)** |
| 16 | Bridgemark's W-2 disclosures describe grid rates, deferral ratios, and leakage as generalized illustrations, not a specific firm's plan | **3** claimed Bridgemark behavior |
| 17 | 2026 Social Security wage base $184,500 | **4** tax claim |
| 18 | 2026 standard deductions $16,100 / $32,200 / $24,150 | **4** tax claim |
| 19 | 2026 defined-contribution limit $72,000 pre-catch-up, subject to compensation limitation | **4** tax claim |
| 20 | SE-tax mechanics: 92.35% base · 12.4% SS to wage base · 2.9% Medicare · 0.9% additional above threshold | **4** tax claim |
| 21 | Financial advisory generally an SSTB; QBI phased out on taxable income; 2026 phaseout ranges to live in an annual file | **4** tax/regulatory claim |
| 22 | Progressive federal calculation rather than flat marginal multiplication | **4** tax claim — *methodologically sound in principle; thresholds still require verification* |
| 23 | Sunset default treatment as W-2 ordinary income, with capital-gains only as a labelled scenario | **4** tax claim + **5** — *the caution is well-placed; the characterization is agreement-specific* |
| 24 | Practice-value advanced inputs (concentration, client age, advisor dependence, growth, retention, successor bench, seller financing, earnout, transaction expenses, state tax, NIIT, ordinary-income allocation, equity rollover) | **5** valuation assumption |
| 25 | Non-recurring revenue receives little or no valuation credit by default | **5** valuation assumption |
| 26 | `Adjusted Multiple = Base + Organic Growth Adjustment + Other Approved Adjustments` | **5** valuation assumption |
| 27 | Visual direction (ivory ground, navy panels, gold accents, serif headings, numbered stages, sliders with direct entry, Auto/Manual Override, sticky results, formula drawer, waterfall, scenario cards, printable PDF, mobile-first) | **6** design idea |
| 28 | Clean-room implementation; don't copy code, copy, graphics, or pixel layout; trade-dress caution | **6/7** — consistent with §4 |
| 29 | Visible calculation version and tax year · centralized assumptions file · editable auto-suggestions · formula drawer · boundary tests · reconciliation checks · zero/negative/large-practice tests · CPA, valuation, and attorney review · annual tax update · no client-level data | **7** governance and testing |
| 30 | First deliverable is a locked Formula Specification before any visual coding | **7** governance — **agrees with this record's position** |

### A.2 · Useful ideas worth preserving

- **The Deferred Compensation Risk panel (3).** The strongest single idea in the analysis. Forfeiture-by-year and present value make visible the thing that most often decides a move, and it directly serves VYNE's method rather than merely computing.
- **Deferred compensation excluded from current cash and from net-equivalent (8).** Correct discipline, and it matches the existing record's own instruction.
- **Three-tier value output (4)** rather than a single number — consistent with §4's ranges-not-valuations rule.
- **No email gate (6).** Result first, consultation offered after. Consistent with advisor-first doctrine and better than the category norm.
- **Non-recurring revenue receiving little valuation credit by default (25)** — a real methodological point, subject to professional review.
- **Locked Formula Specification before visual coding (30)** — this is already this record's position and the agreement is worth noting.
- **Progressive federal calculation rather than flat marginal (22)** — if a tax engine is ever built, this is the right method.
- **The testing list (29)** — boundary tests, reconciliation checks, zero/negative/outsized-practice cases. Adopt substantially as written when specification begins.

### A.3 · Claims requiring verification — **highest risk first**

**(a) The Bridgemark sunset curve and award percentage (13).** Specific, quotable, and the most consequential single set of numbers in the analysis. **The arithmetic is internally consistent** — the weights sum to 100%, and 32/24/20/16/8% of a 250%-of-T12 award does yield 80/60/50/40/20% of T12; a $4M T12 book does yield $10M nominal. **Internal consistency is not verification.** Whether this is Bridgemark's curve, and whether any firm's actual program works this way, is unestablished. **Sunset terms are firm-specific and contractual.** Publishing this curve as a default would be the highest-risk act available in this initiative.

**(b) The Bridgemark expense and replacement-compensation defaults (12).** 10% / 13% / 4% / 25% are precise enough to look sourced. The Lead Engineer's own retrieval could not extract calculator mechanics from those pages. **These must not be adopted as VYNE defaults under any circumstance** — they would be a competitor's unsourced placeholders imported as VYNE's methodology.

**(c) Every 2026 tax figure (17, 18, 19, 20, 21).** Wage base, standard deductions, DC limit, SE-tax thresholds, QBI phaseout ranges. **These require IRS-authoritative sourcing with effective dates.** The Lead Engineer has not verified any of them and will not confirm them from memory — annual figures are exactly the category where recalled values are unreliable.

**(d) SSTB characterization (21).** Directionally consistent with how advisory practices are generally treated, but the specifics — and their application to a particular advisor's entity and income — are professional tax questions, not calculator inputs.

**(e) Sunset tax characterization (23).** The analysis's own caution is correct: treatment depends on the specific agreement and structure. **Any capital-gains scenario must be explicitly labelled and must never be the default.**

**(f) Bridgemark's self-characterization of its defaults as illustrative placeholders (15, 16).** **If accurate, this is materially useful** — it means the category leader does not claim its defaults are dataset-supported, which both lowers the competitive bar and raises the value of VYNE sourcing its own. **Worth verifying directly, because it would shape positioning.**

### A.4 · Contradictions with this record

**(a) The "signature differentiator" framing (5) conflicts with the approved exception.** The analysis proposes VYNE help the advisor answer: *"Which option creates the greatest current income, long-term value, flexibility and probability of achieving my goals?"*

> **That question is a best-fit, advisor-specific strategic conclusion — precisely what §2 prohibits a
> public tool from issuing.**

**The reconcilable version:** a public tool may **display scenarios side by side** with each one's modeled economics, assumptions, and limits. It may **not** identify which is best, rank them, or state which is likeliest to achieve the advisor's goals. **Comparison is calculation. "Which is best for me" is recommendation.** The three-way scenario display survives; the framing does not.

**(b) The tax engine is proposed as core; this record defers it to Phase D.** The analysis puts full federal, state, SE, and QBI computation inside calculators 1, 2, and 4 from the outset, with a centralized `tax-year-2026.json`. **This record's Phase A is explicitly pre-tax economics with no hidden tax assumptions.** The sequencing conflict is genuine and is **resolved in favour of this record** — the phased approach stands (§10). A tax engine is a Phase D decision after CPA review and an explicit judgment that the annual maintenance burden is justified.

**(c) Auto-populated defaults vs. the sourcing rule.** "Quick Estimate: VYNE assumptions populate automatically" (2) is reconcilable with §4 **only if** every default is independently sourced, dated, and visible. It is **not** reconcilable if the defaults are the ones at (12). **Where no defensible default can be sourced, the field stays blank or requires entry** — that rule is unchanged.

**(d) `EV × (1 − capital-gains rate)` (11)** is already flagged in §7 as too simplistic. The analysis labels it "Simplified," which is better than presenting it plainly, **but the objection stands** and it should not appear in a public tool without a materially fuller treatment or its removal.

### A.5 · Additional formula risks *(new — supplements §7)*

- **Leakage additivity (8).** `Total Leakage = small-account + discounting + chargebacks + institutional` treated as a simple sum assumes the four are **additive and non-overlapping**. If they apply sequentially or overlap, the compounded result differs — and the error grows with the size of each component. **Calculation order must be specified, not assumed.**
- **Implied-AUM circularity (7).** Deriving advisory AUM from fee-based revenue, then charging a program fee against that derived AUM, **double-counts if fee-based revenue is already net of program fees.** The definition of the revenue input decides whether the chain is valid.
- **Discount-rate dependence (3, 10).** Both the deferred-compensation PV and the sunset PV are **driven materially by an assumed discount rate.** An unexposed or non-editable discount rate would be the clearest possible instance of a hidden assumption determining the headline number.
- **Net-equivalent symmetry (7, 8).** The existing §7 risk is now concrete: the analysis adds back retirement, health, vehicle, and business-development expenses in **both** calculators. **If the add-back sets are not identical in definition and treatment across the two tools, the independent-vs-employee comparison is invalid** — and that comparison is the entire purpose of tools 1 and 2.

### A.6 · Matters deliberately deferred

Tax engine → **Phase D**. Firm-specific sunset presets → **Phase C**, and only with authoritative sourcing, effective dates, and refresh governance. Practice-value advanced inputs (24) and multiple adjustments (26) → **Phase B**, subject to valuation-professional review. Visual direction (27) → not started; recorded only. Any "which option is best" framing → **not permitted** under the approved exception (A.4(a)).

## Appendix B — What is explicitly NOT approved

No formula · no default · no percentage · no multiple · no tax rule · no payout curve · no disclaimer
wording · no design · no copy · no code · no UI · no data collection · no publication date.
