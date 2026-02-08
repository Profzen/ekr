import { Schema, model, models, type InferSchemaType } from "mongoose";

const PartnerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    logoUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Partner = InferSchemaType<typeof PartnerSchema> & {
  _id: string;
};

const PartnerModel = models.Partner || model("Partner", PartnerSchema);

export default PartnerModel;
