import { siteContent } from "../../../lib/data";

export function Stats() {
  return (
    <section className="bg-primary/5 py-12 -mt-4 relative z-10 rounded-t-3xl border-t border-white/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {siteContent.intro.stats.map((stat) => (
            <div key={stat.id} className="text-center group hover:scale-105 transition-transform duration-300">
              <p className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-sm uppercase tracking-widest text-secondary font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
