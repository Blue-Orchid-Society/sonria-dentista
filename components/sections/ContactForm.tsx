"use client";

import { useState, type FormEvent } from "react";
import { trackAdsConversion, trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/content";

type Labels = {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  insuranceStatus: string;
  preferredTime: string;
  message: string;
  consent: string;
  submit: string;
  selectLocation: string;
  selectService: string;
  selectInsuranceStatus: string;
  insuranceOptions: {
    insured: string;
    medicaid: string;
    medicare: string;
    uninsured: string;
    unsure: string;
  };
};

type LocationOption = { slug: string; city: string };
type ServiceOption = { slug: string; name: string };

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm({
  locale,
  labels,
  locations,
  services,
}: {
  locale: Locale;
  labels: Labels;
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
        body: JSON.stringify({ ...data, locale }),
      });

      if (!res.ok) throw new Error("Contact form submission failed");

      trackEvent("form_submit", {
        event_category: "lead",
        event_label: "contact_form",
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
      className="rounded-2xl bg-card border border-border-soft p-6 md:p-10 space-y-5"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-muted-2 font-semibold">
            {labels.name}
          </span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-lg border border-border-soft bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none transition"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wider text-muted-2 font-semibold">
            {labels.email}
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-lg border border-border-soft bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none transition"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wider text-muted-2 font-semibold">
            {labels.phone}
          </span>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            className="mt-2 w-full rounded-lg border border-border-soft bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none transition"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wider text-muted-2 font-semibold">
            {labels.location}
          </span>
          <select
            name="location"
            required
            className="mt-2 w-full rounded-lg border border-border-soft bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none transition"
            defaultValue=""
          >
            <option value="" disabled>
              {labels.selectLocation}
            </option>
            {locations.map((location) => (
              <option key={location.slug} value={location.slug}>
                {location.city}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wider text-muted-2 font-semibold">
            {labels.service}
          </span>
          <select
            name="service"
            required
            className="mt-2 w-full rounded-lg border border-border-soft bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none transition"
            defaultValue=""
          >
            <option value="" disabled>
              {labels.selectService}
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wider text-muted-2 font-semibold">
            {labels.insuranceStatus}
          </span>
          <select
            name="insuranceStatus"
            required
            className="mt-2 w-full rounded-lg border border-border-soft bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none transition"
            defaultValue=""
          >
            <option value="" disabled>
              {labels.selectInsuranceStatus}
            </option>
            <option value="insured">{labels.insuranceOptions.insured}</option>
            <option value="medicaid">{labels.insuranceOptions.medicaid}</option>
            <option value="medicare">{labels.insuranceOptions.medicare}</option>
            <option value="uninsured">{labels.insuranceOptions.uninsured}</option>
            <option value="unsure">{labels.insuranceOptions.unsure}</option>
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="text-xs uppercase tracking-wider text-muted-2 font-semibold">
            {labels.preferredTime}
          </span>
          <input
            type="text"
            name="preferredTime"
            autoComplete="off"
            placeholder={isEs ? "Ej. manana, tarde, viernes" : "Example: morning, afternoon, Friday"}
            className="mt-2 w-full rounded-lg border border-border-soft bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none transition"
          />
        </label>
      </div>

      <label className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-wider text-muted-2 font-semibold">
          {labels.message}
        </span>
        <textarea
          name="message"
          rows={5}
          required
          className="mt-2 w-full rounded-lg border border-border-soft bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none transition resize-none"
        />
      </label>

      <label className="flex gap-3 text-sm text-muted leading-relaxed">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-1 h-4 w-4 rounded border-border-soft accent-terracotta"
        />
        <span>{labels.consent}</span>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-terracotta px-7 py-3 text-white text-sm font-semibold hover:bg-terracotta-deep transition shadow-warm disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? (isEs ? "Enviando..." : "Sending...") : labels.submit}
        </button>

        <p className="text-sm font-semibold" role="status" aria-live="polite">
          {status === "ok" && (
            <span className="text-sage-deep">
              {isEs ? "Mensaje enviado. Te respondemos pronto." : "Message sent. We will be in touch soon."}
            </span>
          )}
          {status === "error" && (
            <span className="text-terracotta">
              {isEs ? "Algo fallo. Llamanos directo." : "Something failed. Please call us directly."}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
