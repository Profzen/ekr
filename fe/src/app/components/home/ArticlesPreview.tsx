import { articles } from "../../../lib/data";
import { Link } from "react-router";
import { ArrowRight, Calendar, User } from "lucide-react";

export function ArticlesPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Actualités & Perspectives
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Restez informés sur les dernières innovations agricoles et la vie de notre coopérative.
            </p>
          </div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Voir tous les articles <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <Link 
              key={article.id} 
              to={`/articles/${article.id}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col h-full"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {article.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    EKR Team
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {article.excerpt}
                </p>
                
                <span className="text-primary font-semibold text-sm flex items-center gap-2 mt-auto group-hover:translate-x-1 transition-transform">
                  Lire la suite <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
