import Link from "next/link";
import { getSite, altLocale, type Locale } from "@/lib/content";

export async function Header({ locale }: { locale: Locale }) {
  const site = await getSite(locale);
  const other = altLocale(locale);
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
          <Link href={`/${locale}#locations`} className="hover:text-foreground transition">{site.nav.locations}</Link>
          <Link href={`/${locale}/about`} className="hover:text-foreground transition">{site.nav.about}</Link>
          <Link href={`/${locale}/new-patients`} className="hover:text-foreground transition">{site.nav.newPatients}</Link>
          <Link href={`/${locale}/insurance`} className="hover:text-foreground transition">{site.nav.insurance}</Link>
          <Link href={`/${locale}/articles`} className="hover:text-foreground transition">{site.nav.articles}</Link>
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
