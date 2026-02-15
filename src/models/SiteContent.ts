import { Schema, model, models, type InferSchemaType } from "mongoose";

const SiteContentSchema = new Schema(
  {
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
    contactAddress: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    mapEmbedUrl: { type: String, default: "" },
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
