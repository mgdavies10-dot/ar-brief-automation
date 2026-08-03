# Founding Acceptance Tests

## Authentication and permissions
- Unauthenticated users cannot access VYNE OS or Advisor Studio.
- An advisor cannot access another advisor's records by modifying a URL or request.
- A recruiter cannot view restricted founder, finance, or commission information unless explicitly permitted.
- UI and API/server authorization return the same outcome.

## Controlled publishing
- Draft internal content is invisible in Advisor Studio.
- Only authorized roles can approve and publish.
- Published content appears only for designated advisor users.
- Superseded content is clearly historical internally and no longer presented as current.
- Withdrawn content is removed from Advisor Studio but retained in the audit history.

## Vertical slice
- Create advisor and advisor user.
- Create active decision.
- Complete Current Reality Record.
- Complete Future-State Mandate.
- Update Decision Completeness Scorecard.
- Generate advisor-facing version.
- Review, approve, and publish.
- Verify exact advisor-visible result.
- Verify no internal notes, fees, recruiter data, or private research appear.
- Verify audit events for create, edit, approve, publish, view, supersede, and withdraw.

## Documents
- Private documents cannot be opened without authorization.
- Download links expire.
- Advisor-visible and internal versions are distinct.
- Version history is preserved.

## Models
- Every model records version, author, date, input source, input classification, and assumptions.
- Guaranteed, contingent, advisor-provided, firm-provided, estimated, and modeled values are visibly differentiated.
- Base and downside cases are available.
- Hand-check outputs match approved test cases.
- Published reports exclude internal comments and hidden assumptions.

## Quality
- No critical accessibility violations on core workflows.
- Mobile and desktop layouts are usable.
- Empty, loading, failure, unauthorized, and success states exist.
- Automated tests pass.
- Seed data contains no real confidential information.
- Setup instructions work from a clean environment.
