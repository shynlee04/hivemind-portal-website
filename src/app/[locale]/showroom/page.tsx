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
    <div className="cyber-shell" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "clamp(42px, 4.2vw, 60px)",
            fontWeight: 500,
            marginBottom: "0.6rem",
          }}
        >
          {dict.showroomSection.pageTitle}
        </h1>
        <p style={{ color: "var(--text-cyber-slate)", maxWidth: "62ch", fontSize: "16px", margin: 0 }}>
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
            <div
              data-ui="showroom-xray-sample"
              style={{
                padding: "1.25rem",
                backgroundColor: "var(--bg-akihabara-deck)",
                borderRadius: "6px",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: 500, marginBottom: "0.4rem" }}>
                {sampleSlice.title}
              </h3>
              <p style={{ color: "var(--text-titanium)", marginBottom: "0.85rem", fontSize: "16px" }}>
                {sampleSlice.summary}
              </p>
              <pre
                style={{
                  backgroundColor: "var(--bg-tokyo-void)",
                  padding: "0.85rem 1rem",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "var(--accent-cyber-cyan)",
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
                  padding: "1.2rem",
                  backgroundColor: "var(--bg-akihabara-deck)",
                  borderRadius: "6px",
                }}
              >
                <h3 style={{ margin: "0 0 0.45rem 0", fontSize: "20px", fontWeight: 500 }}>
                  {item.headline}
                </h3>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target"
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--accent-cyber-cyan)",
                  }}
                >
                  {item.label}
                </a>
              </div>
            ))}
            <div
              style={{
                padding: "1.2rem",
                backgroundColor: "var(--bg-kabuki-panel)",
                borderRadius: "6px",
              }}
            >
              <strong style={{ color: "var(--text-cyber-slate)", fontSize: "14px", fontWeight: 500 }}>
                {sampleSavings.hoursPerWeek}h/wk Quota Snapshot
              </strong>
              <div style={{ fontSize: "20px", fontWeight: 500, marginTop: "0.35rem", color: "var(--accent-cyber-cyan)" }}>
                ${sampleSavings.monthlySavingsUsd}/mo ({sampleSavings.savingsPercentage}%)
              </div>
            </div>
          </div>
        </ShowcaseHarness>

        <section
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
              marginBottom: "1rem",
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
                    <code style={{ color: "var(--accent-cyber-cyan)", fontWeight: 500 }}>
                      {col.slug}
                    </code>
                  </td>
                  <td>
                    <code>{col.admin.useAsTitle}</code>
                  </td>
                  <td>
                    <code style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
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
