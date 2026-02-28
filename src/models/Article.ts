import { Schema, model, models, type InferSchemaType } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    bannerImage: { type: String, default: "" },
    category: { type: String, default: "Actualités" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export type Article = InferSchemaType<typeof ArticleSchema> & {
  _id: string;
};

const ArticleModel = models.Article || model("Article", ArticleSchema);

export default ArticleModel;
