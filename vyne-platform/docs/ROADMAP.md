# VYNE Platform — Implementation Roadmap

**Status:** APPROVED (founder, 2026-07-20) — sequencing and founder-first priority confirmed · **Date:** 2026-07-20
**Baseline:** M1 ✅ · M2 ✅ (real-stack verified 42/42) · M3-1 ✅ (founder-reviewed;
uncommitted pending approval) · Brand v1 logo integrated (Q-9 resolved for v1).
**Effort unit:** a *session* is one focused working block on this machine.
Estimates are honest ranges, not commitments; every milestone ends with a
founder review gate and a clickable product state (standing direction,
2026-07-20).

This roadmap has two horizons. **Horizon A** is the remainder of the authorized
EA-001 vertical slice — buildable now, milestone by milestone. **Horizon B** is
the rest of the platform — planned here so sequencing and dependencies are
visible, but **nothing in Horizon B may be built under EA-001**; it requires a
new engineering authorization and council review, phase by phase.

**Milestone reporting standard (founder direction, permanent — every milestone
report going forward):** each report opens with a progress dashboard. Completion
is reported as **earned milestone progress** (milestones complete ÷ total
milestones), **not** effort estimates. The dashboard carries: the milestone
status table (below), earned-progress %, estimated engineering sessions
remaining, technical debt, open founder decisions, risks, and features complete
vs. planned.

Milestone status legend: ✅ Complete · 🟡 Pending founder approval · ⏳ Planned.
Canonical milestone set (10): M1 · M2 · M3-1 · M3-2 · M3-S · Brand Update ·
M3-3 · M4 · M5 · M6. Order is founder-ruled (2026-07-20):
**M3-2 → M3-S → Brand Token Update → M3-3 → M4 → M5 → M6.**

---

## Horizon A — remainder of the EA-001 slice (authorized)

### M3-2 — Credential ceremony + Studio sign-in  *(complete; awaiting founder walkthrough → commit)*
- **Objective:** complete the first-login trust ceremony (founder ruling A1) and
  open Advisor Studio's front door.
- **Features:** forced first-login password change (GoTrue `app_metadata` flag —
  no schema change); real TOTP enrollment (QR + authenticator app) enforced for
  internal roles before any app surface; MFA challenge step at sign-in; Studio
  sign-in screen + landing with its own skin and cookie isolation; role-scoped
  route guards (advisor session refused by OS routes).
- **Dependencies:** M3-1 (done); TOTP enabled in stack config (done).
- **Acceptance criteria:** internal user with unrotated password or missing MFA
  cannot reach any app surface; enrollment works with a standard authenticator
  app (no simulation); advisor signs into Studio, optional MFA; advisor session
  gets no OS route; M2 regression + M3 auth suite green.
- **Estimated effort:** 2–3 sessions.
- **Risks:** GoTrue AAL semantics for MFA-gated sessions (mitigate: integration
  tests first); ceremony screens have no UX Blueprint section — engineer-drafted
  copy flagged for founder at the gate.

### M3-S — Shared authentication extraction  *(founder-approved 2026-07-20; do immediately after M3-2)*
- **Objective:** eliminate the OS/Studio auth duplication now, so M4 (and M3-3)
  consume one foundation instead of copying it a third time.
- **Features:** shared `packages/auth` (Supabase server/browser/admin client
  factories, middleware gate builder parameterized by app skin + role policy,
  the A1 ceremony logic); shared auth CSS moved into `packages/ui`; OS and Studio
  reduced to thin app-specific wiring.
- **Dependencies:** M3-2 committed.
- **Acceptance criteria:** no behavioral change — full 49-test real-stack suite
  stays green; both apps' flows (sign-in, ceremony, MFA, guards, unauthorized)
  behave identically; net line count down; no auth logic duplicated across apps.
- **Estimated effort:** 1–2 sessions.
- **Risks:** refactor regressions (mitigate: tests are the safety net, run after
  each extraction step); Next.js middleware must remain in each app's root
  (framework constraint) but delegate to the shared builder.

### Brand token adoption  *(founder-approved 2026-07-20; before M4)*
- **Objective:** build the rest of the platform on the final visual system.
- **Features:** update `packages/ui` tokens to the official VYNE palette
  (midnight navy, ivory, warm bronze, stone gray, charcoal); keep current
  typography (font-licensing deferred); add an accessible bronze **text** variant
  where the surface bronze fails contrast, preserving the official palette for
  surfaces/accents.
