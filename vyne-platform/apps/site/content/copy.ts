/**
 * VYNE Strategies — public site copy.
 *
 * All public wording lives here so it can be edited without touching components.
 * Governed by EA-WEB-001. Founder-approved 2026-08-02.
 *
 * BINDING CONSTRAINTS (EA-WEB-001 §4):
 *  - never claim unbiased / neutral / conflict-free / objective
 *  - never publish fee percentages, amounts, step-ups, payment timing, clawbacks
 *  - never expose controlled internal methodology (module or framework names)
 *  - no comparisons to competitors, named or unnamed
 *  - no exclamation marks; sentence case except the wordmark
 */

export const meta = {
  name: "VYNE Strategies",
  shortName: "VYNE",
  title: "VYNE Strategies — consulting for financial advisors evaluating a change",
  description:
    "VYNE Strategies is a confidential consulting firm for financial advisors and teams evaluating consequential decisions about their business, including whether anything should change at all.",
  /**
   * LOCAL PLACEHOLDER — founder ruling 2026-08-02.
   * This mailbox does not exist. It must NOT be published.
   * Replace with a real address before the site leaves local development.
   */
  contactEmail: "hello@vynestrategies.com",
  copyright: "© 2026 VYNE Strategies. All rights reserved.",
} as const;

export const nav = [
  { id: "serves", label: "Who we serve" },
  { id: "questions", label: "The questions" },
  { id: "first-decision", label: "The first decision" },
  { id: "process", label: "How we work" },
  { id: "outcomes", label: "Outcomes" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "compensation", label: "How we are paid" },
  { id: "contact", label: "Contact" },
] as const;

export const hero = {
  heading: "Before you decide where to go, decide whether moving is the right answer.",
  body: [
    "Most advisors weighing a change are shown options before anyone has clearly established what they are trying to accomplish. VYNE starts with the decision itself.",
    "VYNE Strategies is a confidential consulting firm for financial advisors and teams evaluating consequential decisions about their business—including whether anything should change at all.",
  ],
  cta: "Request a confidential conversation",
} as const;

export const serves = {
  heading: "Who VYNE serves",
  body: [
    "Established advisors and teams—typically with substantial books, real client responsibility, and a team whose future is part of the decision.",
    "People who are thinking in decades rather than deals, and who would rather understand the question properly than move quickly.",
    "VYNE is best suited for advisors who want to understand the decision before pursuing a transaction.",
  ],
} as const;

export const questions = {
  heading: "The questions advisors bring to VYNE",
  intro:
    "These are the questions advisors are actually working through. Notice that none of them are about us.",
  items: [
    "Should I be looking elsewhere at all, or is this fixable where I am?",
    "What actually happens to my business if I move?",
    "How much of my book would realistically come with me—and how much would stay and keep producing?",
    "What does this do to my team?",
    "Are the economics genuinely better, or do they only look better in year one?",
    "What do I own, and what would I own somewhere else?",
    "What happens to my clients?",
    "Am I solving the right problem?",
  ],
} as const;

export const firstDecision = {
  heading: "Why the first decision is whether a change should happen at all",
  body: [
    "Sometimes a “should I move?” question turns out to be something else—a service problem that may be remediated, a capability that exists but has not been accessed, an ownership question, or a succession issue that has been postponed.",
    "Moving is expensive, disruptive, and hard to reverse. It is worth being confident the problem is structural before treating it as one.",
    "So the first work is diagnostic. We establish what is actually true about your practice, your platform, and your objectives—and only then ask what, if anything, should change.",
  ],
  emphasis:
    "Sometimes the right conclusion is to stay, wait, or address the problem where you are.",
} as const;

