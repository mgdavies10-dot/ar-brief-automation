# VYNE Platform — Product Requirements Document (PRD) v1.0

**Derived from:** Phase 1 Architecture Package v1.2 (approved)
**Status:** For founder review. No architecture, schema, security, or stack changes are proposed here. Where I believe something deserves reconsideration, it appears in *Recommendations Before Development Begins* — surfaced, not silently changed.
**Test for completeness:** a new VYNE employee should be able to read this document and understand what the platform is, why it exists, and how every major feature supports the business.

---

## 1. Product Vision

### Why VYNE exists

VYNE exists to improve the quality of consequential career and business decisions made by financial advisors. The platform exists to make that service deliverable with consistency, discretion, and evidence — by one founder today, and by a small team later, without the quality of the experience depending on who delivers it.

### The market problem

Advisor movement is a large, permanent market: thousands of advisors change firms, go independent, merge, sell, or restructure every year, and hiring firms pay meaningful fees for successful transitions. The intermediaries in this market are almost universally paid on movement. Their tools reflect that: recruiter CRMs are pipelines of names, and their processes are optimized to create transactions, not decisions.

### The advisor problem

The modern advisor's problem is not a shortage of options — it is decision complexity. More channels, more models, more capital structures, and more recruiting offers than any prior generation, evaluated mostly through sales conversations with parties who profit from a particular answer. Advisors research these decisions privately, often for years, before speaking to anyone. When they finally engage, they are handed comparisons of offers, not frameworks for decisions.

### The business opportunity

VYNE's revenue model is conventional (firm-paid placement fees on verified T12). Its position is not: VYNE sells decision quality, and treats staying, strengthening, or waiting as legitimate outcomes. The commercial bet is that this posture — reinforced by research, structured deliverables, and a curated client experience — earns trust earlier in the advisor's private research process than competitors can reach, and that trust converts into engagements at better economics and with better retention than cold recruiting.

The platform is what makes the posture credible. Anyone can *claim* neutrality. A firm that hands an advisor a Current Reality Record, a Future-State Mandate, a nine-question diagnostic, a governed economic model with classified assumptions, and a written Decision Record is *demonstrating* a process. The platform is the proof.

### How VYNE differs

- **vs. Diamond Consultants / Bridgemark:** These firms compete on relationships, history, and personal credibility, engaged mostly after an advisor has decided to explore. VYNE competes on method and research reach (AEO/content), aiming to be present before the decision to explore exists. VYNE's structured deliverables and Advisor Studio have no equivalent in their client experience. VYNE's disadvantage — no track record — is real and is addressed in Product Risks.
- **vs. traditional recruiter CRMs:** Those are deal-centric databases built for the recruiter's benefit. VYNE OS is advisor-centric and decision-centric, and pairs the commercial pipeline with a separate decision-readiness track — a structural expression of the claim that VYNE's job is a good decision, not a closed deal.
- **vs. wealth-management CRMs:** Those manage client books. VYNE deliberately stores **no client data at all** (Compliance by Design §0.2). The platform is about the advisor's business, never the advisor's clients.

### Product philosophy

One sentence: **the platform prepares; humans advise; the advisor decides.** Every module either helps VYNE understand an advisor's situation, helps VYNE produce evidence-based analysis, or presents approved analysis to the advisor. Anything that does none of those three does not belong.

---

## 2. Product Principles

Every future feature is evaluated against these, in this order. A feature that fails an earlier principle is not rescued by satisfying a later one.

