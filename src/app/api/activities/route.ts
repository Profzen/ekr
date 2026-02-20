import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import ActivityModel from "@/models/Activity";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  await connectToDatabase();
  const activities = await ActivityModel.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return NextResponse.json({ data: activities });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { title, description, icon, isActive, order } = body ?? {};

  if (!title) {
    return NextResponse.json(
      { error: "Title is required." },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const activity = await ActivityModel.create({
    title,
    description: description ?? "",
    icon: icon ?? "",
    isActive: isActive ?? true,
    order: order ?? 0,
  });

  return NextResponse.json({ data: activity }, { status: 201 });
}
