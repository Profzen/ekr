import Link from "next/link";
import { ArrowRight, Leaf, Sprout, Ship, TrendingUp } from "lucide-react";

type ServiceCard = {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
};

type ServicesProps = {
  services: ServiceCard[];
};

const iconList = [Sprout, Ship, Leaf, TrendingUp];

export function Services({ services }: ServicesProps) {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-5 lg:px-6 max-w-[1500px]">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Leaf size={16} />
            <span>Nos Expertises</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Des Solutions Agricoles Complètes
          </h2>
          <p className="text-muted-foreground text-lg">
            De la production à l'exportation, nous maîtrisons chaque étape de la chaîne de valeur pour garantir l'excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 4).map((service, index) => {
            const Icon = iconList[index % iconList.length];
            return (
              <div
                key={service.id}
                className="group relative bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden group">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full text-primary shadow-lg z-10">
                    <Icon size={24} />
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>

                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all mt-auto"
                  >
                    En savoir plus <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Voir tous nos services
          </Link>
        </div>
      </div>
    </section>
  );
}
