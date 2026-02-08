import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import GalleryItemModel from "@/models/GalleryItem";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  await connectToDatabase();
  const gallery = await GalleryItemModel.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return NextResponse.json({ data: gallery });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { title, imageUrl, category, isActive, order } = body ?? {};

  if (!title || !imageUrl || !category) {
    return NextResponse.json(
      { error: "Title, imageUrl and category are required." },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const item = await GalleryItemModel.create({
    title,
    imageUrl,
    category,
    isActive: isActive ?? true,
    order: order ?? 0,
  });

  return NextResponse.json({ data: item }, { status: 201 });
}
