import { Schema, model, models, type InferSchemaType } from "mongoose";

const GalleryItemSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type GalleryItem = InferSchemaType<typeof GalleryItemSchema> & {
  _id: string;
};

const GalleryItemModel = models.GalleryItem ||
  model("GalleryItem", GalleryItemSchema);

export default GalleryItemModel;
