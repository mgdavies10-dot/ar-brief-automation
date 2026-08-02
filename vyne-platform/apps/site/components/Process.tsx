import { process } from "@/content/copy";

/** Navy — private-advisory depth. No mark: the asset cannot be reversed. */
export function Process() {
  return (
    <section id="process" className="band-navy">
      <div className="shell split">
        <div className="split-label"><p className="eyebrow">How we work</p></div>
        <div className="split-body">
          <h2>{process.heading}</h2>
          <div className="steps">
            {process.steps.map((s) => (
              <div className="step" key={s.title}>
                <div className="step-number" aria-hidden="true" />
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
