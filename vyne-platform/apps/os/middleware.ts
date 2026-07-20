import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Session middleware (M3-1): refreshes the auth cookies on every request and
 * gates every route behind a session. This is the app-layer guard only —
 * authorization authority remains RLS resolving the live public.users row
 * (Architecture §12 defense in depth). Idle/absolute lifetime enforcement and
 * role-scoped routing arrive in M3-2/M3-3.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example)");
  }

  const supabase = createServerClient(url, anonKey, {
    cookieOptions: { name: "vyne-os" },
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
  if (!user && !isPublic) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  // A1 ceremony gate: an unrotated password blocks every app surface.
  // app_metadata is server-controlled, so the flag cannot be self-cleared.
  if (
    user &&
    user.app_metadata?.password_rotated === false &&
    !path.startsWith("/welcome") &&
    !isPublic
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/welcome";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
