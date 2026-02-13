import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import TeamMemberModel from "@/models/TeamMember";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  await connectToDatabase();
  const team = await TeamMemberModel.find({ isActive: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return NextResponse.json({ data: team });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { name, role, photoUrl, isActive, order } = body ?? {};

  if (!name || !role) {
    return NextResponse.json(
      { error: "Name and role are required." },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const member = await TeamMemberModel.create({
    name,
    role,
    photoUrl: photoUrl ?? "",
    isActive: isActive ?? true,
    order: order ?? 0,
  });

  return NextResponse.json({ data: member }, { status: 201 });
}
