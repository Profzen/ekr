"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductCardLinkProps = {
  href: string;
  title: string;
  form: string;
  description: string;
  imageUrl: string;
};

export function ProductCardLink({
  href,
  title,
  form,
  description,
  imageUrl,
}: ProductCardLinkProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        if (isLoading) return;
        setIsLoading(true);
        router.push(href);
      }}
      disabled={isLoading}
      className="group relative block w-full text-left bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 h-full transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-90"
      aria-label={`Ouvrir ${title} ${form}`}
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={imageUrl || "/agro2.jpg"}
          alt={`${title} ${form}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-foreground">{title}</h3>
        <p className="text-sm font-semibold mb-3 text-primary">{form}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/65 backdrop-blur-[1px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Chargement...
          </span>
        </div>
      )}
    </button>
  );
}
