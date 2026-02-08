import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "ekr_admin";

function getExpectedToken() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_TOKEN_SECRET;

  if (!password || !secret) {
    return null;
  }

  return crypto.createHmac("sha256", secret).update(password).digest("hex");
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

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (token !== expected) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
