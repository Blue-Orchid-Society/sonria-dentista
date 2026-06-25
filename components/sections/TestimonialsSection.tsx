"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 8);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card ? card.offsetWidth + 20 : el.clientWidth * 0.85;
    el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

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

        {/* carousel controls */}
        <div className="mt-8 flex items-center justify-between">
          <div className="hidden md:block" />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollPrev}
              aria-label="Previous testimonials"
              className="grid h-10 w-10 place-items-center rounded-full border border-border-soft bg-background text-foreground transition disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:bg-muted/10"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollNext}
              aria-label="Next testimonials"
              className="grid h-10 w-10 place-items-center rounded-full border border-border-soft bg-background text-foreground transition disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:bg-muted/10"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* scroll track */}
        <div
          ref={trackRef}
          className="mt-6 flex gap-5 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              data-card
              className="snap-start shrink-0 basis-[85%] rounded-xl border border-border-soft bg-background p-6 shadow-warm sm:basis-[60%] md:basis-[38%] lg:basis-[31%]"
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