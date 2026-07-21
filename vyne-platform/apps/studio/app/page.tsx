import { redirect } from "next/navigation";
import vyneLogo from "@vyne/ui/assets/brand/vyne-logo-primary.png";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./login/actions";

/**
 * Studio landing (M3-2): the private, prepared room — §4.3 top bar pattern
 * (wordmark left, user right; no sidebar). The seven destinations arrive with
 * M5; nothing here uses OS vocabulary.
 */
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (user.app_metadata?.password_rotated === false) redirect("/welcome");

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, email, role")
    .eq("auth_id", user.id)
    .maybeSingle();
  if (!profile) redirect("/unauthorized"); // disabled/revoked: RLS returns no row → calm page (§4.1)
  if (profile.role !== "advisor") redirect("/unauthorized"); // §8: Studio is advisor-only

  return (
    <>
      <header className="topbar">
        <img
          className="topbar-logo"
          src={vyneLogo.src}
          width={vyneLogo.width}
          height={vyneLogo.height}
          alt="VYNE Strategies"
        />
        <div className="topbar-user">
          <span className="topbar-name">{profile.full_name}</span>
          <form action={signOut}>
            <button className="topbar-signout" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="studio-home">
        <h1 className="studio-title">Welcome, {profile.full_name.split(" ")[0]}.</h1>
        <div className="studio-rule" aria-hidden="true" />
        <p className="studio-line">
          Your workspace is private and prepared for you by VYNE Strategies.
        </p>
        <p className="studio-note">
          Your deliverables, journey, and tasks will appear here as they are
          prepared for you.
        </p>
      </main>
    </>
  );
}
