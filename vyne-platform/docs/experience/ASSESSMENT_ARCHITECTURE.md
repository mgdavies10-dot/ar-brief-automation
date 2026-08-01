# Assessment Architecture

**Status:** **APPROVED (founder, 2026-07-25)** — revisions applied; four founder decisions recorded.
Factual corrections only. · **Date:** 2026-07-25
**Phase:** 2 — Architecture · **System:** *Advisor Decision Experience* (with Consultation,
Recommendation & Report, Advisor-Journey handoffs)
**Reads from (frozen):** the **[Advisor Decision Ontology](./ADVISOR_DECISION_ONTOLOGY.md)** ·
**[Content Architecture](./CONTENT_ARCHITECTURE.md)** · the **Practice Transition Assessment**
(`../method/PRACTICE_TRANSITION_ASSESSMENT.md`) · **The VYNE Standard** · the **Advisor Journey** ·
**Commercial Principles** (`../commercial/BUSINESS_MODEL_AND_COMMERCIAL_PRINCIPLES.md`).

**The question this answers:**

> ## What exactly happens when an advisor crosses from public education into VYNE's confidential decision process?

This document defines the **confidential experience** — its boundary, its promises, its sequence, its
evidence discipline, and its outputs. It is **not** UI, software, forms, copy, or a data model.

**Why it comes before AEO:** the public conversion handoff cannot be designed properly until the
confidential experience it converts into is defined.

---

## The shape of the crossing

```
   PUBLIC / EDUCATION            │            CONFIDENTIAL / CONSULTING
                                 │
   Education content             │
   Advisor Orientation ──────────┼──▶ 1 The Crossing
                                 │    2 Engagement Entry
                                 │    3 ADVISOR WORKING AGREEMENT   ◀── trust is established here,
                                 │    4 Graduated Disclosure             BEFORE any analysis begins
                                 │    5 Assessment Modules (the 12 PTA areas)
                                 │    6 Evidence & Confidence
                                 │    7 Compensation-Blind Sequencing
                                 │    8 Calibrated Conclusions
                                 │    9 Outputs & Handoffs ──▶ Consultation ▸ Recommendation & Report
                                 │   10 Boundaries & Referrals
                                 │   11 Governance
```

## 1 · The crossing — what changes at the boundary

The moment an advisor crosses from reading to engaging, five things change and must be *felt*, not
merely stated:

| | Public / education | Confidential / consulting |
|---|---|---|
| **Confidentiality** | anonymous reader | named advisor under confidentiality; exploration must never reach their firm |
| **Specificity** | general form of a decision | *their* book, economics, team, objectives |
| **Information** | none collected beyond orientation | graduated, purposeful, minimum-necessary (§4) |
| **What VYNE owes** | an honest general answer | professional judgment to **The VYNE Standard**, with evidence, confidence, unknowns, and alternatives |
| **Conclusions** | none about this person | calibrated, advisor-specific — including *stay* and *wait* |

**The crossing is not a lead-capture event.** It is the start of a professional relationship, and the
architecture treats it that way.

## 2 · Engagement entry

**Input:** the **Advisor Orientation** (Content Architecture §12E) — objectives · business profile ·
primary concerns · preferred disclosure level · no client PII.

Entry establishes, before any analysis:

- **What the advisor is actually trying to decide** — mapped to Ontology decisions/families, not
  assumed to be "a move."
- **Which decisions are in scope** for this engagement (comprehensive framework, *tailored* engagement).
- **Fit and readiness** — whether VYNE can responsibly help now, or whether the honest answer is *wait*
  or *this needs a specialist*.
- **Disclosure comfort** — how much the advisor is willing to share at this stage (§4).

### Two gates (founder decision, 2026-07-25)

- **Orientation eligibility — broad.** Almost any legitimate advisor may enter: a financial professional
  facing a real business decision within VYNE's scope.
- **Assessment eligibility — selective.** A full assessment proceeds only where VYNE has enough **fit,
  readiness, information, and capacity** to produce useful work **to The VYNE Standard.** *At launch,
  the founder makes the final determination.*

**A full assessment may be declined or deferred when:** there is no real decision to evaluate · the
advisor is only collecting deal numbers · the advisor wants mass submissions · the advisor refuses the
minimum information needed · the request falls outside VYNE's scope · legal, compliance, or employment
risks require specialist review first · the advisor appears unlikely to act in good faith · VYNE lacks
the capacity or expertise to support the engagement responsibly.

