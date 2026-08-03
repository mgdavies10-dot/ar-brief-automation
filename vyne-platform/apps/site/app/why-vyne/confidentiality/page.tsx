import type { Metadata } from "next";
import { PageHead, RelatedCluster } from "@/components/content/Templates";
import { confidentiality } from "@/content/copy";

export const metadata: Metadata = {
  title: "Confidentiality — VYNE Strategies",
  description:
    "VYNE will not contact a firm about you, disclose your identity, or share your information without your explicit written authorization naming that specific firm.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Why VYNE"
        title="Confidentiality and advisor-controlled firm contact"
        standfirst="Exploring a decision should not put you at risk. The controls below apply from your first contact with us and do not depend on a separate agreement."
        crumbs={[{ label: "Why VYNE", href: "/why-vyne/about" }]}
      />
      <section className="band-navy band-deep">
        <div className="shell">
          <p className="pledge">{confidentiality.lead}</p>
        </div>
      </section>
      <section className="band-ivory">
        <div className="shell article">
          <div className="stack">
            {confidentiality.body.map((l) => <p key={l} className="lede">{l}</p>)}
          </div>
          <h2>What authorization is, and is not</h2>
          <ul className="bulleted">
            <li>A general willingness to explore is <strong>not</strong> authorization.</li>
            <li>Agreeing with a recommendation is <strong>not</strong> authorization.</li>
            <li>Authorization for one firm does <strong>not</strong> extend to another.</li>
            <li>Each authorization is written, names the firm, and is signed each time.</li>
            <li>
              We will not ask you to authorize an introduction in the same conversation in which we
              first recommend it.
            </li>
          </ul>
          <RelatedCluster
            items={[
              { label: "How VYNE is compensated", href: "/why-vyne/how-we-are-compensated" },
              { label: "The VYNE Framework", href: "/how-we-help/framework" },
              { label: "Request a confidential conversation", href: "/start/confidential-conversation" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
