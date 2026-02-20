import connectToDatabase from "@/lib/db";
import ServiceModel from "@/models/Service";
import SiteContentModel from "@/models/SiteContent";
import TeamMemberModel from "@/models/TeamMember";
import { ServicesCarousel } from "@/components/figma/presentation/ServicesCarousel";
import { TeamCarousel } from "@/components/figma/home/TeamCarousel";
import { MapPin, Phone, Mail, Linkedin, Facebook, Instagram, MessageCircle, Twitter } from "lucide-react";

export const dynamic = "force-dynamic";

const figmaContent = {
  intro: {
    title: "Une Vision Durable pour l'Agriculture Africaine",
    text:
      "Nous croyons en une agriculture qui respecte la terre et valorise l'humain. EKR Africa Agrovision Group s'engage à structurer les filières agricoles, garantir la qualité de nos produits et accompagner les porteurs de projets innovants.",
  },
  contact: {
    address: "Zone Industrielle, Abidjan, Côte d'Ivoire",
    phone: "+225 07 00 00 00 00",
    email: "contact@ekrafrica.com",
  },
};

const figmaServices = [
  {
    id: "1",
    title: "Production & Collecte",
    description:
      "Encadrement technique des producteurs et collecte rigoureuse de piment long et gingembre pour garantir une qualité premium.",
    imageUrl:
      "https://images.unsplash.com/photo-1762245289207-cf35224bb727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "Exportation Internationale",
    description:
      "Logistique maîtrisée et conformité aux normes internationales pour l'exportation vers l'Europe, l'Asie et l'Amérique.",
    imageUrl:
      "https://images.unsplash.com/photo-1596434220574-9af8bf9a0891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "Transformation Agroalimentaire",
    description:
      "Valorisation des matières premières par des processus de séchage et de transformation respectant les standards d'hygiène.",
    imageUrl:
      "https://images.unsplash.com/photo-1717769071502-e9b5d06c5fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "4",
    title: "Incubation de Projets",
    description:
      "Accompagnement, formation et financement de jeunes agri-preneurs pour développer l'écosystème local.",
    imageUrl:
      "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const figmaTeam = [
  {
    id: "1",
    name: "Sarah Kouassi",
    role: "Responsable Export",
    imageUrl:
      "https://images.unsplash.com/photo-1758519289200-384c7ef2d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    name: "Michel Yao",
    role: "Chef d'Exploitation",
    imageUrl:
      "https://images.unsplash.com/photo-1688240818501-2881b90f1b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    name: "Amina Diop",
    role: "Responsable Qualité",
    imageUrl:
      "https://images.unsplash.com/photo-1717769071502-e9b5d06c5fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

export default async function PresentationPage() {
  let services: Array<{ _id: string; title: string; description: string; imageUrl?: string }> = [];
  let team: Array<{ _id: string; name: string; role: string; photoUrl?: string }> = [];
  let content: {
    presentationAbout?: string;
    presentationVision?: string;
    presentationMission?: string;
    presentationValues?: string;
    presentationHistoryTitle?: string;
    presentationHistoryParagraph1?: string;
    presentationHistoryParagraph2?: string;
    presentationHistoryStatYear?: string;
    presentationHistoryStatYearLabel?: string;
    presentationHistoryStatJobs?: string;
    presentationHistoryStatJobsLabel?: string;
    contactAddress?: string;
    contactPhone?: string;
    contactEmail?: string;
    socialLinkedinUrl?: string;
    socialFacebookUrl?: string;
    socialInstagramUrl?: string;
    socialWhatsappUrl?: string;
    socialXUrl?: string;
  } | null = null;

  try {
    await connectToDatabase();
    const [fetchedServices, fetchedTeam, fetchedContent] = await Promise.all([
      ServiceModel.find({ isActive: true })
        .sort({ order: 1, createdAt: -1 })
        .lean(),
      TeamMemberModel.find({ isActive: true })
        .sort({ order: 1, createdAt: -1 })
        .lean(),
      SiteContentModel.findOne().lean(),
    ]);

    services = fetchedServices.map((service) => ({
      _id: service._id.toString(),
      title: service.title,
      description: service.description,
      imageUrl: service.imageUrl,
    }));

    team = fetchedTeam.map((member) => ({
      _id: member._id.toString(),
      name: member.name,
      role: member.role,
      photoUrl: member.photoUrl,
    }));

    content = fetchedContent
      ? {
          presentationAbout: fetchedContent.presentationAbout,
          presentationVision: fetchedContent.presentationVision,
          presentationMission: fetchedContent.presentationMission,
          presentationValues: fetchedContent.presentationValues,
          presentationHistoryTitle: fetchedContent.presentationHistoryTitle,
          presentationHistoryParagraph1: fetchedContent.presentationHistoryParagraph1,
          presentationHistoryParagraph2: fetchedContent.presentationHistoryParagraph2,
          presentationHistoryStatYear: fetchedContent.presentationHistoryStatYear,
          presentationHistoryStatYearLabel: fetchedContent.presentationHistoryStatYearLabel,
          presentationHistoryStatJobs: fetchedContent.presentationHistoryStatJobs,
          presentationHistoryStatJobsLabel: fetchedContent.presentationHistoryStatJobsLabel,
          contactAddress: fetchedContent.contactAddress,
          contactPhone: fetchedContent.contactPhone,
          contactEmail: fetchedContent.contactEmail,
          socialLinkedinUrl: fetchedContent.socialLinkedinUrl,
          socialFacebookUrl: fetchedContent.socialFacebookUrl,
          socialInstagramUrl: fetchedContent.socialInstagramUrl,
          socialWhatsappUrl: fetchedContent.socialWhatsappUrl,
          socialXUrl: fetchedContent.socialXUrl,
        }
      : null;
  } catch (error) {
    services = [];
    team = [];
    content = null;
  }

  const defaultServices = figmaServices.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    imageUrl: service.imageUrl,
  }));

  const dbServices = services.map((service, index) => {
    const fallback = figmaServices[index % figmaServices.length];
    return {
      id: service._id,
      title: service.title,
      description: service.description,
      imageUrl: service.imageUrl || fallback.imageUrl,
    };
  });

  const seenServiceTitles = new Set<string>();
  const resolvedServices = [...dbServices, ...defaultServices].filter((service) => {
    const key = service.title.trim().toLowerCase();
    if (seenServiceTitles.has(key)) return false;
    seenServiceTitles.add(key);
    return true;
  });

  const resolvedTeam = (team.length ? team : figmaTeam).map((member, index) => {
    const fallback = figmaTeam[index % figmaTeam.length];
    return {
      id: "_id" in member ? member._id : fallback.id,
      name: member.name,
      role: member.role,
      imageUrl: "photoUrl" in member ? member.photoUrl || fallback.imageUrl : fallback.imageUrl,
    };
  });

  return (
    <div className="pt-16 md:pt-24 bg-background min-h-screen">
      <section className="py-32 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px] relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-foreground">
                {content?.presentationVision || figmaContent.intro.title}
              </h1>
              <div className="flex justify-center">
                <div className="h-1 w-24 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
              {content?.presentationAbout || figmaContent.intro.text}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto opacity-90">
              Chaque projet, chaque producteur partenaire fait partie de notre écosystème d'excellence au service de l'agriculture africaine.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Nos Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une expertise intégrée pour répondre aux défis agricoles de demain.
            </p>
          </div>
          <ServicesCarousel services={resolvedServices} />
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="space-y-8 lg:sticky lg:top-32">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                {content?.presentationHistoryTitle || "Notre Histoire"}
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  {content?.presentationHistoryParagraph1 ||
                    "Fondée avec la conviction que l'agriculture est le moteur du développement économique africain, EKR Africa Agrovision Group s'est donné pour mission de structurer les filières agricoles à fort potentiel."}
                </p>
                <p>
                  {content?.presentationHistoryParagraph2 ||
                    "En quelques années, nous avons tissé un réseau solide de plus de 150 producteurs partenaires, garantissant une traçabilité totale et une qualité irréprochable de nos produits."}
                </p>
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-border/50 my-8">
                  <div>
                    <span className="block text-4xl font-bold text-primary mb-2">{content?.presentationHistoryStatYear || "2018"}</span>
                    <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{content?.presentationHistoryStatYearLabel || "Année de création"}</span>
                  </div>
                  <div>
                    <span className="block text-4xl font-bold text-primary mb-2">{content?.presentationHistoryStatJobs || "500+"}</span>
                    <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{content?.presentationHistoryStatJobsLabel || "Emplois indirects"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <TeamCarousel members={resolvedTeam} />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Contactez-nous</h2>
              <p className="text-xl opacity-90 leading-relaxed font-light">
                Vous avez un projet ? Une question sur nos produits ? Notre équipe est à votre écoute.
              </p>

              <div className="space-y-6 pt-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Adresse</h3>
                    <p className="opacity-80">
                      {content?.contactAddress || figmaContent.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Téléphone</h3>
                    <p className="opacity-80">
                      {content?.contactPhone || figmaContent.contact.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="opacity-80">
                      {content?.contactEmail || figmaContent.contact.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <a
                  href={content?.socialLinkedinUrl || "#"}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={content?.socialFacebookUrl || "#"}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href={content?.socialInstagramUrl || "#"}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href={content?.socialWhatsappUrl || "#"}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={24} />
                </a>
                <a
                  href={content?.socialXUrl || "#"}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="X"
                >
                  <Twitter size={24} />
                </a>
              </div>
            </div>

            <div className="bg-white text-foreground rounded-2xl p-8 shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom complet</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="votre@email.com"
                    />
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
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Comment pouvons-nous vous aider ?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
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
