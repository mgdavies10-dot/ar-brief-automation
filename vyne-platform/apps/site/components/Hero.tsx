import { contact, hero } from "@/content/copy";
import { mailto } from "@/content/mailto";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell">
        <h1 className="measure-wide">{hero.heading}</h1>
        <div className="hero-rule" role="presentation" />
        <div className="stack measure">
          {hero.body.map((line) => (
            <p key={line} className="lede">
              {line}
            </p>
          ))}
        </div>
        <p style={{ marginTop: 40 }}>
          <a className="cta" href={mailto}>
            {hero.cta}
          </a>
        </p>
      </div>
    </section>
  );
}
