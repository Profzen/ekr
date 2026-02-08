import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import ArticleModel from "@/models/Article";
import { isAdminAuthenticated } from "@/lib/adminAuth";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectToDatabase();
  const article = await ArticleModel.findById(id).lean();

  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: article });
}

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

  const update: Record<string, unknown> = { ...body };

  if (typeof update.title === "string" && update.title.length > 0) {
    update.slug = slugify(update.title);
  }

  if (update.status === "published") {
    update.publishedAt = update.publishedAt ?? new Date();
  }

  const article = await ArticleModel.findByIdAndUpdate(id, update, {
    new: true,
  }).lean();

  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: article });
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
  const article = await ArticleModel.findByIdAndDelete(id).lean();

  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: article });
}
