"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * MFA challenge (Studio): an advisor who chose to enroll a factor must pass
 * its challenge before the workspace renders. Same pattern as OS.
 */
export default function ChallengePage() {
  const [factorId, setFactorId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data } = await supabase.auth.mfa.listFactors();
      const verified = data?.all.find((f) => f.factor_type === "totp" && f.status === "verified");
      if (!verified) {
        window.location.assign("/");
        return;
      }
      setFactorId(verified.id);
    })();
  }, []);

  async function verify(event: React.FormEvent) {
    event.preventDefault();
    if (!factorId || busy) return;
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
    if (!challengeError && challenge) {
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code: code.trim(),
      });
      if (!verifyError) {
        window.location.assign("/");
        return;
      }
    }
    setError("That code didn’t work — try again");
    setBusy(false);
  }

  return (
    <main className="signin">
      <form className="signin-card" onSubmit={verify}>
        <h1 className="signin-heading">One more step</h1>
        <p className="signin-note">Enter the six-digit code from your authenticator app.</p>
        <label className="signin-label" htmlFor="code">
          Six-digit code
        </label>
        <input
          className="signin-input"
          id="code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          maxLength={6}
          required
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {error ? (
          <p className="signin-error" role="alert">
            {error}
          </p>
        ) : null}
        <button className="signin-submit" type="submit" disabled={!factorId || busy}>
          Continue
        </button>
        <a className="signin-alt" href="/auth/end">
          Sign out
        </a>
      </form>
    </main>
  );
}
