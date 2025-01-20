import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./schemas";
import { NextAuthConfig } from "next-auth";
import { prisma } from "./prisma";
import bcryptjs from "bcryptjs";

export default {
  providers: [
    Google,
    Github,
    Credentials({
      async authorize(credentials) {
        // Validate the provided credentials
        const validatedFields = SignInSchema.safeParse(credentials);
        if (!validatedFields.success) {
          throw new Error("Invalid fields");
        }

        const { email, password } = validatedFields.data;

        // Find the user in the database
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        // Verify the password
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        // Return the full user object (id, name, email, etc.)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig;
