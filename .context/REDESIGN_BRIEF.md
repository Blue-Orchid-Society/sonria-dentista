# Sonria Dentista — Redesign Brief

## Audience
Bilingual Texas families across 4 cities (Arlington HQ, Commerce, Paris, Grand Prairie). Often anxious about dental visits. Value: trust, warmth, friendly faces, clear pricing, bilingual respect.

## Mood
Warm community dentist. NOT clinical-corporate. NOT aggressive sales. Think: trusted neighborhood family practice that happens to be excellent at implants.

## Direction (vs current site)
Current site: warm cream/brown/gold base + family photo + pricing cards = good bones. Bad: random cyan callout breaks palette, dated typography, no clear bilingual toggle, layout feels boxy.

Redesign: keep warmth + community feel + pricing transparency. Modernize palette + typography + spacing.

## Color palette
- Background: cream `#FBF7EE`
- Sage primary: `#7C9882` (a soft warm green — calming, healthcare trust)
- Terracotta accent: `#C46A3A` (warm CTA color, headline accent)
- Warm charcoal: `#2D2A24` (body text)
- Cream-card: `#FFFCF6` (slight contrast for cards)
- Border-soft: `#E6DDC9`

## Typography
- Headlines: Playfair Display (already loaded)
- Body / nav / UI: Inter (already loaded)
- Hero headline scale: ~clamp(2.5rem, 5vw, 4.5rem)
- Serif headlines used SPARINGLY — for hero and major section openers only

## Bilingual treatment
- Header toggle: `EN | ES` always visible, equal weight (not "español" buried in footer)
- `/` redirects to `/es` (already done — Spanish is primary audience)
- All copy must exist in BOTH `data/site.es.json` AND `data/site.en.json` — never let one drift

## Content priorities
1. Hero: warm image (placeholder Unsplash for now) + serif headline + 1-line subhead + 2 CTAs (Book Visit / Call Now with phone (682) 284-1120)
2. Three trust signals immediately below hero: "Bilingual Care" / "4 TX Locations" / "New Patient $79.99"
3. Services with prices (single-tooth implant $2,499 / All-on-4 $15,999 / overdentures from $8,999) — elegant cards, not the boxy current grid
4. 4 locations as cards with addresses + phone + hours
5. Meet Dr. Namineni section (placeholder photo + bilingual welcome)
6. Contact CTA — phone, email info@sonriadentista.com, bilingual note

## Image placeholders
Use Unsplash with deterministic IDs for now:
- Hero: warm dental office or smiling family — recommend `https://images.unsplash.com/photo-1606811971618-4486d14f3f99` style (warm, natural light, real people)
- Service cards: clean stock dental imagery
- Doctor: friendly headshot placeholder

When uncle sends real photos, swap by replacing URLs in `data/site.{es,en}.json`.

## What's working in current site (preserve the spirit of)
- "Your Community Dentist" framing
- Pricing transparency (the $2,499 single-tooth is a strong conversion lever)
- "A True Dental Home" warmth
- Family photography
