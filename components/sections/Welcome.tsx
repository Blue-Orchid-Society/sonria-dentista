import type { Locale } from "@/lib/content";

export function Welcome({ locale }: { locale: Locale }) {
  const isEs = locale === "es";

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <span className="text-xs uppercase tracking-[0.18em] text-brand font-semibold">
          {isEs ? "Familia bienvenida" : "Family welcome"}
        </span>
        <h2 className="mt-4 font-display text-3xl md:text-5xl text-foreground leading-tight">
          {isEs
            ? "Una clínica dental que de verdad habla tu idioma."
            : "A dental practice that genuinely speaks your language."}
        </h2>

        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground-soft">
          {isEs ? (
            <>
              <p>
                Sonria Dentista es una práctica familiar bilingüe dirigida por la Dra. Deepti Namineni con cuatro consultorios en Texas: Arlington, Grand Prairie, Paris y Commerce. Atendemos a familias hispanohablantes y angloparlantes con la misma calidad de cuidado, en el idioma con el que cada paciente se sienta más cómodo.
              </p>
              <p>
                Hacemos lo que la mayoría de los consultorios dentales más grandes no hacen: explicamos los costos antes de empezar, ofrecemos planes de pago sin interés en la mayoría de los servicios, y vemos emergencias el mismo día siempre que es posible. Aceptamos los seguros dentales más comunes y ofrecemos opciones para pacientes sin seguro.
              </p>
              <p>
                Más de 1,500 reseñas de 5 estrellas en Google nos respaldan, pero lo que realmente importa son las familias que regresan año tras año, generación tras generación. Somos práctica de mujer y, en Commerce, también veterana.
              </p>
            </>
          ) : (
            <>
              <p>
                Sonria Dentista is a bilingual family practice led by Dr. Deepti Namineni with four offices across North Texas: Arlington, Grand Prairie, Paris, and Commerce. We treat Spanish-speaking and English-speaking families with the same standard of care, in whichever language is most comfortable for each patient.
              </p>
              <p>
                We do what the bigger dental chains often don&apos;t: walk through pricing before any work starts, offer interest-free payment plans on most services, and reserve same-day appointment slots for genuine emergencies. We accept most major dental insurance and have options for patients without insurance.
              </p>
              <p>
                Over 1,500 5-star Google reviews back us up, but the real measure is families who keep coming back, year after year, generation after generation. We&apos;re a woman-owned practice, and our Commerce office is also veteran-owned.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
