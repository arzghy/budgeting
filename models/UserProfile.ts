import mongoose, { Schema, models } from "mongoose";

const UserProfileSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    displayName: { type: String, default: "" },
    motto: { type: String, default: "Menuju financial freedom bareng Paus 🐋" },
    avatarIcon: { type: String, default: "whale-classic" },
    imageUrl: { type: String, default: "" }, // Cloudinary URL to keep MongoDB lightweight
    cloudinaryPublicId: { type: String, default: "" },
    monthlyBudget: { type: Number, default: 0 }, // Maksimal pengeluaran 1 bulan
  },
  { timestamps: true }
);

export const UserProfile =
  models.UserProfile || mongoose.model("UserProfile", UserProfileSchema);
