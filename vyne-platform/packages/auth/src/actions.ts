import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createServerSupabase } from "./server";
import { markPasswordRotated } from "./admin";
import { writeAuditEvent } from "./audit";

/**
 * Shared auth server-action LOGIC (M3-S). Plain async helpers, not "use server"
 * actions themselves — each app's thin `actions.ts` marks the server boundary
 * and delegates here with its own cookie name. `redirect()` works from within
 * the request context. M3-3: every sign-in/out writes an audit event and
 * successful logins stamp `last_login_at`.
 */

/** Best-effort request context for audit rows (never blocks the action). */
async function requestContext(): Promise<{ ip: string | null; userAgent: string | null }> {
  try {
    const h = await headers();
    const fwd = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip")?.trim() ?? null;
    // ip column is inet — only pass a plausible address, else null.
    const ip = fwd && /^[0-9a-fA-F:.]+$/.test(fwd) ? fwd : null;
    return { ip, userAgent: h.get("user-agent") };
  } catch {
    return { ip: null, userAgent: null };
  }
}

/** Sign in; every failure routes to the single §4.1 error state. */
export async function performSignIn(cookieName: string, formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { ip, userAgent } = await requestContext();

  if (email && password) {
    const supabase = await createServerSupabase(cookieName);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error && data.user) {
      const { data: profile } = await supabase
        .from("users")
        .select("id, role")
        .eq("auth_id", data.user.id)
        .maybeSingle();
      await supabase.from("users").update({ last_login_at: new Date().toISOString() }).eq("auth_id", data.user.id);
      await writeAuditEvent({
        eventType: "auth.login",
        actorId: profile?.id ?? null,
        actorRole: profile?.role ?? null,
        recordType: "user",
        recordId: profile?.id ?? null,
        ip,
        userAgent,
      });
      redirect("/");
    }
  }

  await writeAuditEvent({
    eventType: "auth.login_failed",
    actorId: null,
    actorRole: null,
    recordType: "user",
    recordId: null,
    ip,
    userAgent,
    after: { email },
  });
  redirect("/login?status=failed");
}

export async function performSignOut(cookieName: string): Promise<void> {
  const supabase = await createServerSupabase(cookieName);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let actorId: string | null = null;
  let actorRole: string | null = null;
  if (user) {
    const { data: profile } = await supabase.from("users").select("id, role").eq("auth_id", user.id).maybeSingle();
    actorId = profile?.id ?? null;
    actorRole = profile?.role ?? null;
  }
  const { ip, userAgent } = await requestContext();
  await supabase.auth.signOut();
  await writeAuditEvent({
    eventType: "auth.logout",
    actorId,
    actorRole,
    recordType: "user",
    recordId: actorId,
    ip,
    userAgent,
  });
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
