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
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--accent-cyber-cyan)",
          marginBottom: "1.5rem",
        }}
      >
        {dict.blogSection.backToBlogCta}
      </Link>

      <header
        style={{
          padding: "2rem",
          marginBottom: "2rem",
          backgroundColor: "var(--bg-akihabara-deck)",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(42px, 4.2vw, 60px)",
            fontWeight: 500,
            marginBottom: "0.65rem",
          }}
        >
          {article.title}
        </h1>
        <p style={{ fontSize: "16px", color: "var(--text-cyber-slate)", marginBottom: "1rem" }}>
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
          <code style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
            [{article.horizon.toUpperCase()}] / {article.publishedAt} / {article.readingTime}
          </code>
        </div>

        <div
          style={{
            padding: "1rem 1.25rem",
            backgroundColor: "var(--bg-kabuki-panel)",
            borderRadius: "6px",
          }}
        >
          <strong
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--text-cyber-slate)",
              marginBottom: "0.25rem",
            }}
          >
            {dict.blogSection.proNotBroTakeawayLabel}
          </strong>
          <div style={{ fontSize: "16px", color: "var(--text-titanium)" }}>
            {article.proNotBroTakeaway}
          </div>
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {article.sections.map((section) => (
          <section
            key={section.heading}
            style={{
              padding: "1.75rem",
              backgroundColor: "var(--bg-akihabara-deck)",
              borderRadius: "8px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 2.5vw, 36px)",
                fontWeight: 500,
                color: "var(--text-titanium)",
                marginBottom: "0.85rem",
              }}
            >
              {section.heading}
            </h2>
            {section.bodyParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: "16px",
                  color: "var(--text-titanium)",
                  marginBottom: "0.9rem",
                  maxWidth: "54ch",
                }}
              >
                {paragraph}
              </p>
            ))}
            {section.codeSnippet ? (
              <div
                data-ui="article-code-terminal"
                style={{
                  marginTop: "1rem",
                  backgroundColor: "var(--bg-tokyo-void)",
                  padding: "1rem 1.15rem",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--text-cyber-slate)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {section.codeSnippet.caption}
                </div>
                <pre
                  style={{
                    margin: 0,
                    overflowX: "auto",
                    fontSize: "14px",
                    color: "var(--accent-cyber-cyan)",
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
