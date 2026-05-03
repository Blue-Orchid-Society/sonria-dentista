import type { MetadataRoute } from "next";
import siteEn from "@/data/site.en.json";
import { getAllArticles } from "@/lib/articles";

const BASE = "https://sonriadentista.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "es"] as const;
  const services = siteEn.services.list.map((s) => s.slug);
  const locations = siteEn.locations.list.map((l) => l.slug);
  const staticPages = ["about", "new-patients", "insurance", "faq", "contact", "articles"];
  const articles = getAllArticles();

  const entries: MetadataRoute.Sitemap = [];
  for (const l of locales) {
    entries.push({ url: `${BASE}/${l}`, lastModified: new Date(), priority: 1.0 });
    for (const p of staticPages) {
      entries.push({ url: `${BASE}/${l}/${p}`, lastModified: new Date(), priority: 0.7 });
    }
    for (const s of services) {
      entries.push({ url: `${BASE}/${l}/services/${s}`, lastModified: new Date(), priority: 0.9 });
    }
    for (const loc of locations) {
      entries.push({ url: `${BASE}/${l}/locations/${loc}`, lastModified: new Date(), priority: 0.9 });
    }
  }
  for (const a of articles) {
    entries.push({
      url: `${BASE}/${a.locale}/articles/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      priority: 0.6,
    });
  }
  return entries;
}
