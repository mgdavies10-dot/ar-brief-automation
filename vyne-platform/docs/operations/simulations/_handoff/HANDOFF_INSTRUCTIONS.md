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

cp "$SRC/operations/simulations/_handoff/CASE1_CONSULTANT_LAUNCH_PACKAGE.md" "$DST/"
cp "$SRC/operations/ADVISOR_ORIENTATION.md"                    "$DST/"
cp "$SRC/operations/ORIENTATION_REVIEW_AND_ENTRY_DECISION.md"  "$DST/"
cp "$SRC/operations/ENGAGEMENT_RECORD_STANDARDS.md"            "$DST/"
cp "$SRC/foundation/THE_VYNE_CONSTITUTION.md"                  "$DST/"
cp "$SRC/experience/ADVISOR_DECISION_ONTOLOGY.md"              "$DST/"
cp "$SRC/commercial/BUSINESS_MODEL_AND_COMMERCIAL_PRINCIPLES.md" "$DST/"
```

**Seven files. Nothing else.**

> ⚠ **`BUSINESS_MODEL_AND_COMMERCIAL_PRINCIPLES.md` contains §10 — the founder-restricted fee range.**
> The Consultant does not need it and should not have it. **Either redact §10 from the copy, or omit the
> file entirely** and instead give the Consultant only the approved disclosure paragraph. *Recommend
> redacting §10 — the rest of the document is genuinely useful for entry-stage conduct.*

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
 ☐ Exactly the seven listed files are present
 ☐ §10 of the Commercial Principles copy is redacted (or the file omitted)
 ☐ No simulation, charter, setup, packet, or review-notes file is present
 ☐ The launch prompt contains no reference to testing, hidden facts, or expected outcomes
 ☐ The Controller thread is not being used to produce the assessment
```
