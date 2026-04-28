import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { LocationsGrid } from "@/components/sections/LocationsGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getSite } from "@/lib/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = await getSite(locale as "en" | "es");

  return (
    <>
      <Hero
        title={site.hero.title}
        subtitle={site.hero.subtitle}
        ctaPrimary={site.hero.ctaPrimary}
        ctaSecondary={site.hero.ctaSecondary}
        phone={site.contact.phone}
      />
      <ServicesGrid heading={site.services.heading} services={site.services.list} locale={locale} />
      <LocationsGrid heading={site.locations.heading} locations={site.locations.list} locale={locale} />
      <ContactCTA
        heading={site.contactCTA.heading}
        body={site.contactCTA.body}
        cta={site.contactCTA.cta}
        phone={site.contact.phone}
      />
    </>
  );
}
