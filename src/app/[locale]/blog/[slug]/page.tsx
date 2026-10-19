import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, listArticles } from "@/modules/content-showroom";
import {
  getPortalDictionary,
  LocaleSchema,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/modules/locale-dictionary";

function resolveLocale(raw: string): Locale {
  const parsed = LocaleSchema.safeParse(raw);
  return parsed.success ? parsed.data : "en";
}

export async function generateStaticParams() {
  const params: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of SUPPORTED_LOCALES) {
    const articles = await listArticles({ locale });
    for (const article of articles) {
      params.push({ locale, slug: article.slug });
    }
  }
  return params;
}

export default async function BlogDetailPage({
  params,
}: {
  readonly params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getPortalDictionary(locale);
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  return (
    <article
      className="cyber-shell"
      style={{ paddingTop: "3rem", paddingBottom: "4rem", maxWidth: "920px" }}
    >
      <Link
        href={`/${locale}/blog`}
        className="touch-target"
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--accent-jade-wire)",
          marginBottom: "1.5rem",
        }}
      >
        {dict.blogSection.backToBlogCta}
      </Link>

      <header
        style={{
          padding: "2.25rem",
          marginBottom: "2.25rem",
          backgroundColor: "var(--bg-smoked-basalt)",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.85rem, 3vw, 2.65rem)",
            marginBottom: "0.75rem",
          }}
        >
          {article.title}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-ash-slate)", marginBottom: "1rem" }}>
          {article.subtitle}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "1.25rem",
          }}
        >
          <code style={{ fontSize: "0.78rem", color: "var(--accent-wok-gold)" }}>
            [{article.horizon.toUpperCase()}] / {article.publishedAt} / {article.readingTime}
          </code>
        </div>

        <div
          style={{
            padding: "1.15rem 1.35rem",
            backgroundColor: "var(--bg-scroll-lacquer)",
            borderRadius: "6px",
          }}
        >
          <strong
            style={{
              display: "block",
              fontSize: "0.8rem",
              color: "var(--accent-wok-gold)",
              marginBottom: "0.35rem",
            }}
          >
            {dict.blogSection.proNotBroTakeawayLabel}
          </strong>
          <div style={{ fontSize: "0.95rem" }}>{article.proNotBroTakeaway}</div>
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {article.sections.map((section) => (
          <section
            key={section.heading}
            style={{
              padding: "2rem",
              backgroundColor: "var(--bg-smoked-basalt)",
              borderRadius: "8px",
            }}
          >
            <h2
              style={{
                fontSize: "1.4rem",
                color: "var(--accent-jade-wire)",
                marginBottom: "1rem",
              }}
            >
              {section.heading}
            </h2>
            {section.bodyParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text-parchment)",
                  marginBottom: "1rem",
                  maxWidth: "66ch",
                }}
              >
                {paragraph}
              </p>
            ))}
            {section.codeSnippet ? (
              <div
                data-ui="article-code-terminal"
                style={{
                  marginTop: "1.25rem",
                  backgroundColor: "var(--bg-wok-iron)",
                  padding: "1.25rem",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--accent-wok-gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {section.codeSnippet.caption}
                </div>
                <pre
                  style={{
                    margin: 0,
                    overflowX: "auto",
                    fontSize: "0.85rem",
                    color: "var(--accent-jade-wire)",
                  }}
                >
                  <code>{section.codeSnippet.code}</code>
                </pre>
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
