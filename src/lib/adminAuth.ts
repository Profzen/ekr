import { cookies } from "next/headers";

const COOKIE_NAME = "ekr_admin";
const SESSION_MAX_AGE = 60 * 60 * 2;

function getExpectedToken() {
  const secret = process.env.ADMIN_TOKEN_SECRET;
  if (!secret) return null;
  return secret;
}

export async function setAdminCookie() {
  const token = getExpectedToken();
  if (!token) return;

  const store = await cookies();
  store.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdminAuthenticated() {
  const token = getExpectedToken();
  if (!token) return false;

  const store = await cookies();
  const cookie = store.get(COOKIE_NAME)?.value;
  return cookie === token;
}
