# VYNE Design System — v1.0

**Approved:** 2026-07-21 · **Status:** Canonical. Shared by **VYNE OS**,
**Advisor Studio**, and the **future public website**. Standing mandate (founder,
2026-07-21): every future feature and every future public-website page uses this
system by default unless the founder explicitly approves an exception.

Tokens live in `@vyne/ui` (`tokens.css` / `tokens.ts`); shared auth-surface
styles in `@vyne/ui/auth.css`. Apps consume CSS custom properties — never
hardcode values.

---

## 1. Color tokens

Full palette: `BRAND_TOKENS.md`. Quick reference:

- **Brand:** navy `#081B36` · ivory `#F8F5EF` · white `#FFFFFF` · bronze
  `#B88A5A` · stone gray `#D7D2C6` · charcoal `#1A1A1A`.
- **Functional:** slate `#425066` (secondary text) · bronze-text `#8A6234`
  (AA bronze text) · hairline `#D7D2C6`.
- **Semantic:** success `#214E3B` · warning `#8A672C` · danger `#A54747` ·
  information (undefined — uses navy, flagged).

**Application:** ivory is the canvas; white is the single elevation (cards,
bars, documents); navy is primary ink and primary action; bronze is the rare
signature accent (dividers, active indicators, the publish moment) — budget it,
never decorate with it; charcoal is available for maximum-contrast ink.

## 2. Typography scale

Serif (`--vyne-font-serif`) for display/titles and deliverable headings; sans
(`--vyne-font-sans`, Inter) for all interface text. Desktop scale:

| Step | Size / line-height | Use |
|---|---|---|
| Display | 32 / 40 | Page titles, "Signed in", Studio headlines |
| Title | 24 / 32 | Card headings, dialog titles |
| Section | 18 / 26 | Sub-sections |
| Body | 15 / 24 | Default text |
| Meta | 13 / 18 | Secondary text, labels, captions |
| Micro | 11 / 16 | Chips, letterspaced small caps |

Numerals: tabular lining in tables/economics. Reading measure capped at ~72ch
(68ch Studio mobile; 16px min body on Studio mobile).

## 3. Spacing scale

8px base unit (`--vyne-unit`). Compose multiples: `calc(var(--vyne-unit) * n)`.
Page gutter 48px (`--vyne-page-gutter`). Generous whitespace; elevation is
communicated by border + spacing, not shadow.

## 4. Border radius

Single card radius **12px** (`--vyne-radius-card`); inputs/buttons use 6px;
chips are pill (999px). No other radii.

## 5. Shadows

**None by default.** Cards and bars use a 1px hairline border + spacing for
elevation, not drop shadows. Shadows are reserved for true overlays (dialogs,
popovers) only — to be defined when those components are built.

## 6. Buttons

- **Primary:** navy surface, white text, 6px radius, 600 weight; hover
  `opacity: .92`. (`.signin-submit`.) White-on-navy ≈ 17:1 (AAA).
- **Secondary / ghost:** transparent surface, navy text, hairline border; hover
  border → bronze. (`.topbar-signout`.)
- Disabled: `opacity: .5`, no pointer.

## 7. Forms

- Label: meta size, slate. Input: white surface, hairline border, 6px radius,
  navy text; focus → navy border, no outline halo. (`.signin-label`,
  `.signin-input`.)
- Errors: danger text, concise, above the submit; a single message that never
  reveals which field/credential was wrong (auth §4.1).

## 8. Cards

One card style: white surface, 1px hairline (stone gray) border, 12px radius,
**no shadow**. Padding in 8px multiples. (`.signin-card`, `.shell-card`.)

## 9. Tables

White surface on ivory; hairline row separators; tabular-lining numerals;
generous cell padding; every table printable. (Built out in M4.)

## 10. Navigation

- **OS:** white top bar, hairline bottom border, logo left, user + role chip +
  sign-out right. (Fixed left sidebar per Architecture §4.2 arrives in M4.)
  Active indicator: bronze hairline.
- **Studio:** white top bar, logo left, user right; no sidebar (§4.3). Active:
  bronze underline hairline.
- **Role chip:** pill, micro caps, bronze-text label + bronze border.

## 11. Icons

Line icons, 1.5px stroke, navy default / bronze for accented or active states /
slate for secondary. (Icon set selection pending; no icon library vendored yet
— flagged.) Bronze icons are decorative/graphical (≥3:1 not required for
essential meaning when paired with a text label).

## 12. Page layouts

- **Auth surfaces:** centered card on ivory, max-width 400px, logo top; the
  "discreet lobby" (auth §4.1). Shared via `@vyne/ui/auth.css`.
- **App shell:** white top bar + ivory content area, 48px gutter, max content
  width ~720px for reading surfaces.
- **Studio:** horizontal top bar, single-column reading layout, no nesting.

## 13. Semantic UI tokens

Success = forest, warning = warning amber, danger = danger red, information =
navy (no distinct hue yet — flagged for a future founder color). Semantic colors
are for state only, never decoration.

## 14. Accessibility

All text pairings meet WCAG 2.1 **AA** (most AAA) — see the WCAG summary in the
Brand milestone report. Bronze text on light surfaces always uses
`--vyne-bronze-text`. Focus states are visible (navy border). Motion is subtle
and respects reduced-motion intent.
