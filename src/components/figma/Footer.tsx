import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, MessageCircle, Twitter } from "lucide-react";

type FooterProps = {
  contactAddress?: string;
  contactPhone?: string;
  contactEmail?: string;
  socialLinkedinUrl?: string;
  socialFacebookUrl?: string;
  socialInstagramUrl?: string;
  socialWhatsappUrl?: string;
  socialXUrl?: string;
};

export function Footer({
  contactAddress = "Zone Industrielle de Yopougon, Abidjan, Côte d'Ivoire",
  contactPhone = "+225 07 00 00 00 00",
  contactEmail = "contact@ekrafrica.com",
  socialLinkedinUrl = "#",
  socialFacebookUrl = "#",
  socialInstagramUrl = "#",
  socialWhatsappUrl = "#",
  socialXUrl = "#",
}: FooterProps) {
  const addressLines = contactAddress.split(", ");

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <img
              src="/logo.jpeg"
              alt="EKR Africa Agrovision Group"
              className="h-16 w-auto rounded-2xl object-contain"
            />
            <p className="text-sm opacity-80 leading-relaxed">
              Une coopérative visionnaire dédiée à la valorisation des filières agricoles africaines.
              Excellence, durabilité et innovation.
            </p>
            <div className="flex gap-4 pt-4">
              <a href={socialLinkedinUrl || "#"} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={socialFacebookUrl || "#"} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href={socialInstagramUrl || "#"} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href={socialWhatsappUrl || "#"} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
              <a href={socialXUrl || "#"} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="X">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-accent">Navigation</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              </li>
              <li>
                <Link href="/presentation" className="hover:text-white transition-colors">Présentation</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Nos Services</Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white transition-colors">Actualités</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-accent">Expertise</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li>Production Agricole</li>
              <li>Transformation</li>
              <li>Export International</li>
              <li>Conseil & Incubation</li>
              <li>Logistique</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-accent">Contact</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5 text-accent" />
                <span>
                  {addressLines.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < addressLines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-accent" />
                <span>{contactPhone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-accent" />
                <span>{contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-60 gap-4">
          <p>© {new Date().getFullYear()} EKR Africa Agrovision Group. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/legal" className="hover:text-white">Mentions Légales</Link>
            <Link href="/privacy" className="hover:text-white">Politique de Confidentialité</Link>
            <Link href="/admin" className="hover:text-white">Espace Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
