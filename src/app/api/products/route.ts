import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import ProductModel from "@/models/Product";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  await connectToDatabase();
  const products = await ProductModel.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return NextResponse.json({ data: products });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    productName,
    form,
    description,
    cultivatedVarieties,
    packagingDetails,
    labelingDetails,
    imageUrl,
    isActive,
    order,
  } = body ?? {};

  if (!productName || !form || !description) {
    return NextResponse.json(
      { error: "productName, form and description are required." },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const product = await ProductModel.create({
    productName,
    form,
    description,
    cultivatedVarieties: cultivatedVarieties ?? "",
    packagingDetails: packagingDetails ?? "",
    labelingDetails: labelingDetails ?? "",
    imageUrl: imageUrl ?? "",
    isActive: isActive ?? true,
    order: order ?? 0,
  });

  return NextResponse.json({ data: product }, { status: 201 });
}
