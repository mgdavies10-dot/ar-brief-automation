import type { Metadata } from "next";
import { redirect } from "next/navigation";
import vyneLogo from "@vyne/ui/assets/brand/vyne-logo-primary.png";
import { createClient } from "@/lib/supabase/server";
import { setPassword } from "./actions";

export const metadata: Metadata = { title: "Welcome — VYNE Strategies" };

/**
 * First-login ceremony, step one (founder ruling A1): set your own password
 * before any app surface renders. Same discreet-lobby pattern as sign-in.
 * (TOTP enrollment joins this ceremony as M3-2 continues.)
 */
export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (user.app_metadata?.password_rotated !== false) redirect("/");

  const { status } = await searchParams;
  return (
    <main className="signin">
      <form className="signin-card" action={setPassword}>
        <img
          className="signin-logo"
          src={vyneLogo.src}
          width={vyneLogo.width}
          height={vyneLogo.height}
          alt="VYNE Strategies"
        />
        <p className="signin-note">
          Welcome. Set your password to continue — your temporary credentials
          end here.
        </p>
        <label className="signin-label" htmlFor="password">
          New password
        </label>
        <input
          className="signin-input"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          autoFocus
        />
        <label className="signin-label" htmlFor="confirm">
          Confirm password
        </label>
        <input
          className="signin-input"
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
        />
        {status === "mismatch" ? (
          <p className="signin-error" role="alert">
            Those passwords don&rsquo;t match
          </p>
        ) : null}
        {status === "rejected" ? (
          <p className="signin-error" role="alert">
            That password can&rsquo;t be used — please choose another
          </p>
        ) : null}
        <button className="signin-submit" type="submit">
          Continue
        </button>
      </form>
    </main>
  );
}
