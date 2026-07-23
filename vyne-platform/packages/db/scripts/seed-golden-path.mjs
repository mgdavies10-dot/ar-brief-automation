// seed-golden-path — the canonical M4 demonstration journey (EA-001 synthetic,
// local only). Establishes Robert Halvorsen's full arc so Twin → Our Perspective
// → Record can be walked end-to-end in one sitting:
//   • a complete Current Reality (the digital twin),
//   • a primary decision carrying Our Perspective,
//   • a Current Reality Record in review (a second-person letter, cooling period
//     already cleared) so the founder can approve it live and see authorship.
// Idempotent: safe to re-run. Direct DB connection (bypasses PostgREST); synthetic
// data only. Run: node scripts/seed-golden-path.mjs   (Supabase local must be up).

import { Client } from "pg";

const CONN = process.env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:54322/postgres";
const j = (v) => JSON.stringify(v);

// ---- The golden-path content ------------------------------------------------

const overview = "A $4.2M planning-led practice at a national wirehouse — roughly 35 households, very low turnover.";

// The twin's internal narrative (third person; lives on the Overview tab).
const executiveSummary =
  "Robert has spent twenty-two years building a planning-led practice in Greenwich that clients stay with for decades. Most of the growth has come through referrals and the relationships he holds personally, not through anything the firm provides. It's a durable, well-run practice whose value lives in Robert himself, not in the platform he sits on.";

const practiceProfile = {
  serviceModel: "planning-led",
  teamStructure: "Robert, two junior advisors, and a client-service associate",
  yearsInBusiness: 22,
  custodianOrPlatform: "a national wirehouse",
  clientAcquisition: "referrals and centers of influence",
  growthTrajectory: "steady, roughly 8% a year",
};
const goals = [
  { text: "Own the direction of the practice", priority: "high" },
  { text: "Keep more of the economics the practice generates", priority: "high" },
];
const motivations = [
  { text: "a payout grid that keeps shifting against him" },
  { text: "firm support that no longer matches what he pays for" },
];
const constraints = [
  { text: "deferred compensation vesting over the next three years", kind: "deferred_comp" },
  { text: "a non-solicit he hasn't yet reviewed closely", kind: "non_solicit" },
];
const strengths = [
  { text: "deep, multigenerational client relationships" },
  { text: "a disciplined, repeatable planning process" },
];
const frictions = [{ text: "platform fees that rise faster than the value they return" }];
const findings = [{ text: "the practice would likely travel well to independence", kind: "opportunity" }];
const dimensionConfidence = {
  overview: "confirmed",
  practiceProfile: "confirmed",
  goals: "confirmed",
  motivations: "confirmed",
  constraints: "assumed",
  strengths: "confirmed",
  frictions: "assumed",
  findings: "assumed",
};

const question = "Should Robert pursue supported independence?";
const recommendation = {
  perspective:
    "Based on our conversations and our understanding of your business, we believe a supported-independence model deserves serious consideration. It would let you keep far more of the economics you already generate and give you real ownership of the practice's direction, while retaining the brand and compliance support you value. We're not ready to call it the answer — but of the paths in front of you, it's the one that best fits what you've told us matters.",
  rationale:
    "Your growth has come almost entirely from relationships you own, not from anything the firm provides. That's the strongest signal we look for: when the value travels with the advisor, independence tends to reward it.",
  assumptions:
    "That your deferred compensation and non-solicit terms are navigable, and that your two junior advisors would come with you. We haven't confirmed either yet.",
  whatCouldChange:
    "A meaningful retention package, or a non-solicit that's harder to work around than expected, would change the calculus — and we'd tell you plainly if it did.",
};

// The Record — a second-person letter (composed draft, lightly polished, with a
// consultant-authored closing movement).
const recordContent = {
  understand:
    "You've built a planning-led practice, twenty-two years in the making, on a national wirehouse — and your growth has come almost entirely through referrals and the relationships you hold yourself. It's a business that runs on trust you've earned, not on the firm you happen to sit inside.",
  mattersMost:
    "For you, the priorities are clear: to own the direction of the practice, and to keep more of the economics it generates. What's bringing this to a head is a payout grid that keeps shifting against you, and support that no longer matches what you pay for.",
  perspective: recommendation.perspective,
  understandFurther:
    "Before we'd make a stronger recommendation, we'd want to confirm two things we're currently only assuming: the specifics of your deferred compensation and non-solicit, and whether your two junior advisors would move with you. Both would materially change the picture.",
  focusNext:
    "If it were us, the next step wouldn't be a decision — it would be clarity. A close read of your agreement, so we know exactly what we're working with before we point to a direction. Everything after that gets easier to weigh.",
};

// ---- Seed -------------------------------------------------------------------

