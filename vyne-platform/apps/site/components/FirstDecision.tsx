import { firstDecision } from "@/content/copy";
import { SectionLabel } from "./SectionLabel";

export function FirstDecision() {
  return (
    <section id="first-decision" className="band-ivory">
      <div className="shell split">
        <SectionLabel index="03">The starting point</SectionLabel>
        <div className="split-body">
          <h2>{firstDecision.heading}</h2>
          <div className="stack">
            {firstDecision.body.map((l) => <p key={l} className="lede">{l}</p>)}
          </div>
        </div>
      </div>
      <div className="shell">
        <div className="statement-block">
          <p>{firstDecision.emphasis}</p>
        </div>
      </div>
    </section>
  );
}
