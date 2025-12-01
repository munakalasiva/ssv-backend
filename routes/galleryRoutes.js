import express from "express";
import upload from "../middlewares/upload.js";// your Cloudinary multer
import { 
  createGalleryItem,
  getGalleryItems,
  deleteGalleryItem,
  updateGalleryItem,
} from "../controllers/galleryController.js";

const router = express.Router();

// Upload single image with field name "image"
router.post("/", upload.single("image"), createGalleryItem);

// Get all gallery entries
router.get("/", getGalleryItems);

// Delete item
router.delete("/:id", deleteGalleryItem);

router.put("/:id", upload.single("image"), updateGalleryItem);

export default router;


