# VYNE Brand Guide — v1.0

**Approved:** 2026-07-21 (founder) · **Status:** Canonical source of truth until
superseded by a future founder-approved revision. Companion docs: `BRAND_TOKENS.md`
(color/type/spacing tokens), `DESIGN_SYSTEM.md` (components), `LOGO_USAGE.md`.

> **Provenance note.** The original VYNE identity sheet could not be located and
> is not in the repository. The **color palette** and engineering decisions below
> are founder-approved (2026-07-21) and canonical. The **narrative sections**
> (mission, positioning, personality, imagery) are grounded in the repository's
> authoritative product docs — chiefly `vyne-docs/04_UX_Blueprint_v1.md` §1 — and
> in the tagline/attributes recalled from the lost identity sheet, which are
> **marked ⚑ pending founder confirmation**. Nothing here was invented to fill a
> gap; unconfirmed items are flagged, not fabricated.

## 1. Brand mission & positioning

VYNE is a decision platform for financial advisors navigating the most
consequential decision of their career. It is built from **documents and
judgments, not widgets and metrics** (UX §1.1). Positioning: a discreet,
high-trust advisor to the advisor — closer to a private bank's client floor and
an editorial front page than to a SaaS dashboard.

⚑ *Tagline (from the lost identity sheet, pending confirmation):* **"Clarity
Before Choice. Conviction Before Action."**

## 2. Brand personality

The governing sensation is **"a prepared room"** — materials laid out before you
arrived, nothing extraneous, nothing shouting (UX §1.1). Every surface should
read like *a beautifully typeset report that happens to be interactive.*

Attributes ⚑ *(from the lost identity sheet, pending confirmation):* trusted,
independent, strategic, discreet, intelligent, high-performance, future-focused.
Voice in the interface (UX §1.2/§1.3, canonical): **sentence case** everywhere
(the wordmark is the only all-caps), plain nouns, **no exclamation marks, ever.**

## 3. Color palette

Official palette (canonical) — full detail in `BRAND_TOKENS.md`:

- **Midnight Navy `#081B36`** — the voice of the platform; primary ink and action.
- **Ivory `#F8F5EF`** — the canvas.
- **White `#FFFFFF`** — the single elevation (cards, documents).
- **Warm Bronze `#B88A5A`** — the signature accent. Budgeted, never decorative.
- **Stone Gray `#D7D2C6`** — borders and hairlines.
- **Charcoal `#1A1A1A`** — deepest ink.
- Functional: Slate `#425066` (secondary text), accessible bronze `#8A6234`
  (bronze text where AA is required). Semantic: forest/warning/danger.

The bronze budget (UX §1.2, carried): bronze marks the active-state indicator,
the document/section hairline rule, and the publish moment — little else. If a
screen shows more than a few bronze elements, remove until at most one.

## 4. Typography

Display **serif** (Source Serif 4 today; commercial faces deferred) makes screens
read as prepared documents; **Inter** for all interface text; tabular-lining
numerals in every table and figure. Scale and rules: `DESIGN_SYSTEM.md` §2.

## 5. Logo usage

See `LOGO_USAGE.md`. In brief: use the exact approved asset
(`packages/ui/assets/brand/vyne-logo-primary.png`); never redraw, recolor, crop,
distort, or add effects; preserve proportions and clear space.

## 6. Clear space & sizing

The logo asset carries its own clear space (the white margin is part of the
mark); give it at least that much room beyond the asset edge. Minimum legible
heights: ~48px on auth cards, ~64px in top bars (as implemented). Never place the
mark on a busy background or a non-white field (the asset has no transparency).

## 7. Iconography

A single stroke-style set — **1.5px stroke, geometric**, used sparingly for
navigation, status glyphs, and actions only (UX §1.6). No decorative icons, no
illustration, **no emoji anywhere in the product.** Icons appear with labels
except in confirmed-familiar positions. Navy default; bronze for accent/active;
slate for secondary. (No icon library is vendored yet — ⚑ selection pending.)

## 8. Imagery direction

Restrained and editorial — architectural, material, and document textures over
stock people-at-laptops. ⚑ *The lost identity sheet showed mountain/architectural
photography; treat as directional, pending founder confirmation.* No imagery
ships in the EA-001 slice.

## 9. UI principles

- Documents over widgets; the report over the dashboard (UX §1.1).
- One card style, hairline borders, **no shadow theater** (UX §1.4).
- Density is the enemy — progressive disclosure over smaller type.
- Motion communicates certainty: 150–200ms fades, no springs; the one
  choreographed moment is publication (UX §1.5).
- Status is **label + one color**, never color alone.

## 10. Accessibility standards

WCAG 2.1 **AA** minimum for all text (most pairings reach AAA). Bronze text on
light surfaces always uses the accessible variant. Visible focus states. Status
never by color alone. Full contrast evidence: Brand milestone report WCAG summary.

## 11. Do's and Don'ts

**Do:** use tokens via `@vyne/ui` (never hardcode hex); keep bronze rare and
budgeted; use `--vyne-bronze-text` for bronze text on light; keep sentence case;
preserve whitespace and the single card style.

**Don't:** hardcode colors; use bronze as small text on light backgrounds;
introduce shadows, gradients (except the approved navy sidebar), zebra striping,
or color-coded rainbows; use ALL-CAPS (except the wordmark); use exclamation
marks; redraw or recolor the logo; add decorative icons, illustration, or emoji.
