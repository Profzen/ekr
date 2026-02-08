import { Schema, model, models, type InferSchemaType } from "mongoose";

const DirectorProfileSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    photoUrl: { type: String, default: "" },
    bio: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export type DirectorProfile = InferSchemaType<typeof DirectorProfileSchema> & {
  _id: string;
};

const DirectorProfileModel = models.DirectorProfile ||
  model("DirectorProfile", DirectorProfileSchema);

export default DirectorProfileModel;
