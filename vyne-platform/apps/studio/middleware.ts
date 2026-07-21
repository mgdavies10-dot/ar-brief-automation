import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/** Decode JWT claims for ROUTING decisions only — never authorization. */
function claimsOf(token: string): Record<string, unknown> {
  try {
    const part = token.split(".")[1];
    if (!part) return {};
    const payload = part.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload)) as Record<string, unknown>;
  } catch {
    return {};
  }
}

/**
 * Studio session middleware (M3-2). Studio is advisor-only (§8 route map);
 * internal roles get the calm unauthorized page. Rotation ceremony applies to
 * all provisioned accounts; MFA is optional for advisors — but an enrolled
 * factor at aal1 must still pass its challenge. RLS remains the authority.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example)");
  }

  const supabase = createServerClient(url, anonKey, {
    cookieOptions: { name: "vyne-studio" },
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isPublic = path.startsWith("/login") || path.startsWith("/auth");
  const to = (pathname: string) => {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  };

  if (!user && !isPublic) return to("/login");

  if (user && !isPublic) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const role = session ? (claimsOf(session.access_token).user_role as string | undefined) : undefined;

    if (role !== undefined && role !== "advisor" && !path.startsWith("/unauthorized")) {
      return to("/unauthorized");
    }

    if (role === "advisor") {
      if (user.app_metadata?.password_rotated === false && !path.startsWith("/welcome")) {
        return to("/welcome");
      }
      if (user.app_metadata?.password_rotated !== false) {
        const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aal && aal.currentLevel === "aal1" && aal.nextLevel === "aal2" && !path.startsWith("/challenge")) {
          return to("/challenge");
        }
      }
    }
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
