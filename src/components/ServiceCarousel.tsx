"use client";

import { useEffect, useRef, useState } from "react";

interface Service {
  _id: string;
  title: string;
  description: string;
}

interface ServiceCarouselProps {
  services: Service[];
  visibleCount?: number;
}

const icons = [
  // Agriculteurs - Plant/Leaf icon
  <svg key="1" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 2c-3 0-6 2-6 6 0 2.5 1.5 4.5 3.5 5.5C8.5 16 7 19 7 22h2c0-2.5 1.5-4.5 3-5.5 1.5 1 3 2.5 3 5.5h2c0-3-1.5-6-2.5-8.5 2-1 3.5-3 3.5-5.5 0-4-3-6-6-6z"/>
    <path d="M12 2v20"/>
  </svg>,
  // Fournisseurs - Box/Package icon
  <svg key="2" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>
  </svg>,
  // Prestataires - Settings/Tools icon
  <svg key="3" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.2 4.2l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.2-4.2l4.2-4.2"/>
  </svg>,
  // Acheteurs - Shopping Cart icon
  <svg key="4" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
  </svg>,
  // Conseil - Lightbulb icon
  <svg key="5" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M15 14c.6-1.4 1-3 1-4.5A6.5 6.5 0 0 0 9.5 3 6.5 6.5 0 0 0 3 9.5c0 1.5.4 3.1 1 4.5"/>
    <path d="M9 18h6M10 22h4M8 18a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3"/>
  </svg>,
  // Formation - Book/Education icon
  <svg key="6" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <path d="M8 7h8M8 11h8"/>
  </svg>,
];

const iconColors = [
  { bg: "bg-emerald-500", text: "text-white" },
  { bg: "bg-teal-500", text: "text-white" },
  { bg: "bg-green-500", text: "text-white" },
  { bg: "bg-lime-500", text: "text-white" },
  { bg: "bg-cyan-500", text: "text-white" },
  { bg: "bg-emerald-600", text: "text-white" },
];

export default function ServiceCarousel({ services, visibleCount = 2 }: ServiceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || services.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, services.length - visibleCount + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, services.length, visibleCount]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollAmount = currentIndex * (100 / visibleCount);
      scrollContainerRef.current.style.transform = `translateX(calc(-${scrollAmount}%))`;
    }
  }, [currentIndex, visibleCount]);

  if (services.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-sm text-slate-600">
        Aucun service enregistré pour le moment.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl">
        <div
          ref={scrollContainerRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ width: `${services.length * (100 / visibleCount)}%` }}
        >
          {services.map((service, index) => {
            const color = iconColors[index % iconColors.length];
            const icon = icons[index % icons.length];

            return (
              <div
                key={service._id}
                className="flex-shrink-0 px-2 rounded-2xl"
                style={{ width: `${100 / visibleCount}%`, minHeight: "280px" }}
              >
                <div className="group h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 flex flex-col items-start gap-4">
                  <div className={`flex-shrink-0 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${color.bg} ${color.text} shadow-md transition-transform group-hover:scale-110`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mt-0 text-lg font-bold text-slate-900 leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {services.length > visibleCount && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setIsAutoPlay(false);
              setCurrentIndex(Math.max(0, currentIndex - 1));
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
            aria-label="Précédent"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {Array.from({ length: Math.max(1, services.length - visibleCount + 1) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-emerald-600"
                    : "w-2 bg-emerald-200 hover:bg-emerald-400"
                }`}
                aria-label={`Aller à la diapositive ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              setIsAutoPlay(false);
              setCurrentIndex(Math.min(services.length - visibleCount, currentIndex + 1));
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
            aria-label="Suivant"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
