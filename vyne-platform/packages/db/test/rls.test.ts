import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Client } from "pg";
import { asUser, expectDbError, freshDatabase, ownerClient } from "./helpers";
import { AUTH, IDS, USERS, loadFixtures } from "./fixtures";

const DB = "vyne_rls_test";
let owner: Client;
let session: Client;

beforeAll(async () => {
  await freshDatabase(DB);
  owner = await ownerClient(DB);
  await loadFixtures(owner);
  session = await ownerClient(DB);
}, 120_000);

afterAll(async () => {
  await owner?.end();
  await session?.end();
});

describe("internal scoping — founder and recruiters", () => {
  it("founder sees all advisors", async () => {
    const r = await asUser(session, AUTH.founder, (q) => q("select id from advisors"));
    expect(r.rowCount).toBe(3);
  });

  it("recruiters see only their own advisors (cross-recruiter invisibility)", async () => {
    const a = await asUser(session, AUTH.recruiterA, (q) => q("select id from advisors"));
    expect(a.rows.map((x) => x.id)).toEqual([IDS.advisor1]);
    const b = await asUser(session, AUTH.recruiterB, (q) => q("select id from advisors"));
    expect(b.rows.map((x) => x.id)).toEqual([IDS.advisor2]);
  });

  it("direct-id probing across recruiters returns zero rows (URL-manipulation analog)", async () => {
    const r = await asUser(session, AUTH.recruiterA, (q) =>
      q("select id from advisors where id = $1", [IDS.advisor2]),
    );
    expect(r.rowCount).toBe(0);
  });

  it("decision evidence inherits decision visibility", async () => {
    const a = await asUser(session, AUTH.recruiterA, (q) => q("select id from decision_evidence"));
    expect(a.rowCount).toBe(1);
    const b = await asUser(session, AUTH.recruiterB, (q) => q("select id from decision_evidence"));
    expect(b.rowCount).toBe(0);
  });

  it("recruiter cannot create an advisor assigned to someone else", async () => {
    await expectDbError(
      asUser(session, AUTH.recruiterA, (q) =>
        q(
          `insert into advisors (first_name, last_name, relationship_owner_id)
           values ('Not','Allowed (Synthetic)', $1)`,
          [USERS.recruiterB],
        ),
      ),
      "row-level security",
    );
  });

  it("recruiter cannot reassign ownership (founder-only guard)", async () => {
    // Out-of-scope row: invisibly zero rows updated (tier-1 posture).
    const r = await asUser(session, AUTH.recruiterA, (q) =>
      q("update advisors set relationship_owner_id = $1 where id = $2 returning id", [
        USERS.recruiterA,
        IDS.advisor2,
      ]),
    );
    expect(r.rowCount).toBe(0);
    // Owned row: reassignment attempt is a hard guard error.
    await expectDbError(
      asUser(session, AUTH.recruiterA, (q) =>
        q("update advisors set commercial_owner_id = $1 where id = $2", [USERS.recruiterB, IDS.advisor1]),
      ),
      "only the founder may reassign",
    );
  });

  it("recruiter cannot escalate their own role", async () => {
    await expectDbError(
      asUser(session, AUTH.recruiterA, (q) =>
        q("update users set role = 'founder' where auth_id = $1", [AUTH.recruiterA]),
      ),
      "only the founder may change identity",
    );
  });
});

describe("advisor zero-grant posture on internal tables (§12)", () => {
  const internalTables = [
    "advisors",
    "decisions",
    "decision_evidence",
    "artifacts",
    "documents",
    "activities",
    "firms",
    "teams",
    "advisor_accounts",
  ];

  for (const table of internalTables) {
    it(`advisor session reads zero rows from ${table}`, async () => {
      const r = await asUser(session, AUTH.advisorX, (q) => q(`select * from ${table}`));
      expect(r.rowCount).toBe(0);
    });
  }

  it("advisor sees only their own users row", async () => {
    const r = await asUser(session, AUTH.advisorX, (q) => q("select auth_id from users"));
    expect(r.rows.map((x) => x.auth_id)).toEqual([AUTH.advisorX]);
  });

  it("advisor cannot insert into internal tables", async () => {
    await expectDbError(
      asUser(session, AUTH.advisorX, (q) =>
        q("insert into advisors (first_name, last_name) values ('Probe','Attempt (Synthetic)')"),
      ),
      "row-level security",
    );
    await expectDbError(
      asUser(session, AUTH.advisorX, (q) =>
        q("insert into activities (type, summary) values ('note', 'probe (synthetic)')"),
      ),
      "row-level security",
    );
  });
});

