import { outcomes } from "@/content/copy";

export function Outcomes() {
  return (
    <section id="outcomes">
      <div className="shell">
        <p className="eyebrow">Where this can land</p>
        <h2 className="measure">{outcomes.heading}</h2>
        <p className="lede measure" style={{ marginBottom: 32 }}>
          {outcomes.intro}
        </p>
        <ul className="outcomes measure-wide">
          {outcomes.items.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <p className="lede measure">{outcomes.close}</p>
      </div>
    </section>
  );
}
