import mongoose, { Schema, models } from "mongoose";

const ExpenseSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    division: { type: String, default: "lainnya" }, // jajan, transport, hiburan, lainnya
    source: { type: String, default: "manual" }, // manual | kebutuhan | wishlist
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Expense = models.Expense || mongoose.model("Expense", ExpenseSchema);
