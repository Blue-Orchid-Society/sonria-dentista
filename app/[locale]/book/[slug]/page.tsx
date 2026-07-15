import { notFound, redirect } from "next/navigation";
import { getSite, type Locale } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const site = await getSite("en");
  return (["en", "es"] as const).flatMap((locale) =>
    site.locations.list.map((location) => ({ locale, slug: location.slug })),
  );
}

export default async function BookLocationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const site = await getSite(locale as Locale);
  const location = site.locations.list.find((item) => item.slug === slug);

  if (!location?.appointmentUrl) notFound();

  redirect(location.appointmentUrl);
}
