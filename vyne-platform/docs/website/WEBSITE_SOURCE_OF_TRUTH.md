# Website — Source of Truth

**Established:** 2026-08-02 · **Owner:** Founder · **Parent:** `../00_VYNE_MASTER_INDEX.md`
**Authorization:** `../governance/EA-WEB-001.md`

> **The website direction is SETTLED: "Modern Heritage with Private Advisory depth."** Selected by the
> founder 2026-08-02. **Do not re-present A/B/C. Do not re-ask for a direction.**

---

## 1 · Approved direction

**Modern Heritage with Private Advisory depth** — Direction C blended with Direction B.

| Element | Binding |
|---|---|
| Logo | the **real** approved mark, never a typed wordmark substitute where the mark can be used |
| Colour | navy and ivory layering, **restrained** bronze |
| Motif | **branching decision-path line system** — **maximum two major placements per page** |
| Depth | premium private-advisory depth via surface and colour blocking, **never shadow** |
| Confidentiality | a **central trust element**, given the strongest treatment on the page |
| Founder | a **reserved** section, visible once approved biography content exists |
| Mobile | **VYNE identity visible at every width** |
| Templates | reusable interior-page templates that expand into the AEO architecture |

**Not this:** software-company aesthetics · generic stock finance imagery · excessive gold · literal
vines, leaves or foliage · competitor imitation · a beautiful report with no identity.

## 2 · Authorization and gates

**EA-WEB-001** — separate and narrow. **EA-001 is not amended.**

**Permitted:** Next.js App Router · static export · `apps/site` · `@vyne/ui` tokens · typed
`content/copy.ts` · one-page structure · thin Privacy/Terms placeholders · `mailto:` CTA · no imagery in
v1.

**Prohibited:** hosting · domain · analytics · database · authentication · production form submission ·
data collection · third-party embeds · **publication before counsel review.**

## 3 · Approved copy — do not alter without founder ruling

Copy lives in `apps/site/content/copy.ts`. Founder-approved 2026-08-02 with a polish pass the same day.

**Settled wordings that must not drift:**

| Element | Binding |
|---|---|
| Hero | *"Before you decide where to go, decide whether moving is the right answer."* |
| Self-description | *"a confidential consulting firm"* — **never "decision advisory"** |
| Who we serve | *"VYNE is best suited for advisors who want to understand the decision before pursuing a transaction."* — the earlier "probably not for you" paragraph is **removed** |
| Diagnostic | *"Sometimes a 'should I move?' question turns out to be something else…"* |
| Conclusion | *"Sometimes the right conclusion is to stay, wait, or address the problem where you are."* |
| Outcomes | *"…legitimate outcomes **may include**:"* — never a claim VYNE has already reached each |
| Confidentiality | *"VYNE will not contact a firm about you, disclose your identity, or share your information without your explicit written authorization naming that specific firm."* |
| Intro call | *"nothing shared with a firm or outside party without your permission"* — **not** "with anyone" |
| Client data | *"client-identifying information"* — **not** "client information" |
| Compensation | approved two-paragraph disclosure: states the arrangement, **names the potential conflict**, describes the controls |
| Footer | `© 2026 VYNE Strategies. All rights reserved.` — **no entity type** until formation |

**Prohibited on every surface:** unbiased · neutral · conflict-free · compensation-neutral · unqualified
objective · *"plays no part"* · *"more honest"* framing · comparisons to what advisors hear elsewhere ·
unnamed criticism of competitors · the founder-restricted fee range · controlled internal methodology ·
calculator formulas · exclamation marks.

## 4 · Current implementation

| | |
|---|---|
| Location | `apps/site/` · runs at `localhost:3002` |
| Structure | one page · 9 sections · Privacy + Terms placeholders |
| Section order | hero → who we serve → questions → first decision → **process (navy)** → outcomes → **confidentiality (navy)** → compensation → *founder (reserved)* → **contact (navy)** → footer |
| Logo | masthead 64px · footer 56px · white plate |
| Motif | hero + confidentiality · **exactly 2** |
| Mobile nav | CSS-only `<details>`, no JavaScript |
| SEO/AEO | semantic headings · Organization + FAQPage JSON-LD · metadata · OG · sitemap · robots |

## 5 · Interior-page template

The two-column editorial grid — sticky label rail + body — is the reusable interior template. Every
future page inherits: masthead with logo plate and navy band · label rail · `h1` · bronze rule · body at
70ch · optional navy statement block · footer. **Motif budget stays at two per page.**

## 6 · Sequence — do not reorder

```
1 · recover and productionize the brand system     ← in progress (asset register)
2 · redesign the premium homepage                  ← in progress
3 · reusable branded interior-page templates       ← grid established, pages not built
4 · formal AEO architecture and question clusters  ← NOT STARTED
5 · source-backed content production and cadence   ← NOT STARTED
```

**The current site has technical SEO/AEO hygiene only. It is not an AEO architecture and must never be
described as one.**

## 7 · External historical references — exist, not imported

🌐 **VYNE Website Product Requirements and Wireframes** · 🌐 **VYNE Website Copy Deck and Messaging
System** → `docs/website/references/`

**Completed founder-approved work held outside the repository.** **Do not block on them.** On import,
reconcile against §3 and record any conflict as a founder decision rather than silently overwriting.

## 8 · Pre-publication gates

```
 ☐ Counsel review — website copy (CP-2026-01 Addendum A), Privacy, Terms, compensation language
 ☐ Real contact mailbox — hello@vynestrategies.com is a LOCAL PLACEHOLDER
 ☐ Favicon and Open Graph assets (P-5, P-7)
 ☐ Reversed logo if any navy surface is to carry the mark (P-2)
 ☐ Entity formation before any entity type is named (LR-2026-001)
 ☐ Trademark clearance (LR-2026-005)
 ☐ Founder biography if the founder section is to be visible
 ☐ Hosting and domain decisions — require their own authorization
```
