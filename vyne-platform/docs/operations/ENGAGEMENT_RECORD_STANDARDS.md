# Engagement Record Standards

**Type:** Operating standard *(not architecture)* · **Status:** DRAFT for founder review ·
**Date:** 2026-07-25 · **Version:** v0.1
**Applies to:** every artifact produced in an advisor engagement — advisor-facing and internal.
**Governed by:** Assessment · Consultation · Recommendation & Report Architectures (frozen);
Commercial Principles.

**Why this comes first:** every artifact built after this one needs a home, a name, a version, and a
status. Deciding that once, now, prevents an unfixable mess later.

---

## 1 · Engagement codes (confidentiality control)

Each engagement receives a short code at Orientation: **`E-26-014`** *(E · two-digit year · sequence)*.

> **Filenames and folder names use the engagement code, never the advisor's name.** Filenames leak —
> into backups, sync clients, search indexes, screen shares, and email attachments. The advisor's
> identity lives *inside* access-controlled documents, not in paths.

A single **engagement index** maps code → advisor. It is internal, access-controlled, and the only
place the mapping exists.

## 2 · Folder structure

```
/engagements/
  /E-26-014/
    00_index/            engagement index entry · status sheet · artifact register
    01_orientation/      Advisor Orientation · internal Orientation Review
    02_agreement/        Working Agreement / Engagement Understanding
    03_assessment/       L1 scan · materiality worksheet · module work
    04_consultation/     prep templates (internal) · Consultation Summaries (advisor)
    05_recommendation/   Recommendation & Decision Record · comparison appendix
    06_authorizations/   firm-specific authorization forms
    07_internal/         Higher-Conflict Decision Gate records · workpapers · provenance
    99_archive/          superseded versions only
```

**`07_internal/` is never shared, excerpted, or attached to advisor correspondence.** If an advisor
question can only be answered from `07_internal/`, the answer is rewritten as advisor-facing content —
the file itself does not travel.

## 3 · File naming

```
E-26-014_{ArtifactType}_v{N.N}_{STATUS}_{YYYY-MM-DD}.{ext}
```

Examples:
- `E-26-014_Orientation_v1.0_ISSUED_2026-07-28.pdf`
- `E-26-014_RecommendationRecord_v1.0_DRAFT_2026-08-14.docx`
- `E-26-014_GateRecord_v1.1_INTERNAL_2026-08-15.docx`
- `E-26-014_Authorization_FirmA_v1.0_ISSUED_2026-08-20.pdf`

**Artifact types:** `Orientation` · `OrientationReview` · `Agreement` · `AssessmentScan` ·
`MaterialityWorksheet` · `ConsultationPrep` · `ConsultationSummary` · `RecommendationRecord` ·
`ComparisonAppendix` · `GateRecord` · `Authorization` · `ClosureRecord`.

Authorizations append the firm: `Authorization_FirmA`. **No client names or account identifiers appear
in any filename, ever.**

## 4 · Version numbering

| Version | Meaning |
|---|---|
| **v0.x** | draft, pre-approval — freely edited, never sent |
| **v1.0** | first approved/issued version |
| **v1.x** | refinement or material amendment; **direction unchanged** |
| **v2.0** | **reissue — the direction changed**; supersedes v1.x |

The advisor never sees a version number as the document's identity. The Record is *"Our perspective as
of [Month Year]"*; the version lives in the filename and the record-details block.

## 5 · Status

**Draft → Approved → Issued → Superseded**, plus **Withdrawn**.

| Status | Meaning | May it reach the advisor? |
|---|---|---|
| **Draft** | in preparation | **No** |
| **Approved** | founder-approved; cooling rule satisfied | not yet sent |
| **Issued** | delivered to the advisor | **Yes** — this is the live version |
| **Superseded** | replaced by a later version | no (archived, with a pointer) |
| **Withdrawn** | no longer supported by VYNE | no; withdrawal is stated to the advisor |

**Two hard gates before `Issued`:**
1. **founder approval**, with the **cooling rule** satisfied (no same-day approval; an override needs a
   logged reason);
2. **Higher-Conflict Decision Gate status = Completed or Not required** — a Recommendation Record cannot
   reach `Issued` while a required gate is `Pending`.

## 6 · Factual corrections

Corrections are **visible, never silent.** Every issued artifact carries a short **correction log**
(date · what changed · what it affected · new version).

| Change | Handling | Version |
|---|---|---|
| **Typographical / non-substantive** | corrected; logged | version held; correction noted |
| **Refinement** (added detail; conclusion unchanged) | amendment note | v1.x |
| **Material amendment** (a material input changed; direction holds) | amendment stating what changed and its effect | v1.x |
| **Direction change** | new Record identifying the newly discovered, newly verified, or materially changed information that caused it | **v2.0**; prior superseded |
| **Withdrawal** | stated reason; nothing left standing VYNE no longer supports | marked Withdrawn |

## 7 · Archive and replacement

Superseded versions move to `99_archive/` **with a pointer to their replacement**. They are **never
deleted or overwritten** — the history of VYNE's thinking is part of the record, and a corrected fact is
only demonstrable if the prior version survives.

**Retention and destruction** follow a **written, counsel-approved retention policy required before
production use.** Legal holds, active disputes, contractual obligations, and applicable law override
ordinary destruction schedules. **No retention period is set here.**

## 8 · No client PII — a standing rule

**Never collected, stored, or accepted in any engagement artifact:** client names · account numbers ·
Social Security or tax ID numbers · addresses · dates of birth · contact details · statements,
confirms, or exports containing client-identifying data.

Client information appears only as **aggregate or structural** description: segment concentration,
household count bands, account-type mix, product mix, revenue composition.

> **Pre-save check:** before any file is saved to an engagement folder, confirm it contains **no client
> PII**. If an advisor volunteers PII, it is **not retained** — the advisor is told plainly, and the
> material is returned or destroyed rather than filed.

## 9 · Advisor-facing vs internal designation

**Every artifact carries one designation in its header, on page one:**

```
ADVISOR-FACING                    or        INTERNAL — NOT FOR ADVISOR RELEASE
```

| Advisor-facing | Internal |
|---|---|
| Advisor Orientation · Working Agreement · Consultation Summary · Recommendation & Decision Record · Comparison Appendix · Authorization forms · Closure Record | Orientation Review & Entry Decision · Consultation Prep · **Gate Records** · workpapers · provenance chains · materiality worksheet |

**The designation is not advisory.** An internal artifact is never sent, quoted verbatim, screen-shared,
or attached. When a firm needs information, VYNE prepares an **approved excerpt or firm-facing summary**
— never the Record itself, and never an internal file (Recommendation & Report Architecture §19B;
counsel to finalize).

## 10 · The artifact register

`00_index/` holds one line per artifact: **type · version · status · date · designation · supersedes**.
It answers, at a glance: *what is live, what is pending, what was replaced.* This is also where a
**pending gate** is visible without opening the gate record.

---

## Open items

- **Storage platform and access controls** are not specified here (a tooling decision, not a standard).
  Whatever is used must support access control, version history, and no third-party training on content.
- **Retention periods** — counsel, before production use.
- **Encryption and transmission standards** for issuing advisor-facing artifacts — to be set with the
  storage decision.
