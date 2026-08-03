import type { Metadata } from "next";
import { PageHead, RelatedCluster } from "@/components/content/Templates";

export const metadata: Metadata = {
  title: "The Eight VYNE Questions — VYNE Strategies",
  description:
    "Eight questions that establish what an advisor is actually deciding. An immediate, anonymous result. Nothing is submitted anywhere.",
};

const questions = [
  { n: "01", q: "What would have to be true for you to still be at your firm in five years?", why: "Separates objectives from grievances." },
  { n: "02", q: "Has the problem you are describing been raised internally, and what came back?", why: "An untested complaint is not yet a structural finding." },
  { n: "03", q: "Which capabilities does your practice genuinely need, and which are you working around?", why: "Capability requirements drive the model; the model drives the firm." },
  { n: "04", q: "Of what you refer out, do you know whether your firm offers it at all?", why: "Referral behaviour is not evidence of platform absence." },
  { n: "05", q: "If your economics improved but nothing else changed, would you still be considering this?", why: "Tests whether money is the cause or the proxy." },
  { n: "06", q: "Who on your team would come, and which of them have you actually asked?", why: "Assumed consent is a common transition failure." },
  { n: "07", q: "What do your agreements say — read, not remembered?", why: "Identifies the legal dependency early rather than late." },
  { n: "08", q: "What do you want to own in ten years, and does your current structure allow it?", why: "Surfaces the ownership or succession question hiding underneath." },
];

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Assessment"
        title="The Eight VYNE Questions"
        standfirst="Eight questions that establish what you are actually deciding, before anyone shows you an option. Your result appears immediately and anonymously. Nothing is submitted anywhere, and no firm is contacted."
        crumbs={[{ label: "Tools", href: "/tools/eight-questions" }]}
      />

      <section className="band-ivory">
        <div className="shell">
          <div className="mock-banner">
            <strong>The assessment is not yet active.</strong> The questions and scoring model are
            built; scoring and the optional emailed report are pending founder approval. Nothing
            you enter is collected, stored or sent.
          </div>

          <div className="eq-list">
            {questions.map((q) => (
              <div className="eq-item" key={q.n}>
                <span className="eq-num" aria-hidden="true">{q.n}</span>
                <div>
                  <h3>{q.q}</h3>
                  <p className="eq-why">{q.why}</p>
                  <div className="eq-scale" aria-hidden="true">
                    <span>Not at all</span>
                    <span className="eq-dots"><i /><i /><i /><i /><i /></span>
                    <span>Completely</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="eq-result">
            <p className="eyebrow">What you get immediately</p>
            <h2>An anonymous read of what you are actually deciding</h2>
            <p className="lede measure">
              Not a score, and not a recommendation. A short written statement of which question
              appears to be in play, what evidence would settle it, and what would have to be
              established before anyone could responsibly answer it.
            </p>
            <ul className="bulleted">
              <li>No email required to see your result.</li>
              <li>A deeper written version can be sent to you if you want it. That is optional.</li>
              <li>No firm is contacted. Nothing you enter reaches anyone outside VYNE.</li>
              <li>
                We do not ask for your CRD, exact revenue, exact assets, or any client
                information.
              </li>
            </ul>
            <div className="cta-row">
              <button className="cta" type="button" disabled>Begin the eight questions</button>
              <a className="cta-ghost" href="/start/confidential-conversation">
                Skip to a confidential conversation
              </a>
            </div>
          </div>

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
