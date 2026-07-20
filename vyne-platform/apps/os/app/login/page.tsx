import type { Metadata } from "next";
import vyneLogo from "@vyne/ui/assets/brand/vyne-logo-primary.png";
import { signIn } from "./actions";

export const metadata: Metadata = { title: "Sign in — VYNE Strategies" };

/**
 * Sign-in (UX §4.1, OS skin): centered card on ivory; VYNE mark;
 * email + password. No marketing panel. The only error string is the approved
 * "That email and password don't match" — never revealing which.
 * (MFA challenge and reset flow arrive in M3-2/M3-3.)
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  return (
    <main className="signin">
      <form className="signin-card" action={signIn}>
        <img
          className="signin-logo"
          src={vyneLogo.src}
          width={vyneLogo.width}
          height={vyneLogo.height}
          alt="VYNE Strategies"
        />
        <div className="signin-submark" aria-hidden="true">
          Strategies
        </div>
        <div className="signin-rule" aria-hidden="true" />
        {status === "ended" ? <p className="signin-note">Your session has ended.</p> : null}
        <label className="signin-label" htmlFor="email">
          Email
        </label>
        <input
          className="signin-input"
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          autoFocus
        />
        <label className="signin-label" htmlFor="password">
          Password
        </label>
        <input
          className="signin-input"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        {status === "failed" ? (
          <p className="signin-error" role="alert">
            That email and password don&rsquo;t match
          </p>
        ) : null}
        <button className="signin-submit" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
}
