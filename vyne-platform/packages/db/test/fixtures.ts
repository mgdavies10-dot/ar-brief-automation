import type { Client } from "pg";

/**
 * M2 RLS test fixtures — clearly synthetic demonstration data only
 * (DL-2026-003). These are NOT the M4 seed personas; they exist solely to
 * exercise policies.
 */
export const AUTH = {
  founder: "10000000-0000-4000-8000-000000000001",
  recruiterA: "10000000-0000-4000-8000-000000000002",
  recruiterB: "10000000-0000-4000-8000-000000000003",
  recruiterC: "10000000-0000-4000-8000-000000000004", // disabled
  advisorX: "10000000-0000-4000-8000-000000000005", // maps to advisor1
  advisorY: "10000000-0000-4000-8000-000000000006", // maps to advisor2
} as const;

export const USERS = {
  founder: "20000000-0000-4000-8000-000000000001",
  recruiterA: "20000000-0000-4000-8000-000000000002",
  recruiterB: "20000000-0000-4000-8000-000000000003",
  recruiterC: "20000000-0000-4000-8000-000000000004",
  advisorX: "20000000-0000-4000-8000-000000000005",
  advisorY: "20000000-0000-4000-8000-000000000006",
} as const;

export const IDS = {
  firm1: "30000000-0000-4000-8000-000000000001",
  advisor1: "40000000-0000-4000-8000-000000000001",
  advisor2: "40000000-0000-4000-8000-000000000002",
  advisor3: "40000000-0000-4000-8000-000000000003",
  decision1: "50000000-0000-4000-8000-000000000001",
  evidence1: "51000000-0000-4000-8000-000000000001",
  artifact1: "60000000-0000-4000-8000-000000000001",
  artifact2: "60000000-0000-4000-8000-000000000002",
  pa1: "70000000-0000-4000-8000-000000000001", // advisor1, active
  pa2: "70000000-0000-4000-8000-000000000002", // advisor1, withdrawn
  pa3: "70000000-0000-4000-8000-000000000003", // advisor2, active
  task1: "80000000-0000-4000-8000-000000000001", // advisor-visible, advisor1
  task2: "80000000-0000-4000-8000-000000000002", // internal, advisor1
  task3: "80000000-0000-4000-8000-000000000003", // advisor-visible, advisor2
  doc1: "90000000-0000-4000-8000-000000000001",
} as const;