**Entry outcomes:** proceed · proceed with limited scope · gather more information · refer to a
specialist · wait · decline. **"Not now" and "not us" are legitimate, recorded outcomes — not
failures.** This preserves accessibility without turning VYNE into a free research desk.

## 3 · The Advisor Working Agreement *(required, before assessment begins)*

**Not a legal contract — the consulting equivalent of an engagement letter.** It establishes the
relationship and expectations *before* any analysis, and it is the artifact that makes VYNE's
conflict-management credible rather than asserted.

The Working Agreement states:

- **What the advisor should expect** — the process, the sequence, the pace, what they will receive.
- **What VYNE will do** — understand the practice; evaluate legitimate alternatives; classify evidence;
  state confidence, unknowns, and alternatives; give the strongest conclusion the evidence supports.
- **What VYNE will not do** — practice law, tax, or accounting; issue formal valuations; act as CCO or
  file registrations; perform hands-on implementation; claim to represent the entire market; or
  describe itself as unbiased/neutral/conflict-free.
- **Confidentiality expectations** — how information is handled, who sees it, what is never shared, and
  the standing rule that **no client PII** is collected.
- **How recommendations are formed** — evidence classification, confidence levels, documented unknowns,
  alternatives considered, and the rationale that accompanies every conclusion.
- **That the advisor controls every introduction** — and **no firm is contacted without the advisor's
  explicit, firm-specific authorization** (the Advisor Submission Standard, commercial §7).
- **That VYNE may conclude any legitimate outcome** — stay · wait · renegotiate · move · launch · join ·
  merge · acquire · sell · succeed · retire/wind down — including outcomes that produce **no fee** for
  VYNE.
- **How VYNE is compensated** — the approved disclosure (commercial §5): compensated by the hiring firm
  upon a successful placement; advisors do not pay for traditional recruiting and transition-consulting
  services; arrangements may vary; **VYNE may not be compensated for every alternative**; the advisor
  controls every submission. *(No percentages, amounts, or firm-specific terms — ever.)*
- **That conclusions can strengthen or change** — **recommendations should evolve as evidence develops.
  A material change in direction must be supported by newly discovered or newly verified information,
  and documented clearly.** *(Refines the M4 principle "evolve, not flip," founder 2026-07-25: evolution
  is the norm, but new evidence can legitimately reverse a preliminary conclusion — what matters is that
  a reversal is evidence-driven and explained, never unexplained.)*
- **The limits of the assessment** — what it cannot determine, and at what disclosure level.
- **When specialists become necessary** — legal, tax, valuation, compliance, implementation (§10).

**Delivered and acknowledged before assessment begins.** It is a *trust* artifact, not a compliance
formality — and it is the first tangible proof of the difference between VYNE and a recruiter.

## 4 · Graduated disclosure

The advisor controls how much they share; VYNE never asks for more than the decision requires. Three
levels (carried forward from Book Portability / the Advisor Journey):

| Level | What the advisor shares | What VYNE can responsibly conclude |
|---|---|---|
| **L1 — High-level** | aggregate profile: AUM, production band, tenure, channel, team size, goals | orientation, issue-spotting, option framing; **Level 1 (decision-support)** conclusions only |
| **L2 — Structured** | segment/product/account structure, revenue composition, team structure, constraints | comparative analysis, portability and economics *ranges*; **Level 2 (conditional)** conclusions |
| **L3 — Detailed** | verified detail sufficient for advisor-specific analysis (**never client PII**) | full advisor-specific analysis; **Level 3 (full)** conclusions where evidence supports |

**Every engagement begins at L1** (founder decision, 2026-07-25) and advances only when the decision
requires it **and the advisor affirmatively chooses** to provide more. **Disclosure levels never advance
automatically merely because the process reached a later stage.**

**L1 must not feel superficial.** It is sized to: clarify objectives · identify the decisions in scope ·
scan the practice · surface material issues · determine whether deeper analysis would be useful. VYNE
then says plainly:

> *"Here is what we can conclude now, here is what remains uncertain, and here is what additional
> information would allow us to evaluate."*

The advisor decides whether to move to L2 or L3.

**Rules:** the conclusion level can never exceed what the disclosure level supports; VYNE states plainly
what a higher level would enable; a reluctance to share is a legitimate constraint, not an obstacle to
be pressured. **Minimum-necessary is a principle, not a default setting.**

