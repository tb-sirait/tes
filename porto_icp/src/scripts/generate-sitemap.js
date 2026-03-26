import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix path di ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON
const serverData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../src/server.json"), "utf-8"),
);

const BASE_URL = "https://www.infoduta.com";

const staticPages = ["", "/produk", "/produk/server"];

const today = new Date().toISOString();

const generateUrl = (url, priority = "0.8") => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>
`;

let urls = [];

// Static
staticPages.forEach((page) => {
  urls.push(generateUrl(page, "0.9"));
});

// Dynamic
serverData.forEach((product) => {
  urls.push(generateUrl(`/produk/server/${product.id}`, "0.8"));
});

// XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

// Save
fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemap);

console.log("✅ sitemap.xml berhasil dibuat!");
