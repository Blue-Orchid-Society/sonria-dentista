import { Star } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

type Props = {
  eyebrow: string;
  heading: string;
  subheading: string;
  testimonials: ReadonlyArray<Testimonial>;
};

export function TestimonialsSection({ eyebrow, heading, subheading, testimonials }: Props) {
  return (
    <section className="bg-card py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
          <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-foreground">{heading}</h2>
          </div>
          <p className="text-muted leading-relaxed">{subheading}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-xl border border-border-soft bg-background p-6 shadow-warm"
            >
              <div className="flex gap-1 text-gold" aria-label="5 star review">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-5 text-muted leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border-soft pt-4">
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="mt-1 text-sm text-muted-2">{testimonial.detail}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
