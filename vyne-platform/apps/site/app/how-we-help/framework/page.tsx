import type { Metadata } from "next";
import { PageHead, RelatedCluster } from "@/components/content/Templates";
import { framework } from "@/content/framework";
import { VYNE9 } from "@/content/vyne9";

export const metadata: Metadata = {
  title: "The VYNE Framework — VYNE Strategies",
  description:
    "Vision, Your Objectives, Navigate, Enterprise Economics. Four dimensions that have to be understood before any path can be compared.",
};

const ld = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "The VYNE Framework",
  description: framework.standfirst,
  step: framework.letters.map((l) => ({
    "@type": "HowToStep",
    name: `${l.letter} — ${l.word}`,
    text: l.line,
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHead
        kicker="How VYNE helps"
        title={framework.name}
        standfirst={framework.standfirst}
        crumbs={[{ label: "The VYNE Framework", href: "/how-we-help/framework" }]}
      />

      <section className="band-ivory">
        <div className="shell">
          <p className="lede measure-wide" style={{ marginBottom: 56 }}>{framework.intro}</p>
          <div className="fw-full">
            {framework.letters.map((l) => (
              <article className="fw-row" key={l.letter}>
                <div className="fw-mark" aria-hidden="true">{l.letter}</div>
                <div>
                  <h2>{l.word}</h2>
                  <p className="fw-line">{l.line}</p>
                  <p className="fw-body">{l.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band-navy band-deep">
        <div className="shell fw-split">
          <div>
            <p className="eyebrow">{framework.relation.heading}</p>
            <h2 className="measure">{framework.relation.body}</h2>
            <p style={{ marginTop: 34 }}>
              <a className="cta cta-inverse" href={VYNE9.route}>{VYNE9.cta}</a>
            </p>
          </div>
          <div className="fw-boundary">
            <p className="eyebrow">{framework.boundary.heading}</p>
            <ul>{framework.boundary.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="band-ivory">
        <div className="shell">
          <RelatedCluster
            items={[
              { label: VYNE9.name, href: VYNE9.route },
              { label: "Should I stay at my current firm or explore a move?", href: "/explore/stay-or-change-firms" },
              { label: "Confidentiality", href: "/why-vyne/confidentiality" },
              { label: "How VYNE is compensated", href: "/why-vyne/how-we-are-compensated" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
