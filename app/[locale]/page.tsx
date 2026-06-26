import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TrueDentalHome } from "@/components/sections/TrueDentalHome";
import { MissingTeethFeature } from "@/components/sections/MissingTeethFeature";
import { SmileGallery } from "@/components/sections/SmileGallery";
import { AffordabilityFeature } from "@/components/sections/AffordabilityFeature";
import { LocationsGrid } from "@/components/sections/LocationsGrid";
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
          "Been a patient of dr. C for longtime. He does an amazing job. Staff are great and friendly. Always welcoming. Highly recommended.",
        name: "Jhon",
        detail: "Commerce, TX",
      },
      {
        quote:
          "Very friendly and professional. The office is clean and welcoming. Definitely recommend Sonria Dentista for families!",
        name: "Maria",
        detail: "Paris, TX",
      },
      {
        quote:
          "I had the best experience at Sonria dentista. They're amazing and very sweet. They make sure you're okay when they working on your teeth.",
        name: "Robert",
        detail: "Grand Prairie, TX",
      },
      {
        quote:
          "Love my new dentist. They are very affordable. Dentist was very professional and staff were great. They made me feel at home.",
        name: "Michael D.",
        detail: "Arlington, TX",
      },
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
          "Been a patient of dr. C for longtime. He does an amazing job. Staff are great and friendly. Always welcoming. Highly recommended.",
        name: "Jhon",
        detail: "Commerce, TX",
      },
      {
        quote:
          "Very friendly and professional. The office is clean and welcoming. Definitely recommend Sonria Dentista for families!",
        name: "Maria",
        detail: "Paris, TX",
      },
      {
        quote:
          "I had the best experience at Sonria dentista. They're amazing and very sweet. They make sure you're okay when they working on your teeth.",
        name: "Robert",
        detail: "Grand Prairie, TX",
      },
      {
        quote:
          "Love my new dentist. They are very affordable. Dentist was very professional and staff were great. They made me feel at home.",
        name: "Michael D.",
        detail: "Arlington, TX",
      },
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
  const overviewServices = site.services.list.filter((service) => service.showInOverview !== false);
  const homeCopy = isEs ? homeSections.es : homeSections.en;

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
        services={overviewServices.map((s) => ({ slug: s.slug, name: s.name }))}
      />
      <TrueDentalHome
        eyebrow={homeCopy.trueHome.eyebrow}
        heading={homeCopy.trueHome.heading}
        intro={homeCopy.trueHome.intro}
        values={site.about.values}
      />
      <ServicesGrid
        heading={site.services.heading}
        subheading={site.services.subheading}
        services={overviewServices}
        pricingFeatured={site.services.pricingFeatured}
        locale={locale}
      />
      <MissingTeethFeature
        locale={locale}
        eyebrow={homeCopy.missingTeeth.eyebrow}
        heading={homeCopy.missingTeeth.heading}
        body={homeCopy.missingTeeth.body}
        items={[
          {
            label: isEs ? "Emergencias y extracciones" : "Emergencies and extractions",
            href: `/${locale}/services/emergencies-extractions`,
          },
          {
            label: isEs ? "Dentaduras y parciales" : "Dentures and partials",
            href: `/${locale}/services/dentures`,
          },
          {
            label: isEs ? "Implantes dentales" : "Dental implants",
            href: `/${locale}/services/dental-implants`,
          },
        ]}
      />
      <SmileGallery
        eyebrow={homeCopy.gallery.eyebrow}
        heading={homeCopy.gallery.heading}
        body={homeCopy.gallery.body}
      />
      <AffordabilityFeature
        locale={locale}
        eyebrow={homeCopy.affordability.eyebrow}
        heading={homeCopy.affordability.heading}
        body={homeCopy.affordability.body}
        items={site.services.pricingFeatured.map((item) => ({
          label: item.label,
          note: item.note,
        }))}
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

const homeSections = {
  en: {
    trueHome: {
      eyebrow: "Welcome to Sonria Dentistry",
      heading: "A true dental home",
      intro:
        "Modern dentistry, exceptional care, and confident smiles. Sonria brings experienced clinicians, practical affordability, and bilingual support together for the whole family.",
    },
    missingTeeth: {
      eyebrow: "We specialize in replacing missing teeth",
      heading: "Restore function, beauty, and confidence.",
      body:
        "From emergency treatment and extractions to dentures, partials, snap-on dentures, and implants, Sonria helps patients choose a practical path back to a confident smile.",
    },
    gallery: {
      eyebrow: "Smile gallery",
      heading: "Eye-catching results",
      body:
        "The quality of dental work is easier to understand when patients can see real smile outcomes. These gallery assets are from the current Sonria site and can be replaced with newer approved cases later.",
    },
    affordability: {
      eyebrow: "Dental insurance, Medicare, and financing",
      heading: "Excellent dentistry made affordable",
      body:
        "Sonria welcomes insurance questions and offers flexible payment options so patients can begin care with more confidence.",
    },
  },
  es: {
    trueHome: {
      eyebrow: "Bienvenido a Sonria Dentistry",
      heading: "Un verdadero hogar dental",
      intro:
        "Odontologia moderna, cuidado excepcional y sonrisas con confianza. Sonria une experiencia clinica, opciones accesibles y apoyo bilingue para toda la familia.",
    },
    missingTeeth: {
      eyebrow: "Especialistas en reemplazar dientes perdidos",
      heading: "Restaura funcion, belleza y confianza.",
      body:
        "Desde emergencias y extracciones hasta dentaduras, parciales, opciones snap-on e implantes, Sonria ayuda a elegir un camino practico para volver a sonreir.",
    },
    gallery: {
      eyebrow: "Galeria de sonrisas",
      heading: "Resultados que se notan",
      body:
        "La calidad del trabajo dental se entiende mejor cuando se pueden ver resultados. Estas imagenes vienen del sitio actual de Sonria y se pueden reemplazar despues con casos nuevos aprobados.",
    },
    affordability: {
      eyebrow: "Seguro dental, Medicare y financiamiento",
      heading: "Odontologia excelente y accesible",
      body:
        "Sonria responde preguntas sobre cobertura y ofrece opciones de pago flexibles para que los pacientes puedan iniciar su cuidado con mas confianza.",
    },
  },
} as const;
