import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

/**
 * Dashboard (M4 interim). The full Command Center (§5.1) is a later feature;
 * for now this is a calm entry point that orients on the work: advisors and
 * their decisions. Deliberately not a wall of KPIs — VYNE opens on judgment,
 * not charts.
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("users").select("full_name").maybeSingle();
  const { count } = await supabase
    .from("advisors")
    .select("id", { count: "exact", head: true });
  const first = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="page">
      <header className="page-head">
        <h1 className="page-title">Good to see you, {first}.</h1>
        <div className="page-rule" />
        <p className="page-lede">
          Your work lives in the advisors you&rsquo;re guiding and the decisions
          they&rsquo;re weighing. Start there.
        </p>
      </header>

      <Link href="/advisors" className="entry-card">
        <div className="entry-card-eyebrow">Operate</div>
        <div className="entry-card-title">Advisors</div>
        <p className="entry-card-note">
          {count === 0
            ? "No advisors yet — add the first one to begin their Current Reality."
            : `${count} advisor${count === 1 ? "" : "s"} in your care. Open one to see where things stand.`}
        </p>
        <span className="entry-card-go">Open Advisors →</span>
      </Link>
    </div>
  );
}
