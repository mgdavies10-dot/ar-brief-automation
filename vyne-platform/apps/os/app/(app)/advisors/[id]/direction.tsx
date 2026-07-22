"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DECISION_TYPES, type DecisionType, type Recommendation, type ConvictionReading } from "@vyne/domain";
import { saveDirection } from "./actions";

const DECISION_TYPE_LABELS: Record<DecisionType, string> = {
  stay: "Stay",
  stay_and_strengthen: "Stay and strengthen",
  move_employee_firm: "Move to another firm",
  supported_independence: "Supported independence",
  launch_or_join_ria: "Launch or join an RIA",
  acquire_practice: "Acquire a practice",
  merge_teams: "Merge teams",
  sell_or_monetize: "Sell or monetize",
  internal_family_succession: "Internal / family succession",
  external_capital_partner: "External capital partner",
};

export interface DirectionInitial {
  decisionType: DecisionType | "";
  question: string;
  recommendation: Recommendation;
}

/** Join a list of human phrases into calm prose ("a, b, and c"). */
function listPhrase(items: string[]): string {
  const xs = items.filter(Boolean);
  if (xs.length <= 1) return xs.join("");
  if (xs.length === 2) return `${xs[0]} and ${xs[1]}`;
  return `${xs.slice(0, -1).join(", ")}, and ${xs[xs.length - 1]}`;
}

const paras = (text: string) =>
  text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

/**
 * The Direction surface (F2 — the Conviction Engine). It never scores the
 * advisor: it states, in calm language, how confident VYNE is in its own
 * understanding, and offers a perspective — narrative first, explainable — only
 * when that confidence is earned. No numbers, gauges, or traffic lights.
 */
