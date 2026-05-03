import { getSite, type Locale } from "@/lib/content";

interface Props {
  locale: Locale;
  /** If provided, narrows schema to a single location's NAP. Otherwise emits an Organization with multiple Departments. */
  locationSlug?: string;
}

export async function LocalBusinessSchema({ locale, locationSlug }: Props) {
  const site = await getSite(locale);
  const baseUrl = "https://sonriadentista.com";

  if (locationSlug) {
    const loc = site.locations.list.find((l) => l.slug === locationSlug);
    if (!loc) return null;
    const json = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "@id": `${baseUrl}/${locale}/locations/${loc.slug}#dentist`,
      name: `Sonria Dentista of ${loc.city}`,
      url: `${baseUrl}/${locale}/locations/${loc.slug}`,
      telephone: loc.phone,
      image: `${baseUrl}/og-default.png`,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address.split(",")[0]?.trim(),
        addressLocality: loc.city,
        addressRegion: loc.state,
        postalCode: loc.address.match(/\b\d{5}\b/)?.[0] ?? "",
        addressCountry: "US",
      },
      geo: loc.lat && loc.lng ? { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng } : undefined,
      openingHours: loc.hoursOpen,
      hasMap: loc.googleMapsUrl,
      areaServed: (loc.neighborhoods ?? []).map((n) => ({ "@type": "Place", name: n })),
      aggregateRating: loc.rating && loc.reviewCount
        ? { "@type": "AggregateRating", ratingValue: loc.rating, reviewCount: loc.reviewCount, bestRating: 5 }
        : undefined,
      availableLanguage: ["English", "Spanish"],
      medicalSpecialty: ["Dentistry", "CosmeticDentistry", "Orthodontics"],
      sameAs: [
        "https://www.sonriadentista.com",
        loc.googleMapsUrl,
      ].filter(Boolean),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
  }

  const orgJson = {
    "@context": "https://schema.org",
    "@type": "DentalClinic",
    "@id": `${baseUrl}#organization`,
    name: site.name,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-default.png`,
    priceRange: "$$",
    availableLanguage: ["English", "Spanish"],
    medicalSpecialty: ["Dentistry", "CosmeticDentistry", "Orthodontics"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.stats?.avgRating ?? 4.93,
      reviewCount: site.stats?.totalReviews ?? 1501,
      bestRating: 5,
    },
    department: site.locations.list.map((loc) => ({
      "@type": "Dentist",
      "@id": `${baseUrl}/${locale}/locations/${loc.slug}#dentist`,
      name: `Sonria Dentista of ${loc.city}`,
      url: `${baseUrl}/${locale}/locations/${loc.slug}`,
      telephone: loc.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address.split(",")[0]?.trim(),
        addressLocality: loc.city,
        addressRegion: loc.state,
        postalCode: loc.address.match(/\b\d{5}\b/)?.[0] ?? "",
        addressCountry: "US",
      },
      geo: loc.lat && loc.lng ? { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng } : undefined,
      openingHours: loc.hoursOpen,
      aggregateRating: loc.rating && loc.reviewCount
        ? { "@type": "AggregateRating", ratingValue: loc.rating, reviewCount: loc.reviewCount, bestRating: 5 }
        : undefined,
      hasMap: loc.googleMapsUrl,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJson) }} />;
}
