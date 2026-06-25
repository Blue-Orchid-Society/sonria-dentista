import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { getSite, altLocale, type Locale } from "@/lib/content";

export async function Header({ locale }: { locale: Locale }) {
  const site = await getSite(locale);
  const other = altLocale(locale);
  const isEs = locale === "es";

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-background/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-6">
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <span aria-hidden className="grid place-items-center w-9 h-9 rounded-full bg-terracotta text-white font-display text-lg leading-none">S</span>
          <span className="font-display text-xl text-foreground tracking-tight group-hover:text-terracotta transition">
            {site.name}
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm text-muted">
          <Link href={`/${locale}#services`} className="hover:text-foreground transition">{site.nav.services}</Link>
          <div className="group relative">
            <Link
              href={`/${locale}#locations`}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition"
            >
              {site.nav.locations}
              <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" aria-hidden="true" />
            </Link>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[23rem] -translate-x-1/2 pt-4 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
              <div className="rounded-xl border border-border-soft bg-background p-2 shadow-warm-lg">
                <div className="px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                  {isEs ? "Elige un consultorio" : "Choose a location"}
                </div>
                <div className="grid gap-1">
                  {site.locations.list.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/${locale}/locations/${location.slug}`}
                      className="group/item flex items-start gap-3 rounded-lg px-3 py-3 transition hover:bg-card"
                    >
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sage-soft text-sage-deep transition group-hover/item:bg-terracotta group-hover/item:text-white">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-foreground">{location.city}</span>
                        <span className="mt-0.5 block truncate text-xs text-muted">{location.address}</span>
                        <span className="mt-1 block text-xs font-semibold text-terracotta">{location.phone}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link href={`/${locale}/about`} className="hover:text-foreground transition">{site.nav.about}</Link>
          <Link href={`/${locale}/new-patients`} className="hover:text-foreground transition">{site.nav.newPatients}</Link>
          <Link href={`/${locale}/insurance`} className="hover:text-foreground transition">{site.nav.insurance}</Link>
          <Link href={`/${locale}/faq`} className="hover:text-foreground transition">{site.nav.faq}</Link>
          <Link href={`/${locale}/contact`} className="hover:text-foreground transition">{site.nav.contact}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center rounded-full border border-border-soft bg-card text-xs overflow-hidden">
            <Link
              href={`/${locale}`}
              aria-current="page"
              className="px-3 py-1.5 font-semibold bg-foreground text-background"
            >
              {locale.toUpperCase()}
            </Link>
            <Link
              href={`/${other}`}
              className="px-3 py-1.5 text-muted hover:text-foreground transition"
            >
              {other.toUpperCase()}
            </Link>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="rounded-full bg-terracotta px-4 py-2 text-white text-sm font-semibold hover:bg-terracotta-deep transition shadow-warm"
          >
            {site.nav.book}
          </Link>
        </div>
      </div>
    </header>
  );
}
