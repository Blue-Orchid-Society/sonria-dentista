import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { LocationChips } from "@/components/sections/LocationChips";
import { Welcome } from "@/components/sections/Welcome";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TestimonialsWall } from "@/components/sections/TestimonialsWall";
import { NAPBlock } from "@/components/sections/NAPBlock";
import { MeetTheDoctor } from "@/components/sections/MeetTheDoctor";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getSite, type Locale } from "@/lib/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const site = await getSite(typedLocale);
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
      <TrustBand locale={typedLocale} />
      <LocationChips locale={typedLocale} />
      <Welcome locale={typedLocale} />
      <ServicesGrid
        heading={site.services.heading}
        subheading={site.services.subheading}
        services={site.services.list}
        pricingFeatured={site.services.pricingFeatured}
        locale={locale}
      />
      <TestimonialsWall locale={typedLocale} />
      <MeetTheDoctor heading={doctorHeading} doctor={site.doctor} />
      <NAPBlock locale={typedLocale} />
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
