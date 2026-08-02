import { compensation } from "@/content/copy";
import { SectionLabel } from "./SectionLabel";

export function Compensation() {
  return (
    <section id="compensation" className="band-ivory">
      <div className="shell split">
        <SectionLabel index="07">Disclosure</SectionLabel>
        <div className="split-body">
          <h2>{compensation.heading}</h2>
          <div className="disclosure">
            <p>{compensation.disclosure}</p>
            <p>{compensation.controls}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
