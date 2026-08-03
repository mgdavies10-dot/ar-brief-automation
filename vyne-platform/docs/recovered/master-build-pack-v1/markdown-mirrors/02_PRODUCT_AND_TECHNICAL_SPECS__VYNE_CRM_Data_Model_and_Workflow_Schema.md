```
SEARCHABLE MARKDOWN MIRROR — NOT THE ORIGINAL SOURCE
Recovered material. Do not edit. Do not treat as canonical without the status below.
```

# VYNE CRM Data Model and Workflow Schema

| | |
|---|---|
| **Original filename** | `VYNE_CRM_Data_Model_and_Workflow_Schema.docx` |
| **Original source path** | `docs/recovered/master-build-pack-v1/original/02_PRODUCT_AND_TECHNICAL_SPECS/VYNE_CRM_Data_Model_and_Workflow_Schema.docx` |
| **Source SHA-256** | `c13ed17ba85b0c869a6dc9be25cca4895e2546c47219b4af5accaa60ec31db0c` |
| **Version / status as stated in the document** | Version 1.0 | July 2026 |
| **Converted** | 2026-08-02 |
| **Conversion** | text extraction from WordprocessingML; **substantive wording unaltered**; tables flattened to lines; formatting lost |

> **This Markdown is a searchable mirror, not the original source.** The preserved `.docx` is
> authoritative. Where they differ, the original governs.

---

