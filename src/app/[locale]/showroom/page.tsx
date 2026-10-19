import {
  payloadCollections,
  ShowcaseHarness,
} from "@/modules/content-showroom";
import { getShowcaseById } from "@/modules/ecosystem-catalog";
import {
  getPortalDictionary,
  LocaleSchema,
  type Locale,
} from "@/modules/locale-dictionary";
import {
  calculateQuotaSavings,
  resolveConversionCtas,
} from "@/modules/partner-conversion";
import { WokReactorStage } from "@/modules/wok-reactor-stage";

function resolveLocale(raw: string): Locale {
  const parsed = LocaleSchema.safeParse(raw);
  return parsed.success ? parsed.data : "en";
}

export default async function ShowroomPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getPortalDictionary(locale);
  const sampleSlice = getShowcaseById("S8", locale);
  const conversion = resolveConversionCtas({
    locale,
    audience: "builders",
    sliceId: "S8",
  });
  const sampleSavings = calculateQuotaSavings(35);

  return (
    <div className="cyber-shell" style={{ paddingTop: "3rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--accent-bamboo-green)",
            border: "1px solid var(--border-forge-brass)",
            padding: "0.25rem 0.6rem",
            backgroundColor: "var(--bg-smoked-basalt)",
          }}
        >
          [STAGE 2 · STORYBOOK 8 & PAYLOAD 3.0 COMPONENT SHOWROOM]
        </span>
        <h1
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            marginTop: "0.85rem",
            marginBottom: "0.5rem",
          }}
        >
          {dict.showroomSection.pageTitle}
        </h1>
        <p style={{ color: "var(--text-ash-slate)", maxWidth: "66ch" }}>
          {dict.showroomSection.pageSubtitle}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <ShowcaseHarness
          locale={locale}
          reducedMotion={true}
          horizon="next-release"
          title={dict.showroomSection.storyWokTitle}
        >
          <WokReactorStage
            activeHarness="freebuff"
            activeHorizon="next-release"
            reducedMotion={true}
            locale={locale}
          />
        </ShowcaseHarness>

        {sampleSlice ? (
          <ShowcaseHarness
            locale={locale}
            reducedMotion={true}
            horizon={sampleSlice.horizon}
            title={dict.showroomSection.storyXrayTitle}
          >
            <div className="cyber-chamfer" style={{ padding: "1.5rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--accent-wok-gold)",
                  marginBottom: "0.5rem",
                }}
              >
                [{sampleSlice.id}] · {sampleSlice.horizonBadge}
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                {sampleSlice.title}
              </h3>
              <p style={{ color: "var(--text-ash-slate)" }}>
                {sampleSlice.summary}
              </p>
              <pre
                style={{
                  backgroundColor: "var(--bg-wok-iron)",
                  padding: "1rem",
                  border: "1px solid var(--border-forge-brass)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--accent-jade-wire)",
                  overflowX: "auto",
                }}
              >
                {sampleSlice.xray.orchestratorTool}
              </pre>
            </div>
          </ShowcaseHarness>
        ) : null}

        <ShowcaseHarness
          locale={locale}
          reducedMotion={true}
          horizon="next-release"
          title={dict.showroomSection.storyConversionTitle}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {conversion.items.map((item) => (
              <div
                key={item.id}
                className="cyber-chamfer"
                style={{ padding: "1.25rem" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent-wok-gold)",
                  }}
                >
                  [{item.badge}]
                </div>
                <h4 style={{ margin: "0.5rem 0" }}>{item.headline}</h4>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--accent-jade-wire)",
                  }}
                >
                  {item.label} ↗
                </a>
              </div>
            ))}
            <div className="cyber-chamfer" style={{ padding: "1.25rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent-bamboo-green)",
                }}
              >
                [QUOTA SAVINGS SNAPSHOT · {sampleSavings.hoursPerWeek}h/wk]
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginTop: "0.5rem",
                }}
              >
                ${sampleSavings.monthlySavingsUsd}/mo ({sampleSavings.savingsPercentage}%)
              </div>
            </div>
          </div>
        </ShowcaseHarness>

        <section className="cyber-chamfer" style={{ padding: "1.75rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.1rem",
              color: "var(--accent-jade-wire)",
              marginBottom: "1rem",
            }}
          >
            {dict.showroomSection.payloadCollectionsTitle}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1rem",
            }}
          >
            {payloadCollections.map((col) => (
              <div
                key={col.slug}
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--bg-wok-iron)",
                  border: "1px solid var(--border-forge-brass)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    color: "var(--accent-wok-gold)",
                  }}
                >
                  collection: &quot;{col.slug}&quot;
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--text-ash-slate)",
                    marginTop: "0.35rem",
                  }}
                >
                  fields: {col.fields.map((f) => f.name).join(", ")}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
