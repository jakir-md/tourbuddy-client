export type UserRole = "ADMIN" | "USER" | "MODERATOR";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = ["/login", "/register", "/forgot-password"];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings", "/change-password", "/reset-password"],
  patterns: [],
};

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin(\/.*)?$/],
  exact: [],
};

export const userProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard(\/.*)?$/],
  exact: [],
};

export const moderatorProtectedRoutes: RouteConfig = {
  patterns: [/^\/moderator(\/.*)?$/],
  exact: [],
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
};

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string
): "ADMIN" | "USER" | "COMMON" | "MODERATOR" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathname, userProtectedRoutes)) {
    return "USER";
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  if (isRouteMatches(pathname, moderatorProtectedRoutes)) return "MODERATOR";
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  } else if (role === "USER") {
    return "/dashboard";
  } else if (role === "MODERATOR") {
    return "/moderator/dashboard";
  }
  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};
