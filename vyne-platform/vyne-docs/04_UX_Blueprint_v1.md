# VYNE Platform — UX Blueprint v1.0

**Derived from:** Architecture v1.2, PRD v1.0, The VYNE Method v1.0 — all approved and unchanged here.
**Method of this document:** to make it usable rather than merely long, the design language, universal states, permission behavior, mobile behavior, and accessibility rules are defined **once** in Parts 1–3 and inherited by every screen. Per-screen specifications then describe purpose, hierarchy, layout, actions, flows, psychology, and any *deviation* from the universal patterns. The eleven highest-consequence screens (five OS, six Studio) are specified at full depth per the approved PRD recommendation; the remainder at implementation-sufficient depth. A screen spec that repeats the same loading-spinner paragraph thirty times is not more complete — it is less readable, and readability is what lets a builder actually follow it.
**No code, HTML, CSS, or React appears in this document.**

---

# PART 1 — DESIGN LANGUAGE

## 1.1 The governing sensation

Every VYNE surface should produce the same feeling: **a prepared room.** Materials laid out before you arrived, nothing extraneous, nothing shouting. The references are a private bank's client floor, an editorial front page, and a well-set table — not a SaaS dashboard. Concretely, this means the platform is built from *documents and judgments*, not widgets and metrics. When in doubt between "make it look like software" and "make it look like a beautifully typeset report that happens to be interactive," choose the report.

## 1.2 Color

- **Ink Navy `#12233F`** — primary text, headers, the OS sidebar, primary buttons. Navy is the voice of the platform.
- **Warm Ivory `#F7F4ED`** — the canvas. All content surfaces are ivory or white; never gray-on-gray SaaS panels.
- **White `#FFFFFF`** — cards and documents sitting on ivory; the one-step elevation.
- **Slate `#425066`** — secondary text, metadata, captions.
- **Forest `#214E3B`** — confirmation, completed states, "published." The color of settled things.
- **Gold `#B48A35`** — the signature. Used for exactly three things: the active-state indicator in navigation, the hairline rule on document covers and section heads, and the "published to advisor" moment. Gold appearing anywhere else is a defect. Budget: if a screen contains more than three gold elements, remove gold until it contains at most one.
- **Functional:** warning amber `#8A672C`, danger `#A54747` — reserved for genuine states (overdue, clawback, destructive confirmation), never decoration.
- **Rule:** no gradients except the single approved subtle navy sidebar treatment; no color-coded category rainbows; status is communicated by *label + one color*, never color alone (accessibility §3.4).

## 1.3 Typography

- **Display serif** (licensed editorial serif per founder decision Q-8; Source Serif 4 as fallback): page titles, document titles, deliverable content headings, Studio headlines. The serif is what makes screens read as *prepared documents*.
- **Inter**: all interface text, labels, tables, forms, navigation.
- **Tabular lining numerals** mandatory in every table, model, and economic figure.
- Scale (desktop): Display 32/40 · Title 24/32 · Section 18/26 · Body 15/24 · Meta 13/18 · Micro 11/16. Line lengths capped at ~72 characters for reading content — deliverables are never full-width text.
- **Voice in the interface:** sentence case everywhere (no ALL-CAPS labels except the wordmark), plain nouns ("Advisors," not "Contacts 360°"), no exclamation marks anywhere in the product, ever.

## 1.4 Space, surface, and structure

- Base unit **8px**; section spacing 32–48px; page gutters 48px desktop. Density is the enemy: when a screen feels full, the answer is progressive disclosure, not smaller type.
- **Cards:** one style only — white surface, 1px hairline border in `#E3E0D8`, 12px radius, *no drop shadows* except overlays (dialogs, popovers). Elevation is communicated by border and spacing, not shadow theater.
- **Tables:** generous 48px row height, hairline row rules only (no zebra striping, no vertical rules), left-aligned text, right-aligned numbers, sticky headers on scroll.
- **The Gold Rule element:** a 1px gold horizontal hairline used beneath document titles and Studio page headers — the brand's physical signature, inherited from the report design system.

## 1.5 Motion

Motion communicates certainty, so there is very little of it: 150–200ms ease-out fades and 8px rises for surface entry; no bounces, no springs, no skeleton shimmer (use calm static placeholders); page transitions are instant. The one choreographed moment in the entire platform: **publication** (§6.5) — a deliberate two-beat confirmation, because publishing is signing your name.

## 1.6 Iconography

A single stroke-style set (1.5px stroke, geometric), used sparingly: navigation, status glyphs, and actions only. No decorative icons, no illustration, no emoji anywhere in the product. Icons never appear without labels except in confirmed-familiar positions (the six OS sidebar items after the label-visible default).

---

# PART 2 — UNIVERSAL PATTERNS (inherited by every screen)

## 2.1 Loading
Static calm: the page frame renders instantly with its title and navigation; content regions show a quiet placeholder line ("Loading advisors…") in slate, replaced without animation-fanfare when data arrives. Never a full-screen spinner; never layout shift on arrival. Anything under 300ms shows no indicator at all.

