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

export async function GET() {
  await connectToDatabase();
  const articles = await ArticleModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ data: articles });
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { title, excerpt, content, coverImage, category, status } = body ?? {};

  if (!title || !excerpt || !content) {
    return NextResponse.json(
      { error: "Title, excerpt and content are required." },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const article = await ArticleModel.create({
    title,
    excerpt,
    content,
    coverImage: coverImage ?? "",
    category: category ?? "Actualités",
    status: status ?? "draft",
    slug: slugify(title),
    publishedAt: status === "published" ? new Date() : null,
  });

  return NextResponse.json({ data: article }, { status: 201 });
}
