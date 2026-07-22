import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createAdvisor } from "../actions";

export const metadata: Metadata = { title: "Add advisor — VYNE OS" };

/**
 * Add an advisor — the person we're helping, captured with dignity, not an
 * intake form. Just enough to open their workspace and begin Current Reality.
 */
export default async function NewAdvisorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data: firms } = await supabase.from("firms").select("id, name").order("name");

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <h1 className="page-title">Add an advisor</h1>
        <div className="page-rule" />
        <p className="page-lede">Who are we helping? You can fill in the rest as you learn it.</p>
      </header>

      <form className="form-card" action={createAdvisor}>
        {error === "name" ? <p className="form-error" role="alert">A first and last name are needed to begin.</p> : null}
        {error === "save" ? <p className="form-error" role="alert">That didn&rsquo;t save — please try again.</p> : null}

        <div className="form-row-2">
          <div className="field">
            <label className="field-label" htmlFor="first_name">First name</label>
            <input className="field-input" id="first_name" name="first_name" required autoFocus />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="last_name">Last name</label>
            <input className="field-input" id="last_name" name="last_name" required />
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="firm_id">Current firm <span className="field-optional">optional</span></label>
          <select className="field-input" id="firm_id" name="firm_id" defaultValue="">
            <option value="">—</option>
            {(firms ?? []).map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div className="form-row-2">
          <div className="field">
            <label className="field-label" htmlFor="city">City <span className="field-optional">optional</span></label>
            <input className="field-input" id="city" name="city" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="state">State <span className="field-optional">optional</span></label>
            <input className="field-input" id="state" name="state" maxLength={2} />
          </div>
        </div>

        <div className="form-actions">
          <Link href="/advisors" className="btn-ghost">Cancel</Link>
          <button className="btn-primary" type="submit">Create &amp; open</button>
        </div>
      </form>
    </div>
  );
}
