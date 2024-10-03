"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "./schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export async function socialSignIn(formData: any) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}

export const credentialLogin = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return response;
  } catch (error) {
    return { error: "Invalid email or password!" };
  }
};
