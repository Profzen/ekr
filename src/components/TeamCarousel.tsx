"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TeamMember = {
  _id: string;
  name: string;
  role: string;
  photoUrl?: string;
};

type TeamCarouselProps = {
  members: TeamMember[];
};

export default function TeamCarousel({ members }: TeamCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const hasMembers = members.length > 0;
  const [isPaused, setIsPaused] = useState(false);

  const cardWidth = useMemo(() => 260, []);

  const scrollBy = (direction: "prev" | "next") => {
    if (!trackRef.current) return;
    const delta = direction === "next" ? cardWidth : -cardWidth;
    trackRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    if (!hasMembers || isPaused) return;
    const id = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const isAtEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - cardWidth / 2;
      if (isAtEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      scrollBy("next");
    }, 2000);

    return () => window.clearInterval(id);
  }, [cardWidth, hasMembers, isPaused]);

  return (
    <div className="relative -mx-2 overflow-hidden">
      {hasMembers ? (
        <div
          ref={trackRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-2 px-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {members.map((member) => (
            <div
              key={member._id}
              className="snap-center flex-shrink-0 w-[calc(100%-2rem)] sm:w-[240px] max-w-[280px] rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
            >
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border border-slate-200 bg-slate-50 flex-shrink-0">
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                    Photo
                  </div>
                )}
              </div>
              <p className="mt-4 text-base font-semibold text-slate-900">
                {member.name}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Aucune personne de l'equipe n'est encore enregistrée.
        </div>
      )}
    </div>
  );
}
