"use client";

import { useMemo, useRef } from "react";

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

  const cardWidth = useMemo(() => 260, []);

  const scrollBy = (direction: "prev" | "next") => {
    if (!trackRef.current) return;
    const delta = direction === "next" ? cardWidth : -cardWidth;
    trackRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {hasMembers ? (
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-2"
        >
          {members.map((member) => (
            <div
              key={member._id}
              className="snap-start min-w-[240px] rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
            >
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border border-slate-200 bg-slate-50">
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
      {hasMembers && (
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollBy("prev")}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600"
          >
            Precedent
          </button>
          <button
            type="button"
            onClick={() => scrollBy("next")}
            className="rounded-full border border-emerald-200 bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
