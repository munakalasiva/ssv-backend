import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import prerender from "prerender-node";
import { fileURLToPath } from "url";
import { dirname } from "path";

import connectDB from "./config/db.js";

import contactRoutes from "./routes/contactRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import repairRoutes from "./routes/repairRoutes.js";
import sitemapRouter from "./routes/sitemap.js";


dotenv.config();
connectDB();

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(cors());
app.use(express.json());

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *
Disallow: /

Sitemap:
`);
});

prerender.set("prerenderToken", process.env.PRERENDER_TOKEN);
prerender.set("protocol", "https");
app.use(prerender);


app.use("/", sitemapRouter);
app.use("/api/contacts", contactRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/warranty", repairRoutes);


app.use(express.static(path.join(__dirname, "public")));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);





// import express from "express";
// const path = require('path');
// import dotenv from "dotenv";
// import cors from "cors";
// import prerender from "prerender-node";
// import connectDB from "./config/db.js";

// import contactRoutes from "./routes/contactRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import galleryRoutes from "./routes/galleryRoutes.js";
// import blogRoutes from "./routes/blogRoutes.js";
// import serviceRoutes from "./routes/serviceRoutes.js";
// import repairRoutes from "./routes/repairRoutes.js";
// import sitemapRouter from "./routes/sitemap.js";

// dotenv.config();
// connectDB();

// const app = express();

// // ------------------------------
// // ✅ CORS + JSON
// // ------------------------------
// app.use(cors());
// app.use(express.json());

// // ------------------------------
// // ✅ Prerender.io Middleware
// // ------------------------------
// prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);

// // If hosting on Render, Vercel, Hostinger, etc:
// prerender.set('protocol', 'https');

// app.use(prerender);

// // ------------------------------
// // API Routes
// // ------------------------------
// app.use("/", sitemapRouter);
// app.use("/api/contacts", contactRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/gallery", galleryRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/services", serviceRoutes);
// app.use("/api/warranty", repairRoutes);


// app.use(express.static(path.join(__dirname, 'public')));


// // ------------------------------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