1. **Data Minimization.** Collect only what the service requires. No client PII, ever, in any form (§0.2). If a feature needs data VYNE shouldn't hold, redesign the feature around aggregates or reject it.
2. **Compliance by Design.** Least privilege, privacy by design, security by default, auditability — enforced structurally (schema and RLS), not editorially (policy documents).
3. **Human Review.** Nothing reaches an advisor without explicit human approval and publication. Permanent; no AI exception, no urgency exception.
4. **Curated Advisor Experience.** Advisors receive prepared guidance, never raw system access. If a screen would make an advisor feel like a record in a database, it is wrong.
5. **Security First.** A confidentiality failure ends VYNE's credibility in a market where discretion *is* the product. Security scope-cuts are never acceptable trade-offs for feature velocity.
6. **Decision Support, not decision automation.** The platform surfaces evidence, gaps, and readiness. It never scores an advisor toward a recommendation. Recommendations are authored by humans and published as deliverables.
7. **Simplicity over Feature Count.** Between a feature and a simpler manual process that preserves quality, choose the manual process until volume forces the feature. The parked list is a feature of the product, not a backlog failure.
8. **Trust Before Technology.** The platform should be invisible in the advisor's memory of the engagement. What they should remember is clarity. Any feature that shows off the platform at the expense of the guidance violates this.

---

## 3. Target Users

Six roles are defined in the architecture; **Version 1 activates three** (Founder, Recruiter, Advisor). Analyst, Operations, and Finance are specified so the product is designed for them but not built for them.

### Founder (primary user; ~90% of internal usage in year one)
- **Goals:** run every engagement to the VYNE standard; keep pipeline and economics visible without spreadsheets; produce premium deliverables efficiently; protect confidentiality absolutely.
- **Daily workflow:** morning dashboard review → advisor conversations and meeting capture → artifact drafting/approval → publication → task and follow-up management → firm-intel upkeep.
- **Pain points the product must solve:** context scattered across notes, email, and spreadsheets; deliverable production time; remembering evidence gaps per advisor; tracking fee economics across step-ups and clawbacks; being the single point of failure.
- **Success:** an engagement's entire state is answerable from one advisor workspace in under a minute; a publish-quality deliverable takes hours, not days; nothing overdue goes unseen.

### Recruiter (contractor; 0–3 in year one)
- **Goals:** work assigned relationships; know exactly what's next per advisor; see own production and commissions transparently.
- **Workflow:** own-pipeline view → activity logging → drafting (never approving) artifacts → task completion.
- **Pain points:** ambiguity about lead ownership; opacity about commission math.
- **Success:** zero ownership disputes that the system can't resolve from timestamped records; commissions reconcile to the penny against versioned plans.

### Advisor (the client; 5–25 active in year one)
- **Goals:** clarity on a consequential decision; confidence the analysis is rigorous and confidential; a defensible record of *why* they decided.
- **Workflow:** conversations with VYNE (outside the platform) → periodic Studio sessions to review published deliverables, models, timeline, and assigned tasks.
- **Pain points the product must never create:** feeling processed, sold, tracked, or exposed.
- **Success:** the advisor voluntarily returns to Studio between meetings; the Decision Record is something they'd show a spouse or business partner.

### Analyst / Operations / Finance (designed, not activated)
Defined goals and boundaries exist in the permissions matrix; activation is a Version 2 decision driven by hiring, not by software readiness.

---

## 4. Product Modules

Format per module: why it exists → objective → users → inputs → outputs → dependencies → success metric → out of scope.

### 4.1 Dashboard (Command Center)
Exists because a solo founder's scarcest resource is attention. Objective: answer "what deserves my attention today?" in under 60 seconds. Users: Founder (recruiter sees an own-scope variant). Inputs: pipeline changes, overdue tasks, evidence gaps on active decisions, publication queue, fee events. Outputs: prioritized attention list; the Weekly Founder Operating Review view (Vol VI App. B). Depends on: every other module's data. Metric: the founder opens it daily and stops keeping a parallel to-do list. Out of scope: vanity KPIs; charts without decisions attached.

### 4.2 Pipeline
Exists because VYNE is a business, and revenue discipline is what funds neutrality. Objective: track commercial reality (Prospect → … → Hired) *alongside but never merged with* decision readiness. Users: Founder; Recruiter (own). Inputs: opportunities, stage changes, expected fees. Outputs: stage board and table; forecast inputs. Depends on: advisors, lead claims, fee agreements. Metric: forecast within a defensible band of actuals; every stage change dated and attributable. Out of scope: probability scoring of advisors (violates Principle 6); automated stage advancement.

