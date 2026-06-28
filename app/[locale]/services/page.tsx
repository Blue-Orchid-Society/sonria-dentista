import type { Metadata } from "next";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getSite, type Locale } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  const isEs = locale === "es";

  return {
    title: isEs ? "Servicios dentales" : "Dental services",
    description: site.services.subheading,
    alternates: {
      canonical: `https://sonriadentista.com/${locale}/services`,
      languages: {
        en: "https://sonriadentista.com/en/services",
        es: "https://sonriadentista.com/es/services",
      },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  const overviewServices = site.services.list.filter((service) => service.showInOverview !== false);

  return (
    <>
      <ServicesGrid
        heading={site.services.heading}
        subheading={site.services.subheading}
        services={overviewServices}
        pricingFeatured={site.services.pricingFeatured}
        locale={locale}
      />
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

