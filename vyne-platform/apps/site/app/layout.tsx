import type { Metadata } from "next";
import { meta, questions } from "@/content/copy";
import "./globals.css";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  applicationName: meta.name,
  openGraph: {
    title: meta.title,
    description: meta.description,
    siteName: meta.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

/**
 * JSON-LD — technical SEO/AEO hygiene only.
 * This is NOT the AEO Architecture, which remains not started (EA-WEB-001 §4).
 */
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: meta.name,
  description: meta.description,
  email: meta.contactEmail,
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.items.map((q) => ({
    "@type": "Question",
    name: q,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
