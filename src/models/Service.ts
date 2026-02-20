import { Schema, model, models, type InferSchemaType } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Service = InferSchemaType<typeof ServiceSchema> & {
  _id: string;
};

const ServiceModel = models.Service || model("Service", ServiceSchema);

export default ServiceModel;
