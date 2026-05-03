import Link from "next/link";
import type { Metadata } from "next";
import { getArticlesByLocale } from "@/lib/articles";
import type { Locale } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Artículos | Sonria Dentista" : "Articles | Sonria Dentista",
    description: isEs
      ? "Guías prácticas sobre implantes, cuidado dental, urgencias y atención bilingüe en Texas."
      : "Practical guides on implants, dental care, emergencies, and bilingual care in Texas.",
    alternates: { canonical: `/${locale}/articles` },
  };
}

export default async function ArticlesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const articles = getArticlesByLocale(typedLocale);
  const isEs = typedLocale === "es";

  return (
    <>
      <section className="bg-card border-b border-border-soft">
        <div className="mx-auto max-w-4xl px-4 py-20 md:py-28">
          <span className="text-xs uppercase tracking-[0.18em] text-brand font-semibold">
            {isEs ? "Recursos" : "Resources"}
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl text-foreground leading-[1.04]">
            {isEs ? "Guías prácticas para tu salud dental" : "Practical guides for your dental health"}
          </h1>
          <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl">
            {isEs
              ? "Costos honestos, cómo decidir entre opciones, qué hacer en una urgencia. Sin tecnicismos."
              : "Honest pricing, how to choose between options, what to do in an emergency. No jargon."}
          </p>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          {articles.length === 0 ? (
            <p className="text-muted">{isEs ? "Próximamente." : "Coming soon."}</p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/${locale}/articles/${a.slug}`}
                    className="group flex flex-col h-full p-7 rounded-2xl border border-border-soft bg-card hover:border-brand hover:shadow-warm-lg transition"
                  >
                    <span className="text-[11px] uppercase tracking-[0.16em] text-muted-2 font-semibold">
                      {a.category}
                    </span>
                    <h2 className="mt-3 font-display text-2xl text-foreground group-hover:text-brand-deep transition leading-tight">
                      {a.title}
                    </h2>
                    <p className="mt-3 text-muted leading-relaxed flex-1">{a.summary}</p>
                    <div className="mt-5 pt-4 border-t border-border-soft text-xs text-muted-2 flex items-center justify-between">
                      <span>{a.publishedAt}</span>
                      <span className="font-medium text-brand">
                        {isEs ? "Leer →" : "Read →"}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
