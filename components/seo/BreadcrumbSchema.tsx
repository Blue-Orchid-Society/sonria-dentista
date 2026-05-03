interface Crumb { name: string; url: string; }

export function BreadcrumbSchema({ crumbs }: { crumbs: Crumb[] }) {
  if (!crumbs.length) return null;
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
