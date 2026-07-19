# VYNE Product Council — Charter Adoption, Amendments, First Session, and Engineering Authorization

**Document type:** Governance record, not a foundational treatise.
**Effect:** Charter v1.0 is adopted as amended below → Charter v1.1. Only the changed clauses are stated; everything else stands.

---

# PART A — Amendment Schedule (Charter v1.0 → v1.1)

### Amendment 1 — Information-location boundaries
**Replaces:** §7.4, final paragraph ("Where it lives…").
**New clause:** VYNE information lives in three distinct locations. **(a) Institutional knowledge base** (Claude Project / secure document store): Constitution, Architecture, PRD, Method, UX Blueprint, this Charter, roadmap, role instructions, approved policies. **(b) Code repository:** application code, technical documentation, architecture decision records, *non-confidential* Decision Log entries and summaries, decision IDs, tests, migrations, release notes. **(c) Restricted legal and risk workspace** (access: founder + counsel only): contracts, outside-counsel communications, legal memoranda, trademark work, detailed risk assessments, incident records, security audit reports. The repository must never contain attorney communications, privileged or sensitive legal analysis, detailed vulnerability descriptions, advisor documents, credentials, secrets, or confidential contractual negotiations. Cross-referencing is by identifier only — e.g., `DL-2026-014 — Advisor Studio terms approved. See Legal Register LR-2026-003.` — never by reproducing restricted content.

### Amendment 2 — VYNE Legal and Risk Register (separation of scope)
**Replaces:** §4.3.
**New clause:** A restricted **VYNE Legal and Risk Register** (`LR-YYYY-NNN`) exists in the restricted workspace, owned by the founder with counsel, *outside* the Product Council. It holds all corporate legal matters: entity formation, founder agreements, contractor classification, recruiter contracts, employment, company tax posture, trademark prosecution, incident records. **The Product Council's jurisdiction is limited to product decisions.** For any LR item, the council tracks exactly one fact: whether it *blocks or conditions* a product decision, referenced by ID in the Decision Log. Rows of the §4.2 matrix that are corporate rather than product matters migrate to the LR at founding. Structure per LR entry: ID · matter · classification label · counsel engaged (y/n) · status · product decisions blocked (DL IDs) · review date. No further elaboration of the register is authorized — this clause is its complete definition.

### Amendment 3 — Evidence standard for lens assessments
**Inserts:** new §5.1 (subsequent numbering shifts).
**New clause:** Every council-lens assessment must state: evidence reviewed; source and date; jurisdiction where relevant; known facts vs. assumptions (separately listed); confidence level; unresolved questions; what evidence would change the conclusion; and whether a human professional must validate it. No legal or security conclusion may rest solely on unsupported model judgment. Format example, binding: *"Classification: Unresolved legal question. Data involved: advisor identity, firm affiliation, aggregate practice economics. Assumption: no client-level data stored (§0.2 enforced). Question for counsel: which state privacy and contractual obligations apply to VYNE's operating model? Product action pending review: continue synthetic-data development; do not create real Advisor Studio accounts."* An assessment lacking these elements is returned, not debated.

### Amendment 4 — Environment and data rules
**Inserts:** new row-set into §3 (Authority Matrix, appended table).
**New clause:**

| Environment | Permitted data |
|---|---|
| Local development | Synthetic only |
| Shared development | Synthetic only |
| Staging | Synthetic, or de-identified test data explicitly approved by founder decision |
| Production | Real advisor data only after all human-professional and release gates (§8) |
| Demonstrations | Synthetic demonstration personas only |

Violations are Compliance-by-Design violations (§0) and are logged as incidents.

### Amendment 5 — Governance timeboxes
**Amends:** §6, appending to the proportionality rule.
**New clause:** Owner track — one-line log, no session. Light track — asynchronous review, normally complete within one business day. Full track — structured review, normally within two business days unless an outside dependency exists. External-review track — remains pending until the qualified professional responds; the dependent decision cannot be timeboxed closed. **No meeting is held merely to repeat written assessments** — sessions exist to resolve disagreement, decide, or escalate; agreement in writing is a decision, not an agenda item.

