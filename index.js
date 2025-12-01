import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import contactRoutes from "./routes/contactRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import repairRoutes from "./routes/repairRoutes.js";



dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); // <-- ENABLE CORS
app.use(express.json());

// Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blogs",blogRoutes);
app.use("/api/services",serviceRoutes);
app.use("/api/warranty",repairRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
