/**
 * THE VYNE 9 — canonical product name and question set.
 * Founder ruling 2026-08-02. Supersedes every "The VYNE 9" reference.
 */

export const VYNE9 = {
  name: "The VYNE 9",
  cta: "Take The VYNE 9",
  route: "/tools/the-vyne-9",
  standfirst:
    "Nine questions that establish what you are actually deciding, before anyone shows you an option. Your reading appears immediately and anonymously. Nothing is submitted anywhere, and no firm is contacted.",
} as const;

export type Vyne9Question = {
  n: string;
  q: string;
  why: string;
  lens: string;
};

export const questions: Vyne9Question[] = [
  { n: "1", lens: "Protect", q: "What is working that must be protected?", why: "A change that damages what already works is not an improvement. This establishes the floor." },
  { n: "2", lens: "Friction", q: "Where is the current model creating meaningful friction?", why: "Separates genuine structural friction from ordinary irritation." },
  { n: "3", lens: "Clients", q: "What do your clients need from the next chapter?", why: "Client need is a decision criterion, not a transition task." },
  { n: "4", lens: "Purpose", q: "What do you want the business to make possible?", why: "The business is instrumental. This establishes what it is instrumental to." },
  { n: "5", lens: "Limits", q: "Which trade-offs are you unwilling to make?", why: "Non-negotiables eliminate more options than preferences ever will." },
  { n: "6", lens: "Risk", q: "What could prevent a successful change?", why: "Names the failure modes while they are still cheap to address." },
  { n: "7", lens: "Evidence", q: "What information must be true before you can decide?", why: "Distinguishes what you know from what you have assumed." },
  { n: "8", lens: "Options", q: "Which paths deserve serious comparison?", why: "Narrows to the paths that survive your own constraints." },
  { n: "9", lens: "Ownership", q: "What decision can you responsibly own?", why: "A decision you cannot defend to yourself is not yet a decision." },
];

/** The four readings. None is a recommendation, and none names a firm. */
export const readings = [
  { key: "stay", label: "Stay", body: "The evidence points toward the current model, and the friction you are describing has not yet been shown to be structural." },
  { key: "strengthen", label: "Strengthen", body: "The problem appears real and addressable where you are. Internal remediation deserves a genuine attempt before affiliation is examined." },
  { key: "prepare", label: "Prepare", body: "Something material is unresolved — evidence, timing, team, or contract. The work is establishing it, not choosing yet." },
  { key: "compare", label: "Compare", body: "Your constraints and objectives point beyond the current model. Serious comparison of paths is warranted." },
] as const;

export const promises = [
  "No email required to see your reading.",
  "A fuller written version can be sent to you if you want it. That is optional.",
  "No firm is contacted. Nothing you enter reaches anyone outside VYNE.",
  "We do not ask for your CRD, exact revenue, exact assets, documents, or any client information.",
  "Stay, strengthen, prepare and compare are all legitimate readings. Two of them earn VYNE nothing.",
] as const;
