import { Masthead } from "@/components/Masthead";
import { Hero } from "@/components/Hero";
import { Serves } from "@/components/Serves";
import { Questions } from "@/components/Questions";
import { FirstDecision } from "@/components/FirstDecision";
import { Process } from "@/components/Process";
import { Outcomes } from "@/components/Outcomes";
import { Confidentiality } from "@/components/Confidentiality";
import { Compensation } from "@/components/Compensation";
import { Founder } from "@/components/Founder";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";

export default function Page() {
  return (
    <>
      <Masthead />
      <main>
        <Hero />
        <Serves />
        <Questions />
        <FirstDecision />
        <Process />
        <Outcomes />
        <Confidentiality />
        <Compensation />
        <Founder />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
