import { serves } from "@/content/copy";
import { SectionLabel } from "./SectionLabel";

export function Serves() {
  return (
    <section id="serves" className="band-ivory">
      <div className="shell split">
        <SectionLabel index="01">Who we serve</SectionLabel>
        <div className="split-body">
          <h2>{serves.heading}</h2>
          <div className="stack">
            {serves.body.map((l) => <p key={l} className="lede">{l}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
