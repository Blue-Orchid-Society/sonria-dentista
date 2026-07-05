import fs from "fs";
import path from "path";

export type ToolCard = {
  slug: string;
  href: string;
  title: string;
  description: string;
  category: string;
  updatedAt: number;
};

const curatedTools: Record<string, Omit<ToolCard, "slug" | "href" | "updatedAt">> = {
  "dental-filling-cost-estimator": {
    title: "Dental filling cost estimator",
    description: "Compare filling material, tooth location, and insurance factors before booking care.",
    category: "Restorative dentistry",
  },
  "dental-veneer-cost-estimator": {
    title: "Dental veneer cost estimator",
    description: "Compare common veneer cost factors before scheduling a cosmetic consultation.",
    category: "Cosmetic dentistry",
  },
  "dental-implant-candicacy-quiz": {
    title: "Dental implant candidacy quiz",
    description: "See which questions matter when deciding whether implants may be worth discussing.",
    category: "Missing teeth",
  },
  "invisalign-readiness-quiz": {
    title: "Invisalign readiness quiz",
    description: "Review smile alignment goals, timing, and care habits before an orthodontic visit.",
    category: "Clear braces",
  },
  "emergency-dental-cost-estimator": {
    title: "Emergency dental cost estimator",
    description: "Understand urgent care cost drivers for pain, swelling, broken teeth, or extractions.",
    category: "Emergency care",
  },
  "root-canal-cost-estimator": {
    title: "Root canal cost estimator",
    description: "Preview the treatment and restoration factors that can affect root canal pricing.",
    category: "Restorative dentistry",
  },
  "root-canal-recovery-timeline-estimator": {
    title: "Root canal recovery timeline",
    description: "Set expectations for soreness, eating, follow-up care, and when to call the office.",
    category: "Restorative dentistry",
  },
  "same-day-dental-crown-cost-estimator": {
    title: "Same-day crown cost estimator",
    description: "Compare crown material, appointment, and insurance factors before treatment planning.",
    category: "Dental crowns",
  },
  "dental-crown-replacement-cost-estimator": {
    title: "Dental crown replacement cost estimator",
    description: "Understand what changes replacement crown pricing and when evaluation is needed.",
    category: "Dental crowns",
  },
  "wisdom-tooth-removal-cost-estimator": {
    title: "Wisdom tooth removal cost estimator",
    description: "Review extraction complexity, sedation, and recovery factors before a consultation.",
    category: "Extractions",
  },
};

const fallbackCategoryPatterns = [
  { pattern: /implant|tooth|teeth|denture|bridge/i, category: "Missing teeth" },
  { pattern: /veneer|cosmetic|whitening/i, category: "Cosmetic dentistry" },
  { pattern: /invisalign|braces|orthodontic/i, category: "Clear braces" },
  { pattern: /emergency|urgent|pain/i, category: "Emergency care" },
  { pattern: /crown|root-canal|filling|restorative/i, category: "Restorative dentistry" },
  { pattern: /extraction|wisdom/i, category: "Extractions" },
];

function appToolsDir() {
  return path.join(process.cwd(), "app", "tools");
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : word))
    .join(" ");
}

function categoryFromSlug(slug: string) {
  return fallbackCategoryPatterns.find((item) => item.pattern.test(slug))?.category ?? "Dental guide";
}

function descriptionFromSlug(slug: string) {
  const title = titleFromSlug(slug).toLowerCase();
  if (slug.includes("quiz")) return `Answer a few questions to prepare for a ${title} conversation with the Sonria team.`;
  if (slug.includes("timeline")) return `Preview timing, comfort, and follow-up factors for ${title}.`;
  if (slug.includes("cost") || slug.includes("estimator")) return `Compare common factors that can affect ${title} before scheduling.`;
  return `Use this Sonria guide to compare options and prepare for your next visit.`;
}

export function getAllTools(): ToolCard[] {
  const toolsDir = appToolsDir();
  if (!fs.existsSync(toolsDir)) return [];

  return fs
    .readdirSync(toolsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(toolsDir, entry.name, "page.tsx")))
    .map((entry) => {
      const slug = entry.name;
      const pagePath = path.join(toolsDir, slug, "page.tsx");
      const curated = curatedTools[slug];
      return {
        slug,
        href: `/tools/${slug}`,
        title: curated?.title ?? titleFromSlug(slug),
        description: curated?.description ?? descriptionFromSlug(slug),
        category: curated?.category ?? categoryFromSlug(slug),
        updatedAt: fs.statSync(pagePath).mtimeMs,
      };
    })
    .sort((a, b) => {
      if (b.updatedAt !== a.updatedAt) return b.updatedAt - a.updatedAt;
      return a.title.localeCompare(b.title);
    });
}

export function getToolSlugs() {
  return getAllTools().map((tool) => tool.slug);
}
