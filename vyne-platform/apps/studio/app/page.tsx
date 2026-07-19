export default function Home() {
  return (
    <main style={{ padding: "var(--vyne-page-gutter)", maxWidth: "68ch" }}>
      <h1
        style={{
          fontFamily: "var(--vyne-font-serif)",
          fontSize: "var(--vyne-type-display)",
          lineHeight: "var(--vyne-type-display-lh)",
          fontWeight: 600,
        }}
      >
        Your workspace is being prepared.
      </h1>
      <div
        style={{
          height: 1,
          background: "var(--vyne-gold)",
          maxWidth: 320,
          margin: "16px 0 24px",
        }}
      />
      <p style={{ color: "var(--vyne-slate)" }}>
        Your workspace is private and prepared for you by VYNE Strategies.
      </p>
    </main>
  );
}