## 5 · The assessment modules

**Comprehensive framework, tailored engagement** (decided 2026-07-25): **every** area is *scanned*;
depth is applied only where the advisor's decisions warrant. The modules are the **twelve PTA areas**,
each serving specific Ontology decisions:

| # | Module (PTA area) | Serves (Ontology) |
|---|---|---|
| 1 | Advisor objectives | **A** Personal & Professional Objectives |
| 2 | Current-practice profile | **A/D** baseline for everything |
| 3 | **Book portability** | **G** Clients & Book *(asset ≠ revenue portability)* |
| 4 | Capability compatibility | **B** Capability Requirements · **C** Affiliation |
| 5 | Transition economics | **F** Economics |
| 6 | Enterprise continuity & value | **D** Ownership · **E** Enterprise Value · **I/J** Growth, Succession |
| 7 | Client impact | **G** Clients & Book |
| 8 | Team impact | **H** Team |
| 9 | Operating-model impact | **C** Affiliation · **M** Transition Strategy |
| 10 | Risk | **K** Risk, Legal & Compliance |
| 11 | Due diligence / verification | **L** Negotiation & Due Diligence |
| 12 | Integrated conclusion | **★** The Strategic Outcome |

### Scan depth — the three-step model (founder decision, 2026-07-25)

The framework is **never** reduced below 12 areas — that risks missing a material issue simply because
the advisor did not raise it. But a *scan* is not a full analysis:

1. **Universal light scan** — all 12 areas receive a small number of structured questions or consultant
   observations.
2. **Materiality determination** — each area is classified **low · moderate · high · unknown · out of
   scope**.
3. **Selective depth** — only **material** areas receive deeper evidence gathering and analysis.

> **Operating rule:** **Every module is acknowledged. Only material modules are deeply assessed.**

This delivers completeness without making every engagement enormous. Depth is a documented choice, with
a reason; **unknown** is a legitimate classification that itself may justify depth.

## 6 · Evidence & confidence inside the assessment

Advisor-specific work carries the same evidence discipline as content (Content Architecture §6), applied
to the individual:

- **Every material input is classified:** verified fact · public firm claim · market observation ·
  assumption · VYNE interpretation · advisor-specific conclusion.
- **Firm claims are never promoted to fact** without verification (module 11).
- **Confidence is stated**, not implied — and tied to disclosure level and evidence quality.
- **Unknowns are documented and visible**, never quietly omitted.
- **Alternatives considered** are recorded, including those rejected and why.
- **Provenance** — where each material input came from, and when.
- **Contradictory evidence is preserved**, not smoothed away.

## 7 · Compensation-separated sequencing *(a binding method control)*

*Renamed from "compensation-blind" (founder, 2026-07-25): "blind" implies the consultant does not know
how VYNE is compensated — operationally unrealistic in a founder-led business, and difficult to prove.
The real, provable control is **analytical separation**.*

1. **Advisor objectives, current-practice characteristics, capability requirements, and material risks
   are documented before firm-specific options are ranked or recommended.**
2. **VYNE compensation is maintained separately from advisor-fit criteria** and does not enter any
   score, comparison, suitability assessment, or recommendation rationale.
3. **The consultant may know that compensation exists**, but must not use the amount or availability of
   compensation to improve an option's advisor-fit assessment.
4. **Compensating, potentially compensating, non-compensating, and compensation-unknown alternatives
   remain eligible for consideration** (open-market notation; non-compensating options are never
   auto-removed).
5. **Higher-conflict review** applies when a financially preferable outcome for VYNE differs from the
   substantively stronger outcome for the advisor — including: the recommended **option** pays materially
   more than a close alternative · a **non-compensating** alternative looks substantively stronger · the
   advisor is considering **staying** or **waiting** · the advisor is considering **launching an RIA** ·
   a fee agreement is established *after* analysis began · another financial relationship with a provider
   exists. *(Conforming amendment, founder 2026-08-01: "firm" → "option"; "non-paying" →
   "non-compensating" — aligning to the controlling Consultation Architecture §14 formulation. Wording
   consistency only; no change to conflict-control methodology.)*
6. **The record documents** the advisor-facing compensation disclosure and any conflict review
   performed.

> **Governing principle:** **Compensation may affect VYNE's commercial operations. It must never improve
> an option's advisor-fit recommendation.**

## 8 · Calibrated conclusions

VYNE gives **the strongest conclusion the evidence supports — no stronger, and no weaker**:

