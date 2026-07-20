/**
 * @vyne/db — schema, migrations, RLS policies, and seed for the EA-001 slice.
 *
 * Migrations: ./supabase/migrations (applied in filename order), each with a
 * paired rollback in ./supabase/rollbacks. RLS suite: ./test. The synthetic
 * demonstration seed (M4) will live in ./supabase/seed.sql.
 */
export const MIGRATIONS_PATH = "supabase/migrations";
export const ROLLBACKS_PATH = "supabase/rollbacks";
