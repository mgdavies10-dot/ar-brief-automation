"use server";

import { performSignIn, performSignOut } from "@vyne/auth/actions";

/** OS sign-in / sign-out — thin server-action boundary over shared logic. */
export async function signIn(formData: FormData): Promise<void> {
  return performSignIn("vyne-os", formData);
}

export async function signOut(): Promise<void> {
  return performSignOut("vyne-os");
}
