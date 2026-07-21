"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * R1 password reset — set-new-password step (Studio). Accepts either a
 * token_hash (verifyOtp) or a PKCE code (exchangeCodeForSession) recovery link.
 */
export default function ResetUpdatePage() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenHash = params.get("token_hash");
      const code = params.get("code");
      if (tokenHash) {
        const { error: otpErr } = await supabase.auth.verifyOtp({ type: "recovery", token_hash: tokenHash });
        if (otpErr) {
          setError("This reset link is invalid or has expired.");
          return;
        }
      } else if (code) {
        const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
        if (exErr) {
          setError("This reset link is invalid or has expired.");
          return;
        }
      }
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setError("This reset link is invalid or has expired.");
        return;
      }
      setReady(true);
    })();
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (!password || password !== confirm) {
      setError(password !== confirm ? "Those passwords don’t match" : null);
      return;
    }
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { error: upErr } = await supabase.auth.updateUser({ password });
    if (upErr) {
      setError("That password can’t be used — please choose another");
      setBusy(false);
      return;
    }
    await supabase.auth.signOut();
    window.location.assign("/login?status=reset");
  }

  return (
    <main className="signin">
      <form className="signin-card" onSubmit={submit}>
        <h1 className="signin-heading">Set a new password</h1>
        {!ready && !error ? <p className="signin-note">Verifying your reset link…</p> : null}
        {error ? (
          <>
            <p className="signin-error" role="alert">
              {error}
            </p>
            <a className="signin-alt" href="/reset">
              Request a new link
            </a>
          </>
        ) : null}
        {ready ? (
          <>
            <label className="signin-label" htmlFor="password">
              New password
            </label>
            <input
              className="signin-input"
              id="password"
              type="password"
              autoComplete="new-password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="signin-label" htmlFor="confirm">
              Confirm password
            </label>
            <input
              className="signin-input"
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button className="signin-submit" type="submit" disabled={busy}>
              Set password
            </button>
          </>
        ) : null}
      </form>
    </main>
  );
}
