import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { color, typeScale, space, radius } from "@vyne/ui";
import "./design-system.css";

export const metadata: Metadata = { title: "Design System — VYNE" };

/**
 * Developer-only living design-system reference. Rendered ENTIRELY from the
 * shared @vyne/ui token objects (color/typeScale/space/radius) and the
 * --vyne-* CSS variables, so it cannot drift from production: change a token,
 * this page changes with it. Not linked from the app; not available in
 * production builds; served without auth (see middleware public paths).
 */

const camelToVar = (k: string) => `--vyne-${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;

const ROLE: Record<string, string> = {
  navy: "Primary ink · headers · primary buttons · sidebar",
  ivory: "The canvas — page background",
  white: "Cards, documents, bars (elevation)",
  bronze: "Accents · borders · icons · rules · surfaces",
  stoneGray: "Brand neutral — standard border / hairline",
  charcoal: "Deepest ink for high-contrast text",
  slate: "Functional — secondary text, metadata",
  bronzeText: "Functional — bronze text meeting WCAG AA",
  hairline: "Border/hairline role (= stone gray)",
  forest: "Semantic — success / published",
  warning: "Semantic — warning",
  danger: "Semantic — danger / destructive",
};
const GROUPS: { title: string; keys: (keyof typeof color)[] }[] = [
  { title: "Brand palette", keys: ["navy", "ivory", "white", "bronze", "stoneGray", "charcoal"] },
  { title: "Functional", keys: ["slate", "bronzeText", "hairline"] },
  { title: "Semantic", keys: ["forest", "warning", "danger"] },
];

function LineIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="ds">
      <p className="ds-eyebrow">VYNE · Developer reference</p>
      <h1 className="ds-h1">Design System</h1>
      <div className="ds-rule" />
      <p className="ds-lede">
        The living UI reference for VYNE OS, Advisor Studio, and the future public
        website. Every value on this page is rendered from the shared{" "}
        <code>@vyne/ui</code> tokens — it cannot drift from production. Canonical
        docs: <code>docs/brand/</code>.
      </p>

      {/* Colors */}
      <section className="ds-section">
        <h2 className="ds-h2">Color tokens</h2>
        {GROUPS.map((g) => (
          <div key={g.title} style={{ marginBottom: "calc(var(--vyne-unit) * 3)" }}>
            <div className="ds-tile-h" style={{ marginBottom: "var(--vyne-unit)" }}>{g.title}</div>
            <div className="ds-swatches">
              {g.keys.map((k) => (
                <div className="ds-swatch" key={k}>
                  <div className="ds-swatch-chip" style={{ background: color[k], borderBottom: "1px solid var(--vyne-hairline)" }} />
                  <div className="ds-swatch-meta">
                    <div className="ds-swatch-name">{k}</div>
                    <div className="ds-swatch-var">{camelToVar(k)}</div>
                    <div className="ds-swatch-hex">{color[k]}</div>
                    <div className="ds-swatch-role">{ROLE[k]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="ds-note">
          Bronze <code>{color.bronze}</code> fails WCAG AA as small text on light
          backgrounds (~3:1); bronze text uses <code>{color.bronzeText}</code>.
        </p>
      </section>

      {/* Typography */}
      <section className="ds-section">
        <h2 className="ds-h2">Typography scale</h2>
        {Object.entries(typeScale).map(([name, s]) => (
          <div className="ds-type-row" key={name}>
            <span className="ds-type-label">{name} · {s.size}/{s.lineHeight}</span>
            <span className="ds-type-serif" style={{ fontSize: s.size, lineHeight: `${s.lineHeight}px` }}>
              Clarity before choice
            </span>
          </div>
        ))}
        <p className="ds-note">Serif (Source Serif 4) for display/headings; Inter for interface. Tabular-lining numerals in tables.</p>
      </section>

      {/* Spacing */}
      <section className="ds-section">
        <h2 className="ds-h2">Spacing scale · {space.unit}px base</h2>
        {[1, 2, 3, 4, 6, 8].map((n) => (
          <div className="ds-space-row" key={n}>
            <div className="ds-space-bar" style={{ width: space.unit * n }} />
            <span className="ds-space-label">unit × {n} = {space.unit * n}px</span>
          </div>
        ))}
        <p className="ds-note">Page gutter {space.pageGutterDesktop}px · card radius {radius.card}px · one card radius only.</p>
      </section>

      {/* Buttons + Forms */}
      <section className="ds-section">
        <h2 className="ds-h2">Buttons &amp; forms</h2>
        <div className="ds-grid2">
          <div className="ds-tile">
            <div className="ds-tile-h">Buttons</div>
            <div className="ds-row">
              <button className="signin-submit" type="button" style={{ padding: "10px 18px", marginTop: 0 }}>Primary</button>
              <button className="topbar-signout" type="button">Secondary</button>
              <button className="signin-submit" type="button" style={{ padding: "10px 18px", marginTop: 0 }} disabled>Disabled</button>
            </div>
          </div>
          <div className="ds-tile">
            <div className="ds-tile-h">Form fields</div>
            <label className="signin-label" htmlFor="ds-in">Email</label>
            <input className="signin-input" id="ds-in" type="email" placeholder="demo.founder@synthetic.vyne.test" style={{ marginBottom: "var(--vyne-unit)" }} />
            <p className="signin-error" role="note" style={{ margin: 0 }}>That email and password don&rsquo;t match</p>
          </div>
        </div>
      </section>

      {/* Cards + Alerts */}
      <section className="ds-section">
        <h2 className="ds-h2">Cards &amp; alerts</h2>
        <div className="ds-grid2">
          <div className="ds-tile">
            <div className="ds-tile-h">Card</div>
            <div className="shell-card">
              <div style={{ fontFamily: "var(--vyne-font-serif)", fontSize: "var(--vyne-type-section)", fontWeight: 600 }}>Advisor Workspace</div>
              <p style={{ color: "var(--vyne-slate)", fontSize: "var(--vyne-type-meta)", marginTop: 4 }}>
                White surface · hairline border · 12px radius · no shadow.
              </p>
            </div>
          </div>
          <div className="ds-tile">
            <div className="ds-tile-h">Alerts (label + one color)</div>
            <div className="ds-alert is-success"><span className="ds-alert-dot" /><span><b>Published</b><span>Deliverable is live in Studio.</span></span></div>
            <div className="ds-alert is-warning"><span className="ds-alert-dot" /><span><b>In review</b><span>Awaiting founder approval.</span></span></div>
            <div className="ds-alert is-danger"><span className="ds-alert-dot" /><span><b>Overdue</b><span>Attestation past due.</span></span></div>
            <div className="ds-alert is-info"><span className="ds-alert-dot" /><span><b>Information</b><span>No distinct info hue yet — uses navy (flagged).</span></span></div>
          </div>
        </div>
      </section>

      {/* Tables */}
      <section className="ds-section">
        <h2 className="ds-h2">Tables</h2>
        <div className="ds-tile" style={{ padding: 0, overflow: "hidden" }}>
          <table className="ds-table">
            <thead><tr><th>Advisor</th><th>Stage</th><th className="ds-num">Fee</th></tr></thead>
            <tbody>
              <tr><td>Sarah Chen</td><td style={{ color: "var(--vyne-forest)" }}>Published</td><td className="ds-num">$400,000</td></tr>
              <tr><td>Marcus Lee</td><td style={{ color: "var(--vyne-warning)" }}>In review</td><td className="ds-num">$285,000</td></tr>
              <tr><td>Ana Reyes</td><td style={{ color: "var(--vyne-danger)" }}>Overdue</td><td className="ds-num">$120,000</td></tr>
            </tbody>
          </table>
        </div>
        <p className="ds-note">Hairline rows · no zebra striping · left text / right tabular numbers.</p>
      </section>

      {/* Navigation */}
      <section className="ds-section">
        <h2 className="ds-h2">Navigation</h2>
        <div className="ds-grid2">
          <div className="ds-tile">
            <div className="ds-tile-h">Sidebar items (active = bronze indicator)</div>
            <nav className="ds-nav">
              <span className="ds-nav-item is-active">Dashboard</span>
              <span className="ds-nav-item">Advisors</span>
              <span className="ds-nav-item">Decisions</span>
              <span className="ds-nav-item is-muted">Economics</span>
            </nav>
          </div>
          <div className="ds-tile">
            <div className="ds-tile-h">Role chip &amp; bar controls</div>
            <div className="ds-row">
              <span className="role-chip">Founder</span>
              <span className="role-chip">Recruiter</span>
              <button className="topbar-signout" type="button">Sign out</button>
            </div>
          </div>
        </div>
      </section>

      {/* Icons */}
      <section className="ds-section">
        <h2 className="ds-h2">Icons — 1.5px stroke, geometric</h2>
        <div className="ds-tile">
          <div className="ds-icons">
            <LineIcon className="ds-icon" path="M3 12l9-9 9 9M5 10v10h14V10" />
            <LineIcon className="ds-icon is-accent" path="M20 6L9 17l-5-5" />
            <LineIcon className="ds-icon" path="M12 8v8m-4-4h8M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <LineIcon className="ds-icon is-muted" path="M4 6h16M4 12h16M4 18h10" />
            <LineIcon className="ds-icon" path="M6 2h9l5 5v15H6zM15 2v5h5" />
          </div>
          <p className="ds-note">Navy default · bronze for active/accent · slate for secondary. Icons appear with labels; no decorative icons or emoji.</p>
        </div>
      </section>

      <footer className="ds-note" style={{ marginTop: "calc(var(--vyne-unit) * 6)", paddingTop: "calc(var(--vyne-unit) * 2)", borderTop: "1px solid var(--vyne-hairline)" }}>
        Developer-only · generated from <code>@vyne/ui</code> tokens · not shipped in production builds.
      </footer>
    </main>
  );
}
