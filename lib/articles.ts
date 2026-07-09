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

type ArticleImage = {
  url: string;
  alt: string;
};

const genericDentalImageIds = [
  "photo-1606811841689-23dfddce3e95",
  "photo-1606811971618-4486d14f3f99",
];

const articleImageRules: Array<{
  pattern: RegExp;
  image: ArticleImage;
}> = [
  {
    pattern: /\b(recovery|timeline|healing|aftercare|post[-\s]?op)\b/i,
    image: {
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1800&q=80",
      alt: "Modern dental treatment room prepared for a patient visit",
    },
  },
  {
    pattern: /\b(cost|price|pricing|budget|compare|estimate)\b/i,
    image: {
      url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1800&q=80",
      alt: "Dental team reviewing treatment options with a patient",
    },
  },
  {
    pattern: /\b(implant|implants|missing tooth|restoration)\b/i,
    image: {
      url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1800&q=80",
      alt: "Close-up dental exam for implant treatment planning",
    },
  },
  {
    pattern: /\b(veneer|veneers|cosmetic|smile)\b/i,
    image: {
      url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1800&q=80",
      alt: "Cosmetic dental exam for smile treatment planning",
    },
  },
  {
    pattern: /\b(root canal|emergency|pain|urgent|wisdom tooth|extraction)\b/i,
    image: {
      url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1800&q=80",
      alt: "Dental instruments prepared for restorative treatment",
    },
  },
];

const fallbackArticleImages: ArticleImage[] = [
  {
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1800&q=80",
    alt: "Modern dental treatment room prepared for a patient visit",
  },
  {
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1800&q=80",
    alt: "Dental team reviewing treatment options with a patient",
  },
  {
    url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1800&q=80",
    alt: "Dental instruments prepared for restorative treatment",
  },
];

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

function hashText(value: string) {
  return value.split("").reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0;
  }, 0);
}

function isGenericDentalImage(url?: string) {
  return Boolean(url && genericDentalImageIds.some((id) => url.includes(id)));
}

function fallbackArticleImage(slug: string, title: string, category: string): ArticleImage {
  const topic = `${slug} ${title} ${category}`;
  const matched = articleImageRules.find((rule) => rule.pattern.test(topic));
  if (matched) return matched.image;

  return fallbackArticleImages[hashText(slug) % fallbackArticleImages.length];
}

function resolveArticleImage(input: {
  slug: string;
  title: string;
  category: string;
  heroImage?: string;
  heroImageAlt?: string;
}): ArticleImage {
  const fallback = fallbackArticleImage(input.slug, input.title, input.category);
  const shouldUseFallback = !input.heroImage || isGenericDentalImage(input.heroImage);

  return {
    url: shouldUseFallback ? fallback.url : input.heroImage ?? fallback.url,
    alt: input.heroImageAlt || (shouldUseFallback ? fallback.alt : input.title),
  };
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
  const title = frontmatter.title || titleFromSlug(slug);
  const category = frontmatter.category || "Dental guide";
  const image = resolveArticleImage({
    slug,
    title,
    category,
    heroImage: frontmatter.heroImage,
    heroImageAlt: frontmatter.heroImageAlt,
  });

  return {
    slug,
    title,
    description:
      frontmatter.description ||
      "Patient-friendly dental guidance from Sonria Dentista.",
    category,
    locale,
    publishedAt: frontmatter.publishedAt || new Date(stats.mtimeMs).toISOString().slice(0, 10),
    heroImage: image.url,
    heroImageAlt: image.alt,
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
  const title = parsed.title || titleFromSlug(slug);
  const category = parsed.category || "Dental guide";
  const image = resolveArticleImage({
    slug,
    title,
    category,
    heroImage: parsed.heroImage,
    heroImageAlt: parsed.heroImageAlt,
  });

  return {
    slug,
    title,
    description:
      parsed.description ||
      parsed.seoDescription ||
      parsed.summary ||
      "Patient-friendly dental guidance from Sonria Dentista.",
    category,
    locale,
    publishedAt: parsed.publishedAt || new Date(stats.mtimeMs).toISOString().slice(0, 10),
    heroImage: image.url,
    heroImageAlt: image.alt,
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
