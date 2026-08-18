import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const articlesDir = path.join(root, "data", "articles");
const requiredFields = [
  "slug",
  "locale",
  "title",
  "description",
  "publishedAt",
  "heroImage",
  "heroImageAlt",
  "body",
];

function readArticles() {
  if (!fs.existsSync(articlesDir)) {
    return [];
  }

  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".json"))
    .sort();
}

const files = readArticles();
const errors = [];

for (const file of files) {
  const filePath = path.join(articlesDir, file);
  let parsed;

  try {
    parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    errors.push(`${file}: invalid JSON (${error.message})`);
    continue;
  }

  const missingFields = requiredFields.filter(
    (field) => !Object.prototype.hasOwnProperty.call(parsed, field),
  );

  if (missingFields.length > 0) {
    errors.push(`${file}: missing required field(s): ${missingFields.join(", ")}`);
  }

  if (parsed.locale && !["en", "es"].includes(parsed.locale)) {
    errors.push(`${file}: locale must be "en" or "es"`);
  }

  if (parsed.sections && !parsed.body) {
    errors.push(`${file}: uses "sections" but is missing the required top-level "body" field`);
  }

  if (parsed.body !== undefined) {
    const bodyIsValid = typeof parsed.body === "string" || Array.isArray(parsed.body);
    if (!bodyIsValid) {
      errors.push(`${file}: body must be a string or an array`);
    }

    if (Array.isArray(parsed.body) && parsed.body.length === 0) {
      errors.push(`${file}: body array cannot be empty`);
    }
  }
}

if (errors.length > 0) {
  console.error("Article validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated ${files.length} article file(s) in data/articles.`);
