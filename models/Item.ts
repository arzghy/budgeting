import mongoose, { Schema, models } from "mongoose";

const ItemSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    category: { type: String, required: true }, // 'skincare' | 'makeup'
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 1 },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Item = models.Item || mongoose.model("Item", ItemSchema);
