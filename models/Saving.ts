import mongoose, { Schema, models } from "mongoose";

const SavingSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    type: { type: String, enum: ["wishlist", "jagajaga"], required: true },
    refId: { type: String, default: null }, // wishlist id kalau type wishlist
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    url: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Saving = models.Saving || mongoose.model("Saving", SavingSchema);
