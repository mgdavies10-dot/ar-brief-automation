import { founder } from "@/content/copy";

/**
 * Founder section — built, hidden (EA-WEB-001 §4).
 *
 * Renders nothing until `founder.visible` is set true AND founder-approved public
 * biography content is supplied in content/copy.ts. Employers, titles, tenure,
 * credentials, licenses and personal facts must never be inferred.
 */
export function Founder() {
  if (!founder.visible || !founder.name) return null;

  return (
    <section id="founder">
      <div className="shell">
        <p className="eyebrow">Founder</p>
        <h2 className="measure">{founder.heading}</h2>
        <div className="measure stack">
          <h3>
            {founder.name}
            {founder.role ? ` — ${founder.role}` : ""}
          </h3>
          {founder.body.map((line) => (
            <p key={line} className="lede">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