### 4.3 Advisor Workspace
The center of the product. Exists because every service VYNE performs attaches to an advisor. Objective: one place holding the complete, permissioned picture — overview, reality, direction, VYNE's 9, constraints, options, models, artifacts, activity, documents, economics, access. Users: Founder; Recruiter (assigned). Inputs: everything captured about the practice (aggregates only) and the relationship history. Outputs: the context from which all deliverables are drafted. Depends on: firms, decisions, documents. Metric: zero engagement context living outside it. Out of scope: any client-level data (structurally impossible per §0.2).

### 4.4 Decision Workspace
Exists because the decision — not the deal — is VYNE's product. Objective: manage one consequential decision: type (from the Decision Library taxonomy), readiness across eight dimensions, required evidence, firm options with permission states, and current state (STAY / STRENGTHEN / PREPARE / MOVE / CONTINUE DILIGENCE). Users: Founder; Recruiter (assigned, draft-level). Inputs: meetings, research, models, advisor-provided materials (ingested by staff). Outputs: the Decision Completeness Scorecard; the evidence agenda; ultimately the Decision Record. Depends on: Advisor Workspace, Firm Intelligence, Modeling. Metric: no recommendation is published while the scorecard shows critical gaps — the system makes premature recommendations *visible*, which is the point. Out of scope: computed recommendations.

### 4.5 Firm Intelligence
Exists because VYNE's claims about firms must be sourced, dated, and confidence-rated — that rigor is both a competitive asset and a legal shield. Objective: a governed registry of firm facts (`claim / source / date / confidence / stale_after`), never a rumor file. Users: Founder; Analyst later; Recruiter sees an approved subset. Inputs: public sources, engagement learnings (de-identified), fee agreements. Outputs: inputs to Firm Comparisons; the staleness queue. Depends on: the research review workflow. Metric: every claim used in a published comparison has a source and a date. Out of scope: publishing raw intel to advisors; storing another firm's confidential documents without permission.

### 4.6 Modeling Workspace
Exists because transition economics are where advisors are most often misled, and where VYNE's classified-input discipline (verified / advisor-provided / firm-provided / estimated / assumption) is most visibly different from a recruiter's spreadsheet. Objective: governed scenario comparison (stay / move / independence / succession / etc.) with versioned inputs and reproducible outputs. Users: Founder; Recruiter (assigned). Inputs: classified assumptions, fee-agreement terms, advisor aggregates. Outputs: model versions, scenario comparisons, published model reports. Depends on: canonical formulas with hand-check tests (the Q-7 gate — a hard blocker). Metric: any published number is reproducible from its stored version months later. Out of scope: live advisor editing of assumptions (a V2+ question); tax advice (models illustrate; disclaimers required).

### 4.7 Artifacts (Deliverable Production)
Exists because deliverables are the tangible product. Objective: the draft → review → approve → publish lifecycle for every advisor-facing document, with immutable published snapshots. Users: Founder (approve/publish); Recruiter (draft). Inputs: structured workspace data. Outputs: published snapshots and branded PDFs. Depends on: the PDF service and the publication boundary. Metric: nothing advisor-visible exists outside this lifecycle; median production time falls with each engagement. Out of scope: direct editing of published content (supersede instead — by design).

### 4.8 Advisor Studio
Covered fully in §7. In module terms: the only advisor-facing surface; displays published snapshots, the transition timeline, meeting summaries, and assigned tasks; the sole advisor writes are task completion and credentials. Metric: advisors log in unprompted between meetings; zero support requests that reveal confusion about what the platform is.

