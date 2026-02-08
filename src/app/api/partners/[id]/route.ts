import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import PartnerModel from "@/models/Partner";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  await connectToDatabase();

  const partner = await PartnerModel.findByIdAndUpdate(params.id, body, {
    new: true,
  }).lean();

  if (!partner) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: partner });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectToDatabase();
  const partner = await PartnerModel.findByIdAndDelete(params.id).lean();

  if (!partner) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: partner });
}
