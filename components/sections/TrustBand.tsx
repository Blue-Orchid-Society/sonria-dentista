import type { Locale } from "@/lib/content";

export function TrustBand({ locale }: { locale: Locale }) {
  const items = locale === "es"
    ? [
        { value: "1,500+", label: "Reseñas 5★ en Google" },
        { value: "EN + ES", label: "Equipo bilingüe completo" },
        { value: "Mismo día", label: "Citas de emergencia" },
        { value: "4 sedes", label: "Norte y Noreste de Texas" },
      ]
    : [
        { value: "1,500+", label: "5-star Google reviews" },
        { value: "EN + ES", label: "Fully bilingual team" },
        { value: "Same-day", label: "Emergency visits" },
        { value: "4 offices", label: "Across North Texas" },
      ];

  return (
    <section className="border-y border-border-soft bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col">
            <div className="font-display text-2xl md:text-3xl text-brand-deep leading-none">{it.value}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-2">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
