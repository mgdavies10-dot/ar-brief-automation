/**
 * VYNE design tokens — canonical source: docs/brand/BRAND_TOKENS.md (founder-
 * approved official brand, 2026-07-21). Supersedes the earlier engineering
 * palette in Architecture v1.2 §11. Any change here requires a founder decision.
 *
 * Brand tokens (navy, ivory, white, bronze, stoneGray, charcoal) are the
 * official VYNE palette. Functional tokens (slate, bronzeText, hairline) and
 * semantic tokens (forest, warning, danger) support the UI without being part of
 * the brand palette. Keep tokens.css in lockstep — tokens.test.ts guards it.
 *
 * Typography: Source Serif 4 (display) + Inter (interface) remain in use;
 * commercial-font licensing (Trajan Pro / Cormorant Garamond / Suisse Int'l) is
 * deferred to a future founder decision.
 */

export const color = {
  // ---- Official brand palette (docs/brand/BRAND_TOKENS.md) ----
  /** Midnight Navy — primary ink, headers, primary buttons, OS sidebar. */
  navy: "#081B36",
  /** Ivory — the canvas; all content surfaces are ivory or white. */
  ivory: "#F8F5EF",
  /** White — cards and documents sitting on ivory; the one-step elevation. */
  white: "#FFFFFF",
  /** Warm Bronze — accents, borders emphasis, icons, highlights, surfaces. Not for small text (see bronzeText). */
  bronze: "#B88A5A",
  /** Stone Gray — brand neutral; the standard border/hairline color. */
  stoneGray: "#D7D2C6",
  /** Charcoal — brand neutral; deepest ink for high-contrast text on light surfaces. */
  charcoal: "#1A1A1A",

  // ---- Functional tokens (support the UI; not brand colors) ----
  /** Slate — secondary text, metadata, captions (functional, preserves readability). */
  slate: "#425066",
  /** Accessible bronze — derived from Warm Bronze; use ONLY where bronze text must meet WCAG AA on light surfaces. */
  bronzeText: "#8A6234",
  /** Hairline border on cards, tables, bars — resolves to Stone Gray. */
  hairline: "#D7D2C6",

  // ---- Semantic tokens (carried; unchanged until a future brand update) ----
  /** Forest — success, completed states, "published". */
  forest: "#214E3B",
  /** Warning amber — genuine warning states only, never decoration. */
  warning: "#8A672C",
  /** Danger — overdue, clawback, destructive confirmation only. */
  danger: "#A54747",
} as const;

export const font = {
  /** Display serif: page titles, document titles, deliverable headings, Studio headlines. */
  serif: '"Source Serif 4", "Source Serif Pro", Georgia, "Times New Roman", serif',
  /** Interface: labels, tables, forms, navigation. */
  sans: 'Inter, "Inter Variable", system-ui, -apple-system, "Segoe UI", sans-serif',
} as const;

/** Desktop type scale — size/line-height pairs in px (UX §1.3). */
export const typeScale = {
  display: { size: 32, lineHeight: 40 },
  title: { size: 24, lineHeight: 32 },
  section: { size: 18, lineHeight: 26 },
  body: { size: 15, lineHeight: 24 },
  meta: { size: 13, lineHeight: 18 },
  micro: { size: 11, lineHeight: 16 },
} as const;

/** Spacing — 8px base unit (UX §1.4). */
export const space = {
  unit: 8,
  sectionMin: 32,
  sectionMax: 48,
  pageGutterDesktop: 48,
} as const;

export const radius = {
  /** The single card radius. */
  card: 12,
} as const;

export const motion = {
  /** 150–200ms ease-out fades; no bounces, no springs (UX §1.5). */
  durationMinMs: 150,
  durationMaxMs: 200,
  easing: "ease-out",
  surfaceRisePx: 8,
} as const;

/** Reading measure caps for deliverable content (UX §1.3, §2.5). */
export const measure = {
  maxChars: 72,
  studioMobileMaxChars: 68,
  studioMobileMinBodyPx: 16,
} as const;
