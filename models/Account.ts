import mongoose, { Schema, models } from "mongoose";

const AccountSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    passwordHash: { type: String, default: "" },
    sessionVersion: { type: Number, default: 0 },
    resetCodeHash: { type: String, default: "" },
    resetCodeExpiresAt: { type: Date, default: null },
    resetCodeAttempts: { type: Number, default: 0 },
    resetRequestCount: { type: Number, default: 0 },
    resetRequestWindowStartedAt: { type: Date, default: null },
    resetCodeRequestedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Account = models.Account || mongoose.model("Account", AccountSchema);
