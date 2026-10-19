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
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--accent-cyber-cyan)",
          marginBottom: "1.5rem",
        }}
      >
        {dict.episodesSection.backToEpisodesCta}
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
            marginBottom: "0.5rem",
          }}
        >
          {episode.title}
        </h1>
        <p style={{ fontSize: "16px", color: "var(--text-cyber-slate)", marginBottom: "1rem" }}>
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
          <code style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
            [EP-{episode.episodeNumber}] / [{episode.horizon.toUpperCase()}] / {episode.duration}
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
            {episode.youtubeTeaserTitle}
          </strong>
          <div style={{ fontSize: "16px", color: "var(--text-titanium)" }}>
            {episode.architectureTakeaway}
          </div>
        </div>
      </header>

      <div className="split-50-50">
        <section
          style={{
            padding: "1.5rem",
            backgroundColor: "var(--bg-akihabara-deck)",
            borderRadius: "8px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 2.5vw, 36px)",
              fontWeight: 500,
              color: "var(--text-titanium)",
              marginBottom: "1rem",
            }}
          >
            {dict.episodesSection.transcriptHeading}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {episode.transcriptTurns.map((turn) => (
              <div
                key={turn.timestamp}
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--bg-tokyo-void)",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    color: "var(--text-cyber-slate)",
                    marginBottom: "0.35rem",
                  }}
                >
                  <code>
                    [{turn.timestamp}] {turn.speaker}
                  </code>
                  <code>[{turn.harness.toUpperCase()}]</code>
                </div>
                <p style={{ margin: 0, fontSize: "16px", color: "var(--text-titanium)" }}>
                  {turn.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          data-ui="episode-tui-replay"
          style={{
            padding: "1.5rem",
            backgroundColor: "var(--bg-akihabara-deck)",
            borderRadius: "8px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 2.5vw, 36px)",
              fontWeight: 500,
              color: "var(--text-titanium)",
              marginBottom: "1rem",
            }}
          >
            {dict.episodesSection.tuiReplayHeading}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {episode.transcriptTurns.map((turn) => (
              <div
                key={turn.timestamp}
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--bg-tokyo-void)",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              >
                <div style={{ color: "var(--accent-cyber-cyan)", marginBottom: "0.35rem" }}>
                  <code>$ {turn.tuiCommand}</code>
                </div>
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    color: "var(--text-titanium)",
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