---

# PART B — Updated Operating Structure

Four working contexts inside the one VYNE Project. One model underneath all of them — this separation improves context hygiene and role discipline; it does not create independence, and the §8 human gates remain the only true independence in the system.

1. **VYNE Product Council** — reviews proposals, classifies, resolves trade-offs, approves releases, maintains the Decision Log, determines what requires human review. Writes no production code.
2. **VYNE Lead Engineer** — receives an Engineering Authorization (decision ID + frozen acceptance criteria); plans, codes, migrates, tests, documents, prepares releases. Changes nothing outside the authorization; stop-conditions in the EA are binding.
3. **VYNE QA and Red Team** — receives the specification and the built result *after* engineering; attempts unauthorized access, challenges assumptions, verifies calculations, examines error states; reports against acceptance criteria. **Standing instruction: do not defend the engineering choices.**
4. **Product Council (release)** — receives the QA report; decides release / release-with-conditions / return / escalate.

---

# PART C — Session DL-2026-001 (convened)

**Track:** Full. **Chair:** Founder (decisions marked "Founder-directed" reflect the founder's written instruction of this date; all other founder decisions are recorded as pending until stated).

## C.1 Status of every referenced Q and C item — no statuses invented

| Item | Source | Known status |
|---|---|---|
| Q-1 Domains | Arch. v1.2 §18 | **Unresolved** — no founder answer on record |
| Q-2 Vendor sign-off (Supabase/Vercel/Resend) | Arch. §16/§18 | **Unresolved** — recommended, never confirmed |
| Q-3 Recruiter publication rights | Arch. §18 | Unresolved; v1 assumes founder-only (assumption, not decision) |
| Q-4 Advisor team members | Arch. §18 | Unresolved; assumed deferred |
| Q-5 Studio messaging | Arch. §18 | **Resolved** — closed by founder's v1.1 direction (no messaging) |
| Q-6 CRM v4 real-data status | Arch. §15/§18 | **Resolved (DL-2026-004)** — synthetic/demo data only; no migration or purge required |
| Q-7 Hand-check model cases | Arch. §18 | Unresolved — blocks Modeling phase only, not the slice |
| Q-8 Serif license | Arch. §18 / UX | Unresolved — blocks final visual design; slice may use Source Serif 4 fallback per token spec |
| Q-9 Vector logo | Arch. §18 / UX | Unresolved — same treatment as Q-8 |
| Q-10 Retention period | Arch. §18 | Unresolved; proposal on record only |
| Q-11 Advisor MFA policy | Arch. §18 | Unresolved; proposal (optional) on record |
| Q-12 E-signature | Arch. §18 | Unresolved; assumed no |
| Q-13 Approved communication process | Arch. v1.1/v1.2 | **Unresolved** — blocks first *real* engagement, not the slice |
| Q-14 Source-document retention | Arch. v1.2 | Unresolved; proposal on record |
| C-1 Modeling as OS module | Arch. §18 | **Unresolved** — deviation proposed, never signed off; not exercised by the slice |
| C-2 Pipeline stages | Arch. §18 | Unresolved; v4 stages proposed |
| C-3 Palette canonicalization | Arch. §18 | Effectively settled by BRAND_TOKENS.md adoption in UX v1.0; formal sign-off pending |
| C-4 Commission tiers | Arch. §18 | Correctly deferred — versioned-plan design removes urgency |
| C-5 Agent taxonomy | Arch. §18 | Deferred to Phase 7 |
| C-6 Prohibited-data vs. earlier roadmap | Arch. v1.2 | Recorded; standing |
| Method [PROPOSED] items (Ch. 5 evidence bars, mirror test, cooling rule, CONTINUE-DILIGENCE discipline, promotion gate) | Method v1.0 | **Unresolved — founder ratification never given** |

## C.2 Decision Log entries

**DL-2026-001 — Charter adoption.** Status: **Approved (Founder-directed).** Charter v1.0 adopted with Amendments 1–5 → v1.1. Rationale: amendments correct repository confidentiality, scope creep, evidence rigor, environment boundaries, and ceremony risk. Affected docs: Charter (v1.1).

**DL-2026-002 — Information architecture of records.** Status: **Approved (Founder-directed, per Amendment 1/2).** Three-location model established; Legal and Risk Register founded in restricted workspace with initial items migrated from §4.2: entity formation (LR-2026-001), fee-agreement template (LR-002), recruiter agreements/classification (LR-003), Studio terms & privacy notice (LR-004), trademark clearance (LR-005), state recruiting-activity survey (LR-006), non-inducement guardrails (LR-007), privacy-regime applicability (LR-008). All carry their §4.2 labels; contents live in the restricted workspace only.

**DL-2026-003 — Environment and data rules.** Status: **Approved (Founder-directed, per Amendment 4).** Binding on all engineering immediately.

**DL-2026-004 — Q-6 resolution.** Status: **Resolved (Founder statement, Jul 17, 2026).** Founder confirms CRM v4 contains synthetic or demonstration data only — no real advisor, prospect, recruiter, firm, fee, compensation, client, or confidential business information. No containment or purge required; the interim containment directive is lifted. Consequences: the Architecture §15 migration plan resolves to its no-migration branch — v4 files are archived read-only as "Prototype v1 — reference only," and the new platform seeds fresh synthetic data per EA-001; the urgent flag on this entry is cleared, leaving no flagged-urgent items in the register. Formula extraction from v4's modeling code (Architecture §15.4) remains a Phase 5 task, unaffected — it concerns code, not data.

**DL-2026-005 — Method [PROPOSED] ratification.** Status: **Pending founder decision.** The slice encodes the cooling rule (approve-after-cooling behavior) and the lifecycle gates. Council recommendation: ratify as written; engineering condition (below) makes the cooling rule configurable so a founder amendment costs configuration, not rework. The mirror test and Chapter 5 bars are *not* exercised by the slice (no recommendation surface in scope) and may be ratified later without build impact.

**DL-2026-006 — Vertical slice authorization.** Status: **Approved with conditions (Founder-directed per this instruction; conditions binding).** Scope per Architecture Phase 2 and UX Blueprint. Conditions: **(a)** synthetic data only, per DL-003; **(b)** local/shared development only until Q-2 vendor sign-off — *no hosted staging or production deployment under this authorization*; build against the recommended stack, which is exercised identically locally; **(c)** cooling rule implemented as configurable policy, default ON, pending DL-005; **(d)** fallback serif per Q-8 status; final typography deferred; **(e)** stop-conditions in EA-001 are binding.

**DL-2026-007 — QA requirement.** Status: **Approved.** The slice proceeds to the QA/Red-Team context on completion; release review (DL-2026-008, to be convened) requires the QA report, the full security-suite results, and the §7.3 checklist. No release gate is reachable under this authorization anyway (condition b), so "release" here means *acceptance of the slice as the foundation for Phase 3*, not deployment.

**DL-2026-008 — Reserved** for the slice acceptance review.

**DL-2026-010 — Engineer plan acceptance and ambiguity rulings (CR-001).** Status: **Approved (light track).** The EA-001 implementation plan (M1–M6) is accepted as conforming. Rulings on the four flagged ambiguities: **(1) decision_type taxonomy** — the Decision Library (Volume IV) exists outside the uploaded library; its ten founding decision types are supplied as seed values: stay; stay_and_strengthen; move_employee_firm; supported_independence; launch_or_join_ria; acquire_practice; merge_teams; sell_or_monetize; internal_family_succession; external_capital_partner. Implemented as lookup-constrained text, extensible by migration. Source: Vol IV's ten founding Decision Cards. **(2) "(min)" table scope** — approved as proposed; subset recorded in an ADR for council review. **(3) Residue-scan list** — approved as configurable, seeded with the UX §5.5 examples plus the full commercial-stage vocabulary (prospect, discovery, modeling, presented, in contention, submitted, offer, signed, hired, pipeline, stage, opportunity, lead, T12, fee, commission, clawback) and internal-user first names; council may extend. **(4) Cooling default** — next-calendar-day, configurable, approved; consistent with Method Ch. 9 pending DL-2026-005 ratification.

**DL-2026-011 — Build environment.** Status: **Pending founder decision; council recommendation recorded.** The chat build container has no network access and no database runtime — confirmed on the council side as an environment fact, not an engineering excuse. Council recommendation: **Option 3 — execute the build in Claude Code on the founder's machine**, with EA-001 and the accepted M1–M6 plan as the handoff (first choice, because tests and RLS verification run where the code lives); Option 1 (enable network for the chat environment in settings) is an acceptable alternative. **Option 2 (author unverified security-critical code) is rejected** as inconsistent with §0.5 — RLS that has never executed is a liability wearing a file extension. Environment rules of DL-2026-003 apply unchanged in every option: local, synthetic-only.

**DL-2026-009 — Future VYNE agent capability (roadmap requirement, Phase 7).** Status: **Approved (Founder-directed).** Recorded intent: VYNE OS will eventually include callable internal AI agents that authorized users run from relevant records and workflows, surfaced through an internal **VYNE Intelligence / Agent Center** module and contextual actions (e.g., run a methodology review from a decision; draft a deliverable from a workspace; run QA/red-team against a release; refresh firm intelligence from a firm record). Clarification of present state: the Product Council, Lead Engineer, and QA/Red-Team working contexts are **development-time Claude roles, not functioning agents inside VYNE OS**. Initial anticipated agents: (1) Product Council Orchestrator, (2) Methodology Guardian, (3) Deliverable Drafting Agent, (4) Legal and Privacy Issue-Spotter, (5) Security and Architecture Reviewer, (6) QA and Red-Team Agent, (7) Model Validation Agent, (8) Firm Intelligence Agent. Every agent run must operate under role-based permissions, the Amendment-3 evidence standard, human review, and produce an immutable, versioned run record (records reviewed · evidence · assumptions · findings · risks · recommended actions · human approvals required) with full audit logging. **Permitted:** analyze authorized records, draft, classify, recommend, identify missing evidence, prepare review and Decision Log entries. **Prohibited, permanently:** independently contacting external parties; submitting advisors; publishing to Advisor Studio; issuing VYNE's final recommendation; approving their own output; executing financial transactions; altering compensation; deleting governed records; overriding legal, security, methodology, or human-professional gates. **Intentionally deferred until the core foundation works:** detailed agent taxonomy, orchestration architecture, model/provider selection, tool permissions, cost controls, and UI. **Architectural guidance (non-binding on EA-001 scope, binding on design intent):** implementation choices should avoid unnecessarily precluding later agent integration — the existing service-identity RLS pattern, `generated_by` tagging, review-queue structures, and append-only audit design already satisfy this; no additional build work is authorized by this entry. **Phase 7 must return to the Product Council for full design and authorization before any implementation.** Supersedes nothing; elaborates C-5. Review date: Phase 7 entry.

**Escalations recorded:** LR-001…005 require licensed counsel (external-review track — open until counsel responds; none block the synthetic slice; LR-004 blocks first real advisor account). Independent security review and human code audit (§8.3/8.4) are pre-real-data gates, not pre-slice gates — scheduling them during Phase 3 is recommended so latency overlaps engineering.

---

# PART D — Engineering Authorization EA-001

**To:** VYNE Lead Engineer (new conversation: "VYNE Build — Lead Engineer")
**Authorizing decision:** DL-2026-006. **Status:** Active. **This document is the entire authorization; nothing outside it is in scope.**

**Approved scope — the vertical slice, exactly:**
1. Monorepo foundation per Architecture §3 (apps: os, studio; packages: db, ui, domain, audit; web deferred).
2. Design tokens per UX Part 1 (BRAND_TOKENS.md palette; Source Serif 4 + Inter fallback stack; component primitives needed by the slice only: Button, Card, Document Frame, Status Pill, Dialog, Publish Dialog, form fields, table, empty/error/unauthorized blocks).
3. Auth (email+password, TOTP MFA capability, role claims: founder, recruiter, advisor), sessions per UX §4.1, immediate-revocation path.
4. Database migrations for: users, advisor_accounts, advisors, teams(min), firms(min), decisions, decision_evidence(min), artifacts, published_artifacts, tasks, documents(with attestation fields), activities, audit_events — with **RLS policies per Architecture §12**, including the advisor role's zero-grant posture on internal tables.
5. Append-only audit service; events per Architecture §12 for all slice actions.
6. Synthetic seed: one founder, one recruiter, three synthetic advisors ("demonstration personas" per Amendment 4), one synthetic firm set.
7. The slice flow end-to-end: create advisor → create decision → author Current Reality (structured sections) → artifact lifecycle Draft→In review→Approved (cooling-rule policy, configurable, default ON)→ Publish Dialog (advisor's-eye Frame preview, checklist incl. residue scan and attestation)→ snapshot to published_artifacts → synthetic-advisor Studio session: Home (status line, featured deliverable), Deliverables reader in the Frame, task assigned/completed with note → withdrawal removes from Studio, preserved internally → every step audited.
8. Test suite: unit (domain), integration, and **the full security acceptance suite** (Architecture §12 + Founding Acceptance Tests): cross-recruiter invisibility (list, search, URL, API), advisor probing of internal routes/tables, disabled-user session death, withdrawn-artifact invisibility with audit persistence, UI/API authorization parity.
9. Documentation: setup, environment template, migration/rollback notes, and non-confidential ADRs referencing DL IDs.

**Excluded scope (binding):** pipeline module; modeling; economics/invoicing/commissions; firm intelligence beyond the minimal firm record; meetings module; research; public website; AI features; email sending (Studio notification is manual per UX §2.7 — log-only stub); any hosted deployment; any real data; any Studio write surface beyond task completion and credentials.

**Constraints:** Architecture v1.2 is binding (RLS, snapshot-copy publication, soft delete, append-only audit); UX Blueprint specs for the Frame, Publish Dialog, absence-over-disablement, and the two-vocabulary rule are acceptance criteria, not suggestions; Compliance-by-Design §0 governs every field added; TypeScript throughout; no secrets in source; environment rules per DL-003.

**Acceptance criteria:** the slice flow completes end-to-end with the security suite green; the published Frame renders identically in OS preview and Studio; the residue scan flags planted OS vocabulary in a test fixture; audit log reconstructs the full flow; rollback of the latest migration verified.

**Stop and return to the Product Council if:** any requirement conflicts with Architecture v1.2 or this EA; implementing anything requires weakening an RLS policy or §0 guardrail; a needed business rule is undefined (do not invent — file a proposal); the recommended stack proves unfit for a required control (report before substituting); anything in scope would require real data, hosted deployment, or an excluded module; or the security suite cannot be made to pass without design change.

**Deliverables:** working slice (local), passing test output, migration set with rollback, ADRs, setup docs, and a completion report to the QA/Red-Team context and the council (files changed, data-model deltas, screenshots, tests run, unresolved risks, decisions needed next).

---

# Closing statement

Governance setup is complete: charter adopted and amended, records separated, environments bounded, the first session logged, and the slice authorized with conditions. Two founder items remain open outside the build's path — **Q-6 (answer it; it outranks everything in real-world priority)** and **DL-2026-005 (ratify or amend the Method items at your convenience; the build absorbs either answer).**

**The next action is implementation.** Open "VYNE Build — Lead Engineer," hand it EA-001, and build the vertical slice — nothing more, nothing else, and no further foundational documents.
