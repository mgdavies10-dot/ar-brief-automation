# Product Boundaries and Security Rules

## Public Website
May contain approved public copy, insights, educational tools, general descriptions of the VYNE Method, inquiry forms, disclosures, and login entry.

Must not contain confidential firm intelligence, advisor data, full proprietary Decision Cards, internal models, internal comparison rankings, or commercial pipeline information.

## VYNE OS
Private internal system of record. It owns master advisor, team, firm, recruiter, activity, opportunity, decision, evidence, research, document, model, fee, invoice, commission, and audit records.

## Advisor Studio
Client-facing controlled view. It may show only records or document versions explicitly marked approved and published for the authenticated advisor or approved team members.

## Modeling Workspace
May operate internally and publish selected outputs. All inputs need source and classification. Published reports must not expose internal comments or hidden assumptions.

## Publication states
Draft → In Review → Approved → Published → Superseded or Withdrawn.

Only authorized internal users may approve or publish. A withdrawn item must disappear from Advisor Studio while remaining preserved internally for audit history.

## Data separation
- Separate internal notes from advisor-visible summaries.
- Separate commercial opportunity stage from advisor decision readiness.
- Separate model source data from presentation output.
- Separate recruiter compensation from firm fee records.
- Separate public research from licensed, confidential, or advisor-specific research.

## Security minimums
- Server-side authorization on every protected route and action.
- Database-enforced access rules.
- Least-privilege roles.
- MFA capability.
- Private object storage.
- Signed, expiring file links.
- Immutable or append-only material audit history.
- Secret management outside source code.
- Encryption in transit and at rest through production providers.
- Backup, recovery, export, retention, and deletion policies.
- Independent legal, privacy, and cybersecurity review before production use with real advisor data.
