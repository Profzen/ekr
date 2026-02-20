import { Schema, model, models, type InferSchemaType } from "mongoose";

const SiteContentSchema = new Schema(
  {
    // Hero Section
    heroTitle: {
      type: String,
      default: "L'Excellence Agricole au Service du Développement",
    },
    heroSubtitle: {
      type: String,
      default:
        "EKR Africa Agrovision Group : Une coopérative visionnaire dédiée à la valorisation des filières piment long et gingembre, de la production à l'exportation.",
    },
    
    // Intro Section
    introTitle: {
      type: String,
      default: "Une Vision Durable pour l'Agriculture Africaine",
    },
    introText: {
      type: String,
      default:
        "Nous croyons en une agriculture qui respecte la terre et valorise l'humain. EKR Africa Agrovision Group s'engage à structurer les filières agricoles, garantir la qualité de nos produits et accompagner les porteurs de projets innovants.",
    },
    
    // Legacy fields
    homeHeroIntro: {
      type: String,
      default:
        "Société d’accompagnement des activités agricoles en Afrique. Nous structurons des coopératives agricoles, notamment la filière piment long et gingembre, destinées à l’exportation et à la commercialisation.",
    },
    homeMessage: { type: String, default: "" },
    homeAbout: { type: String, default: "" },
    homeHistory: { type: String, default: "" },
    homeHeroBackgroundUrl: { type: String, default: "/agro2.jpg" },
    homeStat1Value: { type: String, default: "+12" },
    homeStat1Label: { type: String, default: "Services spécialisés" },
    homeStat2Value: { type: String, default: "+40" },
    homeStat2Label: { type: String, default: "Projets accompagnés" },
    homeStat3Value: { type: String, default: "8" },
    homeStat3Label: { type: String, default: "Pays partenaires" },
    homeStat4Value: { type: String, default: "24/7" },
    homeStat4Label: { type: String, default: "Suivi des actions" },
    homeActivitiesTitle: { type: String, default: "Activités clés" },
    presentationAbout: { type: String, default: "" },
    presentationVision: { type: String, default: "" },
    presentationMission: { type: String, default: "" },
    presentationValues: { type: String, default: "" },
    presentationHistoryTitle: { type: String, default: "Notre Histoire" },
    presentationHistoryParagraph1: { type: String, default: "" },
    presentationHistoryParagraph2: { type: String, default: "" },
    presentationHistoryStatYear: { type: String, default: "2018" },
    presentationHistoryStatYearLabel: { type: String, default: "Année de création" },
    presentationHistoryStatJobs: { type: String, default: "500+" },
    presentationHistoryStatJobsLabel: { type: String, default: "Emplois indirects" },
    contactAddress: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    mapEmbedUrl: { type: String, default: "" },
    socialLinkedinUrl: { type: String, default: "" },
    socialXUrl: { type: String, default: "" },
    socialFacebookUrl: { type: String, default: "" },
    socialWhatsappUrl: { type: String, default: "" },
    socialInstagramUrl: { type: String, default: "" },
  },
  { timestamps: true, strict: false }
);

export type SiteContent = InferSchemaType<typeof SiteContentSchema> & {
  _id: string;
};

const SiteContentModel = models.SiteContent ||
  model("SiteContent", SiteContentSchema);

export default SiteContentModel;
