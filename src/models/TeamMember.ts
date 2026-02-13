import { Schema, model, models, type InferSchemaType } from "mongoose";

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    photoUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type TeamMember = InferSchemaType<typeof TeamMemberSchema> & {
  _id: string;
};

const TeamMemberModel = models.TeamMember || model("TeamMember", TeamMemberSchema);

export default TeamMemberModel;
