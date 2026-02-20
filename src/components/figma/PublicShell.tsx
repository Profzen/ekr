"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/figma/Header";
import { Footer } from "@/components/figma/Footer";

type PublicShellProps = {
  children: React.ReactNode;
  contactAddress?: string;
  contactPhone?: string;
  contactEmail?: string;
  socialLinkedinUrl?: string;
  socialFacebookUrl?: string;
  socialInstagramUrl?: string;
  socialWhatsappUrl?: string;
  socialXUrl?: string;
};

export default function PublicShell({
  children,
  contactAddress,
  contactPhone,
  contactEmail,
  socialLinkedinUrl,
  socialFacebookUrl,
  socialInstagramUrl,
  socialWhatsappUrl,
  socialXUrl,
}: PublicShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="flex-grow pt-0">{children}</main>
      <Footer
        contactAddress={contactAddress}
        contactPhone={contactPhone}
        contactEmail={contactEmail}
        socialLinkedinUrl={socialLinkedinUrl}
        socialFacebookUrl={socialFacebookUrl}
        socialInstagramUrl={socialInstagramUrl}
        socialWhatsappUrl={socialWhatsappUrl}
        socialXUrl={socialXUrl}
      />
    </div>
  );
}
