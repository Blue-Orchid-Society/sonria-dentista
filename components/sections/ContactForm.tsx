"use client";

import { useState } from "react";
import type { Locale } from "@/lib/content";

type Labels = {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
  submit: string;
  selectLocation: string;
};

type LocationOption = { slug: string; city: string };

export function ContactForm({
  locale,
  labels,
  locations,
}: {
  locale: Locale;
  labels: Labels;
  locations: LocationOption[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const isEs = locale === "es";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("ok");
      e.currentTarget.reset();
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
            className="mt-2 w-full rounded-lg border border-border-soft bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none transition"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-muted-2 font-semibold">
            {labels.location}
          </span>
          <select
            name="location"
            className="mt-2 w-full rounded-lg border border-border-soft bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none transition"
            defaultValue=""
          >
            <option value="" disabled>
              {labels.selectLocation}
            </option>
            {locations.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.city}
              </option>
            ))}
          </select>
        </label>
      </div>
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
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-terracotta px-7 py-3 text-white text-sm font-semibold hover:bg-terracotta-deep transition shadow-warm disabled:opacity-50"
        >
          {status === "sending" ? (isEs ? "Enviando..." : "Sending...") : labels.submit}
        </button>
        {status === "ok" && (
          <span className="text-sm text-sage-deep font-semibold">
            {isEs ? "Mensaje enviado, te respondemos pronto." : "Message sent, we'll be in touch soon."}
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-terracotta font-semibold">
            {isEs ? "Algo fallo, llamanos directo." : "Something failed, call us directly."}
          </span>
        )}
      </div>
    </form>
  );
}
