import { cookies } from "next/headers";

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

function buildCookieValue(token: string) {
  const payload: AdminCookiePayload = { token, issuedAt: Date.now() };
  return Buffer.from(JSON.stringify(payload), "utf-8").toString("base64");
}

function parseCookieValue(raw?: string) {
  if (!raw) return null;
  try {
    const decoded = Buffer.from(raw, "base64").toString("utf-8");
    const payload = JSON.parse(decoded) as AdminCookiePayload;
    if (!payload?.token || !payload?.issuedAt) return null;
    return payload;
  } catch (error) {
    return null;
  }
}

export async function setAdminCookie() {
  const token = getExpectedToken();
  if (!token) return;

  const store = await cookies();
  store.set({
    name: COOKIE_NAME,
    value: buildCookieValue(token),
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
  const rawCookie = store.get(COOKIE_NAME)?.value;
  const payload = parseCookieValue(rawCookie);
  if (!payload) return false;

  const isTokenValid = payload.token === token;
  const isNotExpired = Date.now() - payload.issuedAt <= SESSION_MAX_AGE * 1000;

  if (!isTokenValid || !isNotExpired) {
    await clearAdminCookie();
    return false;
  }

  return true;
}
