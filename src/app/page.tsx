import connectToDatabase from "@/lib/db";
import ArticleModel from "@/models/Article";
import ServiceModel from "@/models/Service";
import PartnerModel from "@/models/Partner";
import DirectorProfileModel from "@/models/DirectorProfile";
import ActivityModel from "@/models/Activity";
import SiteContentModel from "@/models/SiteContent";
import { Hero } from "@/components/figma/home/Hero";
import { Stats } from "@/components/figma/home/Stats";
import { Intro } from "@/components/figma/home/Intro";
import { Services } from "@/components/figma/home/Services";
import { CEO } from "@/components/figma/home/CEO";
import { Activities } from "@/components/figma/home/Activities";
import { ArticlesPreview } from "@/components/figma/home/ArticlesPreview";
import { Partners } from "@/components/figma/home/Partners";

export const dynamic = "force-dynamic";

const figmaContent = {
  hero: {
    title: "L'Excellence Agricole au Service du Développement",
    subtitle:
      "EKR Africa Agrovision Group : Une coopérative visionnaire dédiée à la valorisation des filières piment long et gingembre, de la production à l'exportation.",
    ctaPrimary: "Découvrir nos services",
    ctaSecondary: "Nous contacter",
    image:
      "https://images.unsplash.com/photo-1688240818501-2881b90f1b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  intro: {
    title: "Une Vision Durable pour l'Agriculture Africaine",
    text:
      "Nous croyons en une agriculture qui respecte la terre et valorise l'humain. EKR Africa Agrovision Group s'engage à structurer les filières agricoles, garantir la qualité de nos produits et accompagner les porteurs de projets innovants.",
    stats: [
      { id: 1, value: "150+", label: "Producteurs Partenaires" },
      { id: 2, value: "500T", label: "Volume Exporté Annuel" },
      { id: 3, value: "12", label: "Pays de Destination" },
      { id: 4, value: "95%", label: "Satisfaction Client" },
    ],
  },
  mission: {
    title: "Notre Mission",
    text:
      "Transformer le potentiel agricole africain en réussite économique durable par l'excellence opérationnelle et l'innovation sociale.",
  },
  vision: {
    title: "Notre Vision",
    text:
      "Devenir la référence panafricaine dans l'exportation de produits agricoles premium et l'incubation de talents.",
  },
  values: {
    title: "Nos Valeurs",
    list: ["Intégrité", "Excellence", "Responsabilité", "Innovation"],
  },
  ceo: {
    name: "Jean-Marc Kabore",
    title: "Directeur Général",
    bio:
      "Fort de 20 ans d'expérience dans l'agrobusiness international, Jean-Marc pilote la stratégie de croissance d'EKR avec une vision humaniste et rigoureuse.",
    quote: "L'agriculture est le socle de notre avenir. La valoriser, c'est construire l'Afrique de demain.",
    image:
      "https://images.unsplash.com/photo-1758519289200-384c7ef2d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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

const figmaArticles = [
  {
    id: "1",
    title: "La demande mondiale de gingembre en hausse",
    date: "12 Octobre 2023",
    excerpt:
      "Analyse des tendances du marché et opportunités pour les producteurs africains dans la filière gingembre.",
    category: "Marché",
    imageUrl:
      "https://images.unsplash.com/photo-1717769071502-e9b5d06c5fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "EKR lance son programme d'incubation 2024",
    date: "05 Novembre 2023",
    excerpt:
      "Un appel à candidature pour soutenir 50 nouveaux projets agricoles innovants en Côte d'Ivoire.",
    category: "Institutionnel",
    imageUrl:
      "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "Les bienfaits du Piment Long",
    date: "20 Janvier 2024",
    excerpt: "Au-delà de son goût, le piment long possède des vertus médicinales reconnues.",
    category: "Produit",
    imageUrl:
      "https://images.unsplash.com/photo-1762245289207-cf35224bb727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "4",
    title: "Structuration des filières : cap sur 2026",
    date: "08 Février 2026",
    excerpt:
      "Retour sur les actions menées pour renforcer la qualité, la traçabilité et l'accès au marché pour les producteurs partenaires.",
    category: "Coopérative",
    imageUrl:
      "https://images.unsplash.com/photo-1596434220574-9af8bf9a0891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const figmaPartners = [
  { id: "1", name: "AgriTech Solutions" },
  { id: "2", name: "Global Logistics" },
  { id: "3", name: "BioCert International" },
  { id: "4", name: "Banque Agricole" },
  { id: "5", name: "Coopérative Sud" },
];

const formatDate = (value?: Date | null) =>
  value
    ? new Date(value).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

export default async function Home() {
  let services: Array<{ _id: string; title: string; description: string; imageUrl?: string }> = [];
  let partners: Array<{ _id: string; name: string; logoUrl?: string }> = [];
  let articles: Array<{
    _id: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    slug?: string;
    category?: string;
    publishedAt?: Date | null;
  }> = [];
  let activities: Array<{
    _id: string;
    title: string;
    description: string;
    icon: string;
  }> = [];
  let director: {
    name?: string;
    title?: string;
    photoUrl?: string;
    bio?: string;
    message?: string;
  } | null = null;
  let content: {
    heroTitle?: string;
    heroSubtitle?: string;
    introTitle?: string;
    introText?: string;
    homeHeroIntro?: string;
    homeHeroBackgroundUrl?: string;
    homeStat1Value?: string;
    homeStat1Label?: string;
    homeStat2Value?: string;
    homeStat2Label?: string;
    homeStat3Value?: string;
    homeStat3Label?: string;
    homeStat4Value?: string;
    homeStat4Label?: string;
    homeAbout?: string;
    presentationVision?: string;
    presentationMission?: string;
    presentationValues?: string;
  } | null = null;

  try {
    await connectToDatabase();

    const [fetchedServices, fetchedPartners, fetchedArticles, fetchedActivities, fetchedDirector, fetchedContent] =
      await Promise.all([
        ServiceModel.find({ isActive: true })
          .sort({ order: 1, createdAt: -1 })
          .limit(6)
          .lean(),
        PartnerModel.find({ isActive: true })
          .sort({ order: 1, createdAt: -1 })
          .lean(),
        ArticleModel.find({ status: "published" })
          .sort({ publishedAt: -1, createdAt: -1 })
          .limit(4)
          .lean(),
        ActivityModel.find({ isActive: true })
          .sort({ order: 1, createdAt: -1 })
          .lean(),
        DirectorProfileModel.findOne().lean(),
        SiteContentModel.findOne().lean(),
      ]);

    services = fetchedServices.map((service) => ({
      _id: service._id.toString(),
      title: service.title,
      description: service.description,
      imageUrl: service.imageUrl,
    }));

    partners = fetchedPartners.map((partner) => ({
      _id: partner._id.toString(),
      name: partner.name,
      logoUrl: partner.logoUrl,
    }));

    articles = fetchedArticles.map((article) => ({
      _id: article._id.toString(),
      title: article.title,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      slug: article.slug,
      category: article.category,
      publishedAt: article.publishedAt,
    }));

    activities = fetchedActivities.map((activity) => ({
      _id: activity._id.toString(),
      title: activity.title,
      description: activity.description,
      icon: activity.icon,
    }));

    director = fetchedDirector
      ? {
          name: fetchedDirector.name,
          title: fetchedDirector.title,
          photoUrl: fetchedDirector.photoUrl,
          bio: fetchedDirector.bio,
          message: fetchedDirector.message,
        }
      : null;

    content = fetchedContent
      ? {
          heroTitle: fetchedContent.heroTitle,
          heroSubtitle: fetchedContent.heroSubtitle,
          introTitle: fetchedContent.introTitle,
          introText: fetchedContent.introText,
          homeHeroIntro: fetchedContent.homeHeroIntro,
          homeHeroBackgroundUrl: fetchedContent.homeHeroBackgroundUrl,
          homeStat1Value: fetchedContent.homeStat1Value,
          homeStat1Label: fetchedContent.homeStat1Label,
          homeStat2Value: fetchedContent.homeStat2Value,
          homeStat2Label: fetchedContent.homeStat2Label,
          homeStat3Value: fetchedContent.homeStat3Value,
          homeStat3Label: fetchedContent.homeStat3Label,
          homeStat4Value: fetchedContent.homeStat4Value,
          homeStat4Label: fetchedContent.homeStat4Label,
          homeAbout: fetchedContent.homeAbout,
          presentationVision: fetchedContent.presentationVision,
          presentationMission: fetchedContent.presentationMission,
          presentationValues: fetchedContent.presentationValues,
        }
      : null;
  } catch (error) {
    services = [];
    partners = [];
    articles = [];
    activities = [];
    director = null;
    content = null;
  }

  const resolvedServices = Array.from({ length: 4 }).map((_, index) => {
    const service = services[index];
    const fallback = figmaServices[index % figmaServices.length];
    return {
      id: service?._id ?? fallback.id,
      title: service?.title ?? fallback.title,
      description: service?.description ?? fallback.description,
      imageUrl: service?.imageUrl || fallback.imageUrl,
    };
  });

  const resolvedArticles = Array.from({ length: 4 }).map((_, index) => {
    const article = articles[index];
    const fallback = figmaArticles[index % figmaArticles.length];
    return {
      id: article?.slug ?? article?._id ?? fallback.id,
      title: article?.title ?? fallback.title,
      excerpt: article?.excerpt ?? fallback.excerpt,
      category: article?.category ?? fallback.category,
      imageUrl: article?.coverImage ?? fallback.imageUrl,
      date: article?.publishedAt ? formatDate(article.publishedAt) : fallback.date,
    };
  });

  const normalizedDefaultPartners = figmaPartners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    logoUrl: undefined as string | undefined,
  }));

  const normalizedDbPartners = partners.map((partner) => ({
    id: partner._id,
    name: partner.name,
    logoUrl: partner.logoUrl,
  }));

  const seenPartnerNames = new Set<string>();
  const resolvedPartners = [...normalizedDbPartners, ...normalizedDefaultPartners].filter((partner) => {
    const key = partner.name.trim().toLowerCase();
    if (seenPartnerNames.has(key)) return false;
    seenPartnerNames.add(key);
    return true;
  });

  const figmaActivities = [
    { id: "1", title: "Culture", icon: "Sprout", description: "" },
    { id: "2", title: "Transformation", icon: "Box", description: "" },
    { id: "3", title: "Logistique", icon: "Truck", description: "" },
    { id: "4", title: "Formation", icon: "Users", description: "" },
  ];

  const resolvedActivities = (activities.length > 0 ? activities : figmaActivities).map((activity, index) => ({
    id: "_id" in activity ? activity._id : figmaActivities[index % figmaActivities.length].id,
    title: activity.title,
    icon: activity.icon,
    description: activity.description,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={content?.heroTitle || figmaContent.hero.title}
        subtitle={content?.heroSubtitle || figmaContent.hero.subtitle}
        ctaPrimary={figmaContent.hero.ctaPrimary}
        ctaSecondary={figmaContent.hero.ctaSecondary}
        imageUrl={content?.homeHeroBackgroundUrl || figmaContent.hero.image}
      />
      <Stats
        stats={[
          {
            id: 1,
            value: content?.homeStat1Value || figmaContent.intro.stats[0].value,
            label: content?.homeStat1Label || figmaContent.intro.stats[0].label,
          },
          {
            id: 2,
            value: content?.homeStat2Value || figmaContent.intro.stats[1].value,
            label: content?.homeStat2Label || figmaContent.intro.stats[1].label,
          },
          {
            id: 3,
            value: content?.homeStat3Value || figmaContent.intro.stats[2].value,
            label: content?.homeStat3Label || figmaContent.intro.stats[2].label,
          },
          {
            id: 4,
            value: content?.homeStat4Value || figmaContent.intro.stats[3].value,
            label: content?.homeStat4Label || figmaContent.intro.stats[3].label,
          },
        ]}
      />
      <Intro
        title={content?.introTitle || figmaContent.intro.title}
        text={content?.introText || figmaContent.intro.text}
        missionTitle={figmaContent.mission.title}
        missionText={content?.presentationMission || figmaContent.mission.text}
        visionTitle={figmaContent.vision.title}
        visionText={content?.presentationVision || figmaContent.vision.text}
        valuesTitle={figmaContent.values.title}
        valuesText={content?.presentationValues || figmaContent.values.list.join(", ")}
      />
      <Services services={resolvedServices} />
      <CEO
        name={director?.name || figmaContent.ceo.name}
        title={director?.title || figmaContent.ceo.title}
        bio={director?.bio || figmaContent.ceo.bio}
        quote={director?.message || figmaContent.ceo.quote}
        imageUrl={director?.photoUrl || figmaContent.ceo.image}
      />
      <Activities activities={resolvedActivities} />
      <ArticlesPreview articles={resolvedArticles} />
      <Partners partners={resolvedPartners} />
    </div>
  );
}
