"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/presentation-services-contact", label: "Services" },
  { href: "/articles-galerie", label: "Articles" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold">
            E
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              EKR AFRICA AGROVISION GROUP
            </p>
            <p className="text-xs text-slate-500">Cultivating Africa’s Future</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-emerald-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 md:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="mx-auto w-full max-w-7xl px-3 pb-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 text-sm font-medium text-slate-700">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2 hover:bg-emerald-50"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
