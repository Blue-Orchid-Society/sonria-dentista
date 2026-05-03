"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Locale } from "@/lib/content";

interface NavItem { label: string; href: string; }
interface NavGroup { label: string; items: NavItem[]; href?: string; }

interface Props {
  locale: Locale;
  altLocale: Locale;
  groups: NavGroup[];
  bookLabel: string;
  bookHref: string;
  contactPhone: string;
}

export function MobileMenu({ locale, altLocale, groups, bookLabel, bookHref, contactPhone }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-card transition"
      >
        <span className="sr-only">{open ? "Close" : "Menu"}</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>
                : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}
        </svg>
      </button>

      {open && mounted && createPortal(
        <div
          className="lg:hidden fixed inset-0 z-[100] bg-background overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-border-soft sticky top-0 bg-background">
            <Link href={`/${locale}`} onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <span aria-hidden className="grid place-items-center w-9 h-9 rounded-full bg-brand text-white font-display text-lg leading-none">S</span>
              <span className="font-display text-xl text-foreground">Sonria Dentista</span>
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-card transition"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="px-4 py-6 space-y-1">
            {groups.map((g) => (
              <div key={g.label} className="border-b border-border-soft last:border-b-0 py-2">
                {g.href ? (
                  <Link
                    href={g.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-2xl text-foreground hover:text-brand-deep transition"
                  >
                    {g.label}
                  </Link>
                ) : (
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none py-3 font-display text-2xl text-foreground">
                      <span>{g.label}</span>
                      <span className="text-brand text-xl group-open:rotate-45 transition">+</span>
                    </summary>
                    <ul className="pb-3 space-y-1 pl-2">
                      {g.items.map((it) => (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            onClick={() => setOpen(false)}
                            className="block py-2 text-foreground-soft hover:text-brand-deep transition"
                          >
                            {it.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            ))}

            <div className="pt-6 space-y-3">
              <a
                href={`tel:${contactPhone.replace(/[^0-9+]/g, "")}`}
                onClick={() => setOpen(false)}
                className="block w-full text-center rounded-full border border-foreground/15 bg-card px-5 py-3.5 text-foreground font-medium"
              >
                {locale === "es" ? "Llamar" : "Call"} {contactPhone}
              </a>
              <Link
                href={bookHref}
                onClick={() => setOpen(false)}
                className="block w-full text-center rounded-full bg-brand px-5 py-3.5 text-white font-semibold shadow-warm hover:bg-brand-deep transition"
              >
                {bookLabel}
              </Link>
              <div className="flex items-center justify-center gap-2 pt-3 text-sm">
                <Link
                  href={`/${locale}`}
                  onClick={() => setOpen(false)}
                  aria-current="page"
                  className="px-3 py-1.5 rounded-full font-semibold bg-foreground text-background"
                >
                  {locale.toUpperCase()}
                </Link>
                <Link
                  href={`/${altLocale}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-1.5 rounded-full text-muted hover:text-foreground transition"
                >
                  {altLocale.toUpperCase()}
                </Link>
              </div>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}
