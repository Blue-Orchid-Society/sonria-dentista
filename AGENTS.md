# Agent Conventions for sonria-dentista

This file tells coding/SEO agents how to safely edit this repo.

## Branch + PR rules

- Branch: `<role>/<slug>` (e.g., `seo/location-arlington-tx`, `manastm/hero-copy-tweak`).
- One concern per PR. Keep diffs tight.
- PR title format: `[<role>] <what changed>` (e.g., `[seo] add location: arlington`).
- All PRs require Manas review before merge.

## Where things live

| What | Where | Format |
|---|---|---|
| Home page copy | `data/site.{en,es}.json` | JSON |
| Service deep pages | `data/services/<slug>.{en,es}.json` | JSON |
| Location deep pages | `data/locations/<slug>.{en,es}.json` | JSON |
| Components | `components/sections/` | TSX |
| Layouts | `app/[locale]/layout.tsx`, `app/layout.tsx` | TSX |
| API routes | `app/api/<name>/route.ts` | TS |
| SEO metadata | `app/[locale]/page.tsx` (and per-page) | TSX |

## Bilingual rules

- Every JSON file under `data/` exists in both `.en.json` and `.es.json`.
- If you add or rename a field in one locale, do it in the other in the SAME PR.
- Never machine-translate without Spanish-fluent review for clinical terms (insurance, procedure names).

## SEO agent contract

When the SEO department dispatches a location- or service-page task:
1. Read `Departments/SEO/STATE.md` in the vault for this week's targets.
2. Branch, write the JSON file pair (en + es), commit.
3. Open a PR titled `[seo] add <type>: <slug>` with a one-paragraph brief describing keyword target.
4. Do not modify components or layouts without explicit instruction.

## Don't

- Don't add a CMS (we keep content as JSON).
- Don't add Three.js, animation libs, or anything heavy. The dental audience does not need it.
- Don't change the Vercel scope (always `syndicate-e66a97a1`).
- Don't commit `.env.local` or any API keys.
