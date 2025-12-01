// server/routes/sitemap.js
import express from "express";
import Blog from "../models/Blog.js";
import { generateSlug } from "../utils/slug.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ date: -1 });

    const urls = blogs.map((blog) => {
      const slug = blog.slug || generateSlug(blog.title);
      return `
        <url>
          <loc>https://ssvelectronicsvizag.com/blog/${slug}</loc>
          <lastmod>${new Date(blog.date || Date.now()).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (err) {
    console.error("Error generating sitemap:", err);
    res.status(500).end();
  }
});

export default router;
