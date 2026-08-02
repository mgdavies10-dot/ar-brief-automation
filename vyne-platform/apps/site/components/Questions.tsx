import { questions } from "@/content/copy";

export function Questions() {
  return (
    <section id="questions">
      <div className="shell">
        <p className="eyebrow">In their words</p>
        <h2 className="measure">{questions.heading}</h2>
        <p className="lede measure" style={{ marginBottom: 40 }}>
          {questions.intro}
        </p>
        <ul className="questions measure-wide">
          {questions.items.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
