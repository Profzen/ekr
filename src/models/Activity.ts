import { Schema, model, models, type InferSchemaType } from "mongoose";

const ActivitySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "" }, // Icon name (e.g., "Sprout", "Ship", "Leaf", "TrendingUp")
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Activity = InferSchemaType<typeof ActivitySchema> & {
  _id: string;
};

const ActivityModel = models.Activity || model("Activity", ActivitySchema);

export default ActivityModel;
