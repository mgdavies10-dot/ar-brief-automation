import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  currentRealitySchema,
  currentRealityCompleteness,
  understandingScore,
  dimensionsToLearn,
  generateSummaryDraft,
  DIMENSION_LABELS,
  type CurrentReality,
} from "@vyne/domain";
import { RealityEditor } from "./reality-editor";

const fmtMoney = (v: number | null | undefined) =>
  v == null ? null : `$${(v / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 1 })}M`;

function toCurrentReality(row: Record<string, unknown> | null | undefined): CurrentReality {
  const parsed = currentRealitySchema.safeParse({
    executiveSummary: (row?.executive_summary as string) ?? undefined,
    overview: (row?.overview as string) ?? undefined,
    practiceProfile: row?.practice_profile ?? {},
    goals: row?.goals ?? [],
    motivations: row?.motivations ?? [],
    constraints: row?.constraints ?? [],
    strengths: row?.strengths ?? [],
    frictions: row?.frictions ?? [],
    findings: row?.findings ?? [],
    recruiterNotes: (row?.recruiter_notes as string) ?? undefined,
    dimensionConfidence: row?.dimension_confidence ?? {},
  });
  return parsed.success ? parsed.data : currentRealitySchema.parse({});
}

const PROFILE_LABELS: Record<string, string> = {
  teamStructure: "Team structure", staffCount: "Staff", yearsInBusiness: "Years in business",
  custodianOrPlatform: "Custodian / platform", serviceModel: "Service model",
  clientAcquisition: "Client acquisition", growthTrajectory: "Growth", successionStatus: "Succession",
};

/** Executive-quality read view — "here's how we understand your business." */
function RealitySummary({ cr, name, advisorId }: { cr: CurrentReality; name: string; advisorId: string }) {
  const first = name.split(" ")[0];
  const profileEntries = Object.entries(cr.practiceProfile).filter(([, v]) => v !== undefined && v !== "");
  const list = (items: { text: string }[]) =>
    items.length ? <ul className="sum-list">{items.map((i, k) => <li key={k}>{i.text}</li>)}</ul> : null;

  const understanding = Math.round(understandingScore(cr) * 100);
  const toLearn = dimensionsToLearn(cr);
  const draft = generateSummaryDraft(cr, name);
  const summaryText = cr.executiveSummary?.trim() || draft;
  const isDraft = !cr.executiveSummary?.trim() && Boolean(draft);

  return (
    <article className="summary">
      <p className="summary-kicker">Here&rsquo;s how we understand {first}&rsquo;s business</p>

      <div className="understanding">
        <div className="understanding-meter"><span style={{ width: `${understanding}%` }} /></div>
        <span className="understanding-label">{understanding}% understood</span>
      </div>

      {summaryText ? (
        <div className="summary-exec">
          {isDraft ? (
            <p className="summary-draft-note">
              A starting point drafted from what we&rsquo;ve captured — <a href={`/advisors/${advisorId}?tab=reality`}>refine it in Current Reality</a>. It&rsquo;s always yours to edit.
            </p>
          ) : null}
          {summaryText.split(/\n{2,}/).map((para, k) => <p className="summary-para" key={k}>{para}</p>)}
        </div>
      ) : null}

      {toLearn.length ? (
        <section className="learn">
          <h3 className="learn-h">What we still need to learn</h3>
          <div className="learn-chips">
            {toLearn.map((d) => <span className="learn-chip" key={d}>{DIMENSION_LABELS[d]}</span>)}
          </div>
        </section>
      ) : null}

      {cr.overview && cr.executiveSummary ? <p className="summary-lede">{cr.overview}</p> : null}

      {profileEntries.length ? (
        <section className="summary-block">
          <h3 className="summary-h">The practice</h3>
          <dl className="summary-facts">
            {profileEntries.map(([k, v]) => (
              <div key={k}><dt>{PROFILE_LABELS[k] ?? k}</dt><dd>{String(v)}</dd></div>
            ))}
          </dl>
        </section>
      ) : null}

      {cr.goals.length ? (
        <section className="summary-block">
          <h3 className="summary-h">What they&rsquo;re trying to accomplish</h3>
          <ul className="sum-list">{cr.goals.map((g, k) => <li key={k}>{g.text}{g.priority ? <span className="sum-tag">{g.priority}</span> : null}</li>)}</ul>
        </section>
      ) : null}

      {cr.motivations.length ? (<section className="summary-block"><h3 className="summary-h">Why now</h3>{list(cr.motivations)}</section>) : null}
      {cr.constraints.length ? (
        <section className="summary-block"><h3 className="summary-h">Constraints</h3>
          <ul className="sum-list">{cr.constraints.map((c, k) => <li key={k}>{c.text}{c.kind ? <span className="sum-tag">{c.kind.replace(/_/g, " ")}</span> : null}</li>)}</ul>
        </section>
      ) : null}
      {cr.strengths.length ? (<section className="summary-block"><h3 className="summary-h">Strengths</h3>{list(cr.strengths)}</section>) : null}
      {cr.frictions.length ? (<section className="summary-block"><h3 className="summary-h">Frictions</h3>{list(cr.frictions)}</section>) : null}
      {cr.findings.length ? (
        <section className="summary-block"><h3 className="summary-h">Findings</h3>
          <ul className="sum-list">{cr.findings.map((f, k) => <li key={k}>{f.text}{f.kind ? <span className="sum-tag">{f.kind}</span> : null}</li>)}</ul>
        </section>
      ) : null}
      {cr.recruiterNotes ? (<section className="summary-block"><h3 className="summary-h">Advisor&rsquo;s owner notes</h3><p className="summary-note">{cr.recruiterNotes}</p></section>) : null}
    </article>
  );
}

