# Content Architecture

**Status:** DRAFT — Phase 2 (Architecture), first deliverable · for founder review · **Date:**
2026-07-25
**Reads from:** the **[Advisor Decision Ontology](./ADVISOR_DECISION_ONTOLOGY.md)** (the spine) and
the **[Decision Question Library](./DECISION_QUESTION_LIBRARY.md)** (the inventory). **Governed by** the
foundation, the Messaging Architecture, and the Commercial Principles.

**What this answers (founder framing):** *which advisor question, under which decision, deserves which
answer **format**?* Content Architecture decides **form**, not words. It is **not** copywriting, page/
nav/UI design, AEO keyword selection (that's AEO Strategy), or software.

---

## Five governing rules

1. **Organized by decision, not by topic.** Content is filed under the Ontology's decisions/families —
   never under "blog topics." *VYNE supports decisions rather than publishing content.*
2. **Format follows the question — never the reverse.** The question's **complexity** (Simple ·
   Moderate · Complex, from the Library) and its **delivery-ladder rung** (Education · Consulting ·
   Specialist) determine the format. VYNE does not pick a format it likes and back-fill a question.
3. **No orphan content.** Every asset declares the decision(s) it supports; an asset that maps to no
   Library question / Ontology decision does not ship (it is, by definition, company-centric).
4. **Advisor-voiced; VYNE-silent.** Content is written in the advisor's words and does **not** name
   VYNE (per the Library) — that is what keeps the system advisor-first.
5. **Honest by construction.** Never claim unbiased/neutral/conflict-free; **fee percentages/terms
   never appear** in any asset (commercial §10). Compensation language is limited to the approved §5
   disclosure sentences. Legal/tax content stays general and routes to specialists.

## The format palette (the answer types)

| Format | Complexity | Ladder rung | Role |
|---|---|---|---|
| **Direct answer** (concise explainer) | Simple | Education | the AEO-facing answer to a general question |
| **Explainer guide** (long-form) | Moderate | Education | the models, mechanics, ranges, "how it works" |
| **Research / data piece** | Moderate | Education | market evidence; authority; cited, dated |
| **Interactive framework / tool** | Moderate–Complex | Education → **Consulting bridge** | structured self-orientation; the hinge to consulting |
| **Assessment module** | Complex | **Consulting** | a PTA area; advisor-specific, confidential |
| **Consultation** | Complex | **Consulting** | the confidential engagement itself |
| **Report / the Record** | Complex | **Consulting output** | The VYNE Standard deliverable (3 layers) |
| **Specialist referral / coordination** | — | **Specialist** | legal · tax · hands-on implementation |

## Format-selection logic

For any question, in order:

1. **Find its decision** (Ontology family) and read its **complexity** + **conversation** tags
   (internal · external · interpretive) from the Library.
2. **Place it on the ladder.** Is this the *general* form (Education) or the *advisor-specific* form
   (Consulting)? Regulated/executional → Specialist.
3. **Pick the format** by the table above: Simple+Education → Direct answer; Moderate+Education →
   Explainer guide or Research; Moderate–Complex at the Education→Consulting seam → Interactive
   framework; Complex+Consulting → Assessment module → Consultation → Report.
4. **Never over-serve or under-serve.** A Simple question gets a short answer (not a white paper); a
   Complex, book-specific question is **never** answered with generic content — it routes to
   assessment/consultation.

## The content set per decision

Each decision carries a **content set** that climbs the ladder as far as demand warrants — not every
decision needs every rung:

```
  DECISION
    ├─ Education answer      (Direct answer)      ── public / AEO surface
    ├─ Education deep-dive   (Guide / Research / Framework) ── authority + the consulting bridge
    ├─ Consulting entry      (Assessment module)  ── advisor-specific, confidential
    └─ Consulting output     (Report / Record section) ── The VYNE Standard
```

**Worked examples (representative — not the full 38):**

| Decision (Ontology) | Education | Bridge | Consulting |
|---|---|---|---|
| **C6** Which affiliation model? | Direct answer: "the models, explained" + Research (movement data) | Framework: "which model fits how I want to work" | Assessment (Capability compat · Operating-model) → Report |
| **G21** How portable is my book? | Direct answer: what drives portability | Framework: portability self-orientation *(asset ≠ revenue)* | Assessment (Book Portability, Area 3) → Report |
| **E13** What is my business worth? | Guide: how practices are valued (methods/ranges) | Framework: value-driver checklist | Assessment (Enterprise Value, Area 6) → Report |
| **K30** What do my covenants allow? | Guide: Protocol / non-solicit, generally *(boundary: not legal advice)* | — | **Specialist referral** (counsel) + coordination |
| **★** Should I move, stay, or wait? | *(no education answer — inherently advisor-specific)* | — | Consultation → the integrated recommendation (Record) |

## The AEO seam (handoff to AEO Strategy)

The **Education rung** is where AEO lives: the *general* form of high-demand decisions gets
AEO-optimized **Direct answers** and **Guides** that answer honestly and route the *advisor-specific*
form to consultation. Content Architecture defines the **format** of those answers and which decisions
warrant them; **AEO Strategy** (next) decides discovery, phrasing, and prioritization. The seam is
clean: education answers a real question completely, then names the point where only confidential,
advisor-specific work can go further.

## What Content Architecture is NOT (scope guardrails)

- **Not copy.** No headlines, body text, or taglines here.
- **Not design.** No pages, navigation, layout, type, or color.
- **Not AEO keyword/discovery strategy** — that is the next document.
- **Not software.** No CMS, components, or data model (Phase 3).
- **Not new strategy.** It *reads from* the frozen Phase-1 docs; it does not reopen them.

## How this feeds the rest of Phase 2

Content Architecture sets the **format system**; the remaining Phase-2 architectures consume it —
**AEO** (discovery for the Education rung), **Assessment** (the Consulting-rung modules = PTA areas),
**Consultation** (the engagement), **AI** (which rung AI serves, and its limits), **CRM** (how decisions
and their content sets are tracked). All remain downstream of the Ontology, and all stay pre-software
until Phase 3.
