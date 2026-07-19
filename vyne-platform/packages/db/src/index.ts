/**
 * @vyne/db — schema, migrations, RLS policies, and seed for the EA-001 slice.
 *
 * M1 establishes the package; the 13 EA-listed tables, RLS policies per
 * Architecture §12, the append-only audit table, and rollback scripts land in
 * M2 as SQL migrations under ./supabase/migrations (Supabase CLI layout).
 */
export const DB_PACKAGE_READY = false;
