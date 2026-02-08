import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "EKR Africa Agrovision Group",
  description:
    "Site institutionnel d’EKR Africa Agrovision Group : services, activités, actualités et partenaires.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-white text-slate-900">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold">
                  E
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    EKR AFRICA AGROVISION GROUP
                  </p>
                  <p className="text-xs text-slate-500">
                    Cultivating Africa’s Future
                  </p>
                </div>
              </Link>
              <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
                <Link href="/" className="transition hover:text-emerald-700">
                  Accueil
                </Link>
                <Link
                  href="/presentation-services-contact"
                  className="transition hover:text-emerald-700"
                >
                  Services
                </Link>
                <Link
                  href="/articles-galerie"
                  className="transition hover:text-emerald-700"
                >
                  Articles
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto w-full max-w-6xl px-6 py-10">
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">EKR AFRICA AGROVISION GROUP</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Cabinet de conseil, d’accompagnement et de développement des activités agricoles en Afrique.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Coordonnées</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Abidjan, Côte d’Ivoire
                    <br />
                    +225 00 00 00 00
                    <br />
                    contact@ekr-africa.com
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Informations utiles</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    <li>Politique de confidentialité</li>
                    <li>Mentions légales</li>
                    <li>Suivi des projets agricoles</li>
                  </ul>
                </div>
              </div>
              <p className="mt-8 text-xs text-slate-500">
                © {new Date().getFullYear()} EKR Africa Agrovision Group. Tous droits réservés.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
