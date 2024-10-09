import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./schemas";
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcryptjs from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    Github,
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;

        return {
          email,
          password,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
});
