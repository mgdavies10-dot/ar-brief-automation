import { contact } from "@/content/copy";
import { mailto } from "@/content/mailto";

export function Contact() {
  return (
    <section id="contact" className="band-navy band-navy-deep contact">
      <div className="shell">
        <h2>{contact.heading}</h2>
        <p className="lede measure">{contact.body}</p>
        <p className="contact-cta">
          <a className="cta cta-inverse" href={mailto}>{contact.cta}</a>
        </p>
        <p className="contact-alt">
          {contact.altPrefix}<a href={mailto}>{contact.altLinkText}</a>{contact.altSuffix}
        </p>
      </div>
    </section>
  );
}
