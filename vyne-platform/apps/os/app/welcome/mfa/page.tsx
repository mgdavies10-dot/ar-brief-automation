"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * First-login ceremony, step two (founder ruling A1): real TOTP enrollment
 * with a standard authenticator app — no simulation. Internal roles cannot
 * reach any app surface until a factor is verified (middleware-enforced).
 * Client component so a mistyped code retries against the SAME secret.
 */
export default function MfaEnrollmentPage() {
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // Run-once guard: React Strict Mode invokes effects twice in dev; without
  // this, two racing enroll/unenroll cycles leave the displayed secret
  // orphaned (server ends with 0 or 2 factors). Enroll exactly once.
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const supabase = createClient();
    (async () => {
      const { data, error: listError } = await supabase.auth.mfa.listFactors();
      if (listError) {
        setError("Something went wrong preparing enrollment — reload to try again");
        return;
      }
      const totp = data.all.filter((f) => f.factor_type === "totp");
      if (totp.some((f) => f.status === "verified")) {
        window.location.assign("/");
        return;
      }
      // Clear abandoned unverified factors so exactly one fresh secret exists.
      for (const f of totp.filter((f) => f.status === "unverified")) {
        await supabase.auth.mfa.unenroll({ factorId: f.id });
      }
      const { data: enrolled, error: enrollError } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "Authenticator app",
      });
      if (enrollError || !enrolled) {
        setError("Something went wrong preparing enrollment — reload to try again");
        return;
      }
      setFactorId(enrolled.id);
      setQr(enrolled.totp.qr_code);
      setSecret(enrolled.totp.secret);
    })();
  }, []);

  async function verify(event: React.FormEvent) {
    event.preventDefault();
    if (!factorId || busy) return;
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
    if (challengeError || !challenge) {
      setError("That code didn’t work — try again");
      setBusy(false);
      return;
    }
    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: code.trim(),
    });
    if (verifyError) {
      setError("That code didn’t work — try again");
      setBusy(false);
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("users").update({ mfa_enrolled: true }).eq("auth_id", user.id);
    }
    window.location.assign("/");
  }

  return (
    <main className="signin">
      <form className="signin-card" onSubmit={verify}>
        <h1 className="signin-heading">Secure your account</h1>
        <p className="signin-note">
          Scan the code with your authenticator app, then enter the six-digit
          code it shows.
        </p>
        {qr ? (
          // Supabase returns qr_code already as an SVG data URL; use it
          // directly. Fall back to wrapping raw SVG defensively.
          <img
            className="signin-qr"
            src={qr.startsWith("data:") ? qr : `data:image/svg+xml;utf-8,${encodeURIComponent(qr)}`}
            alt="TOTP enrollment QR code"
          />
        ) : (
          <p className="signin-note">Preparing your enrollment…</p>
        )}
        {secret ? (
          <p className="signin-secret">
            Can&rsquo;t scan? Enter this key manually: <code>{secret}</code>
          </p>
        ) : null}
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
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {error ? (
          <p className="signin-error" role="alert">
            {error}
          </p>
        ) : null}
        <button className="signin-submit" type="submit" disabled={!factorId || busy}>
          Verify and continue
        </button>
      </form>
    </main>
  );
}
