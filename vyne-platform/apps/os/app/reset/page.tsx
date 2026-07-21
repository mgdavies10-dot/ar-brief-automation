"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * R1 password reset — request step. Sends a recovery link to the local Mailpit
 * inbox (nothing leaves the machine). Always shows the same calm confirmation,
 * never revealing whether the account exists (§4.1).
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
            The link opens a page where you can set a new password.
          </p>
          <a className="signin-alt" href="/login">
            Back to sign in
          </a>
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
