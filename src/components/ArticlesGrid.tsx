"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Tag, ArrowRight, ChevronDown } from "lucide-react";

type ArticleItem = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
};

const ARTICLES_PER_PAGE = 8; // 2 rows × 4 columns

export function ArticlesGrid({ articles }: { articles: ArticleItem[] }) {
  const [visible, setVisible] = useState(ARTICLES_PER_PAGE);

  const displayed = articles.slice(0, visible);
  const hasMore = visible < articles.length;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayed.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="group flex flex-col h-full bg-card ring-1 ring-border/60 rounded-2xl overflow-hidden shadow-sm hover:ring-primary/30 hover:shadow-lg transition-all duration-300"
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

            <div className="border-t border-border/40" />
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
                Lire l&apos;article <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisible((prev) => prev + ARTICLES_PER_PAGE)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
          >
            Voir plus
            <ChevronDown size={18} />
          </button>
        </div>
      )}
    </>
  );
}