VYNE STRATEGIES
CRM Data Model and Workflow Schema
The operating data structure for advisor relationships, firm opportunities, intelligence, economics, fees and future analytics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Version 1.0 | July 2026
Companion to the Internal Operating Manual and Production Website Technical Specification
Working technical specification. Architecture, privacy, cybersecurity, legal and regulatory decisions require qualified review before production use.
Contents
01 Executive data decision
02 Design principles and data boundaries
03 Core entities and relationships
04 Advisor and relationship model
05 Case and VYNE framework model
06 Firm and opportunity model
07 Meetings, tasks and deliverables
08 Firm intelligence and source control
09 Economics, contracts and fee tracking
10 Portability and book analytics
11 Continuity and talent matching
12 Consents, documents and permissions
13 Workflow state machine and stage gates
14 Dashboards and reporting
15 Sample UBS advisor case
16 Implementation and acceptance
01 Executive Data Decision
Recommended data model
Use a relational CRM centered on the advisor relationship, with separate records for the VYNE case and every firm opportunity. Store intelligence, documents, economics, consent and agent activity as linked records rather than overloaded notes or one giant advisor table.
The primary design goal is not to capture every possible fact. It is to make each active record answer: where is the advisor, what decision is VYNE helping make, what is missing, what happens next, and what must be true before the case advances.
What the CRM is not
It is not a public website database.
It is not a replacement for secure file storage.
It is not a dumping ground for unverified firm rumors.
It is not permission to collect identifiable client data.
It is not a fully automated decision engine.
02 Design Principles and Data Boundaries
One person may have multiple relationships and cases over time; do not overwrite history.
One case may evaluate multiple firms at different stages.
Firm intelligence is source-dated and confidence-rated.
Every material status has a next action, owner and due date.
Consent and disclosure are records, not checkboxes hidden in notes.
Financial models retain assumptions and versions.
Agent outputs are drafts with provenance and approval status.
Client PII is excluded from the initial schema.
Identifier policy
Use opaque system-generated identifiers for internal relationships. External interfaces should use scoped public IDs or signed tokens so record counts and adjacent records cannot be enumerated.
03 Core Entities and Relationships
Entity
Purpose
Key relationships
person
Human contact: advisor, team member, firm contact, professional
Can have roles, organizations, consents and communications
organization
Firm, RIA, advisory team, law firm, vendor or VYNE
Parent/subsidiary and team relationships
advisor_profile
Advisor-specific production, assets, practice and career facts
One per advisor per effective period
relationship
Overall VYNE relationship stage and ownership
Links person to VYNE owner and source
case
A defined advisory engagement or strategic question
Contains framework stages, deliverables and firm opportunities
firm_opportunity
One destination or current-firm option in a case
Has meetings, proposal, status and fit analysis
firm_intelligence_item
A dated fact, representation or analysis about a firm
Links source, confidence, topic and expiration
meeting
Scheduled or completed interaction
Links case, opportunity, participants and notes
task
Owned next action with due date
Links any operational record
document
Metadata for secure file, version and access
Links case, proposal, model or deliverable
economic_model
Versioned assumptions and outputs
Links current baseline and firm opportunity
fee_event
Expected, invoiced, paid, step-up or clawback amount
Links firm agreement, placement and case
assessment
Versioned questionnaire answers and result
May create relationship or attach to case
portability_analysis
Book-level or aggregate analytical run
Links de-identified positions and firm compatibility
continuity_opportunity
Anonymous buy/sell/succession/talent need
Links verified parties and matches
agent_run
AI task with inputs, permissions, output and approval
Links source records without becoming source of truth
04 Advisor and Relationship Model
Advisor profile fields
Field group
Examples
Handling
Identity
name, CRD, current firm, market, contact channels
CRD verification status and date recorded separately
Practice scale
T12/TTMP, AUM, households, recurring mix, growth
Values include as-of date, range/exact flag and source
Book origin
self-built %, inherited, purchased, team-generated, firm-generated
Advisor estimate unless verified
Team
members, roles, splits, agreements, successor status
Team members are separate people, not free text only
Clients
segments, concentration, demographics, capabilities used
Aggregate descriptions only in initial model
Strategy
primary trigger, Vision, Objectives, model preferences, timing
Case-specific items should live in case records
Restrictions
deferred comp, agreements, contractual issues, off-limits firms
Facts and professional advice clearly separated
Relationship stage
Stage
Meaning
Required next-action expectation
Subscriber
Permissioned content relationship
Segment and deliver relevant intelligence
Prospect
Known person with possible fit
Qualify interest and relevance
Engaged lead
Meaningful intent signal
Personal outreach or requested response
Qualified
Real strategic question and VYNE fit
Schedule structured discovery
Active exploration
Case underway
Weekly owned next action
Decision pending
Final analysis or conditions outstanding
Decision meeting and open-issue owner
Committed
Destination selected; pre-transition
Execution plan active
Transitioning
Advisor has resigned or joined
Command cadence and issue tracking
Placed
Fee event conditions met
Post-transition review and fee tracking
Stay/prepare/nurture
No immediate move
Value-based future cadence
05 Case and VYNE Framework Model
A case is opened when VYNE is helping answer a defined decision, not merely because a contact exists. The same advisor can later have a succession case, acquisition case or new transition case without overwriting prior outcomes.
Case field
Description
case_type
transition, stay-and-strengthen, succession, acquisition, team move, talent match, offer review
case_question
The decision VYNE is helping the advisor make
current_stage
Understand, Vision, Objectives, Readiness, Navigate, Enterprise Economics, Decide, Execute, Elevate, Grow
current_firm_option
Formal opportunity record for staying or internal change
vision_summary
Approved desired-future narrative and version
objectives
Weighted criteria, nonnegotiables and stakeholder effects
readiness_status
ready, ready with conditions, prepare, not ready and reason
decision
stay, prepare, continue, move, merge, sell, acquire, join team
next_action
Task reference, not free-text-only status
case_risk
Low/medium/high with reason and last review
expected_value
Expected fee range with probability and timing - internal only
Framework records
Vision Brief and Objectives Scorecard are versioned deliverables.
ROOT and BRANCH are structured assessments with scores plus qualitative rationale.
A final score cannot replace the narrative explanation and evidence.
Current firm is represented as a formal opportunity so it can be compared consistently.
06 Firm and Opportunity Model
Firm master
Area
Fields
Identity
legal name, brand, CRD/SEC identifiers where relevant, parent, channel, headquarters
Coverage
markets, branch presence, advisor profiles, submission restrictions and off-limits rules
Capabilities
investments, advisory, banking, lending, trust, alternatives, technology, planning
Economics
typical deal structures, payout/grids, expenses, equity, succession - stored as dated intelligence
Relationships
firm contacts, contracts, fee schedules, active status and last review
Firm opportunity status
Status
Definition
Gate
Identified
Internal candidate only
Written reason tied to objectives
Advisor approved
Advisor authorizes consideration
Consent recorded
Blind check
Limited nonidentifying market check
No advisor identity shared
Submitted
Named lead sent
Submission packet and authorization stored
Firm reviewing
Firm has acknowledged
Next response date
Firm interested
Mutual exploration possible
Intro meeting scheduled or planned
Meeting complete
Initial meeting occurred
Debrief and advance/decline decision
Due diligence
Substantive testing underway
BRANCH issues and owners tracked
Proposal requested
Firm preparing economics
Data request scope approved
Proposal received
Written terms available
Document stored and review task created
Finalist
Genuine decision candidate
Key diligence and economics substantially complete
Selected
Advisor chose firm
Pre-transition conditions documented
Declined / withdrawn / hold
No longer active
Reason and future relevance recorded
07 Meetings, Tasks and Deliverables
Meeting record
Meeting type, scheduled/completed dates, participants and opportunity.
Objective, prepared questions and documents used.
Advisor statements, firm representations and VYNE analysis stored separately where practical.
Decisions, commitments, open questions and next actions.
Follow-up sent date and advisor approval/correction when material.
Task rules
Rule
Requirement
Ownership
Every active task has one accountable owner.
Deadline
Every active case has a dated next action.
Completion evidence
Material tasks reference the email, meeting, document or outcome that completes them.
Escalation
Overdue critical tasks appear in the Chief of Staff brief.
No check-in tasks
Tasks should specify the value or decision sought, not merely “follow up.”
Deliverable metadata
Type, version, status, creator, reviewer, approval date and source records.
Advisor-visible versus internal-only classification.
Assumptions and disclaimers stored with economic and portability outputs.
Superseded deliverables remain auditable but are not shown as current.
08 Firm Intelligence and Source Control
Core rule
A firm statement is not “data” merely because an advisor or firm representative said it. VYNE must record who said it, when, in what context, whether it is documented and how confident VYNE is that it applies to the current case.
Field
Purpose
topic
deal, payout, product, leadership, transition, culture, equity, succession, restriction
statement
Atomic claim written without unnecessary advisor identity
source_type
firm document, firm contact, advisor, public filing, website, VYNE inference
source_reference
Document ID, URL, meeting or person
effective_date / observed_date
Separates when it applied from when learned
scope
national, market, branch, advisor segment, specific case
confidence
verified, strong, provisional, conflicting, stale
visibility
internal only, advisor-safe, public approved
review_date
When the item must be revalidated
Conflict handling
Do not overwrite conflicting information; keep both records and flag the conflict.
A newer statement does not automatically supersede a documented contract.
Case-specific exceptions remain scoped to that case and should not become a market benchmark.
Public content requires a separate publication approval even if intelligence is advisor-safe.
09 Economics, Contracts and Fee Tracking
Economic model structure
Object
Fields
Current baseline
production, payout, bonuses, benefits, deferred comp, expenses, growth and as-of dates
Proposal component
type, amount/rate, guarantee, condition, hurdle, period, forgiveness, clawback, source clause
Scenario
downside/base/upside assumptions and probability if used
Output
annual cash flow, cumulative economics, break-even, estimated enterprise value and sensitivities
Review
creator, reviewer, advisor-visible status and disclaimer
Firm contract and fee objects
Record
Purpose
firm_agreement
Effective dates, fee tiers, eligible hires, exclusions, invoice triggers and clawbacks
placement
Advisor, firm, join date, verified T12 basis and fee eligibility
fee_event
Initial fee, step-up, adjustment, clawback or write-off
invoice
Amount, date, due date, status and document
payment
Amount, receipt date, allocation and bank reference
recruiter_commission
Source rule, tier, amount, payment date and clawback exposure
Controls
Fee calculations reference the agreement version effective for the placement.
Expected revenue is not recorded as earned revenue.
Step-up and clawback windows generate dated tasks.
Advisor-facing materials do not expose VYNE internal fee forecasts.
10 Portability and Book Analytics
Initial de-identified position model
Field
Example purpose
position_key
Random local identifier; not client name or account number
account_category
advisory, brokerage, retirement, trust, institutional
product_type and security identifier
Compatibility and conversion logic
market_value and revenue
Asset and revenue portability scenarios
lending / banking flag
Dependency and replacement risk
alternative / annuity / insurance flag
Transfer restrictions and process complexity
restricted / proprietary flag
Potential stranded asset
concentration bucket
Client and revenue concentration without identity
data_source and as_of_date
Quality and currency
Analysis objects
Firm product compatibility rule with source, effective date and confidence.
Position-to-rule result: portable, conditional, replacement needed, likely nonportable, unknown.
Scenario assumptions for client decisions, timing and revenue transfer.
Aggregate outputs only unless a separately approved client-data model exists.
Every result displays uncertainty and unresolved classifications.
11 Continuity and Talent Matching
Object
Key fields
continuity_opportunity
type, market, practice range, business mix, timeline, preferred model, anonymity status
participant_profile
buyer/seller/successor/junior/team role, verified identity, preferences and constraints
match
compatibility dimensions, score, rationale, conflicts and approval status
introduction
mutual consent, confidentiality, date, participants and outcome
transaction_path
stay, move together, join team, acquire, merge, phased succession
Launch boundary
The first version should be a private concierge workflow. Do not publish an open listing board until VYNE has verified supply, confidentiality controls, conflict rules and enough density to create credible matches.
12 Consents, Documents and Permissions
Consent records
Consent type
Required details
Marketing
channel, wording/version, granted date, source, withdrawn date
Advisor verification
purpose, verification data, reviewer and result
Named firm submission
firm, information scope, authorization date and method
Secure analysis
documents/data allowed, purpose, retention and sharing
Placement announcement
advisor and firm approval, approved text and channels
Role model
Role
Typical access
Founder / case lead
Assigned advisor cases, firm relationships and approved business reporting
Consultant
Assigned cases and limited firm intelligence
Research / content
De-identified intelligence and public content; no active-case documents by default
Finance
Agreements, placements, invoices and payment records; limited advisor narrative
Security/admin
Technical administration with monitored emergency access
AI agent service
Explicitly scoped records and actions for each run
13 Workflow State Machine and Stage Gates
Case-stage gate examples
Stage
Required before advancing
Understand -> Vision
Qualified question, advisor profile and mutual fit
Vision -> Objectives
Vision Brief reviewed and corrected
Objectives -> Readiness
Objectives and nonnegotiables approved
Readiness -> Navigate
Readiness conclusion, conditions and data scope
Navigate -> Submission
Curated rationale and advisor authorization for each firm
Due diligence -> Economics
Advisor and firm mutual interest plus enough written information
Economics -> Decide
Baseline, proposal scenarios, client/team effects and open risks
Decide -> Execute
Selected path, conditions, professional reviews and advisor authorization
Execute -> Elevate
Decision implemented and transition/outcome metrics available
Status invariants
A submitted firm must have advisor authorization.
A proposal-received status must link to a stored proposal or documented exception.
A committed status requires a selected opportunity and final conditions checklist.
A placed status requires the firm-agreement fee trigger to be evaluated.
Closed and declined statuses require a reason code and future-nurture decision.
14 Dashboards and Reporting
Dashboard
Core measures
Founder morning view
meetings, overdue tasks, advisor risks, firm responses, expected fees, approvals
Pipeline
relationships by stage, aging, next actions, source, T12/AUM ranges, probability
Active cases
VYNE stage, active firms, unresolved questions, last advisor contact, decision date
Firm activity
submissions, meetings, proposals, conversion, time to response, intelligence freshness
Economics
models awaiting review, proposal comparisons, major changes and advisor decisions
Finance
expected/invoiced/paid fees, step-ups, clawback exposure and cash forecast
Authority funnel
content source, subscriber, assessment, verification, call and qualified case
Data governance
high-sensitivity records, access exceptions, stale permissions, deletion requests
15 Sample UBS Advisor Case
The following illustrates how the fictional $1.6 million T12 UBS advisor would be represented without flattening the process into one status.
Record
Illustrative value
Relationship
Qualified -> Active exploration
Case
Ownership, succession and platform decision
VYNE stage
Navigate, later Enterprise Economics
Current-firm opportunity
UBS - current-firm assessment complete
Firm A opportunity
Employee model - first meeting complete
Firm B opportunity
Supported independence - proposal received / finalist
Firm C opportunity
RIA platform - advisor declined due operating burden
Readiness
Ready with lending and alternative-product conditions
Next action
Firm B proposal review meeting; owner MD; due Friday
Documents
Vision Brief v2, Objectives Scorecard v1, Proposal v3, Economic Model v2
Fee forecast
Internal expected range; not earned; linked to Firm B agreement
16 Implementation and Acceptance
Build sequence
Implement people, organizations, advisor profiles, relationships, cases, tasks and meetings.
Add firm master, firm opportunities, permissions and submission workflow.
Add documents, deliverables and intelligence items with source control.
Add economic models, agreements, placements and fee tracking.
Add agent runs, approval queues and audit reporting.
Pilot portability tables with synthetic and de-identified data.
Add continuity records only after the concierge process is tested manually.
Acceptance criteria
The UBS sample can be represented without duplicating the advisor or losing firm-specific stages.
Every active case reports a valid next action and stage gate.
No named submission can be recorded without consent.
Firm intelligence can show conflicting, stale and case-specific data.
Economic models and proposals are versioned and linked.
Internal fee status distinguishes forecast, invoice, payment and clawback exposure.
Agent outputs cannot silently overwrite approved source records.
A complete advisor data export can be generated for privacy or vendor migration needs.