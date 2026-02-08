import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import ServiceModel from "@/models/Service";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  await connectToDatabase();
  const services = await ServiceModel.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return NextResponse.json({ data: services });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { title, description, isActive, order } = body ?? {};

  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required." },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const service = await ServiceModel.create({
    title,
    description,
    isActive: isActive ?? true,
    order: order ?? 0,
  });

  return NextResponse.json({ data: service }, { status: 201 });
}
