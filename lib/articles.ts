import fs from "fs";
import path from "path";
import type { Locale } from "./content";

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title?: string; text: string };

export interface Article {
  slug: string;
  locale: Locale;
  title: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  author: string;
  category: string;
  summary: string;
  tags: string[];
  body: ArticleBlock[];
}

const ARTICLES_DIR = path.join(process.cwd(), "data", "articles");

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8")) as Article)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getArticlesByLocale(locale: Locale): Article[] {
  return getAllArticles().filter((a) => a.locale === locale);
}

export function getArticleBySlug(locale: Locale, slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug && a.locale === locale);
}
