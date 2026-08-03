import type { Metadata } from "next";
import { MegaMenu } from "@/components/nav/MegaMenu";
import { SiteFooter } from "@/components/blocks/Blocks";
import { meta } from "@/content/copy";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: meta.title, template: "%s" },
  description: meta.description,
  applicationName: meta.name,
  openGraph: { title: meta.title, description: meta.description, siteName: meta.name, type: "website" },
  robots: { index: true, follow: true },
};

const orgLd = {
  "@context": "https://schema.org", "@type": "Organization",
  name: meta.name, description: meta.description, email: meta.contactEmail,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <MegaMenu />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
