import { compensation } from "@/content/copy";

export function Compensation() {
  return (
    <section id="compensation" className="band-ivory">
      <div className="shell split">
        <div className="split-label"><p className="eyebrow">Disclosure</p></div>
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
