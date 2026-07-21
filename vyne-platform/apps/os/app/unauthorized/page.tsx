import type { Metadata } from "next";
import vyneLogo from "@vyne/ui/assets/brand/vyne-logo-primary.png";

export const metadata: Metadata = { title: "VYNE Strategies" };

/**
 * Calm unauthorized page (UX §2.4 / §4.1): sections outside a role simply
 * aren't available; no alarm, one contact line, a way out.
 */
export default function UnauthorizedPage() {
  return (
    <main className="signin">
      <div className="signin-card">
        <img
          className="signin-logo"
          src={vyneLogo.src}
          width={vyneLogo.width}
          height={vyneLogo.height}
          alt="VYNE Strategies"
        />
        <p className="signin-note">
          This workspace isn&rsquo;t available for your account. If you believe
          this is an error, contact VYNE Strategies.
        </p>
        <a className="signin-alt" href="/auth/end">
          Sign out
        </a>
      </div>
    </main>
  );
}
