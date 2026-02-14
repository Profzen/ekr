"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Partner = {
  _id: string;
  name: string;
  logoUrl?: string;
};

type PartnersCarouselProps = {
  partners: Partner[];
};

export default function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const hasPartners = partners.length > 0;
  const [isPaused, setIsPaused] = useState(false);

  const cardWidth = useMemo(() => 260, []);

  const scrollNext = () => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  useEffect(() => {
    if (!hasPartners || isPaused) return;
    const id = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const isAtEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - cardWidth / 2;
      if (isAtEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      scrollNext();
    }, 2000);

    return () => window.clearInterval(id);
  }, [cardWidth, hasPartners, isPaused]);

  if (!hasPartners) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600">
        Aucun partenaire enregistre pour le moment.
      </div>
    );
  }

  return (
    <div
      ref={trackRef}
      className="hide-scrollbar mt-6 flex gap-4 overflow-x-auto pb-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {partners.map((partner) => (
        <div
          key={partner._id}
          className="min-w-[240px] h-60 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm flex flex-col items-center text-center"
        >
          {partner.logoUrl ? (
            <img
              src={partner.logoUrl}
              alt={partner.name}
              className="h-44 w-44 rounded-lg object-contain"
            />
          ) : null}
          <span className="text-base leading-tight">{partner.name}</span>
        </div>
      ))}
    </div>
  );
}
