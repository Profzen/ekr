import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import TeamMemberModel from "@/models/TeamMember";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { deleteCloudinaryByUrl } from "@/lib/cloudinaryDelete";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  await connectToDatabase();

  const existing = await TeamMemberModel.findById(id).lean();
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (
    typeof body.photoUrl === "string" &&
    existing.photoUrl &&
    body.photoUrl !== existing.photoUrl
  ) {
    await deleteCloudinaryByUrl(existing.photoUrl);
  }

  const member = await TeamMemberModel.findByIdAndUpdate(id, body, {
    new: true,
  }).lean();

  if (!member) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: member });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectToDatabase();
  const member = await TeamMemberModel.findByIdAndDelete(id).lean();

  if (!member) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (member.photoUrl) {
    await deleteCloudinaryByUrl(member.photoUrl);
  }

  return NextResponse.json({ data: member });
}
