import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SiteContentModel from "@/models/SiteContent";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  await connectToDatabase();
  const content = await SiteContentModel.findOne().lean();
  return NextResponse.json({ data: content });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await connectToDatabase();

  const existing = await SiteContentModel.findOne();
  const content = existing
    ? await SiteContentModel.findByIdAndUpdate(existing._id, body, { new: true })
    : await SiteContentModel.create(body);

  return NextResponse.json({ data: content });
}
