# Sonria Dentistry of Arlington — Rebuild Handoff

Source of truth captured from sonriadentista.com on 2026-04-28.
This is what the v1 rebuild should mirror unless explicitly changed.

## Identity

- **Practice name**: Sonria Dentistry of Arlington (also "Sonria Dentista")
- **Tagline**: "Your Community Dentist"
- **Subtitle**: "Personalized, Convenient, & Affordable Dental Care for the Whole Family"
- **Owner / lead dentist**: Dr. Deepti Namineni
- **Second dentist**: Dr. Ahn
- **Languages**: English + Spanish (bilingual team)

## Locations (4)

| City | Notes |
|---|---|
| Arlington (HQ) | 2024 Baird Farm Rd Ste. 100, Arlington, TX 76011 — main location |
| Commerce | satellite |
| Paris | satellite (sister-site SEO opportunity with Chapala Realty) |
| Grand Prairie | satellite |

## Contact

- **Phone**: (682) 284-1120
- **Email**: info@sonriadentista.com
- **Hours**: Mon–Fri 9:00 AM – 5:00 PM, Sat 9:00 AM – 2:00 PM
- **Map**: 32.767723, -97.085561

## Navigation

- Home
- About Us → What Sets Us Apart, Meet the Dentists, Tour Office, Smile Gallery, Dental Technology, Blog
- Our Services (full submenu, see services list)
- For Patients → Forms, Insurance & Financing, FAQs, Special Offers
- Reviews
- Locations (Arlington, Commerce, Paris, Grand Prairie)
- Contact / Request Appointment
- Refer a Patient

## Services

**Preventive**: checkups, cleanings, gum disease treatment
**Pediatric**: children's dentistry
**Restorative**: fillings, dental crowns
**Prosthodontics**: dental bridges, dentures, implant-retained dentures
**Cosmetic**: veneers, teeth whitening
**Orthodontics**: Invisalign
**Sedation**: anxiety management
**Emergency**: root canals, extractions, wisdom tooth removal
**Implants**: single-tooth, all-on-4, over-dentures

## Pricing (specific items called out on site)

- Single-tooth implant: $2,499
- Implant-retained dentures (over-dentures): from $8,999
- All-on-4 implant dentures: $15,999/arch
- New patient special: $79.99

## Insurance / financing

- All dental insurance plans
- Medicaid
- Medicare
- Third-party financing

## CTAs

- Primary: "Request an Appointment"
- Secondary: New Patient Special form ($79.99) with referral source field
  - Patient status: New / Existing
  - Heard about us via: Search Engine, Family/Friend, Promotion, Social Media, Other

## Testimonials (verbatim)

"Love my new dentist. They are very affordable. Dentist was very professional and staff were great."
— Annie C., Arlington, TX

"Been a patient of dr. C for longtime. He does an amazing job. Staff are great and friendly."
— Michael D., Arlington, TX

## Social

- Facebook: facebook.com/profile.php?id=100091328546832
- Google Business Profile (Maps reviews link on site)

## Visual feel (current site)

- Modern, family-friendly, approachable
- Professional/clinical color palette (capture screenshots before scaffold for color picks)
- Imagery: family photos, before/after smile gallery, team photos, animated medical icons

## Rebuild notes

- True bilingual /es and /en route trees from day one. Default / redirects to user-detected locale (Spanish-leaning given Arlington TX demographics).
- All 4 locations get dedicated pages at /[locale]/locations/[city] — high-value local SEO.
- Each service gets a dedicated page at /[locale]/services/[slug] so SEO agent can write deep content per service.
- Contact form posts to /api/contact → Resend → info@sonriadentista.com.
- Maintain pricing transparency (the called-out implant prices are a differentiator, keep them prominent).

## Open questions for uncle

- Logo file (vector preferred)
- Real photos he wants reused (or permission to scrape from current site)
- Final email recipient for contact form (info@sonriadentista.com or different)
- Any copy / branding changes vs current site
- Confirm 4 locations are still active
