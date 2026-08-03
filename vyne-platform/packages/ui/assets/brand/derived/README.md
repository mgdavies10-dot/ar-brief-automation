```
TEMPORARY LOCAL IMPLEMENTATION DERIVATIVES — FOUNDER REVIEW REQUIRED
NOT APPROVED PRODUCTION ASSETS · NOT CANONICAL · NOT PUBLICATION-READY
```

# Derived logo assets — temporary, local only

**Generated:** 2026-08-02 by `scripts/productionize-logo.mjs` · **Status:** awaiting founder review

> ## These are not approved assets
> `LOGO_USAGE.md` prohibits **recolouring · cropping · monogram extraction · reinterpretation**. Every
> file in this folder involved at least one of those operations. **Pixel geometry was preserved, but
> preserved geometry does not make a derivative approved.** The asset sprint is **not complete**.

**The canonical source logo is unchanged:** `../vyne-logo-primary.png`. Nothing here replaces it.

## Transformations applied

| Transformation | What was done |
|---|---|
| **Alpha extraction** | The artwork's luminance became an alpha channel — white ground → transparent, navy ink → opaque. Normalised so the densest ink reaches full opacity. |
| **Recolouring** | Ink recoloured to navy `#081B36`, ivory `#F8F5EF`, charcoal `#1A1A1A`, white `#FFFFFF`. **Prohibited by LOGO_USAGE without approval.** |
| **Cropping** | Trimmed to the ink bounding box (912×658 from 1536×1024) with 4% padding. **Prohibited without approval.** |
| **Monogram extraction** | VE mark separated from the wordmark at the artwork's own widest empty row band (94px gap, split y=592). **Explicitly prohibited without approval.** |
| **Resizing** | Down-sampled to 360px, 240px and favicon sizes 512/180/64/32/16. |
| **Background generation** | Open Graph lockup composited onto a generated 1200×630 navy field. **New artwork not present in the approved asset.** |

## Files

| File | Derivation |
|---|---|
| `vyne-stacked-navy.png` · `@2x` · `-360` | alpha + crop + resize |
| `vyne-stacked-ivory.png` · `-360` | alpha + **recolour** + crop + resize |
| `vyne-stacked-black.png` · `vyne-stacked-white.png` | alpha + **recolour** + crop |
| `vyne-monogram-navy.png` · `vyne-monogram-ivory.png` | alpha + **crop** + **monogram extraction** (+ recolour, ivory) |
| `favicon-{512,180,64,32,16}.png` | alpha + monogram extraction + resize |
| `og-lockup.png` | alpha + recolour + crop + resize + **background generation** |

## Permitted use — narrow

**May** be used in the **local, unpublished** website build so design can proceed without the white-tile
problem. **May not** be published, treated as canonical, used in print, sent to a third party, or cited
as evidence that production assets exist.

## What is still required

1. **Founder review** of the comparison sheet before any derivative becomes canonical.
2. **A designer-created vector master** — remains a publication gate. `BRAND_ASSET_REGISTER` P-1.
3. **No silent amendment of `LOGO_USAGE.md`.** If the founder approves these operations, that is a
   deliberate rule change recorded as such.

**`LOGO_USAGE.md` has not been amended.** The prohibitions stand as written.
