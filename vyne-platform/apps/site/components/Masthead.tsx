import { meta, nav } from "@/content/copy";
import { Logo } from "./Brand";

export function Masthead() {
  return (
    <header className="masthead">
      <div className="shell masthead-inner">
        <a href="#top" className="masthead-brand" aria-label={`${meta.name}, back to top`}>
          <Logo height={64} />
        </a>
        <nav className="masthead-nav" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>{item.label}</a>
          ))}
        </nav>
        <details className="masthead-mobile">
          <summary aria-label="Sections">
            <span className="rule-stack" aria-hidden="true"><i /><i /></span>
          </summary>
          <div className="mobile-panel">
            <div className="mobile-panel-head">
              <Logo height={52} />
              <span className="mobile-close" aria-hidden="true">Close</span>
            </div>
            <nav aria-label="Sections">
              {nav.map((item, i) => (
                <a key={item.id} href={`#${item.id}`}>
                  <span className="mobile-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </details>
      </div>
      <div className="masthead-band" role="presentation" />
    </header>
  );
}
