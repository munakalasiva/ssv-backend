import Booking from "../models/Booking.js";

/**
 * Create a new booking request
 * POST /api/bookings
 */
export const createBooking = async (req, res) => {
  try {
    const { name, phone, address, tvBrand, problemType, date, time } = req.body;

    const photoUrl = req.file ? req.file.path : null;

    const booking = await Booking.create({
      name,
      phone,
      address,
      tvBrand,
      problemType,
      date,
      time,
      photo: photoUrl,
    });

    return res.status(201).json({
      success: true,
      data: booking,
      message: "Booking request submitted successfully",
    });
  } catch (error) {
    console.error("createBooking:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Get all booking requests
 * GET /api/bookings
 */
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("getBookings:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Delete a booking request
 * DELETE /api/bookings/:id
 */
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking)
      return res.status(404).json({ success: false, message: "Not found" });

    return res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("deleteBooking:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
