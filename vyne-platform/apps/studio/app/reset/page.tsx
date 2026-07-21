"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * R1 password reset — request step (Studio). Sends a recovery link to the local
 * Mailpit inbox; always the same calm confirmation, no account-existence leak.
 */
export default function ResetRequestPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset/update`,
    });
    setSent(true);
  }

  return (
    <main className="signin">
      {sent ? (
        <div className="signin-card">
          <h1 className="signin-heading">Check your inbox</h1>
          <p className="signin-note">
            If an account exists for that address, a reset link is on its way.
          </p>
          <a className="signin-alt" href="/login">
            Back to sign in
          </a>
          <p className="signin-studio-line">Your workspace is private and prepared for you by VYNE Strategies.</p>
        </div>
      ) : (
        <form className="signin-card" onSubmit={submit}>
          <h1 className="signin-heading">Reset your password</h1>
          <p className="signin-note">Enter your email and we&rsquo;ll send a reset link.</p>
          <label className="signin-label" htmlFor="email">
            Email
          </label>
          <input
            className="signin-input"
            id="email"
            type="email"
            autoComplete="username"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="signin-submit" type="submit" disabled={busy}>
            Send reset link
          </button>
          <a className="signin-alt" href="/login">
            Back to sign in
          </a>
        </form>
      )}
    </main>
  );
}