export const process = {
  heading: "The VYNE consulting process",
  steps: [
    {
      title: "We begin with a confidential conversation",
      body: "No documents, no commitment, and nothing shared with a firm or outside party without your permission.",
    },
    {
      title: "We orient the decision",
      body: "What you are trying to accomplish, what is genuinely in play, and whether we can do work that is useful to you. If we cannot, we say so.",
    },
    {
      title: "We assess the practice",
      body: "A structured review across the areas that bear on the decision—your objectives, the practice as it stands, capabilities, economics, your book, your clients, your team, ownership and succession, risk, and what needs verifying.",
    },
    {
      title: "We test our thinking with you",
      body: "Our conclusions are worked through with you before they become recommendations. You correct us; that is part of the method.",
    },
    {
      title: "You receive a written record",
      body: "What we concluded, why, how confident we are, what we do not know, and what would change our view. It is yours to keep and to discuss with your spouse, your attorney, or your accountant.",
    },
    {
      title: "You decide",
      body: "We record your decision separately from our recommendation, and where they differ, both stand.",
    },
  ],
} as const;

export const outcomes = {
  heading: "Legitimate outcomes",
  intro:
    "Depending on the advisor’s objectives and circumstances, legitimate outcomes may include:",
  items: [
    "stay",
    "wait",
    "remediate where you are",
    "move",
    "launch your own firm",
    "join an existing firm",
    "merge",
    "acquire",
    "sell",
    "plan a succession",
    "retire or wind down",
  ],
  close:
    "No outcome is our default, and no outcome is preferred. An advisor who arrives describing a move is often facing an ownership, capability, service, or succession question instead.",
} as const;

export const confidentiality = {
  heading: "Confidentiality and advisor-controlled firm contact",
  lead:
    "VYNE will not contact a firm about you, disclose your identity, or share your information without your explicit written authorization naming that specific firm.",
  body: [
    "Authorization is firm-specific and signed each time. A general willingness to explore is not authorization. Agreeing with a recommendation is not authorization. Authorization for one firm does not extend to another.",
    "We do not ask for client-identifying information. No names, account numbers, statements, or anything identifying one of your clients. We do not need it and we will not keep it. Everything we need about your business can be described in aggregate.",
    "Information you share is restricted to authorized VYNE personnel and professional advisers with a legitimate need to know.",
  ],
} as const;

export const compensation = {
  heading: "How VYNE is compensated",
  disclosure:
    "VYNE is generally compensated by a hiring firm when an advisor or team successfully joins that organization. Advisors typically do not pay VYNE for traditional recruiting and transition-consulting services. Compensation arrangements may vary by firm and engagement, and some legitimate outcomes—including staying, waiting, or pursuing an option that does not compensate VYNE—may generate no fee for us.",
  controls:
    "This compensation structure creates a potential conflict, and we disclose it plainly. VYNE keeps compensation separate from its analysis of advisor fit, documents the reasoning supporting its professional judgment, and records the advisor’s decision separately from any recommendation or authorization to contact a firm.",
} as const;

/**
 * Founder section — BUILT BUT HIDDEN (EA-WEB-001 §4).
 *
 * `visible` stays false until founder-approved public biography content is supplied.
 * Do NOT infer or populate employers, titles, tenure, credentials, licenses, or
 * personal biography facts. Every field below is intentionally empty.
 */
export const founder = {
  visible: false as boolean,
  heading: "Founder",
  name: "",
  role: "",
  body: [] as string[],
  portrait: null as string | null,
} as const;

export const contact = {
  heading: "Start with a conversation.",
  body: "No documents, no commitment, and nothing shared with a firm or outside party without your permission. We will tell you plainly whether we think we can be useful.",
  cta: "Request a confidential conversation",
  altPrefix: "If you would prefer to write first, ",
  altLinkText: "email us",
  altSuffix: ".",
  mailtoSubject: "Confidential conversation",
} as const;

export const footer = {
  disclosure:
    "VYNE Strategies is a consulting firm. We do not provide legal, tax, accounting, valuation, investment, or compliance advice, and we do not act as a broker-dealer, investment adviser, or custodian. We do not perform account transfers or transition mechanics. We do not claim to have reviewed every firm or option in the market. Nothing on this page is a recommendation regarding any firm, security, or investment.",
  copyright: meta.copyright,
  links: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;

export const pendingCounsel = {
  banner: "This page is not yet in effect.",
  body: "VYNE Strategies is preparing this document with outside counsel. It is not published, not in effect, and should not be relied upon. Nothing on this page states VYNE’s policy.",
  back: "Return to the main page",
} as const;
