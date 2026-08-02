import { serves } from "@/content/copy";

export function Serves() {
  return (
    <section id="serves" className="band-ivory">
      <div className="shell split">
        <div className="split-label"><p className="eyebrow">Who we serve</p></div>
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
