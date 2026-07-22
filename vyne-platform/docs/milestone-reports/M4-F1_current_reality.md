# M4 · Feature F1 — Advisor Workspace + Current Reality authoring

**Status:** PROPOSED (founder product review, before implementation) · **Date:** 2026-07-21
**Scope:** EA-001 M4 core flow (authorized). Grounded in UX Blueprint §5.3.
**Principles advanced:** advisor confidence · reduce transition uncertainty ·
insight unavailable elsewhere · trust before consultation · premium/differentiated.

---

## Advisor Problem

An advisor weighing a transition is holding the most consequential decision of
their career with the worst possible information setup: their book economics,
client dependencies, contractual restrictions, and what they actually *want* are
scattered across their memory, a spreadsheet, and a lot of anxiety. They cannot
see their own situation whole. Every system that touches them — CRMs, recruiter
pipelines — treats them as a "contact" or an "opportunity," never as a person
facing a career-defining choice. No one reflects their reality back to them with
structure and rigor.

## Why It Matters

This is the **foundation of the entire VYNE Method.** Everything downstream —
decision readiness, the recommendation, the published deliverable, the
consultation — depends on a clear, structured capture of the advisor's current
reality. Without it, VYNE is just another recruiter with a database. It's the
first thing to build because nothing else in M4 stands without it, and it is the
single surface most responsible for the moment we're aiming at: *"They understood
my practice better than I did."*

## Alternatives Considered

1. **Free-text notes** (the CRM default) — trivial to build, but produces no
   structure, can't assemble into a deliverable, and never creates understanding.
   *Rejected: the commodity approach; the opposite of differentiated.*
2. **Rigid questionnaire / form wizard** — structured but cold and interrogative;
   yields data, not insight; advisors resist forms. *Rejected: violates calm/
   premium; treats a person like an intake.*
