import { Quote, Linkedin } from "lucide-react";

type CEOProps = {
  name: string;
  title: string;
  bio: string;
  quote: string;
  imageUrl: string;
};

export function CEO({ name, title, bio, quote, imageUrl }: CEOProps) {
  return (
    <section className="py-16 bg-background overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 z-0" />

      <div className="container mx-auto px-4 md:px-5 lg:px-6 max-w-[1500px] relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-7">
            <div className="w-full lg:w-[52%] relative">
            <div className="relative h-[260px] md:h-[320px] lg:h-[340px] rounded-2xl overflow-hidden shadow-lg bg-muted/20">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-2xl md:text-3xl font-bold">{name}</h3>
                <p className="text-secondary font-medium tracking-wide">{title}</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-dots-pattern opacity-20" />
          </div>

            <div className="w-full lg:w-[48%] space-y-6">
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 text-accent/20 w-20 h-20 transform -scale-x-100" />
              <blockquote className="text-lg md:text-2xl font-serif italic text-foreground leading-relaxed relative z-10">
                "{quote}"
              </blockquote>
            </div>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>{bio}</p>
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
