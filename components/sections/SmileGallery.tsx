const IMAGES = [
  "/images/before-after.png",
  "/images/gallery-1.png",
  "/images/gallery-2.png",
  "/images/gallery-3.jpg",
  "/images/missing-teeth.jpg",
  // "/images/gallery-5.png",
  // "/images/gallery-6.webp",
];

type Props = {
  eyebrow: string;
  heading: string;
  body: string;
};

export function SmileGallery({ eyebrow, heading, body }: Props) {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              {eyebrow}
            </span>
            <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">{heading}</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">{body}</p>
        </div>

        <div className="mt-10 grid auto-rows-[13rem] gap-4 md:grid-cols-4">
          {IMAGES.map((src, index) => (
            <figure
              key={src}
              className={
                "overflow-hidden rounded-xl border border-border-soft bg-card shadow-warm " +
                (index === 0 ? "md:col-span-2 md:row-span-2" : "")
              }
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

