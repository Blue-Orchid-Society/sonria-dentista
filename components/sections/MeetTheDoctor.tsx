type Props = {
  heading: string;
  doctor: {
    name: string;
    title: string;
    imageUrl: string;
    imageAlt: string;
    bio: string[];
    credentials: string[];
  };
};

export function MeetTheDoctor({ heading, doctor }: Props) {
  return (
    <section id="doctor" className="relative isolate min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <img
        src={doctor.imageUrl}
        alt={doctor.imageAlt}
        className="absolute inset-0 w-full h-full object-cover -z-20"
        loading="lazy"
      />

      {/* Gradient overlay for text legibility, matching the reference effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 w-full py-20">
        <div className="max-w-xl">
          <span className="text-xs uppercase tracking-[0.18em] text-terracotta-light font-semibold">
            ✦ {heading}
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl text-white">
            {doctor.name}
          </h2>
          <p className="mt-2 text-white/70 text-sm uppercase tracking-wider">{doctor.title}</p>

          <div className="mt-6 space-y-4 text-white/85 leading-relaxed">
            {doctor.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <ul className="mt-7 grid grid-cols-2 gap-2.5 text-sm">
            {doctor.credentials.map((c) => (
              <li
                key={c}
                className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-2 text-white/90 flex items-center gap-2"
              >
                <span className="text-sage-light" aria-hidden>✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}