"use client";

import { useState, type FormEvent } from "react";
import { trackAdsConversion, trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/content";

type LocationOption = { slug: string; city: string };
type ServiceOption = { slug: string; name: string };
type Status = "idle" | "sending" | "ok" | "error";

export function HeroLeadForm({
  locale,
  locations,
  services,
}: {
  locale: Locale;
  locations: LocationOption[];
  services: ServiceOption[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const isEs = locale === "es";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          locale,
          insuranceStatus: "unsure",
          message: isEs
            ? "Solicitud rapida desde el formulario principal de la pagina de inicio."
            : "Quick request from the homepage hero form.",
        }),
      });

      if (!res.ok) throw new Error("Homepage lead form submission failed");

      trackEvent("form_submit", {
        event_category: "lead",
        event_label: "hero_lead_form",
        location: String(data.location ?? ""),
        service: String(data.service ?? ""),
      });
      trackAdsConversion();

      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-3xl rounded-[1.25rem] border border-white/20 bg-white/95 p-3 shadow-warm-lg backdrop-blur"
    >
      <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="sr-only" htmlFor="hero-name">
          {isEs ? "Nombre" : "Name"}
        </label>
        <input
          id="hero-name"
          name="name"
          required
          autoComplete="name"
          placeholder={isEs ? "Nombre" : "Name"}
          className="min-h-12 rounded-2xl border border-transparent bg-background px-4 text-sm text-foreground outline-none transition focus:border-terracotta"
        />

        <label className="sr-only" htmlFor="hero-phone">
          {isEs ? "Telefono" : "Phone"}
        </label>
        <input
          id="hero-phone"
          name="phone"
          required
          autoComplete="tel"
          placeholder={isEs ? "Telefono" : "Phone"}
          className="min-h-12 rounded-2xl border border-transparent bg-background px-4 text-sm text-foreground outline-none transition focus:border-terracotta"
        />

        <label className="sr-only" htmlFor="hero-email">
          {isEs ? "Correo" : "Email"}
        </label>
        <input
          id="hero-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={isEs ? "Correo" : "Email"}
          className="min-h-12 rounded-2xl border border-transparent bg-background px-4 text-sm text-foreground outline-none transition focus:border-terracotta"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-12 rounded-2xl bg-foreground px-5 text-sm font-semibold text-background transition hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (isEs ? "Enviando" : "Sending") : isEs ? "Reservar" : "Request"}
        </button>
      </div>

      <div className="mt-2 grid gap-2 md:grid-cols-3">
        <label className="sr-only" htmlFor="hero-location">
          {isEs ? "Ubicacion" : "Location"}
        </label>
        <select
          id="hero-location"
          name="location"
          required
          defaultValue=""
          className="min-h-11 rounded-2xl border border-border-soft bg-card px-4 text-sm text-foreground outline-none transition focus:border-terracotta"
        >
          <option value="" disabled>
            {isEs ? "Ubicacion" : "Location"}
          </option>
          {locations.map((location) => (
            <option key={location.slug} value={location.slug}>
              {location.city}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="hero-service">
          {isEs ? "Servicio" : "Service"}
        </label>
        <select
          id="hero-service"
          name="service"
          required
          defaultValue=""
          className="min-h-11 rounded-2xl border border-border-soft bg-card px-4 text-sm text-foreground outline-none transition focus:border-terracotta md:col-span-2"
        >
          <option value="" disabled>
            {isEs ? "Servicio necesario" : "Service needed"}
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <label className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="mt-3 flex gap-2 px-1 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-0.5 h-3.5 w-3.5 rounded border-border-soft accent-terracotta"
        />
        <span>
          {isEs
            ? "Acepto que Sonria me contacte por telefono, texto o correo."
            : "I agree to be contacted by Sonria by phone, text, or email."}
        </span>
      </label>

      <p className="mt-2 min-h-5 px-1 text-xs font-semibold" role="status" aria-live="polite">
        {status === "ok" && (
          <span className="text-sage-deep">
            {isEs ? "Solicitud enviada. Te contactaremos pronto." : "Request sent. We will contact you soon."}
          </span>
        )}
        {status === "error" && (
          <span className="text-terracotta">
            {isEs ? "Algo fallo. Por favor llama directo." : "Something failed. Please call us directly."}
          </span>
        )}
      </p>
    </form>
  );
}
