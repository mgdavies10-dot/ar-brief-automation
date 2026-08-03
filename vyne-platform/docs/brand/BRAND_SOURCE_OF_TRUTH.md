# Brand — Source of Truth

**Established:** 2026-08-02 · **Owner:** Founder · **Parent:** `../00_VYNE_MASTER_INDEX.md`

> **Brand strategy and logo direction are SETTLED.** What remains is **asset production** — converting an
> approved mark into production file formats. **That is not a brand question and must not reopen one.**

---

## 1 · Canonical brand documents

| Document | Governs | Status | Approved |
|---|---|---|---|
| `Brand_Guide_v1.0.md` | mission, personality, palette, type, logo, imagery, UI principles, accessibility | ✅ Canonical | 2026-07-21 |
| `BRAND_TOKENS.md` | the official palette and type scale — **supersedes `vyne-docs/`** | ✅ Canonical | 2026-07-21 |
| `DESIGN_SYSTEM.md` | component and surface rules | ✅ Canonical | 2026-07-21 |
| `LOGO_USAGE.md` | how the mark may and may not be used | ✅ Canonical | 2026-07-21 |
| `BRAND_STANDARDS.md` | strategy-level: voice, tone, positioning, visual principles | ✅ Accepted, living | 2026-07-25 |
| `BRAND_RECONCILIATION.md` | 📦 **superseded** — the palette question it asked is resolved | 📦 History | 2026-07-21 |

## 2 · Approved palette — binding

| Token | Hex | Role |
|---|---|---|
| Midnight Navy | `#081B36` | primary ink, bands, primary buttons |
| Ivory | `#F8F5EF` | the canvas |
| White | `#FFFFFF` | cards, documents — one step up from ivory |
| Warm Bronze | `#B88A5A` | accents, borders, rules, icons · **never small text on light** |
| Stone Gray | `#D7D2C6` | brand neutral, hairlines |
| Charcoal | `#1A1A1A` | deepest ink on light |
| Slate | `#425066` | secondary text *(functional)* |
| Accessible Bronze | `#8A6234` | bronze **text** on light, WCAG AA *(functional)* |

**Consume via `@vyne/ui` custom properties. Never hardcode hex.**

## 3 · Approved typography

**Source Serif 4** display · **Inter** interface. Scale: display 32/40 · title 24/32 · section 18/26 ·
body 15/24 · meta 13/18 · micro 11/16. Spacing 8px base, 48px gutter. Radius 12px. Motion 150–200ms
ease-out, no springs.

❓ **Unresolved:** Trajan Pro / Suisse Int'l require commercial licences. **Not a blocker** — the current
pairing is approved and in use.

> ### Derived logo assets are TEMPORARY
> `packages/ui/assets/brand/derived/` holds transparent, recoloured, cropped and monogram variants
> generated 2026-08-02. They are **TEMPORARY LOCAL IMPLEMENTATION DERIVATIVES — FOUNDER REVIEW
> REQUIRED**, not approved production assets. Recolouring, cropping and monogram extraction are
> **prohibited by `LOGO_USAGE.md` without approval**. The canonical source is unchanged and
> `LOGO_USAGE.md` has **not** been amended. See `derived/README.md`.

## 4 · Logo — approved direction, binding

**Primary mark:** VE monogram over a letterspaced VYNE wordmark, midnight navy.
**Logo Option 1 is the primary-mark direction** unless the founder expressly changes it.

### Recovered founder decisions — binding

1. The full **VE + VYNE + STRATEGIES** lockup is the **formal primary identity**.
2. **VE alone** is preferred for hats, shirts, icons and compact applications.
3. **Bronze is restrained functional brand language**, generally **outside the core mark**.
4. The **heavier V stroke** may represent **foundation and experience**.
5. The **thinner directional element** may represent **opportunity and movement**.
6. The **horizontal bars should be elevated approximately 10–15%.** ⚠ *The current asset does not reflect
   this. Apply at productionization; requires founder sign-off.*
7. The mark should feel **vine-like conceptually** — growth, branching, connection, direction,
   convergence.
8. **No literal leaves, vines, foliage or botanical decoration.**
9. **Logo Option 1 remains primary** unless expressly changed.

### Usage rules — binding

**Do:** use the exact approved file · preserve 3:2 proportions · give clear space beyond the built-in
margin · place on white, **or let its white ground read as an intentional plate**.

**Don't:** redraw · reinterpret · trace · simplify · recreate · **extract the monogram from the image** ·
stretch · crop · distort · rotate · skew · recolour · apply filters, shadows or glows · place on a
non-white field.

**Sizing:** top bar 64px · minimum legible ~48px.

## 5 · Visual-direction principles

**Feel:** refined · calm · editorial · spacious · disciplined · premium · understated ·
contemporary-but-durable · **human rather than technological**.

**Avoid:** fintech · crypto · PE-aggressive · generic wealth-management corporate · startup SaaS ·
mass-market recruiting · ornate luxury · nightclub luxury · dark/secretive · sterile · overly masculine ·
transactional.

**Balance:** authority ↔ warmth · sophistication ↔ accessibility · privacy ↔ openness · premium ↔
restraint · tradition ↔ modernity. *The differentiator is warmth with discipline — never coldness dressed
as premium.*

**Imagery:** ⚠ *"Do not source or generate images yet."* **Prohibited clichés:** handshakes · skyscrapers
· advisors at screens · conference rooms · chess pieces · compasses · bridges · mountain summits · stock
charts · people pointing at documents · artificial luxury offices. **Preferred when the time comes:**
restrained environmental portraiture · real working environments · architectural detail · editorial
imagery · tactile materials · subtle metaphor used sparingly.

## 6 · Brand architecture

**VYNE** is the master brand. **VYNE Strategies** is the formal name — wordmark, metadata, disclosures,
footer. **VYNE** is used naturally in body copy. One master brand; no sub-brands.

## 7 · Guardrails — non-negotiable

Consulting first · advisor first · no preferred destination · no unsupported claims · no artificial
urgency · **no software-first positioning** · no implication that every advisor should move · never
obscure how VYNE is paid · never reduce the decision to a score · **no visual excess substituting for
credibility** · no claim of certainty where uncertainty exists.

> **When behaviour and visuals conflict, the behaviour is the brand.**

## 8 · What is settled vs what is production work

| Settled — do not reopen | Production work — schedule it |
|---|---|
| Palette · typography · logo direction · Logo Option 1 as primary · lockup hierarchy · bronze discipline · vine-as-concept · no-foliage rule · visual principles · guardrails · brand architecture | SVG master · reversed variant · transparent PNG · monogram crop · horizontal lockup · favicon · OG lockup · monochrome and print variants · clear-space and minimum-size specs · embroidery and signage files |

**Register:** `BRAND_ASSET_REGISTER.md` · **Backlog:** `../backlog/BRAND_ASSET_CONSOLIDATION.md`
