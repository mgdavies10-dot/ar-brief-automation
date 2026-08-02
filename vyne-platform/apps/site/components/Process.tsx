import { process } from "@/content/copy";

export function Process() {
  return (
    <section id="process">
      <div className="shell">
        <p className="eyebrow">How we work</p>
        <h2 className="measure">{process.heading}</h2>
        <div className="steps measure-wide">
          {process.steps.map((step) => (
            <div className="step" key={step.title}>
              <div className="step-number" aria-hidden="true" />
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
