import { getSite, altLocale, type Locale } from "@/lib/content";
import { HeaderClient } from "./HeaderClient";

export async function Header({ locale }: { locale: Locale }) {
  const site = await getSite(locale);
  const other = altLocale(locale);

  return <HeaderClient site={site} locale={locale} other={other} />;
}
