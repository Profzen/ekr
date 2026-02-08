import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import GalleryItemModel from "@/models/GalleryItem";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  await connectToDatabase();

  const item = await GalleryItemModel.findByIdAndUpdate(params.id, body, {
    new: true,
  }).lean();

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: item });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectToDatabase();
  const item = await GalleryItemModel.findByIdAndDelete(params.id).lean();

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: item });
}
