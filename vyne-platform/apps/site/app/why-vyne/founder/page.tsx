import type { Metadata } from "next";
import { PageHead } from "@/components/content/Templates";
import { founderDraft } from "@/content/pages";

export const metadata: Metadata = { title: "Founder — VYNE Strategies" };

export default function Page() {
  const live = founderDraft.approved && founderDraft.name;
  return (
    <>
      <PageHead
        kicker="Why VYNE"
        title="Founder"
        standfirst="An advisor weighing a consequential decision is entitled to know who is exercising the judgment, and to hold that person accountable for it."
        crumbs={[{ label: "Why VYNE", href: "/why-vyne/about" }]}
      />
      <section className="band-ivory">
        <div className="shell founder-page">
          <div className="founder-portrait founder-portrait-lg">
            <span>Portrait pending approval</span>
          </div>
          <div>
            {live ? (
              <>
                <h2>{founderDraft.name}</h2>
                <div className="stack">
                  {founderDraft.body.map((l) => <p key={l} className="lede">{l}</p>)}
                </div>
              </>
            ) : (
              <>
                <div className="mock-banner">
                  <strong>Not yet published.</strong> {founderDraft.placeholder} No biography
                  detail is inferred or displayed until the founder approves it.
                </div>
                <h2>What will appear here</h2>
                <ul className="bulleted">
                  <li>Who is accountable for VYNE&rsquo;s professional judgment, by name.</li>
                  <li>The experience that informs it.</li>
                  <li>Why VYNE was founded, in the founder&rsquo;s own words.</li>
                  <li>A real portrait, not stock photography.</li>
                </ul>
              </>
            )}
            <p style={{ marginTop: 30 }}>
              <a className="cta" href="/start/confidential-conversation">
                Request a confidential conversation
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
