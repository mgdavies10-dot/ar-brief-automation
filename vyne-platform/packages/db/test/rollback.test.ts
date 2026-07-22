import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Client } from "pg";
import { applyMigration, applyRollback, freshDatabase, ownerClient } from "./helpers";

const DB = "vyne_rollback_test";
let owner: Client;

async function tableExists(name: string): Promise<boolean> {
  const r = await owner.query(
    "select 1 from information_schema.tables where table_schema = 'public' and table_name = $1",
    [name],
  );
  return (r.rowCount ?? 0) > 0;
}

async function columnExists(table: string, column: string): Promise<boolean> {
  const r = await owner.query(
    "select 1 from information_schema.columns where table_schema='public' and table_name=$1 and column_name=$2",
    [table, column],
  );
  return (r.rowCount ?? 0) > 0;
}

beforeAll(async () => {
  await freshDatabase(DB);
  owner = await ownerClient(DB);
}, 120_000);

afterAll(async () => {
  await owner?.end();
});

describe("migration rollback (EA-001 acceptance: rollback of latest migration verified)", () => {
  it("rolls back the latest migration (0010_current_reality_understanding) and re-applies cleanly", async () => {
    expect(await columnExists("current_reality", "executive_summary")).toBe(true);
    applyRollback(DB, "0010_current_reality_understanding_down.sql");
    expect(await columnExists("current_reality", "executive_summary")).toBe(false);
    applyMigration(DB, "0010_current_reality_understanding.sql");
    expect(await columnExists("current_reality", "executive_summary")).toBe(true);
  });

  it("full down-chain leaves an empty public schema; full re-apply restores all 15 tables", async () => {
    const downs = [
      "0010_current_reality_understanding_down.sql",
      "0009_current_reality_down.sql",
      "0008_auth_claims_hook_down.sql",
      "0007_audit_down.sql",
      "0006_activity_tasks_down.sql",
      "0005_documents_artifacts_down.sql",
      "0004_decisions_down.sql",
      "0003_relationship_core_down.sql",
      "0002_identity_down.sql",
      "0001_conventions_down.sql",
    ];
    for (const d of downs) applyRollback(DB, d);
    const remaining = await owner.query(
      "select table_name from information_schema.tables where table_schema = 'public'",
    );
    expect(remaining.rows).toEqual([]);

    for (const m of [
      "0001_conventions.sql",
      "0002_identity.sql",
      "0003_relationship_core.sql",
      "0004_decisions.sql",
      "0005_documents_artifacts.sql",
      "0006_activity_tasks.sql",
      "0007_audit.sql",
      "0008_auth_claims_hook.sql",
      "0009_current_reality.sql",
      "0010_current_reality_understanding.sql",
    ]) {
      applyMigration(DB, m);
    }
    const restored = await owner.query(
      "select count(*)::int as n from information_schema.tables where table_schema = 'public'",
    );
    // 13 EA tables + decision_types lookup + current_reality
    expect(restored.rows[0].n).toBe(15);
  });
});
