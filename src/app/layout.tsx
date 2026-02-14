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
          <footer className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto w-full max-w-7xl px-1 py-10">
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
                    {contactAddress}
                    <br />
                    {contactPhone}
                    <br />
                    {contactEmail}
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
