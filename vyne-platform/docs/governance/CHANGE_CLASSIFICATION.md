# VYNE Change Classification

**Status:** G2, for founder review · **Owner:** Founder (Council Chair)
**Used by:** Governance Manual §4 stage 2 and §5; Authority Matrix; CLAUDE.md
requirement 1. When in doubt between two levels, use the higher. If the level cannot
be determined at all, treat as Level 3 until ruled (Manual §6.10).

## Level 0 — Administrative

**Examples:** typo fixes; formatting; documentation link corrections; non-substantive
copy corrections (meaning unchanged).

**Requirements:** functional owner approval only. No full council review. No Decision
Log entry unless the change alters meaning — and if it does, it was never Level 0:
reclassify.

## Level 1 — Normal product or engineering change

**Examples:** minor feature enhancement inside approved scope; internal workflow
adjustment; non-sensitive UI behavior conforming to the UX Blueprint.

**Requirements:** product + engineering review; normal tests pass; Decision Log entry
only when the change materially affects approved behavior; source-document update if
a document describes the changed behavior.

## Level 2 — Material change

**Examples:** new workflow; schema change; financial logic; role permissions
(non-RLS); Advisor Studio behavior; publication logic adjacent changes;
AI-assisted analysis (any use of model output in the product path).

**Requirements:** formal council review (Charter roles per Authority Matrix); founder
approval; Decision Log entry before implementation; affected-document review and
scheduled updates.

## Level 3 — Critical or regulated change

**Examples:** authentication; RLS; encryption; sensitive-information handling; legal
terms; compensation agreements; external recommendations; production security
incidents; data breach; regulatory boundary changes.

**Requirements:** formal council review; founder approval; security approval (CTSO
lens + executed negative-access tests); legal classification (Charter §1.5 five
classes); outside-counsel review where the Authority Matrix requires it; **executed**
acceptance tests (authored-only is not acceptance); release gate
(`RELEASE_GOVERNANCE.md`); Decision Log entry.

## Council-trigger table (common events, pre-classified)

Use this before the decision tree; it answers the common cases directly so no session
has to guess when council review is required.

| Event | Required review |
|---|---|
| Typo, formatting, broken documentation link | Level 0; functional owner only |
| Cosmetic spacing or styling with no behavior change | Level 0 or Level 1, depending on scope |
| Minor implementation detail within an already approved design | Level 1; product and engineering review |
| New user-facing feature or workflow | Level 2; formal council review and founder approval |
| New database table or material schema change | Level 2 or Level 3 based on data sensitivity |
| Authentication, session, MFA, account recovery, or revocation | Level 3 |
| RLS, permissions, role access, or publication boundary | Level 3 |
| New sensitive data category, retention rule, or external integration | Level 3 |
| Financial calculation or compensation logic | Level 2 or Level 3, with independent testing |
| AI-generated analysis, recommendation, or external communication | Level 2 or Level 3 |
| Change to the VYNE Method or recommendation neutrality | Level 3 |
| Legal terms, disclosures, privacy language, contracts, or compensation agreements | Level 3 with legal classification |
| Marketing copy that creates or changes a factual, performance, legal, or comparative claim | Level 2 or Level 3 |
| Production outage, security incident, suspected data exposure, or emergency rollback | Level 3 emergency process |

Where a row says "or," the deciding factors are data sensitivity, advisor visibility,
and external exposure — apply the decision tree below and the cross-cutting modifiers;
when reasonable uncertainty remains, classify at the higher plausible level and ask
the founder before implementation (CLAUDE.md governing rule).

## Decision tree

Answer in order; the first "yes" sets the level.

```text
1. Does it touch authentication, RLS/permissions enforcement, encryption,
   sensitive-data handling, legal terms, compensation agreements, external
   recommendations, a security incident, a breach, or a regulatory boundary?
        yes → LEVEL 3
2. Does it add/change a workflow, schema, financial logic, role permissions,
   Advisor Studio behavior, publication logic, or use AI-assisted analysis?
        yes → LEVEL 2
3. Does it change product or engineering behavior at all
   (features, workflows, UI behavior)?
        yes → LEVEL 1
4. Does it change only wording/formatting with meaning fully preserved?
        yes → LEVEL 0
        no  → you cannot classify it — stop (Manual §6.10) and treat as
              Level 3 until ruled.
```

Cross-cutting modifiers (apply after the tree):
- Anything touching **published or advisor-visible content** rises to at least Level 2.
- Anything requiring a **new data category** triggers §0.9 review regardless of level.
- An **emergency** never lowers a level; it defers sequencing only (Authority Matrix
  note 4).
