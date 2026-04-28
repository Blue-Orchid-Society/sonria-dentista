import Link from "next/link";
import { getSite, altLocale, type Locale } from "@/lib/content";

export async function Header({ locale }: { locale: Locale }) {
  const site = await getSite(locale);
  const other = altLocale(locale);
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-display text-xl text-primary font-semibold">
          {site.name}
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href={`/${locale}#services`} className="hover:text-primary">{site.nav.services}</Link>
          <Link href={`/${locale}#locations`} className="hover:text-primary">{site.nav.locations}</Link>
          <Link href={`/${locale}#contact`} className="hover:text-primary">{site.nav.contact}</Link>
          <Link
            href={`/${locale}#contact`}
            className="rounded-full bg-primary px-4 py-2 text-white text-xs font-semibold hover:bg-cyan-700"
          >
            {site.nav.appointment}
          </Link>
          <Link
            href={`/${other}`}
            className="text-slate-500 hover:text-primary text-xs uppercase tracking-wide"
          >
            {other === "en" ? "EN" : "ES"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
