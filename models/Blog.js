import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: {type: String},
    category: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true }, // HTML content
    keywords: {
  type: String,
  required: false,
}

  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
