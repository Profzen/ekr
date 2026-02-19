import { useParams, Link } from "react-router";
import { articles } from "../../lib/data";
import { ArrowLeft, Calendar, Tag, User, Share2, Printer } from "lucide-react";

export function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find(a => a.id === Number(id));

  if (!article) {
    return (
      <div className="pt-32 container mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
        <Link to="/articles" className="text-primary hover:underline">Retour aux articles</Link>
      </div>
    );
  }

  return (
    <article className="pt-24 min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <Link 
              to="/articles" 
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

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white -mt-24 relative z-10 p-8 md:p-12 rounded-2xl shadow-xl border border-border/50">
          
          {/* Toolbar */}
          <div className="flex justify-end gap-4 mb-8 pb-8 border-b border-border/50">
            <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <Share2 size={16} /> Partager
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <Printer size={16} /> Imprimer
            </button>
          </div>

          {/* Body */}
          <div className="prose prose-lg prose-green max-w-none text-foreground leading-relaxed">
            <p className="lead font-medium text-xl text-muted-foreground mb-8">
              {article.excerpt}
            </p>
            
            <p>{article.content}</p>
            
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
          
          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-wrap gap-2">
              {['Agriculture', 'Export', 'Développement', 'Afrique'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-muted/50 rounded-full text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
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
