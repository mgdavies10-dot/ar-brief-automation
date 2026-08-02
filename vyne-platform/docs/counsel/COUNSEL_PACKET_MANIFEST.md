# Counsel Packet Manifest — CP-2026-01

**2026-08-02** · **Status: ASSEMBLED — awaiting founder approval to send**

---

## 1 · Documents enclosed for review

| # | Document | What it is | Review depth |
|---|---|---|---|
| **1** | **`ADVISOR_ENGAGEMENT_UNDERSTANDING.md`** v0.2 | The plain-English document the advisor accepts. 19 sections. **Carries the DRAFT — COUNSEL REVIEW REQUIRED banner on every page.** | **Full review — this is the packet's centre** |
| **2** | `AEU_COUNSEL_REVIEW_SCHEDULE.md` | VYNE's own section-by-section map: business intent · proposed language · legal question · whether approval is required · whether the provision belongs in a different instrument | **Reference** — read alongside (1); it front-loads most of the analysis |
| **3** | `ADVISOR_ORIENTATION.md` v0.2 | The advisor-facing intake. Carries the compensation disclosure (§7) and the first acknowledgment (§8) | **Targeted** — disclosure, acknowledgment, confidentiality notice |
| **4** | `FIRM_SPECIFIC_AUTHORIZATION.md` v0.2 | The separate instrument authorizing contact with one named firm | **Targeted** — C-33 to C-37 |
| **5** | `RECOMMENDATION_AND_DECISION_RECORD.md` v0.2 | The advisor-facing written deliverable. Relevant to document ownership and permitted use | **Targeted** — C-24 to C-27, and the C-11 advice scan |
| **6** | `FIRM_MODEL_COMPARISON_APPENDIX.md` v0.2 | Advisor-facing comparison of models and firms | **Targeted** — C-14 firm-claim attribution, C-11 advice scan |
| **7** | `ADVISOR_CONSULTATION_SUMMARY.md` v0.2 | Advisor-facing summary issued after each consultation | **Targeted** — C-11 advice scan |
| **8** | `ENGAGEMENT_RECORD_STANDARDS.md` v0.1 | Naming, versioning, status, acceptance capture, retention placeholder, no-PII rule | **Targeted** — C-21, C-41, C-44 |

**Enclosed for context, not for review:** `COUNSEL_PACKET_COVER_MEMO.md` · `COUNSEL_DECISION_LIST.md` ·
`COUNSEL_ISSUES_LOG.md`.

## 2 · Explicitly NOT enclosed

**Methodology and internal quality control** — the Constitution, Advisor Decision Ontology, Practice
Transition Assessment, Assessment / Consultation / Recommendation architectures, L1 assessment package,
consultation preparation artifacts, internal records, the Higher-Conflict Decision Gate, simulation
material. **These are not advisor-facing contracts and reviewing them would multiply cost without
reducing legal risk.**

**Firm-side commercial terms** — `LR-2026-002`, a separate matter.

**The public website** — not yet written. See §4.

**`BUSINESS_MODEL_AND_COMMERCIAL_PRINCIPLES.md`** — **founder-restricted.** It contains the fee range and
must not leave VYNE. The compensation disclosure counsel needs is reproduced verbatim in
`COUNSEL_ISSUES_LOG.md` §G; nothing else in that document is required for this review.

## 3 · Items that may continue changing after simulation testing

*Counsel should know which ground may move, so effort can be directed at what is stable.*

| Area | Likelihood of change | Note |
|---|---|---|
| **Advisor Engagement Understanding** | **LOW** | Frozen as a counsel-review draft 2026-07-25. The simulation does not test its terms. **Review it fully.** |
| **Compensation disclosure** | **VERY LOW** | Approved language, used verbatim across all surfaces. Changing it would cascade everywhere. |
| **Firm-specific authorization** | **MODERATE** | Simulation Case 4 is designed to stress the authorization and conflict controls and has not been run. Mechanics may tighten. |
| **Recommendation & Decision Record** | **MODERATE** | Structure is stable; section content is still being tested against real-shaped engagements. |
| **Comparison Appendix** | **MODERATE** | The incomparability treatment is new and untested in practice. |
| **Consultation Summary** | **MODERATE** | Two-tier model recently adopted. |
| **Engagement Record Standards** | **HIGH** | The simulation has already found five defects in it — including a version-numbering contradiction and conflation of status with designation. **Expect a revised version.** Review the acceptance-capture and retention provisions; treat the naming conventions as provisional. |
| **Orientation** | **MODERATE** | Simulation found three defects (a duplicated field, an unreconciled priority question, and a missing decision-authority question). **The compensation disclosure and acknowledgment are stable; the intake structure is not.** |

> **Recommended sequencing.** Review items 1, 2, 3, 8 now — they are the critical path to onboarding a
> real advisor. Items 4–7 can follow in a second pass once simulation testing completes, unless counsel
> sees cross-cutting issues that make a single pass cheaper.

## 4 · Known follow-on work, not in this packet

| | |
|---|---|
| **Public website copy** | ✅ **Now enclosed as `CP-2026-01_ADDENDUM_A_WEBSITE_COPY.md`** (founder-approved for inclusion, 2026-08-02). Carries the **exact rendered copy** from the built site, plus six specific review questions. **Not published** — local development only under EA-WEB-001, and publication is gated on this review. |
| **Public scenario calculators** | Phase-3 backlog. Counsel review already flagged as required for disclaimers, valuation positioning, data collection, and IP/trade-dress. **Nothing built.** |
| **Advisor Studio terms and privacy notice** | `LR-2026-004` — already registered as blocking the first real advisor account. **Overlaps this packet; counsel may prefer to handle together.** |
| **Retention policy** | The output of C-21 to C-23. Does not exist yet and cannot be written by VYNE. |
| **Privacy notice** | Likely a separate instrument per C-2. |

## 5 · Dispatch checklist — before this packet leaves

```
 ☐ Founder has read the cover memo and agrees with how VYNE is described
 ☐ Founder confirms BP-1 to BP-4 are still the intended business positions
 ☐ Counsel selected and engaged; conflicts check complete
 ☐ Confirm BUSINESS_MODEL_AND_COMMERCIAL_PRINCIPLES.md is NOT in the package
 ☐ Confirm no fee percentage, amount, step-up, clawback, or firm-specific term
   appears anywhere in the enclosed documents
 ☐ Confirm no client PII anywhere
 ☐ Register the engagement in OUTSIDE_COUNSEL_REGISTER.md with a new LR ID
 ☐ Decide whether LR-2026-004 and LR-2026-008 are folded into this engagement
 ☐ Record the dispatch as a Decision Log entry
```

## 6 · What "done" looks like

VYNE can onboard a real advisor when:

1. the Advisor Engagement Understanding **loses its DRAFT banner** and is production-approved;
2. **retention periods are set** and a retention policy exists;
3. **electronic acceptance** is confirmed valid with a defined audit trail;
4. the **advice-implication scan (C-11)** is complete and any flagged language is corrected;
5. **C-39** confirms no conflict between BP-1 and VYNE's firm-side agreements.

**Items 1–4 are counsel's. Item 5 requires VYNE's firm-side agreements to exist**, which they do not yet
— `LR-2026-002`. **That is a real dependency the founder should note: VYNE cannot fully close C-39 until
it has at least one firm agreement to check against.**
