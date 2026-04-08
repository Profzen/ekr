import { Leaf, Eye, Target, Award } from "lucide-react";
import { clsx } from "clsx";

type IntroProps = {
  title: string;
  text: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  valuesTitle: string;
  valuesText: string;
};

export function Intro({
  title,
  text,
  missionTitle,
  missionText,
  visionTitle,
  visionText,
  valuesTitle,
  valuesText,
}: IntroProps) {
  const cards = [
    {
      title: missionTitle,
      text: missionText,
      icon: Target,
      color: "bg-primary/5 text-primary border-primary/10",
    },
    {
      title: visionTitle,
      text: visionText,
      icon: Eye,
      color: "bg-accent/5 text-accent-foreground border-accent/10",
    },
    {
      title: valuesTitle,
      text: valuesText,
      icon: Award,
      color: "bg-secondary/5 text-secondary border-secondary/10",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-5 lg:px-6 max-w-[1500px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <div className="flex flex-col justify-between gap-6 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="flex items-center gap-3 text-secondary font-semibold uppercase tracking-wider text-sm">
              <Leaf size={18} />
              <span>À Propos de Nous</span>
            </div>

            <h2 className="whitespace-pre-line text-3xl md:text-5xl font-bold leading-tight text-foreground">
              {title}
            </h2>

            <p className="whitespace-pre-line text-lg text-muted-foreground leading-relaxed">{text}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-2xl font-bold text-primary">60+</p>
                <p className="text-xs text-muted-foreground mt-1">Emplois directs</p>
              </div>
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                <p className="text-2xl font-bold text-accent-foreground">42</p>
                <p className="text-xs text-muted-foreground mt-1">Producteurs accompagnés</p>
              </div>
            </div>

            <blockquote className="pl-6 border-l-4 border-accent italic text-foreground font-medium text-xl">
              "Cultiver l'excellence pour nourrir l'avenir."
            </blockquote>

            <p className="text-base text-muted-foreground leading-relaxed">
              Notre engagement va au-delà de la simple commercialisation. Nous investissons dans la formation, l'innovation et le développement communautaire pour bâtir un écosystème agricole résilient et prospère.
            </p>
          </div>

          <div className="flex flex-col gap-4 justify-between animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className={clsx(
                  "p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1",
                  card.color
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm shrink-0">
                    <card.icon size={24} />
                  </div>
                  <div>
                    <h3 className="whitespace-pre-line text-lg font-bold mb-2">{card.title}</h3>
                    <p className="whitespace-pre-line opacity-90 leading-relaxed text-sm">{card.text}</p>
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
