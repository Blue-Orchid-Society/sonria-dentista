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
          "From the receptionist to the hygienist to the dentist, everyone greeted me with a big smile and made me feel welcome. Scheduling was easy and the place was clean and hygienic, with almost no wait.",
        name: "Angela",
        detail: "Patient review",
      },
      {
        quote:
          "I've been to this dentist three times in six months for a cleaning, a filling, and a crown. I experienced excellent care and value each time and refer everyone I can.",
        name: "Larry Batson",
        detail: "Patient review",
      },
      {
        quote:
          "The entire staff was friendly and helpful. I appreciate their kind and respectful professionalism. They helped me relax enough to move forward with repairing my dental health and self-confidence.",
        name: "Angela Gayford",
        detail: "Patient review",
      },
      {
        quote:
          "The physician communicated everything in a way I could understand, and she and her assistant showed genuine compassion that calmed my nervousness.",
        name: "Regina Boyd",
        detail: "Patient review",
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
          "From the receptionist to the hygienist to the dentist, everyone greeted me with a big smile and made me feel welcome. Scheduling was easy and the place was clean and hygienic, with almost no wait.",
        name: "Angela",
        detail: "Resena de paciente",
      },
      {
        quote:
          "I've been to this dentist three times in six months for a cleaning, a filling, and a crown. I experienced excellent care and value each time and refer everyone I can.",
        name: "Larry Batson",
        detail: "Resena de paciente",
      },
      {
        quote:
          "The entire staff was friendly and helpful. I appreciate their kind and respectful professionalism. They helped me relax enough to move forward with repairing my dental health and self-confidence.",
        name: "Angela Gayford",
        detail: "Resena de paciente",
      },
      {
        quote:
          "The physician communicated everything in a way I could understand, and she and her assistant showed genuine compassion that calmed my nervousness.",
        name: "Regina Boyd",
        detail: "Resena de paciente",
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
