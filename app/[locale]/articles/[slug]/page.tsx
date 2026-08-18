import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getArticleBySlug, getArticleStaticParams } from "@/lib/articles";
import { getSite, type Locale } from "@/lib/content";
import { getAllTools } from "@/lib/tools";

type ArticleBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export function generateStaticParams() {
  return getArticleStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `https://sonriadentista.com/${locale}/articles/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.heroImage],
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const site = await getSite(locale as Locale);
  const isEs = locale === "es";
  const blocks = markdownBlocks(article.body);
  const faqs = faqItemsFromBlocks(blocks);
  const relatedToolSet = new Set(article.relatedTools.map((item) => item.replace(/^\/tools\//, "")));
  const tools = getAllTools().filter((tool) => relatedToolSet.has(tool.slug) || relatedToolSet.has(tool.href.replace(/^\/tools\//, "")));

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        image: article.heroImage,
        datePublished: article.publishedAt,
        author: {
          "@type": "Organization",
          name: "Sonria Dentista",
        },
        publisher: {
          "@type": "Organization",
          name: "Sonria Dentista",
          logo: {
            "@type": "ImageObject",
            url: "https://sonriadentista.com/logo.png",
          },
        },
        mainEntityOfPage: `https://sonriadentista.com/${locale}/articles/${slug}`,
      },
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article>
        <section className="relative overflow-hidden bg-foreground text-white">
          <img
            src={article.heroImage}
            alt={article.heroImageAlt}
            className="absolute inset-0 h-full w-full object-cover opacity-34"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/28" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
            <Link
              href={`/${locale}/articles`}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {isEs ? "Todas las guias" : "All articles"}
            </Link>
            <div className="mt-8 max-w-3xl">
              <div className="mb-4 inline-flex rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                {article.category}
              </div>
              <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/82">{article.description}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/75">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {formatDate(article.publishedAt, locale)}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="rounded-xl border border-border bg-card p-6 shadow-warm md:p-10">
              <div className="prose-sonria">
                {blocks.map((block, index) => {
                  if (block.type === "heading") {
                    const HeadingTag = block.level === 2 ? "h2" : "h3";
                    return (
                      <HeadingTag
                        key={`${block.text}-${index}`}
                        className={block.level === 2
                          ? "mt-10 font-display text-3xl leading-tight text-foreground first:mt-0 md:text-4xl"
                          : "mt-8 text-xl font-semibold text-foreground"}
                      >
                        {block.text}
                      </HeadingTag>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul key={index} className="mt-5 grid gap-3">
                        {block.items.map((item) => (
                          <li key={item} className="rounded-lg bg-sage-soft px-4 py-3 leading-7 text-sage-deep">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={index} className="mt-5 text-lg leading-8 text-muted">
                      {block.text}
                    </p>
                  );
                })}
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl bg-sage-deep p-6 text-white shadow-warm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  {isEs ? "Siguiente paso" : "Next step"}
                </p>
                <h2 className="mt-3 font-display text-3xl">
                  {isEs ? "Hable con Sonria" : "Talk with Sonria"}
                </h2>
                <p className="mt-3 leading-7 text-white/78">
                  {isEs
                    ? "Use esta guia para preparar preguntas antes de llamar o programar."
                    : "Use this guide to prepare questions before calling or scheduling."}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="mt-5 inline-flex rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-white transition hover:bg-terracotta-deep"
                >
                  {site.nav.book}
                </Link>
              </div>

              {tools.length ? (
                <div className="rounded-xl border border-border bg-card p-6 shadow-warm">
                  <h2 className="font-semibold text-foreground">
                    {isEs ? "Herramientas relacionadas" : "Related tools"}
                  </h2>
                  <div className="mt-4 grid gap-3">
                    {tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={tool.href}
                        className="group rounded-lg border border-border bg-background p-4 transition hover:border-terracotta"
                      >
                        <span className="block text-sm font-semibold text-foreground">{tool.title}</span>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-terracotta">
                          {isEs ? "Abrir herramienta" : "Open tool"}
                          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </section>
      </article>

      <ContactCTA
        heading={site.contactCTA.heading}
        body={site.contactCTA.body}
        cta={site.contactCTA.cta}
        phone={site.contact.phone}
        email={site.contact.email}
        bilingualNote={site.contactCTA.bilingualNote}
      />
    </>
  );
}

function markdownBlocks(markdown: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const lines = markdown.split(/\r?\n/);
  let paragraph: string[] = [];
  let list: string[] = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    blocks.push({ type: "list", items: list });
    list = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 2, text: trimmed.slice(3).trim() });
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 3, text: trimmed.slice(4).trim() });
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      list.push(trimmed.slice(2).trim());
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks;
}

function faqItemsFromBlocks(blocks: ArticleBlock[]): Array<{ question: string; answer: string }> {
  const faqStart = blocks.findIndex((block) =>
    block.type === "heading" && block.level === 2 && /^(faq|faqs|frequently asked questions|preguntas frecuentes)$/i.test(block.text.trim())
  );
  if (faqStart === -1) return [];

  const faqs: Array<{ question: string; answer: string }> = [];
  let currentQuestion = "";
  let currentAnswer: string[] = [];

  function flushFaq() {
    const answer = currentAnswer.join(" ").replace(/\s+/g, " ").trim();
    if (currentQuestion && answer) {
      faqs.push({ question: currentQuestion, answer });
    }
    currentQuestion = "";
    currentAnswer = [];
  }

  for (const block of blocks.slice(faqStart + 1)) {
    if (block.type === "heading" && block.level === 2) break;

    if (block.type === "heading" && block.level === 3) {
      flushFaq();
      currentQuestion = block.text;
      continue;
    }

    if (!currentQuestion) continue;

    if (block.type === "paragraph") {
      currentAnswer.push(block.text);
    }

    if (block.type === "list") {
      currentAnswer.push(block.items.join("; "));
    }
  }

  flushFaq();
  return faqs;
}

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
