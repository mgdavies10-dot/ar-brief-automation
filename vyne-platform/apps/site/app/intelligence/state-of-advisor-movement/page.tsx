import type { Metadata } from "next";
import { PageHead, RelatedCluster } from "@/components/content/Templates";

export const metadata: Metadata = {
  title: "State of Advisor Movement — VYNE Strategies",
  description:
    "VYNE's standing research programme on why advisors move, stay and wait — and what the evidence actually supports.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Standing research programme"
        title="State of Advisor Movement"
        standfirst="A continuing study of why advisors move, why they stay, and why a great many wait. Source-backed, dated, and explicit about what it cannot establish."
        crumbs={[{ label: "Intelligence", href: "/intelligence/insights" }]}
      />

      <section className="band-ivory">
        <div className="shell">
          <div className="mock-banner">
            <strong>The first edition is in preparation.</strong> This page describes the
            programme and its evidence standards. No findings are published yet, and none are
            implied.
          </div>

          <div className="som-grid">
            <div>
              <h2>What this programme is</h2>
              <p className="lede">
                Most published movement data counts transactions. It records who moved, where, and
                how much followed. That is useful and incomplete: it cannot see the advisors who
                examined a move carefully and correctly decided against one.
              </p>
              <p className="lede">
                VYNE&rsquo;s programme sets out to study the whole decision — including its
                non-events. An advisor who stayed after rigorous examination is a data point, not
                an absence of one.
              </p>

              <h2>Evidence standards</h2>
              <ul className="bulleted">
                <li>
                  <strong>Every claim is classed</strong> — verified fact, firm claim, market
                  observation, assumption, or VYNE interpretation.
                </li>
                <li>
                  <strong>Firm claims are attributed and dated</strong>, never presented as
                  established fact.
                </li>
                <li><strong>Sample and method are stated</strong> before any finding.</li>
                <li>
                  <strong>What the data cannot establish</strong> is stated as prominently as what
                  it can.
                </li>
                <li>
                  <strong>No advisor is identifiable</strong>, and no client information appears in
                  any form.
                </li>
              </ul>

              <h2>What it will not do</h2>
              <p className="lede">
                It will not rank firms, name a best destination, publish an advisor&rsquo;s
                identity, or present a directional conclusion about what any individual should do.
                Research that concludes in a recommendation is marketing.
              </p>
            </div>

            <aside className="som-side">
              <div className="report-cover report-cover-static">
                <span className="report-kicker">Edition one</span>
                <span className="report-title">State of Advisor Movement</span>
                <span className="report-meta">In preparation</span>
              </div>
              <p className="eyebrow" style={{ marginTop: 30 }}>Be told when it publishes</p>
              <div className="newsletter-form newsletter-form-stack">
                <label className="sr-only" htmlFor="som">Email address</label>
                <input id="som" type="email" placeholder="you@firm.com" disabled />
                <button className="cta" type="button" disabled>Notify me</button>
              </div>
              <p className="mock-note">Disabled in this build. Nothing collected or sent.</p>
            </aside>
          </div>

          <RelatedCluster
            items={[
              
              
              
              { label: "Should I stay at my current firm or explore a move?", href: "/explore/stay-or-change-firms" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
