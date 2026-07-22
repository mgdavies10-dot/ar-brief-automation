import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "../login/actions";
import { SidebarNav } from "./sidebar-nav";
import "./app.css";

/**
 * Authenticated app shell (M4): fixed navy sidebar (§4.2) + ivory content area.
 * One auth/profile resolution for every internal surface; RLS remains the
 * authority. Auth pages (/login, /welcome, /reset) live outside this group and
 * never get the sidebar.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, role")
    .eq("auth_id", user.id)
    .maybeSingle();
  if (!profile) redirect("/unauthorized"); // disabled/revoked
  if (profile.role === "advisor") redirect("/unauthorized"); // §8: OS is internal-only

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-mark">
          VYNE<span className="sidebar-mark-sub">Strategies</span>
        </div>
        <SidebarNav />
        <div className="sidebar-user">
          <div className="sidebar-user-name">{profile.full_name}</div>
          <div className="sidebar-user-role">{profile.role}</div>
          <form action={signOut}>
            <button className="sidebar-signout" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="app-main">{children}</main>
    </div>
  );
}
