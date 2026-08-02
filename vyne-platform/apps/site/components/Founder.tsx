import { founder } from "@/content/copy";

/**
 * Reserved founder section — built, hidden (EA-WEB-001 §4).
 *
 * The layout slot exists between Compensation and Contact. It renders nothing
 * until `founder.visible` is true AND approved biography content is supplied.
 * No employer, title, tenure, credential, licence or personal fact is inferred.
 */
export function Founder() {
  if (!founder.visible || !founder.name) return null;

  return (
    <section id="founder" className="band-ivory">
      <div className="shell split">
        <div className="split-label"><p className="eyebrow">Accountability</p></div>
        <div className="split-body founder-grid">
          <div className="founder-portrait">
            {founder.portrait ? (
              <img src={founder.portrait} alt={founder.name} />
            ) : null}
          </div>
          <div>
            <h2>{founder.heading}</h2>
            <h3 className="founder-name">
              {founder.name}{founder.role ? <span> · {founder.role}</span> : null}
            </h3>
            <div className="stack">
              {founder.body.map((l) => <p key={l} className="lede">{l}</p>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
