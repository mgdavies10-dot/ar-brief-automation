import type { Metadata } from "next";
import {
  PageHead, MethodologyPanel, CannotTellYou, RelatedCluster,
} from "@/components/content/Templates";

export const metadata: Metadata = {
  title: "Independent advisor net payout — VYNE Strategies",
  description:
    "A transparent scenario tool estimating pre-tax owner economics for an independent advisor from assumptions you select and can edit.",
};

const inputs = [
  { id: "gross", label: "Gross revenue", unit: "$", def: "", help: "Trailing twelve months, all sources.", src: "Advisor-entered. No default." },
  { id: "payout", label: "Platform payout rate", unit: "%", def: "", help: "The share retained before your own expenses.", src: "Advisor-entered. No published default — rates vary materially by platform and scale." },
  { id: "admin", label: "Platform and administrative fees", unit: "$", def: "", help: "Technology, compliance, E&O, affiliation fees.", src: "Advisor-entered." },
  { id: "staff", label: "Staff compensation", unit: "$", def: "", help: "Salaries, payroll taxes and benefits you pay.", src: "Advisor-entered." },
  { id: "occupancy", label: "Occupancy and operations", unit: "$", def: "", help: "Rent, utilities, insurance, professional services.", src: "Advisor-entered." },
  { id: "other", label: "Other business expenses", unit: "$", def: "", help: "Marketing, travel, data, subscriptions.", src: "Advisor-entered." },
];

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Scenario tool"
        title="Independent advisor net payout"
        standfirst="A transparent model of estimated pre-tax owner economics, built from assumptions you select and can change. Every input is visible. Nothing is hidden inside the calculation."
        crumbs={[{ label: "Tools", href: "/tools/eight-questions" }]}
      />

      <section className="band-ivory">
        <div className="shell">
          <div className="mock-banner">
            <strong>Calculation is not yet active.</strong> The interface is built; the formula
            specification and quality-assurance scenarios are pending founder approval. No result
            is produced, and nothing you type is collected, stored or sent.
          </div>

          <div className="tool-grid">
            <div className="tool-inputs">
              <p className="eyebrow">Your assumptions</p>
              <p className="lede" style={{ marginBottom: 30 }}>
                Every field is yours to set. Where VYNE cannot source a defensible default, the
                field stays blank rather than carrying an invented industry average.
              </p>
              {inputs.map((f) => (
                <div className="field" key={f.id}>
                  <label htmlFor={f.id}>
                    {f.label} <span className="field-unit">{f.unit}</span>
                  </label>
                  <input id={f.id} type="text" inputMode="numeric" placeholder="—" disabled />
                  <p className="field-help">{f.help}</p>
                  <p className="field-src">{f.src}</p>
                </div>
              ))}
            </div>

            <aside className="tool-result">
              <p className="eyebrow">Modelled result</p>
              <div className="result-figure">
                <span className="result-label">Estimated pre-tax owner economics</span>
                <span className="result-value">&mdash;</span>
                <span className="result-note">
                  Awaiting approved formula. This figure is pre-tax and is not take-home pay.
                </span>
              </div>
              <div className="result-sensitivity">
                <p className="eyebrow">Sensitivity</p>
                <p>
                  When active, this panel shows how the result moves across a range around your
                  payout-rate and expense assumptions, because a single point estimate overstates
                  precision.
                </p>
              </div>
              <a className="cta-ghost" href="/start/confidential-conversation">
                Discuss what this means for your practice
              </a>
            </aside>
          </div>

          <MethodologyPanel
            effectiveDate="Pending — set on formula approval"
            reviewer="Pending — a named professional reviewer is required before activation"
            refresh="Pending — refresh cadence set on approval"
            notes={[
              "Outputs are described as modelled estimates or ranges, never as certainties.",
              "The term take-home pay is not used, because taxes are not modelled here.",
              "Assumptions remain visible and editable. Hidden industry assumptions are prohibited.",
              "Where a defensible default cannot be sourced and dated, the field is left blank.",
              "Built independently from the underlying mathematics. No third-party formulas, layout, wording or disclaimers are used.",
            ]}
          />

          <CannotTellYou
            items={[
              "Your tax outcome. Nothing here is modelled after tax.",
              "Whether independence is the right model for your practice.",
              "What a specific platform would actually offer you.",
              "What your practice is worth, which is a separate question requiring a specialist.",
              "How much of your book would transfer, which is not an economics question.",
              "Whether you should move, stay, wait, or address the problem where you are.",
            ]}
          />

          <RelatedCluster
            items={[
              { label: "W-2 advisor net payout", href: "/tools/w2-net-payout" },
              { label: "Practice value scenario explorer", href: "/tools/practice-value" },
              { label: "Independence options", href: "/explore/independence-options" },
              { label: "Enterprise economics", href: "/explore/enterprise-economics" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
