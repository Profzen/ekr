import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import connectToDatabase from "@/lib/db";
import SiteContentModel from "@/models/SiteContent";
import "./globals.css";

export const metadata: Metadata = {
  title: "EKR Africa Agrovision Group",
  description:
    "Site institutionnel d’EKR Africa Agrovision Group : services, activités, actualités et partenaires.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let contactAddress = process.env.NEXT_PUBLIC_SITE_ADDRESS || "Abidjan, Côte d’Ivoire";
  let contactPhone = process.env.NEXT_PUBLIC_SITE_PHONE || "+225 00 00 00 00";
  let contactEmail = process.env.NEXT_PUBLIC_SITE_EMAIL || "contact@ekr-africa.com";

  try {
    await connectToDatabase();
    const content = await SiteContentModel.findOne().lean();
    contactAddress = content?.contactAddress || contactAddress;
    contactPhone = content?.contactPhone || contactPhone;
    contactEmail = content?.contactEmail || contactEmail;
  } catch (error) {
    // Fallback to env defaults when DB is unavailable.
  }

  return (
    <html lang="fr">
      <body className="antialiased bg-white text-slate-900">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-emerald-900/20 bg-stone-900 text-stone-200">
            <div className="mx-auto w-full max-w-7xl px-3 py-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <p className="text-sm font-semibold tracking-wide text-emerald-300">EKR AFRICA AGROVISION GROUP</p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300">
                    Société coopérative agricole d’accompagnement et de développement des filières agricoles.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-300">Coordonnées</p>
                  <p className="mt-3 text-sm leading-6 text-stone-300">
                    {contactAddress}
                    <br />
                    {contactPhone}
                    <br />
                    {contactEmail}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-300">Informations utiles</p>
                  <ul className="mt-3 space-y-2 text-sm text-stone-300">
                    <li>Politique de confidentialité</li>
                    <li>Mentions légales</li>
                    <li>Suivi des projets agricoles</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 border-t border-stone-700/80 pt-5">
                <p className="text-xs text-stone-400">
                  © {new Date().getFullYear()} EKR Africa Agrovision Group. Tous droits réservés.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
