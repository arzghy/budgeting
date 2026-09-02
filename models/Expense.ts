import mongoose, { Schema, models } from "mongoose";

const ExpenseSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    division: { type: String, default: "jajan" }, // makeup, skincare, jajan, pakaian, lainnya, kebutuhan, wishlist
    subcategory: { type: String, default: "" }, // baju, celana, dress, sepatu (for pakaian)
    source: { type: String, default: "manual" }, // manual | kebutuhan | wishlist
    url: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Expense = models.Expense || mongoose.model("Expense", ExpenseSchema);
