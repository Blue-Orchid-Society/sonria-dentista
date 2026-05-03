import testimonials from "@/data/testimonials.json";
import type { Locale } from "@/lib/content";

interface Review {
  author: string;
  rating: number;
  text: string;
  location: string;
}

const sizeClasses = [
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
];

export function TestimonialsWall({ locale }: { locale: Locale }) {
  const list = (testimonials as Review[]).slice(0, 9);
  const heading = locale === "es" ? "Lo que dicen nuestros pacientes" : "What our patients say";
  const subheading = locale === "es"
    ? "Reseñas verificadas de Google de las cuatro sedes."
    : "Verified Google reviews across all four locations.";

  return (
    <section className="bg-background py-20 md:py-32 border-t border-border-soft">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.18em] text-brand font-semibold">
            {locale === "es" ? "1,500+ reseñas verificadas" : "1,500+ verified reviews"}
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl text-foreground leading-tight">
            {heading}
          </h2>
          <p className="mt-3 text-muted text-lg">{subheading}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:auto-rows-[minmax(180px,_auto)]">
          {list.map((r, i) => (
            <article
              key={`${r.author}-${i}`}
              className={`relative rounded-2xl border border-border-soft bg-card p-7 ${sizeClasses[i] || ""} grain`}
            >
              <div className="flex items-center gap-1 text-accent" aria-label={`${r.rating} out of 5 stars`}>
                {"★".repeat(r.rating)}
                <span className="ml-2 text-xs uppercase tracking-[0.14em] text-muted-2 font-sans">{r.location}</span>
              </div>
              <p className="mt-4 pullquote text-foreground/90">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-5 text-sm font-sans font-medium text-muted">{r.author}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
