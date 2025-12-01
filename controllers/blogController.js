import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";

export const createBlog = async (req, res) => {
  try {
    let imageUrl = "";

    // Upload image to cloudinary if file present
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      imageUrl = result.secure_url;
    }

    // Save blog data
    const blog = await Blog.create({
      title: req.body.title,
      category: req.body.category,
      date: req.body.date,
      excerpt: req.body.excerpt,
      content: req.body.content,
      keywords:req.body.keywords,
      image: imageUrl,
    });

    res.status(201).json({ success: true, data: blog });

  } catch (error) {
    console.error("Blog Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get blog by id
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    let updateData = {
      title: req.body.title,
      category: req.body.category,
      date: req.body.date,
      excerpt: req.body.excerpt,
      content: req.body.content,
      keywords:req.body.keywords,
    };

    // If new image uploaded → upload to cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      updateData.image = result.secure_url;
    }

    // Update blog data
    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({ success: true, updated });
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
