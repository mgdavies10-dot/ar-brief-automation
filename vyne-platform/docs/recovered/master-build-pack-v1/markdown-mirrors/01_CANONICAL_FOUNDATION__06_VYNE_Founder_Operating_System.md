```
SEARCHABLE MARKDOWN MIRROR — NOT THE ORIGINAL SOURCE
Recovered material. Do not edit. Do not treat as canonical without the status below.
```

# 06 VYNE Founder Operating System

| | |
|---|---|
| **Original filename** | `06_VYNE_Founder_Operating_System.docx` |
| **Original source path** | `docs/recovered/master-build-pack-v1/original/01_CANONICAL_FOUNDATION/06_VYNE_Founder_Operating_System.docx` |
| **Source SHA-256** | `12273969502792a39774e3b73d0af65c9705b9888eed6337cb72c51eb14eb1fc` |
| **Version / status as stated in the document** | VERSION 0.1 | JULY 2026 | CONFIDENTIAL - INTERNAL OPERATING BLUEPRI |
| **Converted** | 2026-08-02 |
| **Conversion** | text extraction from WordprocessingML; **substantive wording unaltered**; tables flattened to lines; formatting lost |

> **This Markdown is a searchable mirror, not the original source.** The preserved `.docx` is
> authoritative. Where they differ, the original governs.

---

