import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import type { Locale } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ locale: a.locale, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale as Locale, slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical: `/${locale}/articles/${slug}` },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const article = getArticleBySlug(typedLocale, slug);
  if (!article) notFound();

  const baseUrl = "https://sonriadentista.com";
  const breadcrumbs = [
    { name: "Home", url: `${baseUrl}/${locale}` },
    { name: typedLocale === "es" ? "Artículos" : "Articles", url: `${baseUrl}/${locale}/articles` },
    { name: article.title, url: `${baseUrl}/${locale}/articles/${slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "Sonria Dentista" },
    inLanguage: typedLocale === "es" ? "es-MX" : "en-US",
    keywords: article.tags.join(", "),
  };

  return (
    <>
      <BreadcrumbSchema crumbs={breadcrumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="bg-background">
        <div className="bg-card border-b border-border-soft">
          <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
            <Link
              href={`/${locale}/articles`}
              className="text-xs uppercase tracking-[0.16em] text-muted hover:text-foreground transition"
            >
              ← {typedLocale === "es" ? "Artículos" : "Articles"}
            </Link>
            <span className="mt-6 inline-flex text-xs uppercase tracking-[0.18em] text-brand font-semibold">
              {article.category}
            </span>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-foreground leading-[1.04]">
              {article.title}
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed">{article.summary}</p>
            <div className="mt-6 text-sm text-muted-2 flex items-center gap-3">
              <span>{article.author}</span>
              <span>·</span>
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <div className="space-y-6 text-lg leading-[1.7] text-foreground-soft">
            {article.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="font-display text-3xl md:text-4xl text-foreground mt-12 first:mt-0 leading-tight">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3 key={i} className="font-display text-xl md:text-2xl text-foreground mt-8 leading-tight">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "p") {
                return <p key={i}>{block.text}</p>;
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="space-y-2 ml-1">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-3 inline-block w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "callout") {
                return (
                  <aside key={i} className="rounded-2xl border border-brand-soft bg-brand-soft/40 p-6 my-8">
                    {block.title && (
                      <div className="font-display text-lg text-brand-deep mb-2">{block.title}</div>
                    )}
                    <p className="text-foreground/90 m-0">{block.text}</p>
                  </aside>
                );
              }
              return null;
            })}
          </div>

          {article.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border-soft flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <span key={t} className="chip text-xs">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