async function main() {
  const client = new Client({ connectionString: CONN });
  await client.connect();
  try {
    const rec = await client.query("select id from public.users where email=$1", ["demo.recruiter@synthetic.vyne.test"]);
    const recruiterId = rec.rows[0]?.id ?? null;
    if (!recruiterId) {
      console.error("Demo recruiter not found — run `npm run provision` (or demo:reset) first.");
      process.exit(1);
    }
    const firm = await client.query("select id from public.firms order by created_at limit 1");
    const firmId = firm.rows[0]?.id ?? null;

    // Robert Halvorsen — the canonical synthetic demonstration persona (EA-001;
    // local only). Create him if absent; otherwise refresh his commercial facts.
    const restrictions = "Deferred compensation vesting over the next three years; a non-solicit not yet reviewed closely.";
    const adv = await client.query(
      "select id from public.advisors where lower(first_name)=$1 and lower(last_name)=$2 and deleted_at is null order by created_at limit 1",
      ["robert", "halvorsen"],
    );
    let advisorId;
    if (adv.rows.length) {
      advisorId = adv.rows[0].id;
      await client.query(
        `update public.advisors set current_firm_id=$2, city='Greenwich', state='CT', channel='wirehouse',
           aum=620000000, t12_reported=4200000, t12_verified=4200000, restrictions=$3,
           relationship_owner_id=coalesce(relationship_owner_id,$4) where id=$1`,
        [advisorId, firmId, restrictions, recruiterId],
      );
    } else {
      const ins = await client.query(
        `insert into public.advisors
           (first_name,last_name,current_firm_id,city,state,channel,aum,t12_reported,t12_verified,restrictions,source,relationship_owner_id,created_by)
         values ('Robert','Halvorsen',$1,'Greenwich','CT','wirehouse',620000000,4200000,4200000,$2,'referral',$3,$3)
         returning id`,
        [firmId, restrictions, recruiterId],
      );
      advisorId = ins.rows[0].id;
    }

    await client.query(
      `insert into public.current_reality
         (advisor_id, status, overview, executive_summary, practice_profile, goals, motivations,
          constraints, strengths, frictions, findings, dimension_confidence, created_by)
       values ($1,'complete',$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       on conflict (advisor_id) do update set
         status='complete', overview=excluded.overview, executive_summary=excluded.executive_summary,
         practice_profile=excluded.practice_profile, goals=excluded.goals, motivations=excluded.motivations,
         constraints=excluded.constraints, strengths=excluded.strengths, frictions=excluded.frictions,
         findings=excluded.findings, dimension_confidence=excluded.dimension_confidence`,
      [advisorId, overview, executiveSummary, j(practiceProfile), j(goals), j(motivations), j(constraints),
       j(strengths), j(frictions), j(findings), j(dimensionConfidence), recruiterId],
    );

    const dec = await client.query(
      "select id from public.decisions where advisor_id=$1 and is_primary=true and deleted_at is null limit 1",
      [advisorId],
    );
    let decisionId;
    if (dec.rows.length) {
      decisionId = dec.rows[0].id;
      await client.query(
        "update public.decisions set decision_type='supported_independence', status='open', question=$2, recommendation=$3 where id=$1",
        [decisionId, question, j(recommendation)],
      );
    } else {
      const ins = await client.query(
        `insert into public.decisions (advisor_id, decision_type, status, is_primary, question, recommendation, created_by)
         values ($1,'supported_independence','open',true,$2,$3,$4) returning id`,
        [advisorId, question, j(recommendation), recruiterId],
      );
      decisionId = ins.rows[0].id;
    }

    // Cooling already cleared (edited two days ago) so the founder can approve live.
    const twoDaysAgo = new Date(Date.now() - 2 * 86_400_000).toISOString();
    const art = await client.query(
      "select id from public.artifacts where decision_id=$1 and artifact_type='current_reality' and deleted_at is null limit 1",
      [decisionId],
    );
    if (art.rows.length) {
      await client.query(
        `update public.artifacts set content=$2, status='in_review', submitted_by=$3, submitted_at=$4,
           content_edited_at=$4, approved_by=null, approved_at=null, cooling_override_reason=null where id=$1`,
        [art.rows[0].id, j(recordContent), recruiterId, twoDaysAgo],
      );
    } else {
      await client.query(
        `insert into public.artifacts
           (decision_id, artifact_type, version, status, content, created_by, submitted_by, submitted_at, content_edited_at)
         values ($1,'current_reality',1,'in_review',$2,$3,$3,$4,$4)`,
        [decisionId, j(recordContent), recruiterId, twoDaysAgo],
      );
    }

    console.log("Golden path seeded for Robert Halvorsen:");
    console.log(`  advisor    ${advisorId}`);
    console.log(`  decision   ${decisionId} (supported_independence, primary)`);
    console.log("  twin       complete · perspective set · Record in review (cooling cleared)");
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
