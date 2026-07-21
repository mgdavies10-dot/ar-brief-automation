# Brand Milestone Report — Official VYNE brand adoption (EA-001)

**Date:** 2026-07-21 · **Milestone:** Brand Token Update (roadmap) ·
**Status:** **Complete — awaiting founder gate review** (uncommitted)

## Progress dashboard (earned milestone progress)

| Milestone | Status |
|---|---|
| M1 · M2 · M3-1 · M3-2 · M3-S | ✅ Complete |
| Brand Update | 🟡 Pending founder approval |
| M3-3 | ⏳ Planned (next) |
| M4 · M5 · M6 | ⏳ Planned |

- **Earned milestone progress:** 5 of 10 = **50%** (Brand → 60% on approval).
- **Est. engineering sessions remaining:** ~13–17.
- **Technical debt:** unchanged from M3-S (auth screen components still per-app;
  no React component test harness). New flags below (info color, vector logo,
  icon set) are brand-completeness gaps, not debt.
- **Open founder decisions:** information semantic color (none defined); vector +
  reversed logo variants; icon library selection; commercial-font licensing;
  brand-narrative confirmation (mission/personality/imagery — identity sheet lost).
- **Risks:** M4 scope creep (largest ahead).
- **Features complete vs. planned:** unchanged — this was a tokens-only change;
  no functionality added. Auth foundation complete; M3-3 next.

## What changed

Tokens only — **no layout, spacing, typography hierarchy, UX, or functionality
changed.** The interim engineering palette was replaced by the founder-approved
official VYNE brand, and a **new canonical brand package** was created.

- **`packages/ui`** `tokens.ts` / `tokens.css`: official palette + functional +
  semantic tokens; `tokens.test.ts` updated (camelCase→kebab lockstep) — 4/4.
- **`--vyne-gold` retired → `--vyne-bronze`** across both apps and shared
  `auth.css`; small-caps text (submark, role chip) uses the accessible
  `--vyne-bronze-text`; hairline/border value → Stone Gray.
- **New brand package `docs/brand/`:** `Brand_Guide_v1.0.md`, `BRAND_TOKENS.md`,
  `DESIGN_SYSTEM.md`, `LOGO_USAGE.md` — the canonical source of truth, shared by
  OS, Studio, and the future public website.
- **Standing mandate** recorded in `CLAUDE.md` and the Decision Log: all future
  features and public-website pages use this design system by default unless the
  founder approves an exception.

## Token change log

| Token | Before | After | Note |
|---|---|---|---|
| Navy | `#12233F` | `#081B36` | Midnight Navy (resolves Architecture C-3) |
| Ivory | `#F7F4ED` | `#F8F5EF` | official ivory |
| Accent | Gold `#B48A35` (`--vyne-gold`) | Warm Bronze `#B88A5A` (`--vyne-bronze`) | token renamed |
| Bronze text | — | `#8A6234` (`--vyne-bronze-text`) | new; AA bronze for text |
| Stone Gray | — | `#D7D2C6` (`--vyne-stone-gray`) | new brand neutral |
| Charcoal | — | `#1A1A1A` (`--vyne-charcoal`) | new brand neutral |
| Hairline | `#E3E0D8` | `#D7D2C6` | now = Stone Gray |
| Slate | `#425066` | `#425066` | unchanged (functional) |
| Forest / Warning / Danger | unchanged | unchanged | semantic |

## WCAG AA verification summary

All text pairings meet WCAG 2.1 **AA** (4.5:1 normal / 3:1 large); most reach AAA.

| Pairing | Ratio | Result |
|---|---|---|
| Navy `#081B36` on Ivory | ~15.8:1 | AAA |
| Charcoal `#1A1A1A` on Ivory | ~16:1 | AAA |
| Slate `#425066` on Ivory (secondary text) | ~7.5:1 | AAA |
| White on Navy (primary button) | ~17:1 | AAA |
| Bronze **text** `#8A6234` on Ivory | ~5.0:1 | AA |
| Bronze **text** `#8A6234` on White | ~5.4:1 | AA |
| Bronze `#B88A5A` on Navy | ~5.6:1 | AA |
| Danger `#A54747` on White | ~5.9:1 | AA |
| Warning `#8A672C` on White | ~5.2:1 | AA |
| Forest `#214E3B` on White | ~9.5:1 | AAA |

**Key rule enforced:** Warm Bronze `#B88A5A` as small text on light backgrounds
is ~3.0:1 (**fails** AA), so all bronze *text* uses `#8A6234`; plain bronze is
used only for accents, borders, rules, icons, and surfaces (and as text on navy,
where it passes). Status is always label + one color, never color alone.

## Deliverables

- **Before/after visual:** published artifact (faithful render of the primary
  surfaces under both palettes — the in-app browser cannot capture live pixel
  screenshots, so this is rendered from the exact token values; the live apps
  show the "after").
- **Token change log:** above.
- **WCAG AA summary:** above.
- **Canonical brand package:** `docs/brand/` (4 documents).

## Verification

`turbo build typecheck` **9/9** (clean run with dev servers stopped — the
intermittent OS typecheck failure is a known race with the dev server
regenerating `.next/types`); real Supabase stack **49/49**; `@vyne/ui` token
tests **4/4**.

## Flags (honest gaps — none block the milestone)

- **Read-only docs:** `vyne-docs/03_Architecture_v1.2.md` §11 and
  `04_UX_Blueprint_v1.md` Part 1 still show the old palette. They are **read-only
  governing material I cannot edit.** The new brand package explicitly supersedes
  them; noted in `BRAND_TOKENS.md` and `CLAUDE.md`.
- **Brand narrative** (mission/personality/imagery) is grounded in the UX
  Blueprint and marked ⚑ where it derives from the lost identity sheet — pending
  founder confirmation, not fabricated.
- **Information** semantic color: none defined (uses navy) — flagged.
- **Logo:** raster only; vector master + reversed (on-navy) variant needed for
  print/favicon/dark surfaces. **Icon library:** not yet selected.
- **Fonts:** Source Serif 4 + Inter retained; commercial faces deferred.
