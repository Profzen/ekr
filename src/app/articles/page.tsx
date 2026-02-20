import connectToDatabase from "@/lib/db";
import ArticleModel from "@/models/Article";
import Link from "next/link";
import { Calendar, Tag, ArrowRight, Play, ZoomIn } from "lucide-react";

export const dynamic = "force-dynamic";

const figmaArticles = [
  {
    id: "1",
    title: "La demande mondiale de gingembre en hausse",
    date: "12 Octobre 2023",
    excerpt:
      "Analyse des tendances du marché et opportunités pour les producteurs africains dans la filière gingembre.",
    content: "Le marché mondial du gingembre connaît une croissance soutenue...",
    category: "Marché",
    image:
      "https://images.unsplash.com/photo-1717769071502-e9b5d06c5fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "EKR lance son programme d'incubation 2024",
    date: "05 Novembre 2023",
    excerpt:
      "Un appel à candidature pour soutenir 50 nouveaux projets agricoles innovants en Côte d'Ivoire.",
    content: "Nous sommes fiers d'annoncer le lancement de...",
    category: "Institutionnel",
    image:
      "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "Les bienfaits du Piment Long",
    date: "20 Janvier 2024",
    excerpt: "Au-delà de son goût, le piment long possède des vertus médicinales reconnues.",
    content: "Le piment long est riche en capsaïcine...",
    category: "Produit",
    image:
      "https://images.unsplash.com/photo-1762245289207-cf35224bb727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "4",
    title: "Structuration des filières : cap sur 2026",
    date: "08 Février 2026",
    excerpt:
      "Retour sur les actions menées pour renforcer la qualité, la traçabilité et l'accès au marché pour les producteurs partenaires.",
    content: "EKR Africa poursuit la structuration des filières à fort potentiel...",
    category: "Coopérative",
    image:
      "https://images.unsplash.com/photo-1596434220574-9af8bf9a0891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1717769071502-e9b5d06c5fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1758519289200-384c7ef2d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1762245289207-cf35224bb727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1596434220574-9af8bf9a0891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1688240818501-2881b90f1b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

const formatDate = (value?: Date | null) =>
  value
    ? new Date(value).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

export default async function ArticlesPage() {
  let articles: Array<{
    _id: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    slug?: string;
    publishedAt?: Date | null;
    category?: string;
  }> = [];

  try {
    await connectToDatabase();
    const fetched = await ArticleModel.find({ status: "published" })
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    articles = fetched.map((article) => ({
      _id: article._id.toString(),
      title: article.title,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      slug: article.slug,
      publishedAt: article.publishedAt,
      category: article.category,
    }));
  } catch (error) {
    articles = [];
  }

  const resolvedArticles = Array.from({ length: 4 }).map((_, index) => {
    const article = articles[index];
    const fallback = figmaArticles[index % figmaArticles.length];
    return {
      id: article?.slug || article?._id || fallback.id,
      title: article?.title || fallback.title,
      excerpt: article?.excerpt || fallback.excerpt,
      category: article?.category || fallback.category,
      image: article?.coverImage || fallback.image,
      date: article?.publishedAt ? formatDate(article.publishedAt) : fallback.date,
    };
  });

  return (
    <div className="pt-16 md:pt-24 min-h-screen bg-background pb-24">
      <section className="py-32 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px] relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-foreground">
                Actualités & Galerie
              </h1>
              <div className="flex justify-center">
                <div className="h-1 w-24 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              Découvrez la vie de la coopérative, nos événements et les dernières innovations du secteur agricole.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Explorez nos derniers articles, reportages et analyses sur les tendances du marché agricole, les bonnes pratiques de production et les initiatives d'EKR Africa Agrovision Group.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px]">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Derniers Articles</h2>
            <div className="h-px flex-grow bg-border/50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resolvedArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="group flex flex-col h-full bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-2">
                    <Tag size={12} />
                    {article.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-medium">
                    <Calendar size={14} />
                    {article.date}
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {article.excerpt}
                  </p>

                  <span className="text-primary font-semibold text-sm flex items-center gap-2 mt-auto group-hover:translate-x-1 transition-transform">
                    Lire l'article <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px]">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Galerie Média</h2>
            <div className="h-px flex-grow bg-border/50"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((src, idx) => (
              <div key={src} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                    <ZoomIn size={20} />
                  </button>
                  {idx % 3 === 0 && (
                    <button className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                      <Play size={20} fill="currentColor" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white border border-border rounded-full font-medium hover:bg-muted/50 transition-colors">
              Charger plus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