describe("publication boundary (§0.8)", () => {
  it("advisor sees exactly their own non-withdrawn published artifacts", async () => {
    const r = await asUser(session, AUTH.advisorX, (q) =>
      q("select id from published_artifacts order by id"),
    );
    expect(r.rows.map((x) => x.id)).toEqual([IDS.pa1]);
  });

  it("withdrawn snapshot is invisible to the advisor but preserved internally", async () => {
    const advisor = await asUser(session, AUTH.advisorX, (q) =>
      q("select id from published_artifacts where id = $1", [IDS.pa2]),
    );
    expect(advisor.rowCount).toBe(0);
    const founder = await asUser(session, AUTH.founder, (q) =>
      q("select id, withdrawn_at from published_artifacts where id = $1", [IDS.pa2]),
    );
    expect(founder.rowCount).toBe(1);
    expect(founder.rows[0]?.withdrawn_at).not.toBeNull();
  });

  it("recruiter cannot publish (founder-only, Q-3)", async () => {
    await expectDbError(
      asUser(session, AUTH.recruiterA, (q) =>
        q(
          `insert into published_artifacts (artifact_id, advisor_id, published_by, content_snapshot)
           values ($1, $2, $3, '{}')`,
          [IDS.artifact2, IDS.advisor1, USERS.recruiterA],
        ),
      ),
      "row-level security",
    );
  });

  it("published snapshots are immutable even to the founder", async () => {
    await expectDbError(
      asUser(session, AUTH.founder, (q) =>
        q(`update published_artifacts set content_snapshot = '{"tampered":true}' where id = $1`, [IDS.pa1]),
      ),
      "immutable",
    );
  });

  it("founder can withdraw (metadata change allowed)", async () => {
    const r = await asUser(session, AUTH.founder, (q) =>
      q("update published_artifacts set withdrawn_at = now(), withdrawn_by = $1 where id = $2 returning id", [
        USERS.founder,
        IDS.pa1,
      ]),
    );
    expect(r.rowCount).toBe(1); // rolled back by harness
  });
});

describe("artifact lifecycle authority (§6)", () => {
  it("recruiter may submit an owned draft for review", async () => {
    const r = await asUser(session, AUTH.recruiterA, (q) =>
      q("update artifacts set status = 'in_review' where id = $1 returning status", [IDS.artifact1]),
    );
    expect(r.rows[0]?.status).toBe("in_review");
  });

  it("recruiter cannot approve", async () => {
    await expectDbError(
      asUser(session, AUTH.recruiterA, (q) =>
        q("update artifacts set status = 'approved' where id = $1", [IDS.artifact1]),
      ),
      "only the founder may approve",
    );
  });

  it("recruiter cannot touch an approved artifact", async () => {
    await expectDbError(
      asUser(session, AUTH.recruiterA, (q) =>
        q("update artifacts set content = '{}' where id = $1", [IDS.artifact2]),
      ),
      "only the founder may modify",
    );
  });

  it("founder can approve", async () => {
    const r = await asUser(session, AUTH.founder, (q) =>
      q(
        "update artifacts set status = 'approved', approved_by = $1, approved_at = now() where id = $2 returning status",
        [USERS.founder, IDS.artifact1],
      ),
    );
    expect(r.rows[0]?.status).toBe("approved");
  });
});

describe("advisor task surface — the sole advisor write", () => {
  it("advisor sees only own advisor-visible tasks", async () => {
    const r = await asUser(session, AUTH.advisorX, (q) => q("select id from tasks"));
    expect(r.rows.map((x) => x.id)).toEqual([IDS.task1]);
  });

  it("advisor can mark their task done with a note", async () => {
    const r = await asUser(session, AUTH.advisorX, (q) =>
      q(
        "update tasks set status = 'done', completion_evidence = 'Sent it over (synthetic note)' where id = $1 returning status",
        [IDS.task1],
      ),
    );
    expect(r.rows[0]?.status).toBe("done");
  });

  it("advisor cannot edit any other task field", async () => {
    await expectDbError(
      asUser(session, AUTH.advisorX, (q) =>
        q("update tasks set title = 'renamed (synthetic)' where id = $1", [IDS.task1]),
      ),
      "advisors may only update task status",
    );
  });

  it("advisor cannot set a status other than done", async () => {
    await expectDbError(
      asUser(session, AUTH.advisorX, (q) =>
        q("update tasks set status = 'cancelled' where id = $1", [IDS.task1]),
      ),
      "advisors may only mark tasks done",
    );
  });

  it("advisor cannot touch another advisor's task", async () => {
    const r = await asUser(session, AUTH.advisorX, (q) =>
      q("update tasks set status = 'done' where id = $1 returning id", [IDS.task3]),
    );
    expect(r.rowCount).toBe(0);
  });
});

