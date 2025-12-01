import Gallery from "../models/Gallery.js";

export const createGalleryItem = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const imageUrl = req.file.path; // Cloudinary URL

    const item = await Gallery.create({
      title,
      description,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      data: item,
      message: "Gallery item created successfully",
    });
  } catch (error) {
    console.error("createGalleryItem:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("getGalleryItems:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    return res.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error("deleteGalleryItem:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateGalleryItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const item = await Gallery.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    // If a new file is uploaded, replace image
    let updatedImage = item.image;
    if (req.file) {
      updatedImage = req.file.path; // Cloudinary new URL
    }

    const updatedItem = await Gallery.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image: updatedImage,
      },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Gallery item updated successfully",
      data: updatedItem,
    });

  } catch (error) {
    console.error("updateGalleryItem:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
