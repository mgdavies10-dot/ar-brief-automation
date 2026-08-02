import { hero } from "@/content/copy";
import { mailto } from "@/content/mailto";
import { Branching } from "./Brand";

/** Branching motif placement 1 of 2. */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Consulting for financial advisors</p>
          <h1>{hero.heading}</h1>
          <div className="hero-rule" role="presentation" />
          <div className="stack">
            {hero.body.map((line) => <p key={line} className="lede">{line}</p>)}
          </div>
          <p className="hero-cta">
            <a className="cta" href={mailto}>{hero.cta}</a>
          </p>
        </div>
        <Branching tone="light" className="hero-motif" />
      </div>
    </section>
  );
}