export default async function AdvisorWorkspace({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { id } = await params;
  const { tab } = await searchParams;
  const supabase = await createClient();

  const { data: advisor } = await supabase
    .from("advisors")
    .select("id, first_name, last_name, city, state, aum, t12_verified, t12_reported, relationship_owner_id, firms(name), current_reality(*)")
    .eq("id", id)
    .maybeSingle();
  if (!advisor) notFound(); // RLS-denied or absent → treated the same (no leak)

  const { data: owner } = advisor.relationship_owner_id
    ? await supabase.from("users").select("full_name").eq("id", advisor.relationship_owner_id).maybeSingle()
    : { data: null };

  const firm = Array.isArray(advisor.firms) ? advisor.firms[0]?.name : (advisor.firms as { name?: string } | null)?.name;
  const crRow = Array.isArray(advisor.current_reality) ? advisor.current_reality[0] : advisor.current_reality;
  const cr = toCurrentReality(crRow as Record<string, unknown>);
  const pct = Math.round(currentRealityCompleteness(cr) * 100);
  const name = `${advisor.first_name} ${advisor.last_name}`;
  const t12 = fmtMoney(advisor.t12_verified ?? advisor.t12_reported);
  const activeTab = tab === "reality" ? "reality" : "overview";
  const hasContent = pct > 0;

  return (
    <div className="workspace">
      <header className="ws-head">
        <Link href="/advisors" className="ws-back">← Advisors</Link>
        <h1 className="ws-name">{name}</h1>
        <p className="ws-meta">{[firm, [advisor.city, advisor.state].filter(Boolean).join(", "), t12, owner?.full_name ? `Owner: ${owner.full_name}` : null].filter(Boolean).join(" · ")}</p>
        <div className="ws-tabs">
          <Link href={`/advisors/${id}`} className={`ws-tab${activeTab === "overview" ? " is-active" : ""}`}>Overview</Link>
          <Link href={`/advisors/${id}?tab=reality`} className={`ws-tab${activeTab === "reality" ? " is-active" : ""}`}>Current Reality</Link>
          <span className={`ws-status${pct === 100 ? " is-complete" : ""}`}>{pct === 100 ? "Complete" : `${pct}% captured`}</span>
        </div>
      </header>

      <div className="ws-body">
        {activeTab === "overview" ? (
          hasContent ? (
            <RealitySummary cr={cr} name={name} advisorId={id} />
          ) : (
            <div className="ws-checklist">
              <h2 className="ws-checklist-title">Let&rsquo;s begin.</h2>
              <p className="ws-checklist-note">
                A great decision starts with a clear picture. Capture {name.split(" ")[0]}&rsquo;s
                Current Reality — their practice, goals, and constraints — and it becomes the
                foundation for everything that follows.
              </p>
              <Link href={`/advisors/${id}?tab=reality`} className="btn-primary">Begin Current Reality</Link>
            </div>
          )
        ) : (
          <RealityEditor advisorId={id} advisorName={name} initial={cr} />
        )}
      </div>
    </div>
  );
}
