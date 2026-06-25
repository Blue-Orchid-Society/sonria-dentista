"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export function Analytics() {
  useEffect(() => {
    function handleTrackedClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tracked = target.closest<HTMLElement>("[data-track-event]");
      if (tracked) {
        trackEvent(tracked.dataset.trackEvent ?? "cta_click", {
          event_category: tracked.dataset.trackCategory,
          event_label: tracked.dataset.trackLabel ?? tracked.textContent?.trim(),
          location: tracked.dataset.trackLocation,
          service: tracked.dataset.trackService,
          destination: tracked.dataset.trackDestination,
        });
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.href;
      const path = new URL(href, window.location.href).pathname;
      const inferred = inferLinkEvent(href, path);
      if (!inferred) return;

      trackEvent(inferred.eventName, {
        event_category: inferred.category,
        event_label: link.textContent?.trim(),
        destination: href,
        service: inferred.service,
      });
    }

    document.addEventListener("click", handleTrackedClick);
    return () => document.removeEventListener("click", handleTrackedClick);
  }, []);

  return (
    <>
      {GA_ID && <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />}
      {GA_ID && (
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
            ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
          `}
        </Script>
      )}
    </>
  );
}

function inferLinkEvent(href: string, path: string) {
  if (href.startsWith("tel:")) return { eventName: "phone_click", category: "lead" };
  if (href.startsWith("mailto:")) return { eventName: "email_click", category: "lead" };
  if (href.includes("appointment-form")) return { eventName: "appointment_click", category: "lead" };
  if (href.includes("new-patient-form")) return { eventName: "intake_click", category: "lead" };
  if (href.includes("google.com/maps") || href.includes("share.google")) {
    return { eventName: "map_click", category: "location" };
  }
  if (path.includes("/insurance")) return { eventName: "insurance_cta_click", category: "lead" };
  if (path.includes("/services/")) {
    return {
      eventName: "service_cta_click",
      category: "service",
      service: path.split("/services/")[1]?.split("/")[0],
    };
  }

  return null;
}
