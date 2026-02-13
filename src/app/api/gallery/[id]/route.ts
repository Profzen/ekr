import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import GalleryItemModel from "@/models/GalleryItem";
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

  const existing = await GalleryItemModel.findById(id).lean();
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (
    typeof body.imageUrl === "string" &&
    existing.imageUrl &&
    body.imageUrl !== existing.imageUrl
  ) {
    await deleteCloudinaryByUrl(existing.imageUrl);
  }

  const item = await GalleryItemModel.findByIdAndUpdate(id, body, {
    new: true,
  }).lean();

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: item });
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
  const item = await GalleryItemModel.findByIdAndDelete(id).lean();

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (item.imageUrl) {
    await deleteCloudinaryByUrl(item.imageUrl);
  }

  return NextResponse.json({ data: item });
}
