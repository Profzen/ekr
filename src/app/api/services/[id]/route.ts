import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import ServiceModel from "@/models/Service";
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

  const existing = await ServiceModel.findById(id).lean();
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

  const service = await ServiceModel.findByIdAndUpdate(id, body, {
    new: true,
  }).lean();

  if (!service) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: service });
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
  const service = await ServiceModel.findByIdAndDelete(id).lean();

  if (!service) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (service.imageUrl) {
    await deleteCloudinaryByUrl(service.imageUrl);
  }

  return NextResponse.json({ data: service });
}
