export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="split-label">
      <span className="label-index" aria-hidden="true">{index}</span>
      <span className="label-rule" aria-hidden="true" />
      <p className="eyebrow">{children}</p>
    </div>
  );
}
