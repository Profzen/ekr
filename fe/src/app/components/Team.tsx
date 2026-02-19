import { team } from "../../lib/data";
import { Linkedin, Mail } from "lucide-react";

export function Team() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Notre Équipe</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des experts passionnés qui œuvrent chaque jour pour la réussite de nos partenaires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.id} className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4">
                    <a href="#" className="p-2 bg-white rounded-full hover:bg-white/90 text-primary transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href="#" className="p-2 bg-white rounded-full hover:bg-white/90 text-primary transition-colors">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1 text-foreground">{member.name}</h3>
                <p className="text-primary font-medium text-sm uppercase tracking-wide">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
