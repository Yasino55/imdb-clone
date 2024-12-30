"use server";

import { signIn } from "@/auth";
import { SignInSchema, SignUpSchema } from "../schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { prisma } from "@/prisma";

export async function socialSignIn(formData: FormData) {
  const action = formData.get("action");

  if (typeof action !== "string") {
    throw new Error("Invalid form data: action must be a string.");
  }

  await signIn(action, { redirectTo: "/" });
}

export const credentialLogin = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.password) {
    return { error: "Invalid email or password!" };
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);

  if (!isPasswordValid) {
    return { error: "Invalid email or password!" };
  }

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return response;
  } catch (error) {
    return { error: "An unexpected error ocurred!" };
  }
};

export const handleSignUp = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    const parsedCredentials = SignUpSchema.safeParse(values);

    if (!parsedCredentials.success) {
      return { success: false, error: "Invalid Data" };
    }

    const { name, email, password } = parsedCredentials.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Email already exists. Login to continue",
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.log("Error creating account:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};