3. **Structured authoring (form-plus-prose) — SELECTED.** Sections that capture
   once and assemble later: Overview · Practice profile · Strengths · Frictions ·
   Findings — each a light structure married to human prose. This is the design
   intent (§5.3: "structured authoring surfaces that feed the Artifact Builder —
   data captured once, assembled later"). It is rigorous *and* human, and it is
   the reusable spine for every artifact that follows.

## Advisor Experience

**Honest framing:** F1 is the *internal* capture surface (OS is internal-only in
EA-001). The advisor experiences its value one step downstream, when the Current
Reality Record is published to them (M5) and in the consultation it enables — so
this feature is judged by the *quality of understanding it makes possible.*

- **What the internal team sees:** an Advisor Workspace that opens with the
  advisor's **name in display serif** — firm · city · T12 band · owner — the same
  typographic dignity as a deliverable title, because the person is the subject.
  A brand-new advisor shows a gentle first-step checklist ("Capture source and
  restrictions → Begin Current Reality"), never an empty dashboard. The **Reality**
  tab is where the practice is captured, section by section, prose flowing beside
  light structure; it saves quietly and reloads exactly as left.
- **What the advisor eventually sees (the payoff):** their own practice reflected
  with a clarity they've never had — strengths named, frictions surfaced, findings
  that read as *true*. 
- **What decision becomes easier:** the fog lifts. They can finally see *what they
  are actually deciding about* before anyone asks them to decide anything.
- **What friction is removed:** they don't assemble their own situation from
  scratch under stress; VYNE did it, rigorously, and hands them clarity.

## Business Value

- **Better advisor decisions & better consultation quality:** the team arrives
  with a structured, accurate picture instead of a sales pitch.
- **Trust before persuasion:** the captured reality (and its deliverable) is
  useful on its own merits; it earns the consultation rather than asking for it.
- **Differentiation:** no competitor captures an advisor's reality as structured,
  reusable understanding — it's methodology expressed as software.
- **Better data & operational leverage:** capture once, assemble many artifacts;
  structured reality compounds across the whole engagement.

## Founder Acceptance Criteria

To approve F1, the following must be true:

1. I can **create an advisor** and open their **Advisor Workspace**; the header
   opens with the person in serif (name · firm · city · T12 band · owner ·
   status), calm and premium — a prepared room, not a form.
2. A brand-new advisor's **Overview** is the gentle first-step checklist, not an
   empty state.
3. The **Reality** tab supports **structured authoring** across the sections
   (Overview · Practice profile · Strengths · Frictions · Findings) with
   form-plus-prose; content **saves and reloads** faithfully; capture friction is
   near zero.
4. The captured data is **structured so it can feed the Artifact Builder** later
   (the data model supports assembly — verified by shape, not just free text).
5. **RLS scoping holds:** a recruiter sees only assigned advisors; unassigned
   never see the record (real-stack test).
6. It is built entirely on the **design system** (tokens, calm motion, one card
   style) and meets **WCAG AA**.
7. It reads as VYNE — sentence case, plain nouns, no exclamation marks, the
   person typeset with dignity.

## Founder-added acceptance criteria (2026-07-21) — binding

8. **The advisor should feel understood** — after Current Reality, it reads as
   *"this accurately reflects my business and what I'm trying to accomplish,"*
   like a trusted consultant summarized them, not like software stored answers.
9. **Save time forever** — anything entered once is never re-entered unless it
   actually changed; Current Reality is the single source of truth downstream.
10. **Advisor-first language** — no internal recruiting terminology anywhere; it
    reads as VYNE helping the advisor make an important business decision.
11. **Recruiter augmentation, not replacement** — the workspace makes recruiters
    materially better but never removes human judgment; the recruiter can always
    add context, observations, recommendations.
12. **Executive quality** — printed and handed to the managing partner of a
    $500M practice, it reads as an executive consulting document, not CRM notes.
13. **Calm experience** — never overwhelming; progressive disclosure, logical
    grouping, whitespace; one topic at a time.
14. **Future-ready data model** — the Current Reality data naturally supports a
    future Modeling Workspace, Firm Intelligence, and AI-generated
    recommendations **without a schema redesign** (do not build them now; just
    don't paint into a corner).

**North star (founder, 2026-07-21):** Current Reality is the advisor's **digital
twin** — one coherent, structured understanding of their practice, goals,
constraints, motivations, and priorities that every future recommendation,
artifact, comparison, and conversation builds from. Getting this foundation
right is what makes the platform feel connected rather than like separate tools.

## Data-model decision (how the digital twin + future-readiness is won)

- `advisors` (existing) stays the **commercial record** (identity, AUM, T12,
  segment/revenue mix, restrictions). Current Reality does **not** duplicate it.
- New `current_reality` (one living record per advisor — the single source of
  truth) holds the **decision-support layer**: narrative `overview`, and
  structured dimensions `practice_profile`, `goals`, `motivations`,
  `constraints`, `strengths`, `frictions`, `findings`, plus `recruiter_notes`.
- Structured dimensions are **JSONB in the DB, typed by zod in `@vyne/domain`** —
  new fields/dimensions (modeling inputs, firm-fit criteria, AI context) extend
  the schema shape **without a migration**. Coherent for reasoning, flexible for
  growth: this is the "no redesign later" guarantee, made concrete.
- Living record (updated in place) — artifacts snapshot it at publish (M5), so
  Current Reality always reflects the *current* truth.

## Architecture / scope notes (for transparency)

- Likely needs **one reviewed migration** (a `current_reality` authoring store
  keyed to advisor, versionable) — a Level-3 schema change landing with rollback
  and RLS, tested on the real stack. Flagged; no existing-table/policy changes
  anticipated.
- F1 delivers the Workspace **header + Overview + Reality tab**; the other §5.3
  tabs (Direction, VYNE's 9, Constraints, Options, Models, Artifacts, Economics,
  Access) are **later features or out of scope** (Models/Economics are excluded).
  This keeps F1 focused — improve the one workflow deeply rather than stub twelve.
