import { NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body ?? {};

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  setAdminCookie();
  return NextResponse.json({ ok: true });
}
