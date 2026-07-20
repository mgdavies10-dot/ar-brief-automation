# VYNE Source of Truth Map

**Status:** Approved (founder rulings of 2026-07-20 incorporated) · **Owner:** Founder (Council Chair)
**Purpose:** for any subject, name the one document that governs it, who owns it, and
what authority it carries — so no decision is made against the wrong source and no
document is silently redefined by code.

## 0. Repository-canonical rule (founder ruling, 2026-07-20)

**The repository copy is the canonical operational source** for product development,
engineering governance, release governance, and Claude Code execution. Any
institutional knowledge-base copy is a **reference mirror** and must not independently
diverge from or override the approved repository version.

Boundaries of this rule:
- It applies to **non-confidential** governance materials only. Confidential legal
  advice, privileged communications, sensitive personnel information, and restricted
  commercial terms must **never** be committed to the repository — they live in the
  restricted workspace and are referenced here by `LR-YYYY-NNN` ID and status only
  (Charter Amendments 1–2).
- Founder-approved amendments and later Decision Log entries may clarify or supersede
  earlier provisions. Any substantive conflict between an original governing document
  and a repository operating document must be identified explicitly; a conflict may
  not be resolved merely by calling the newer document an "elaboration." **Material
  supersession requires a Decision Log entry identifying the exact provision changed.**

## 1. Document registry

| Document | Subject governed | Owner | Authority level | Approval status | Current version | Last review | Update trigger | Dependent documents |
|---|---|---|---|---|---|---|---|---|
| VYNE vision & positioning (Vol I–II, institutional KB) | Why VYNE exists; neutrality posture | Founder | 1 | Approved | v1.0 | 2026-07 | Founder decision only | Everything below |
| The VYNE Method (`vyne-docs/06`, context copy) | Decision methodology, gates, cooling rule | Founder | 1 | Approved; [PROPOSED] items pending DL-2026-005 | v1.0 | 2026-07-17 | Founder ratification/amendment | UX Blueprint, PRD, domain package |
| Governance record & Decision Log rulings (`vyne-docs/01`, `02`) | Charter v1.1, DL-2026-001…011, CR-001 rulings | Founder/Council | 2 | Approved | v1.1 / CR-001 | 2026-07-19 | Council session + founder decision | EA-001 execution, ADRs |
| Architecture (`vyne-docs/03`) | Schema conventions, RLS posture, publication model, stack | Founder-approved | 3 | Approved | v1.2 | 2026-07-17 | DL entry + version bump | db package, ADRs, security tests |
| PRD (`vyne-docs/05`) | Product requirements, principles, roles | Founder-approved | 3 | Approved (context copy) | v1.0 | 2026-07 | DL entry | UX Blueprint, apps |
| UX Blueprint (`vyne-docs/04`) | Design language, screens, vocabularies, states | Founder-approved | 3 | Approved | v1.0 | 2026-07 | DL entry | ui package, apps, Frame |
| EA-001 (`vyne-docs/01` Part D) | Slice scope, exclusions, stop conditions | Council → Founder | 4 | Active | — | 2026-07-19 | Council amendment only | M1–M6 plan, all slice commits |
| Accepted M1–M6 plan (`vyne-docs/07`) | Milestone sequencing under EA-001 | Lead Engineer, accepted DL-2026-010 | 4 | Accepted | — | 2026-07-19 | CR ruling | Milestone reports |
| ADRs (`docs/adr/`) | Recorded engineering decisions & conditions | Lead Engineer; council review at acceptance | 4 | ADR-000 accepted; 001–002 accepted-for-M2, council review pending | 000–002 | 2026-07-20 | New ADR or supersession note | Code, tests, reports |
| Governance package (`docs/governance/`) | Decision process, authority, classifications | Founder | 2 | G1 in review | G1 | 2026-07-20 | Founder approval of G1/G2 | CLAUDE.md, all future reviews |
| Database schema & migrations (`packages/db/supabase/`) | Executable data model & RLS | Lead Engineer under EA-001 | 5 | M2 provisionally accepted (ADR-001 condition) | 0001–0007 | 2026-07-20 | Migration under authorized change | RLS tests, apps |
| Security/RLS test suites (`packages/db/test/`) | Executable proof of §12 posture | Lead Engineer; QA verifies | 5 | Passing (shim environment — see ADR-001 scope note) | 42 tests | 2026-07-20 | With any policy change (never weakened silently) | Milestone reports, release gates |
| Decision Log (`docs/DECISION_LOG.md`; G2 restructure planned) | Non-confidential decision summaries & IDs | Founder/Council | 2 | Living | — | 2026-07-20 | Every logged decision | Commits, ADRs, reports |
| Milestone reports (`docs/milestone-reports/`) | What was built vs. verified, per milestone | Lead Engineer | 6 | M1 accepted; M2 provisional | M1–M2 | 2026-07-20 | Each milestone | Acceptance reviews |
| Legal & privacy documents (restricted workspace) | Contracts, counsel work, risk detail | Founder + counsel | Outside repo | — | — | — | Counsel | Referenced by LR ID only |
| Knowledge base & reference (CRM v4 archive, brand refs) | Historical/reference material | Founder | 7 | Reference only | — | — | — | None (never authoritative) |

## 2. Authority hierarchy

When documents disagree, higher authority governs, and the disagreement itself is a
mandatory stop (Manual §6.1) until the lower document is corrected by its owner:

1. **Founder-approved vision and Method**
2. **Founder-approved council rulings and Decision Log entries**
3. **Approved Architecture, PRD, and UX Blueprint**
4. **Engineering authorizations (EA) and ADRs**
5. **Executable schema, tests, and code**
6. **Milestone reports**
7. **Knowledge-base and reference material**

## 3. The code-cannot-redefine rule

Executable code, schema, and tests (level 5) are *implementations* of decisions made
at levels 1–4 — never sources of them. If code behavior and an approved document
disagree, the code is wrong until a logged decision says otherwise; shipping the code
does not amend the document. The reverse discipline also holds: when a decision
changes a document, dependent code must be scheduled for conformance and the gap
tracked in the Decision Log entry until closed.
