import { Branching } from "@/components/brand/Logo";
import { proof, founderDraft, toolsPreview, intelligencePreview } from "@/content/pages";
import {
  hero, serves, questions, firstDecision, process, outcomes,
  confidentiality, compensation, contact, footer,
} from "@/content/copy";
import { readyGroups, navGroups, startItems } from "@/content/nav";

const toolItems = navGroups.find((g) => g.id === "tools")!.items.slice(0, 5);
const exploreItems = navGroups.find((g) => g.id === "explore")!.items;

function Label({ n, children }: { n: string; children: string }) {
  return (
    <div className="split-label">
      <span className="label-index" aria-hidden="true">{n}</span>
      <span className="label-rule" aria-hidden="true" />
      <p className="eyebrow">{children}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div>
          <p className="eyebrow">Consulting for financial advisors</p>
          <h1>{hero.heading}</h1>
          <div className="rule-bronze" role="presentation" />
          <div className="stack">{hero.body.map((l) => <p key={l} className="lede">{l}</p>)}</div>
          <div className="cta-row">
            <a className="cta" href="/start/confidential-conversation">Request a confidential conversation</a>
            <a className="cta-ghost" href="/tools/the-vyne-9">Take The VYNE 9</a>
          </div>
        </div>
        <div className="hero-anchor"><Branching /></div>
      </div>
    </section>
  );
}

