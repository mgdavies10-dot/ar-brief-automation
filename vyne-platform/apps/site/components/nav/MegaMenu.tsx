"use client";
import { useState } from "react";
import { navGroups, primaryCta, startItems } from "@/content/nav";
import { Logo } from "@/components/brand/Logo";
import { meta } from "@/content/copy";

export function MegaMenu() {
  const [open, setOpen] = useState<string | null>(null);
  const [panel, setPanel] = useState(false);

  return (
    <header className="masthead" onMouseLeave={() => setOpen(null)}>
      <div className="shell masthead-inner">
        <a href="/" className="masthead-brand" aria-label={`${meta.name}, home`}>
          <Logo height={60} />
        </a>

        <nav className="masthead-nav" aria-label="Primary">
          {navGroups.map((g) => (
            <button
              key={g.id}
              className={open === g.id ? "navtrigger is-open" : "navtrigger"}
              onMouseEnter={() => setOpen(g.id)}
              onFocus={() => setOpen(g.id)}
              onClick={() => setOpen(open === g.id ? null : g.id)}
              aria-expanded={open === g.id}
            >
              {g.label}
            </button>
          ))}
        </nav>

        <a className="masthead-cta" href={primaryCta.href}>{primaryCta.label}</a>

        <button
          className="masthead-burger"
          aria-label="Menu"
          aria-expanded={panel}
          onClick={() => setPanel(true)}
        >
          <span className="rule-stack" aria-hidden="true"><i /><i /></span>
        </button>
      </div>

      {navGroups.map((g) => (
        <div key={g.id} className={open === g.id ? "mega is-open" : "mega"} hidden={open !== g.id}>
          <div className="shell mega-inner">
            <div className="mega-intro">
              <p className="eyebrow">{g.label}</p>
              <p className="mega-blurb">{g.intro}</p>
            </div>
            <ul className="mega-list">
              {g.items.map((i) => (
                <li key={i.href}>
                  <a href={i.href}>
                    <span className="mega-label">{i.label}</span>
                    {i.blurb ? <span className="mega-sub">{i.blurb}</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="masthead-band" role="presentation" />

      {panel ? (
        <div className="mobile-panel" role="dialog" aria-label="Menu">
          <div className="mobile-panel-head">
            <Logo height={48} />
            <button className="mobile-close" onClick={() => setPanel(false)}>Close</button>
          </div>
          <nav aria-label="Primary">
            {navGroups.map((g, gi) => (
              <details key={g.id}>
                <summary>
                  <span className="mobile-index">{String(gi + 1).padStart(2, "0")}</span>
                  {g.label}
                </summary>
                <ul>
                  {g.items.map((i) => <li key={i.href}><a href={i.href}>{i.label}</a></li>)}
                </ul>
              </details>
            ))}
          </nav>
          <div className="mobile-start">
            {startItems.map((i) => <a key={i.href} href={i.href}>{i.label}</a>)}
          </div>
        </div>
      ) : null}
    </header>
  );
}
