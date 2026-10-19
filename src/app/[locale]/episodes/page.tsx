import Link from "next/link";
import { listEpisodes } from "@/modules/content-showroom";
import {
  getPortalDictionary,
  LocaleSchema,
  type Locale,
} from "@/modules/locale-dictionary";

function resolveLocale(raw: string): Locale {
  const parsed = LocaleSchema.safeParse(raw);
  return parsed.success ? parsed.data : "en";
}

export default async function EpisodesIndexPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getPortalDictionary(locale);
  const episodes = await listEpisodes(locale);

  return (
    <section className="cyber-shell" style={{ paddingTop: "3rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--accent-wok-gold)",
            border: "1px solid var(--border-forge-brass)",
            padding: "0.25rem 0.6rem",
            backgroundColor: "var(--bg-smoked-basalt)",
          }}
        >
          [EPISODE HUB · TRANSCRIPT + TUI REPLAY]
        </span>
        <h1
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            marginTop: "0.85rem",
            marginBottom: "0.5rem",
          }}
        >
          {dict.episodesSection.pageTitle}
        </h1>
        <p style={{ color: "var(--text-ash-slate)", maxWidth: "66ch" }}>
          {dict.episodesSection.pageSubtitle}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {episodes.map((ep) => (
          <article
            key={ep.slug}
            className="cyber-chamfer"
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.25rem",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent-jade-wire)",
                  marginBottom: "0.75rem",
                }}
              >
                <span>
                  [EP-0{ep.episodeNumber} · {ep.horizon.toUpperCase()}]
                </span>
                <span>
                  {ep.duration} · {ep.publishedAt}
                </span>
              </div>
              <h2 style={{ fontSize: "1.35rem", marginBottom: "0.4rem" }}>
                {ep.title}
              </h2>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-ash-slate)",
                  marginBottom: "1rem",
                }}
              >
                {ep.summary}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {ep.featuredShowcases.map((sliceId) => (
                  <span
                    key={sliceId}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      padding: "0.15rem 0.45rem",
                      backgroundColor: "var(--bg-scroll-lacquer)",
                      border: "1px solid var(--border-forge-brass)",
                      color: "var(--accent-wok-gold)",
                    }}
                  >
                    [{sliceId}]
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/${locale}/episodes/${ep.slug}`}
              className="touch-target"
              style={{
                alignSelf: "flex-start",
                padding: "0 1rem",
                backgroundColor: "var(--accent-jade-wire)",
                color: "var(--bg-wok-iron)",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "2px",
              }}
            >
              {dict.episodesSection.watchEpisodeCta} →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
