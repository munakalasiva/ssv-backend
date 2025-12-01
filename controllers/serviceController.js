import Service from "../models/Service.js";
import cloudinary from "../config/cloudinary.js";

// CREATE Service
export const createService = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "services",
      });
      imageUrl = result.secure_url;
    }

    const service = await Service.create({
      title: req.body.title,
      description: req.body.description,
      image: imageUrl,
    });

    res.status(201).json({ success: true, service });
  } catch (error) {
    console.error("Service Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all services
// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: services,   // <-- FRONTEND EXPECTS "data"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET one service
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE service
export const updateService = async (req, res) => {
  try {
    let updateData = {
      title: req.body.title,
      description: req.body.description,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "services",
      });
      updateData.image = result.secure_url;
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE service
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
