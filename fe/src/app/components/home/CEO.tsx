import { siteContent } from "../../../lib/data";
import { Quote, Linkedin } from "lucide-react";

export function CEO() {
  const { ceo } = siteContent;

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={ceo.image} 
                alt={ceo.name} 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-bold">{ceo.name}</h3>
                <p className="text-secondary font-medium tracking-wide">{ceo.title}</p>
              </div>
            </div>
            
            {/* Decorative Dots */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-dots-pattern opacity-20" />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 text-accent/20 w-20 h-20 transform -scale-x-100" />
              <blockquote className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed relative z-10">
                "{ceo.quote}"
              </blockquote>
            </div>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>{ceo.bio}</p>
              <p>
                Sous sa direction, EKR Africa Agrovision Group s'est imposé comme un acteur incontournable, 
                tissant des liens solides entre les producteurs locaux et les marchés internationaux.
              </p>
            </div>

            <div className="pt-4">
              <a 
                href="#" 
                className="inline-flex items-center gap-3 text-primary font-semibold hover:text-primary/80 transition-colors group"
              >
                <span className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Linkedin size={20} />
                </span>
                Suivre sur LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
