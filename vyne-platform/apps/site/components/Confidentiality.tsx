import { confidentiality } from "@/content/copy";

export function Confidentiality() {
  return (
    <section id="confidentiality" className="panel-navy">
      <div className="shell">
        <p className="eyebrow">Confidentiality</p>
        <h2 className="measure">{confidentiality.heading}</h2>
        <p
          className="measure"
          style={{
            fontFamily: "var(--vyne-font-serif)",
            fontSize: "clamp(20px, 2.4vw, 25px)",
            lineHeight: 1.5,
            color: "var(--vyne-ivory)",
            marginBottom: 32,
          }}
        >
          {confidentiality.lead}
        </p>
        <div className="stack measure">
          {confidentiality.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