describe("immediate revocation (§12) — disabled user's world goes dark", () => {
  it("disabled recruiter reads zero rows everywhere, including own user row", async () => {
    for (const table of ["advisors", "users", "tasks", "decisions"]) {
      const r = await asUser(session, AUTH.recruiterC, (q) => q(`select * from ${table}`));
      expect(r.rowCount).toBe(0);
    }
  });

  it("disabled recruiter cannot write", async () => {
    await expectDbError(
      asUser(session, AUTH.recruiterC, (q) =>
        q("insert into advisors (first_name, last_name, relationship_owner_id) values ('X','Y (Synthetic)', $1)", [
          USERS.recruiterC,
        ]),
      ),
      "row-level security",
    );
  });
});

describe("audit log (§0.6) — append-only, founder-read", () => {
  it("founder reads audit events; recruiter and advisor read zero rows", async () => {
    const f = await asUser(session, AUTH.founder, (q) => q("select id from audit_events"));
    expect(f.rowCount).toBeGreaterThan(0);
    const r = await asUser(session, AUTH.recruiterA, (q) => q("select id from audit_events"));
    expect(r.rowCount).toBe(0);
    const a = await asUser(session, AUTH.advisorX, (q) => q("select id from audit_events"));
    expect(a.rowCount).toBe(0);
  });

  it("authenticated identities can append (write-only: no RETURNING, no read-back)", async () => {
    const r = await asUser(session, AUTH.recruiterA, (q) =>
      q(
        `insert into audit_events (actor_id, actor_role, event_type, record_type)
         values ($1, 'recruiter', 'auth.login', 'users')`,
        [USERS.recruiterA],
      ),
    );
    expect(r.rowCount).toBe(1);
  });

  it("no role can update or delete audit events (privilege + trigger)", async () => {
    await expectDbError(
      asUser(session, AUTH.founder, (q) => q("update audit_events set event_type = 'tampered'")),
      "permission denied",
    );
    await expectDbError(
      asUser(session, AUTH.founder, (q) => q("delete from audit_events")),
      "permission denied",
    );
    // Even the table-owner path is trigger-blocked:
    await expectDbError(owner.query("update audit_events set event_type = 'tampered'"), "append-only");
    await expectDbError(owner.query("delete from audit_events"), "append-only");
  });
});

describe("soft delete and anon posture", () => {
  it("soft-deleted advisors disappear from every role's view", async () => {
    await owner.query("update advisors set deleted_at = now() where id = $1", [IDS.advisor3]);
    try {
      const f = await asUser(session, AUTH.founder, (q) => q("select id from advisors"));
      expect(f.rows.map((x) => x.id).sort()).toEqual([IDS.advisor1, IDS.advisor2]);
    } finally {
      await owner.query("update advisors set deleted_at = null where id = $1", [IDS.advisor3]);
    }
  });

  it("anon has no access to any table", async () => {
    await expectDbError(
      asUser(session, null, (q) => q("select * from advisors"), { role: "anon" }),
      "permission denied",
    );
    await expectDbError(
      asUser(session, null, (q) => q("select * from published_artifacts"), { role: "anon" }),
      "permission denied",
    );
  });

  it("documents cannot be saved without the client-PII attestation (§0.2)", async () => {
    await expectDbError(
      asUser(session, AUTH.founder, (q) =>
        q(
          `insert into documents (storage_key, filename, classification, advisor_id, no_client_pii_attested)
           values ('synthetic/x.pdf','x.pdf','advisor_provided',$1, null)`,
          [IDS.advisor1],
        ),
      ),
      "null value",
    );
  });
});
