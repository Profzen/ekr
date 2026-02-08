import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import DirectorProfileModel from "@/models/DirectorProfile";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  await connectToDatabase();
  const profile = await DirectorProfileModel.findOne().lean();
  return NextResponse.json({ data: profile });
}

export async function PUT(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, title, photoUrl, bio, message } = body ?? {};

  if (!name || !title || !bio || !message) {
    return NextResponse.json(
      { error: "Name, title, bio and message are required." },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const existing = await DirectorProfileModel.findOne();

  const profile = existing
    ? await DirectorProfileModel.findByIdAndUpdate(existing._id, {
        name,
        title,
        photoUrl: photoUrl ?? "",
        bio,
        message,
      }, { new: true })
    : await DirectorProfileModel.create({
        name,
        title,
        photoUrl: photoUrl ?? "",
        bio,
        message,
      });

  return NextResponse.json({ data: profile });
}
