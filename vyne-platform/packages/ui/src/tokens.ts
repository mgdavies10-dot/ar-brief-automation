/**
 * VYNE design tokens — canonical source: BRAND_TOKENS.md palette as recorded in
 * Architecture v1.2 §11 and UX Blueprint v1.0 Part 1. Any change here requires a
 * founder decision (Conflict C-3 treats BRAND_TOKENS.md as canonical).
 *
 * Typography: Source Serif 4 is the Q-8 fallback serif (final serif is an open
 * founder decision); Inter for all interface text. Font files are not vendored
 * yet — stacks fall back to system faces until Q-8 resolves.
 */

export const color = {
  /** Ink Navy — primary text, headers, OS sidebar, primary buttons. */
  navy: "#12233F",
  /** Warm Ivory — the canvas; all content surfaces are ivory or white. */
  ivory: "#F7F4ED",
  /** White — cards and documents sitting on ivory; the one-step elevation. */
  white: "#FFFFFF",
  /** Slate — secondary text, metadata, captions. */
  slate: "#425066",
  /** Forest — confirmation, completed states, "published". */
  forest: "#214E3B",
  /** Gold — the signature. Nav active indicator, document hairline rule, the publish moment. Nothing else. */
  gold: "#B48A35",
  /** Warning amber — genuine warning states only, never decoration. */
  warning: "#8A672C",
  /** Danger — overdue, clawback, destructive confirmation only. */
  danger: "#A54747",
  /** Hairline border on cards and tables. */
  hairline: "#E3E0D8",
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
