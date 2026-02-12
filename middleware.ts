import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "ekr_admin";
const SESSION_MAX_AGE = 60 * 60 * 2;

type AdminCookiePayload = {
  token: string;
  issuedAt: number;
};

function getExpectedToken() {
  const secret = process.env.ADMIN_TOKEN_SECRET;

  if (!secret) return null;
  return secret;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const expected = getExpectedToken();
  if (!expected) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const rawCookie = request.cookies.get(COOKIE_NAME)?.value;
  if (!rawCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Backward compatibility: accept legacy cookie containing the raw token.
  if (rawCookie === expected) {
    return NextResponse.next();
  }

  let payload: AdminCookiePayload | null = null;
  try {
    const decoded = atob(rawCookie);
    payload = JSON.parse(decoded) as AdminCookiePayload;
  } catch (error) {
    payload = null;
  }

  const isTokenValid = payload?.token === expected;
  const isNotExpired =
    typeof payload?.issuedAt === "number" &&
    Date.now() - payload.issuedAt <= SESSION_MAX_AGE * 1000;

  if (!isTokenValid || !isNotExpired) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