export function DirectionPanel({
  advisorId,
  advisorFirst,
  conviction,
  initial,
}: {
  advisorId: string;
  advisorFirst: string;
  conviction: ConvictionReading;
  initial: DirectionInitial | null;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [decisionType, setDecisionType] = useState<DecisionType | "">(initial?.decisionType ?? "");
  const [question, setQuestion] = useState(initial?.question ?? "");
  const [perspective, setPerspective] = useState(initial?.recommendation.perspective ?? "");
  const [rationale, setRationale] = useState(initial?.recommendation.rationale ?? "");
  const [assumptions, setAssumptions] = useState(initial?.recommendation.assumptions ?? "");
  const [whatCouldChange, setWhatCouldChange] = useState(initial?.recommendation.whatCouldChange ?? "");

  const hasDecision = Boolean(initial?.decisionType);
  const hasPerspective = Boolean(initial?.recommendation.perspective?.trim());
  const headingText = question.trim() || initial?.question?.trim();

  function save() {
    setError(null);
    if (!decisionType) {
      setError("Choose the decision type first.");
      return;
    }
    startTransition(async () => {
      const res = await saveDirection(advisorId, {
        decisionType,
        question: question.trim() || undefined,
        recommendation: {
          perspective: perspective.trim() || undefined,
          rationale: rationale.trim() || undefined,
          assumptions: assumptions.trim() || undefined,
          whatCouldChange: whatCouldChange.trim() || undefined,
        },
      });
      if (!res.ok) {
        setError(res.error ?? "That didn’t save.");
        return;
      }
      setEditing(false);
      router.refresh();
    });
  }

  if (editing) {
    return (
      <section className="direction direction-edit">
        <div className="field">
          <label htmlFor="dir-type">The decision</label>
          <select
            id="dir-type"
            className="dir-select"
            value={decisionType}
            onChange={(e) => setDecisionType(e.target.value as DecisionType | "")}
          >
            <option value="">Select…</option>
            {DECISION_TYPES.map((t) => (
              <option key={t} value={t}>
                {DECISION_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="dir-q">In plain language</label>
          <input
            id="dir-q"
            className="dir-input"
            value={question}
            maxLength={280}
            placeholder={`Should ${advisorFirst} pursue supported independence?`}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {conviction.canBeginDiscussion ? (
          <fieldset className="dir-fieldset">
            <legend>Our perspective</legend>
            <div className="field">
              <label htmlFor="dir-persp">Our Current Perspective — the narrative {advisorFirst} reads first</label>
              <textarea
                id="dir-persp"
                className="dir-textarea"
                rows={5}
                value={perspective}
                placeholder="Based on our conversations and our understanding of your business, we believe…"
                onChange={(e) => setPerspective(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="dir-why">Why we’re saying this</label>
              <textarea id="dir-why" className="dir-textarea" rows={3} value={rationale} onChange={(e) => setRationale(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="dir-assume">What we’re assuming</label>
              <textarea id="dir-assume" className="dir-textarea" rows={3} value={assumptions} onChange={(e) => setAssumptions(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="dir-change">What could change our view</label>
              <textarea id="dir-change" className="dir-textarea" rows={3} value={whatCouldChange} onChange={(e) => setWhatCouldChange(e.target.value)} />
            </div>
          </fieldset>
        ) : (
          <p className="dir-gate-note">
            A perspective becomes available once our understanding is sufficient. For now, framing the decision is
            enough — the understanding will catch up as we learn more.
          </p>
        )}

        {error ? <p className="dir-error">{error}</p> : null}
        <div className="dir-actions">
          <button type="button" className="btn-primary" onClick={save} disabled={pending}>
            {pending ? "Saving…" : "Save"}
          </button>
          <button type="button" className="btn-ghost" onClick={() => setEditing(false)} disabled={pending}>
            Cancel
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="direction">
      {headingText ? (
        <h2 className="direction-question">{headingText}</h2>
      ) : hasDecision ? (
        <h2 className="direction-question">
          {DECISION_TYPE_LABELS[initial!.decisionType as DecisionType]} — what’s the right path?
        </h2>
      ) : null}

      <p className="direction-conviction">{conviction.headline}</p>

      <section className="cu">
        <h3 className="direction-h">What we understand</h3>
        <ul className="cu-list">
          {conviction.understanding.map((u) => (
            <li key={u.dimension} className={`cu-item is-${u.standing}`}>
              {u.phrase}
            </li>
          ))}
        </ul>
      </section>

      {hasPerspective ? (
        <section className="perspective">
          <h3 className="perspective-h">Our Current Perspective</h3>
          <div className="perspective-body">
            {paras(initial!.recommendation.perspective!).map((p, k) => (
              <p key={k}>{p}</p>
            ))}
          </div>

          {initial!.recommendation.rationale?.trim() ? (
            <div className="explain">
              <h4 className="explain-h">Why we’re saying this</h4>
              <p>{initial!.recommendation.rationale}</p>
            </div>
          ) : null}
          {initial!.recommendation.assumptions?.trim() ? (
            <div className="explain">
              <h4 className="explain-h">What we’re assuming</h4>
              <p>{initial!.recommendation.assumptions}</p>
            </div>
          ) : null}
          {initial!.recommendation.whatCouldChange?.trim() ? (
            <div className="explain">
              <h4 className="explain-h">What could change our view</h4>
              <p>{initial!.recommendation.whatCouldChange}</p>
            </div>
          ) : null}

          {conviction.materialUncertainty ? (
            <p className="perspective-uncertainty">
              More information could still change this view — we’ll say so plainly as our understanding deepens.
            </p>
          ) : null}

          <button type="button" className="btn-ghost" onClick={() => setEditing(true)}>
            Refine our perspective
          </button>
        </section>
      ) : conviction.canBeginDiscussion ? (
        <section className="perspective perspective-ready">
          <p className="perspective-ready-note">
            We understand {advisorFirst}’s business well enough to begin shaping a perspective.
          </p>
          <button type="button" className="btn-primary" onClick={() => setEditing(true)}>
            Begin our perspective
          </button>
        </section>
      ) : (
        <section className="perspective perspective-forming">
          <p className="perspective-forming-note">
            We’re not ready to offer a perspective yet — and we’d rather be honest than fast.
            {conviction.stillToLearn.length
              ? ` Before we do, we still want to understand ${advisorFirst}’s ${listPhrase(conviction.stillToLearn)}.`
              : ""}
          </p>
          <button type="button" className="btn-ghost" onClick={() => setEditing(true)}>
            {hasDecision ? "Edit the decision" : "Frame the decision"}
          </button>
        </section>
      )}
    </section>
  );
}
