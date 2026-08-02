import { questions } from "@/content/copy";
import { SectionLabel } from "./SectionLabel";

export function Questions() {
  return (
    <section id="questions" className="band-ivory">
      <div className="shell split">
        <SectionLabel index="02">In their words</SectionLabel>
        <div className="split-body">
          <h2>{questions.heading}</h2>
          <p className="lede" style={{ marginBottom: 36 }}>{questions.intro}</p>
          <ul className="questions">
            {questions.items.map((q) => <li key={q}>{q}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
