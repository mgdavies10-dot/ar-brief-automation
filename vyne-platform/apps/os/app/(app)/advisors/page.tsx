import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { currentRealitySchema, currentRealityCompleteness } from "@vyne/domain";

export const metadata: Metadata = { title: "Advisors — VYNE OS" };

const fmtT12 = (v: number | null) =>
  v == null ? null : `$${(v / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 1 })}M T12`;

/**
 * Advisors — the people in our care. Deliberately sparse: identity, firm,
 * commercial band, and how complete their Current Reality is. Everything about a
 * person lives in their workspace, not this list.
 */
export default async function AdvisorsPage() {
  const supabase = await createClient();
  const { data: advisors } = await supabase
    .from("advisors")
    .select("id, first_name, last_name, city, state, t12_verified, t12_reported, firms(name), current_reality(status, overview, practice_profile, goals, motivations, constraints, strengths, frictions, findings)")
    .order("created_at", { ascending: false });

  const rows = advisors ?? [];

  return (
    <div className="page">
      <header className="page-head page-head-row">
        <div>
          <h1 className="page-title">Advisors</h1>
          <div className="page-rule" />
        </div>
        <Link href="/advisors/new" className="btn-primary">Add advisor</Link>
      </header>

      {rows.length === 0 ? (
        <div className="empty">
          <p className="empty-title">No advisors yet.</p>
          <p className="empty-note">
            Add the first advisor you&rsquo;re guiding, then begin their Current
            Reality — the foundation of every decision that follows.
          </p>
          <Link href="/advisors/new" className="btn-primary">Add the first advisor</Link>
        </div>
      ) : (
        <ul className="advisor-list">
          {rows.map((a) => {
            const firm = Array.isArray(a.firms) ? a.firms[0]?.name : (a.firms as { name?: string } | null)?.name;
            const crRow = Array.isArray(a.current_reality) ? a.current_reality[0] : a.current_reality;
            const t12 = fmtT12(a.t12_verified ?? a.t12_reported ?? null);
            let pct = 0;
            if (crRow) {
              const parsed = currentRealitySchema.safeParse({
                overview: crRow.overview ?? undefined,
                practiceProfile: crRow.practice_profile ?? {},
                goals: crRow.goals ?? [],
                motivations: crRow.motivations ?? [],
                constraints: crRow.constraints ?? [],
                strengths: crRow.strengths ?? [],
                frictions: crRow.frictions ?? [],
                findings: crRow.findings ?? [],
              });
              if (parsed.success) pct = Math.round(currentRealityCompleteness(parsed.data) * 100);
            }
            return (
              <li key={a.id}>
                <Link href={`/advisors/${a.id}`} className="advisor-row">
                  <span className="advisor-row-name">{a.first_name} {a.last_name}</span>
                  <span className="advisor-row-meta">
                    {[firm, [a.city, a.state].filter(Boolean).join(", "), t12].filter(Boolean).join(" · ")}
                  </span>
                  <span className={`cr-badge${!crRow ? " is-none" : pct === 100 ? " is-complete" : " is-progress"}`}>
                    {!crRow ? "Not started" : pct === 100 ? "Current Reality complete" : `Current Reality ${pct}%`}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
