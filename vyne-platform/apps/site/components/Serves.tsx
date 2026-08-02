import { serves } from "@/content/copy";

export function Serves() {
  return (
    <section id="serves">
      <div className="shell">
        <p className="eyebrow">Who we serve</p>
        <h2 className="measure">{serves.heading}</h2>
        <div className="stack measure">
          {serves.body.map((line) => (
            <p key={line} className="lede">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
