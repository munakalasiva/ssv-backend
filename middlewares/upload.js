import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Allowed file types
    let allowedFormats = ["jpg", "jpeg", "png", "webp", "mp4", "mov", "avi"];

    // Detect media type
    const isVideo = file.mimetype.startsWith("video");

    return {
      folder: req.uploadFolder || "general",   // Dynamic folder
      resource_type: isVideo ? "video" : "image",
      allowed_formats: allowedFormats,
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

const upload = multer({ storage });

export default upload;
