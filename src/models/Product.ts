import { Schema, model, models, type InferSchemaType } from "mongoose";

const ProductSchema = new Schema(
  {
    productName: { type: String, required: true, trim: true },
    form: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    cultivatedVarieties: { type: String, default: "" },
    packagingDetails: { type: String, default: "" },
    labelingDetails: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Product = InferSchemaType<typeof ProductSchema> & {
  _id: string;
};

const ProductModel = models.Product || model("Product", ProductSchema);

export default ProductModel;
