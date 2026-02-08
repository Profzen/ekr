import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import PartnerModel from "@/models/Partner";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  await connectToDatabase();
  const partners = await PartnerModel.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return NextResponse.json({ data: partners });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { name, logoUrl, isActive, order } = body ?? {};

  if (!name) {
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const partner = await PartnerModel.create({
    name,
    logoUrl: logoUrl ?? "",
    isActive: isActive ?? true,
    order: order ?? 0,
  });

  return NextResponse.json({ data: partner }, { status: 201 });
}
