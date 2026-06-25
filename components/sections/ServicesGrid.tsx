"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";

type Service = { slug: string; name: string; blurb: string; icon?: string };
type FeaturedPrice = { label: string; price: string; note: string };
type Props = {
  heading: string;
  subheading?: string;
  services: Service[];
  pricingFeatured?: FeaturedPrice[];
  locale: string;
};

const SERVICE_IMAGES: Record<string, string> = {
  preventive:
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
  children:
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
  restorative:
    "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=80",
  "missing-teeth":
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80",
  cosmetic:
    "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?auto=format&fit=crop&w=1200&q=80",
  sedation:
    "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
  "clear-braces":
    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
  implants:
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  "snap-on-dentures":
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
  "emergencies-extractions":
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80",
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80",
];

export function ServicesGrid({ heading, subheading, services, pricingFeatured, locale }: Props) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isEs = locale === "es";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: 0,
      },
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [services.length]);

  const activeService = services[activeIndex] ?? services[0];

  return (
    <section id="services" className="bg-[#f3f1eb] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              {isEs ? "Servicios dentales" : "Dental services"}
            </span>
            <h2 className="mt-3 max-w-md font-display text-4xl leading-tight text-foreground md:text-5xl">
              {heading}
            </h2>
            {subheading && <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">{subheading}</p>}

            <div className="mt-8 flex items-center gap-1.5" aria-hidden="true">
              {services.map((service, index) => (
                <span
                  key={service.slug}
                  className={
                    "h-1.5 rounded-full transition-all duration-300 " +
                    (index === activeIndex ? "w-8 bg-foreground" : "w-3 bg-border-soft")
                  }
                />
              ))}
            </div>

            {activeService && (
              <div className="mt-10 rounded-xl border border-border-soft bg-card p-5 shadow-warm">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                  {isEs ? "Ahora destacado" : "Now Active"}
                </div>
                <div className="mt-2 font-display text-3xl text-foreground">{activeService.name}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{activeService.blurb}</p>
              </div>
            )}

            {pricingFeatured && pricingFeatured.length > 0 && (
              <div className="mt-5 grid gap-3">
                {pricingFeatured.slice(0, 3).map((item) => (
                  <div key={item.label} className="flex gap-3 rounded-xl bg-foreground p-4 text-background">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <div className="text-sm font-semibold">{item.label}: {item.price}</div>
                      <div className="mt-1 text-xs leading-relaxed text-background/65">{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            {services.map((service, index) => (
              <div
                key={service.slug}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                data-index={index}
                className="flex min-h-[62vh] items-center py-4 md:min-h-[86vh]"
              >
                <ServiceShowcaseCard
                  service={service}
                  locale={locale}
                  imageUrl={SERVICE_IMAGES[service.slug] ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                  isActive={index === activeIndex}
                  offset={index - activeIndex}
                  isEs={isEs}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceShowcaseCard({
  service,
  locale,
  imageUrl,
  isActive,
  offset,
  isEs,
}: {
  service: Service;
  locale: string;
  imageUrl: string;
  isActive: boolean;
  offset: number;
  isEs: boolean;
}) {
  return (
    <Link
      href={`/${locale}/services/${service.slug}`}
      className="group sticky top-28 mx-auto block w-full max-w-[600px] overflow-hidden rounded-2xl bg-foreground shadow-[0_30px_70px_-30px_rgba(45,42,36,0.55)] transition-all duration-500 ease-out"
      style={{
        opacity: isActive ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.35),
        transform: isActive
          ? "translateY(0) scale(1)"
          : `translateY(${offset * 14}px) scale(${1 - Math.min(Math.abs(offset), 2) * 0.035})`,
      }}
    >
      <div className="relative flex aspect-[4/3] w-full items-end overflow-hidden">
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/75" />

        <div className="absolute inset-x-0 top-0 p-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground shadow-warm">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
            {isEs ? "Cuidado familiar" : "Family care"}
          </div>
          <h3 className="mt-4 max-w-md font-display text-4xl leading-tight text-white md:text-5xl">
            {service.name}
          </h3>
        </div>

        <div className="relative z-10 w-full p-5">
          <div className="rounded-xl border border-white/15 bg-black/38 p-4 text-white backdrop-blur">
            <p className="line-clamp-2 text-sm leading-relaxed text-white/82">{service.blurb}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
              {isEs ? "Ver opciones" : "See options"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
