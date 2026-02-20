import type { Metadata } from "next";
import PublicShell from "@/components/figma/PublicShell";
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
  let socialLinkedinUrl = "";
  let socialFacebookUrl = "";
  let socialInstagramUrl = "";
  let socialWhatsappUrl = "";
  let socialXUrl = "";

  try {
    await connectToDatabase();
    const content = await SiteContentModel.findOne().lean();
    contactAddress = content?.contactAddress || contactAddress;
    contactPhone = content?.contactPhone || contactPhone;
    contactEmail = content?.contactEmail || contactEmail;
    socialLinkedinUrl = content?.socialLinkedinUrl || "";
    socialFacebookUrl = content?.socialFacebookUrl || "";
    socialInstagramUrl = content?.socialInstagramUrl || "";
    socialWhatsappUrl = content?.socialWhatsappUrl || "";
    socialXUrl = content?.socialXUrl || "";
  } catch (error) {
    // Fallback to env defaults when DB is unavailable.
  }

  return (
    <html lang="fr">
      <body className="antialiased">
        <PublicShell
          contactAddress={contactAddress}
          contactPhone={contactPhone}
          contactEmail={contactEmail}
          socialLinkedinUrl={socialLinkedinUrl}
          socialFacebookUrl={socialFacebookUrl}
          socialInstagramUrl={socialInstagramUrl}
          socialWhatsappUrl={socialWhatsappUrl}
          socialXUrl={socialXUrl}
        >
          {children}
        </PublicShell>
      </body>
    </html>
  );
}
