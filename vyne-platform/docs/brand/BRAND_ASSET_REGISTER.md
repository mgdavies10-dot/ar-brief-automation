# Brand Asset Register

**Established:** 2026-08-02 · **Owner:** Founder · **Parent:** `BRAND_SOURCE_OF_TRUTH.md`

> **Every row is an ASSET question, never a brand-strategy question.** A missing derivative means a file
> has not been produced — **not** that a decision is outstanding.

**Status:** ✅ production-ready · 🟢 approved implementation asset · 🌐 external reference, not imported ·
⬜ **missing production deliverable** · 📦 superseded

---

## 1 · In repository

| Asset | Path | Format | Status |
|---|---|---|---|
| **Primary logo** | `packages/ui/assets/brand/vyne-logo-primary.png` | PNG 1536×1024 · 24-bit RGB · **no alpha** | 🟢 **Approved implementation asset** — current local website and product UI |
| Palette comparison | `docs/brand/palette-comparison.png` | PNG | 📦 Superseded working artifact |
| Design tokens | `packages/ui/src/tokens.ts` · `tokens.css` | code | ✅ Canonical, test-guarded |

**The primary logo is approved for use. It is not a complete production package.** Both statements are
true and neither cancels the other.

## 2 · External historical references — exist, not imported

*Completed founder-approved work held outside the repository. **Not missing work.***

| Reference | Contains | Destination |
|---|---|---|
| 🌐 `Vyne_Strategies_Logo.png` | logo reference | `docs/brand/references/` |
| 🌐 `Vyne Strategies brand identity board.png` | stacked logo · symbol-only · horizontal lockup · reversed navy · office signage · invoice + stationery · website concept · embroidered hat · business cards · branded research report · elements labelled *path, direction, structure, heritage, convergence, decision, multiple options, clear choice* | `docs/brand/references/` |
| 🌐 `VYNE brand comparison and recommendations.png` | recommends **Logo Option 1** as primary; applied to office wall, invoice, hat | `docs/brand/references/` |

**Folder `docs/brand/references/` exists and is empty.** On import: reconcile `Vyne_Strategies_Logo.png`
against `vyne-logo-primary.png` and **rule which is canonical** — the in-repo copy currently renders
across the entire product.

## 3 · Missing production deliverables — pre-publication only

**None of these blocks local website work.** All are required before public launch.

| # | Deliverable | Needed for | Priority |
|---|---|---|---|
| P-1 | ⬜ **Primary stacked SVG** | scaling, print, everything downstream | **High** |
| P-2 | ⬜ **Reversed (ivory-on-navy)** | **navy surfaces currently carry no mark** | **High** |
| P-3 | ⬜ **Transparent PNG** | any non-white placement | **High** |
| P-4 | ⬜ **Standalone VE monogram SVG** | compact use, favicon, seal, apparel *(decision 2)* | **High** |
| P-5 | ⬜ **Favicon — SVG, PNG, ICO** | browser tab; **site currently has none** | **High** |
| P-6 | ⬜ Horizontal lockup SVG | constrained headers, signature blocks | Medium |
| P-7 | ⬜ Social / Open Graph lockup | link previews | Medium |
| P-8 | ⬜ Monochrome variants | single-colour reproduction | Medium |
| P-9 | ⬜ Print variants (CMYK/spot) | stationery, signage | Medium |
| P-10 | ⬜ Clear-space + minimum-size specification | consistent application | Medium |
| P-11 | ⬜ Embroidery file | hats, shirts *(decision 2)* | Low |
| P-12 | ⬜ Signage specification | office wall | Low |

**Route: one-time productionization of the already-approved mark — not a redesign.** Geometry recreated
carefully from the approved reference by a professional designer, **incorporating decision 6** (bars
elevated 10–15%), then personally approved by the founder.

> **Claude does not redraw, trace, simplify, reinterpret or generate a replacement mark, and does not use
> a reference board as a website logo.**

## 4 · Live consequences of the gaps

*Visible in the current build. Named so they are not mistaken for design choices.*

| Gap | Consequence today |
|---|---|
| **P-2 reversed** | Three navy bands — process, confidentiality, contact — **carry no mark**. The logo appears only on ivory and white |
| **P-3 transparent** | The mark sits on a **white plate**; `LOGO_USAGE` permits this, and the plate has been made the device rather than a workaround |
| **P-4 monogram** | No compact seal, no section marker, no favicon source |
| **P-5 favicon** | **The site has no browser-tab icon** |
| **P-1 SVG** | The logo is raster at every size; acceptable locally, not for print |

## 5 · Register maintenance

Update on: any asset added, produced or superseded · import of external references · any founder ruling
on the primary mark · **and before any publication decision.**

**Blocking rule:** a ⬜ row **never blocks local development.** ⬜ rows marked **High** **do block public
launch.**
