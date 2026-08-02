import { compensation } from "@/content/copy";

export function Compensation() {
  return (
    <section id="compensation">
      <div className="shell">
        <p className="eyebrow">Disclosure</p>
        <h2 className="measure">{compensation.heading}</h2>
        <div className="disclosure measure-wide stack">
          <p>{compensation.disclosure}</p>
          <p>{compensation.controls}</p>
        </div>
      </div>
    </section>
  );
}
