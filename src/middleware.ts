import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  authRoutes,
  apiAuthRoutes,
  DEFAULT_LOGIN_REDIRECT,
  loggedInRoute,
} from "./routes";

export const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoutes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isLoggedInRoute = nextUrl.pathname.startsWith(loggedInRoute);

  if (isApiAuthRoute) {
    return undefined;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (isLoggedInRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/sign-in", nextUrl));
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
