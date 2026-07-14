import Link from "next/link";
import type { Metadata } from "next";
import { getSite, type Locale } from "@/lib/content";
import { MeetTheDoctor } from "@/components/sections/MeetTheDoctor";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  return {
    title: site.about.heading,
    description: site.about.intro,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = await getSite(locale as Locale);
  const isEs = locale === "es";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-soft via-background to-terracotta-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-xs uppercase tracking-[0.18em] text-muted">{site.about.subheading}</div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight text-foreground max-w-3xl">
            {site.about.heading}
          </h1>
          <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">{site.about.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <div className="space-y-6">
          {site.about.story.map((p, i) => (
            <p key={i} className="text-lg text-muted leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
            {isEs ? "Lo que nos importa" : "What we care about"}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {site.about.values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-background border border-border-soft p-6">
                <h3 className="font-display text-xl text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-4">
          {site.about.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-sage-soft/50 border border-sage/20 p-6 text-center">
              <div className="font-display text-4xl text-foreground">{s.value}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <MeetTheDoctor heading={isEs ? "Conoce a tu equipo" : "Meet your team"} doctor={site.doctor} />

      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">{site.contactCTA.heading}</h2>
            <p className="mt-2 text-sm text-background/70 max-w-md">{site.contactCTA.bilingualNote}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.contact.phoneHref}
              className="rounded-full bg-terracotta px-6 py-3 text-white text-sm font-semibold hover:bg-terracotta-deep transition shadow-warm"
            >
              {site.contact.phone}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-background/30 px-6 py-3 text-background text-sm font-semibold hover:bg-background hover:text-foreground transition"
            >
              {site.nav.book}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
