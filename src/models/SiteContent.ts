import { Schema, model, models, type InferSchemaType } from "mongoose";

const SiteContentSchema = new Schema(
  {
    homeMessage: { type: String, default: "" },
    homeAbout: { type: String, default: "" },
    homeHistory: { type: String, default: "" },
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
  { timestamps: true }
);

export type SiteContent = InferSchemaType<typeof SiteContentSchema> & {
  _id: string;
};

const SiteContentModel = models.SiteContent ||
  model("SiteContent", SiteContentSchema);

export default SiteContentModel;
