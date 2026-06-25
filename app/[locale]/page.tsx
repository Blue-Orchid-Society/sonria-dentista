import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
// import { LocationsGrid } from "@/components/sections/LocationsGrid";
import { MeetTheDoctor } from "@/components/sections/MeetTheDoctor";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getSite } from "@/lib/content";

const testimonials = {
  en: {
    eyebrow: "Patient reviews",
    heading: "Patients trust Sonria with their smiles",
    subheading:
      "Real review snippets from the current Sonria site and public review profiles.",
    items: [
      {
        quote:
          "Love my new dentist. They are very affordable. Dentist was very professional and staff were great.",
        name: "Annie C.",
        detail: "Arlington patient",
      },
      {
        quote:
          "Been a patient of dr. C for longtime. He does an amazing job. Staff are great and friendly.",
        name: "Michael D.",
        detail: "Arlington patient",
      },
      {
        quote:
          "The current site highlights a 4.9 average rating and more than 10k happy patients across Sonria locations.",
        name: "Sonria Dentista",
        detail: "Current site trust signal",
      },
    ],
  },
  es: {
    eyebrow: "Resenas de pacientes",
    heading: "Pacientes confian sus sonrisas a Sonria",
    subheading:
      "Fragmentos de resenas reales del sitio actual de Sonria y perfiles publicos.",
    items: [
      {
        quote:
          "Love my new dentist. They are very affordable. Dentist was very professional and staff were great.",
        name: "Annie C.",
        detail: "Paciente de Arlington",
      },
      {
        quote:
          "Been a patient of dr. C for longtime. He does an amazing job. Staff are great and friendly.",
        name: "Michael D.",
        detail: "Paciente de Arlington",
      },
      {
        quote:
          "El sitio actual destaca una calificacion promedio de 4.9 y mas de 10k pacientes felices en las ubicaciones de Sonria.",
        name: "Sonria Dentista",
        detail: "Senal de confianza del sitio actual",
      },
    ],
  },
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = await getSite(locale as "en" | "es");
  const isEs = locale === "es";
  const doctorHeading = isEs ? "Conoce a tu equipo" : "Meet your team";
  const testimonialContent = isEs ? testimonials.es : testimonials.en;

  return (
    <>
      <Hero
        locale={locale as "en" | "es"}
        title={site.hero.title}
        subtitle={site.hero.subtitle}
        ctaPrimary={site.hero.ctaPrimary}
        ctaSecondary={site.hero.ctaSecondary}
        phone={site.contact.phone}
        imageUrl={site.hero.imageUrl}
        imageAlt={site.hero.imageAlt}
        videoUrl={site.hero.videoUrl}
        trustSignals={site.hero.trustSignals}
        bilingualNote={site.contactCTA.bilingualNote}
        locations={site.locations.list.map((l) => ({ slug: l.slug, city: l.city }))}
        services={site.services.list.map((s) => ({ slug: s.slug, name: s.name }))}
      />
      <ServicesGrid
        heading={site.services.heading}
        subheading={site.services.subheading}
        services={site.services.list}
        pricingFeatured={site.services.pricingFeatured}
        locale={locale}
      />
      {/* <LocationsGrid
        heading={site.locations.heading}
        subheading={site.locations.subheading}
        locations={site.locations.list}
        locale={locale}
      /> */}
      <MeetTheDoctor heading={doctorHeading} doctor={site.doctor} />
      <TestimonialsSection
        eyebrow={testimonialContent.eyebrow}
        heading={testimonialContent.heading}
        subheading={testimonialContent.subheading}
        testimonials={testimonialContent.items}
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
