"use client";

import { useState } from "react";
import {
  type CurrentReality,
  CONSTRAINT_KINDS,
  FINDING_KINDS,
  GOAL_PRIORITIES,
  GOAL_HORIZONS,
  isDimensionComplete,
  currentRealityCompleteness,
} from "@vyne/domain";
import { saveCurrentReality } from "./actions";

const kindLabel = (s: string) => s.replace(/_/g, " ");

/** A calm editor for a list of {text, ...enum} items. */
function ListEditor({
  items,
  onChange,
  placeholder,
  enumField,
  enumOptions,
}: {
  items: { text: string; [k: string]: unknown }[];
  onChange: (next: { text: string; [k: string]: unknown }[]) => void;
  placeholder: string;
  enumField?: string;
  enumOptions?: readonly string[];
}) {
  const [draft, setDraft] = useState("");
  const add = () => {
    if (!draft.trim()) return;
    onChange([...items, { text: draft.trim() }]);
    setDraft("");
  };
  return (
    <div className="cr-list">
      {items.map((it, i) => (
        <div className="cr-list-item" key={i}>
          <input
            className="cr-input"
            value={it.text}
            onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
          />
          {enumField && enumOptions ? (
            <select
              className="cr-select"
              value={(it[enumField] as string) ?? ""}
              onChange={(e) =>
                onChange(items.map((x, j) => (j === i ? { ...x, [enumField]: e.target.value || undefined } : x)))
              }
            >
              <option value="">—</option>
              {enumOptions.map((o) => (
                <option key={o} value={o}>{kindLabel(o)}</option>
              ))}
            </select>
          ) : null}
          <button type="button" className="cr-remove" aria-label="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))}>×</button>
        </div>
      ))}
      <div className="cr-list-add">
        <input
          className="cr-input"
          placeholder={placeholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
        />
        <button type="button" className="cr-add" onClick={add}>Add</button>
      </div>
    </div>
  );
}

const PROFILE_FIELDS: { key: keyof CurrentReality["practiceProfile"]; label: string; kind?: "number" }[] = [
  { key: "teamStructure", label: "Team structure" },
  { key: "staffCount", label: "Staff (count)", kind: "number" },
  { key: "yearsInBusiness", label: "Years in business", kind: "number" },
  { key: "custodianOrPlatform", label: "Custodian / platform" },
  { key: "serviceModel", label: "Service model" },
  { key: "clientAcquisition", label: "How they win clients" },
  { key: "growthTrajectory", label: "Growth trajectory" },
  { key: "successionStatus", label: "Succession" },
];

const SECTIONS = [
  { key: "overview", label: "Overview", hint: "The practice in a few sentences — as a consultant would summarize it." },
  { key: "practiceProfile", label: "Practice profile", hint: "How the business is built." },
  { key: "goals", label: "Goals", hint: "What they're trying to accomplish." },
  { key: "motivations", label: "Motivations", hint: "What's driving them to consider a change now." },
  { key: "constraints", label: "Constraints", hint: "What limits their options — contractual, financial, personal." },
  { key: "strengths", label: "Strengths", hint: "What's working, what they're proud of." },
  { key: "frictions", label: "Frictions", hint: "What isn't working, what's holding them back." },
  { key: "findings", label: "Findings", hint: "Your synthesized observations — the consultant's read." },
  { key: "recruiterNotes", label: "Your notes", hint: "Context and judgment only you can add." },
] as const;

export function RealityEditor({ advisorId, initial }: { advisorId: string; initial: CurrentReality }) {
  const [cr, setCr] = useState<CurrentReality>(initial);
  const [open, setOpen] = useState<string | null>("overview");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof CurrentReality>(k: K, v: CurrentReality[K]) => setCr((c) => ({ ...c, [k]: v }));

  async function save() {
    setSaving(true);
    setError(null);
    const res = await saveCurrentReality(advisorId, cr);
    setSaving(false);
    if (res.ok) setSavedAt(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    else setError(res.error ?? "That didn’t save.");
  }

  const pct = Math.round(currentRealityCompleteness(cr) * 100);

  return (
    <div className="cr-editor">
      <div className="cr-progress">
        <div className="cr-progress-bar"><span style={{ width: `${pct}%` }} /></div>
        <span className="cr-progress-label">{pct}% captured</span>
      </div>

      <div className="cr-sections">
        {SECTIONS.map((s) => {
          const done = isDimensionComplete(cr, s.key as never) || (s.key === "recruiterNotes" && Boolean(cr.recruiterNotes?.trim()));
          const isOpen = open === s.key;
          return (
            <section className={`cr-section${isOpen ? " is-open" : ""}`} key={s.key}>
              <button type="button" className="cr-section-head" onClick={() => setOpen(isOpen ? null : s.key)}>
                <span className={`cr-dot${done ? " is-done" : ""}`} aria-hidden="true" />
                <span className="cr-section-label">{s.label}</span>
                <span className="cr-section-chev" aria-hidden="true">{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen ? (
                <div className="cr-section-body">
                  <p className="cr-hint">{s.hint}</p>
                  {s.key === "overview" ? (
                    <textarea className="cr-textarea" rows={5} value={cr.overview ?? ""} onChange={(e) => set("overview", e.target.value)} />
                  ) : s.key === "recruiterNotes" ? (
                    <textarea className="cr-textarea" rows={4} value={cr.recruiterNotes ?? ""} onChange={(e) => set("recruiterNotes", e.target.value)} />
                  ) : s.key === "practiceProfile" ? (
                    <div className="cr-profile">
                      {PROFILE_FIELDS.map((f) => (
                        <div className="field" key={f.key}>
                          <label className="field-label">{f.label}</label>
                          <input
                            className="cr-input"
                            type={f.kind === "number" ? "number" : "text"}
                            value={(cr.practiceProfile[f.key] as string | number | undefined) ?? ""}
                            onChange={(e) => {
                              const raw = e.target.value;
                              const val = f.kind === "number" ? (raw === "" ? undefined : Number(raw)) : raw || undefined;
                              set("practiceProfile", { ...cr.practiceProfile, [f.key]: val });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : s.key === "goals" ? (
                    <ListEditor items={cr.goals} onChange={(v) => set("goals", v as CurrentReality["goals"])} placeholder="Add a goal…" enumField="priority" enumOptions={GOAL_PRIORITIES} />
                  ) : s.key === "constraints" ? (
                    <ListEditor items={cr.constraints} onChange={(v) => set("constraints", v as CurrentReality["constraints"])} placeholder="Add a constraint…" enumField="kind" enumOptions={CONSTRAINT_KINDS} />
                  ) : s.key === "findings" ? (
                    <ListEditor items={cr.findings} onChange={(v) => set("findings", v as CurrentReality["findings"])} placeholder="Add a finding…" enumField="kind" enumOptions={FINDING_KINDS} />
                  ) : (
                    <ListEditor
                      items={cr[s.key as "motivations" | "strengths" | "frictions"]}
                      onChange={(v) => set(s.key as "motivations" | "strengths" | "frictions", v as CurrentReality["motivations"])}
                      placeholder={`Add ${s.label.toLowerCase()}…`}
                    />
                  )}
                  {/* goals horizon note kept simple: priority only in v1 */}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      <div className="cr-save-bar">
        <button type="button" className="btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </button>
        {savedAt ? <span className="cr-saved">Saved at {savedAt}</span> : null}
        {error ? <span className="cr-error">{error}</span> : null}
      </div>
    </div>
  );
}
