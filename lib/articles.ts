import fs from "fs";
import path from "path";
import type { Locale } from "@/lib/content";

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  locale: Locale;
  publishedAt: string;
  heroImage: string;
  heroImageAlt: string;
  relatedTools: string[];
  body: string;
  updatedAt: number;
};

type ArticleFrontmatter = {
  slug?: string;
  title?: string;
  description?: string;
  category?: string;
  locale?: string;
  publishedAt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  relatedTools?: string;
};

function articlesDir() {
  return path.join(process.cwd(), "content", "articles");
}

function parseFrontmatter(raw: string): { frontmatter: ArticleFrontmatter; body: string } {
  const normalized = raw.replace(/^\uFEFF/, "");
  if (!normalized.startsWith("---")) {
    return { frontmatter: {}, body: normalized.trim() };
  }

  const end = normalized.indexOf("\n---", 3);
  if (end === -1) {
    return { frontmatter: {}, body: normalized.trim() };
  }

  const frontmatterText = normalized.slice(3, end).trim();
  const body = normalized.slice(end + 4).trim();
  const frontmatter: ArticleFrontmatter = {};

  for (const line of frontmatterText.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    frontmatter[key as keyof ArticleFrontmatter] = value.replace(/^["']|["']$/g, "").trim();
  }

  return { frontmatter, body };
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : word))
    .join(" ");
}

function articleFromFile(fileName: string): Article | null {
  const filePath = path.join(articlesDir(), fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(raw);
  const fallbackSlug = fileName.replace(/\.md$/i, "").replace(/\.(en|es)$/i, "");
  const locale = frontmatter.locale === "es" ? "es" : "en";
  const slug = frontmatter.slug || fallbackSlug;
  const stats = fs.statSync(filePath);

  return {
    slug,
    title: frontmatter.title || titleFromSlug(slug),
    description:
      frontmatter.description ||
      "Patient-friendly dental guidance from Sonria Dentista.",
    category: frontmatter.category || "Dental guide",
    locale,
    publishedAt: frontmatter.publishedAt || new Date(stats.mtimeMs).toISOString().slice(0, 10),
    heroImage:
      frontmatter.heroImage ||
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: frontmatter.heroImageAlt || "",
    relatedTools: (frontmatter.relatedTools || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    body,
    updatedAt: stats.mtimeMs,
  };
}

export function getAllArticles(locale?: Locale): Article[] {
  const dir = articlesDir();
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => articleFromFile(entry.name))
    .filter((article): article is Article => Boolean(article))
    .filter((article) => !locale || article.locale === locale)
    .sort((a, b) => {
      const dateCompare = b.publishedAt.localeCompare(a.publishedAt);
      if (dateCompare !== 0) return dateCompare;
      return b.updatedAt - a.updatedAt;
    });
}

export function getArticleBySlug(slug: string, locale: Locale): Article | null {
  return getAllArticles(locale).find((article) => article.slug === slug) ?? null;
}

export function getArticleStaticParams() {
  return getAllArticles().map((article) => ({
    locale: article.locale,
    slug: article.slug,
  }));
}
