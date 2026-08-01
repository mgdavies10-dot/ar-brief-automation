```
INTERNAL — SIMULATION SETUP
NOT AUTHORIZED — CASE 1 DOES NOT BEGIN UNTIL THE FOUNDER APPROVES THE PACKETS AND BASELINE
```

# Simulation Setup — baseline, framework, roles, schedule

**Date:** 2026-08-01 · **Status:** PROPOSAL for founder approval · **Nothing run.**
**Companion to:** `SIMULATION_PHASE_CHARTER.md` (rev 3) · `SIMULATION_CASE_PACKETS.md`

---

## 1 · Baseline artifact and version register

**All five cases run against this frozen baseline.** Artifacts are **not revised between cases** unless a
**Critical Stop Finding** occurs (§3).

| # | Artifact | File | Version | Status |
|---|---|---|---|---|
| — | Engagement Record Standards | `ENGAGEMENT_RECORD_STANDARDS.md` | v0.1 | controlled draft |
| 1A | Advisor Orientation | `ADVISOR_ORIENTATION.md` | **v0.2** | approved draft |
| 1B | Orientation Review & Entry Decision | `ORIENTATION_REVIEW_AND_ENTRY_DECISION.md` | v0.1 | approved draft |
| 3 | Advisor Engagement Understanding | `ADVISOR_ENGAGEMENT_UNDERSTANDING.md` | **v0.2** | **counsel-review draft — run as drafted** |
| 4A | L1 Assessment Guide | `L1_ASSESSMENT_GUIDE.md` | **v0.2** | controlled draft |
| 4B | L1 Materiality Worksheet | `L1_MATERIALITY_WORKSHEET.md` | **v0.2** | controlled draft |
| 4C | L1 Assessment Handoff | `L1_ASSESSMENT_HANDOFF.md` | **v0.3** | controlled draft |
| 5A | Consultation Brief (full + short) | `CONSULTATION_BRIEF.md` | **v0.2** | controlled draft |
| 5B | Consultation Issue Sheet | `CONSULTATION_ISSUE_SHEET.md` | **v0.2** | controlled draft |
| 5C | Prep Checklist / Pre-read / Boundary | `CONSULTATION_PREP_CHECKLIST.md` | **v0.2** | controlled draft |
| 5D | Pilot Time Log | `PILOT_TIME_LOG.md` | v0.1 | controlled draft |
| 6A | Advisor Consultation Summary | `ADVISOR_CONSULTATION_SUMMARY.md` | **v0.2** | controlled draft |
| 6B | Internal Consultation Record | `INTERNAL_CONSULTATION_RECORD.md` | **v0.2** | controlled draft |
| 7A | Recommendation & Decision Record | `RECOMMENDATION_AND_DECISION_RECORD.md` | **v0.2** | controlled draft |
| 7B | Internal Record Assembly & Issuance | `INTERNAL_RECORD_ASSEMBLY.md` | **v0.2** | controlled draft |
| 8A | Firm/Model Comparison Appendix | `FIRM_MODEL_COMPARISON_APPENDIX.md` | **v0.2** | controlled draft |
| 8B | Internal Comparison Source & Normalization | `INTERNAL_COMPARISON_SOURCE_RECORD.md` | **v0.2** | controlled draft |
| 9A | Higher-Conflict Decision Gate | `HIGHER_CONFLICT_DECISION_GATE.md` | **v0.2** | controlled draft |
| 10A | Firm-Specific Authorization | `FIRM_SPECIFIC_AUTHORIZATION.md` | **v0.2** | **counsel-review draft — run as drafted** |
| 10B | Internal Authorization & Disclosure Activity | `INTERNAL_AUTHORIZATION_RECORD.md` | **v0.2** | controlled draft |

**Governing doctrine referenced but not exercised as artifacts:** Constitution · Advisor Decision Ontology
· Content / Assessment / Consultation / Recommendation & Report Architectures · Practice Transition
Assessment · The VYNE Standard · Commercial Principles.

> **Baseline locked at the start of Case 1. Any change requires a Critical Stop Finding and founder
> approval, and restarts comparability from that point forward.**

## 2 · Founder checkpoint packet — template

*The same short form at every checkpoint. **Never the engagement file.***

```
═══════════════════════════════════════════════════════════════════════════
 SIM-__  ·  CHECKPOINT __ of 5  ·  ______________________  ·  date ________

 1 · WHAT CHANGED SINCE THE LAST CHECKPOINT
     ___________________________________________________________________

 2 · DECISIONS REQUIRED FROM YOU
     a) ________________________________________________________________
     b) ________________________________________________________________

 3 · KEY FACTS RELIED ON              (with source and currency)
     ___________________________________________________________________

 4 · UNKNOWNS THAT MATTER              (and what would resolve each)
     ___________________________________________________________________

 5 · FIRM INTELLIGENCE STATUS
     needed ____  held ____  stale ____  unverified ____  unknown ____

 6 · PROPOSED NEXT STEP
     ___________________________________________________________________

 7 · SUPPORTING ARTIFACTS              (references — not reproduced here)
     ___________________________________________________________________

 ── FOUNDER INTERVENTION LOG ──────────────────────────────────────────
 Claude proposed: __________________________________________________
 Founder decision: _________________________________________________
 Founder edits: ____________________________________________________
 Rationale: ________________________________________________________
 Category: ☐ case judgment ☐ missing firm intel ☐ advisor experience
           ☐ artifact defect ☐ control failure ☐ other
 Downstream effect: ________________________________________________
 Artifact revision may be needed after simulations? ☐ yes ☐ no
 ═════════════════════════════════════════════════════════════════════
 ☐ FOUNDER APPROVAL RECORDED — simulation may proceed past this point
```

