import type { Metadata } from "next";
import { PageHead } from "@/components/content/Templates";
export const metadata: Metadata = { title: "Disclosures — VYNE Strategies", robots: { index: false } };
export default function Page() {
  return (
    <>
      <PageHead kicker="Legal" title="Disclosures" crumbs={[]} />
      <section className="band-ivory"><div className="shell">
        <div className="mock-banner">
          <strong>This page is not yet in effect.</strong> VYNE Strategies is preparing this
          document with outside counsel. It is not published, not in effect, and should not be
          relied upon. Nothing on this page states VYNE&rsquo;s policy.
        </div>
      </div></section>
    </>
  );
}
