"use client";

import { Share2, Printer } from "lucide-react";

type ArticleActionsProps = {
  title: string;
};

export function ArticleActions({ title }: ArticleActionsProps) {
  const handleShare = async () => {
    const shareData = {
      title,
      text: title,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papiers.");
    } catch {
      alert("Impossible de partager pour le moment.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex justify-end gap-4 mb-8 pb-8 border-b border-border/50">
      <button
        type="button"
        onClick={handleShare}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <Share2 size={16} /> Partager
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <Printer size={16} /> Imprimer
      </button>
    </div>
  );
}