> **Target: one page. The simulation does not proceed past a checkpoint until approval is recorded.**

## 3 · Finding-classification framework

| Class | Definition | Handling |
|---|---|---|
| **CS · Critical Stop** | a control failed in a way that would cause real harm — unauthorized disclosure, client PII exposure, a conclusion issued past a pending Gate, an authorization exceeded | **stop the phase**, fix before continuing, restart comparability |
| **D1 · Artifact defect** | the artifact is wrong, contradictory, or unusable as written | Defect Log → final report |
| **D2 · Friction** | works, but is slow, repetitive, or disproportionate | Defect Log → final report |
| **D3 · Clarity** | a consultant had to guess what was intended | Defect Log → final report |
| **D4 · Tone** | reads as defensive, procedural, or bureaucratic where it should read as consulting | Defect Log → final report |
| **G · Firm-intelligence gap** | the process demanded intelligence VYNE could not locate, date, or qualify | Defect Log → final report |
| **J · Judgment intervention** | founder changed the direction on professional grounds, not because anything was defective | Intervention Log — **evidence of where value comes from**, not a defect |
| **O · Observation** | notable but not actionable yet | logged only |

> **Only CS is fixed mid-phase.** Everything else is recorded and reviewed together, so the five cases
> test one system.

## 4 · Role assignments

| Role | Who | Does | Does not |
|---|---|---|---|
| **Consultant** | Claude | runs the artifacts, drafts, researches public intelligence, prepares checkpoint packets | make the professional judgment · decide the advisor package · approve anything |
| **Founder** | Greg | decides at all five checkpoints · edits scope, materiality, options, tone · selects the advisor package · classifies findings | — |
| **Simulated advisor** | Greg *(voice)* | answers as the case advisor, releases hidden facts on schedule | see any internal artifact |
| **Gate administrator** | Greg | completes the Gate where triggered | — *(and this is **not** independent review — see 9A)* |
| **Recorder** | Claude | Time Log · Defect Log · Intervention Log · firm-intelligence register | — |

> **The founder plays both VYNE and the advisor.** This is the phase's core limitation, and it is why
> Cases 3 and 5 are the weakest simulations — noted in the charter's limits.

## 5 · Estimated schedule

*Rough, and deliberately so — measuring actual time is one of the phase's outputs.*

| Case | Est. founder time | Est. elapsed | Notes |
|---|---|---|---|
| **1 · Stay** | 3–5 h | 2–3 sessions | lightest artifact set; establishes pacing |
| **2 · Wait** | 3–5 h | 2–3 sessions | adds conditions + specialist dependency |
| **3 · Employee move** | **6–9 h** | 3–4 sessions | **heaviest** — Appendix, real intelligence on two firms, full authorization chain |
| **4 · Supported independence** | **6–9 h** | 3–4 sessions | DD authorization first; real platform intelligence |
| **5 · Advisor chooses differently** | 4–6 h | 2–3 sessions | tone work; benefits from prior practice |
| **Findings report** | 2–3 h | 1 session | consolidated |
| **Total** | **~24–37 h** | **12–17 sessions** | |

> **If Case 1 materially exceeds its estimate, that is itself the first significant finding** — and worth
> pausing to discuss before Case 2 rather than absorbing silently.

## 6 · Directory structure

```
 /simulations/
   _baseline/            version register (§1), locked at Case 1 start
   _framework/           checkpoint template, finding classes, logs
   SIM-01_stay/
     00_case_brief/      synthetic advisor, planted facts, intended stresses
     01_checkpoints/     five packets + intervention log
     02_artifacts/       the real artifacts, at real length
     03_firm_intel/      needed · held · stale · unverified · unknown, with sources
     04_internal_record/ time · defects · friction · controls · AI assistance · edits
     05_advisor_package/ the Proposed Advisor Package only
   SIM-02_wait/  SIM-03_employee_move/  SIM-04_supported_independence/
   SIM-05_advisor_differs/
   _findings/            consolidated report (after all five)
```

## 7 · What would invalidate the phase

- **Artifacts revised mid-phase** for anything below a Critical Stop Finding.
- **Cases run in parallel**, so earlier cases cannot inform later observation.
- **Founder acting only as VYNE**, never genuinely as the advisor — the simulated advisor must be allowed
  to push back, withhold, and disagree.
- **Hidden facts released early** to keep a case moving.
- **The Gate cleared without the written counterfactuals actually being written.**
- **Firm intelligence assumed** rather than researched, dated, and qualified.
- **The advisor package defaulting to "everything produced."**
