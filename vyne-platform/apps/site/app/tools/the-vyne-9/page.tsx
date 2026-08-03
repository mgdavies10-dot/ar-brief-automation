import type { Metadata } from "next";
import { PageHead, RelatedCluster } from "@/components/content/Templates";
import { VYNE9, questions, readings, promises } from "@/content/vyne9";

export const metadata: Metadata = {
  title: "The VYNE 9 — VYNE Strategies",
  description:
    "Nine questions that establish what an advisor is actually deciding. An immediate, anonymous reading. Nothing is submitted anywhere.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Assessment"
        title={VYNE9.name}
        standfirst={VYNE9.standfirst}
        crumbs={[{ label: "Tools", href: VYNE9.route }]}
      />

      <section className="band-ivory">
        <div className="shell">
          <div className="v9-promises">
            <ul>{promises.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>

          <div className="v9-list">
            {questions.map((q) => (
              <div className="v9-item" key={q.n}>
                <div className="v9-side">
                  <span className="v9-num" aria-hidden="true">{q.n}</span>
                  <span className="v9-lens">{q.lens}</span>
                </div>
                <div className="v9-body">
                  <h2>{q.q}</h2>
                  <p className="v9-why">{q.why}</p>
                  <div className="v9-scale" role="group" aria-label={`Response to question ${q.n}`}>
                    <span className="v9-anchor">Not yet</span>
                    <span className="v9-dots" aria-hidden="true">
                      <i /><i /><i /><i /><i />
                    </span>
                    <span className="v9-anchor">Clearly</span>
                  </div>
                  <textarea
                    className="v9-note"
                    rows={2}
                    placeholder="Anything you want to say in your own words — optional"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band-navy band-deep">
        <div className="shell">
          <p className="eyebrow">Your reading</p>
          <h2 className="measure">Four readings. None of them is a recommendation.</h2>
          <p className="lede measure" style={{ marginBottom: 46 }}>
            The VYNE 9 does not score you, rank firms, or tell you to move. It returns a written
            reading of what your answers indicate you are actually deciding — and what would have
            to be established before anyone could responsibly answer it.
          </p>
          <div className="v9-readings">
            {readings.map((r) => (
              <div className="v9-reading" key={r.key}>
                <span className="v9-reading-label">{r.label}</span>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
          <p className="v9-foot">
            Two of these four readings — <strong>stay</strong> and <strong>strengthen</strong> —
            generate no fee for VYNE. They remain available readings because a diagnostic that can
            only point one way is not a diagnostic.
          </p>
        </div>
      </section>

      <section className="band-ivory">
        <div className="shell v9-after">
          <div>
            <p className="eyebrow">After your reading</p>
            <h2>Entirely your choice, in this order</h2>
            <ol className="numbered">
              <li>
                <strong>See your reading.</strong> Immediately, on screen, anonymously. No email.
              </li>
              <li>
                <strong>Have the fuller version sent to you.</strong> Optional. A written expansion
                of what each answer implies and what would settle it.
              </li>
              <li>
                <strong>Talk it through confidentially.</strong> Optional. A conversation, with no
                obligation and nothing shared with any firm.
              </li>
            </ol>
            <div className="cta-row">
              <button className="cta" type="button">Begin The VYNE 9</button>
              <a className="cta-ghost" href="/start/confidential-conversation">
                Skip to a confidential conversation
              </a>
            </div>
          </div>
          <aside className="v9-guard">
            <p className="eyebrow">What this never does</p>
            <ul className="bulleted">
              <li>Contact a firm about you.</li>
              <li>Ask for your CRD, exact revenue or exact assets.</li>
              <li>Ask for documents or client information.</li>
              <li>Name a best firm or tell you a move is required.</li>
              <li>Produce a score, a percentage, or a grade.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="band-ivory">
        <div className="shell">
          <RelatedCluster
            items={[
              { label: "Should I stay at my current firm or explore a move?", href: "/explore/stay-or-change-firms" },
              { label: "Independent advisor net payout", href: "/tools/independent-net-payout" },
              { label: "The VYNE Framework", href: "/how-we-help/framework" },
              { label: "Confidentiality", href: "/why-vyne/confidentiality" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
