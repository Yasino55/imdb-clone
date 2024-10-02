"use server";

import { signIn, signOut } from "@/auth";

export async function socialSignIn(formData: any) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}
