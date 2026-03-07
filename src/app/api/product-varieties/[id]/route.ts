import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import ProductVarietyModel from "@/models/ProductVariety";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { deleteCloudinaryByUrl } from "@/lib/cloudinaryDelete";

const toSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

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

  const existing = await ProductVarietyModel.findById(id).lean();
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

  if (typeof body.slug === "string" || typeof body.varietyName === "string") {
    const computedSlug = toSlug(body.slug || body.varietyName || existing.varietyName);
    const conflict = await ProductVarietyModel.findOne({
      slug: computedSlug,
      _id: { $ne: id },
    }).lean();

    if (conflict) {
      return NextResponse.json(
        { error: "This slug already exists." },
        { status: 409 }
      );
    }

    body.slug = computedSlug;
  }

  const variety = await ProductVarietyModel.findByIdAndUpdate(id, body, {
    new: true,
  }).lean();

  if (!variety) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: variety });
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
  const variety = await ProductVarietyModel.findByIdAndDelete(id).lean();

  if (!variety) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (variety.imageUrl) {
    await deleteCloudinaryByUrl(variety.imageUrl);
  }

  return NextResponse.json({ data: variety });
}
