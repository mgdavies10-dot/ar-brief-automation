import { navGroups } from "@/content/nav";

/* ── Page shell ────────────────────────────────────────────────────────── */

export function PageHead({
  kicker, title, standfirst, crumbs,
}: {
  kicker: string; title: string; standfirst?: string;
  crumbs: { label: string; href: string }[];
}) {
  return (
    <section className="pagehead">
      <div className="shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          {crumbs.map((c) => (
            <span key={c.href}>
              <span className="crumb-sep" aria-hidden="true">/</span>
              <a href={c.href}>{c.label}</a>
            </span>
          ))}
        </nav>
        <p className="eyebrow">{kicker}</p>
        <h1>{title}</h1>
        <div className="rule-bronze" role="presentation" />
        {standfirst ? <p className="lede measure-wide">{standfirst}</p> : null}
      </div>
    </section>
  );
}

/* ── Cornerstone article template ──────────────────────────────────────── */

export type Source = { title: string; publisher: string; date: string; note?: string };

export function ArticleMeta({
  author, published, reviewed, readingTime,
}: { author: string; published: string; reviewed: string; readingTime: string }) {
  return (
    <dl className="artmeta">
      <div><dt>Author</dt><dd>{author}</dd></div>
      <div><dt>Published</dt><dd>{published}</dd></div>
      <div><dt>Last reviewed</dt><dd>{reviewed}</dd></div>
      <div><dt>Reading time</dt><dd>{readingTime}</dd></div>
    </dl>
  );
}

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <div className="sources">
      <p className="eyebrow">Sources</p>
      <ol>
        {sources.map((s) => (
          <li key={s.title}>
            <span className="src-title">{s.title}</span>
            <span className="src-meta">{s.publisher} &middot; {s.date}</span>
            {s.note ? <span className="src-note">{s.note}</span> : null}
          </li>
        ))}
      </ol>
      <p className="src-caveat">
        VYNE attributes and dates every firm claim. We do not independently verify firm
        statements except where noted.
      </p>
    </div>
  );
}

export function RelatedCluster({
  items,
}: { items: { label: string; href: string }[] }) {
  return (
    <div className="related">
      <p className="eyebrow">Related</p>
      <ul>{items.map((i) => <li key={i.href}><a href={i.href}>{i.label}</a></li>)}</ul>
    </div>
  );
}

/* ── Tool / calculator template ────────────────────────────────────────── */

export function MethodologyPanel({
  effectiveDate, reviewer, refresh, notes,
}: { effectiveDate: string; reviewer: string; refresh: string; notes: string[] }) {
  return (
    <div className="methodology">
      <p className="eyebrow">Methodology</p>
      <dl className="artmeta">
        <div><dt>Effective date</dt><dd>{effectiveDate}</dd></div>
        <div><dt>Reviewer</dt><dd>{reviewer}</dd></div>
        <div><dt>Refresh cadence</dt><dd>{refresh}</dd></div>
      </dl>
      <ul className="method-notes">{notes.map((n) => <li key={n}>{n}</li>)}</ul>
    </div>
  );
}

export function CannotTellYou({ items }: { items: string[] }) {
  return (
    <div className="cannot">
      <p className="eyebrow">What this calculation cannot tell you</p>
      <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
      <p className="cannot-close">
        This is a modelled estimate from assumptions you selected. It is not a
        recommendation, a formal valuation, a firm ranking, or a conclusion about which
        option fits your practice.
      </p>
    </div>
  );
}

/* ── Conversion form template — DISABLED under EA-WEB-002 §2 ───────────── */

export type Field = {
  id: string; label: string; type?: string; help?: string;
  options?: string[]; optional?: boolean;
};

export function ConversionForm({
  intro, fields, submitLabel, consentText,
}: { intro: string; fields: Field[]; submitLabel: string; consentText: string }) {
  return (
    <div className="formwrap">
      <p className="lede measure">{intro}</p>

      <div className="mock-banner">
        <strong>This form is not active.</strong> Submission, email delivery, CRM writes
        and analytics are disabled in this build. Nothing you type is collected, stored or
        sent anywhere.
      </div>

      <div className="form">
        {fields.map((f) => (
          <div className="field" key={f.id}>
            <label htmlFor={f.id}>
              {f.label}
              {f.optional ? <span className="field-opt">optional</span> : null}
            </label>
            {f.options ? (
              <select id={f.id} name={f.id} disabled defaultValue="">
                <option value="" disabled>Select…</option>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : f.type === "textarea" ? (
              <textarea id={f.id} name={f.id} rows={4} disabled />
            ) : (
              <input id={f.id} name={f.id} type={f.type ?? "text"} disabled />
            )}
            {f.help ? <p className="field-help">{f.help}</p> : null}
          </div>
        ))}

        <div className="consent">
          <input id="consent" type="checkbox" disabled />
          <label htmlFor="consent">{consentText}</label>
        </div>

        <p className="form-guard">
          <strong>Nothing submitted here contacts a firm.</strong> VYNE will not contact a
          firm about you, disclose your identity, or share your information without your
          explicit written authorization naming that specific firm.
        </p>

        <button className="cta" type="button" disabled>{submitLabel}</button>
      </div>
    </div>
  );
}

/* ── Stub page for routes not yet written ──────────────────────────────── */

export function Stub({ group, title }: { group: string; title: string }) {
  const g = navGroups.find((x) => x.label === group);
  return (
    <>
      <PageHead
        kicker={group}
        title={title}
        standfirst="This page is part of the approved Website V1 architecture. Its content is scheduled in a later build phase."
        crumbs={g ? [{ label: g.label, href: `#${g.id}` }] : []}
      />
      <section className="band-ivory">
        <div className="shell">
          <div className="mock-banner">
            <strong>Scheduled.</strong> The route, navigation and template exist. The
            written content for this page has not been produced yet.
          </div>
          {g ? (
            <div className="related" style={{ marginTop: 40 }}>
              <p className="eyebrow">Elsewhere in {g.label}</p>
              <ul>
                {g.items.slice(0, 6).map((i) => (
                  <li key={i.href}><a href={i.href}>{i.label}</a></li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
