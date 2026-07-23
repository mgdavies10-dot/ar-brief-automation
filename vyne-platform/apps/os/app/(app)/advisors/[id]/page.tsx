import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  currentRealitySchema,
  currentRealityCompleteness,
  understandingScore,
  dimensionsToLearn,
  generateSummaryDraft,
  assessConviction,
  recommendationSchema,
  currentRealityRecordSchema,
  coolingStatus,
  DIMENSION_LABELS,
  type CurrentReality,
  type DecisionType,
} from "@vyne/domain";
import { RealityEditor } from "./reality-editor";
import { DirectionPanel, type DirectionInitial } from "./direction";
import { RecordPanel, type RecordInitial } from "./record";

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

  const score = understandingScore(cr);
  // Calm language, not a gauge — consistent with "professional judgment, not
  // algorithmic certainty." We never score the advisor; we describe our own grasp.
  const understandingPhrase =
    score >= 0.75
      ? `We understand ${first}’s practice deeply.`
      : score >= 0.5
        ? `We understand ${first}’s practice well.`
        : score >= 0.25
          ? `Our understanding of ${first}’s practice is developing.`
          : `Our understanding of ${first}’s practice is still forming.`;
  const toLearn = dimensionsToLearn(cr);
  const draft = generateSummaryDraft(cr, name);
  const summaryText = cr.executiveSummary?.trim() || draft;
  const isDraft = !cr.executiveSummary?.trim() && Boolean(draft);

  return (
    <article className="summary">
      <p className="summary-kicker">Here&rsquo;s how we understand {first}&rsquo;s business</p>

      <p className="understanding-phrase">{understandingPhrase}</p>

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
  const first = advisor.first_name;
  const t12 = fmtMoney(advisor.t12_verified ?? advisor.t12_reported);
  const activeTab =
    tab === "reality" ? "reality" : tab === "direction" ? "direction" : tab === "record" ? "record" : "overview";
  const hasContent = pct > 0;

  // Direction (F2): the advisor's primary decision + VYNE's conviction (derived
  // from the twin, never stored). RLS is the authority on visibility.
  const { data: decisionRow } = await supabase
    .from("decisions")
    .select("id, decision_type, question, recommendation")
    .eq("advisor_id", id)
    .eq("is_primary", true)
    .is("deleted_at", null)
    .maybeSingle();

  const conviction = assessConviction(cr, name);
  const directionInitial: DirectionInitial | null = decisionRow
    ? {
        decisionType: (decisionRow.decision_type as DecisionType) ?? "",
        question: (decisionRow.question as string) ?? "",
        recommendation: recommendationSchema.parse(decisionRow.recommendation ?? {}),
      }
    : null;

  // Record (F3): the current_reality artifact on the primary decision. Approval is
  // founder-only, so we resolve the viewer's role and compute cooling here.
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  const { data: me } = authUser
    ? await supabase.from("users").select("role").eq("auth_id", authUser.id).maybeSingle()
    : { data: null };
  const isFounder = me?.role === "founder";

  let recordInitial: RecordInitial = {
    status: "none",
    content: {},
    perspectiveAsOf: null,
    preparedByLabel: null,
    submittedLabel: null,
    approvedLabel: null,
    canApprove: false,
    coolingMessage: "",
    overrideReason: null,
  };
  if (decisionRow?.id) {
    const { data: art } = await supabase
      .from("artifacts")
      .select("status, content, content_edited_at, created_by, submitted_at, submitted_by, approved_at, approved_by, cooling_override_reason")
      .eq("decision_id", decisionRow.id)
      .eq("artifact_type", "current_reality")
      .is("deleted_at", null)
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (art) {
      const actorIds = [art.created_by, art.submitted_by, art.approved_by].filter(Boolean) as string[];
      const names = new Map<string, string>();
      if (actorIds.length) {
        const { data: us } = await supabase.from("users").select("id, full_name").in("id", actorIds);
        for (const u of us ?? []) names.set(u.id as string, (u.full_name as string) ?? "—");
      }
      const fmtDay = (s: string | null) =>
        s ? new Date(s).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : null;
      // Date of perspective: when the judgment was set — approval if approved, else last edit.
      const asOfSource = (art.approved_at as string) ?? (art.content_edited_at as string) ?? null;
      const perspectiveAsOf = asOfSource
        ? new Date(asOfSource).toLocaleDateString(undefined, { month: "long", year: "numeric" })
        : null;
      const cool = coolingStatus(art.content_edited_at ? new Date(art.content_edited_at as string) : null, new Date());
      const parsedContent = currentRealityRecordSchema.safeParse(art.content ?? {});
      recordInitial = {
        status: art.status as RecordInitial["status"],
        content: parsedContent.success ? parsedContent.data : {},
        perspectiveAsOf,
        preparedByLabel: art.created_by ? `Prepared by ${names.get(art.created_by as string) ?? "—"}` : null,
        submittedLabel: art.submitted_at ? `Submitted by ${names.get(art.submitted_by as string) ?? "—"} — ${fmtDay(art.submitted_at as string)}` : null,
        approvedLabel: art.approved_at ? `Approved by ${names.get(art.approved_by as string) ?? "—"} — ${fmtDay(art.approved_at as string)}` : null,
        canApprove: cool.available,
        coolingMessage: cool.message,
        overrideReason: (art.cooling_override_reason as string) ?? null,
      };
    }
  }

  return (
    <div className="workspace">
      <header className="ws-head">
        <Link href="/advisors" className="ws-back">← Advisors</Link>
        <h1 className="ws-name">{name}</h1>
        <p className="ws-meta">{[firm, [advisor.city, advisor.state].filter(Boolean).join(", "), t12, owner?.full_name ? `Owner: ${owner.full_name}` : null].filter(Boolean).join(" · ")}</p>
        <div className="ws-tabs">
          <Link href={`/advisors/${id}`} className={`ws-tab${activeTab === "overview" ? " is-active" : ""}`}>Overview</Link>
          <Link href={`/advisors/${id}?tab=reality`} className={`ws-tab${activeTab === "reality" ? " is-active" : ""}`}>Current Reality</Link>
          <Link href={`/advisors/${id}?tab=direction`} className={`ws-tab${activeTab === "direction" ? " is-active" : ""}`}>Direction</Link>
          <Link href={`/advisors/${id}?tab=record`} className={`ws-tab${activeTab === "record" ? " is-active" : ""}`}>Record</Link>
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
        ) : activeTab === "direction" ? (
          <DirectionPanel advisorId={id} advisorFirst={first} conviction={conviction} initial={directionInitial} />
        ) : activeTab === "record" ? (
          <RecordPanel
            advisorId={id}
            advisorFirst={first}
            advisorName={name}
            cr={cr}
            recommendation={directionInitial?.recommendation ?? null}
            isFounder={isFounder}
            hasDecision={Boolean(decisionRow?.id)}
            initial={recordInitial}
          />
        ) : (
          <RealityEditor advisorId={id} advisorName={name} initial={cr} />
        )}
      </div>
    </div>
  );
}
