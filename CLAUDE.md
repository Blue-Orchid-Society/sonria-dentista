# Sonria Dentistry of Arlington

Bilingual (EN/ES) website for Dr. Deepti Namineni's dental practice with 4 Texas locations (Arlington, Commerce, Paris, Grand Prairie). Maintained by Manas's coding agents on behalf of family ownership.

## Quick context

- **Audience**: Arlington TX area residents, English + Spanish speakers, family dental patients.
- **Live URL** (post-cutover): sonriadentista.com — currently on Vercel preview only.
- **Source captured**: `.context/HANDOFF.md` mirrors the original site's content as of 2026-04-28.

## Stack

- Next.js 16 App Router + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first config in `app/globals.css`)
- Bilingual via `app/[locale]/...` with static params `["en", "es"]`. Root `/` redirects to `/es` (default for Arlington TX demographic).
- Data lives in `data/*.json` — agent-writable, no CMS.
- Resend for contact form (stub at `app/api/contact/route.ts` until API key set).

## How to edit content

- **Hero, services list, locations list, contact info**: edit `data/site.en.json` and `data/site.es.json`. Changes flow into the home page automatically.
- **Per-service deep page** (future): add `data/services/<slug>.en.json` + `<slug>.es.json` and a route at `app/[locale]/services/[slug]/page.tsx`.
- **Per-location deep page** (future): same pattern in `data/locations/`.
- **Components**: live in `components/sections/`. Mostly server components.

## Editing rules (for agents)

- Mirror EN ↔ ES content shape exactly. If you add a field to one locale, add it to the other.
- Never use em dashes in copy (Manas preference).
- All copy must be specific (real services, real locations, real prices). No filler.
- Pricing on the site is a differentiator — keep `$2,499 single-tooth implant`, `from $8,999 over-dentures`, `$15,999 All-on-4`, `$79.99 new patient` prominent.
- Bilingual: Spanish first when in doubt, English second. Default `/` → `/es`.

## Deploy

Pushed to `main` triggers a Vercel deploy on the Syndicate team. Manual:
```
npm run deploy   # vercel deploy --prod --scope syndicate-e66a97a1
```

## SEO agent integration

The vault `Departments/SEO/` will assign location-page and service-page tasks. SEO agent writes JSON to `data/services/` or `data/locations/` on a feature branch and opens a PR. Review + merge → Vercel deploys.

## Open questions

See `.context/HANDOFF.md` for full list — logo, photos, final contact email, service confirmations, etc.
