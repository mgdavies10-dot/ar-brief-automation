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
  heading: "Who is accountable",
  placeholder: "Founder biography and portrait are being prepared and are not yet published.",
  name: "", role: "", body: [] as string[], portrait: null as string | null,
  approved: false,
} as const;

export const toolsPreview = {
  heading: "Work your own numbers",
  intro: "Nothing you enter is submitted anywhere. Results appear immediately, and every assumption stays visible and editable.",
} as const;

export const intelligencePreview = {
  heading: "Research and reference",
  intro: "Source-backed work on the questions advisors are actually deciding.",
} as const;
