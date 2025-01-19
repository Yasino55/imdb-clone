/**
 * An array that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
// export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These route will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthRoutes = "/api/auth";

/**
 * The default reidrect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

export const loggedInRoute = "/watch-list";
