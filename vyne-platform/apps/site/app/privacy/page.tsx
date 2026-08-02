import type { Metadata } from "next";
import { PendingCounsel } from "@/components/PendingCounsel";

export const metadata: Metadata = {
  title: "Privacy — VYNE Strategies",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <PendingCounsel title="Privacy notice" />;
}
