import { NextRequest, NextResponse } from "next/server";
import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";
import { getNewAccessToken } from "./services/auth/authServices";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const hasTokenRefreshedParams =
    request.nextUrl.searchParams.has("tokenRefreshed");

  if (hasTokenRefreshedParams) {
    console.log("token refreshed params"); //not
    const url = request.nextUrl.clone();
    url.searchParams.delete("tokenRefreshed");
    return NextResponse.redirect(url);
  }

  const tokenRefreshedResult = await getNewAccessToken();

  if (tokenRefreshedResult.tokenRefreshed) {
    console.log("token refreshed"); //not
    const url = request.nextUrl.clone();
    url.searchParams.set("tokenRefreshed", "true");
    return NextResponse.redirect(url);
  }

  const accessToken = await getCookie("accessToken");

  let userRole: null | UserRole = null;
  if (accessToken) {
    const verifyToken: string | JwtPayload = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    );

    if (typeof verifyToken === "string") {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
    userRole = verifyToken?.role;
    console.log("verified token role", userRole);
  }

  const routeOwner = getRouteOwner(pathname);

  console.log("route owner", routeOwner);
  
  const isAuth = isAuthRoute(pathname);

  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(`${getDefaultDashboardRoute(userRole as UserRole)}`, request.url)
    );
  }

  console.log("pathname", pathname);
  if (routeOwner === null) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginurl = new URL("/login", request.url);
    loginurl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginurl);
  }

  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  if (
    routeOwner === "ADMIN" ||
    routeOwner === "USER" ||
    routeOwner === "MODERATOR"
  ) {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
  }

  console.log("proxy is called");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