### 4.9 Accounting (Fees & Invoicing)
Exists because VYNE's fee structures (base %, step-ups, clawbacks) outgrow spreadsheets fast, and errors here damage the only relationships that pay. Objective: placements → fee events → invoices → collections, reconciled. Users: Founder; Finance later. Inputs: fee agreements, verified T12, placement records. Outputs: invoices, aging, reconciliation. Metric: earned / invoiced / collected / clawed-back reconcile without manual interpretation (Vol VI §33). Out of scope: general-ledger accounting (stays in accounting software); tax preparation.

### 4.10 Commissions
Exists because recruiter trust requires transparent, versioned math — and because clawbacks must flow through proportionally without arguments. Objective: versioned commission plans applied to fee events; each recruiter sees own only. Users: Founder; Finance later; Recruiter (own). Metric: zero manual spreadsheet corrections after month one of a recruiter's tenure. Out of scope: hard-coded percentages (Conflict C-4 keeps plans configurable).

### 4.11 Tasks
Exists because in a relationship business, the dropped follow-up is the silent killer. Objective: every task has one accountable owner and at least one linked record; overdue work surfaces by decision impact, not just age. Users: all internal roles; Advisor (assigned tasks only). Metric: the overdue-and-unseen count is zero. Out of scope: automation marking consequential work complete.

### 4.12 Meetings
Exists because meetings are where the actual consulting happens; the platform's job is capture and conversion. Objective: agenda, internal notes, and a *separate* advisor-facing summary draft that enters the artifact lifecycle. Users: Founder; Recruiter (assigned). Metric: every meeting with an active advisor produces either a published summary or a logged decision not to publish one. Out of scope: recording/transcription in V1 (consent and storage questions unresolved).

### 4.13 Research (Review Queue)
Exists because intel without review becomes rumor. Objective: the staging area where new firm-intel claims (human-drafted now, AI-drafted in Phase 7) await confidence rating and verification. Users: Founder; Analyst later. Metric: no unreviewed claim ever reaches a published comparison. Out of scope: auto-verification.

### 4.14 Authority Engine (content pipeline)
Exists because AEO/content is a core acquisition engine — but it is **Phase 6** and V1-deferred as a platform module; until then, content operations run outside the platform. Objective when built: manage insight/AEO articles from draft to published with the same review discipline as advisor artifacts. Metric when built: qualified confidential conversations attributable to content. Out of scope permanently: engagement-data-driven content (would violate confidentiality).

### 4.15 Public Website
Exists to convert advisors' private research into trusted first contact. Objective: authority content, the public layer of the Method, and inquiry capture into the unassigned lead queue in VYNE OS. Users: prospects, subscribers. Metric: qualified confidential conversations originated per quarter (not traffic). Out of scope: any confidential intelligence; full Decision Cards; any client login beyond a link to Studio.

---

## 5. Advisor Journey

What VYNE does (internal) and what the advisor experiences (external) at each step:

