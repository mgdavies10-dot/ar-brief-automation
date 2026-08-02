import { outcomes } from "@/content/copy";
import { SectionLabel } from "./SectionLabel";

export function Outcomes() {
  return (
    <section id="outcomes" className="band-ivory">
      <div className="shell split">
        <SectionLabel index="05">Where this can land</SectionLabel>
        <div className="split-body">
          <h2>{outcomes.heading}</h2>
          <p className="lede" style={{ marginBottom: 30 }}>{outcomes.intro}</p>
          <ul className="outcomes">
            {outcomes.items.map((o) => <li key={o}>{o}</li>)}
          </ul>
          <p className="lede">{outcomes.close}</p>
        </div>
      </div>
    </section>
  );
}
