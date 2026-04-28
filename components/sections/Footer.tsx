import Link from "next/link";
import { getSite, type Locale } from "@/lib/content";

export async function Footer({ locale }: { locale: Locale }) {
  const site = await getSite(locale);
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-display text-xl text-white mb-2">{site.name}</div>
          <p className="text-sm text-slate-400">{site.tagline}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">{site.nav.contact}</h4>
          <p className="text-sm">
            <a href={site.contact.phoneHref} className="hover:text-white">{site.contact.phone}</a>
          </p>
          <p className="text-sm">
            <a href={`mailto:${site.contact.email}`} className="hover:text-white">{site.contact.email}</a>
          </p>
          <ul className="mt-2 text-sm text-slate-400">
            {site.contact.hours.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">{site.nav.locations}</h4>
          <ul className="text-sm space-y-1">
            {site.locations.list.map((l) => (
              <li key={l.slug}>
                <Link href={`/${locale}/locations/${l.slug}`} className="hover:text-white">
                  {l.city}{l.primary ? " (HQ)" : ""}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
