import { questions } from "@/content/copy";

export function Questions() {
  return (
    <section id="questions" className="band-ivory">
      <div className="shell split">
        <div className="split-label"><p className="eyebrow">In their words</p></div>
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
