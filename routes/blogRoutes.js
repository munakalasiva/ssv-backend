import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import upload from "../middlewares/upload.js";

const router = express.Router();

// POST - create blog with image upload
router.post("/", upload.single("image"), createBlog);

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id", upload.single("image"), updateBlog); // optional
router.delete("/:id", deleteBlog);

export default router;