- **Level 1 — decision-support:** frames the decision, identifies what matters, no directional
  conclusion.
- **Level 2 — conditional:** a directional conclusion contingent on stated conditions being confirmed.
- **Level 3 — full:** an advisor-specific recommendation with rationale, drawbacks, unknowns, and
  alternatives.

Every conclusion documents: **why it fits · material drawbacks · assumptions · unknowns · alternatives
considered · what could change it.** **No "best firm" language.** **Recommendations should evolve as
evidence develops; a material change in direction must be supported by newly discovered or newly
verified information and documented clearly.** The **advisor always decides**.

## 9 · Outputs & handoffs

The assessment produces:

- **The advisor-specific record** — inputs, classifications, confidence, unknowns, alternatives,
  provenance.
- **The calibrated conclusion** (§8) at its supported level.
- **The open-market notation** and compensation disclosure record (§7).
- **Named next steps** — including *wait*, *gather more*, or *specialist referral*.

**Handoffs:** → **Consultation Architecture** (how the conclusion is discussed, challenged, and
revised with the advisor) → **Recommendation & Report Architecture** (how it becomes the three-layer
deliverable to The VYNE Standard: executive narrative · decision comparison · supporting record) →
**Advisor-Journey handoffs** (implementation, or a return to exploration). **AI and CRM requirements are
derived from these outputs later — they do not shape the assessment.**

## 10 · Boundaries & referrals

Same lines as content (Content Architecture §7), enforced inside the engagement: **legal** (covenants,
solicitation, registration) · **tax** · **regulatory/compliance** (ADV, CCO) · **formal valuation** ·
**M&A papering** · **hands-on implementation** (repapering, ACATS, systems).

> **VYNE identifies decision dependencies and may facilitate appropriate specialist involvement;
> specialists remain responsible for their professional advice and execution.**

*(Revised from "VYNE evaluates and coordinates; specialists execute" — founder 2026-07-25: "coordinates"
overstates the role and could imply responsibility for managing counsel, tax professionals, valuation
experts, or implementation providers. VYNE does not carry that responsibility unless such a service is
formally defined.)* Boundary-crossings are named to the advisor at the moment they arise, per the
Working Agreement (§3).

## 11 · Governance

- **Authorship and accountability** — every assessment records prepared by / reviewed by / approved by,
  with dates (as the Record already does).
- **Approval lifecycle** — Draft → In review → Approved, with the **cooling rule** (no same-day
  approval; overrides require a logged reason) and **founder-only approval** at this stage.
- **Higher-conflict review** (§7.4) is a hard gate, not advisory.
- **What is recorded** — inputs and their classification, disclosure level, conclusion level and
  rationale, alternatives, unknowns, open-market notation, disclosure record, and the Working Agreement
  acknowledgment.
- **Confidentiality** — no client PII; advisor identity never shared without firm-specific
  authorization; fee terms never disclosed (commercial §10).

---

## Founder decisions — resolved (2026-07-25)

1. **Working Agreement form:** a **written artifact** delivered and acknowledged **before substantive
   assessment begins** — short, polished, plain-English (eventually ~2–3 pages), **not** a long legal
   document. The advisor acknowledges: the nature and limits of VYNE's work · confidentiality
   expectations · **no client PII** · advisor-controlled introductions · possible outcomes including
   **stay** or **wait** · compensation disclosure · specialist boundaries · graduated disclosure · that
   conclusions depend on the information provided. **The final production version requires outside
   counsel review** (it addresses confidentiality, compensation, professional boundaries, and
   authorization) even though it is *not* the commercial contract.
   *Naming (later, not blocking): "**Advisor Engagement Understanding**" may replace "Working Agreement"
   for advisor-facing use — more professional, less suggestive of an employment or legal agreement.
   "Working Agreement" remains fine internally.*
2. **Entry threshold:** **broad access to Advisor Orientation; selective access to full assessment**
   (§2).
3. **Disclosure default:** **begin at L1**; advance to L2/L3 only when the decision requires it **and**
   the advisor affirmatively chooses to provide more (§4).
4. **Scan depth:** **light scan across all 12 PTA areas; only material areas are deepened** (§5).
5. **Compensation-separated sequencing** replaces "compensation-blind" (§7).

*Not started: Consultation Architecture, Recommendation & Report Architecture, AEO Architecture, web
copy, page design, code, public interactive tools.*
