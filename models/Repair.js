import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  tvBrand: String,
  partName: String,

  warrantyNumber: Number,      // Number (0–12 for months, 1–5 for years)
  warrantyUnit: String,        // "months" | "years"
  warrantyStartDate: Date,
  warrantyEndDate: Date,
  warrantyId: { type: String, unique: true },

  serviceDate: Date
}, { timestamps: true });

export default mongoose.model("Repair", repairSchema);
