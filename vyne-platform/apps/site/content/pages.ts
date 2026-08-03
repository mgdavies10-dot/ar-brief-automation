/** Page-level copy. Substantive wording is founder-approved; do not drift. */

export const proof = {
  heading: "What you can hold us to",
  intro: "Not metrics. Commitments, stated so they can be checked.",
  items: [
    { t: "Explicit written authorization", d: "VYNE will not contact a firm about you, disclose your identity, or share your information without your explicit written authorization naming that specific firm." },
    { t: "No client-identifying information", d: "We do not ask for client names, account numbers or statements. Everything we need about your business can be described in aggregate." },
    { t: "Recorded separately", d: "Our recommendation, your decision, and any authorization to contact a firm are recorded as three separate things. Agreement is not authorization." },
    { t: "Compensation disclosed plainly", d: "We tell you how we are paid, name the conflict it creates, and describe the controls we apply to it." },
    { t: "Stay, wait and remediate are real conclusions", d: "Several legitimate outcomes generate no fee for VYNE. They remain available conclusions in our process." },
    { t: "A written record you keep", d: "What we concluded, why, how confident we are, what we do not know, and what would change our view." },
  ],
} as const;

export const founderDraft = {
  approved: false,
  heading: "Who is accountable",
  /** Draft public language. Contains NO employer, title, tenure, licence,
   *  credential, award, client outcome or asset total — none is on record. */
  body: [
    "VYNE exists because the advisor transition industry answers the wrong question first. An advisor raises a concern and is shown options. The conversation becomes comparative before anyone has established what the advisor is trying to accomplish, or whether the problem is structural at all.",
    "That ordering is not an accident. It follows the economics. Almost everyone in this market is paid when an advisor moves, which makes a move the destination every process quietly points toward.",
    "VYNE is paid the same way, and says so on this page rather than claiming an independence it does not have. What VYNE does differently is run the decision as a decision: evidence before opinion, staying and remediating as real conclusions, and the reasoning written down so it can be argued with.",
    "Advisors making seven- and eight-figure decisions about businesses they spent decades building deserve a decision process before a transaction process. That is the whole of it.",
  ] as string[],
  name: "",
  role: "",
  portrait: null as string | null,
  placeholder: "",
} as const;

export const toolsPreview = {
  heading: "Work your own numbers",
  intro: "Nothing you enter is submitted anywhere. Results appear immediately, and every assumption stays visible and editable.",
} as const;

export const intelligencePreview = {
  heading: "Research and reference",
  intro: "Source-backed work on the questions advisors are actually deciding.",
} as const;
