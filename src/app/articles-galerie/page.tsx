import connectToDatabase from "@/lib/db";
import ArticleModel from "@/models/Article";
import GalleryItemModel from "@/models/GalleryItem";

export const dynamic = "force-dynamic";

export default async function ArticlesGaleriePage() {
  let normalizedArticles: Array<{
    _id: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    slug?: string;
    date: string;
  }> = [];
  let gallery: Array<{ _id: string; title: string; imageUrl: string; category: string }> = [];

  try {
    await connectToDatabase();
    const [articles, galleryItems] = await Promise.all([
      ArticleModel.find({ status: "published" })
        .sort({ publishedAt: -1, createdAt: -1 })
        .lean(),
      GalleryItemModel.find({ isActive: true })
        .sort({ order: 1, createdAt: -1 })
        .lean(),
    ]);

    normalizedArticles = articles.map((article) => ({
      _id: article._id.toString(),
      title: article.title,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      slug: article.slug,
      date: article.publishedAt
        ? new Date(article.publishedAt).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "",
    }));

    gallery = galleryItems.map((item) => ({
      _id: item._id.toString(),
      title: item.title,
      imageUrl: item.imageUrl,
      category: item.category,
    }));
  } catch (error) {
    normalizedArticles = [];
    gallery = [];
  }

  return (
    <div className="bg-white">
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-2 py-16">
          <h1 className="text-3xl font-semibold text-slate-900">
            Articles & Galerie
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Actualités, projets, événements et réalisations du groupe.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">Articles</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {normalizedArticles.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              Aucun article publié pour le moment.
            </div>
          )}
          {normalizedArticles.map((article) => (
            <article
              key={article._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              {article.coverImage ? (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="h-36 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="h-36 rounded-xl bg-slate-100"></div>
              )}
              {article.date && (
                <p className="mt-4 text-xs text-emerald-700">{article.date}</p>
              )}
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{article.excerpt}</p>
              {article.slug && (
                <a
                  href={`/articles-galerie/${article.slug}`}
                  className="mt-3 inline-block text-xs font-semibold text-emerald-700"
                >
                  Lire l’article
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-emerald-50">
        <div className="mx-auto w-full max-w-7xl px-2 py-16">
          <h2 className="text-2xl font-semibold text-slate-900">Galerie</h2>
          <p className="mt-2 text-sm text-slate-600">
            Photos et vidéos classées par catégories.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.length === 0 && (
              <div className="rounded-2xl border border-emerald-100 bg-white p-5 text-sm text-slate-600">
                Aucun média disponible pour le moment.
              </div>
            )}
            {gallery.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
              >
                {item.imageUrl.includes("/video/upload/") ||
                item.imageUrl.endsWith(".mp4") ||
                item.imageUrl.endsWith(".mov") ? (
                  <video
                    src={item.imageUrl}
                    className="h-32 w-full rounded-xl object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-32 w-full rounded-xl object-cover"
                  />
                )}
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-slate-600">{item.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