## 2.2 Empty
Empty states are written in VYNE's voice and always contain (a) what this space is for, (b) the single next action. OS example — empty pipeline: *"No active opportunities. Opportunities appear here when an advisor conversation becomes a potential engagement."* + [Add advisor]. **Studio empty states are anticipation, not absence** (per PRD §7): *"Your firm comparison is in preparation — expected following our next conversation."* No illustrations of empty boxes, no sad-state clip art.

## 2.3 Error
Errors state what happened, what was preserved, and what to do — in plain English, without blame or codes in the primary line: *"This couldn't be saved. Your changes are still on this screen — try again, and contact support if it repeats."* Technical detail collapses behind "details." Destructive or financial actions never fail silently; they fail loudly and log.

## 2.4 Permission behavior
Three tiers, consistently: (1) **invisible** — records outside a user's RLS scope simply do not exist in lists, search, or counts (a recruiter's world contains only their advisors; no locked-row teasers); (2) **visible-disabled** — actions a role can never take within a record they can see (recruiter sees "Approval — founder" as a labeled step, not a grayed button mystery); (3) **unauthorized page** — direct navigation to an out-of-scope route renders a calm full page: *"This area isn't part of your workspace."* No error styling; unauthorized is a fact, not a failure. The UI never *hints at* the existence of hidden data (counts, "and 3 more…"), because hinting is leaking.

## 2.5 Mobile behavior
- **VYNE OS** is desktop-first with a *companion* mobile mode, not parity: Dashboard (read), Tasks (full), Advisors (read + activity capture + meeting notes), and notifications. Complex authoring (artifacts, models, publishing) is desktop-only by design — publishing from a phone contradicts the cooling rule's spirit. Mobile OS navigation: bottom bar with Dashboard · Advisors · Tasks · More.
- **Advisor Studio** is fully responsive and must be *excellent* on mobile — advisors will read deliverables in cars and kitchens. Single column, reading-optimized (16px minimum body, 68-char measure), navigation collapses to a top menu, PDFs open in-app.
- **Public website** mobile-first, obviously.

## 2.6 Accessibility (baseline: WCAG 2.1 AA)
Contrast: navy-on-ivory and all text pairs meet AA (verified in tokens); status never by color alone (label always present); full keyboard operability with visible 2px navy focus rings on ivory / gold rings on navy; semantic landmarks and heading order on every page; all tables with proper headers; forms with persistent labels (no placeholder-as-label), inline error association, and error summaries; dialogs trap focus and return it; motion respects reduced-motion preferences (already minimal); Studio reading views support browser zoom to 200% without loss. Accessibility applies doubly to Studio: the advisor demographic skews 45–65, so type sizes and contrast there are set above minimums, not at them.

