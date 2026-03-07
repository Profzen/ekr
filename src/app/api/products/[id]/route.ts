import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import ProductModel from "@/models/Product";
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

  const existing = await ProductModel.findById(id).lean();
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

  const product = await ProductModel.findByIdAndUpdate(id, body, {
    new: true,
  }).lean();

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: product });
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
  const product = await ProductModel.findByIdAndDelete(id).lean();

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (product.imageUrl) {
    await deleteCloudinaryByUrl(product.imageUrl);
  }

  return NextResponse.json({ data: product });
}
