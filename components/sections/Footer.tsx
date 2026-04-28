import Link from "next/link";
import { getSite, type Locale } from "@/lib/content";

export async function Footer({ locale }: { locale: Locale }) {
  const site = await getSite(locale);
  return (
    <footer className="bg-card border-t border-border-soft mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="grid place-items-center w-9 h-9 rounded-full bg-terracotta text-white font-display text-lg leading-none">S</span>
            <span className="font-display text-xl text-foreground">{site.name}</span>
          </div>
          <p className="mt-4 text-sm text-muted leading-relaxed">{site.tagline}</p>
        </div>
        <div>
          <h4 className="text-foreground font-semibold mb-3 text-sm uppercase tracking-wider">{site.nav.contact}</h4>
          <p className="text-sm text-muted">
            <a href={site.contact.phoneHref} className="hover:text-foreground transition">{site.contact.phone}</a>
          </p>
          <p className="text-sm text-muted mt-1.5">
            <a href={`mailto:${site.contact.email}`} className="hover:text-foreground transition">{site.contact.email}</a>
          </p>
          <ul className="mt-4 space-y-1 text-sm text-muted-2">
            {site.contact.hours.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-foreground font-semibold mb-3 text-sm uppercase tracking-wider">{site.nav.locations}</h4>
          <ul className="text-sm space-y-1.5">
            {site.locations.list.map((l) => (
              <li key={l.slug}>
                <Link href={`/${locale}/locations/${l.slug}`} className="text-muted hover:text-foreground transition">
                  {l.city}{l.primary ? " (HQ)" : ""}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-foreground font-semibold mb-3 text-sm uppercase tracking-wider">{site.nav.services}</h4>
          <ul className="text-sm space-y-1.5">
            {site.services.list.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/${locale}/services/${s.slug}`} className="text-muted hover:text-foreground transition">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border-soft py-6 text-center text-xs text-muted-2">
        © {new Date().getFullYear()} {site.name}. {locale === "es" ? "Todos los derechos reservados." : "All rights reserved."}
      </div>
    </footer>
  );
}
