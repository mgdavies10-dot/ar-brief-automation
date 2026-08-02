import { confidentiality } from "@/content/copy";
import { Branching } from "./Brand";

/**
 * Navy. Confidentiality is the central trust element of the page, so it gets the
 * strongest treatment and branching motif placement 2 of 2. No mark — the asset
 * cannot be reversed onto navy.
 */
export function Confidentiality() {
  return (
    <section id="confidentiality" className="band-navy band-navy-deep">
      <Branching tone="dark" className="conf-motif" />
      <div className="shell">
        <div className="conf-label"><span className="label-index" aria-hidden="true">06</span><span className="label-rule" aria-hidden="true" /><p className="eyebrow">Confidentiality</p></div>
        <h2 className="measure">{confidentiality.heading}</h2>
        <p className="pledge">{confidentiality.lead}</p>
        <div className="conf-grid">
          {confidentiality.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
