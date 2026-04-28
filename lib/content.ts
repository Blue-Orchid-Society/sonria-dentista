import siteEs from "@/data/site.es.json";
import siteEn from "@/data/site.en.json";

export type Locale = "en" | "es";

export type SiteContent = typeof siteEn;

export async function getSite(locale: Locale): Promise<SiteContent> {
  return locale === "es" ? (siteEs as SiteContent) : (siteEn as SiteContent);
}

export const LOCALES: Locale[] = ["en", "es"];

export function altLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}
