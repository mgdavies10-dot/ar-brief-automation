# VYNE Release Governance

**Status:** G2, for founder review · **Owner:** Founder (Council Chair)
**Scope note:** under EA-001 no hosted deployment exists; "release" means milestone or
slice acceptance as a foundation for the next phase (DL-2026-007). These definitions
apply now in rehearsal form and govern real releases when hosting is ever authorized.

## 1. Acceptance states

- **Milestone acceptance** — a milestone's deliverables meet the accepted plan; verified
  by executed tests; recorded in the milestone report; founder accepts at mandatory
  stops.
- **Provisional acceptance** — implementation complete and verified in a substitute or
  partial environment; explicitly conditioned (named conditions, named environment
  gap); becomes final only when conditions are discharged. *Example: M2 is
  provisionally accepted under ADR-001 / DL-2026-012.*
- **Final acceptance** — all conditions discharged with executed evidence; recorded in
  the Decision Log or milestone report addendum.
- **Production-release approval** — founder approval after all applicable release
  gates (§4) pass and the QA/Red-Team report is reviewed (DL-2026-007 pattern). Not
  reachable under EA-001.
- **Rollback authorization** — founder (retroactive within 24h permitted for
  emergencies); every rollback uses the tested rollback script for the affected
  migrations and is logged with cause.
- **Emergency change process** — containment first, documentation within one business
  day, full review as if proposed (Authority Matrix note 4). Emergencies never skip
  the log.
- **Post-release validation** — the release approval names its post-release checks;
  they are executed and their results recorded before the release review closes.
- **Incident review** — any incident (security, data, availability, publication error)
  gets an incident record, a council review, and DL entries for resulting decisions;
  incident records are never edited after the fact, only appended.

## 2. Test-claim standard (binding on every "tests passed" statement)

Every test claim — in reports, commits, chat, or reviews — must state:

1. **Environment** (exact: e.g., "PostgreSQL 16.13, native, cloud container");
2. **Test target** (what was exercised);
3. **Test count** (passed/failed/total);
4. **Skipped tests** (count and why);
5. **Mocked or shimmed dependencies** (each one named);
6. **Known limitations** (what the run does *not* prove);
7. **Whether production-equivalent execution occurred** (yes/no, and if no, what
   would make it so).

**A shimmed test result must never be described as full production-equivalent
verification.** Precedent: M2's "42/42" is true and useful, and proves policy behavior
under the native-PostgreSQL harness — it does not prove GoTrue claims, service-role
behavior, or token-refresh interaction. That distinction is the standard.

## 3. Release-gate principle

A gate is a named surface with named executed evidence. A gate passes only on
executed results in the required environment — never on authored code, intentions, or
partial analogies.

## 4. Release gates

| Gate | Passes only when |
|---|---|
| Authentication | Sign-in, MFA enrollment/challenge, session lifetimes, refresh, and revocation exercised against the real auth stack; disabled-user session death demonstrated |
| RLS | Full policy suite green in the target environment, including negative-access tests for every role, cross-tenant probes, and direct-API paths |
| Audit | Append-only demonstrated (privilege + trigger levels); required events written for every gated action; reconstruction of a full flow from the log verified |
| Financial calculations | Independent tests against hand-checked cases (Q-7 gate for modeling); no unsourced constants |
| Publication | Snapshot-copy semantics verified; withdrawal invisibility + internal preservation verified; residue scan fires on planted fixture **and** the blocked publish writes an audit event (CR-001 §2) |
| Advisor Studio | Advisor's-eye render pixel-identical to OS preview (one Frame); zero internal-table reach from a Studio session; vocabulary rule holds in every string |
| Privacy | §0.2 attestation path enforced; no client-PII field or storage location exists; data-minimization helper text present where required |
| Accessibility | WCAG 2.1 AA checks on affected surfaces; keyboard operability; status-not-by-color-alone |
| Backup/recovery | Backup taken and restore actually executed in a test environment (a backup that has never been restored is not a control) |

## 5. Standing conditions currently open

- **M2 final acceptance:** rerun identical migrations + complete applicable suite on
  the genuine local Supabase stack (ADR-001, DL-2026-012). Blocks substantive M3 work.
- **Slice acceptance (DL-2026-008):** requires QA/Red-Team report, full security-suite
  output (not a summary), §7.3 checklist, and council review of ADR-001/ADR-002.
