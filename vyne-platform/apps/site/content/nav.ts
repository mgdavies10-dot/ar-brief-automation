export type NavItem = { label: string; href: string; blurb?: string; ready?: boolean };
export type NavGroup = { id: string; label: string; intro: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    id: "why-vyne", label: "Why VYNE",
    intro: "Who we are, how we think, and how we are paid.",
    items: [
      { label: "About VYNE", href: "/why-vyne/about", blurb: "A confidential consulting firm for advisors facing consequential decisions." },
      { label: "Founder", href: "/why-vyne/founder", ready: true, blurb: "Who is accountable for the judgment." },
      { label: "Philosophy", href: "/why-vyne/philosophy", blurb: "Evidence before opinion. Decisions over transactions." },
      { label: "Confidentiality", href: "/why-vyne/confidentiality", ready: true, blurb: "You control every firm interaction." },
      { label: "How VYNE is compensated", href: "/why-vyne/how-we-are-compensated", blurb: "Stated plainly, with the conflict named." },
    ],
  },
  {
    id: "how-we-help", label: "How VYNE helps",
    intro: "The work itself, and who it is for.",
    items: [
      { label: "The VYNE Framework", href: "/how-we-help/framework", ready: true, blurb: "Vision · Your Objectives · Navigate · Enterprise Economics." },
      { label: "Advisor Journey", href: "/how-we-help/advisor-journey", blurb: "From first conversation to written record." },
      { label: "Established advisors", href: "/how-we-help/established-advisors" },
      { label: "Advisor teams", href: "/how-we-help/advisor-teams" },
      { label: "Next-generation advisors", href: "/how-we-help/next-generation" },
      { label: "Succession and continuity", href: "/how-we-help/succession-continuity" },
    ],
  },
  {
    id: "explore", label: "Explore",
    intro: "The questions advisors are actually working through.",
    items: [
      { label: "Should I stay or change firms?", href: "/explore/stay-or-change-firms", ready: true },
      { label: "Advisor affiliation models", href: "/explore/affiliation-models" },
      { label: "Employee advisor options", href: "/explore/employee-advisor-options" },
      { label: "Independence options", href: "/explore/independence-options" },
      { label: "Enterprise economics", href: "/explore/enterprise-economics" },
      { label: "Ownership and equity", href: "/explore/ownership-and-equity" },
      { label: "Portability", href: "/explore/portability" },
      { label: "Client and team impact", href: "/explore/client-and-team-impact" },
      { label: "Firm and platform evaluation", href: "/explore/firm-platform-evaluation" },
      { label: "Review my offer", href: "/explore/review-my-offer" },
      { label: "Compare firms privately", href: "/explore/compare-firms-privately" },
    ],
  },
  {
    id: "tools", label: "Tools",
    intro: "Work your own numbers. Nothing is submitted anywhere.",
    items: [
      { label: "The VYNE 9", href: "/tools/the-vyne-9", ready: true, blurb: "Nine questions. An immediate, anonymous reading." },
      { label: "Independent advisor net payout", href: "/tools/independent-net-payout", ready: true, blurb: "Estimated pre-tax owner economics." },
      { label: "W-2 advisor net payout", href: "/tools/w2-net-payout", ready: true, blurb: "Estimated pre-tax cash compensation." },
      { label: "Practice value scenario explorer", href: "/tools/practice-value", ready: true, blurb: "A range, with the assumptions visible." },
      { label: "W-2 sunset program scenario explorer", href: "/tools/sunset-program", ready: true, blurb: "Your programme terms, not a published average." },
      { label: "Advisor decision checklist", href: "/tools/decision-checklist" },
    ],
  },
  {
    id: "intelligence", label: "Intelligence",
    intro: "Source-backed research and reference.",
    items: [
      { label: "Insights", href: "/intelligence/insights" },
      { label: "State of Advisor Movement", href: "/intelligence/state-of-advisor-movement", ready: true, blurb: "VYNE's standing research programme." },
      { label: "Reports and guides", href: "/intelligence/reports" },
      { label: "Firm research", href: "/intelligence/firm-research" },
      { label: "Model research", href: "/intelligence/model-research" },
      { label: "Frequently asked questions", href: "/intelligence/faqs" },
      { label: "Glossary", href: "/intelligence/glossary" },
      { label: "Newsletter", href: "/intelligence/newsletter" },
    ],
  },
];

export const startItems: NavItem[] = [
  { label: "Request a confidential conversation", href: "/start/confidential-conversation", ready: true },
  { label: "Review my offer", href: "/start/review-my-offer" },
  { label: "Compare firms privately", href: "/start/compare-firms" },
  { label: "Subscribe", href: "/start/subscribe" },
];

export const primaryCta = { label: "Confidential conversation", href: "/start/confidential-conversation" };

/** Navigation honesty: only completed routes appear in navigation. */
export const readyGroups: NavGroup[] = navGroups
  .map((g) => ({ ...g, items: g.items.filter((i) => i.ready) }))
  .filter((g) => g.items.length > 0);
