import { contact } from "@/content/copy";
import { mailto } from "@/content/mailto";

export function Contact() {
  return (
    <section id="contact" className="panel-navy">
      <div className="shell">
        <h2 className="measure" style={{ marginBottom: 20 }}>
          {contact.heading}
        </h2>
        <p className="lede measure" style={{ marginBottom: 36 }}>
          {contact.body}
        </p>
        <p>
          <a className="cta cta-inverse" href={mailto}>
            {contact.cta}
          </a>
        </p>
        <p style={{ marginTop: 26, fontSize: "var(--vyne-type-meta)" }}>
          {contact.altPrefix}
          <a href={mailto}>{contact.altLinkText}</a>
          {contact.altSuffix}
        </p>
      </div>
    </section>
  );
}
