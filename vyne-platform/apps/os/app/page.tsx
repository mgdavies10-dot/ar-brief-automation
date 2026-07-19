export default function Home() {
  return (
    <main style={{ padding: "var(--vyne-page-gutter)" }}>
      <h1
        style={{
          fontFamily: "var(--vyne-font-serif)",
          fontSize: "var(--vyne-type-display)",
          lineHeight: "var(--vyne-type-display-lh)",
          fontWeight: 600,
        }}
      >
        VYNE OS
      </h1>
      <div
        style={{
          height: 1,
          background: "var(--vyne-gold)",
          maxWidth: 320,
          margin: "16px 0 24px",
        }}
      />
      <p style={{ color: "var(--vyne-slate)", maxWidth: "72ch" }}>
        Foundation established under EA-001. Sign-in and the slice flow arrive in
        later milestones.
      </p>
    </main>
  );
}
