import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

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

export interface AuthMiddlewareConfig {
  /** App-scoped cookie name (isolates OS vs Studio sessions). */
  cookieName: string;
  /** Roles that must be sent to the calm unauthorized page in this app. */
  blockRole: (role: string | undefined) => boolean;
  /** Whether the ceremony/MFA gates apply to this role in this app. */
  gatesApplyTo: (role: string | undefined) => boolean;
  /** Whether MFA enrollment is mandatory for this role. */
  mfaEnrollmentRequired: (role: string | undefined) => boolean;
}

/**
 * Builds the session middleware shared by OS and Studio (M3-S). Refreshes the
 * auth cookies every request and enforces, in order: authentication, role
 * routing, the A1 password-rotation gate, the MFA challenge (step-up for any
 * verified factor), and mandatory MFA enrollment where required. The JWT role
 * claim drives ROUTING only; RLS resolving the live public.users row remains
 * the authorization authority (Architecture §12 defense in depth).
 */
export function createAuthMiddleware(config: AuthMiddlewareConfig) {
  const { url, anonKey } = supabaseEnv();

  return async function middleware(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(url, anonKey, {
      cookieOptions: { name: config.cookieName },
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

      if (config.blockRole(role) && !path.startsWith("/unauthorized")) {
        return to("/unauthorized");
      }

      if (config.gatesApplyTo(role)) {
        // A1 gate 1: unrotated password blocks every surface (app_metadata is
        // server-controlled; the flag cannot be self-cleared).
        if (user.app_metadata?.password_rotated === false && !path.startsWith("/welcome")) {
          return to("/welcome");
        }
        // A1 gate 2 (after rotation): MFA challenge / enrollment.
        if (user.app_metadata?.password_rotated !== false) {
          const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
          if (aal) {
            const needsChallenge = aal.currentLevel === "aal1" && aal.nextLevel === "aal2";
            const unenrolled = aal.nextLevel === "aal1";
            if (needsChallenge && !path.startsWith("/challenge")) {
              return to("/challenge");
            }
            if (
              !needsChallenge &&
              unenrolled &&
              config.mfaEnrollmentRequired(role) &&
              !path.startsWith("/welcome/mfa")
            ) {
              return to("/welcome/mfa");
            }
          }
        }
      }
    }
    return response;
  };
}
