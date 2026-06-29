import Link from "next/link";
import { ChevronDown, MapPin, Menu } from "lucide-react";
import { getSite, altLocale, type Locale } from "@/lib/content";

export async function Header({ locale }: { locale: Locale }) {
  const site = await getSite(locale);
  const other = altLocale(locale);
  const isEs = locale === "es";

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-background/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-6">
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center rounded-full  bg-terracotta border border-border-soft w-9 h-9 overflow-hidden">
            <img
              src={site.logoUrl}
              alt={site.name}
              className="h-9 w-9 rounded-full object-cover"
              loading="eager"
            />
          </div>
          <span className="font-display text-xl text-foreground tracking-tight group-hover:text-terracotta transition">
            {site.name}
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm text-muted">
          <Link href={`/${locale}/services`} className="hover:text-foreground transition">{site.nav.services}</Link>
          <Link href={`/${locale}/tools`} className="hover:text-foreground transition">{site.nav.tools}</Link>
          <div className="group relative">
            <Link
              href={`/${locale}#locations`}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition"
            >
              {site.nav.locations}
              <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" aria-hidden="true" />
            </Link>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[28rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-4 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
              <div className="rounded-xl border border-border-soft bg-background p-2 shadow-warm-lg">
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
          <details className="group/menu relative lg:hidden">
            <summary
              className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-border-soft bg-card text-foreground transition hover:border-terracotta hover:text-terracotta [&::-webkit-details-marker]:hidden"
              aria-label={isEs ? "Abrir menu" : "Open menu"}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-full z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border-soft bg-background shadow-warm-lg">
              <div className="max-h-[calc(100vh-7rem)] overflow-y-auto p-3">
                <div className="grid gap-1 text-sm font-semibold text-foreground">
                  <Link href={`/${locale}/services`} className="rounded-lg px-3 py-3 transition hover:bg-card">
                    {site.nav.services}
                  </Link>
                  <Link href={`/${locale}/tools`} className="rounded-lg px-3 py-3 transition hover:bg-card">
                    {site.nav.tools}
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
