# VYNE Brand Tokens — canonical

**Version:** 1.0 · **Approved:** 2026-07-21 (founder) · **Status:** Canonical
source of truth. Supersedes the palette in `vyne-docs/03_Architecture_v1.2.md`
§11 and `vyne-docs/04_UX_Blueprint_v1.md` Part 1 (those files are read-only and
cannot be edited; this document governs). Resolves Architecture Conflict **C-3**
(navy `#081B36` confirmed official).

Implemented in `packages/ui/src/tokens.ts` + `tokens.css` (guarded by
`tokens.test.ts`). Consume via the `@vyne/ui` CSS custom properties — never
hardcode hex values in app code.

## Official brand palette

| Token | Hex | CSS var | Role |
|---|---|---|---|
| Midnight Navy | `#081B36` | `--vyne-navy` | Primary ink, headers, primary buttons, OS sidebar |
| Ivory | `#F8F5EF` | `--vyne-ivory` | The canvas — page background |
| White | `#FFFFFF` | `--vyne-white` | Cards, documents, bars (one-step elevation on ivory) |
| Warm Bronze | `#B88A5A` | `--vyne-bronze` | Accents, borders emphasis, icons, highlights, surfaces, dividers |
| Stone Gray | `#D7D2C6` | `--vyne-stone-gray` | Brand neutral; standard border/hairline |
| Charcoal | `#1A1A1A` | `--vyne-charcoal` | Deepest ink for high-contrast text on light surfaces |

## Functional tokens (support the UI; not brand colors)

| Token | Hex | CSS var | Role |
|---|---|---|---|
| Slate | `#425066` | `--vyne-slate` | Secondary text, metadata, captions |
| Accessible Bronze | `#8A6234` | `--vyne-bronze-text` | Bronze **text** on light surfaces where WCAG AA is required |
| Hairline | `#D7D2C6` | `--vyne-hairline` | Border/hairline role — resolves to Stone Gray |

## Semantic tokens (carried; unchanged until a future brand update)

| Token | Hex | CSS var | Role |
|---|---|---|---|
| Success | `#214E3B` | `--vyne-forest` | Success, completed, "published" |
| Warning | `#8A672C` | `--vyne-warning` | Genuine warning states only |
| Danger | `#A54747` | `--vyne-danger` | Overdue, clawback, destructive confirmation |
| Information | — | — | **No distinct hue defined yet.** Use Navy for informational emphasis; flagged for a future founder color decision. |

## Bronze usage rule (accessibility)

Warm Bronze `#B88A5A` is a mid-tone: excellent as an accent, border, icon,
highlight, divider, or on **navy** surfaces (~5.6:1), but it does **not** meet
WCAG AA as small text on light backgrounds (~3.0:1 on ivory/white). Therefore:

- **Surfaces / borders / icons / rules / accents on light bg → `--vyne-bronze`.**
- **Bronze text on light bg → `--vyne-bronze-text` (`#8A6234`, ≥4.5:1).**
- Bronze text **on navy** may use `--vyne-bronze` directly (passes AA there).

## Typography, spacing, radius, motion

Unchanged by the brand update (layout/UX preserved):

- **Fonts:** `--vyne-font-serif` (Source Serif 4 → system serif fallback) for
  display/titles; `--vyne-font-sans` (Inter → system) for interface. Commercial
  faces (Trajan Pro / Cormorant Garamond / Suisse Int'l) deferred to a future
  licensing decision.
- **Type scale (desktop):** display 32/40 · title 24/32 · section 18/26 ·
  body 15/24 · meta 13/18 · micro 11/16 (px size/line-height).
- **Spacing:** 8px base unit; page gutter 48px.
- **Radius:** single card radius 12px.
- **Motion:** 150–200ms ease-out; no springs.
