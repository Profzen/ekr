import { Schema, model, models, type InferSchemaType } from "mongoose";

const ProductVarietySchema = new Schema(
  {
    productName: { type: String, required: true, trim: true },
    form: { type: String, required: true, trim: true },
    varietyName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    shortDescription: { type: String, default: "" },
    detailedDescription: { type: String, default: "" },
    cultivatedZone: { type: String, default: "" },
    qualitySpecs: { type: String, default: "" },
    packagingDetails: { type: String, default: "" },
    labelingDetails: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ProductVariety = InferSchemaType<typeof ProductVarietySchema> & {
  _id: string;
};

const ProductVarietyModel =
  models.ProductVariety || model("ProductVariety", ProductVarietySchema);

export default ProductVarietyModel;