1. **Prospect.** *Internal:* record created from inquiry, referral, or outreach; source and ownership timestamped; restrictions noted. *Advisor:* has usually read VYNE content already; experiences a low-pressure, confidential first conversation with no pitch.
2. **Discovery (ROOT begins).** *Internal:* qualification; relationship-owner assignment; opportunity opened; decision record opened with a type hypothesis. *Advisor:* structured conversations that feel unlike recruiter calls — questions about what they're building, not where they'd move.
3. **Current Reality.** *Internal:* practice aggregates captured; Current Reality Record drafted, approved, published. *Advisor:* receives — often for the first time in their career — a rigorous written portrait of their own business. This deliverable does the most trust-building work per page of anything VYNE produces.
4. **Future-State Mandate.** *Internal:* direction conversations; mandate drafted and published; readiness dimensions begin filling. *Advisor:* sees their goals stated back with precision, before any firm has been named. This ordering — direction before destinations — is the product's ethical signature.
5. **VYNE's 9.** *Internal:* the nine-question diagnostic completed through conversation; profile published. *Advisor:* experiences this as the moment the process feels proprietary and serious.
6. **Firm Comparisons (BRANCH).** *Internal:* firm options added with explicit advisor permission per firm; comparisons built from sourced intel; submissions occur only after permission (structurally enforced). *Advisor:* reviews side-by-side analysis in Studio; never discovers their name went anywhere without consent — because it can't.
7. **Economic Modeling.** *Internal:* scenarios built with classified inputs; founder-approved report published. *Advisor:* sees honest numbers with visible assumptions — including scenarios where staying wins.
8. **Recommendation.** *Internal:* authored only when the scorecard supports it; written by the founder; published as a deliverable with reasoning and confidence framing. *Advisor:* receives a written recommendation they can interrogate — not a pitch.
9. **Decision.** *Internal:* Decision Record drafted capturing the choice, the reasoning, the rejected alternatives, and open risks; published. *Advisor:* owns a document that makes the decision defensible to themselves, their team, and their family — whatever they chose.
10. **Transition (if moving).** *Internal:* transition timeline published; tasks assigned; milestones tracked; placement recorded on start date. *Advisor:* Studio becomes the calm center of a chaotic period — timeline, tasks, and summaries in one place.
11. **Placement & economics.** *Internal only:* verified T12, fee events, invoicing, commissions. *Advisor:* sees none of this, ever.
12. **Follow-up (GROW).** *Internal:* scheduled reviews; the relationship continues; de-identified lessons enter the Decision Library. *Advisor:* periodic check-ins; the Decision Record ages well — or triggers a new engagement.

**The stay path is a first-class journey**, not an exit ramp: steps 1–9 complete with a STAY or STRENGTHEN decision, a published Decision Record of equal production quality, and a scheduled review. No placement revenue results. The product must make this path feel like success internally — the dashboard counts completed decisions, not just placements — because the moment stay-decisions feel like failures, the neutrality claim is dead.

---

## 6. Founder Journey

**Morning (10 minutes).** Dashboard: the attention list — stage changes, overdue tasks ranked by decision impact, evidence gaps blocking progress, artifacts awaiting approval, invoices aging. Decide the day's two or three consequential actions.

**During the day.** Work from advisor workspaces, not lists: capture meetings, convert notes into tasks and artifact drafts, update readiness, log document requests (fulfilled outside the platform, tracked internally), review, and publish.

**Weekly (45 minutes).** The Weekly Founder Operating Review (Vol VI App. B): top relationships, active decisions and their gaps, pipeline movement, the publication queue, dormant high-value advisors, and risks. This ritual replaces managerial memory.

**Monthly.** Commercial review (stage conversion, expected fees vs. forecast) and finance review (earned / invoiced / collected / commissions reconciliation). Firm-intel staleness queue.

**Quarterly.** Relationship review (dormant advisors, alumni, referral sources, stay-decision follow-ups); the prohibited-data audit sample (§0.2); knowledge review — what recent engagements should change in the Decision Library.

**Annually.** Commission-plan versioning; retention-policy execution (Q-14); pricing and fee-agreement review; parked-feature review against actual volume.

The design intent: the founder's judgment goes into conversations and recommendations; the platform holds everything else.

---

## 7. Advisor Studio Philosophy

Advisor Studio is not software the advisor uses. It is **a room VYNE prepared before they arrived.**

**The controlling metaphor** is the private-bank client review: when the client walks in, the materials are printed, the analysis is done, and everything in the room was chosen for them. Nobody hands the client the bank's terminal. Studio is that room, rendered digitally.

**Tone.** Calm, precise, unhurried. Editorial typography, generous whitespace, navy and ivory, gold used like a signature — rarely. No badges, streaks, notification counts, or engagement mechanics of any kind. The platform never asks the advisor for anything except completion of a task VYNE assigned.

**Psychology — what the advisor should feel:**
- *Anticipated.* Content appears because VYNE prepared it, addressed to them: "Prepared for you following our March 12 conversation."
- *In control.* They decide; every deliverable reinforces that the analysis serves their judgment.
- *Safe.* Nothing about their clients, nothing they didn't consent to, no evidence of being "worked."
- *Progressing.* The journey view always answers "where am I, and what happens next?"

