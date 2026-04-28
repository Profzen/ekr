import type { Metadata } from "next";
import PublicShell from "@/components/figma/PublicShell";
import connectToDatabase from "@/lib/db";
import SiteContentModel from "@/models/SiteContent";
import "./globals.css";

const siteName = "EKR Africa Agrovision Group";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://ekr-gamma.vercel.app";
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const metadataBase = new URL(siteUrl);

  return {
    metadataBase,
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description:
      "Site institutionnel d’EKR Africa Agrovision Group : services, activités, actualités, produits, galerie media et partenaires.",
    applicationName: siteName,
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: "/logo.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
    keywords: [
      "EKR Africa Agrovision Group",
      "agrovision",
      "export agricole",
      "gingembre",
      "piment long",
      "agriculture Afrique",
      "entreprise agricole",
      "actualités agricoles",
      "galerie media",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: siteUrl,
      siteName,
      title: siteName,
      description:
        "Entreprise agricole panafricaine spécialisée dans le piment long, le gingembre, l’exportation, la structuration et l’accompagnement des producteurs.",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description:
        "EKR Africa Agrovision Group: entreprise agricole, exportation, actualités, produits et galerie media.",
      images: ["/logo.png"],
    },
  };
}

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: getSiteUrl(),
              logo: `${getSiteUrl()}/logo.png`,
              description:
                "Entreprise agricole panafricaine spécialisée dans l’exportation, la structuration des filières et l’accompagnement des producteurs.",
              sameAs: [
                socialLinkedinUrl,
                socialFacebookUrl,
                socialInstagramUrl,
                socialWhatsappUrl,
                socialXUrl,
              ].filter(Boolean),
            }),
          }}
        />
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