export async function loadFixtures(owner: Client): Promise<void> {
  const sql = (s: string, p?: unknown[]) => owner.query(s, p);

  for (const [key, authId] of Object.entries(AUTH)) {
    await sql("insert into auth.users (id, email) values ($1, $2)", [
      authId,
      `${key}@synthetic.vyne.test`,
    ]);
  }

  const u = (id: string, authId: string, email: string, name: string, role: string, status = "active") =>
    sql(
      "insert into public.users (id, auth_id, email, full_name, role, status) values ($1,$2,$3,$4,$5,$6)",
      [id, authId, email, name, role, status],
    );
  await u(USERS.founder, AUTH.founder, "founder@synthetic.vyne.test", "Morgan Vale (Synthetic)", "founder");
  await u(USERS.recruiterA, AUTH.recruiterA, "recruiter-a@synthetic.vyne.test", "Riley Quinn (Synthetic)", "recruiter");
  await u(USERS.recruiterB, AUTH.recruiterB, "recruiter-b@synthetic.vyne.test", "Jordan Ash (Synthetic)", "recruiter");
  await u(USERS.recruiterC, AUTH.recruiterC, "recruiter-c@synthetic.vyne.test", "Casey Dorm (Synthetic)", "recruiter", "disabled");
  await u(USERS.advisorX, AUTH.advisorX, "advisor-x@synthetic.vyne.test", "Alexandra Example (Synthetic)", "advisor");
  await u(USERS.advisorY, AUTH.advisorY, "advisor-y@synthetic.vyne.test", "Benjamin Sample (Synthetic)", "advisor");

  await sql("insert into public.firms (id, name, channel) values ($1, $2, $3)", [
    IDS.firm1,
    "Synthetic Capital Partners (Demo)",
    "wirehouse",
  ]);

  const adv = (id: string, first: string, last: string, owner_: string) =>
    sql(
      `insert into public.advisors (id, first_name, last_name, current_firm_id,
         relationship_owner_id, commercial_owner_id, client_count_band)
       values ($1,$2,$3,$4,$5,$5,'100-249')`,
      [id, first, last, IDS.firm1, owner_],
    );
  await adv(IDS.advisor1, "Alexandra", "Example (Synthetic)", USERS.recruiterA);
  await adv(IDS.advisor2, "Benjamin", "Sample (Synthetic)", USERS.recruiterB);
  await adv(IDS.advisor3, "Casey", "Specimen (Synthetic)", USERS.recruiterC);

  await sql(
    "insert into public.advisor_accounts (user_id, advisor_id, provisioned_by) values ($1,$2,$3), ($4,$5,$3)",
    [USERS.advisorX, IDS.advisor1, USERS.founder, USERS.advisorY, IDS.advisor2],
  );

  await sql(
    `insert into public.decisions (id, advisor_id, decision_type, current_state, is_primary)
     values ($1, $2, 'supported_independence', 'CONTINUE_DILIGENCE', true)`,
    [IDS.decision1, IDS.advisor1],
  );
  await sql(
    `insert into public.decision_evidence (id, decision_id, dimension, description, status)
     values ($1, $2, 'economics', 'Synthetic deferred-comp statement', 'requested')`,
    [IDS.evidence1, IDS.decision1],
  );

  await sql(
    `insert into public.artifacts (id, decision_id, artifact_type, version, status, content, created_by)
     values ($1, $2, 'current_reality', 1, 'draft', '{"title":"Current Reality (Synthetic)"}', $3),
            ($4, $2, 'current_reality', 2, 'approved', '{"title":"Current Reality v2 (Synthetic)"}', $3)`,
    [IDS.artifact1, IDS.decision1, USERS.founder, IDS.artifact2],
  );

  await sql(
    `insert into public.published_artifacts (id, artifact_id, advisor_id, published_by, content_snapshot, withdrawn_at, withdrawn_by)
     values ($1, $2, $3, $4, '{"title":"Published (Synthetic)"}', null, null),
            ($5, $2, $3, $4, '{"title":"Withdrawn (Synthetic)"}', now(), $4),
            ($6, $2, $7, $4, '{"title":"Other advisor (Synthetic)"}', null, null)`,
    [IDS.pa1, IDS.artifact2, IDS.advisor1, USERS.founder, IDS.pa2, IDS.pa3, IDS.advisor2],
  );

  await sql(
    `insert into public.tasks (id, owner_id, title, status, advisor_id, advisor_visible)
     values ($1, $2, 'Request deferred-comp statement (synthetic)', 'open', $3, true),
            ($4, $2, 'Internal prep (synthetic)', 'open', $3, false),
            ($5, $2, 'Other advisor task (synthetic)', 'open', $6, true)`,
    [IDS.task1, USERS.founder, IDS.advisor1, IDS.task2, IDS.task3, IDS.advisor2],
  );

  await sql(
    `insert into public.documents (id, storage_key, filename, classification, advisor_id,
        uploaded_by, received_via, no_client_pii_attested, attested_by, attested_at)
     values ($1, 'synthetic/doc1.pdf', 'synthetic-statement.pdf', 'advisor_provided', $2,
        $3, 'email', true, $3, now())`,
    [IDS.doc1, IDS.advisor1, USERS.founder],
  );

  await sql(
    `insert into public.activities (actor_id, advisor_id, type, summary)
     values ($1, $2, 'call', 'Synthetic discovery call log')`,
    [USERS.recruiterA, IDS.advisor1],
  );

  await sql(
    `insert into public.audit_events (actor_id, actor_role, event_type, record_type, record_id, advisor_id)
     values ($1, 'founder', 'artifact.published', 'published_artifacts', $2, $3)`,
    [USERS.founder, IDS.pa1, IDS.advisor1],
  );
}
