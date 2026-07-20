import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Client } from "pg";

const dir = path.dirname(fileURLToPath(import.meta.url));
export const MIGRATIONS_DIR = path.join(dir, "..", "supabase", "migrations");
export const ROLLBACKS_DIR = path.join(dir, "..", "supabase", "rollbacks");
const SHIM = path.join(dir, "shim", "auth_shim.sql");

const PG = {
  host: process.env.PGHOST ?? "127.0.0.1",
  port: Number(process.env.PGPORT ?? 5432),
  user: process.env.PGUSER ?? "postgres",
  password: process.env.PGPASSWORD ?? "postgres",
};

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

/** Drop + recreate a test database, apply the auth shim, then all migrations in order. */
export async function freshDatabase(dbname: string): Promise<void> {
  const admin = new Client({ ...PG, database: "postgres" });
  await admin.connect();
  await admin.query(`drop database if exists ${dbname} with (force)`);
  await admin.query(`create database ${dbname}`);
  await admin.end();
  psql(dbname, SHIM);
  for (const f of listMigrations()) {
    psql(dbname, path.join(MIGRATIONS_DIR, f));
  }
}

export function applyRollback(dbname: string, rollbackFile: string): void {
  psql(dbname, path.join(ROLLBACKS_DIR, rollbackFile));
}

export function applyMigration(dbname: string, migrationFile: string): void {
  psql(dbname, path.join(MIGRATIONS_DIR, migrationFile));
}

/** Owner-privilege connection (bypasses RLS — fixtures and assertions only). */
export async function ownerClient(dbname: string): Promise<Client> {
  const c = new Client({ ...PG, database: dbname });
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
