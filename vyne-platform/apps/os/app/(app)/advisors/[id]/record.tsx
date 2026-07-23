"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RECORD_MOVEMENTS,
  composeRecordDraft,
  recordHasContent,
  type CurrentReality,
  type CurrentRealityRecord,
  type Recommendation,
} from "@vyne/domain";
import { saveRecord, submitRecordForReview, returnRecordToDraft, approveRecord } from "./actions";

type RecordStatus = "none" | "draft" | "in_review" | "approved" | "published" | "superseded" | "withdrawn";

export interface RecordInitial {
  status: RecordStatus;
  content: CurrentRealityRecord;
  submittedLabel: string | null;
  approvedLabel: string | null;
  canApprove: boolean;
  coolingMessage: string;
  overrideReason: string | null;
}

const STAGES = ["Draft", "In review", "Approved", "Published"] as const;
const STAGE_INDEX: Record<RecordStatus, number> = {
  none: 0,
  draft: 0,
  in_review: 1,
  approved: 2,
  published: 3,
  superseded: 2,
  withdrawn: 2,
};

const paras = (text: string) =>
  text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

export function RecordPanel({
  advisorId,
  advisorFirst,
  advisorName,
  cr,
  recommendation,
  isFounder,
  hasDecision,
  initial,
}: {
  advisorId: string;
  advisorFirst: string;
  advisorName: string;
  cr: CurrentReality;
  recommendation: Recommendation | null;
  isFounder: boolean;
  hasDecision: boolean;
  initial: RecordInitial;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState<CurrentRealityRecord>(initial.content);
  const [showOverride, setShowOverride] = useState(false);
  const [overrideReason, setOverrideReason] = useState("");

  const status = initial.status;
  const hasContent = recordHasContent(content);
  const currentStage = STAGE_INDEX[status];

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) {
        setError(res.error ?? "Something went wrong.");
        return;
      }
      setEditing(false);
      setShowOverride(false);
      setOverrideReason("");
      router.refresh();
    });
  }

  // A Record grows from a direction — the artifact is anchored to the decision.
  if (!hasDecision) {
    return (
      <section className="record record-empty">
        <p className="record-empty-note">
          A Record grows from a direction. Once we’ve framed where {advisorFirst}’s thinking is
          heading, we can compose the letter that reflects it back to them.
        </p>
        <Link href={`/advisors/${advisorId}?tab=direction`} className="btn-primary">
          Set {advisorFirst}’s Direction
        </Link>
      </section>
    );
  }

  const setField = (key: (typeof RECORD_MOVEMENTS)[number]["key"], value: string) =>
    setContent((c) => ({ ...c, [key]: value }));

  function draftFromTwin() {
    const seed = composeRecordDraft(cr, recommendation, advisorName);
    // Non-destructive: only fill movements the author hasn't written yet.
    setContent((c) => {
      const next = { ...c };
      for (const { key } of RECORD_MOVEMENTS) {
        if (!next[key]?.trim() && seed[key]?.trim()) next[key] = seed[key];
      }
      return next;
    });
  }

  if (editing) {
    return (
      <section className="record record-edit">
        <div className="record-edit-head">
          <p className="record-edit-hint">
            A letter to {advisorFirst}, in your words. Draft from what we understand, then make it yours.
          </p>
          <button type="button" className="btn-ghost" onClick={draftFromTwin} disabled={pending}>
            Draft from the twin
          </button>
        </div>

        {RECORD_MOVEMENTS.map(({ key, title }) => (
          <div className="field" key={key}>
            <label htmlFor={`rec-${key}`}>{title}</label>
            <textarea
              id={`rec-${key}`}
              className="record-textarea"
              rows={key === "understand" || key === "perspective" ? 5 : 3}
              value={content[key] ?? ""}
              onChange={(e) => setField(key, e.target.value)}
            />
          </div>
        ))}

        {error ? <p className="record-error">{error}</p> : null}
        <div className="record-actions">
          <button type="button" className="btn-primary" onClick={() => run(() => saveRecord(advisorId, content))} disabled={pending}>
            {pending ? "Saving…" : "Save draft"}
          </button>
          <button type="button" className="btn-ghost" onClick={() => { setEditing(false); setContent(initial.content); }} disabled={pending}>
            Cancel
          </button>
        </div>
      </section>
    );
  }

  const readOnly = status === "approved" || status === "published";
  const filledMovements = RECORD_MOVEMENTS.filter(({ key }) => Boolean(content[key]?.trim()));

  return (
    <section className="record">
      {/* Lifecycle bar */}
      <ol className="lifecycle" aria-label="Record lifecycle">
        {STAGES.map((label, i) => {
          const state = i < currentStage ? "done" : i === currentStage ? "current" : "future";
          const isPublished = label === "Published";
          return (
            <li key={label} className={`lc-step is-${state}${isPublished ? " is-horizon" : ""}`}>
              <span className="lc-dot" aria-hidden="true" />
              <span className="lc-label">{label}</span>
              {label === "In review" && initial.submittedLabel ? <span className="lc-meta">{initial.submittedLabel}</span> : null}
              {label === "Approved" && initial.approvedLabel ? <span className="lc-meta">{initial.approvedLabel}</span> : null}
              {isPublished ? <span className="lc-meta">Sent to {advisorFirst} — a later release</span> : null}
            </li>
          );
        })}
      </ol>

      {/* The letter */}
      {filledMovements.length ? (
        <article className="letter">
          <p className="letter-salutation">Dear {advisorFirst},</p>
          {filledMovements.map(({ key, title }) => (
            <section className="movement" key={key}>
              <h3 className="movement-h">{title}</h3>
              {paras(content[key] as string).map((p, k) => (
                <p className="movement-p" key={k}>{p}</p>
              ))}
            </section>
          ))}
          <p className="letter-sign">— The VYNE team</p>
        </article>
      ) : (
        <div className="record-blank">
          <p className="record-blank-note">
            This Record hasn’t been written yet. Draft it from everything we understand about
            {" "}{advisorFirst}’s practice — then shape it into a letter worth receiving.
          </p>
        </div>
      )}

      {initial.overrideReason ? (
        <p className="record-override-note">Approved during the cooling period — reason on file: “{initial.overrideReason}”.</p>
      ) : null}

      {error ? <p className="record-error">{error}</p> : null}

      {/* Actions by state + role */}
      {!readOnly ? (
        <div className="record-actions">
          <button type="button" className="btn-primary" onClick={() => setEditing(true)} disabled={pending}>
            {hasContent ? "Edit the letter" : "Begin the letter"}
          </button>

          {status !== "in_review" && hasContent ? (
            <button type="button" className="btn-ghost" onClick={() => run(() => submitRecordForReview(advisorId))} disabled={pending}>
              Submit for review
            </button>
          ) : null}

          {status === "in_review" ? (
            <>
              {isFounder ? (
                initial.canApprove ? (
                  <button type="button" className="btn-primary" onClick={() => run(() => approveRecord(advisorId))} disabled={pending}>
                    Approve
                  </button>
                ) : (
                  <span className="cooling">
                    <span className="cooling-msg">{initial.coolingMessage}</span>
                    {showOverride ? (
                      <span className="cooling-override">
                        <input
                          className="cooling-input"
                          placeholder="Reason to approve early"
                          value={overrideReason}
                          onChange={(e) => setOverrideReason(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn-ghost"
                          disabled={pending || !overrideReason.trim()}
                          onClick={() => run(() => approveRecord(advisorId, overrideReason))}
                        >
                          Approve anyway
                        </button>
                      </span>
                    ) : (
                      <button type="button" className="cooling-link" onClick={() => setShowOverride(true)}>
                        Approve early…
                      </button>
                    )}
                  </span>
                )
              ) : (
                <span className="record-await">Awaiting the founder’s review.</span>
              )}
              <button type="button" className="btn-ghost" onClick={() => run(() => returnRecordToDraft(advisorId))} disabled={pending}>
                Return to draft
              </button>
            </>
          ) : null}
        </div>
      ) : (
        <div className="record-actions">
          <span className="record-approved-note">This Record is approved. Publishing it to {advisorFirst} arrives in a later release.</span>
          {isFounder ? (
            <button type="button" className="btn-ghost" onClick={() => run(() => returnRecordToDraft(advisorId))} disabled={pending}>
              Reopen to revise
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}
