import connectToDatabase from "@/lib/db";
import ArticleModel from "@/models/Article";
import Link from "next/link";
import { isValidObjectId } from "mongoose";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { ArticleActions } from "@/components/figma/articles/ArticleActions";

export const dynamic = "force-dynamic";

const fallbackArticles = [
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
    excerpt:
      "Au-delà de son goût, le piment long possède des vertus médicinales reconnues.",
    content: "Le piment long est riche en capsaïcine...",
    category: "Produit",
    image:
      "https://images.unsplash.com/photo-1762245289207-cf35224bb727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const sharedReadingBanner =
  "https://images.unsplash.com/photo-1688240818501-2881b90f1b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600";

const renderContentWithBold = (content: string) => {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  return paragraphs.map((paragraph, index) => {
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={`${index}-${paragraph.slice(0, 10)}`}>
        {parts.map((part, partIndex) => {
          if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
            return <strong key={`${index}-${partIndex}`}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
};

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    image: string;
    date: string;
  } | null = null;

  try {
    await connectToDatabase();
    const query = isValidObjectId(slug) ? { $or: [{ slug }, { _id: slug }] } : { slug };
    let record = await ArticleModel.findOne(query).lean();
    if (!record) {
      const candidates = await ArticleModel.find({ status: "published" })
        .sort({ publishedAt: -1, createdAt: -1 })
        .limit(100)
        .lean();
      record =
        candidates.find((item) => slugify(item.title) === slug) ||
        candidates.find((item) => item._id.toString() === slug) ||
        null;
    }
    if (record) {
      article = {
        title: record.title,
        excerpt: record.excerpt,
        content: record.content || record.excerpt,
        category: record.category || "Marché",
        image:
          record.coverImage ||
          "https://images.unsplash.com/photo-1717769071502-e9b5d06c5fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        date: record.publishedAt
          ? new Date(record.publishedAt).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "",
      };
    }
  } catch (error) {
    article = null;
  }

  if (!article) {
    const fallback =
      fallbackArticles.find((item) => item.id === slug) ||
      fallbackArticles.find((item) => slugify(item.title) === slug);

    if (!fallback) {
      return (
        <div className="pt-32 container mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Link href="/articles" className="text-primary hover:underline">
            Retour aux articles
          </Link>
        </div>
      );
    }

    article = fallback;
  }

  return (
    <article className="pt-24 min-h-screen bg-background pb-24">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img src={sharedReadingBanner} alt="Bannière actualités" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium text-sm uppercase tracking-wide"
            >
              <ArrowLeft size={16} />
              Retour aux actualités
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium opacity-90">
                <Calendar size={14} />
                {article.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-sm font-medium opacity-80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User size={16} />
                </div>
                <span>Par EKR Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={14} />
                <span>Agriculture, Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px] py-12">
        <div className="bg-white -mt-24 relative z-10 p-8 md:p-10 rounded-2xl shadow-xl border border-border/50">
          <ArticleActions title={article.title} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto rounded-xl shadow-md border border-border/40"
              />
            </div>

            <div className="lg:col-span-8 prose prose-lg prose-green max-w-none text-foreground leading-relaxed">
            <p className="lead font-medium text-xl text-muted-foreground mb-8">{article.excerpt}</p>

            {renderContentWithBold(article.content)}

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-primary">Une approche durable</h2>

            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <blockquote className="border-l-4 border-accent pl-6 italic text-xl text-foreground my-8 bg-muted/30 p-4 rounded-r-lg">
              "L'innovation est au cœur de notre stratégie pour valoriser les filières agricoles locales."
            </blockquote>

            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>

            <figure className="my-12">
              <img
                src="https://images.unsplash.com/photo-1688240818501-2881b90f1b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Illustration article"
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <figcaption className="text-center text-sm text-muted-foreground mt-4 italic">
                La production locale en plein essor
              </figcaption>
            </figure>

            <h3>Conclusion</h3>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-wrap gap-2">
              {["Agriculture", "Export", "Développement", "Afrique"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted/50 rounded-full text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
