import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Client } from "pg";
import { asUser, freshDatabase, ownerClient } from "./helpers";
import { AUTH, IDS, loadFixtures } from "./fixtures";

/**
 * M4-F1: Current Reality RLS — visibility inherits the advisor (§12).
 * Founder full; recruiter owned-only; advisor role zero-grant.
 */

const DB = "vyne_current_reality";
let owner: Client;

beforeAll(async () => {
  await freshDatabase(DB);
  owner = await ownerClient(DB);
  await loadFixtures(owner);
  // A Current Reality for advisor1 (recruiterA's) and advisor2 (recruiterB's).
  await owner.query(
    `insert into public.current_reality (advisor_id, status, overview, goals)
     values ($1, 'in_progress', 'Synthetic reality A', '[{"text":"Grow to independence"}]'),
            ($2, 'draft', 'Synthetic reality B', '[]')`,
    [IDS.advisor1, IDS.advisor2],
  );
}, 120_000);

afterAll(async () => {
  await owner?.end();
});

describe("current_reality RLS (M4-F1)", () => {
  it("founder sees every advisor's Current Reality", async () => {
    const rows = await asUser(owner, AUTH.founder, (q) =>
      q("select advisor_id from public.current_reality"),
    );
    expect(rows.rowCount).toBe(2);
  });

  it("a recruiter sees only their owned advisor's Current Reality", async () => {
    const a = await asUser(owner, AUTH.recruiterA, (q) =>
      q("select advisor_id from public.current_reality"),
    );
    expect(a.rowCount).toBe(1);
    expect(a.rows[0].advisor_id).toBe(IDS.advisor1);

    const b = await asUser(owner, AUTH.recruiterB, (q) =>
      q("select advisor_id from public.current_reality"),
    );
    expect(b.rowCount).toBe(1);
    expect(b.rows[0].advisor_id).toBe(IDS.advisor2);
  });

  it("a recruiter cannot read another recruiter's Current Reality by direct id", async () => {
    const probe = await asUser(owner, AUTH.recruiterA, (q) =>
      q("select advisor_id from public.current_reality where advisor_id = $1", [IDS.advisor2]),
    );
    expect(probe.rowCount).toBe(0);
  });

  it("a recruiter can update their own Current Reality, not another's", async () => {
    const ownUpdate = await asUser(owner, AUTH.recruiterA, (q) =>
      q("update public.current_reality set overview = 'edited' where advisor_id = $1 returning id", [IDS.advisor1]),
    );
    expect(ownUpdate.rowCount).toBe(1);

    const foreignUpdate = await asUser(owner, AUTH.recruiterA, (q) =>
      q("update public.current_reality set overview = 'hijack' where advisor_id = $1 returning id", [IDS.advisor2]),
    );
    expect(foreignUpdate.rowCount).toBe(0); // RLS filters it out — no row updated
  });

  it("the advisor role has zero grant on Current Reality", async () => {
    const rows = await asUser(owner, AUTH.advisorX, (q) =>
      q("select advisor_id from public.current_reality"),
    );
    expect(rows.rowCount).toBe(0);
  });
});
