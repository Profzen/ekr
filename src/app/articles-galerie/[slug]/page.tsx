import connectToDatabase from "@/lib/db";
import ArticleModel from "@/models/Article";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  await connectToDatabase();
  const article = await ArticleModel.findOne({ slug }).lean();

  if (!article) {
    notFound();
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto w-full max-w-5xl px-3 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Article
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            {article.title}
          </h1>
          {formattedDate && (
            <p className="mt-2 text-sm text-slate-500">{formattedDate}</p>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-3 py-12">
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="mb-8 h-64 w-full rounded-3xl border border-slate-200 object-cover shadow-sm"
          />
        )}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="whitespace-pre-line text-base leading-7 text-slate-700">
            {article.content}
          </p>
        </div>
      </section>
    </div>
  );
}
