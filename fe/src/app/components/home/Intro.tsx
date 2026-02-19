import { siteContent } from "../../../lib/data";
import { Leaf, Eye, Target, Award } from "lucide-react";
import { clsx } from "clsx";

export function Intro() {
  const cards = [
    { 
      title: siteContent.mission.title, 
      text: siteContent.mission.text,
      icon: Target,
      color: "bg-primary/5 text-primary border-primary/10"
    },
    { 
      title: siteContent.vision.title, 
      text: siteContent.vision.text,
      icon: Eye,
      color: "bg-accent/5 text-accent-foreground border-accent/10"
    },
    { 
      title: siteContent.values.title, 
      text: siteContent.values.list.join(", "),
      icon: Award,
      color: "bg-secondary/5 text-secondary border-secondary/10"
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="flex items-center gap-3 text-secondary font-semibold uppercase tracking-wider text-sm">
              <Leaf size={18} />
              <span>À Propos de Nous</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
              {siteContent.intro.title}
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {siteContent.intro.text}
            </p>

            <blockquote className="pl-6 border-l-4 border-accent italic text-foreground font-medium text-xl">
              "Cultiver l'excellence pour nourrir l'avenir."
            </blockquote>
          </div>

          {/* Vision/Mission Cards */}
          <div className="grid gap-6 animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
            {cards.map((card, idx) => (
              <div 
                key={idx}
                className={clsx(
                  "p-8 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1",
                  card.color
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm shrink-0">
                    <card.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                    <p className="opacity-90 leading-relaxed text-sm md:text-base">
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
