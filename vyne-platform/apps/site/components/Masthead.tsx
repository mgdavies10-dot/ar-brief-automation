import { meta, nav } from "@/content/copy";

export function Masthead() {
  return (
    <header className="masthead">
      <div className="shell masthead-inner">
        <a href="#top" className="wordmark" aria-label={`${meta.name}, back to top`}>
          VYNE <span>STRATEGIES</span>
        </a>
        <nav className="masthead-nav" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
