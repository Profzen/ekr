import { Link } from 'react-router';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">EKR Africa</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Une coopérative visionnaire dédiée à la valorisation des filières agricoles africaines. 
              Excellence, durabilité et innovation.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-accent">Navigation</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/presentation" className="hover:text-white transition-colors">Présentation</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Nos Services</Link></li>
              <li><Link to="/articles" className="hover:text-white transition-colors">Actualités</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
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

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6 text-accent">Contact</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5 text-accent" />
                <span>Zone Industrielle de Yopougon,<br />Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-accent" />
                <span>+225 07 00 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-accent" />
                <span>contact@ekrafrica.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-60 gap-4">
          <p>© {new Date().getFullYear()} EKR Africa Agrovision Group. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/legal" className="hover:text-white">Mentions Légales</Link>
            <Link to="/privacy" className="hover:text-white">Politique de Confidentialité</Link>
            <Link to="/admin" className="hover:text-white">Espace Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
