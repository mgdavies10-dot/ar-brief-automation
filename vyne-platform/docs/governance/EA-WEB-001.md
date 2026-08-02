# EA-WEB-001 — VYNE Minimum Public Website

**Type:** Engineering Authorization · **Status:** **APPROVED** (founder, 2026-08-02)
**Scope owner:** Founder · **Implementer:** VYNE Lead Engineer
**Relationship to EA-001:** **separate and parallel. EA-001 is NOT amended.**

---

## 1 · Why this is a separate authorization

EA-001 authorizes the advisor-platform vertical slice and **explicitly excludes the public website**.

The founder ruled that the website is **a distinct surface with different users, different legal risks,
and different deployment decisions** from the advisor platform, and that it therefore warrants its own
authorization rather than an amendment that would blur EA-001's boundary.

**Nothing in this authorization relaxes any EA-001 constraint, and nothing in EA-001 authorizes anything
here.**

## 2 · Authorized scope

A **local-only public marketing site** for VYNE Strategies.

**Approved implementation:**

- Next.js App Router · static export · workspace `apps/site`
- `@vyne/ui` tokens only — **no hardcoded hex**
- typed `content/copy.ts` separating copy from components
- one-page structure with anchor navigation
- thin Privacy and Terms placeholders, clearly marked pending counsel
- `mailto:` call to action
- **no imagery in v1**

## 3 · Prohibited under this authorization

```
 ✗ hosting                        ✗ domain configuration
 ✗ analytics of any kind          ✗ database
 ✗ authentication                 ✗ production form submission
 ✗ data collection                ✗ third-party embeds or processors
 ✗ publication before counsel review
```

**Publication is gated.** No public launch until the website copy, the Privacy Notice, the Terms, and the
compensation language have been reviewed by counsel.

## 4 · Content constraints — binding

**Naming.** *VYNE Strategies* is the formal public name — wordmark, metadata, founder section,
disclosures, footer. *VYNE* is used naturally as shorthand in body copy.

**Tagline.** **Omitted.** *"Clarity Before Choice. Conviction Before Action."* remains unconfirmed and is
not used.

**Footer.** Exactly `© 2026 VYNE Strategies. All rights reserved.` **No entity type is described** until
formation and counsel are confirmed (`LR-2026-001`).

**Founder section.** The component and typed content fields are built, but **the section stays hidden**
until founder-approved public biography content is supplied. **Do not infer or publish** current or
former employers · titles · tenure · credentials · licenses · personal biography facts.

**Prohibited claims:**

- **unbiased · neutral · conflict-free · compensation-neutral · objective** (unqualified)
- the **founder-restricted fee range** — percentages, amounts, step-ups, payment timing, clawbacks,
  firm-specific commercial terms
- **calculator formulas** or any modeled numerical output
- **controlled internal methodology** — module names, framework names, internal process detail
- **absolute claims that compensation plays no part** in VYNE's judgment
- **comparisons to what advisors "will hear elsewhere"**, "more honest" framing, or **unnamed criticism
  of competitors**
- copying Diamond Consultants, Bridgemark Strategies, GRN Shoreline, or any competitor's language,
  framework, resource structure, or visual expression
- anything that makes VYNE appear to be a software company, broker-dealer, custodian, operational
  transition vendor, or account-transfer firm

**Required disclosure treatment.** The compensation section states the arrangement, **names the potential
conflict plainly**, and describes the **controls** VYNE applies — separation of compensation from fit
analysis, documented reasoning, and the advisor's decision recorded separately from any recommendation or
authorization. **It does not claim that human judgment is immune from incentives.**

**SEO/AEO.** Semantic structure, metadata, and JSON-LD are permitted as technical hygiene. **This does not
constitute the AEO Architecture**, which remains not started.

## 5 · Accessibility and brand

WCAG 2.1 **AA** minimum · visible focus states · status never by colour alone · Warm Bronze never as
small text on light surfaces (`--vyne-bronze-text` where bronze text is required) · sentence case
throughout except the wordmark · **no exclamation marks** · no shadows, gradients, decorative icons,
illustration, or emoji.

## 6 · Legal review gate

**The completed local website copy is added to counsel packet CP-2026-01 as an addendum before public
launch.** The standing constraint is that **the website must not exceed the claims made in the Advisor
Engagement Understanding.**

**Privacy and Terms pages remain clearly marked as pending counsel.** **No placeholder legal language may
be fabricated that could be mistaken for approved policy.**

## 7 · Stop conditions

Work stops and the founder is consulted on: any conflict with frozen doctrine · any requirement to make a
claim prohibited in §4 · any request to collect advisor data · any hosting, domain, or analytics decision
· any pressure to publish before counsel review.

## 8 · Definition of done for v1

```
 ☐ Site builds and runs locally
 ☐ Every colour comes from @vyne/ui tokens — zero hardcoded hex
 ☐ WCAG AA verified on all text pairings
 ☐ Commercial-residue scan clean — no fee terms
 ☐ Disclosure scan — approved compensation language present and unmodified
 ☐ Controlled-methodology leakage scan clean
 ☐ Prohibited-claims scan clean
 ☐ Founder section present in code, hidden in render
 ☐ Screenshots and complete rendered copy presented to the founder
 ☐ No hosting, domain, analytics, or form submission exists
```

---

**Recorded:** 2026-08-02 · Founder approval on the Launch Sprint direction.
**Related:** EA-001 (advisor platform, unchanged) · CP-2026-01 (counsel packet) · `LR-2026-001` (entity
formation) · `LR-2026-005` (trademark clearance).
