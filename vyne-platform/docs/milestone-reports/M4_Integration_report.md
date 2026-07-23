# M4 Integration — the consulting-quality review

**Status:** for founder gate review · **Date:** 2026-07-22
**Purpose (founder):** not another feature — *proof that Twin → Our Perspective →
Current Reality Record behaves like one coherent consulting experience.* Read the
whole thing end-to-end and improve it before adding capability.

## The golden path (Robert Halvorsen)

One canonical synthetic advisor, walkable in a single sitting. Reproduce it:

```powershell
cd vyne-platform/packages/db
npm run provision            # demo users (founder / recruiter / advisor)
npm run seed:golden-path     # Robert's full arc, idempotent
```

This seeds Robert with a **complete Current Reality** (the twin), a **primary
decision carrying Our Perspective** (supported independence), and a **Record in
review** — a second-person letter whose cooling period is already cleared, so the
founder can approve it live and see authorship land. `demo.founder@synthetic.vyne.test`.

## The three journeys

**Advisor journey** (what they ultimately receive; Studio is M5). Their practice
is captured with more clarity than they hold themselves → a careful, hedged
perspective forms → they receive a *letter* that is unmistakably about them. The
felt arc: *understood → carefully considered → given real judgment.*

**Recruiter journey.** Create the advisor → capture Current Reality as a
conversation, not a form (per-dimension confidence, "what we still need to learn")
→ frame the decision in plain language → shape Our Perspective **only when the
understanding is earned** → *Draft from the twin* → edit every word → write the
one movement we never auto-fill ("Where we'd focus next") → submit for review.

**Founder journey.** Open Robert → read the twin, the perspective, the Record in
review → **Approve** (cooling already cleared) — or, if it were still cooling,
meet *"Available after cooling period — tomorrow"* and override only with a logged
reason → the approved letter shows **"Our perspective as of July 2026"** and full
**authorship** (prepared / submitted / approved).

## Consulting-quality review — the six lenses

1. **Narrative continuity — pass, after one fix.** Overview → Direction → Record
   now reads as one conversation. The break: the Overview still carried a
   **"% understood" gauge**, reintroducing the very number the philosophy rejected.
   Fixed (see improvements).
2. **Consulting voice — pass, after one fix.** Read aloud, the Record sounded like
   software in two places: it addressed *"Dear Robert,"* then spoke *about* him in
   the third person, and it spliced goal phrases ungrammatically. Both fixed.
3. **Eliminate duplicate thinking — pass.** The Record's opening once restated the
   Overview summary verbatim; the composer now writes a **fresh** second-person
   reflection, and the five movements each advance (describe → prioritize → judge →
   qualify → point forward) rather than echo.
4. **Human-judgment audit — pass.** Every generated line was checked against
   "would a thoughtful consultant write this?" The one place it overstated
   certainty — claiming a "well-rounded understanding" while a non-solicit was only
   *assumed* — now honestly offers to *confirm* what we're assuming.
5. **Emotional journey — pass, after the gauge fix.** Current Reality → *"they
   genuinely understand my practice"*; Our Perspective → *"they're thinking
   carefully about my situation"*; the Record → *"someone invested real judgment
   into this."* The gauge was the one thing pulling stage 1 toward *"they scored
   me"*; removing it restores the intended feeling.
6. **One-hour rule — pass.** A traditional recruiter spends the hour pitching
   firms. VYNE spends it understanding the practice, forming a careful view, and
   handing over a letter that is about the advisor, not the sender. That is clearly
   the more valuable hour — which is the whole point.

## Three things I improved after reading it end-to-end

1. **The Record now speaks *to* the advisor.** Composer rewritten to second person
   throughout ("You've built…", "For you, the priorities are clear…"), and it no
   longer restates the Overview — the letter has its own voice.
2. **It stays honest about what it only assumes.** The Conviction Engine now
   distinguishes *unknown* from *assumed*; "What we'd like to understand further"
   offers to **confirm** working reads (e.g. an unreviewed non-solicit), not just
   fill blanks. Understanding before recommendation, made literal.
3. **The last gauge is gone.** The Overview's "% understood" meter is now calm
   language ("We understand Robert's practice deeply"). No number anywhere scores
   the advisor — the platform is consistent end-to-end.

## Three things I intentionally did *not* build yet — and why

1. **Publishing to the advisor (Studio).** The Record stops at Approved on
   purpose; crossing the boundary to the advisor is **M5**, with its own snapshot,
   residue scan, and gold moment. Building it now would blur the milestone.
2. **Three-axis confidence + evidence-per-dimension.** The twin is *architected*
   for coverage/confidence/freshness and per-assertion evidence, but building them
   now would add surface without deepening the core loop — the twin must get
   *smarter, not larger.*
3. **Modeling & Firm Intelligence.** Horizon B, behind a new engineering
   authorization. They compound the twin's value later; pulling them in now would
   trade the product's identity for feature breadth.

## The question, answered in writing

**Why would an advisor remember this experience six months later?**

Not because the software was good. Because, for the first time in a process full
of people who wanted something from them, **someone reflected their own practice
back to them more clearly than they'd ever seen it, was honest about what they
didn't yet know, and offered a considered view without pushing.** They'll remember
a *sentence* — the one that named what they'd been feeling about their firm — not
a screen. They felt understood. That is the product.

## Verification (honest accounting)

- `@vyne/domain` typecheck + **17/17** (second-person composer; cooling; conviction
  incl. `toConfirm`). `@vyne/os` typecheck **0 errors**. Real-stack DB **60/60**
  (last run before the golden-path seed; no schema change since). Golden-path seed
  runs clean and idempotent; artifact lands `in_review`, authored by the recruiter,
  cooling cleared.
- **Not done here:** the authenticated in-browser believability pass end-to-end —
  that is the founder's gate step (the MFA ceremony makes it yours). Everything up
  to it is seeded and verified; the walk is ready.

## To close M4

Founder walks the golden path once and confirms the emotional arc lands. If it
does, M4 closes here — a stable consulting workflow, a polished experience, a
clean stop before M5 introduces advisor-facing publishing.
