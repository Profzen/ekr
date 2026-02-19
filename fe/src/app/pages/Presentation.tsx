import { siteContent, services } from "../../lib/data";
import { Team } from "../components/Team";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MapPin, Phone, Mail, Linkedin, Facebook, Instagram } from "lucide-react";

export function Presentation() {
  const serviceSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <div className="pt-24 bg-background min-h-screen">
      
      {/* Intro */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              {siteContent.intro.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              {siteContent.intro.text}
            </p>
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Nos Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une expertise intégrée pour répondre aux défis agricoles de demain.
            </p>
          </div>
          
          <Slider {...serviceSettings} className="services-slider px-4">
            {services.map((service) => (
              <div key={service.id} className="px-4 py-8 outline-none">
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 h-full">
                  <div className="h-48 overflow-hidden relative">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-primary">
                      <service.icon size={20} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Company + Team Split */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Company Info */}
            <div className="space-y-8 sticky top-32">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Notre Histoire</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  Fondée avec la conviction que l'agriculture est le moteur du développement économique africain, 
                  EKR Africa Agrovision Group s'est donné pour mission de structurer les filières agricoles à fort potentiel.
                </p>
                <p>
                  En quelques années, nous avons tissé un réseau solide de plus de 150 producteurs partenaires, 
                  garantissant une traçabilité totale et une qualité irréprochable de nos produits.
                </p>
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-border/50 my-8">
                  <div>
                    <span className="block text-4xl font-bold text-primary mb-2">2018</span>
                    <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Année de création</span>
                  </div>
                  <div>
                    <span className="block text-4xl font-bold text-primary mb-2">500+</span>
                    <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Emplois indirects</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Component (Reused/Embedded) */}
            <div>
              <Team /> 
            </div>
            
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Info */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Contactez-nous</h2>
              <p className="text-xl opacity-90 leading-relaxed font-light">
                Vous avez un projet ? Une question sur nos produits ? 
                Notre équipe est à votre écoute.
              </p>
              
              <div className="space-y-6 pt-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Adresse</h3>
                    <p className="opacity-80">{siteContent.contact.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Téléphone</h3>
                    <p className="opacity-80">{siteContent.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="opacity-80">{siteContent.contact.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white text-foreground rounded-2xl p-8 shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom complet</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Votre nom" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="votre@email.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sujet</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none">
                    <option>Demande de partenariat</option>
                    <option>Information produit</option>
                    <option>Candidature</option>
                    <option>Autre</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                </div>
                
                <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  Envoyer le message
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
