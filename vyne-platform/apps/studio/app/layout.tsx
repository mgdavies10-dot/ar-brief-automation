import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@vyne/ui/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "VYNE Studio",
  description: "Your private workspace, prepared by VYNE Strategies",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
