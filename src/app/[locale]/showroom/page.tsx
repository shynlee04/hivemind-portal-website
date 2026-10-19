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
    <div className="cyber-shell" style={{ paddingTop: "4.5rem", paddingBottom: "4rem" }}>
      <div style={{ marginBottom: "3.5rem" }}>
        <h1
          style={{
            fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
            marginBottom: "0.75rem",
          }}
        >
          {dict.showroomSection.pageTitle}
        </h1>
        <p style={{ color: "var(--text-ash-slate)", maxWidth: "62ch", fontSize: "1.1rem" }}>
          {dict.showroomSection.pageSubtitle}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
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
            <div
              data-ui="showroom-xray-sample"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--bg-smoked-basalt)",
                borderRadius: "6px",
              }}
            >
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                {sampleSlice.title}
              </h3>
              <p style={{ color: "var(--text-ash-slate)", marginBottom: "1rem" }}>
                {sampleSlice.summary}
              </p>
              <pre
                style={{
                  backgroundColor: "var(--bg-wok-iron)",
                  padding: "1rem",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                  color: "var(--accent-jade-wire)",
                  overflowX: "auto",
                  margin: 0,
                }}
              >
                <code>{sampleSlice.xray.orchestratorTool}</code>
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
          <div className="split-50-50">
            {conversion.items.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "1.35rem",
                  backgroundColor: "var(--bg-smoked-basalt)",
                  borderRadius: "6px",
                }}
              >
                <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>{item.headline}</h4>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--accent-jade-wire)",
                  }}
                >
                  {item.label}
                </a>
              </div>
            ))}
            <div
              style={{
                padding: "1.35rem",
                backgroundColor: "var(--bg-scroll-lacquer)",
                borderRadius: "6px",
              }}
            >
              <strong style={{ color: "var(--accent-bamboo-green)", fontSize: "0.85rem" }}>
                {sampleSavings.hoursPerWeek}h/wk Quota Snapshot
              </strong>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, marginTop: "0.4rem" }}>
                ${sampleSavings.monthlySavingsUsd}/mo ({sampleSavings.savingsPercentage}%)
              </div>
            </div>
          </div>
        </ShowcaseHarness>

        <section
          style={{
            padding: "2rem",
            backgroundColor: "var(--bg-smoked-basalt)",
            borderRadius: "8px",
          }}
        >
          <h2
            style={{
              fontSize: "1.45rem",
              color: "var(--accent-jade-wire)",
              marginBottom: "1.25rem",
            }}
          >
            {dict.showroomSection.payloadCollectionsTitle}
          </h2>
          <table className="forge-table">
            <thead>
              <tr>
                <th>Collection Slug</th>
                <th>Title Field</th>
                <th>Schema Fields</th>
              </tr>
            </thead>
            <tbody>
              {payloadCollections.map((col) => (
                <tr key={col.slug}>
                  <td>
                    <code style={{ color: "var(--accent-wok-gold)", fontWeight: 700 }}>
                      {col.slug}
                    </code>
                  </td>
                  <td>
                    <code>{col.admin.useAsTitle}</code>
                  </td>
                  <td>
                    <code style={{ fontSize: "0.8rem", color: "var(--text-ash-slate)" }}>
                      {col.fields.map((f) => f.name).join(", ")}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
