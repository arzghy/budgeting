import mongoose, { Schema, models } from "mongoose";

const NeedSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    amount: { type: Number, default: 0 },
    division: { type: String, default: "kebutuhan" },
    status: { type: String, enum: ["tersisa", "habis"], default: "tersisa" },
    url: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Need = models.Need || mongoose.model("Need", NeedSchema);
