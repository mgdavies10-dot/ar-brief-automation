import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@vyne/ui/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "VYNE Studio — VYNE Strategies",
  description: "Your private workspace, prepared by VYNE Strategies",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* Browser extensions (e.g. Grammarly) inject attributes on <body>
          before hydration; suppress the spurious dev-mode attribute warning
          for this element only — real tree mismatches still surface. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
