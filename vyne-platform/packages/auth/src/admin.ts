import "server-only";

/**
 * Server-only GoTrue admin calls (never imported into client code; the
 * service-role key lives in a non-NEXT_PUBLIC env var). Local stack only — the
 * key is the CLI's well-known local development default. Shared by both apps
 * (M3-S).
 */
function adminEnv(): { url: string; serviceKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (see .env.example)");
  }
  return { url, serviceKey };
}

/**
 * Marks the A1 password-rotation ceremony step complete for a user.
 * `app_metadata` is server-controlled: GoTrue ignores it on user-initiated
 * updates, so this admin call is the only path that can clear the flag.
 */
export async function markPasswordRotated(authUserId: string): Promise<void> {
  const { url, serviceKey } = adminEnv();
  const res = await fetch(`${url}/auth/v1/admin/users/${authUserId}`, {
    method: "PUT",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ app_metadata: { password_rotated: true } }),
  });
  if (!res.ok) {
    throw new Error(`Failed to record password rotation: ${res.status} ${await res.text()}`);
  }
}
