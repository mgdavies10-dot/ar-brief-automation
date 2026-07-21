import { redirect } from "next/navigation";
import { createServerSupabase } from "./server";
import { markPasswordRotated } from "./admin";

/**
 * Shared auth server-action LOGIC (M3-S). These are plain async helpers, not
 * "use server" actions themselves — each app's thin `actions.ts` marks the
 * server boundary and delegates here with its own cookie name. `redirect()`
 * works from within the request context.
 */

/** Sign in; every failure routes to the single §4.1 error state. */
export async function performSignIn(cookieName: string, formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (email && password) {
    const supabase = await createServerSupabase(cookieName);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) redirect("/");
  }
  redirect("/login?status=failed");
}

export async function performSignOut(cookieName: string): Promise<void> {
  const supabase = await createServerSupabase(cookieName);
  await supabase.auth.signOut();
  redirect("/login");
}

/** A1 ceremony step one: the user replaces their provisioned temp password. */
export async function performSetPassword(cookieName: string, formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (!password || password !== confirm) {
    redirect("/welcome?status=mismatch");
  }

  const supabase = await createServerSupabase(cookieName);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    redirect("/welcome?status=rejected");
  }

  await markPasswordRotated(user.id);
  redirect("/");
}
