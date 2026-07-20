import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Client } from "pg";

const dir = path.dirname(fileURLToPath(import.meta.url));
export const MIGRATIONS_DIR = path.join(dir, "..", "supabase", "migrations");
export const ROLLBACKS_DIR = path.join(dir, "..", "supabase", "rollbacks");
const SHIM = path.join(dir, "shim", "auth_shim.sql");

/**
 * Real-stack mode (DL-2026-012 binding verification): VYNE_REAL_STACK=1 targets
 * the Supabase-managed database (default 127.0.0.1:54322/postgres after
 * `supabase start`) with its REAL auth schema and roles — the shim is never
 * applied. Migration files and test assertions are identical in both modes;
 * only connection/reset plumbing differs.
 */
export const IS_REAL_STACK = process.env.VYNE_REAL_STACK === "1";

const PG = {
  host: process.env.PGHOST ?? "127.0.0.1",
  port: Number(process.env.PGPORT ?? (IS_REAL_STACK ? 54322 : 5432)),
  user: process.env.PGUSER ?? "postgres",
  password: process.env.PGPASSWORD ?? "postgres",
};
const MANAGED_DB = process.env.PGDATABASE ?? "postgres";

function targetDb(requested: string): string {
  return IS_REAL_STACK ? MANAGED_DB : requested;
}

function psql(dbname: string, file: string): void {
  execFileSync(
    "psql",
    ["-v", "ON_ERROR_STOP=1", "-q", "-h", PG.host, "-p", String(PG.port), "-U", PG.user, "-d", dbname, "-f", file],
    { env: { ...process.env, PGPASSWORD: PG.password }, stdio: ["ignore", "pipe", "pipe"] },
  );
}

export function listMigrations(): string[] {
  return readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql")).sort();
}

export function listRollbacksNewestFirst(): string[] {
  return readdirSync(ROLLBACKS_DIR).filter((f) => f.endsWith(".sql")).sort().reverse();
}

/**
 * Provision a clean schema and apply all migrations in order.
 * Shim mode: isolated scratch database + Supabase-semantics auth shim (ADR-001).
 * Real-stack mode: resets OUR objects on the managed database via the committed
 * down-chain (never touching Supabase's auth/storage schemas), then re-applies
 * the identical migrations. Requires `supabase start` (+ `supabase db reset` on
 * first use) beforehand.
 */
export async function freshDatabase(dbname: string): Promise<void> {
  if (!IS_REAL_STACK) {
    const admin = new Client({ ...PG, database: "postgres" });
    await admin.connect();
    await admin.query(`drop database if exists ${dbname} with (force)`);
    await admin.query(`create database ${dbname}`);
    await admin.end();
    psql(dbname, SHIM);
  } else {
    const c = new Client({ ...PG, database: MANAGED_DB });
    await c.connect();
    const applied = await c.query(
      "select 1 from information_schema.tables where table_schema = 'public' and table_name = 'users'",
    );
    await c.end();
    if ((applied.rowCount ?? 0) > 0) {
      for (const down of listRollbacksNewestFirst()) {
        psql(MANAGED_DB, path.join(ROLLBACKS_DIR, down));
      }
    }
  }
  for (const f of listMigrations()) {
    psql(targetDb(dbname), path.join(MIGRATIONS_DIR, f));
  }
}

export function applyRollback(dbname: string, rollbackFile: string): void {
  psql(targetDb(dbname), path.join(ROLLBACKS_DIR, rollbackFile));
}

export function applyMigration(dbname: string, migrationFile: string): void {
  psql(targetDb(dbname), path.join(MIGRATIONS_DIR, migrationFile));
}

/** Owner-privilege connection (bypasses RLS — fixtures and assertions only). */
export async function ownerClient(dbname: string): Promise<Client> {
  const c = new Client({ ...PG, database: targetDb(dbname) });
  await c.connect();
  return c;
}

export interface QueryResultLite {
  rows: Record<string, unknown>[];
  rowCount: number;
}

/**
 * Run `fn` inside a transaction as an authenticated user with the given
 * auth.users id in the JWT claims — the shape PostgREST sets per request.
 * Rolls back afterwards so tests stay independent unless `commit` is true.
 */
export async function asUser<T>(
  client: Client,
  authId: string | null,
  fn: (q: (sql: string, params?: unknown[]) => Promise<QueryResultLite>) => Promise<T>,
  opts: { role?: "authenticated" | "anon" | "service_role"; commit?: boolean } = {},
): Promise<T> {
  const role = opts.role ?? "authenticated";
  await client.query("begin");
  try {
    await client.query(`set local role ${role}`);
    if (authId !== null) {
      const claims = JSON.stringify({ sub: authId, role });
      await client.query("select set_config('request.jwt.claims', $1, true)", [claims]);
    }
    const q = async (sql: string, params?: unknown[]): Promise<QueryResultLite> => {
      const r = await client.query(sql, params);
      return { rows: r.rows as Record<string, unknown>[], rowCount: r.rowCount ?? 0 };
    };
    const result = await fn(q);
    await client.query(opts.commit ? "commit" : "rollback");
    return result;
  } catch (e) {
    await client.query("rollback").catch(() => undefined);
    throw e;
  }
}

/** Expect `fn` to fail with an error message containing `needle`. */
export async function expectDbError(p: Promise<unknown>, needle: string): Promise<void> {
  let message = "";
  try {
    await p;
  } catch (e) {
    message = e instanceof Error ? e.message : String(e);
  }
  if (!message.toLowerCase().includes(needle.toLowerCase())) {
    throw new Error(`expected error containing "${needle}", got: ${message || "no error"}`);
  }
}
