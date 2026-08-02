import { firstDecision } from "@/content/copy";

export function FirstDecision() {
  return (
    <section id="first-decision">
      <div className="shell">
        <p className="eyebrow">The starting point</p>
        <h2 className="measure">{firstDecision.heading}</h2>
        <div className="stack measure">
          {firstDecision.body.map((line) => (
            <p key={line} className="lede">
              {line}
            </p>
          ))}
        </div>
        <p className="statement measure">{firstDecision.emphasis}</p>
      </div>
    </section>
  );
}
