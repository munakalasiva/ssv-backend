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



/* ===============================
   FORCE PRERENDER FOR SEO BOTS
================================ */

prerender.set("prerenderToken", process.env.PRERENDER_TOKEN);
prerender.set("prerenderServiceUrl", "https://service.prerender.io/");
prerender.set("protocol", "https");

/* Force render ALL HTML pages */
prerender.shouldShowPrerenderedPage = function (req) {
  const ua = (req.headers["user-agent"] || "").toLowerCase();

  return (
    ua.includes("googlebot") ||
    ua.includes("bingbot") ||
    ua.includes("yandex") ||
    ua.includes("duckduckbot") ||
    ua.includes("baiduspider")
  );
};

app.use(prerender);


/* ======================================================
   MIDDLEWARE
====================================================== */

app.use(cors());
app.use(express.json());

/* ======================================================
   ROBOTS.TXT
====================================================== */

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(
`User-agent: *
Allow: /

Sitemap: https://ssvelectronicsvizag.com/sitemap.xml`
  );
});

/* ======================================================
   SITEMAP (already exists in backend)
====================================================== */

app.use("/", sitemapRouter);

/* ======================================================
   API ROUTES (NOT PRERENDERED)
====================================================== */

app.use("/api/contacts", contactRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/warranty", repairRoutes);

/* ======================================================
   STATIC FILES (LAST — VERY IMPORTANT)
====================================================== */

app.use(express.static(path.join(__dirname, "public")));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



/* ======================================================
   SERVER START
====================================================== */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🟢 Prerender enabled for React Helmet SEO`);
});
