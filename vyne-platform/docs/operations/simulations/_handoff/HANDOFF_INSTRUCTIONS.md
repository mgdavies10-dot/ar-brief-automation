```
INTERNAL — CONTROLLER USE
```

# Consultant Session Handoff — instructions

**Case 1 · Checkpoint A** · **Date:** 2026-08-01

> ## The containment problem — verified, not theoretical
> **A Claude Code session opened at this repository root can read
> `SIMULATION_CASE_PACKETS.md`, which contains every hidden fact, release schedule, intended stress test,
> and expected outcome for all five cases.**
>
> **Repository-based containment is not achievable.** There is no permission setting that makes the answer
> key unreadable to a session with filesystem access to the repo. **The Consultant must run in a separate
> workspace.**

---

## 1 · Create the clean Consultant workspace

**Outside this repository.** For example:

```bash
mkdir -p ~/vyne-consultant-sim/case1
```

> **Do not create it inside `ar-brief-automation/`.** A session started there can traverse to the
> controller files regardless of where its working directory is set.

## 2 · Copy exactly these files into it

```bash
SRC=~/Documents/ar-brief-automation/vyne-platform/docs
DST=~/vyne-consultant-sim/case1
HO="$SRC/operations/simulations/_handoff"

cp "$HO/CASE1_CONSULTANT_LAUNCH_PACKAGE.md"                    "$DST/"
cp "$HO/CONSULTANT_OPERATING_PRINCIPLES.md"                    "$DST/"
cp "$SRC/operations/ADVISOR_ORIENTATION.md"                    "$DST/"
cp "$SRC/operations/ORIENTATION_REVIEW_AND_ENTRY_DECISION.md"  "$DST/"
cp "$SRC/operations/ENGAGEMENT_RECORD_STANDARDS.md"            "$DST/"
cp "$SRC/foundation/THE_VYNE_CONSTITUTION.md"                  "$DST/"
cp "$SRC/experience/ADVISOR_DECISION_ONTOLOGY.md"              "$DST/"
```

**Seven files. Nothing else.**

> ### `BUSINESS_MODEL_AND_COMMERCIAL_PRINCIPLES.md` is NOT copied — founder decision, 2026-08-01
> **Not the original, and not a redacted version of it.** §10 carries the founder-restricted fee range,
> and a redacted copy can still leak through missed text, comments, version history, metadata, or a later
> edit that reinstates the section.
>
> **It is replaced by `CONSULTANT_OPERATING_PRINCIPLES.md`** — a clean derivative **written from approved
> doctrine**, not produced by deleting a section. It carries the approved disclosure paragraph and nothing
> about fee economics.
>
> **The access principle: the Consultant receives what is necessary to do the work — not the entire VYNE
> doctrine merely because it exists.**

## 2a · Sanitize the copies — required

**`ADVISOR_DECISION_ONTOLOGY.md` contains a live relative pointer to the restricted commercial
document.** It must be neutralized **in the copy** — the repository original is frozen and is not edited.

```bash
cd "$DST"
sed -i 's|(see `\.\./commercial/BUSINESS_MODEL_AND_COMMERCIAL_PRINCIPLES\.md`)|(see the Consultant Operating Principles)|' ADVISOR_DECISION_ONTOLOGY.md
grep -n "commercial/" ADVISOR_DECISION_ONTOLOGY.md   # expect: no output
```

**Then confirm no copy contains a path back to the controller:**

```bash
grep -rnE '\.\./|ar-brief-automation|vyne-platform' "$DST"   # expect: no output
```

> **Why this matters:** a relative path is a signpost. Even where it does not resolve, it tells the
> Consultant that a commercial document exists and names it — which is exactly the pointer this handoff
> is designed to remove.

## 3 · What must NOT be copied

`SIMULATION_CASE_PACKETS.md` · `SIMULATION_SETUP.md` · `SIMULATION_PHASE_CHARTER.md` · any review-notes
file · any artifact not listed above · **anything under `_handoff/` other than the launch package
itself** — including this file.

## 4 · Launch

Open a **new Claude Code session** with working directory `~/vyne-consultant-sim/case1`, and give it:

> *"Read `CASE1_CONSULTANT_LAUNCH_PACKAGE.md` and follow it. Everything you need is in this folder."*

**Say nothing about:** simulation · testing · hidden facts · expected outcomes · the Gate · the other four
cases · that this is Case 1 of five · or that the advisor is synthetic.

*The Consultant should behave as though this is a real prospective advisor, because that is the only way
its output tells you anything.*

## 5 · What comes back to the Controller

The completed entry record · the short report · the time log. **Paste those into the Controller thread**
— they become the raw material for **Founder Checkpoint A**.

## 6 · Then stop

**The Controller assembles Checkpoint A and stops.** The L1 Assessment does not begin until the founder
reviews and approves the framing.

---

## Contamination check before launch

```
 ☐ Consultant workspace is OUTSIDE the controller repository
 ☐ Exactly the seven listed files are present — and BUSINESS_MODEL_AND_
   COMMERCIAL_PRINCIPLES.md is NOT among them, in any form
 ☐ CONSULTANT_OPERATING_PRINCIPLES.md is present in its place
 ☐ Ontology copy sanitized — grep for "commercial/" returns nothing
 ☐ grep -rnE '\.\./|ar-brief-automation|vyne-platform' returns nothing
 ☐ No .git directory, no symlinks, no hidden files copied
     verify:  ls -la "$DST"   and   find "$DST" -type l
 ☐ No simulation, charter, setup, packet, or review-notes file is present
 ☐ No fee percentage, range, amount, step-up, clawback, or payment term anywhere
     verify:  grep -rniE '8%|16%|T12|TTMP|step-up|clawback' "$DST"
 ☐ The launch prompt contains no reference to testing, hidden facts, or expected outcomes
 ☐ The Controller thread is not being used to produce the assessment
```

### Note on Gate references — reviewed, acceptable

The Entry Decision record and the Engagement Record Standards both mention the **Higher-Conflict Decision
Gate** — the entry record asks whether one is *likely to trigger later*, and the standards list it as an
issuance control.

**These are legitimate doctrine, not simulation leakage.** The Consultant should know a conflict gate
exists downstream; that is part of working at VYNE. **It reveals nothing about Case 1's design, and
nothing about the Case 4 stress test.** No action required.
