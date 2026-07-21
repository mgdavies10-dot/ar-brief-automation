import { createAuthMiddleware } from "@vyne/auth/middleware";

/**
 * VYNE OS session middleware — shared builder (M3-S). OS is internal-only
 * (§8 route map): advisor sessions get the calm unauthorized page; internal
 * roles run the A1 ceremony and mandatory MFA enrollment. RLS remains the
 * authorization authority.
 */
export const middleware = createAuthMiddleware({
  cookieName: "vyne-os",
  blockRole: (role) => role === "advisor",
  gatesApplyTo: (role) => role !== "advisor",
  mfaEnrollmentRequired: (role) => role === "founder" || role === "recruiter",
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
