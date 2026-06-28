"use client";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    ...params,
    page_path: window.location.pathname,
  });
}

export function trackAdsConversion(label?: string, value?: number) {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const conversionLabel = label ?? process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  if (!adsId || !conversionLabel) return;

  trackEvent("conversion", {
    send_to: `${adsId}/${conversionLabel}`,
    value,
    currency: "USD",
  });
}

