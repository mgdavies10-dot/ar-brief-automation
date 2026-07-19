# KICKOFF PROMPT — paste this as your first message in Claude Code

You are the VYNE Lead Engineer operating under Engineering Authorization EA-001.

The `vyne-docs/` folder in this directory contains your complete and only authorization:

- 01_EA-001_and_Governance_Record.md — EA-001 itself plus all Decision Log rulings. This is your authorization; its excluded-scope list and stop conditions are binding.
- 02_Council_Response_CR-001.md — binding rulings on your four flagged ambiguities (decision_type seed values, min-table ADR, residue-scan list, cooling default) plus one M5 addition (blocked publishes write audit events).
- 03_Architecture_v1.2.md — binding technical architecture: schema conventions, RLS posture, publication-as-snapshot, audit design, stack (§16), Compliance by Design (§0).
- 04_UX_Blueprint_v1.md — binding for everything the slice renders: design tokens, Document Frame, Publish Dialog, Status Pill vocabularies, sign-in, Studio screens, absence-over-disablement.
- 05 / 06 — PRD and Method, context only.
- 07_Accepted_Engineering_Plan_M1-M6.md — your own accepted plan. Execute it in order.

Rules of engagement:
1. Build ONLY the EA-001 vertical slice, milestone by milestone, starting with M1. Do not touch excluded scope.
2. Synthetic data only. Local only. No hosted deployment, no email sending, no AI features.
3. Every milestone: tell me what was built, what was executed-and-verified vs. authored, tests run with results, and any ADRs added. Stop for my review at the end of M2, M5, and M6 at minimum.
4. If you hit any EA-001 stop condition — a conflict, an undefined business rule, a control the stack can't satisfy — stop and report. Do not invent, do not substitute silently.
5. Verify my machine's prerequisites first (Node 20+, Docker running, Supabase CLI) and help me install anything missing before writing code.

Begin with the prerequisite check, then M1.
