import Link from "next/link";
import { getSite, type Locale } from "@/lib/content";

export async function LocationChips({ locale }: { locale: Locale }) {
  const site = await getSite(locale);
  return (
    <section className="bg-card border-y border-border-soft">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <p className="text-sm text-muted">
            {locale === "es" ? "Cuatro consultorios en Texas — uno cerca de ti." : "Four Texas offices. One close to you."}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {site.locations.list.map((l) => (
              <Link
                key={l.slug}
                href={`/${locale}/locations/${l.slug}`}
                className="chip inline-flex items-center gap-2 hover:border-brand transition"
              >
                <span className="font-display font-medium">{l.city}</span>
                <span className="text-muted-2 text-xs">·</span>
                <span className="text-xs text-muted">{l.phone}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