## 2.7 Notifications (system-wide philosophy)
The platform is **calm by policy**: no badge counts on navigation, no toasts for background events, no red dots. OS: a single "Attention" section on the Dashboard is the notification center (things surface where they're acted on); email digests optional. Studio: **no in-app notification mechanics at all** — the advisor is notified of new publications by a personally-toned email from VYNE ("I've prepared your firm comparison — it's ready in your Studio"), because notification is part of the service, not the software. Success feedback is quiet inline confirmation ("Saved" in slate, fading), except publication's signature moment.

## 2.8 Search
OS: one global search field (keyboard: `/`) searching advisors, firms, tasks, artifacts, documents — results grouped by type, scoped by RLS automatically (a recruiter searching "Chen" simply finds only their Chens). No fuzzy previews of restricted content. Studio: **no search** — a workspace with seven destinations and curated content doesn't need one, and search implies archive-diving, which contradicts the prepared-room feeling.

---

# PART 3 — COMPONENT LIBRARY

Each component: purpose, anatomy, states, and usage rules.

- **Button.** Variants: Primary (navy fill, ivory text — one per view maximum), Secondary (hairline navy outline), Tertiary (text-only navy), Destructive (danger fill — always paired with confirmation dialog), Publish (the only gold-fill button in the system; appears solely in the publishing workflow). States: default, hover (2% darken), focus ring, disabled (40% opacity + reason in tooltip), working (label → "Saving…", never a spinner-only button). Labels are verbs: "Publish to Sarah Chen," not "Submit."
- **Card.** The single style (§1.4). Anatomy: optional kicker (micro, slate, e.g. "DECISION"), title, body, footer meta. Cards never nest.
- **Document Frame.** The signature component: white surface, generous padding, serif title, gold hairline, byline ("Prepared by VYNE Strategies · March 14, 2026"), reading-measure body. Used for every deliverable in both OS preview and Studio — the pixel-identical frame in both places *is* the "what the advisor sees" guarantee.
- **Status Pill.** Label + subdued tint. Two disjoint vocabularies that must never mix: commercial (Prospect…Hired — OS only, never in Studio) and artifact lifecycle (Draft/In review/Approved/Published/Superseded/Withdrawn). Published is forest; Withdrawn is slate, never red (withdrawal is governance, not failure).
- **Readiness Scorecard.** Eight labeled dimensions, each: Complete (forest check) / In progress (amber half) / Not started (hollow) — with an evidence count and click-through. Never a percentage, never a single score: the Method forbids collapsing readiness into a number.
- **Classification Chip.** On every model input and cited figure: Verified / Advisor-provided / Firm-provided / Estimated / Assumption — micro type, slate, always visible, never hidden behind hover. This chip is the modeling philosophy made visible.
- **Comparison Table.** Options as columns, mandate criteria as rows; each cell = finding + source-and-date footnote marker + confidence; the Stay column always present and visually identical to alternatives (equal width, equal styling — neutrality as layout).
- **Timeline.** Vertical, dated nodes; past = forest, current = navy with gold dot, future = hollow. Used in Studio journey and transition views; in OS activity histories.
- **Evidence List.** Item + status (obtained / requested / overdue) + due date + linked document. The Decision Workspace's engine.
- **Dialog.** Overlay with focus trap; destructive/financial confirmations restate the object plainly: *"Withdraw 'Firm Comparison v2' from Sarah Chen's Studio? She will no longer see it; the record is preserved internally."* Type-to-confirm reserved for the irreversible (user deactivation).
- **Publish Dialog.** The most important composite: left, the exact rendered Document Frame the advisor will see; right, a checklist (correct advisor · version · provenance chips intact · no internal residue · attestation) each requiring an explicit check; then the gold Publish button. Two-beat completion (§6.5).
- **Table.** Per §1.4; row click opens record; bulk actions deliberately absent in v1 (bulk operations on relationships is pipeline-thinking).
- **Form fields.** Persistent top labels; helper text under; currency/percent fields with fixed suffixes and tabular numerals; every consequential field's helper text says *why VYNE collects it* (data-minimization made visible, e.g. "Aggregate band only — VYNE never records client-level information").
- **Empty/Unauthorized/Error blocks.** Standardized per §2.2–2.4.
- **Progress steps.** Horizontal for wizards (artifact creation): numbered, labeled, current in navy; never used to gamify the advisor journey in Studio (the journey is a Timeline, not a progress bar — a progress bar implies the destination is completion; the Timeline implies the destination is a decision).

---

# PART 4 — AUTHENTICATION & NAVIGATION

## 4.1 Sign-in (shared pattern, two skins)
**Purpose:** enter without friction or anxiety. **Layout:** centered card on ivory; VYNE mark; email + password; MFA step when enrolled (internal: required; advisor: offered). No marketing panel, no "welcome back!" exuberance. **Studio skin difference:** beneath the form, one slate line: *"Your workspace is private and prepared for you by VYNE Strategies."* **Errors:** "That email and password don't match" — never revealing which. **States:** reset flow via email link; disabled account renders the calm unauthorized page with a contact line. **Psychology:** the sign-in is the threshold of the prepared room; it should feel like a discreet lobby, not a SaaS gate.

## 4.2 VYNE OS navigation
Fixed left sidebar (260px, navy), the inherited-and-refined v4 structure grouped by verb:
- **OPERATE:** Dashboard · Pipeline · Advisors · Firms · Tasks · Meetings
- **ANALYZE:** Decisions · Models · Research
- **ADMINISTER:** Economics (fees/invoices/commissions) · Reports · Admin
Active item: gold left hairline + white text. Role-scoping: recruiters see Operate + assigned Analyze only; sections outside a role simply don't render (§2.4). Top bar: global search, quick-add (Advisor · Activity · Task), user menu. Breadcrumbs on all record pages ("Advisors / Sarah Chen / Decision").

## 4.3 Advisor Studio navigation
Top horizontal bar (no sidebar — sidebars read as software): the VYNE wordmark left; **Home · Your Journey · Deliverables · Models · Meetings · Tasks · Decision Record** right; user menu. Active: gold underline hairline. On mobile, collapses to wordmark + menu. Seven destinations, zero nesting, nothing configurable. Vocabulary rule enforced at the navigation layer: no OS terminology exists in any Studio string.

---

# PART 5 — VYNE OS SCREENS

## 5.1 Dashboard / Command Center — FULL DEPTH
**Purpose:** answer "what deserves my attention today?" in under sixty seconds. **Users:** founder (full), recruiter (own-scope variant). **Business objective:** zero attention leakage; replace the parallel to-do list.
**Information hierarchy:** (1) Attention, (2) Active decisions, (3) Pipeline movement, (4) Economics glance, (5) Weekly review entry.
**Layout:** Page title "Command Center" with date in serif; then a single-column **Attention** section — not cards-in-a-grid but a typeset list, each line: item · why it surfaced · one action (e.g., *"Evidence overdue — Sarah Chen: deferred-comp statement, due 3 days ago → [Open decision]"*). Ordering is by decision impact per Vol VI, not recency. Below, two columns: left, **Active decisions** — one row per decision: advisor name (serif), decision type, readiness mini-scorecard (eight dots), days since last activity (amber past 14); right, **This week** — pipeline stage changes and publications, then a restrained **Economics** block (expected · invoiced · overdue, three figures, no charts). Footer: "Open weekly operating review →" every day; on the founder's chosen review day it moves to the top of Attention.
**Primary action:** none — the dashboard's action is *departure* to the right place. **Interaction flow:** every line is a single click into the exact record and tab that resolves it.
**States:** empty Attention is the goal state and says so: *"Nothing requires attention. Next scheduled item: weekly review, Friday."* **Permission:** recruiter variant shows only own-scope attention/decisions and **no Economics block at all** (not an empty one — §2.4 tier 1).
**Mobile:** Attention list only, full-width. **Psychology:** most CRMs open on charts to feel impressive; VYNE opens on judgment to *be useful*. Charts admire the past; the attention list changes the day. The absence of KPIs is a designed statement: the founder's job today is not to watch numbers, it is to move decisions.

## 5.2 Pipeline
**Purpose:** commercial reality, visible and honest. **Layout:** toggle Board/Table. Board: stage columns (Prospect → Hired + On Hold/Lost collapsed right), cards showing advisor, T12 band, expected fee, days-in-stage (amber >30), owner initial. **The design's one non-negotiable:** each card carries a readiness mini-dot-row beneath the commercial data — stage and readiness co-displayed, never merged (Vol VI §9). Drag between stages allowed with a confirm ("Move Chen to Submitted? Requires an active permissioned firm option" — structurally blocked if none). Table view adds sorting, stage-change dates, sources. **States:** Lost/On Hold require a reason on entry (select + note). **Permission:** recruiter sees own only; totals row absent for recruiters. **Psychology:** the board is deliberately information-sparse — pipeline is for *flow*, and everything about a person lives in the workspace; keeping the cards thin resists the temptation to work people from a board.

## 5.3 Advisor Workspace — FULL DEPTH
**Purpose:** the complete permissioned picture of one relationship; the center of the product. **Users:** founder; recruiter (assigned). **Business objective:** zero engagement context outside it; "state of this engagement" answerable in under a minute.
**Layout:** Header band (white on ivory): advisor name in display serif, firm · city · T12 band · relationship owner; right, commercial status pill and primary decision state (STAY/…/MOVE hypothesis) — the *only* place both vocabularies appear adjacent, deliberately, because the founder must hold both truths. Below, horizontal tabs: **Overview · Reality · Direction · VYNE's 9 · Constraints · Options · Models · Artifacts · Activity · Documents · Economics · Access.**
**Overview tab hierarchy:** (1) "Where things stand" — a founder-written two-line status (a text field, deliberately human, timestamped; the most-read sentence in the OS), (2) readiness scorecard, (3) next decisive action (linked task), (4) recent activity (5 items), (5) open document requests.
**Tab behaviors worth specifying:** *Reality/Direction/VYNE's 9/Constraints* are structured authoring surfaces — form-plus-prose sections that feed the Artifact Builder (data captured once, assembled later). *Options* lists firm options with permission state prominently first (**"Permission: granted Mar 3 · view note"** in forest, or "No permission — do not contact" in amber); the Add-submission action is disabled-with-reason until permission exists. *Documents* shows the ingestion pattern: every upload dialog contains the mandatory attestation checkbox ("Contains no client PII or client-level records") and a `received_via` select — the §0.2 discipline rendered as unavoidable UI. *Economics* is founder/finance-visible only; for recruiters the tab does not render. *Access* shows exactly which internal users can see this record and what has been published to the advisor — the transparency panel.
**Interaction flow:** quick-log bar persistent at top of Activity ("Log call · note · meeting") — capture friction near zero because uncaptured context is the workspace's failure mode.
**States:** a brand-new advisor's Overview is a gentle checklist ("Capture source and restrictions → Begin Current Reality"), not an empty dashboard. **Permission:** unassigned recruiters never see the record anywhere (tier 1). **Mobile:** Overview + Activity + quick-log only. **Psychology:** the header's serif name is a small deliberate thing — every workspace opens with a *person*, typeset with the same dignity as a deliverable title, because the advisor-centric claim should be visible in the typography.

## 5.4 Decision Workspace — FULL DEPTH
**Purpose:** manage one consequential decision to readiness; the Method's cockpit. **Users:** founder; recruiter (assigned, draft-level).
**Information hierarchy:** (1) decision question, (2) readiness, (3) evidence, (4) options, (5) artifacts trail.
**Layout:** Title: the decision question itself in serif (*"Should the Chen team pursue supported independence?"*) — not "Decision #47"; beneath, decision type + current state pill. Left column (60%): **Readiness Scorecard** expanded — each of eight dimensions opens to its evidence list (item · status · due · linked doc · add-evidence); below it, **Firm options** (comparison-ready cards with permission states). Right column: **Decision log** — a dated narrative of judgment calls ("Mar 12 — ruled out Firm C: fails mandate criterion 2, see comparison v1"), append-only, feeding the eventual Decision Record; below, linked models and artifacts with lifecycle pills.
**Primary action:** contextual to readiness — while gaps exist: "Request evidence"; when green: **"Begin recommendation"** appears (and *only* then — the button's very existence is gated by the scorecard, making Chapter 5's precondition physical). **Secondary:** update state, add option, open model.
**States:** attempting recommendation with red dimensions is impossible rather than warned — the button isn't disabled, it isn't *there*; the space shows "Recommendation unlocks when readiness is complete · 2 dimensions remaining." **Permission:** recruiters see and feed everything but the Begin-recommendation control never renders for them. **Psychology:** this screen is where the platform enforces the Method physically. A founder rushing toward a fee meets not a warning dialog to click through, but an interface in which the premature act has no affordance. Warnings train dismissal; absence trains discipline.

## 5.5 Artifact Builder & Publishing — FULL DEPTH
**Purpose:** produce deliverables from structured data; carry them through the lifecycle; cross the boundary deliberately.
**Layout — Builder:** two panes. Left: **assembly** — the artifact's sections in order (for a Current Reality Record: Overview · Practice profile · Strengths · Frictions · Findings), each section pre-populated from workspace data with edit-in-place prose; an insert control pulls structured items (aggregates, activity findings) as formatted content. Right: **live Document Frame preview** — always the advisor's-eye render. A provenance rail on inserted figures shows classification chips; deleting a chip is impossible (provenance travels with the number).
**Lifecycle bar** across top: Draft → In review → Approved → Published, current stage in navy; each transition is an explicit action with actor + timestamp displayed inline ("Approved by M. — Jul 14, 9:12 AM"). The founder cannot approve within the same session that last edited the draft: the Approve action shows "Available after cooling period — tomorrow" (the Method's cooling rule as product behavior; override exists but requires a logged reason).
**Publish Dialog** (per component spec): full advisor's-eye preview left; right checklist — correct advisor (name restated), version, provenance intact, **no internal residue** (automated scan flags OS vocabulary: "stage," "pipeline," "T12 verified," internal names — flagged words shown highlighted), attestation. All checked → the gold **Publish to [Name]** button activates. **The two-beat moment:** on click, the dialog holds one second — the document frame draws its gold hairline — then confirms: *"Published to Sarah Chen's Studio. She'll be notified by your email, not the system's."* That last line is a designed reminder of the notification philosophy.
**Supersede/Withdraw:** from any published artifact — supersede opens the builder on a new version; withdraw requires the plain-language confirmation and shows where it will disappear from. Withdrawn items remain listed internally with slate pills.
**States:** review-state artifacts lock editing (explicit "Return to draft" to modify). **Permission:** recruiters author through In review; Approved/Publish controls never render for them — the lifecycle bar shows those stages labeled "Founder." **Psychology:** everything about this flow adds *weight* at exactly one point. Drafting is fluid and forgiving; publishing is ceremonial and slightly slow — one deliberate second of friction at the signature moment, because the platform should make the easy things easy and the consequential things *felt*.

## 5.6 Modeling Workspace
**Purpose:** governed scenario economics. **Layout:** per decision: scenario tabs (Stay · Move—Firm A · Independence …); each scenario a two-pane screen — left, **inputs** grouped (Production · Transition terms · Costs · Growth · Taxes-illustrative), every row: label · value · **classification chip (mandatory select on entry)** · source note; right, **results** — multi-year table in tabular numerals + one restrained line chart (the platform's only chart style: single-weight navy lines on ivory, no area fills), sensitivity toggles beneath (the 2–3 driver assumptions rendered as sliders with the result updating live). Version history rail: every saved version immutable, comparable. "Compare scenarios" assembles the Comparison Table across selected versions. **Publish model report** routes through the same Artifact flow — the published report is a snapshot of a named version. **States:** unsourced inputs render the scenario "Draft — cannot be published" with the offending rows listed. **Permission:** recruiter edits assigned models; publication founder-gated as always. **Psychology:** the classification chip's mandatory-ness is the screen's soul; the interface makes it *harder to enter an unlabeled number than a labeled one*, which is the whole modeling philosophy in one interaction.

## 5.7 Firm Intelligence
**Purpose:** governed firm knowledge. **Layout:** firm directory (table: name · channel · agreement status pill · research confidence · restricted flag); firm record tabs: Profile · **Intel** (the core: claims table — claim · source · date · confidence · stale-after · verified-by; add-claim requires source and date, structurally) · Contacts · Agreement (founder/finance) · Submissions history. A **staleness queue** view surfaces claims past stale-after for re-verification. **Restricted firms** carry an amber banner explaining the restriction on every tab. **Psychology:** the add-claim form's refusal to accept sourceless claims is Chapter 6's "every claim has a source and date" as a field constraint — rumors bounce off the form.

## 5.8 Economics (Fees · Invoices · Commissions)
**Purpose:** revenue integrity without spreadsheet archaeology. **Layout:** three tabs. *Fees:* placements table (advisor · firm · verified T12 with evidence-doc link · fee events: earned/step-up/clawback with calculation notes). *Invoices:* the familiar lifecycle (Draft/Sent/Overdue/Paid/Void), aging view, generate-from-fee-event flow producing the branded invoice Document Frame. *Commissions:* per recruiter — plan version applied · gross · status; clawbacks display as linked negative events referencing their origin ("Clawback of FE-2031 — proportional per Plan v2"). A **reconciliation strip** across the top: Earned · Invoiced · Collected · Commissions payable — four figures that must tie, with a discrepancy flag if they don't. **Permission:** founder + finance; recruiters reach *own commissions only* through their own dashboard, never this module. **Psychology:** calculation notes on every fee event make the math auditable at a glance — the anti-dispute design.

## 5.9 Tasks · 5.10 Meetings · 5.11 Research (pattern depth)
*Tasks:* single list, grouped Today/Overdue/Upcoming, each task showing its linked record and owner; overdue ordered by decision impact (inherits the decision's weight, not just age); complete-with-evidence field on consequential tasks; advisor-visible tasks marked with a small Studio glyph and routed through publication-lite (founder confirm). *Meetings:* per-meeting screen with Agenda · Internal notes · **Advisor summary (separate draft surface)** — the two-document separation as two visibly distinct panes, the summary pane styled in the Document Frame; "Draft summary" action within 48h surfaces on the dashboard if skipped. *Research:* review queue of proposed intel claims (human now, AI later) — approve-with-confidence / reject; nothing exits the queue unrated.

## 5.12 Reports · 5.13 Admin · 5.14 Settings (pattern depth)
*Reports:* the four operating reviews (weekly/monthly-commercial/monthly-finance/quarterly) as generated read-views in Document Frame styling, printable; no report-builder in v1 (custom reporting is pipeline-thinking until volume demands it). *Admin:* users table (role · status · MFA · last login), invite flow, deactivate with type-to-confirm and the note "Access ends immediately, including open sessions"; audit viewer — filterable event table, read-only, founder-only, exportable with logging. *Settings:* profile, MFA enrollment, email digest preferences, commission-plan management (founder: versioned plans, effective-dated, never editable retroactively — new version only).

---

# PART 6 — RECRUITER EXPERIENCE

Not a separate design — a **scoped inheritance**, which is itself the design statement: recruiters use the same beautiful tools on their slice of the world. Differences, exhaustively: sidebar shows Operate + Decisions/Models (assigned); Dashboard variant = own attention + own decisions + **own commissions block** (their one economics view: plan version, YTD, pending, paid — full transparency about *their* money, zero visibility of anyone else's or of firm fees); Advisor records limited to assigned (tier-1 invisibility elsewhere); artifact lifecycle shows Founder-labeled stages they cannot perform; no Economics, Reports, Admin, or Research-approval surfaces; lead entry auto-assigns with timestamp and shows the ownership-claim state plainly ("Claim recorded Jul 17, 2:14 PM — pending confirmation"). **Psychology:** the recruiter experience is designed to make the ownership and commission systems feel *transparent rather than surveilled* — everything about their own work is visible to them; nothing about others' is; and the interface never rubs the asymmetry in (no locked doors, just a smaller, complete house).

---

# PART 7 — ADVISOR STUDIO (all six screens, full depth)

**Global Studio rules:** ivory canvas; serif-led; reading measures; no pills from the commercial vocabulary; no counts, badges, or engagement mechanics; every screen opens with a sentence of context in VYNE's voice; footer on every page: *"Prepared privately for [Name] by VYNE Strategies · Confidential."* The footer line is load-bearing: it restates, on every screen, whose room this is.

## 7.1 Home
**Purpose:** orient in ten seconds; feel anticipated. **Hierarchy:** (1) greeting + where-things-stand, (2) newest deliverable, (3) next milestone, (4) open tasks. **Layout:** *"Good morning, Sarah."* in display serif; beneath, a two-sentence status written by VYNE (published from the workspace status field — human words, not generated): *"We've completed the analysis of your current practice and are preparing the firm comparison. We'll review it together on the 24th."* Then one featured Document Frame card (latest publication), a slim "Next: Firm comparison review — March 24" line, and open tasks (max 3 shown). **States:** pre-first-publication home is pure anticipation: *"Your workspace is being prepared following our first conversation."* **Psychology:** the founder-authored status sentence is the screen's heart — software that opens with a human's sentence about *you* reads as service; software that opens with your own data reads as a mirror. **Mobile:** identical, stacked.

## 7.2 Your Journey
**Purpose:** always answer "where am I, and what happens next?" **Layout:** the Timeline component, full page: phases as VYNE-voice milestones ("Understanding your practice" · "Defining what's next" · "Evaluating your options" · "Your decision" · "Making it happen") — *not* the internal phase names; each past node links its published deliverables; the current node carries a sentence of what's happening now; future nodes are un-dated unless truly scheduled (no speculative deadlines — a missed promised date damages more than an absent one). **Psychology:** a timeline, not a progress bar (per component rules): the journey's end is a good decision, not "100%."

## 7.3 Deliverables
**Purpose:** the library of prepared work. **Layout:** a typeset list (not a card grid, not a file table): each entry — serif title, one-line VYNE description ("A portrait of your practice as it stands today"), prepared date; newest first; superseded versions collapse under the current one ("Earlier version — March 2"). **Reader view:** the Document Frame full-bleed, reading measure, sticky minimal header (title + Download PDF); no comments, no reactions, no read-tracking shown. **States:** per anticipation rule. **Mobile:** the reader is the most-polished mobile surface in the platform — this is where the advisor's spouse reads the Decision Record on a Sunday.

## 7.4 Models
**Purpose:** the economics, honestly presented. **Layout:** published model reports as deliverable entries; the reader adds one interactive element — the **published sensitivity view**: the 2–3 driver assumptions as read-only labeled ranges showing outcome bands (*"If asset retention lands between 85–95%, year-five totals range $X–$Y"*). No editable inputs (v1 boundary); every figure carries its classification chip, translated to advisor language ("Provided by the firm — not independently verified"). **Psychology:** showing the advisor the *labels on the numbers* is the neutrality claim at its most concrete — no recruiter's spreadsheet ever told them which numbers were marketing.

## 7.5 Meetings & 7.6 Tasks
*Meetings:* published summaries as a dated list; each in the Frame; upcoming meetings shown with agenda when VYNE has published one. *Tasks:* the advisor's short list, VYNE-assigned, each with context ("Request your deferred-comp statement from HR — this completes the picture for your economics"); the one interactive control in Studio: **Mark done** (with an optional note back — which arrives as an activity in the OS, not a "message"). Completing a task confirms quietly: *"Thank you — noted."* **Psychology:** tasks are phrased as *joint work on their decision*, never homework; the "why" clause on every task is mandatory copy.

## 7.7 Decision Record (destination)
When published, the navigation's final item holds the capstone in the Frame — with a distinct cover treatment (the gold hairline doubled) marking it as the engagement's signature document. Before publication the destination shows the anticipation state referencing the journey. After an engagement concludes: Studio persists read-only per the retention decision, and the Home status line changes to the standing close: *"Your engagement record is preserved here. We're a call away."*

---

# PART 8 — PUBLIC WEBSITE (pattern depth)

**Purpose:** convert private research into trusted first contact; the front door of the prepared room. **Design:** the same language, more editorial — large serif headlines, long-form reading measures, restrained navy/ivory, gold only in rules; photography per brand direction (architecture, texture, light — never handshakes or skylines); **no pop-ups, no chat widgets, no exit-intent mechanics, no cookie-consent dark patterns** (decline-by-default styling equal to accept). Pages: Home (one claim, stated once: the decision-quality positioning; one CTA: "Begin a confidential conversation"); Method (the public layer only — the four disciplines and the nine questions *named*, never the internal logic); Services (ROOT/BRANCH/GROW in advisor language); Insights (the AEO article template: question-as-title, direct answer in the first hundred words, structured depth after — the template *is* the AEO strategy); About/Founder; Contact (the inquiry form asks four things only — name, firm type, what's prompting the conversation, preferred contact — data minimization from the first touch, stated: *"We ask for very little here deliberately."*); Login → Studio. **Psychology:** every recruiting site screams; this one is confident enough to be quiet. The restraint is the differentiation, visible before a word is read.

---

# PART 9 — USER FLOWS (end-to-end)

**9.1 New advisor (inquiry → workspace).** Inquiry form → unassigned queue on founder Dashboard-Attention → open → create advisor (source/timestamp auto; restrictions field front-and-center in the creation form — the design insists on restrictions before enthusiasm) → assign owner (self or recruiter) → workspace opens on the new-advisor checklist.
**9.2 Discovery → Current Reality.** Log first call (quick-log) → open decision (type hypothesis) → Reality tab authoring across conversations → document requests logged (fulfilled by email; ingestion dialog with attestation) → Artifact Builder assembles the Record → cooling period → approve → Publish Dialog → gold moment → founder sends the personal email → advisor's first Studio sign-in lands on Home with the Record featured.
**9.3 Publishing (universal).** Draft → In review → (cooling) → Approved → Publish Dialog (preview + checklist + residue scan) → published snapshot → supersede/withdraw as governed. Every transition logged and displayed inline.
**9.4 Advisor review.** Notification by personal email → Studio → reads in the Frame → optionally completes a related task with a note → note surfaces as OS activity → discussed in the next meeting (the platform deliberately provides no reply channel: conversation belongs in conversations).
**9.5 Recommendation.** Scorecard reaches green → "Begin recommendation" appears in Decision Workspace → founder writes the internal mirror-test artifact (a required pre-step in the recommendation builder: a titled section "The strongest case for the alternative" that must be non-empty before draft can advance — Chapter 5 rendered as a form constraint) → recommendation drafted → cooling → approved → discussed live with the advisor *before or alongside* publication (the Publish Dialog for recommendations adds one checklist line: "Discussed with advisor in person/call") → published.
**9.6 Decision → Transition.** Decision Record built from the decision log → published with the doubled-gold cover → transition timeline published → tasks flow (OS assigns; Studio displays) → placement recorded on start (Economics) → Studio Home status shifts to steady-presence tone through the anxious weeks.
**9.7 Payment.** Placement → verified T12 entry (evidence doc required by the form) → fee event (calculation note auto-drafted from agreement terms, editable) → invoice generated in the branded Frame → sent (outside or via email integration later) → status tracked → paid → reconciliation strip ties.
**9.8 Recruiter commission.** Fee event → plan version applies → commission row (pending) → payable on collection per plan → recruiter's dashboard block updates → clawback events, when they occur, appear with full lineage. The recruiter never asks "how was this calculated?" because the row answers it.
**9.9 Stay decision.** Identical flow to 9.5–9.6 minus transition: full-quality Decision Record, follow-up review scheduled (a future-dated task the Dashboard will resurface), Studio persists. The flow's *identicalness* is deliberate and specified: any shortcut that exists only for stay-paths would be the neutrality claim failing in the interaction layer.

---

# PART 10 — FINAL CHAPTER

## Design principles (the ten that govern disputes)
1. A prepared room, not a control panel. 2. Documents and judgments, not widgets and metrics. 3. The consequential gets friction; the routine gets none. 4. Absence over disablement; disablement over warning; warning over error. 5. Two vocabularies, never mixed (commercial ≠ decision ≠ Studio). 6. Provenance is visible everywhere a number is. 7. Calm is a feature: no badges, no urgency mechanics, anywhere. 8. The advisor's experience is identical in preview and in Studio — one Frame. 9. Gold is spent, not decorated with. 10. When a design choice and a Method principle conflict, the Method wins and the design was wrong.

## UX risks
1. **Calm read as empty.** The restraint could feel underpowered to a founder used to dense CRMs — the mitigation is the Attention list's *quality*: if it reliably surfaces the right five things, sparseness reads as confidence; if it misses one thing, sparseness reads as blindness. The Attention algorithm is therefore a UX-critical component, not a backend detail.
2. **The cooling rule and readiness gates will chafe** in real time-pressured moments; overrides exist and are logged, but if overriding becomes routine the interface has lost the argument — track override frequency as a product-health metric.
3. **The founder-written Studio status line** is the best thing in Studio and the easiest to neglect; a stale status ("We're preparing…" for three weeks) actively damages the anticipation posture. Surface staleness on the OS dashboard (status older than 14 days on an active engagement → Attention).
4. **Serif rendering quality** varies by platform; the premium feel dies with bad font delivery — treat font licensing/delivery (Q-8) as a launch blocker, not polish.
5. **Advisor mobile reading** is the highest-stakes rendering path (the spouse-on-Sunday scenario); test the Frame on small devices before anything else in Studio.

## Things to avoid (standing list)
Dashboards that admire the past; percentage-complete anywhere near a human decision; toasts, badges, streaks, confetti; skeleton shimmer; hover-revealed critical information; bulk operations on relationships; "AI-powered" as visible copy anywhere in the product; empty-state illustrations; more than one primary button per view; any Studio string containing pipeline vocabulary; any gold beyond the budget.

## Recommendations before visual design begins
1. **Resolve Q-8 (serif) and Q-9 (vector logo) first** — the design language's two physical dependencies.
2. **Prototype the Document Frame before any screen** — it appears in the Builder, the Publish Dialog, Studio, and PDFs; it is the system's atom, and if it's right, half the product inherits rightness.
3. **Design the Attention list's ranking rules with the founder in a working session** — it encodes judgment that only the founder currently has.
4. **Write the Studio copy deck as a design artifact** (every status line, empty state, task template, and email) — in Studio, the words *are* the interface, and lorem ipsum would falsify every review.
5. **Test Studio vocabulary with the first three real advisors** before hard-coding navigation labels (open PRD question 4 — "VYNE's 9" as a visible brand vs. quiet integration).
6. **Then build the vertical slice against this blueprint** — the slice exercises the Frame, the lifecycle, the Publish Dialog, and Studio Home, which are exactly the surfaces this document specifies at fullest depth. That is not a coincidence; it is the build order and the design order agreeing about what matters most.

---

*End of UX Blueprint v1.0. No code, markup, or visual mockups produced, per instruction. Awaiting founder review; the two blocking dependencies for visual design are Q-8 and Q-9.*
