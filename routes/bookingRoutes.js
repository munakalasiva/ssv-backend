import express from "express";
import upload from "../middlewares/upload.js";
import {
  createBooking,
  getBookings,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// Create booking (with optional photo)
router.post("/", (req, res, next) => {
  req.uploadFolder = "booking-photos";  // cloudinary folder
  next();
}, upload.single("photo"), createBooking);

// Get all bookings
router.get("/", getBookings);

// Delete a booking
router.delete("/:id", deleteBooking);

export default router;
