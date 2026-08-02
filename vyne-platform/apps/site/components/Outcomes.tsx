import { outcomes } from "@/content/copy";

export function Outcomes() {
  return (
    <section id="outcomes" className="band-ivory">
      <div className="shell split">
        <div className="split-label"><p className="eyebrow">Where this can land</p></div>
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