- **Dependencies:** M3-S (so the shared components restyle once).
- **Acceptance criteria:** every token pairing used as text meets WCAG AA
  (documented contrast ratios); `tokens.ts`/`tokens.css` stay in lockstep
  (token tests green); apps visually reflect the official palette; no hardcoded
  colors introduced.
- **Estimated effort:** ~1 session.
- **Risks:** bronze-on-white and gold-on-white text contrast (measured and
  resolved with the text variant); confirm exact hex from the founder's source
  design file before locking.

### M3-3 — Session integrity, revocation, recovery  *(founder-ruled placement 2026-07-20: after Brand, before M4 — completion of the security foundation)*
- **Objective:** make sessions die correctly and recovery work locally, per §12
  and founder ruling R1.
- **Features:** idle timeout (30-min internal) + absolute lifetimes (12h/24h);
  refresh rotation and reuse detection verified; immediate revocation — disable
  kills UI/API/DB paths within one request cycle, refresh fails; calm
  unauthorized page (§4.1) for disabled accounts; full user-facing password
  reset via Mailpit (R1: primary flow; admin reset only as controlled backup);
  auth audit events (`auth.login`, `auth.login_failed`, `auth.logout`,
  `auth.session_revoked`, `user.created`, `user.disabled`) + `last_login_at`;
  Playwright e2e for both apps.
- **Dependencies:** M3-2.
- **Acceptance criteria:** M3_plan §7 items 3–5, 7 executed on the real stack;
  founder can watch a live session die and complete a reset end-to-end with
  zero external email; every listed event lands in `audit_events`.
- **Estimated effort:** 2–3 sessions.
- **Risks:** idle/absolute enforcement may need a small `sessions_meta` table
  (anticipated in M3_plan §4; would be a reviewed migration, founder-gated);
  Playwright + TOTP needs deterministic time handling.

### M4 — Founder-first OS core flow + synthetic seed
The accepted plan's M4, sequenced founder-experience-first per the 2026-07-20
direction, with an internal gate between the two halves.
- **M4-A — The founder's working surface (gate at end):**
  - **Objective:** the founder can run the core loop end to end: see the desk,
    open an advisor, record a decision, author Current Reality, build an
    artifact through its lifecycle.
  - **Features:** synthetic seed (1 founder, 1 recruiter, 3 demonstration
    personas, 1 synthetic firm set); OS navigation frame (§4.2 sidebar);
    Advisors list + Advisor Workspace; create advisor; Decision Workspace with
    the ten CR-001 decision types; Current Reality structured authoring;
    Artifact Builder with lifecycle bar (Draft → In review → Approved,
    founder-only approval per M2 policies).
  - **Estimated effort:** 4–5 sessions.
- **M4-B — Recruiter scope + cooling rule (milestone gate):**
  - **Objective:** the same surfaces correctly narrowed for a recruiter, plus
    the cooling rule.
  - **Features:** recruiter-scoped views (owned advisors only — policies exist,
    UI honors them); cooling rule as configurable policy (default ON,
    next-calendar-day per CR-001 §1.4; override requires a logged reason).
  - **Estimated effort:** 2 sessions.
- **Dependencies:** M3 complete (sessions + roles are the frame every screen
  hangs on).
- **Acceptance criteria:** founder completes create-advisor → decision →
  Current Reality → artifact-to-Approved entirely through the UI; recruiter
  sees only owned scope (UI parity with RLS verified by test); cooling-rule
  override writes its reason to the audit log; M2/M3 suites stay green.
- **Risks:** largest visible surface of the slice — scope creep into excluded
  modules (pipeline, modeling, economics) is the main hazard; structured
  authoring UX has depth (keep v1 to the blueprint, resist enrichment).

### M5 — Publication boundary + Advisor Studio  *(mandatory founder stop)*
- **Objective:** the crown-jewel control: what the advisor sees is exactly and
  only what the founder published.
- **Features:** Publish Dialog with advisor's-eye Document Frame preview and
  checklist (correct advisor · version · provenance · residue scan ·
  attestation); commercial-residue scan wired to the M1 vocabulary (blocked
  publishes write `artifact.publish_blocked` audit events per CR-001 §2);
  snapshot copy to `published_artifacts`; two-beat confirmation; log-only
  notification stub; Studio Home (status line, featured deliverable),
  Deliverables reader in the pixel-identical Frame, Tasks (mark done + note →
  OS activity), withdrawal flow (removed from Studio, preserved internally,
  slate pill).
