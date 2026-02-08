import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
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
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto w-full max-w-7xl px-2 py-10">
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
                    {process.env.NEXT_PUBLIC_SITE_ADDRESS || "Abidjan, Côte d’Ivoire"}
                    <br />
                    {process.env.NEXT_PUBLIC_SITE_PHONE || "+225 00 00 00 00"}
                    <br />
                    {process.env.NEXT_PUBLIC_SITE_EMAIL || "contact@ekr-africa.com"}
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
