import NextAuth from "next-auth";

import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Map user ID to token
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user = {
          ...session.user,
          id: token.sub, // Map token ID to session user ID
          name: token.name || session.user.name,
          email: token.email || session.user.email,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },

  ...authConfig,
});
