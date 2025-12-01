import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    address: { type: String, required: true, trim: true },
    tvBrand: { type: String, required: true },
    problemType: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    photo: { type: String }, // Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
