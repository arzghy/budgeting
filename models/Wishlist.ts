import mongoose, { Schema, models } from "mongoose";

const WishlistSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    target: { type: Number, required: true },
    saved: { type: Number, default: 0 }, // manual input progress
    purchased: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Wishlist = models.Wishlist || mongoose.model("Wishlist", WishlistSchema);