V Y N E S T R A T E G I E S
VOLUME VI
THE FOUNDER OPERATING SYSTEM
CRM, workflow, economics, governance and data architecture
The operating blueprint for running VYNE with discipline before scaling people, technology or volume
FOUNDING PRINCIPLE
The CRM exists for VYNE. It must help the founder know what is true, what matters, what is permitted, what is owed and what must happen next.
VERSION 0.1 | JULY 2026 | CONFIDENTIAL - INTERNAL OPERATING BLUEPRINT
Executive Architecture
The Founder Operating System is the private system of record for VYNE. It coordinates relationships, decisions, permissions, research, models, documents, recruiting activity, economics and institutional learning. It is not the advisor portal and should never expose internal operations merely because the same advisor record supports both environments.
Layer
Primary purpose
Examples
Relationship system
Know every advisor, team, firm and relationship context.
Advisor records, team members, source, ownership, interaction history
Decision system
Track the quality and readiness of the advisor decision.
Framework stage, VYNE's 9, constraints, scorecard, open questions
Commercial system
Run opportunities, recruiters, fees and collections.
Pipeline, placement terms, commission tiers, invoices, clawbacks
Knowledge system
Connect work to the Decision Library and research.
Decision cards, firm intelligence, cases, sources, effective dates
Execution system
Ensure every commitment becomes an owned action.
Tasks, meetings, reminders, permissions, deliverables
Publishing system
Control what becomes advisor-visible.
Draft, reviewed, approved, published, superseded, withdrawn
SYSTEM BOUNDARY
VYNE OS may contain private notes, probabilities, commercial economics and hypotheses. Advisor Studio receives only intentionally approved and published artifacts.
1. Operating Principles
Principle
Operating standard
Single source of truth
Material information must have one authoritative record, an owner and a last-verified date.
Relationship before opportunity
An advisor exists independently of any active placement or transaction.
Decision readiness separate from sales stage
Commercial progress does not prove that the advisor is ready to decide.
Permission before movement
Introductions, submissions, disclosures and publications require recorded authority.
Private by default
New records and notes begin internal unless explicitly classified otherwise.
Economics are auditable
Fees, recruiter compensation, collections, step-ups and clawbacks must reconcile.
Every action has ownership
Tasks require an owner, due date, status and relationship to a record.
Institutional memory
Meetings and outcomes should improve the Library without exposing confidential identities.
PART I - DATA MODEL
The objects, fields and relationships that form the VYNE system of record
2. Core Entity Map
The system should be built around stable objects rather than pages. A page is merely one view of connected records.
Object
What it represents
Primary relationships
Advisor
An individual advisor, prospect, principal or successor.
Team, opportunities, meetings, permissions, decisions, documents
Team / Practice
The economic and operating unit being advised or recruited.
Advisors, households, AUM/T12, ownership, opportunities
Firm / Platform
A current, target or research organization.
Contacts, opportunities, submissions, terms, research
Contact
A person associated with a firm, referral source or service provider.
Organization, activities, permissions
Opportunity
A defined commercial engagement or placement possibility.
Advisor/team, decision, firms, recruiter, fee agreement
Decision
The consequential advisor choice under evaluation.
Decision card, scorecard, models, constraints, deliverables
Activity
A call, meeting, email, note, introduction or research action.
Any major object
Task
A dated commitment owned by a VYNE user or advisor.
Advisor, opportunity, activity, deliverable, model
Permission
Authority to contact, disclose, submit, publish or share.
Advisor/team, firm, artifact, date and scope
Model / Scenario
A versioned economic or operational analysis.
Decision, assumptions, firm, publication record
Document / Artifact
A received, internal or advisor-facing file.
Advisor, opportunity, decision, publication status
Fee Agreement
Commercial terms between VYNE and a hiring firm or client.
Firm, opportunity, fee events
Fee Event
Expected, invoiced, collected, stepped-up, refunded or clawed-back value.
Fee agreement, placement, recruiter commission
Recruiter / User
A VYNE operator with role, access and compensation rules.
Leads, activities, opportunities, commissions
Research Item
A sourced claim, firm fact, market event or capability record.
Firm, decision card, source and review date
Case Record
An anonymized outcome and lesson from an engagement.
Decision Library, decision type, observed result
3. Relationship Rules
A team may contain multiple advisors, but every advisor retains an individual record and individual permissions.
An advisor may have multiple opportunities over time, but only one clearly designated primary active decision unless separate decisions are intentionally concurrent.
An opportunity may compare multiple firms; a firm introduction or submission is a separate permissioned record.
A model belongs to a decision and version. It should not be stored only as an attachment with no structured assumptions.
A published advisor artifact points to its internal source records without copying private notes.
Commercial ownership and relationship ownership are distinct fields when multiple recruiters or sources are involved.
4. Advisor Record
Field
Purpose / rule
Advisor ID
Permanent internal identifier.
Preferred name / legal name
Use preferred name operationally; preserve legal name only where needed.
Current firm / branch / location
Current affiliation and operating location.
Role
Lead advisor, partner, successor, associate, operations leader or other.
Contact information
Email, phone and communication preference.
Source
Referral, inbound, founder-sourced, recruiter-sourced, event, content or other.
Relationship owner
Person accountable for the long-term relationship.
Commercial owner
Person currently entitled to opportunity credit under VYNE rules.
Relationship status
Prospect, active relationship, dormant, client, alumni, do-not-contact.
Confidentiality level
Standard, restricted, founder-only or legally restricted.
Last meaningful contact
System-derived date.
Next relationship action
Highest-priority next step independent of pipeline.
Decision state
Stay, Strengthen, Prepare, Move, Continue Diligence or No Active Decision.
Advisor State
Trust, clarity, readiness, emotional load, team alignment and evidence confidence.
Contact permissions
Channel and scope restrictions.
Restrictions / conflicts
Non-solicit, firm restrictions, prior recruiter claims or other limitations.
5. Team / Practice Record
Field
Purpose / rule
Team name
Operating name or internal neutral label.
Primary advisors
Lead decision-makers and material stakeholders.
Business metrics
T12/TTMP, AUM, households, recurring revenue, growth and data date.
Ownership structure
Current ownership percentages, voting and succession expectations.
Service model
Client segments, staffing and delivery approach.
Client concentration
Material concentration or portability considerations.
Team alignment
Aligned, mixed, divided, unknown and summary.
Current strengths
Capabilities that any decision must protect.
Persistent tensions
Structural or recurring problems.
Future-state priorities
Linked to approved mandate.
Data confidence
Verified, advisor-reported, estimated or stale.
6. Firm / Platform Record
Field
Purpose / rule
Firm identity
Legal/operating name, channel and ownership.
Relationship status
Contracted, active, research-only, restricted or inactive.
Geography
Markets, branches and recruiting coverage.
Advisor model
Employee, independent employee, contractor, RIA, aggregator or other.
Economics
Payout, grids, fees, overhead, transition terms and effective date.
Capabilities
Planning, banking, lending, alternatives, technology, custody, operations and specialist support.
Ideal advisor profile
Production, AUM, team, market and strategic fit.
Known constraints
Minimums, product limits, geography, legal or recruiting restrictions.
Key contacts
Recruiting, leadership, transition and diligence contacts.
Contract terms with VYNE
Fee percentage, step-ups, exclusions, payment timing and clawback.
Research confidence
Source quality, verified date and open claims.
Internal assessment
Strengths, risks and fit hypotheses; never advisor-visible by default.
7. Opportunity Record
Field
Purpose / rule
Opportunity ID / name
Neutral internal label.
Advisor / team
Primary relationship object.
Opportunity type
Placement, consulting, succession, acquisition, sale, capital or other.
Commercial stage
Prospect, Contacted, Conversation Started, Qualified, Active Evaluation, Firm Discussions, Due Diligence, Offer/Negotiation, Committed, Transitioning, Placed, On Hold, Staying, Closed/Lost.
Decision readiness
Separate scorecard and current decision stage.
Owner / contributors
Commercial owner, relationship owner and supporting users.
Estimated economics
Verified T12, fee rate, expected fee, probability and timing.
Source and lead ownership
Timestamped source record and adjudication notes.
Restrictions
No-call firms, personal non-competes and permissions.
Current target set
Approved firms or alternative paths under evaluation.
Next decisive action
The action most likely to improve decision quality or advance the engagement.
Close / pause reason
Structured reason and narrative.
PART II - WORKFLOW
How VYNE moves work through relationships, decisions and commercial execution
8. Commercial Pipeline
Stage
Entry standard
Exit / gate
Prospect
Relevant advisor identified; no meaningful interaction yet.
Contact attempted or relationship intentionally deferred.
Contacted
Personal outreach has occurred.
Response or defined follow-up cadence.
Conversation Started
Two-way dialogue with substantive context.
Qualification completed.
Qualified Advisor
Business profile and meaningful decision/tension established.
ROOT/active evaluation begins or nurture path chosen.
Active Evaluation
Advisor authorizes structured discovery and analysis.
Credible alternatives and diligence plan established.
Firm Discussions
Specific firms or channels are authorized for discussion.
Due diligence or offer work begins.
Due Diligence
Decision-changing claims are being verified.
Evidence sufficient for negotiation or decision.
Offer / Negotiation
Material terms are available and being evaluated.
Commit, stay, pause or close.
Committed
Advisor has made and authorized the decision.
Implementation begins.
Transitioning
Implementation is active.
Placement/engagement completion.
Placed
Start or closing occurred; fee events activated.
Post-placement review or clawback period ends.
On Hold
Specific reason and follow-up date documented.
Reactivation or closure.
Staying
Advisor chose stay/strengthen; review triggers recorded.
Future trigger or new decision.
Closed / Lost
No active commercial work.
Reopen only through a new dated opportunity.
9. Decision Readiness Track
The commercial stage and the advisor decision track must appear together but never collapse into one status.
Decision dimension
Possible state
Evidence required
Reality
Not started / Partial / Complete
Current facts, strengths and tensions.
Direction
Not started / Partial / Complete
Priorities, non-negotiables and success definition.
Constraints
Not started / Partial / Complete
Fixed, negotiable and unknown barriers.
Alternative set
Not started / Partial / Complete
Credible stay, strengthen, prepare and change paths.
Economics
Not started / Partial / Complete
Versioned model and sensitivities.
Client impact
Not started / Partial / Complete
Benefit, disruption, transfer and service implications.
Team alignment
Unknown / Mixed / Aligned
Stakeholder readiness and conflicts.
Diligence
Not started / Partial / Complete
Decision-changing claims verified or disclosed.
Decision ownership
Not ready / Emerging / Ready
Advisor can explain accepted trade-offs and conditions.
10. Activity System
Activity type
Required fields
Automatic outcomes
Call / conversation
Date, participants, purpose, summary, permission and next step.
Update last contact; create tasks; optionally update Advisor State.
Meeting
Type, agenda, notes, Framework progress, decision gate and outputs.
Create meeting record and deliverable workflow.
Email
Direction, participants, subject, summary and linked record.
Update activity history; detect promised follow-up.
Firm introduction
Advisor permission, firm, contact, scope and date.
Create submission/interaction record.
Research
Question, source, finding, confidence and effective date.
Update firm or decision evidence.
Internal note
Author, confidentiality and linked object.
Never advisor-visible without rewritten publication.
Model review
Version, scenarios, assumptions changed and conclusions.
Update model status and publication readiness.
11. Task System
Every task has one accountable owner, even when multiple contributors are listed.
Every task is linked to at least one advisor, opportunity, decision, firm, model or artifact.
A task includes due date, priority, status, source activity and completion evidence.
Overdue tasks appear by relationship importance and decision impact, not merely age.
Automations may propose tasks but should not mark consequential work complete.
Advisor-facing tasks are separately permissioned and published.
12. Permission System
Permission type
Scope example
Required record
Contact
May VYNE contact the advisor and through which channels?
Grantor, channel, date, restrictions and revocation.
Disclosure
May VYNE share specified advisor information?
Recipient, fields/documents, purpose and expiration.
Firm introduction
May VYNE identify the advisor to a named firm?
Firm, contact, scope and date.
Submission
May VYNE formally submit the opportunity under a fee agreement?
Firm, advisor/team, source and owner.
Document access
Who may see or download an artifact?
Audience, duration and classification.
Publication
May a reviewed artifact appear in Advisor Studio?
Artifact version, approver and audience.
AI processing
May information be processed through approved tools?
Data class, tool boundary and purpose.
PERMISSION RULE
Silence, prior access or an active opportunity is not permission. Scope and recipient must be explicit.
PART III - COMMERCIAL ENGINE
Lead ownership, recruiter operations, fees, collections and commissions
13. Lead Ownership
Lead ownership must be timestamped, evidence-based and governed by written policy. Relationship value should not be reduced to name submission.
Field / event
Rule
Lead submission
Requires name/team, firm, source, date, basis and known relationship.
Acceptance
Founder or designated reviewer confirms ownership or requests evidence.
VYNE-generated lead
Assigned by founder; assignment does not necessarily convey permanent relationship ownership.
Duplicate claim
Resolve using prior meaningful activity, permission, recency and contribution - not first name entry alone.
Dormancy
Ownership may be reviewed after defined inactivity and no documented relationship plan.
Inbound advisor
Default VYNE-owned unless evidence supports an existing recruiter relationship.
Dispute
Founder has final internal determination under the compensation agreement.
14. Recruiter Record and Performance
Field
Purpose / rule
User identity / role
Recruiter, founder, partner, operations or finance.
Employment / contractor entity
Contracting party and payment details.
Active restrictions
Personal non-compete, prohibited firms or markets.
Lead portfolio
Owned, assigned and supporting relationships.
Activity quality
Meaningful conversations, meetings, notes and follow-through.
Pipeline contribution
Verified T12 by stage, probability and expected timing.
Placements
Hire date, firm, verified T12 and fee basis.
Commission plan version
Applicable agreement and effective dates.
T&E budget
Approved amount, spend and exceptions.
Quality measures
CRM completeness, permission compliance, advisor experience and clawback rate.
15. Fee Agreement
Field
Purpose / rule
Hiring firm / legal entity
Entity responsible for payment.
Effective dates
Contract term and renewal.
Base fee
Percentage or fixed fee and calculation definition.
Step-up terms
Threshold, measurement period, incremental fee and payment timing.
Verified production definition
T12/TTMP source and verification process.
Exclusions
Existing candidates, protected lists, geography or channels.
Invoice timing
Trigger and payment due date.
Clawback
Duration, event, amount and repayment terms.
Ownership / submission rules
How candidate credit is established.
Documentation
Signed agreement, amendments and correspondence.
16. Fee and Commission Events
Event
System treatment
Expected fee
Forecast only; calculated from current verified production and contract terms.
Earned fee
Placement or contractual trigger occurred.
Invoiced fee
Invoice number, amount, date and due date recorded.
Collected fee
Cash received and matched to invoice.
Step-up earned
Threshold event creates incremental receivable.
Clawback notice
Potential reversal recorded with status and evidence.
Refund / repayment
Cash movement reconciled to original fee.
Recruiter commission accrued
Calculated only under applicable agreement and event rules.
Recruiter commission payable
Payment condition satisfied, such as VYNE receipt plus waiting period.
Recruiter commission paid
Payment date, amount and supporting statement.
17. Recruiter Commission Logic
The system must support versioned plans rather than hard-coding a single percentage. The following reflects the current policy concepts and should remain configurable.
Rule
System requirement
Calendar-year tiers
Track each recruiter's verified placed T12 by hire date within the same calendar year.
Tier schedule
Support thresholds such as $0-$3M, $3-$5M and $5-$10M with plan-specific percentages.
Fee basis
Commission percentage applies to the VYNE fee actually earned under the agreement.
Initial payment
Pay only after VYNE receives the initial firm payment and the agreement waiting period expires.
Step-up differential
Calculate incremental commission after VYNE receives step-up proceeds and the applicable delay expires.
Clawback
Create proportional recruiter receivable when VYNE repays or loses the corresponding fee.
Source categories
Support recruiter-sourced and VYNE-generated economics where plan terms differ.
Manual override
Founder-only, with reason, approval and audit entry.
ACCOUNTING CONTROL
Forecast, accrued, payable and paid are different states. The dashboard must not treat expected fees as cash.
PART IV - KNOWLEDGE, MODELS AND DOCUMENTS
How evidence becomes analysis and analysis becomes a controlled advisor artifact
18. Research and Evidence Registry
Field
Purpose / rule
Claim
Specific fact or representation being evaluated.
Category
Firm, channel, economics, capability, leadership, policy, market or legal.
Source
URL, document, person, call or internal record.
Source quality
Primary, authoritative secondary, reported, anecdotal or unverified.
Effective / observed date
When the claim applies.
Confidence
Verified, high, medium, low or contradicted.
Decision impact
Critical, material, useful or background.
Related objects
Firm, decision card, model assumption or opportunity.
Review date
When re-verification is required.
Conflicting evidence
Linked claims and resolution status.
19. Model and Scenario Record
Field
Purpose / rule
Model ID / version
Permanent identifier and immutable published versions.
Decision / advisor
The active decision and authorized subject.
Scenario type
Stay, move, supported independence, RIA, acquisition, sale, succession or capital.
Inputs
Structured values with source, date and classification.
Assumption class
Advisor-provided, firm-provided, VYNE assumption, tax/legal assumption or formula.
Outputs
Income, cash, taxes, ownership, enterprise value, risk and other decision metrics.
Sensitivity cases
Downside, base, upside and decision-changing variables.
Internal conclusion
Private interpretation and open issues.
Publication status
Draft, reviewed, approved, published, superseded or withdrawn.
Export snapshot
Advisor-safe PDF/report linked back to the exact version.
20. Document and Artifact Classification
Class
Examples
Default visibility
Internal note
Consultant hypotheses, recruiter commentary, dispute notes.
Internal only.
Evidence
Statements, term sheets, firm materials, advisor documents.
Restricted; publish only when appropriate.
Working analysis
Draft models, comparisons, research synthesis.
Internal only.
Advisor deliverable
Current Reality, Future-State, VYNE's 9, scorecard, Decision Record.
Eligible for controlled publication.
Commercial document
Fee agreement, invoice, commission statement.
Founder/finance/restricted.
Legal / privileged
Counsel communications or protected materials.
Explicit restricted access.
Case learning
Anonymized lesson and outcome.
Internal Library; external only after approval.
21. Controlled Publishing Workflow
Status
Required action
Visibility
Draft
Owner creates or updates internal artifact.
Internal.
Reviewed
Qualified person checks accuracy, privacy and assumptions.
Internal.
Approved
Named approver authorizes a specific audience and version.
Eligible.
Published
Artifact becomes visible in Advisor Studio or delivered externally.
Authorized audience.
Superseded
A newer version replaces the prior version without erasing history.
As configured.
Withdrawn
Visibility removed due to error, permission change or changed facts.
Not visible; reason retained.
PART V - USERS, SECURITY AND GOVERNANCE
Who can see, change, approve and export information
22. Role Architecture
Role
Primary access
Restricted from
Founder / System Owner
All records, settings, ownership disputes, economics and approvals.
None except technically protected secrets.
Managing Partner
Assigned relationships, firms, decisions, models and approved economics.
Founder-only disputes/settings unless delegated.
Recruiter
Assigned advisors, opportunities, activities, approved firm and fee information needed to work.
Other recruiters' private notes, full firm economics and finance data.
Operations
Workflow, tasks, documents, meeting records and data quality.
Founder notes and compensation unless required.
Finance
Fee agreements, invoices, collections, commissions and reporting.
Advisor-sensitive notes not needed for finance.
Research / Analyst
Research items, firms, models and assigned cases.
Commercial ownership and private relationship notes.
Advisor
Published artifacts, shared tasks, secure uploads and own workspace.
All internal operating data.
External professional
Specific document or task access for defined purpose and period.
All unrelated records.
23. Audit Requirements
Create, edit, delete, export, permission and publication events require user and timestamp.
Changes to lead ownership, fee terms, commission amounts and model assumptions require change history.
Downloads of restricted advisor documents should be logged.
Published versions must remain reproducible even after internal source data changes.
Administrative impersonation of an advisor workspace, if enabled, must be visibly marked and logged.
No permanent deletion of financial or permission records without a documented retention rule.
24. Data Quality Rules
Data condition
Treatment
Verified
Source and date support current use.
Advisor-reported
Use with attribution until independently verified where necessary.
Estimated
May support exploration but must be labeled in models.
Stale
Visible warning; cannot support a final decision without review when material.
Conflicted
Multiple sources disagree; preserve both and assign resolution.
Missing
Create open evidence item when decision-relevant.
25. AI Operating Boundary
AI may
AI may not
Draft meeting preparation from approved records.
Make or publish the final advisor recommendation autonomously.
Summarize calls and propose structured fields.
Convert internal private notes directly into advisor-facing language without review.
Identify missing evidence and overdue diligence.
Invent firm facts, compensation terms or permission.
Generate first drafts of deliverables and model explanations.
Override lead ownership, fees, commission or security settings.
Check records against canonical Library standards.
Send, disclose or submit advisor information without authorized human action.
PART VI - DASHBOARDS AND REPORTING
The views the founder needs to run VYNE every day
26. Founder Dashboard
Panel
What it answers
Relationship attention
Which high-value relationships need meaningful contact now?
Active decisions
Where are advisors in Reality, Direction, Constraints and Choice?
Pipeline
What is active, likely, stalled or at risk?
Next decisive actions
What specific action would most improve each top opportunity?
Permissions at risk
Which introductions, disclosures or publications lack or approach expiration?
Economic forecast
Expected, earned, invoiced, collected and at-risk fees.
Recruiter performance
Activity quality, verified pipeline, placements, collections and data discipline.
Operational risk
Overdue tasks, stale evidence, unreviewed models and unresolved conflicts.
Advisor experience
Deliverables due, meeting follow-up time and open advisor actions.
27. Recruiter Dashboard
Panel
Measures
My relationships
Assigned advisors, relationship age, last contact and next action.
My opportunities
Stage, decision readiness, probability and timing.
My activity quality
Meaningful conversations, meetings, follow-through and CRM completeness.
My economics
Placed T12, tier progress, accrued/payable/paid commission.
My restrictions
Firms and prospects not permitted for outreach.
My tasks
Prioritized by decision impact and due date.
28. Finance Dashboard
Panel
Measures
Receivables
Invoices, aging, expected collection and disputes.
Collections
Cash by firm, opportunity and period.
Step-ups
Threshold progress, earned amounts and expected timing.
Clawback exposure
Open windows, notices, reserves and recruiter recourse.
Commission liability
Accrued, payable, paid and disputed amounts.
Contract coverage
Opportunities without valid fee agreement or submission evidence.
29. Standard Reports
Weekly Founder Operating Review: top relationships, active decisions, pipeline changes, tasks, permissions and risks.
Monthly Commercial Review: stage movement, verified T12, expected fees, conversion and source performance.
Monthly Finance Review: earned, invoiced, collected, step-up, commission and clawback reconciliation.
Quarterly Relationship Review: dormant high-value advisors, alumni, referral sources and stay/strengthen follow-ups.
Quarterly Knowledge Review: stale firm claims, repeated case lessons and Decision Library updates.
PART VII - BUILD SPECIFICATION
The practical path from current prototype to a secure, scalable system
30. Prototype vs. Production
Capability
Prototype standard
Production standard
Storage
Local or controlled test data only.
Encrypted managed database with backups and recovery.
Authentication
Simple passcode for private demonstration.
Individual accounts, MFA, secure recovery and session controls.
Permissions
UI-level or coarse role checks.
Server-enforced row/document permissions.
Files
Local attachments or links.
Encrypted object storage, malware scanning and audit.
Advisor access
Presentation/export only.
Separate Advisor Studio identity and publishing service.
Integration
Manual save/export.
Controlled API/event integration.
Audit
Basic timestamps.
Immutable security, permission, financial and publication logs.
PRODUCTION WARNING
The single-file application is appropriate for prototyping and demonstration. It should not be treated as secure production infrastructure for confidential advisor data.
31. Build Phases
Phase
Scope
Exit condition
1 - Canonical data dictionary
Lock objects, fields, statuses, permissions and calculation definitions.
Approved schema and naming standard.
2 - Founder core CRM
Advisor, team, firm, opportunity, activity and task workflows.
Founder can run the relationship and pipeline system daily.
3 - Decision layer
Framework, VYNE's 9, scorecard, constraints and Decision Record.
Every active opportunity has decision-readiness tracking.
4 - Modeling and artifacts
Versioned scenarios, evidence and branded deliverables.
Approved model can be saved and exported reproducibly.
5 - Commercial engine
Fee agreements, submissions, invoices, collections and commissions.
Economics reconcile from placement to payment.
6 - Controlled publishing
Artifact review, approval, publication and withdrawal.
No advisor-visible content bypasses the workflow.
7 - Advisor Studio
Separate advisor experience for published models, files, tasks and decisions.
Pilot advisor can securely use own workspace.
8 - Automation and AI
Task suggestions, summaries, QA and Library retrieval.
Human-controlled agents improve speed without weakening governance.
32. Minimum Viable Founder OS
The first operational release should be intentionally narrower than the full blueprint.
Advisor and team records with relationship ownership, source and restrictions.
Firm database with contacts, fee agreement status and research confidence.
Opportunity pipeline plus separate decision-readiness track.
Activities, tasks, meeting notes and next decisive action.
Permission records for firm introductions and publications.
Model snapshot and document linking rather than a full calculation engine at first.
Placement, expected fee, invoice, collection and recruiter commission records.
Founder dashboard and weekly operating review.
33. Non-Negotiable Acceptance Tests
A recruiter cannot see another recruiter's founder-only notes.
An advisor cannot access any record that has not been explicitly published to that advisor.
A firm submission cannot be recorded without advisor permission and a valid firm/opportunity relationship.
A published model can be reproduced with its exact assumptions and version.
Expected, invoiced, collected and paid amounts reconcile without manual spreadsheet interpretation.
A lead ownership change preserves the original claim and decision history.
An overdue decision-changing evidence item appears on the founder dashboard.
A withdrawn artifact is no longer advisor-visible but remains auditable internally.
34. Immediate Next Build
RECOMMENDED IMPLEMENTATION
Use this volume to revise the existing VYNE single-file platform into a Founder OS prototype. Build the canonical object structure and founder dashboard first; keep the advisor model in a separate workspace with controlled exports until secure Advisor Studio infrastructure is ready.
Appendix A - Canonical Status Dictionary
Domain
Statuses
Relationship
Prospect; Active Relationship; Dormant; Client; Alumni; Do Not Contact
Opportunity
Prospect; Contacted; Conversation Started; Qualified Advisor; Active Evaluation; Firm Discussions; Due Diligence; Offer/Negotiation; Committed; Transitioning; Placed; On Hold; Staying; Closed/Lost
Decision
No Active Decision; Reality; Direction; Constraints; Choice; Implementation; Review
Decision State
Stay; Strengthen; Prepare; Move; Continue Diligence
Artifact
Draft; Reviewed; Approved; Published; Superseded; Withdrawn
Fee
Expected; Earned; Invoiced; Collected; Disputed; Refunded; Clawed Back
Commission
Forecast; Accrued; Payable; Paid; Reversed; Disputed
Task
Open; In Progress; Waiting; Completed; Cancelled
Evidence
Verified; Advisor-Reported; Estimated; Stale; Conflicted; Missing
Appendix B - Weekly Founder Operating Review
Field
Purpose / rule
Top five relationships
Why each matters and next meaningful action.
Active decision changes
Movement in readiness, constraints or recommendation.
Pipeline changes
New, advanced, stalled, committed, placed or closed.
Firm activity
Introductions, diligence, offers and unresolved claims.
Economic changes
Expected fee, invoices, collections, step-ups and clawbacks.
Permission / security issues
Missing, expiring, revoked or improperly scoped access.
Operational risk
Overdue tasks, stale data, model review or document issues.
Decisions required from founder
Ownership disputes, approvals, exceptions and priorities.
Appendix C - Record Creation Checklist
Create advisor and team separately when multiple stakeholders exist.
Capture source, timestamp and relationship owner at first creation.
Document known restrictions before outreach or assignment.
Create an opportunity only when a specific commercial or consulting scope exists.
Create a Decision record when the consequential question is clear.
Record permission before firm identification, submission or publication.
Link every model and artifact to the applicable decision and version.
Close or pause records with a structured reason and next review date.
Appendix D - Change Log
Version
Date
Status
Summary
0.1
July 2026
Founding blueprint
Establishes the VYNE Founder Operating System architecture, canonical objects, workflows, permissions, commercial engine, security roles, dashboards and staged implementation plan.
Closing Standard
THE FOUNDER TEST
At any moment, VYNE OS should allow the founder to answer five questions: What is true? What matters? What is permitted? What is owed? What happens next?