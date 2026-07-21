import "server-only";

/**
 * Server-only GoTrue admin calls for Studio (identical contract to the OS
 * helper; consolidation into a shared package is tracked M3-2 tech debt).
 * Local stack only — the key is the CLI's well-known development default.
 */
function adminEnv(): { url: string; serviceKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (see .env.example)");
  }
  return { url, serviceKey };
}

/** Marks the A1 password-rotation ceremony step complete (admin-only path). */
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
