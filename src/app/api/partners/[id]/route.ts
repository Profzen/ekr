import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import PartnerModel from "@/models/Partner";
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

  const existing = await PartnerModel.findById(id).lean();
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (
    typeof body.logoUrl === "string" &&
    existing.logoUrl &&
    body.logoUrl !== existing.logoUrl
  ) {
    await deleteCloudinaryByUrl(existing.logoUrl);
  }

  const partner = await PartnerModel.findByIdAndUpdate(id, body, {
    new: true,
  }).lean();

  if (!partner) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: partner });
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
  const partner = await PartnerModel.findByIdAndDelete(id).lean();

  if (!partner) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (partner.logoUrl) {
    await deleteCloudinaryByUrl(partner.logoUrl);
  }

  return NextResponse.json({ data: partner });
}
