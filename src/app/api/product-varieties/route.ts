import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import ProductVarietyModel from "@/models/ProductVariety";
import { isAdminAuthenticated } from "@/lib/adminAuth";

const toSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function GET() {
  await connectToDatabase();
  const varieties = await ProductVarietyModel.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();

  return NextResponse.json({ data: varieties });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    productName,
    form,
    varietyName,
    slug,
    shortDescription,
    detailedDescription,
    cultivatedZone,
    qualitySpecs,
    packagingDetails,
    labelingDetails,
    imageUrl,
    isActive,
    order,
  } = body ?? {};

  if (!productName || !form || !varietyName) {
    return NextResponse.json(
      { error: "productName, form and varietyName are required." },
      { status: 400 }
    );
  }

  const computedSlug = toSlug(slug || varietyName);

  await connectToDatabase();
  const exists = await ProductVarietyModel.findOne({ slug: computedSlug }).lean();
  if (exists) {
    return NextResponse.json(
      { error: "This slug already exists." },
      { status: 409 }
    );
  }

  const variety = await ProductVarietyModel.create({
    productName,
    form,
    varietyName,
    slug: computedSlug,
    shortDescription: shortDescription ?? "",
    detailedDescription: detailedDescription ?? "",
    cultivatedZone: cultivatedZone ?? "",
    qualitySpecs: qualitySpecs ?? "",
    packagingDetails: packagingDetails ?? "",
    labelingDetails: labelingDetails ?? "",
    imageUrl: imageUrl ?? "",
    isActive: isActive ?? true,
    order: order ?? 0,
  });

  return NextResponse.json({ data: variety }, { status: 201 });
}
