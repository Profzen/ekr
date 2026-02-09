import { Schema, model, models, type InferSchemaType } from "mongoose";

const SiteContentSchema = new Schema(
  {
    homeMessage: { type: String, default: "" },
    homeAbout: { type: String, default: "" },
    homeHistory: { type: String, default: "" },
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
  },
  { timestamps: true, strict: false }
);

export type SiteContent = InferSchemaType<typeof SiteContentSchema> & {
  _id: string;
};

const SiteContentModel = models.SiteContent ||
  model("SiteContent", SiteContentSchema);

export default SiteContentModel;
