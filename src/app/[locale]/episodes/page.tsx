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

const EPISODE_PLATES = [
  "/assets/tri-harness-signal-plate.jpg",
  "/assets/greenfield-forge-plate.jpg",
  "/assets/substrate-honeycomb-plate.jpg",
] as const;

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
    <section className="cyber-shell" style={{ paddingTop: "4.5rem", paddingBottom: "4rem" }}>
      <div style={{ marginBottom: "3.5rem" }}>
        <h1
          style={{
            fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
            marginBottom: "0.75rem",
          }}
        >
          {dict.episodesSection.pageTitle}
        </h1>
        <p style={{ color: "var(--text-ash-slate)", maxWidth: "62ch", fontSize: "1.1rem" }}>
          {dict.episodesSection.pageSubtitle}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {episodes.map((ep, idx) => (
          <article
            key={ep.slug}
            className="split-62-38"
            style={{
              padding: "2rem",
              backgroundColor: idx % 2 === 0 ? "var(--bg-smoked-basalt)" : "var(--bg-scroll-lacquer)",
              borderRadius: "8px",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.85rem)", marginBottom: "0.5rem" }}>
                {ep.title}
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--text-ash-slate)",
                  marginBottom: "1.25rem",
                  maxWidth: "62ch",
                }}
              >
                {ep.summary}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <code
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.55rem",
                    backgroundColor: "var(--bg-wok-iron)",
                    color: "var(--accent-jade-wire)",
                    borderRadius: "4px",
                  }}
                >
                  EP-{ep.episodeNumber} / {ep.duration} / {ep.horizon.toUpperCase()}
                </code>
                {ep.featuredShowcases.map((sliceId) => (
                  <code
                    key={sliceId}
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.2rem 0.5rem",
                      backgroundColor: "var(--bg-wok-iron)",
                      color: "var(--accent-wok-gold)",
                      borderRadius: "4px",
                    }}
                  >
                    [{sliceId}]
                  </code>
                ))}
              </div>

              <Link
                href={`/${locale}/episodes/${ep.slug}`}
                className="touch-target"
                style={{
                  padding: "0 1.25rem",
                  backgroundColor: "var(--accent-jade-wire)",
                  color: "var(--bg-wok-iron)",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  borderRadius: "4px",
                }}
              >
                {dict.episodesSection.watchEpisodeCta}
              </Link>
            </div>

            <div style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "16 / 10", backgroundColor: "#06090E" }}>
              <img
                src={EPISODE_PLATES[idx % EPISODE_PLATES.length]}
                alt={ep.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
