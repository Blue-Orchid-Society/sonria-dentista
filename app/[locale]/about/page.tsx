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
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0" aria-hidden>
          <img
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-xs uppercase tracking-[0.18em] text-background/70">{site.about.subheading}</div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight text-white max-w-3xl">
            {site.about.heading}
          </h1>
          <p className="mt-5 text-lg text-background/85 max-w-2xl leading-relaxed">{site.about.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <div className="space-y-6">
          {site.about.story.map((p, i) => (
            <p key={i} className="text-lg text-muted leading-relaxed">{p}</p>
          ))}
        </div>
      </section>
{/* 
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
      </section> */}

    <section className="bg-gradient-to-br from-terracotta-soft/60 via-card to-sage-soft/30 border-y border-border-soft">
  <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
    <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
      {isEs ? "Lo que nos importa" : "What we care about"}
    </h2>
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {site.about.values.map((v) => (
        <div key={v.title} className="rounded-2xl bg-background/90 backdrop-blur border border-border-soft p-6">
          <h3 className="font-display text-xl text-foreground">{v.title}</h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">{v.body}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="bg-sage text-background">
  <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
    <div className="grid gap-6 md:grid-cols-4">
      {site.about.stats.map((s) => (
        <div key={s.label} className="rounded-2xl bg-background/10 border border-background/20 p-6 text-center">
          <div className="font-display text-4xl text-white">{s.value}</div>
          <div className="mt-2 text-xs uppercase tracking-wider text-background/70">{s.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>
    </>
  );
}