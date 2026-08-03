/**
 * THE VYNE FRAMEWORK — founder-approved working framework, 2026-08-02.
 *
 * Public architecture:
 *   VYNE  →  The VYNE Framework  →  The VYNE 9
 *
 * The Framework explains HOW the decision is approached.
 * The VYNE 9 structures the QUESTIONS that make the decision clearer.
 *
 * The acronym is the memorable public expression of the method — NOT the whole
 * method, and not presented as VYNE's competitive moat. The six-step consulting
 * process is a separate thing and both may exist; they serve different purposes.
 */

export const framework = {
  name: "The VYNE Framework",
  standfirst:
    "Four dimensions that have to be understood before any path can be compared. The Framework is how the decision is approached; The VYNE 9 structures the questions that make it clearer.",
  intro:
    "Most transition conversations begin at the end — with firms, platforms and packages. The Framework begins where the decision actually starts, and only reaches options once the first three dimensions are established.",
  letters: [
    {
      letter: "V",
      word: "Vision",
      line: "Define the business, client experience, and future the advisor wants to build.",
      body:
        "Before anything is compared, it has to be clear what is being built toward. Not a five-year revenue target — the shape of the practice, what clients experience, and what the advisor wants the business to make possible. A path that serves someone else's vision is not an improvement.",
    },
    {
      letter: "Y",
      word: "Your Objectives",
      line: "Clarify what must improve, what must be protected, and what cannot be compromised.",
      body:
        "Three separate lists, not one. What must improve is the reason the question arose. What must be protected is usually invisible until it is threatened. What cannot be compromised eliminates more options than any preference ever will — and is the list advisors most often leave unstated.",
    },
    {
      letter: "N",
      word: "Navigate",
      line: "Evaluate the firms, models, platforms, and paths that deserve serious consideration.",
      body:
        "Only now do options enter. Navigation means establishing which paths survive the first two dimensions, what each would actually require, and which firm claims need verifying rather than accepting. Staying and remediating are paths, and they are navigated with the same rigour as moving.",
    },
    {
      letter: "E",
      word: "Enterprise Economics",
      line:
        "Understand compensation, ownership, enterprise value, succession, and the long-term consequences of each path.",
      body:
        "A transition package and a durable economic improvement are different things. This dimension separates near-term cash from long-term value, and treats ownership, enterprise value and succession as part of the economics rather than as a later conversation.",
    },
  ],
  boundary: {
    heading: "What the Framework is not",
    items: [
      "It is not a scoring model. It produces understanding, not a number.",
      "It is not a ranking system. It never names a best firm.",
      "It is not the whole method. Evidence discipline, firm intelligence, economics and professional judgment sit behind it.",
      "It does not assume a move. All four dimensions apply equally to staying.",
    ],
  },
  relation: {
    heading: "How the Framework and The VYNE 9 fit together",
    body:
      "The Framework is the structure. The VYNE 9 is how that structure is put to work in conversation — nine questions that surface what each dimension actually contains for a particular advisor.",
  },
} as const;