export function ProofBand() {
  return (
    <section className="band-stone">
      <div className="shell">
        <p className="eyebrow">{proof.heading}</p>
        <p className="lede measure" style={{ marginBottom: 40 }}>{proof.intro}</p>
        <div className="proof-grid">
          {proof.items.map((p, i) => (
            <div className="proof-item" key={p.t}>
              <span className="proof-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Serves() {
  return (
    <section className="band-ivory">
      <div className="shell split">
        <Label n="01">Who we serve</Label>
        <div className="split-body">
          <h2>{serves.heading}</h2>
          <div className="stack">{serves.body.map((l) => <p key={l} className="lede">{l}</p>)}</div>
        </div>
      </div>
    </section>
  );
}

export function Questions() {
  return (
    <section className="band-ivory">
      <div className="shell split">
        <Label n="02">In their words</Label>
        <div className="split-body">
          <h2>{questions.heading}</h2>
          <p className="lede" style={{ marginBottom: 36 }}>{questions.intro}</p>
          <ul className="questions">
            {questions.items.map((q, i) => (
              <li key={q}>
                <a href="/explore/stay-or-change-firms">{q}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function FirstDecision() {
  return (
    <section className="band-ivory">
      <div className="shell split">
        <Label n="03">The starting point</Label>
        <div className="split-body">
          <h2>{firstDecision.heading}</h2>
          <div className="stack">{firstDecision.body.map((l) => <p key={l} className="lede">{l}</p>)}</div>
          <div className="statement"><p>{firstDecision.emphasis}</p></div>
        </div>
      </div>
    </section>
  );
}

export function FrameworkPreview() {
  return (
    <section className="band-navy">
      <div className="shell split">
        <Label n="04">How we work</Label>
        <div className="split-body">
          <h2>{process.heading}</h2>
          <div className="steps">
            {process.steps.map((s) => (
              <div className="step" key={s.title}>
                <div className="step-number" aria-hidden="true" />
                <div><h3>{s.title}</h3><p>{s.body}</p></div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 34 }}>
            <a className="cta-ghost cta-ghost-dark" href="/why-vyne/confidentiality">How VYNE protects your exploration</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export function ToolsPreview() {
  return (
    <section className="band-ivory">
      <div className="shell">
        <div className="section-head">
          <Label n="05">Tools</Label>
          <a className="section-more" href="/tools/the-vyne-9">All tools</a>
        </div>
        <h2>{toolsPreview.heading}</h2>
        <p className="lede measure" style={{ marginBottom: 44 }}>{toolsPreview.intro}</p>
        <div className="tool-rows">
          {toolItems.map((t, i) => (
            <a className="tool-row" href={t.href} key={t.href}>
              <span className="tool-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="tool-name">{t.label}</span>
              <span className="tool-blurb">{t.blurb}</span>
              <span className="tool-go" aria-hidden="true">&rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IntelligencePreview() {
  return (
    <section className="band-ivory">
      <div className="shell">
        <div className="section-head">
          <Label n="06">Intelligence</Label>
          <a className="section-more" href="/intelligence/state-of-advisor-movement">Research</a>
        </div>
        <h2>{intelligencePreview.heading}</h2>
        <p className="lede measure" style={{ marginBottom: 44 }}>{intelligencePreview.intro}</p>
        <div className="intel-grid">
          <a className="report-cover" href="/intelligence/state-of-advisor-movement">
            <span className="report-kicker">Standing research programme</span>
            <span className="report-title">State of Advisor Movement</span>
            <span className="report-meta">
              VYNE&rsquo;s continuing study of why advisors move, stay, and wait.
            </span>
          </a>
          <ul className="intel-list">
            <li>
              <a href="/explore/stay-or-change-firms">
                <span className="intel-kicker">Cornerstone</span>
                Should I stay at my current firm or explore a move?
              </a>
            </li>
            <li>
              <a href="/why-vyne/how-we-are-compensated">
                <span className="intel-kicker">Cornerstone</span>
                How are financial-advisor recruiters compensated?
              </a>
            </li>
            <li>
              <a href="/why-vyne/confidentiality">
                <span className="intel-kicker">Cornerstone</span>
                How confidential is an advisor transition search?
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Confidentiality() {
  return (
    <section className="band-navy band-deep conf">
      <Branching tone="dark" />
      <div className="shell">
        <div className="conf-label">
          <span className="label-index" aria-hidden="true">07</span>
          <span className="label-rule" aria-hidden="true" />
          <p className="eyebrow">Confidentiality</p>
        </div>
        <h2 className="measure">{confidentiality.heading}</h2>
        <p className="pledge">{confidentiality.lead}</p>
        <div className="conf-grid">{confidentiality.body.map((l) => <p key={l}>{l}</p>)}</div>
      </div>
    </section>
  );
}

export function FounderBlock() {
  const live = founderDraft.approved && founderDraft.name;
  return (
    <section className="band-ivory" id="founder">
      <div className="shell split">
        <Label n="08">Accountability</Label>
        <div className="split-body founder-grid">
          <div className="founder-portrait">
            <span>Portrait pending approval</span>
          </div>
          <div>
            <h2>{founderDraft.heading}</h2>
            {live ? (
              <>
                <h3 className="founder-name">{founderDraft.name}</h3>
                <div className="stack">
                  {founderDraft.body.map((l) => <p key={l} className="lede">{l}</p>)}
                </div>
              </>
            ) : (
              <p className="founder-placeholder">{founderDraft.placeholder}</p>
            )}
            <p style={{ marginTop: 26 }}>
              <a className="cta-ghost" href="/why-vyne/founder">About the founder</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Outcomes() {
  return (
    <section className="band-ivory">
      <div className="shell split">
        <Label n="09">Where this can land</Label>
        <div className="split-body">
          <h2>{outcomes.heading}</h2>
          <p className="lede" style={{ marginBottom: 28 }}>{outcomes.intro}</p>
          <ul className="outcome-list">{outcomes.items.map((o) => <li key={o}>{o}</li>)}</ul>
          <p className="lede">{outcomes.close}</p>
        </div>
      </div>
    </section>
  );
}

export function Compensation() {
  return (
    <section className="band-ivory">
      <div className="shell split">
        <Label n="10">Disclosure</Label>
        <div className="split-body">
          <h2>{compensation.heading}</h2>
          <div className="disclosure">
            <p>{compensation.disclosure}</p>
            <p>{compensation.controls}</p>
          </div>
          <p style={{ marginTop: 26 }}>
            <a className="cta-ghost" href="/why-vyne/confidentiality">How VYNE protects your exploration
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export function StartBlock() {
  return (
    <section className="band-navy band-deep">
      <div className="shell">
        <h2>{contact.heading}</h2>
        <p className="lede measure" style={{ marginBottom: 44 }}>{contact.body}</p>
        <div className="start-grid">
          {startItems.slice(0, 3).map((s) => (
            <a className="start-card" href={s.href} key={s.href}>
              <span className="start-label">{s.label}</span>
              <span className="start-go" aria-hidden="true">&rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsletterInline() {
  return (
    <section className="band-stone newsletter">
      <div className="shell newsletter-inner">
        <div>
          <h2>Intelligence, occasionally.</h2>
          <p className="lede">
            Source-backed research on advisor decisions. One field. Unsubscribe whenever.
          </p>
        </div>
        <div className="newsletter-form">
          <label className="sr-only" htmlFor="nl">Email address</label>
          <input id="nl" name="email" type="email" placeholder="you@firm.com" disabled />
          <button className="cta" type="button" disabled>Subscribe</button>
        </div>
      </div>
      <p className="shell mock-note">
        Submission is disabled in this build. Nothing is collected, stored or sent.
      </p>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-cols">
          {readyGroups.map((g) => (
            <div key={g.id}>
              <p className="eyebrow">{g.label}</p>
              <ul>
                {g.items.slice(0, 6).map((i) => (
                  <li key={i.href}><a href={i.href}>{i.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="footer-disclosure">{footer.disclosure}</p>
        <div className="footer-bar">
          <span>{footer.copyright}</span>
          <span className="footer-links">
            {footer.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
            <a href="/disclosures">Disclosures</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
