# VYNE Logo Usage — v1.0

**Approved:** 2026-07-21 · **Status:** Canonical. The logo asset itself is
governed by `packages/ui/assets/brand/README.md`; this document is the usage
guide.

## The asset

- **File:** `packages/ui/assets/brand/vyne-logo-primary.png` (founder-approved,
  resolves open question Q-9 for v1). Symbol ("V ⁄ =") over the VYNE wordmark;
  midnight navy on white; 1536×1024, 24-bit RGB (**no transparency** — the white
  ground is part of the asset).
- **Import in apps:** `@vyne/ui/assets/brand/vyne-logo-primary.png`.

## Rules (founder direction)

**Do:**
- Use this exact file.
- Preserve original proportions (3:2 canvas).
- Give it clear space beyond the asset's built-in margin.
- Place it only on white — or let its white ground read as an intentional plate
  (as in the current white top bars and auth cards).

**Don't:**
- Redraw, reinterpret, trace, simplify, or recreate the symbol.
- Stretch, crop, distort, rotate, or skew it.
- Recolor it or apply filters, shadows, glows, or other effects.
- Place it on a busy background or a non-white color field (it has no alpha).

## Sizing (as implemented)

- Auth card: ~78% of the 400px card width.
- Top bar: 64px tall.
- Minimum legible height: ~48px. Below that, use the symbol only — **⚑ a
  standalone symbol/monogram crop is not yet available** (the current asset is
  the full lockup); request one from the founder when a favicon or compact mark
  is needed.

## Still open (raster-only)

The current asset is raster (PNG). A **vector master (SVG/AI)** and a **reversed
(on-navy) variant** are not yet available — needed for print, favicons, and dark
surfaces. Raster is acceptable for the v1 local slice; request the vector and
reversed variants from the founder before any print or public-website work.
