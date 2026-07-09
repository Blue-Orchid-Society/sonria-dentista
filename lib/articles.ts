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

type JsonArticleBlock = {
  type?: "h1" | "h2" | "h3" | "heading" | "p" | "paragraph" | "list";
  text?: string;
  level?: number;
  items?: string[];
};

type JsonArticle = {
  slug?: string;
  title?: string;
  description?: string;
  seoDescription?: string;
  summary?: string;
  category?: string;
  locale?: string;
  publishedAt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  relatedTools?: string[];
  body?: string | JsonArticleBlock[];
};

function articlesDir() {
  return path.join(process.cwd(), "content", "articles");
}

function jsonArticlesDir() {
  return path.join(process.cwd(), "data", "articles");
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

function bodyFromJson(value: JsonArticle["body"]): string {
  if (typeof value === "string") return value.trim();
  if (!Array.isArray(value)) return "";

  return value
    .map((block) => {
      const text = typeof block.text === "string" ? block.text.trim() : "";
      if (!text && block.type !== "list") return "";

      if (block.type === "h1") return `# ${text}`;
      if (block.type === "h2") return `## ${text}`;
      if (block.type === "h3") return `### ${text}`;
      if (block.type === "heading") {
        const level = block.level === 3 ? "###" : "##";
        return `${level} ${text}`;
      }
      if (block.type === "list" && Array.isArray(block.items)) {
        return block.items
          .map((item) => item.trim())
          .filter(Boolean)
          .map((item) => `- ${item}`)
          .join("\n");
      }
      return text;
    })
    .filter(Boolean)
    .join("\n\n");
}

function normalizedRelatedTools(values: string[]): string[] {
  return values
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.replace(/^\/tools\//, ""));
}

function markdownArticleFromFile(fileName: string): Article | null {
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
    relatedTools: normalizedRelatedTools((frontmatter.relatedTools || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)),
    body,
    updatedAt: stats.mtimeMs,
  };
}

function jsonArticleFromFile(fileName: string): Article | null {
  const filePath = path.join(jsonArticlesDir(), fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw) as JsonArticle;
  const fallbackSlug = fileName.replace(/\.json$/i, "");
  const slug = parsed.slug || fallbackSlug;
  const locale = parsed.locale === "es" ? "es" : "en";
  const stats = fs.statSync(filePath);

  return {
    slug,
    title: parsed.title || titleFromSlug(slug),
    description:
      parsed.description ||
      parsed.seoDescription ||
      parsed.summary ||
      "Patient-friendly dental guidance from Sonria Dentista.",
    category: parsed.category || "Dental guide",
    locale,
    publishedAt: parsed.publishedAt || new Date(stats.mtimeMs).toISOString().slice(0, 10),
    heroImage:
      parsed.heroImage ||
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: parsed.heroImageAlt || "",
    relatedTools: normalizedRelatedTools(parsed.relatedTools || []),
    body: bodyFromJson(parsed.body),
    updatedAt: stats.mtimeMs,
  };
}

export function getAllArticles(locale?: Locale): Article[] {
  const markdownArticles = fs.existsSync(articlesDir())
    ? fs
        .readdirSync(articlesDir(), { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
        .map((entry) => markdownArticleFromFile(entry.name))
    : [];

  const jsonArticles = fs.existsSync(jsonArticlesDir())
    ? fs
        .readdirSync(jsonArticlesDir(), { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
        .map((entry) => jsonArticleFromFile(entry.name))
    : [];

  return [...markdownArticles, ...jsonArticles]
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
