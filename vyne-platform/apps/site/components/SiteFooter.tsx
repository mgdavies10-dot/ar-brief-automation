import { footer } from "@/content/copy";
import { Logo } from "./Brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <Logo height={56} />
          <p className="footer-disclosure">{footer.disclosure}</p>
        </div>
        <div className="footer-bar">
          <span>{footer.copyright}</span>
          <span className="footer-links">
            {footer.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </span>
        </div>
      </div>
    </footer>
  );
}
