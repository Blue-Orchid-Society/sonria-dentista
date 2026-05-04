import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { LocationsGrid } from "@/components/sections/LocationsGrid";
import { MeetTheDoctor } from "@/components/sections/MeetTheDoctor";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getSite } from "@/lib/content";

const testimonials = {
  en: {
    eyebrow: "Patient stories",
    heading: "Families feel cared for here",
    subheading:
      "Patients come to Sonria for clear answers, gentle visits, and a team that makes dental care easier to manage.",
    items: [
      {
        quote:
          "They explained every option in English and Spanish, checked my insurance before treatment, and made the whole visit feel calm.",
        name: "Marisol R.",
        detail: "Arlington patient",
      },
      {
        quote:
          "I came in with tooth pain and they saw me the same day. The price was clear before anything started.",
        name: "Daniel M.",
        detail: "Emergency visit",
      },
      {
        quote:
          "Our kids, parents, and grandparents all go here. The staff remembers us and never rushes the appointment.",
        name: "The Hernandez family",
        detail: "Family dentistry patients",
      },
    ],
  },
  es: {
    eyebrow: "Historias de pacientes",
    heading: "Familias se sienten cuidadas aqui",
    subheading:
      "Los pacientes vienen a Sonria por respuestas claras, visitas tranquilas, y un equipo que hace el cuidado dental mas facil.",
    items: [
      {
        quote:
          "Me explicaron cada opcion en espanol e ingles, revisaron mi seguro antes del tratamiento, y la visita fue tranquila.",
        name: "Marisol R.",
        detail: "Paciente de Arlington",
      },
      {
        quote:
          "Llegue con dolor de muela y me atendieron el mismo dia. El precio fue claro antes de empezar.",
        name: "Daniel M.",
        detail: "Visita de emergencia",
      },
      {
        quote:
          "Nuestros hijos, padres y abuelos vienen aqui. El equipo nos recuerda y nunca apura la cita.",
        name: "Familia Hernandez",
        detail: "Pacientes de odontologia familiar",
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
