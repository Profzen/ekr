import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "ekr_admin";

function getExpectedToken() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_TOKEN_SECRET;

  if (!password || !secret) {
    return null;
  }

  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

export function setAdminCookie() {
  const token = getExpectedToken();
  if (!token) return;

  cookies().set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function clearAdminCookie() {
  cookies().set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function isAdminAuthenticated() {
  const token = getExpectedToken();
  if (!token) return false;

  const cookie = cookies().get(COOKIE_NAME)?.value;
  return cookie === token;
}
