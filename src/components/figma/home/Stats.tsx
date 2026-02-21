type Stat = {
  id: number | string;
  value: string;
  label: string;
};

type StatsProps = {
  stats: Stat[];
};

export function Stats({ stats }: StatsProps) {
  return (
    <section className="bg-primary/5 py-12 -mt-4 relative z-10 rounded-t-3xl border-t border-white/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-5 lg:px-6 max-w-[1500px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center group hover:scale-105 transition-transform duration-300">
              <p className="whitespace-pre-line text-4xl md:text-5xl font-extrabold text-primary mb-2">
                {stat.value}
              </p>
              <p className="whitespace-pre-line text-sm uppercase tracking-widest text-secondary font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
