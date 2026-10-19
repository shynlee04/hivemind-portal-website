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
    <div className="cyber-shell" style={{ paddingTop: "2.5rem" }}>
      <Link
        href={`/${locale}/episodes`}
        className="touch-target"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "var(--accent-jade-wire)",
          marginBottom: "1.5rem",
        }}
      >
        ← {dict.episodesSection.backToEpisodesCta}
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
          <span>[EP-0{episode.episodeNumber}]</span>
          <span>[{episode.horizon.toUpperCase()}]</span>
          <span>{episode.duration}</span>
          <span>{episode.publishedAt}</span>
        </div>
        <h1
          style={{
            fontSize: "clamp(1.85rem, 3vw, 2.75rem)",
            marginBottom: "0.5rem",
          }}
        >
          {episode.title}
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-ash-slate)" }}>
          {episode.subtitle}
        </p>

        <div
          style={{
            marginTop: "1.25rem",
            padding: "1rem 1.25rem",
            backgroundColor: "var(--bg-scroll-lacquer)",
            borderLeft: "3px solid var(--accent-jade-wire)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--accent-jade-wire)",
              marginBottom: "0.25rem",
            }}
          >
            [YOUTUBE TEASER · {episode.youtubeTeaserTitle}]
          </div>
          <div style={{ fontSize: "0.95rem" }}>
            {episode.architectureTakeaway}
          </div>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <section className="cyber-chamfer" style={{ padding: "1.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--accent-wok-gold)",
              marginBottom: "1.25rem",
            }}
          >
            {dict.episodesSection.transcriptHeading}
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {episode.transcriptTurns.map((turn) => (
              <div
                key={turn.timestamp}
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--bg-wok-iron)",
                  border: "1px solid var(--border-forge-brass)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent-jade-wire)",
                    marginBottom: "0.4rem",
                  }}
                >
                  <span>
                    [{turn.timestamp}] {turn.speaker}
                  </span>
                  <span>[{turn.harness.toUpperCase()}]</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.95rem" }}>{turn.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cyber-chamfer" style={{ padding: "1.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--accent-jade-wire)",
              marginBottom: "1.25rem",
            }}
          >
            {dict.episodesSection.tuiReplayHeading}
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {episode.transcriptTurns.map((turn) => (
              <div
                key={turn.timestamp}
                style={{
                  padding: "1rem",
                  backgroundColor: "#05070B",
                  border: "1px solid var(--border-forge-brass)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.82rem",
                }}
              >
                <div
                  style={{
                    color: "var(--accent-wok-gold)",
                    marginBottom: "0.4rem",
                  }}
                >
                  $ {turn.tuiCommand}
                </div>
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    color: "var(--accent-bamboo-green)",
                  }}
                >
                  {turn.tuiOutput}
                </pre>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
