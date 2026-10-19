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
    <section className="cyber-shell" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "clamp(32px, 3.8vw, 52px)",
            fontWeight: 500,
            marginBottom: "0.6rem",
          }}
        >
          {dict.episodesSection.pageTitle}
        </h1>
        <p style={{ color: "var(--text-titanium)", maxWidth: "54ch", fontSize: "16px", margin: 0 }}>
          {dict.episodesSection.pageSubtitle}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {episodes.map((ep, idx) => (
          <article
            key={ep.slug}
            className="split-62-38"
            style={{
              padding: "1.75rem",
              backgroundColor: idx % 2 === 0 ? "var(--bg-akihabara-deck)" : "var(--bg-kabuki-panel)",
              borderRadius: "8px",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(28px, 2.5vw, 36px)",
                  fontWeight: 500,
                  marginBottom: "0.45rem",
                }}
              >
                {ep.title}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "var(--text-titanium)",
                  marginBottom: "1rem",
                  maxWidth: "54ch",
                }}
              >
                {ep.summary}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.25rem" }}>
                <code
                  style={{
                    fontSize: "14px",
                    padding: "0.2rem 0.55rem",
                    backgroundColor: "var(--bg-tokyo-void)",
                    color: "var(--text-titanium)",
                    borderRadius: "4px",
                  }}
                >
                  EP-{ep.episodeNumber} / {ep.duration} / {ep.horizon.toUpperCase()}
                </code>
                {ep.featuredShowcases.map((sliceId) => (
                  <code
                    key={sliceId}
                    style={{
                      fontSize: "14px",
                      padding: "0.2rem 0.5rem",
                      backgroundColor: "var(--bg-tokyo-void)",
                      color: "var(--text-cyber-slate)",
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
                  padding: "0 1.15rem",
                  backgroundColor: idx === 0 ? "var(--accent-cyber-cyan)" : "var(--bg-tokyo-void)",
                  color: idx === 0 ? "var(--bg-tokyo-void)" : "var(--text-titanium)",
                  fontWeight: 500,
                  fontSize: "14px",
                  borderRadius: "6px",
                }}
              >
                {dict.episodesSection.watchEpisodeCta}
              </Link>
            </div>

            <div
              style={{
                borderRadius: "6px",
                overflow: "hidden",
                aspectRatio: "16 / 10",
                backgroundColor: "var(--bg-tokyo-void)",
              }}
            >
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
