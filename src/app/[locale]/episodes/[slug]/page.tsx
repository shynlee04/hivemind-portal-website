import Link from "next/link";
import { notFound } from "next/navigation";
import { getEpisodeBySlug, listEpisodes } from "@/modules/content-showroom";
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
    const episodes = await listEpisodes(locale);
    for (const ep of episodes) {
      params.push({ locale, slug: ep.slug });
    }
  }
  return params;
}

export default async function EpisodeDetailPage({
  params,
}: {
  readonly params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getPortalDictionary(locale);
  const episode = await getEpisodeBySlug(slug, locale);

  if (!episode) {
    notFound();
  }

  return (
    <div className="cyber-shell" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <Link
        href={`/${locale}/episodes`}
        className="touch-target"
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--accent-jade-wire)",
          marginBottom: "1.5rem",
        }}
      >
        ← {dict.episodesSection.backToEpisodesCta}
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
            marginBottom: "0.5rem",
          }}
        >
          {episode.title}
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-ash-slate)", marginBottom: "1rem" }}>
          {episode.subtitle}
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
            [EP-{episode.episodeNumber}] · [{episode.horizon.toUpperCase()}] · {episode.duration}
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
              color: "var(--accent-jade-wire)",
              marginBottom: "0.35rem",
            }}
          >
            {episode.youtubeTeaserTitle}
          </strong>
          <div style={{ fontSize: "0.95rem" }}>
            {episode.architectureTakeaway}
          </div>
        </div>
      </header>

      <div className="split-50-50">
        <section
          style={{
            padding: "1.75rem",
            backgroundColor: "var(--bg-smoked-basalt)",
            borderRadius: "8px",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              color: "var(--accent-wok-gold)",
              marginBottom: "1.25rem",
            }}
          >
            {dict.episodesSection.transcriptHeading}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {episode.transcriptTurns.map((turn) => (
              <div
                key={turn.timestamp}
                style={{
                  padding: "1.1rem",
                  backgroundColor: "var(--bg-wok-iron)",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.78rem",
                    color: "var(--accent-jade-wire)",
                    marginBottom: "0.45rem",
                  }}
                >
                  <code>
                    [{turn.timestamp}] {turn.speaker}
                  </code>
                  <code>[{turn.harness.toUpperCase()}]</code>
                </div>
                <p style={{ margin: 0, fontSize: "0.95rem" }}>{turn.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          data-ui="episode-tui-replay"
          style={{
            padding: "1.75rem",
            backgroundColor: "var(--bg-smoked-basalt)",
            borderRadius: "8px",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              color: "var(--accent-jade-wire)",
              marginBottom: "1.25rem",
            }}
          >
            {dict.episodesSection.tuiReplayHeading}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {episode.transcriptTurns.map((turn) => (
              <div
                key={turn.timestamp}
                style={{
                  padding: "1.1rem",
                  backgroundColor: "#05070B",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                }}
              >
                <div style={{ color: "var(--accent-wok-gold)", marginBottom: "0.4rem" }}>
                  <code>$ {turn.tuiCommand}</code>
                </div>
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    color: "var(--accent-bamboo-green)",
                  }}
                >
                  <code>{turn.tuiOutput}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
