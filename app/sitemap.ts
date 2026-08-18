import type { MetadataRoute } from "next";
import siteEn from "@/data/site.en.json";
import { getAllArticles } from "@/lib/articles";
import { getToolSlugs } from "@/lib/tools";

const BASE = "https://sonriadentista.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "es"] as const;
  const services = siteEn.services.list.map((s) => s.slug);
  const locations = siteEn.locations.list.map((l) => l.slug);
  const tools = getToolSlugs();
  const articles = getAllArticles();
  const staticPages = ["services", "tools", "articles", "locations", "about", "new-patients", "insurance", "faq", "contact"];

  const entries: MetadataRoute.Sitemap = [];
  for (const l of locales) {
    entries.push({ url: `${BASE}/${l}`, lastModified: new Date(), priority: 1.0 });
    for (const p of staticPages) {
      entries.push({ url: `${BASE}/${l}/${p}`, lastModified: new Date(), priority: 0.7 });
    }
    for (const s of services) {
      entries.push({ url: `${BASE}/${l}/services/${s}`, lastModified: new Date(), priority: 0.8 });
    }
    for (const loc of locations) {
      entries.push({ url: `${BASE}/${l}/locations/${loc}`, lastModified: new Date(), priority: 0.8 });
      entries.push({ url: `${BASE}/${l}/appointment/${loc}`, lastModified: new Date(), priority: 0.65 });
    }
    for (const article of articles) {
      entries.push({ url: `${BASE}/${l}/articles/${article.slug}`, lastModified: new Date(article.updatedAt), priority: 0.7 });
    }
  }
  for (const tool of tools) {
    entries.push({ url: `${BASE}/tools/${tool}`, lastModified: new Date(), priority: 0.65 });
  }
  return entries;
}
