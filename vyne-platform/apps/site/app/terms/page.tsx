import type { Metadata } from "next";
import { PendingCounsel } from "@/components/PendingCounsel";

export const metadata: Metadata = {
  title: "Terms — VYNE Strategies",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return <PendingCounsel title="Terms" />;
}
