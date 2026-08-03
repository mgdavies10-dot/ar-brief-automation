```
SEARCHABLE MARKDOWN MIRROR — NOT THE ORIGINAL SOURCE
Recovered material. Do not edit. Do not treat as canonical without the status below.
```

# VYNE AI Agent Operating System

| | |
|---|---|
| **Original filename** | `VYNE_AI_Agent_Operating_System.docx` |
| **Original source path** | `docs/recovered/master-build-pack-v1/original/02_PRODUCT_AND_TECHNICAL_SPECS/VYNE_AI_Agent_Operating_System.docx` |
| **Source SHA-256** | `c3ee5cb21c67c6b917c42dae2979623b915bdb9577bbbfbd06efd614eeeff90d` |
| **Version / status as stated in the document** | Version 1.0 | July 2026 |
| **Converted** | 2026-08-02 |
| **Conversion** | text extraction from WordprocessingML; **substantive wording unaltered**; tables flattened to lines; formatting lost |

> **This Markdown is a searchable mirror, not the original source.** The preserved `.docx` is
> authoritative. Where they differ, the original governs.

---

VYNE STRATEGIES
AI Agent Operating System
Governed agent roles, permissions, workflows, approval gates and phased implementation for a lean VYNE organization
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Version 1.0 | July 2026
Companion to the CRM Schema, Website Technical Specification and Internal Operating Manual
Working technical specification. Architecture, privacy, cybersecurity, legal and regulatory decisions require qualified review before production use.
Contents
01 Executive operating decision
02 Agent principles and governance
03 Shared architecture and case memory
04 Human approval matrix
05 Agent registry
06 Chief of Staff Agent
07 Pipeline and CRM Agent
08 Meeting Intelligence Agent
09 Firm Intelligence Agent
10 Content and AEO Agent
11 Newsletter and Nurture Agent
12 Enterprise Economics Agent
13 Portability Analysis Agent
14 Continuity Matching Agent
15 Placement, Finance and Governance Agents
16 Cross-agent workflows
17 Evaluation, monitoring and incident response
18 Implementation roadmap and acceptance
01 Executive Operating Decision
Recommended operating model
Build VYNE agents as permissioned copilots that prepare, extract, organize and recommend. Do not create autonomous agents that can expose an advisor identity, submit a lead, send deal requests, publish a placement, delete records or move money without explicit human approval.
The purpose of the agent system is to let one founder operate with the discipline of a larger organization. The purpose is not to imitate judgment, outsource accountability or create the appearance of a staff that does not exist.
Expected benefit
Reduce administrative follow-up and incomplete CRM records.
Prepare higher-quality meetings and advisor communications.
Turn firm and proposal information into structured, source-dated intelligence.
Maintain a consistent content and newsletter operating rhythm.
Surface risks, deadlines and stalled cases each morning.
Delay hiring until real demand exceeds a governed automation system.
Honest limitation
Agents will not create trust by themselves. They can improve speed and consistency, but poor source data, weak advisor relationships, unclear firm agreements and limited distribution remain business constraints.
02 Agent Principles and Governance
Human accountable owner for every agent and every external action.
Least privilege: agents read and write only the records needed for the approved task.
Source-grounded outputs: cite record IDs, documents, dates and confidence.
Draft by default: generated material is unapproved until a person accepts it.
No silent memory: material facts enter the CRM only through visible proposed updates.
Case isolation: one advisor case cannot leak into another output.
Data minimization: prompts exclude unnecessary names, CRDs and holdings.
Model portability: workflows do not depend on one LLM vendor where avoidable.
Auditability: log prompt template version, inputs, tools, model, output and approval.
Fail closed: if identity, permission or data classification is unclear, do not act.
Risk framework
Use NIST AI RMF concepts to govern, map, measure and manage the system. Use OWASP GenAI guidance to address prompt injection, sensitive-information disclosure, insecure tool use and excessive agency. These are operating references, not certification claims.
03 Shared Architecture and Case Memory
Component
Purpose
Agent orchestrator
Receives approved trigger, selects agent, enforces permissions and routes output
CRM source of truth
Advisor, case, opportunity, task and intelligence records
Document service
Secure retrieval of approved files with content scanning and access logging
Knowledge index
Searchable chunks with record-level permissions and source metadata
Tool gateway
Approved actions such as create draft task, not unrestricted database access
Approval queue
Human review for proposed CRM changes and all external actions
Evaluation store
Test cases, expected outputs, scores and incident records
Audit log
Agent, template version, model, inputs, sources, tool calls and final disposition
Memory rules
The CRM remains the source of truth; chat history is not the permanent case record.
Agents retrieve only authorized case data using scoped IDs.
Firm-wide intelligence and case-specific confidential representations are stored separately.
Approved summaries may be written back; raw model reasoning is not required as a record.
Sensitive prompt and output retention follows the underlying case retention policy.
04 Human Approval Matrix
Action
Agent may prepare
Human approval required
Agent prohibited
Internal morning brief
Yes
Review optional before personal use
Send externally
Create/update task
Propose
Yes for material deadline changes
Close case autonomously
Advisor follow-up email
Draft
Yes before send
Send sensitive message
Firm submission
Prepare packet
Advisor authorization plus VYNE approval
Reveal identity or submit
Proposal review
Extract and model
Human validates terms and conclusions
Negotiate or accept
Article / LinkedIn post
Draft and source
Editorial/compliance approval
Auto-publish regulated claim
Placement announcement
Draft
Advisor and firm approval
Publish before effective join
Portability analysis
Classify and aggregate
Analyst reviews unknowns and assumptions
Guarantee transfer
Fee tracking
Calculate expected amount
Finance confirms invoice/payment
Send invoice or transfer funds without approval
Record deletion
Identify eligible records
Authorized privacy/admin approval
Delete autonomously
05 Agent Registry
Agent
Primary job
Launch phase
Chief of Staff
Daily priorities, risks and cross-workflow orchestration
1
Pipeline and CRM
Data quality, stage aging, next actions and workflow hygiene
1
Meeting Intelligence
Preparation, transcript/note summary and follow-up drafts
1
Firm Intelligence
Source-dated firm profiles and conflict/staleness alerts
1
Content and AEO
Editorial planning, research briefs, drafts and performance learning
1
Newsletter and Nurture
Monthly report assembly and permissioned segmentation
2
Enterprise Economics
Proposal extraction, scenario models and advisor question briefs
2
Portability Analysis
De-identified classification and firm compatibility analysis
3
Continuity Matching
Private buyer/seller/successor/talent match recommendations
4
Placement and Press
Approval-controlled announcements and placement page updates
2
Finance and Fee
Agreement-based fee forecasts, invoices, payments and clawbacks
2
Data Governance
Consent, access, retention and sensitive-output monitoring
1
06 Chief of Staff Agent
Mission
Produce a concise daily operating brief and coordinate suggested work across agents without taking external action.
Inputs
Today and next-seven-day meetings.
Overdue and high-priority tasks.
Active cases with missing next actions or stage aging.
Firm responses and proposal deadlines.
Expected fee events and approval queues.
Content deadlines and website alerts.
Output sections
Section
Example
Decisions needed
Approve Firm B submission packet; choose whether to travel for finalist meeting
Advisor priorities
UBS case proposal review; nurture call tied to deferred-comp vesting
Firm follow-up
Two submissions unacknowledged beyond service target
Revenue and risk
Step-up verification due; one clawback window remains open
Authority engine
Newsletter draft due; article has outdated source
Suggested time blocks
90 minutes economics review; 45 minutes advisor follow-up
Controls
Never expose confidential advisor details in notifications outside the approved channel.
Distinguish facts, agent suggestions and items awaiting verification.
Link every brief item to the CRM task or record.
07 Pipeline and CRM Agent
Core workflows
Identify active records without a next action, owner or due date.
Propose stage updates based on completed evidence but never advance automatically when authorization is involved.
Detect duplicate people and organizations for human merge review.
Generate weekly pipeline aging, source and conversion summaries.
Create nurture-task suggestions based on milestones and interests.
Flag missing submission consent, stale advisor figures and unresolved firm responses.
Output quality rules
Use case-specific stage definitions from the status configuration.
Do not infer T12, AUM or timing from unrelated records.
Explain the evidence supporting any proposed stage change.
Never convert a marketing subscriber into a prospect solely from page views.
08 Meeting Intelligence Agent
Pre-meeting brief
Block
Required content
Purpose
The decision or information the meeting must advance
Advisor context
Vision, objectives, current stage and latest changes
Open questions
Missing facts and unresolved representations
Suggested questions
Prioritized, concise and tied to framework
Do not overcover
Items that belong in later meetings
Next-step target
Expected decision, data request or meeting
Post-meeting workflow
Ingest approved notes or transcript.
Separate advisor statements, firm representations, decisions and VYNE analysis.
Draft a summary and proposed CRM updates.
Extract commitments, owners and due dates.
Identify conflicts with prior intelligence.
Draft the advisor follow-up for human approval.
Failure controls
Never treat a transcript transcription error as fact.
Do not create legal, tax or contractual conclusions.
Mark uncertainty when participants or speakers cannot be resolved.
09 Firm Intelligence Agent
Mission
Convert approved public sources, firm materials, advisor experience and VYNE meetings into atomic intelligence items with source, scope, date and confidence.
Workflows
Monitor firm public pages, filings and approved industry sources for changes.
Extract potential updates and compare them to current firm records.
Flag stale economics, leadership and platform information.
Identify conflicting statements rather than selecting the most attractive one.
Prepare firm briefing books for active advisors using only authorized data.
Suggest questions that test uncertain or case-specific claims.
Prohibited behavior
Publishing unverified deal terms.
Generalizing one advisor exception into a firm standard.
Combining confidential advisor identities into public research.
Scraping or using sources in violation of access terms.
10 Content and AEO Agent
Mission
Create research briefs and human-reviewable drafts that answer real advisor questions and strengthen VYNE authority. It is not a bulk content generator.
Monthly operating loop
Analyze advisor questions, search/AI citation reports, newsletter engagement and pipeline themes.
Propose a small editorial plan tied to VYNE pillars and commercial intent.
Create a research brief using current authoritative and primary sources where possible.
Draft article, direct-answer summary, tables, FAQs and LinkedIn adaptations.
Run source and claim checks; flag unsupported or time-sensitive language.
Submit for founder/editorial approval and schedule a review date.
Measure citations, qualified visits and relationship outcomes - not volume alone.
Content controls
No fabricated advisor examples presented as real.
No claim that VYNE is leading, unbiased or trusted without support and appropriate disclosure.
No mass production of near-duplicate pages.
Public firm content differentiates sourced facts from VYNE analysis.
11 Newsletter and Nurture Agent
Mission
Assemble the monthly VYNE Advisor Intelligence Report and suggest relationship-specific follow-up based on permissioned interests and milestones.
Functions
Compile approved Vision, Objectives, Navigate, Enterprise Economics and Continuity sections.
Segment subscribers by declared interest rather than inferred sensitive attributes.
Identify high-intent interactions for human review.
Draft milestone-based check-ins for deferred compensation, succession timing or prior “prepare” cases.
Suppress unsubscribed contacts and respect channel preferences.
Report which content produces qualified conversations, not merely opens.
12 Enterprise Economics Agent
Inputs
Current compensation baseline and as-of dates.
Written proposal and supporting schedules.
VYNE firm agreement excluded from advisor model unless directly relevant to disclosure.
Advisor-selected assumptions for portability, growth, expenses and timing.
Outputs
Output
Human validation
Term extraction table
Confirm every material value against page/section source
Guaranteed versus contingent map
Validate definitions and all-or-nothing hurdles
Five/ten/fifteen-year scenarios
Review formulas, taxes excluded or professional assumptions
Sensitivity analysis
Advisor accepts downside/base/upside assumptions
Questions for firm
Advisor chooses what to ask and communicates directly
Equity/ownership summary
Counsel reviews binding rights and restrictions
Hard boundary
VYNE support boundary
The agent may prepare a negotiation brief. It may not contact the firm, counter, accept, reject or characterize legal meaning as settled.
13 Portability Analysis Agent
Mission
Classify approved de-identified positions and compare them with source-dated firm compatibility rules, while making uncertainty explicit.
Workflow
Validate file schema and reject prohibited client identifiers.
Classify account and product types with confidence scores.
Match positions to compatibility rules for each approved destination.
Identify unknowns, lending dependencies, alternatives, restrictions and likely conversion needs.
Calculate aggregate asset and revenue ranges under advisor-selected assumptions.
Generate a review queue for every material unknown or low-confidence classification.
Produce an analyst-approved report with disclaimers and source dates.
Never claim
That a book will transfer.
That a client will follow.
That a firm will accept a product without current confirmation.
That de-identified analysis replaces legal, operational or client-specific diligence.
14 Continuity Matching Agent
Mission
Recommend possible buyer, seller, successor, junior-advisor and team matches from verified private profiles. It does not automatically reveal identities or create introductions.
Match dimensions
Geography and client market.
Business model and firm compatibility.
Practice size, revenue mix and service capacity.
Investment and planning philosophy.
Succession timing and ownership expectations.
Culture, role, economics and development expectations.
Known conflicts, restrictions and confidentiality constraints.
Approval sequence
Agent proposes anonymous match -> VYNE reviews -> Party A approves limited profile -> Party B approves -> confidentiality/consent recorded -> VYNE schedules introduction.
15 Placement, Finance and Governance Agents
Placement and Press Agent
Draft internal placement summary and public announcement options.
Verify effective join/registration condition from authorized source.
Require advisor and firm approval for name, quotes and economics references.
Update placement page only after final approval.
Finance and Fee Agent
Read firm agreement version and calculate expected fee events.
Prepare invoice draft and payment follow-up tasks.
Track step-up thresholds, recruiter commission and clawback exposure.
Reconcile payment evidence; human approves accounting status.
Data Governance Agent
Check consent before submissions, analysis and publication workflows.
Flag prohibited identifiers in uploads and prompts.
Identify stale access and retention deadlines.
Review agent outputs for cross-case leakage and sensitive disclosure.
Create incident record and disable workflow when required.
16 Cross-Agent Workflows
A. Morning brief
Pipeline Agent checks stages and tasks -> Finance Agent checks fee events -> Content Agent checks deadlines -> Governance Agent checks approvals -> Chief of Staff composes a prioritized brief with source links.
B. Advisor meeting
Meeting Agent prepares brief -> human conducts meeting -> Meeting Agent drafts notes and tasks -> Pipeline Agent proposes stage updates -> human approves -> Chief of Staff schedules resulting work.
C. Proposal review
Document service provides approved proposal -> Economics Agent extracts terms -> Governance Agent checks scope -> human validates -> model is created -> Meeting Agent prepares advisor review -> advisor directs any firm questions.
D. Article production
Content Agent proposes brief -> Firm Intelligence Agent supplies dated facts -> human approves sources -> draft created -> editorial review -> publication -> analytics ingested -> next content plan informed by qualified outcomes.
E. Placement announcement
Pipeline marks placement condition -> Finance confirms contract event -> Press Agent drafts -> Governance checks permissions -> advisor and firm approve -> human publishes.
17 Evaluation, Monitoring and Incident Response
Agent evaluation scorecard
Dimension
Measure
Grounding
Percentage of material claims linked to correct source record
Accuracy
Field extraction and calculation error rate
Confidentiality
Cross-case leakage and prohibited-data incidents
Action safety
Unauthorized action attempts and approval bypasses
Usefulness
Human acceptance/edit rate and time saved
Consistency
Output adherence to template and VYNE framework
Freshness
Use of current versus stale firm intelligence
Business impact
Reduction in overdue work, faster proposal review, qualified content conversions
Preproduction tests
Prompt-injection documents instructing the agent to expose or change data.
Two similar advisor cases designed to test cross-case isolation.
Conflicting deal terms and obsolete firm information.
Proposal with ambiguous percentages and missing schedules.
Upload containing names/account numbers to verify rejection or quarantine.
Attempted external action without approval.
Model or tool outage and safe fallback.
Incident response
Stop or disable the affected agent/tool.
Preserve audit records and identify data scope.
Notify accountable owner and security/legal contacts as applicable.
Correct source records only through approved workflow.
Evaluate required notifications and remediation.
Add regression test before re-enabling.
18 Implementation Roadmap and Acceptance
Phase
Agents
Go-live requirement
1 - Operating discipline
Chief of Staff, Pipeline, Meeting, Firm Intelligence, Data Governance
CRM stages, permissions, approval queue and audit logs work with synthetic/pilot cases
2 - Authority and finance
Content/AEO, Newsletter, Placement/Press, Finance/Fee
Approved editorial and financial source data; no autonomous publishing or invoicing
3 - Analytical assistance
Enterprise Economics
Proposal extraction accuracy proven on a test set and human review embedded
4 - Book analytics
Portability
Secure de-identified intake, firm rule sources and analyst review queue
5 - Network effects
Continuity Matching
Verified participant base, consent workflow and manual matching track record
Phase 1 acceptance criteria
Daily brief contains no unauthorized sensitive details and links to every source item.
No active case can remain without a surfaced next action.
Meeting outputs distinguish statements, analysis, decisions and tasks.
Firm intelligence updates require human approval and retain prior conflicting records.
Every external draft is clearly marked unapproved.
Audit log can reconstruct inputs, tools, template version, output and decision.
A kill switch can disable each agent independently.
Sample morning brief
VYNE Morning Brief - sample
DECISIONS: Approve Firm B submission packet for the UBS case by 11:00 AM. ADVISORS: Prepare 2:00 PM proposal review; three terms remain unverified. FIRMS: Firm A has not acknowledged the submission in three business days. REVENUE: One initial fee expected next week; contract basis needs confirmation. AUTHORITY: Newsletter draft requires source review. RISKS: One uploaded spreadsheet may contain prohibited client identifiers and is quarantined.
Standards and source anchors
These sources support the technical standards and AEO assumptions in this document. They do not replace legal, cybersecurity or implementation review.
NIST - AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework - Voluntary framework for governing, mapping, measuring and managing AI risks.
NIST - Generative AI Profile: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence - Companion profile for generative AI risks.
OWASP - GenAI Security Project: https://owasp.org/www-project-top-10-for-large-language-model-applications/ - Security risks for LLM and agentic applications.
OWASP - ASVS: https://owasp.org/www-project-application-security-verification-standard/ - Application security requirements for the surrounding web systems.