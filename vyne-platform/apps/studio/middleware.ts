import { createAuthMiddleware } from "@vyne/auth/middleware";

/**
 * Advisor Studio session middleware — shared builder (M3-S). Studio is
 * advisor-only (§8 route map): internal roles get the calm unauthorized page.
 * The A1 rotation ceremony applies to advisors; MFA is optional for them, but
 * an enrolled factor at aal1 must still pass its challenge. RLS remains the
 * authorization authority.
 */
export const middleware = createAuthMiddleware({
  cookieName: "vyne-studio",
  blockRole: (role) => role !== undefined && role !== "advisor",
  gatesApplyTo: (role) => role === "advisor",
  mfaEnrollmentRequired: () => false,
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
