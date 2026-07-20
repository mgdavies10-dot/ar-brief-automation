# VYNE Authority Matrix

**Status:** G1 draft for founder review · **Owner:** Founder (Council Chair)
**How to read:** find the decision category; the row states who proposes, who must
review, who approves, and which artifacts are mandatory. Levels reference the change
classification (Manual §5; full definitions in G2). When a change spans categories,
apply the strictest row. When no row fits, that is Manual §6.10 — stop and classify.

**Role keys:** F = Founder · PC = full Product Council · CPO/CMO/CTSO/LPR = charter
roles · UX = Principal UX Designer · QA = QA & Risk Lead · FIN = CFO/Revenue ·
ENG = Lead Engineer · OC = qualified outside counsel/professional

| Decision category | Typical level | Proposal owner | Required reviewers | Required approver | Founder approval | Outside counsel | Security approval | Decision Log | Source-doc update |
|---|---|---|---|---|---|---|---|---|---|
| Copy-only change (non-substantive) | 0 | Anyone | Functional owner | Functional owner | No | No | No | No | No |
| Cosmetic UI change (tokens/blueprint-conformant) | 0–1 | ENG/UX | UX | CPO | No | No | No | No | Only if Blueprint text affected |
| Workflow change (internal, non-sensitive) | 1 | CPO/COO | CPO + ENG | CPO | No | No | No | If behavior materially changes | If PRD/docs describe it |
| New feature (inside approved scope) | 1–2 | CPO | CPO + ENG (+UX if user-facing) | F at Level 2 | Level 2: yes | No | If it touches data access | Level 2: yes | Yes |
| Methodology-sensitive feature | 2 | CPO | PC (CMO lens mandatory) | F | Yes | No | No | Yes | Method/UX Blueprint |
| Financial model or calculation | 2 | FIN/ENG | PC (FIN + QA; independent tests mandatory) | F | Yes | No | No | Yes | Architecture/domain docs |
| Schema change | 2 | ENG | CTSO + CPO (+LPR if new data category) | F | Yes | §0.9 categories: yes | Yes | Yes | Architecture §4 |
| Permission or RLS change | 3 | ENG | PC (CTSO + QA; negative-access tests mandatory) | F | Yes | No | Yes | Yes | Architecture §12 |
| Authentication change | 3 | ENG | PC (CTSO + QA) | F | Yes | If it touches regulated data handling | Yes | Yes | Architecture §12 |
| Security architecture change | 3 | CTSO/ENG | PC | F | Yes | Pre-production: independent review (§8) | Yes | Yes | Architecture |
| Privacy or retention change | 3 | LPR/CPO | PC (LPR classification mandatory) | F | Yes | Classes 2/4/5: yes | Yes | Yes | Architecture §0, policies |
| AI feature | 3 (Phase 7 gated) | CPO | PC; DL-2026-009 controls apply | F | Yes | Disclosures: yes | Yes | Yes | Architecture §14 |
| Publication logic (boundary, residue scan, Frame) | 3 | ENG | PC (CTSO + CMO + UX + QA) | F | Yes | No | Yes | Yes | Architecture §13, UX §5.5 |
| Recruiter compensation (plans, tiers, clawback) | 3 | FIN | PC (FIN + LPR) | F | Yes | Contract terms: yes (LR-003) | No | Yes | Commission plan docs |
| Legal terms or disclosures (external-facing) | 3 | LPR | PC | F **after** OC | Yes | **Yes — mandatory** | No | Yes | Terms/policy docs |
| Marketing claims | 2–3 | Growth | Growth + LPR (+CMO if method claims) | F | Yes | Testimonials/regulated claims: yes | No | Level 3: yes | Public copy deck |
| Production incident | 3 | Whoever detects | CTSO + QA; PC post-incident | F | Yes (containment may precede, then logged) | Breach: yes | Yes | Yes (incident record) | Runbooks |
| Emergency rollback | 3 | ENG/CTSO | CTSO; PC review within 1 business day | F (retroactive within 24h permitted) | Yes | No | Yes | Yes | Migration/rollback notes |

## Standing notes

1. **Founder-only authorities (unchanged from Architecture §6/§7):** artifact
   approval and publication/withdrawal (v1, Q-3), ownership reassignment, user/role
   administration, audit-log read, bulk export.
2. **"Security approval"** means the CTSO lens plus executed negative-access tests —
   authored-but-unexecuted security work is never approvable (CR-001 §3).
3. **Outside counsel columns** trigger the Legal Escalation path (template: G2) and an
   Outside Counsel Register entry (G2) with LR ID; the repo carries IDs and status only.
4. **Emergency paths** trade sequencing, never documentation: whatever ran ahead of
   review is logged within one business day and reviewed as if proposed.
5. Under EA-001 the production-facing rows (incident, rollback, release) apply to the
   local slice in rehearsal form; no hosted surface exists to release to (DL-2026-006 b).
