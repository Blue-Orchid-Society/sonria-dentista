"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, MapPin, Menu } from "lucide-react";
import type { Locale } from "@/lib/content";

type Location = {
  slug: string;
  city: string;
  address: string;
  phone: string;
};

type SiteData = {
  name: string;
  logoUrl: string;
  nav: {
    services: string;
    tools: string;
    locations: string;
    about: string;
    newPatients: string;
    insurance: string;
    faq: string;
    contact: string;
    book: string;
  };
  locations: {
    list: Location[];
  };
};

export function HeaderClient({
  site,
  locale,
  other,
}: {
  site: SiteData;
  locale: Locale;
  other: Locale;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isEs = locale === "es";

  // Check if we are on the homepage (matching /en, /es, or root /)
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const useSolid = !isHome || isScrolled;

  return (
    <header
      className={`z-40 transition-all duration-300 ${
        useSolid
          ? "sticky top-0 border-b border-border-soft/60 bg-background/95 backdrop-blur-md shadow-warm text-foreground"
          : "absolute top-0 left-0 right-0 border-b border-white/10 bg-transparent text-white"
      }`}
    >
      {/* Announcement Banner */}
      <div
        className={`bg-terracotta-soft/90 text-terracotta-deep py-2.5 px-4 text-center text-xs font-semibold tracking-wide border-b border-terracotta/10 transition-all duration-300 relative z-50 ${
          useSolid ? "hidden" : "block"
        }`}
      >
        <Link href={`/${locale}/contact`} className="hover:underline flex items-center justify-center gap-1.5">
          <span>
            {isEs
              ? "¡Los niños nos aman, los padres confían en nosotros! ✨ Reserva hoy"
              : "Kids love us, parents trust us! ✨ Book your visit today"}
          </span>
          <span className="text-[10px]">→</span>
        </Link>
      </div>

      {/* Navbar Content */}
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <div
            className={`flex items-center justify-center rounded-full w-9 h-9 overflow-hidden border transition duration-200 ${
              useSolid ? "bg-terracotta border-border-soft" : "bg-white/10 border-white/20 group-hover:border-white/40"
            }`}
          >
            <img
              src={site.logoUrl}
              alt={site.name}
              className="h-9 w-9 rounded-full object-cover"
              loading="eager"
            />
          </div>
          <span
            className={`font-display text-xl tracking-tight transition ${
              useSolid
                ? "text-foreground group-hover:text-terracotta"
                : "text-white group-hover:text-white/80"
            }`}
          >
            {site.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className={`hidden lg:flex items-center gap-6 text-sm transition ${
            useSolid ? "text-muted" : "text-white/85"
          }`}
        >
          <Link
            href={`/${locale}/services`}
            className={`transition ${useSolid ? "hover:text-foreground" : "hover:text-white"}`}
          >
            {site.nav.services}
          </Link>
          <Link
            href={`/${locale}/tools`}
            className={`transition ${useSolid ? "hover:text-foreground" : "hover:text-white"}`}
          >
            {site.nav.tools}
          </Link>
          <Link
            href={`/${locale}/articles`}
            className={`transition ${useSolid ? "hover:text-foreground" : "hover:text-white"}`}
          >
            {isEs ? "Guias" : "Articles"}
          </Link>

          <div className="group relative">
            <Link
              href={`/${locale}#locations`}
              className={`inline-flex items-center gap-1.5 transition ${
                useSolid ? "hover:text-foreground" : "hover:text-white"
              }`}
            >
              {site.nav.locations}
              <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" aria-hidden="true" />
            </Link>

            <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[28rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-4 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
              <div className="rounded-xl border border-border-soft bg-background p-2 shadow-warm-lg text-foreground">
                <div className="px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                  {isEs ? "Elige un consultorio" : "Choose a location"}
                </div>
                <div className="grid gap-1">
                  {site.locations.list.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/${locale}/locations/${location.slug}`}
                      className="group/item flex w-full items-start gap-3 rounded-lg px-3 py-3 transition hover:bg-card"
                    >
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sage-soft text-sage-deep transition group-hover/item:bg-terracotta group-hover/item:text-white">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-foreground">{location.city}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-muted">{location.address}</span>
                        <span className="mt-1 block text-xs font-semibold text-terracotta">{location.phone}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href={`/${locale}/about`}
            className={`transition ${useSolid ? "hover:text-foreground" : "hover:text-white"}`}
          >
            {site.nav.about}
          </Link>
          <Link
            href={`/${locale}/new-patients`}
            className={`transition ${useSolid ? "hover:text-foreground" : "hover:text-white"}`}
          >
            {site.nav.newPatients}
          </Link>
          <Link
            href={`/${locale}/insurance`}
            className={`transition ${useSolid ? "hover:text-foreground" : "hover:text-white"}`}
          >
            {site.nav.insurance}
          </Link>
          <Link
            href={`/${locale}/faq`}
            className={`transition ${useSolid ? "hover:text-foreground" : "hover:text-white"}`}
          >
            {site.nav.faq}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className={`transition ${useSolid ? "hover:text-foreground" : "hover:text-white"}`}
          >
            {site.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Lang Switcher */}
          <div
            className={`hidden sm:flex items-center rounded-full text-xs overflow-hidden border transition ${
              useSolid ? "border-border-soft bg-card" : "border-white/20 bg-white/10"
            }`}
          >
            <Link
              href={`/${locale}`}
              aria-current="page"
              className={`px-3 py-1.5 font-semibold transition ${
                useSolid ? "bg-foreground text-background" : "bg-white text-foreground"
              }`}
            >
              {locale.toUpperCase()}
            </Link>
            <Link
              href={`/${other}`}
              className={`px-3 py-1.5 transition ${
                useSolid ? "text-muted hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
            >
              {other.toUpperCase()}
            </Link>
          </div>

          {/* Book CTA */}
          <Link
            href={`/${locale}/contact`}
            className="rounded-full bg-terracotta px-4 py-2 text-white text-sm font-semibold hover:bg-terracotta-deep transition shadow-warm"
          >
            {site.nav.book}
          </Link>

          {/* Mobile Menu */}
          <details className="group/menu relative lg:hidden">
            <summary
              className={`grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border transition [&::-webkit-details-marker]:hidden ${
                useSolid
                  ? "border-border-soft bg-card text-foreground hover:border-terracotta hover:text-terracotta"
                  : "border-white/20 bg-white/10 text-white hover:border-white"
              }`}
              aria-label={isEs ? "Abrir menu" : "Open menu"}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-full z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border-soft bg-background shadow-warm-lg text-foreground">
              <div className="max-h-[calc(100vh-7rem)] overflow-y-auto p-3">
                <div className="grid gap-1 text-sm font-semibold text-foreground">
                  <Link href={`/${locale}/services`} className="rounded-lg px-3 py-3 transition hover:bg-card">
                    {site.nav.services}
                  </Link>
                  <Link href={`/${locale}/tools`} className="rounded-lg px-3 py-3 transition hover:bg-card">
                    {site.nav.tools}
                  </Link>
                  <Link href={`/${locale}/articles`} className="rounded-lg px-3 py-3 transition hover:bg-card">
                    {isEs ? "Guias" : "Articles"}
                  </Link>
                  <Link href={`/${locale}/about`} className="rounded-lg px-3 py-3 transition hover:bg-card">
                    {site.nav.about}
                  </Link>
                  <Link href={`/${locale}/new-patients`} className="rounded-lg px-3 py-3 transition hover:bg-card">
                    {site.nav.newPatients}
                  </Link>
                  <Link href={`/${locale}/insurance`} className="rounded-lg px-3 py-3 transition hover:bg-card">
                    {site.nav.insurance}
                  </Link>
                  <Link href={`/${locale}/faq`} className="rounded-lg px-3 py-3 transition hover:bg-card">
                    {site.nav.faq}
                  </Link>
                  <Link href={`/${locale}/contact`} className="rounded-lg px-3 py-3 transition hover:bg-card">
                    {site.nav.contact}
                  </Link>
                </div>

                <div className="mt-3 border-t border-border-soft pt-3">
                  <p className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                    {isEs ? "Consultorios" : "Locations"}
                  </p>
                  <div className="mt-2 grid gap-1">
                    {site.locations.list.map((location) => (
                      <Link
                        key={location.slug}
                        href={`/${locale}/locations/${location.slug}`}
                        className="flex items-start gap-3 rounded-lg px-3 py-3 transition hover:bg-card"
                      >
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage-soft text-sage-deep">
                          <MapPin className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-foreground">{location.city}</span>
                          <span className="mt-0.5 block text-xs leading-snug text-muted">{location.phone}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center rounded-full border border-border-soft bg-card text-xs sm:hidden">
                  <Link
                    href={`/${locale}`}
                    aria-current="page"
                    className="flex-1 rounded-full bg-foreground px-3 py-2 text-center font-semibold text-background"
                  >
                    {locale.toUpperCase()}
                  </Link>
                  <Link
                    href={`/${other}`}
                    className="flex-1 px-3 py-2 text-center font-semibold text-muted transition hover:text-foreground"
                  >
                    {other.toUpperCase()}
                  </Link>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
