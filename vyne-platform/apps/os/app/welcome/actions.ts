"use server";

import { performSetPassword } from "@vyne/auth/actions";

/** OS first-login password set — thin server-action boundary over shared logic. */
export async function setPassword(formData: FormData): Promise<void> {
  return performSetPassword("vyne-os", formData);
}