**What they must never feel:**
- *Processed* — no record-like screens, no IDs, no statuses in pipeline language. The advisor never sees the words "prospect," "opportunity," "stage," or "pipeline."
- *Sold* — no urgency mechanics, no comparison framing that nudges toward movement.
- *Surveilled* — no read receipts, no "last seen," no activity prompts. (VYNE OS logs access for security; Studio never reflects it back socially.)
- *Abandoned* — empty states read as anticipation, in VYNE's voice: "Your firm comparison is in preparation — expected following our next conversation."

**Navigation.** Shallow and named in the advisor's language: Home · Your Journey · Deliverables · Models · Meetings · Tasks · Decision Record. Six or seven destinations, no nesting, nothing to configure. Every screen leads with a sentence of context before any data.

**The deeper product claim.** Studio's restraint *is* the message. Every recruiter portal is built to extract engagement; Studio is built to deliver preparation. An advisor who has seen both will feel the difference before they can articulate it — and that felt difference is VYNE's brand doing its work.

---

## 8. Deliverables

All deliverables share one lifecycle: **drafted** (founder or recruiter, assembled from workspace data) → **reviewed** → **approved** (founder only) → **published** (immutable snapshot + branded PDF to one advisor's Studio) → **superseded** (new version replaces; history retained) or **withdrawn** (hidden from Studio; preserved for audit). Per deliverable:

| Deliverable | Purpose | Key inputs | What the advisor receives |
|---|---|---|---|
| **Current Reality Record** | Establish a shared, evidence-based portrait of the practice today; the trust cornerstone | Discovery meetings, practice aggregates, advisor-provided materials (ingested by staff) | A rigorous written profile of their business — strengths, frictions, facts |
| **Future-State Mandate** | Define success *before* destinations enter the conversation | Direction meetings | Their goals and non-negotiables, stated with precision, confirmed with them in conversation |
| **VYNE's 9 Profile** | The proprietary diagnostic across nine questions | Structured conversations | Per-question findings and what each implies for the decision |
| **Firm Comparison** | Evidence-based side-by-side of permissioned options | Sourced, dated firm intel; the mandate's criteria | A comparison against *their* mandate, not a generic grid; sources and confidence visible |
| **Economic Model Report** | Honest long-term economics per scenario | Classified model inputs; the versioned engine | Scenario outcomes with every assumption labeled by type |
| **Meeting Summary** | Convert conversations into shared record | Internal notes, separately drafted for the advisor | What was discussed, what was decided, what happens next |
| **Transition Timeline** | Make the chosen path executable and calm | Decision Record; firm process knowledge | Milestones and assigned tasks — the map for a stressful period |
| **Decision Record** | The capstone: what was decided, why, what was rejected, what risks remain | Everything above | A defensible written record of the decision — valuable whether they moved or stayed |

One workflow rule worth stating in product terms: **deliverables are assembled from structured workspace data, not written from scratch.** The platform's economic value to VYNE lives largely here — each engagement's capture work compounds into faster, more consistent deliverable production.

---

## 9. AI Philosophy

**What AI does (Phase 7, and only then):** drafts firm-intel entries from cited public sources into the review queue; drafts meeting summaries and proposed tasks from founder notes; assembles first-draft deliverables from structured records. In every case, AI produces *drafts that enter the human lifecycle at the bottom*.

**What AI never does — permanently:** publish or approve anything; communicate with an advisor; change permissions or ownership; score, rank, or recommend outcomes for an advisor; read documents lacking a prohibited-data attestation; mark consequential work complete.

**Why the boundary is absolute.** VYNE's product is human judgment made rigorous. The moment an advisor suspects a recommendation was machine-generated, the premium positioning collapses — and no efficiency gain is worth that. AI is therefore a production-cost lever, invisible in the client experience by design. If VYNE ever markets its AI at all, it markets the *governance* of it, not the capability.

**Trust mechanics:** every AI-generated record is tagged `generated_by`, audit-logged, and visually marked internally until a human edits or accepts it. Compliance by Design §0.7 applies with no AI exception.

**Future vision, honestly bounded:** the Decision Library plus years of de-identified engagement records could eventually support genuinely useful internal pattern analysis ("decisions of this type stall at this evidence gap"). That is a Version 3+ conversation, gated on engagement volume that does not yet exist — and it never crosses the publication boundary autonomously.

---

## 10. Success Metrics (Version 1, business terms)

**Primary — the platform is working if:**
1. **Engagement consistency:** every active advisor has a current scorecard, a published Current Reality and Mandate, and no undocumented state. Target: 100%. This is the "institutional quality without institutional headcount" claim, measured.
2. **Deliverable production time:** founder hours per published deliverable, trending down engagement over engagement. Target: a Current Reality Record in ≤4 focused hours by the fifth engagement.
3. **Advisor engagement with Studio:** the proportion of active advisors who log in unprompted between meetings. Target: a majority. (Measured for product health; never surfaced socially — see §7.)
4. **Decision completion:** decisions reaching a published Decision Record — *including stay decisions* — per quarter. This is the metric that keeps the neutrality claim honest.
5. **Revenue integrity:** fee events, invoices, collections, and commissions reconcile monthly without spreadsheet archaeology. Target: zero manual corrections after month two.

**Secondary:** time-to-answer for "what's the state of this engagement?" (<1 minute); founder attention leakage (tasks discovered after they mattered: zero); recruiter commission disputes resolvable only outside the system (zero); qualified confidential conversations originated by content (tracked from Phase 6 onward).

**Explicitly not V1 metrics:** placements per quarter as a *platform* metric (it is a business outcome the platform serves, not one it controls); Studio session time (engagement mechanics are against the philosophy); website traffic.

---

## 11. Future Roadmap

**Version 1 (this build — Phases 2–6 of the approved plan).** Foundation and vertical slice; Minimum Viable Founder OS; Advisor Studio (curated, read-only); Modeling Workspace (after the formula gate); public website and insights. *Justification: everything required to run real engagements at the VYNE standard, and nothing else.*

**Version 2 (triggered by hiring and volume, not by calendar).** Analyst / Operations / Finance role activation; recruiter dashboards beyond own-pipeline; Authority Engine as an in-platform module; Studio enhancements under review (advisor acknowledgment of deliverables; possibly comments; possibly secure messaging) — each requires a founder decision *and* a fresh security review per the parked list. *Justification: coordination features earn their complexity only when there is a team to coordinate.*

**Version 3 (triggered by engagement volume, roughly 50+/year).** Decision Library analytics on de-identified patterns; benchmarking against anonymized aggregates; calendar/email synchronization; possibly advisor-side assumption editing in models with an approval workflow. *Justification: pattern value requires pattern volume.*

**Future vision (explicitly speculative).** Portability and transition-preparation tooling rebuilt around **aggregate, advisor-computed inputs** (per Conflict C-6 — the original client-inventory concepts are prohibited, not deferred); methodology training surfaces for future consultants; a public research product derived from the Decision Library. Every idea on this list must re-pass Principles 1–3 before any design work begins.

---

## Product Risks

1. **The chicken-and-egg trust problem.** The product's differentiation assumes advisors engage deeply enough to experience it. With no track record, the first 5–10 engagements will be won by the founder's personal credibility, not by the platform. *Mitigation:* the platform's job in year one is to make the first engagement feel like the twentieth — consistency is its contribution to reputation-building, and deliverable quality is visible from engagement one.
2. **The neutrality-vs-revenue tension is structural, not solved.** VYNE is paid only when advisors move. The platform makes stay-decisions visible and first-class, but the economic pressure is permanent. *In-product mitigation:* stay decisions counted in success metrics; stay Decision Records produced at equal quality. *Open beyond the product:* whether VYNE should eventually offer paid stay/strengthen engagements to align economics — a business-model question the platform should not preempt but must not preclude (ROOT as a paid engagement is architecturally trivial to add).
3. **The founder is a bottleneck by design.** Sole approval and publication authority is correct for quality and wrong for resilience. Acceptable at V1 scale; it becomes a product problem the month a second approver is genuinely needed. Tracked, not solved.
4. **The deliverable quality ceiling.** The platform can enforce process, not insight. A mediocre Firm Comparison produced through a beautiful lifecycle is still mediocre — and Studio's premium frame *raises* the advisor's expectations. The product increases the visibility and cost of publishing bad work, which is the most software can do.
5. **Email is now the inbound-document perimeter** (Risk R2b, accepted in v1.1). The weakest confidentiality link is outside the platform. Q-13 is the control, and it is a policy control, not a technical one.
6. **Residual over-building risk.** Even the V1 scope is generous for a firm with no revenue. The phase gates are the control; the temptation to polish the platform instead of filling the pipeline is the real risk, and no document can mitigate it — only the founder's calendar can.

## Open Product Questions

1. **Should ROOT be a paid engagement in V1?** A business-model question that affects invoicing scope but nothing structural. It should be decided before the public website's services pages are written, since positioning depends on it.
2. **What does the advisor experience when an engagement ends without movement?** Proposal: Studio access persists read-only for 12 months with the Decision Record and deliverables, then archives with an exported PDF package. Needs confirmation; interacts with retention (Q-14).
3. **Do advisors formally acknowledge deliverables?** V1 assumes no in-platform acknowledgment (keeps Studio write-free beyond tasks). The alternative — a lightweight "reviewed" acknowledgment — has legal-record value. Recommend deciding with counsel input.
4. **Naming in the advisor's language.** Does "VYNE's 9" appear in Studio as a branded module, or do the nine questions appear un-branded within deliverables? Branding cuts both ways — proprietary to some advisors, gimmicky to a skeptical $25M team. Recommend testing the language in the first three real engagements before hard-coding navigation labels.
5. **Recruiter visibility into Studio.** A recruiter can currently infer what was published via artifact status; is that sufficient, or is a read-only Studio-preview mode needed so recruiters see exactly what their advisor sees? Preview mode proposed for Phase 4.

## Recommendations Before Development Begins

1. **Answer the four blocking gates first** (Q-1 domains, Q-2 vendors, Q-6 CRM v4 real-data status, C-1 sign-off). Q-6 in particular: if real advisor data sits in an unauthenticated browser file, that is this week's work, ahead of everything in this document.
2. **Run one real engagement manually, in parallel with Phase 2.** Use the deliverable templates as documents, the methodology as written, and email as the perimeter. The build should chase a live engagement's actual friction, not a specification's imagined friction. This is the single highest-value de-risking step available, and it costs no engineering time.
3. **Write the three hardest deliverables by hand before automating their assembly** (Current Reality, Firm Comparison, Decision Record). The Vol V templates are structural; the *voice* is not yet proven. Automating assembly of an unproven voice bakes in mediocrity.
4. **Lock the Studio vocabulary early** (Open Question 4). Navigation labels are cheap to change in code and expensive to change in advisors' minds.
5. **Keep the UX Blueprint next, as planned — and keep it small.** The ~33 screens are inventoried; the blueprint should specify the six Studio screens and the five highest-traffic OS screens (Dashboard, Advisor Workspace, Decision Workspace, Pipeline, Artifact/Publish flow) at full fidelity, with pattern-level guidance for the rest. Full fidelity on everything would be motion without progress.
6. **One candid challenge, offered once.** The platform is currently the most developed part of a business that has not yet signed its first engagement. Everything in this PRD supports the service — but the sequence that makes VYNE real is: first confidential conversation → first manual engagement → first published deliverable → *then* the vertical slice makes the second engagement easier. If the build ever runs ahead of that sequence, pause the build, not the conversations.

---

*End of PRD v1.0. Awaiting founder review. Next planned document per the approved sequence: UX Blueprint.*
