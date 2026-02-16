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
          <footer className="relative overflow-hidden border-t border-emerald-900/30 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 pt-20 pb-10">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-emerald-800 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            <div className="relative mx-auto w-full max-w-7xl px-3">
              <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                <div className="group transform transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="inline-block h-1 w-20 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full mb-4 transform transition-all duration-500 group-hover:w-32 group-hover:shadow-lg group-hover:shadow-emerald-500/50"></div>
                  <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 tracking-wide uppercase">EKR AFRICA</p>
                  <p className="mt-3 text-sm leading-relaxed text-emerald-100/80 group-hover:text-emerald-100 transition-colors duration-300">
                    Societé coopérative d'accompagnement agricole en Afrique.
                  </p>
                </div>
                <div className="group transform transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="inline-block h-1 w-20 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-full mb-4 transform transition-all duration-500 group-hover:w-28 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                  <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 tracking-wide uppercase">Coordonnees</p>
                  <div className="mt-3 space-y-2 text-sm text-emerald-100/70 group-hover:text-emerald-100 transition-colors duration-300">
                    <p className="flex items-start gap-2">
                      <span className="inline-block w-1 h-1 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{contactAddress}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="inline-block w-1 h-1 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{contactPhone}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="inline-block w-1 h-1 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{contactEmail}</span>
                    </p>
                  </div>
                </div>
                <div className="group transform transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="inline-block h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-4 transform transition-all duration-500 group-hover:w-32 group-hover:shadow-lg group-hover:shadow-teal-500/50"></div>
                  <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300 tracking-wide uppercase">Ressources</p>
                  <ul className="mt-3 space-y-2 text-sm text-emerald-100/70">
                    <li className="hover:text-emerald-300 transition-colors duration-300 cursor-pointer flex items-center gap-2">
                      <span className="inline-block w-0.5 h-0.5 bg-emerald-400 rounded-full"></span>
                      Politique de confidentialite
                    </li>
                    <li className="hover:text-emerald-300 transition-colors duration-300 cursor-pointer flex items-center gap-2">
                      <span className="inline-block w-0.5 h-0.5 bg-emerald-400 rounded-full"></span>
                      Mentions legales
                    </li>
                    <li className="hover:text-emerald-300 transition-colors duration-300 cursor-pointer flex items-center gap-2">
                      <span className="inline-block w-0.5 h-0.5 bg-emerald-400 rounded-full"></span>
                      Suivi des projets
                    </li>
                  </ul>
                </div>
                <div className="group transform transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="inline-block h-1 w-20 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full mb-4 transform transition-all duration-500 group-hover:w-24 group-hover:shadow-lg group-hover:shadow-teal-500/50"></div>
                  <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300 tracking-wide uppercase">Suivez-nous</p>
                  <div className="mt-4 flex gap-3">
                    <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900/50 border border-emerald-700/50 text-emerald-400 transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-400 hover:text-white hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-110" aria-label="X">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.5 4h3.2l2.7 3.7L12.8 4H15l-3.9 5.3 4.4 6.7h-3.2l-2.9-4-3.1 4H4l4.6-6.3L4.5 4z" />
                      </svg>
                    </a>
                    <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900/50 border border-emerald-700/50 text-emerald-400 transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-400 hover:text-white hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-110" aria-label="Facebook">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 8h2V5h-2c-2.2 0-3.5 1.4-3.5 3.5V11H8v3h2.5v5H14v-5h2.1l.4-3H14V8.6c0-.4.3-.6.6-.6z" />
                      </svg>
                    </a>
                    <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900/50 border border-emerald-700/50 text-emerald-400 transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-400 hover:text-white hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-110" aria-label="LinkedIn">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM9 17H7v-7h2v7zm-1-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 8h-2v-3.5c0-.83-.67-1.5-1.5-1.5S11 12.67 11 13.5V17h-2v-7h2v.75c.42-.58 1.16-1.08 2-1.08 1.93 0 3.5 1.57 3.5 3.5V17z" />
                      </svg>
                    </a>
                    <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900/50 border border-emerald-700/50 text-emerald-400 transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-400 hover:text-white hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-110" aria-label="Instagram">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="16" rx="4" ry="4" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17" cy="7" r="1.5" fill="currentColor" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-emerald-900/30 pt-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-emerald-100/60">
                    © {new Date().getFullYear()} EKR Africa Agrovision Group. Tous droits reserves.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-emerald-100/60">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Actuellement en ligne · Côte d'Ivoire</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
