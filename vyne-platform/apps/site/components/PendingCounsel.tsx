import { pendingCounsel } from "@/content/copy";

/**
 * Privacy and Terms placeholders.
 * EA-WEB-001 §6 forbids fabricating placeholder legal language that could be
 * mistaken for approved policy. This states only that nothing is in effect.
 */
export function PendingCounsel({ title }: { title: string }) {
  return (
    <main className="notice">
      <div className="shell">
        <div className="notice-card">
          <p className="eyebrow">{title}</p>
          <h1>{pendingCounsel.banner}</h1>
          <p className="lede" style={{ marginBottom: 28 }}>
            {pendingCounsel.body}
          </p>
          <a href="/">{pendingCounsel.back}</a>
        </div>
      </div>
    </main>
  );
}
