import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getAllArticles } from "@/lib/articles";
import { getSite, type Locale } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? "Guias dentales" : "Dental articles",
    description: isEs
      ? "Guias utiles de Sonria Dentista para entender opciones, costos, preparacion y proximos pasos antes de una visita."
      : "Helpful Sonria Dentista articles for understanding options, costs, preparation, and next steps before a visit.",
    alternates: {
      canonical: `https://sonriadentista.com/${locale}/articles`,
      languages: {
        en: "https://sonriadentista.com/en/articles",
        es: "https://sonriadentista.com/es/articles",
      },
    },
  };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  const isEs = locale === "es";
  const articles = getAllArticles(locale as Locale);

  return (
    <>
      <section className="relative overflow-hidden bg-sage-deep text-white">
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-sage-deep/82" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {isEs ? "Guias para pacientes" : "Patient articles"}
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            {isEs ? "Aprenda antes de su visita" : "Learn before your visit"}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
            {isEs
              ? "Articulos claros y practicos para ayudarle a comparar opciones, preparar preguntas y sentirse listo para hablar con el equipo de Sonria."
              : "Clear, practical articles to help you compare options, prepare questions, and feel ready to speak with the Sonria team."}
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
                {articles.length} {isEs ? "guias" : "guides"}
              </p>
              <h2 className="mt-2 font-display text-4xl text-foreground md:text-5xl">
                {isEs ? "Ultimos articulos" : "Latest articles"}
              </h2>
            </div>
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:border-terracotta hover:text-terracotta"
            >
              {isEs ? "Ver herramientas" : "View tools"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {articles.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${locale}/articles/${article.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card shadow-warm transition hover:-translate-y-0.5 hover:shadow-warm-lg"
                >
                  <img
                    src={article.heroImage}
                    alt={article.heroImageAlt}
                    className="h-48 w-full object-cover transition group-hover:scale-[1.03]"
                  />
                  <div className="p-6">
                    <div className="mb-4 inline-flex rounded-full bg-terracotta/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                      {article.category}
                    </div>
                    <h3 className="font-display text-2xl leading-tight text-foreground">{article.title}</h3>
                    <p className="mt-3 leading-7 text-muted">{article.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
                      {isEs ? "Leer guia" : "Read guide"}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 text-muted">
              {isEs
                ? "Aun no hay articulos para este idioma."
                : "There are no articles for this language yet."}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gold py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          {[
            isEs ? "Escrito para pacientes" : "Written for patients",
            isEs ? "Con enlaces internos" : "Built with internal links",
            isEs ? "Listo para SEO" : "Ready for SEO",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl bg-white/45 p-5 text-foreground">
              <CheckCircle2 className="h-5 w-5 text-sage-deep" aria-hidden="true" />
              <span className="font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </section>

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
