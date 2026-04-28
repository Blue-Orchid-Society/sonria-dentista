import type { MetadataRoute } from "next";
import siteEn from "@/data/site.en.json";

const BASE = "https://sonriadentista.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "es"] as const;
  const services = siteEn.services.list.map((s) => s.slug);
  const locations = siteEn.locations.list.map((l) => l.slug);

  const entries: MetadataRoute.Sitemap = [];
  for (const l of locales) {
    entries.push({ url: `${BASE}/${l}`, lastModified: new Date(), priority: 1.0 });
    for (const s of services) {
      entries.push({ url: `${BASE}/${l}/services/${s}`, lastModified: new Date(), priority: 0.8 });
    }
    for (const loc of locations) {
      entries.push({ url: `${BASE}/${l}/locations/${loc}`, lastModified: new Date(), priority: 0.8 });
    }
  }
  return entries;
}