- **Dependencies:** M4 (artifacts must exist to publish); M3-2 Studio sign-in.
- **Acceptance criteria:** publish → advisor sees it in the Frame; withdraw →
  gone from Studio, preserved internally with audit trail; residue scan blocks
  a planted fixture and logs it; recruiter cannot publish (M2 policy, UI
  parity); snapshot immutability holds end to end.
- **Estimated effort:** 3–4 sessions.
- **Risks:** pixel-identical Frame across two apps (shared component in
  `packages/ui` — decide early); publication is Level-3 territory throughout —
  small changes need discipline.

### M6 — Security acceptance suite + completion report  *(mandatory founder stop; QA/Red-Team review per DL-2026-007)*
- **Objective:** prove the slice's promises, adversarially.
- **Features:** the full §12/EA suite as executed tests — cross-recruiter
  invisibility (list/search/URL/API), advisor probing internal routes and
  tables, disabled-user session death, withdrawn-artifact invisibility with
  audit persistence, UI/API authorization parity, residue-scan fixture, audit
  reconstruction of the entire flow; completion report per the verification
  honesty standard; slice acceptance review (DL-2026-008).
- **Dependencies:** M3–M5 complete.
- **Acceptance criteria:** every test executed (none deferred/mocked) on the
  real stack; report ready for QA/Red-Team; founder acceptance closes EA-001.
- **Estimated effort:** 2–3 sessions.
- **Risks:** adversarial testing may surface design gaps late — this is the
  point; budget for a fix loop rather than treating findings as failure.

**Horizon A total: roughly 15–20 sessions to slice completion.**

---

## Horizon B — post-slice platform (requires new EA + council review; not buildable under EA-001)

Sequenced for founder-experience-first; estimates are coarse (±50%).

| Phase | Objective / features | Depends on | Effort | Key risks / gates |
|---|---|---|---|---|
| B1 — Production readiness | Hosting decision, secrets management, CI/CD, backups + restore tests, rate limiting, monitoring; real Supabase project | EA-001 accepted | 4–6 sessions | Hosting is explicitly excluded under EA-001; needs its own authorization + security review |
| B2 — Real data onboarding | Migration from synthetic to real advisor/firm data; retention policy; DL-2026-004 boundary (CRM v4 stays archived reference) | B1 | 3–5 | Privacy/legal review required before any real record enters the system |
| B3 — Pipeline | Kanban/pipeline views over advisors + decisions (§5.2) | A complete | 3–4 | Keep vocabulary rules; recruiter scoping |
| B4 — Economics | Fees, invoices, commissions (§5.8); field-level views (e.g. analyst excludes fees) | B2 | 5–7 | Financial logic = Level 2+ throughout; accounting review gate |
| B5 — Modeling workspace | §5.6 modeling + model versions | B3 | 4–6 | Version audit events |
| B6 — Meetings, research, firm intel | §5.9–5.11 depth patterns | B3 | 4–6 | Firm-intel confidentiality controls |
| B7 — Public website | `vyne.com` marketing site (§8) | Brand reconciliation | 2–3 | Q-2 vendor sign-offs (fonts, email, analytics) |
| B8 — Email + notifications | Real outbound email (invitations, notifications) | B1, Q-2 | 2–3 | Excluded under EA-001; vendor + template review |
| B9 — AI features (Phase 7) | Agent Center per DL-2026-009; classified-source reading, never auto-publish | B1–B6 | large | Own charter; prompt-injection threat model (§12) |

**Standing cross-cutting item — Brand reconciliation (recommend deciding at M4
start):** the approved identity sheet vs. engineering tokens differ (navy
`#0B1B36` vs `#12233F`; bronze `#B88A5A` vs gold `#B48A35`; Trajan Pro /
Cormorant Garamond / Suisse Int'l vs the Q-8 fallback stack of Source Serif 4 +
Inter — the sheet's faces are commercially licensed, so adopting them is a
licensing decision). One founder ruling before M4's 30+ screens is cheap;
re-skinning after is not. Also still open: vector logo master + reversed
(on-navy) variant — needed for favicons, print, and dark surfaces.
