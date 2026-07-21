import { redirect } from "next/navigation";
import vyneLogo from "@vyne/ui/assets/brand/vyne-logo-primary.png";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./login/actions";

/**
 * Authenticated shell (M3-1): confirms identity, role, and session controls.
 * The profile comes from the live public.users row under RLS — the JWT claim
 * is never the authority. Operating surfaces (§4.2 navigation, Command
 * Center) arrive with M4.
 */
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (user.app_metadata?.password_rotated === false) redirect("/welcome"); // A1 gate

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, email, role")
    .eq("auth_id", user.id)
    .maybeSingle();
  if (!profile) redirect("/unauthorized"); // disabled/revoked: RLS returns no row → calm page (§4.1)
  if (profile.role === "advisor") redirect("/unauthorized"); // §8: OS is internal-only

  return (
    <>
      <header className="topbar">
        <span className="topbar-brand">
          <img
            className="topbar-logo"
            src={vyneLogo.src}
            width={vyneLogo.width}
            height={vyneLogo.height}
            alt="VYNE Strategies"
          />
          <span className="topbar-mark-divider" aria-hidden="true" />
          <span className="topbar-mark-app">OS</span>
        </span>
        <div className="topbar-user">
          <span className="topbar-name">{profile.full_name}</span>
          <span className="role-chip">{profile.role}</span>
          <form action={signOut}>
            <button className="topbar-signout" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="shell">
        <h1 className="shell-title">Signed in</h1>
        <div className="shell-rule" aria-hidden="true" />
        <section className="shell-card" aria-label="Session details">
          <dl className="shell-rows">
            <div className="shell-row">
              <dt>Name</dt>
              <dd>{profile.full_name}</dd>
            </div>
            <div className="shell-row">
              <dt>Email</dt>
              <dd>{profile.email}</dd>
            </div>
            <div className="shell-row">
              <dt>Role</dt>
              <dd>
                <span className="role-chip">{profile.role}</span>
              </dd>
            </div>
          </dl>
        </section>
        <p className="shell-note">
          Identity, role, and session verified against the live database. The
          Command Center and operating surfaces arrive with M4.
        </p>
      </main>
    </>
  );
}
