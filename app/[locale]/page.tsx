import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { LocationsGrid } from "@/components/sections/LocationsGrid";
import { MeetTheDoctor } from "@/components/sections/MeetTheDoctor";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getSite } from "@/lib/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = await getSite(locale as "en" | "es");
  const doctorHeading = locale === "es" ? "Conoce a tu equipo" : "Meet your team";

  return (
    <>
      <Hero
        title={site.hero.title}
        subtitle={site.hero.subtitle}
        ctaPrimary={site.hero.ctaPrimary}
        ctaSecondary={site.hero.ctaSecondary}
        phone={site.contact.phone}
        imageUrl={site.hero.imageUrl}
        imageAlt={site.hero.imageAlt}
        trustSignals={site.hero.trustSignals}
        bilingualNote={site.contactCTA.bilingualNote}
      />
      <ServicesGrid
        heading={site.services.heading}
        subheading={site.services.subheading}
        services={site.services.list}
        pricingFeatured={site.services.pricingFeatured}
        locale={locale}
      />
      <LocationsGrid
        heading={site.locations.heading}
        subheading={site.locations.subheading}
        locations={site.locations.list}
        locale={locale}
      />
      <MeetTheDoctor heading={doctorHeading} doctor={site.doctor} />
      <ContactCTA
        heading={site.contactCTA.heading}
        body={site.contactCTA.body}
        cta={site.contactCTA.cta}
        phone={site.contact.phone}
        email={site.contact.email}
        bilingualNote={site.contactCTA.bilingualNote}
      />
    </>
  );
}
