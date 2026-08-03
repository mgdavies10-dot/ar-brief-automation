import {
  Hero, ValueProp, Vyne9Invite, ToolsPreview, IntelligencePreview,
  FrameworkStrip, FounderBlock, Confidentiality, AdvisorJourney,
  OfferAndCompare, ProofBand, Compensation, NewsletterInline, StartBlock,
} from "@/components/blocks/Blocks";

export default function Page() {
  return (
    <>
      <Hero />                {/* 1  premium hero */}
      <ValueProp />           {/* 2  concise value proposition — navy */}
      <Vyne9Invite />         {/* 3  The VYNE 9 invitation */}
      <ToolsPreview />        {/* 4  four-calculator suite preview */}
      <IntelligencePreview /> {/* 5  State of Advisor Movement + intelligence */}
      <FrameworkStrip />      {/* 6  how VYNE helps — the Framework */}
      <FounderBlock />        {/* 7  founder / accountability */}
      <Confidentiality />     {/* 8  confidentiality — navy */}
      <AdvisorJourney />      {/* 9  advisor journey */}
      <OfferAndCompare />     {/* 10 review my offer + compare firms */}
      <ProofBand />           {/* 11 process commitments */}
      <Compensation />        {/* 12 compensation disclosure */}
      <NewsletterInline />    {/* 13 newsletter */}
      <StartBlock />          {/* 14 final confidential CTA — navy */}
    </>
  );
}
