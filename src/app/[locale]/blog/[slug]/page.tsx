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
      style={{ paddingTop: "2.5rem", maxWidth: "920px" }}
    >
      <Link
        href={`/${locale}/blog`}
        className="touch-target"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "var(--accent-jade-wire)",
          marginBottom: "1.5rem",
        }}
      >
        ← {dict.blogSection.backToBlogCta}
      </Link>

      <header
        className="cyber-chamfer"
        style={{ padding: "2rem", marginBottom: "2rem" }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "var(--accent-wok-gold)",
            marginBottom: "0.75rem",
          }}
        >
          <span>[{article.horizon.toUpperCase()}]</span>
          <span>{article.publishedAt}</span>
          <span>{article.readingTime}</span>
          <span>{article.authorRole}</span>
        </div>
        <h1
          style={{
            fontSize: "clamp(1.85rem, 3vw, 2.75rem)",
            marginBottom: "0.75rem",
          }}
        >
          {article.title}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-ash-slate)" }}>
          {article.subtitle}
        </p>

        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem 1.25rem",
            backgroundColor: "var(--bg-scroll-lacquer)",
            borderLeft: "3px solid var(--accent-wok-gold)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--accent-wok-gold)",
              marginBottom: "0.35rem",
            }}
          >
            {dict.blogSection.proNotBroTakeawayLabel}
          </div>
          <div style={{ fontSize: "0.95rem" }}>{article.proNotBroTakeaway}</div>
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {article.sections.map((section) => (
          <section
            key={section.heading}
            className="cyber-chamfer"
            style={{ padding: "1.75rem" }}
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
                style={{
                  marginTop: "1.25rem",
                  backgroundColor: "var(--bg-wok-iron)",
                  border: "1px solid var(--border-forge-brass)",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
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
                    fontFamily: "var(--font-mono)",
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
