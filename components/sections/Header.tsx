import Link from "next/link";
import { getSite, altLocale, type Locale } from "@/lib/content";
import { NavDropdown } from "./NavDropdown";
import { MobileMenu } from "./MobileMenu";

export async function Header({ locale }: { locale: Locale }) {
  const site = await getSite(locale);
  const other = altLocale(locale);

  const servicesItems = site.services.list.map((s) => ({
    label: s.name,
    href: `/${locale}/services/${s.slug}`,
    description: s.blurb,
  }));

  const locationsItems = site.locations.list.map((l) => ({
    label: `${l.city}, ${l.state}${l.primary ? " · HQ" : ""}`,
    href: `/${locale}/locations/${l.slug}`,
    description: l.address,
  }));

  const patientsItems = [
    { label: site.nav.newPatients, href: `/${locale}/new-patients` },
    { label: site.nav.insurance, href: `/${locale}/insurance` },
    { label: site.nav.faq, href: `/${locale}/faq` },
  ];

  const groups = [
    { label: site.nav.services, items: servicesItems },
    { label: site.nav.locations, items: locationsItems },
    { label: locale === "es" ? "Para pacientes" : "For patients", items: patientsItems },
    { label: site.nav.about, items: [], href: `/${locale}/about` },
    { label: site.nav.articles, items: [], href: `/${locale}/articles` },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-background/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group flex-shrink-0">
          <span aria-hidden className="grid place-items-center w-9 h-9 rounded-full bg-brand text-white font-display text-lg leading-none">
            S
          </span>
          <span className="font-display text-xl text-foreground tracking-tight group-hover:text-brand-deep transition">
            {site.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-muted">
          <NavDropdown label={site.nav.services} items={servicesItems} />
          <NavDropdown label={site.nav.locations} items={locationsItems} />
          <NavDropdown label={locale === "es" ? "Para pacientes" : "For patients"} items={patientsItems} />
          <Link href={`/${locale}/about`} className="hover:text-foreground transition">{site.nav.about}</Link>
          <Link href={`/${locale}/articles`} className="hover:text-foreground transition">{site.nav.articles}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center rounded-full border border-border-soft bg-card text-xs overflow-hidden">
            <Link href={`/${locale}`} aria-current="page" className="px-3 py-1.5 font-semibold bg-foreground text-background">
              {locale.toUpperCase()}
            </Link>
            <Link href={`/${other}`} className="px-3 py-1.5 text-muted hover:text-foreground transition">
              {other.toUpperCase()}
            </Link>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="hidden sm:inline-flex rounded-full bg-brand px-4 py-2 text-white text-sm font-semibold hover:bg-brand-deep transition shadow-warm"
          >
            {site.nav.book}
          </Link>
          <MobileMenu
            locale={locale}
            altLocale={other}
            groups={groups}
            bookLabel={site.nav.book}
            bookHref={`/${locale}/contact`}
            contactPhone={site.contact.phone}
          />
        </div>
      </div>
    </header>
  );
}
