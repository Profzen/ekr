import { articles } from "../../lib/data";
import { Link } from "react-router";
import { Calendar, Tag, ArrowRight, Play, ZoomIn } from "lucide-react";

export function Articles() {
  const galleryImages = [
    "https://images.unsplash.com/photo-1717769071502-e9b5d06c5fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1758519289200-384c7ef2d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1762245289207-cf35224bb727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1596434220574-9af8bf9a0891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1688240818501-2881b90f1b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ];

  return (
    <div className="pt-24 min-h-screen bg-background pb-24">
      {/* Hero */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              Actualités & Galerie
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Découvrez la vie de la coopérative, nos événements et les dernières innovations du secteur.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Derniers Articles</h2>
            <div className="h-px flex-grow bg-border/50"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link 
                key={article.id}
                to={`/articles/${article.id}`}
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

      {/* Gallery Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Galerie Média</h2>
            <div className="h-px flex-grow bg-border/50"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((src, idx) => (
              <div 
                key={idx} 
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={src} 
                  alt={`Gallery ${idx}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                    <ZoomIn size={20} />
                  </button>
                  {idx % 3 === 0 && ( // Just simulating video on some items
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
