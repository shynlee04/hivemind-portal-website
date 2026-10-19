import React from "react";
import Link from "next/link";
import type {
  ConversionAudience,
  ConversionCtaItem,
  Locale,
  PortalDictionary,
  QuotaSavingsEstimate,
} from "@/types/portal";
import { PARTNER_URLS } from "@/modules/partner-conversion";

export interface QuotaPartnerSectionProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
  readonly hoursPerWeek: number;
  readonly setHoursPerWeek: (h: number) => void;
  readonly savings: QuotaSavingsEstimate;
  readonly activeAudience: ConversionAudience;
  readonly setActiveAudience: (a: ConversionAudience) => void;
  readonly allConversionItems: ReadonlyArray<ConversionCtaItem>;
}

export function QuotaPartnerSection({
  locale,
  dictionary,
  hoursPerWeek,
  setHoursPerWeek,
  savings,
  activeAudience,
  setActiveAudience,
  allConversionItems,
}: QuotaPartnerSectionProps): React.JSX.Element {
  return (
    <section
        id="conversion"
        data-reveal=""
        style={{
          paddingTop: "clamp(5rem, 9vw, 8.5rem)",
          paddingBottom: "clamp(5rem, 9vw, 8.5rem)",
          backgroundColor: "var(--bg-wok-iron)",
        }}
      >
        <div className="cyber-shell">
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "clamp(32px, 3.1vw, 44px)",
                marginBottom: "0.5rem",
              }}
            >
              {dictionary.conversionSection.sectionTitle}
            </h2>
            <p
              style={{
                color: "var(--text-parchment)",
                maxWidth: "60ch",
                margin: 0,
                fontSize: "17px",
              }}
            >
              {dictionary.conversionSection.sectionSubtitle}
            </p>
          </div>

          {/* Interactive Quota-Savings Bar-Chart Scrubber */}
          <div
            
            className="split-50-50"
            style={{
              backgroundColor: "var(--bg-smoked-basalt)",
              borderRadius: "8px",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              marginBottom: "3.5rem",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ fontSize: "22px", margin: 0 }}>
                {dictionary.conversionSection.calculatorTitle}
              </h3>
              <p style={{ margin: 0, color: "var(--text-parchment)", fontSize: "17px" }}>
                {dictionary.conversionSection.calculatorSubtitle}
              </p>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <label htmlFor="hours-slider" style={{ fontWeight: 600, fontSize: "17px" }}>
                    {dictionary.conversionSection.hoursPerWeekLabel}
                  </label>
                  <code
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "var(--accent-wok-gold)",
                    }}
                  >
                    {savings.hoursPerWeek} hrs / wk
                  </code>
                </div>
                <input
                  id="hours-slider"
                  type="range"
                  min={5}
                  max={80}
                  step={5}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent-wok-gold)" }}
                />
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.65rem", flexWrap: "wrap" }}>
                  {[15, 35, 60, 80].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setHoursPerWeek(preset)}
                      className="touch-target"
                      style={{
                        padding: "0 0.85rem",
                        borderRadius: "4px",
                        border: "none",
                        backgroundColor:
                          hoursPerWeek === preset
                            ? "var(--accent-wok-gold)"
                            : "var(--bg-wok-iron)",
                        color:
                          hoursPerWeek === preset
                            ? "var(--bg-wok-iron)"
                            : "var(--text-parchment)",
                        fontWeight: 700,
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      {preset}h/wk
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Cost & Token Bar Chart Comparison */}
            <div
              style={{
                backgroundColor: "var(--bg-wok-iron)",
                padding: "1.5rem",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "1.15rem",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    marginBottom: "0.35rem",
                  }}
                >
                  <span style={{ color: "var(--text-ash-slate)" }}>
                    {dictionary.conversionSection.baselineCostLabel}
                  </span>
                  <code style={{ color: "var(--accent-dragon-ember)", fontWeight: 700 }}>
                    ${savings.baselineMonthlyUsd}/mo
                  </code>
                </div>
                <div
                  style={{
                    height: "14px",
                    backgroundColor: "var(--bg-smoked-basalt)",
                    borderRadius: "7px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "var(--accent-dragon-ember)",
                    }}
                  />
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    marginBottom: "0.35rem",
                  }}
                >
                  <span style={{ color: "var(--text-parchment)", fontWeight: 600 }}>
                    {dictionary.conversionSection.optimizedCostLabel}
                  </span>
                  <code style={{ color: "var(--accent-jade-wire)", fontWeight: 700 }}>
                    ${savings.optimizedMonthlyUsd}/mo
                  </code>
                </div>
                <div
                  style={{
                    height: "14px",
                    backgroundColor: "var(--bg-smoked-basalt)",
                    borderRadius: "7px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${100 - savings.savingsPercentage}%`,
                      height: "100%",
                      backgroundColor: "var(--accent-jade-wire)",
                      transition: "width var(--dur-med) var(--ease-out)",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "0.5rem",
                  gap: "1rem",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", color: "var(--text-ash-slate)" }}>
                    {dictionary.conversionSection.monthlySavingsLabel}
                  </div>
                  <strong
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                      color: "var(--accent-bamboo-green)",
                    }}
                  >
                    ${savings.monthlySavingsUsd}/mo (-{savings.savingsPercentage}%)
                  </strong>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "14px", color: "var(--text-ash-slate)" }}>
                    {dictionary.conversionSection.prunedTokensLabel}
                  </div>
                  <code
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--accent-wok-gold)",
                    }}
                  >
                    {(savings.prunedTokensPerMonth / 1_000_000).toFixed(2)}M tokens
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Partner, Referral & Supporter Comparison Table (Real HTML Table) */}
          <div
            
            style={{
              backgroundColor: "var(--bg-smoked-basalt)",
              borderRadius: "8px",
              padding: "clamp(1.25rem, 2.5vw, 2rem)",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ fontSize: "22px", margin: 0 }}>
                {dictionary.conversionSection.sponsorMatrixTitle}
              </h3>
              <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                {(
                  [
                    ["builders", dictionary.conversionSection.audienceBuildersTab],
                    ["supporters", dictionary.conversionSection.audienceSupportersTab],
                    ["sponsors", dictionary.conversionSection.audienceSponsorsTab],
                  ] as const
                ).map(([aud, label]) => (
                  <button
                    key={aud}
                    type="button"
                    onClick={() => setActiveAudience(aud)}
                    aria-pressed={activeAudience === aud}
                    className="touch-target"
                    style={{
                      padding: "0 0.9rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor:
                        activeAudience === aud
                          ? "var(--accent-wok-gold)"
                          : "var(--bg-wok-iron)",
                      color:
                        activeAudience === aud
                          ? "var(--bg-wok-iron)"
                          : "var(--text-parchment)",
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <table className="forge-table">
              <thead>
                <tr>
                  <th>{locale === "vi" ? "Đối Tác / Kênh" : "Partner / Vault"}</th>
                  <th>{locale === "vi" ? "Vai Trò Trong Chảo Lửa" : "Role in the Wok"}</th>
                  <th>{locale === "vi" ? "Cam Kết Minh Bạch" : "Transparency Note"}</th>
                  <th>{locale === "vi" ? "Truy Cập" : "Action"}</th>
                </tr>
              </thead>
              <tbody>
                {allConversionItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong style={{ color: "var(--text-parchment)", display: "block", fontSize: "17px" }}>
                        {item.headline}
                      </strong>
                      <code style={{ fontSize: "14px", color: "var(--accent-wok-gold)" }}>
                        {item.badge}
                      </code>
                    </td>
                    <td style={{ color: "var(--text-parchment)", maxWidth: "38ch", fontSize: "17px" }}>
                      {item.description}
                    </td>
                    <td style={{ color: "var(--text-ash-slate)", maxWidth: "34ch", fontSize: "17px" }}>
                      {item.disclosure}
                    </td>
                    <td>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target"
                        style={{
                          padding: "0 1rem",
                          backgroundColor: item.isHighlighted
                            ? "var(--accent-wok-gold)"
                            : "var(--bg-scroll-lacquer)",
                          color: item.isHighlighted
                            ? "var(--bg-wok-iron)"
                            : "var(--accent-jade-wire)",
                          borderRadius: "6px",
                          fontWeight: 700,
                          fontSize: "14px",
                          maxWidth: "100%",
                        }}
                      >
                        {item.label} ↗
                      </a>
                    </td>
                  </tr>
                ))}
                {allConversionItems.length === 0 ? (
                  <tr>
                    <td>
                      <strong>Freebuff &amp; Zap GLM</strong>
                    </td>
                    <td>Tri-Harness Offload</td>
                    <td>Verified Partner Links</td>
                    <td>
                      <a href={PARTNER_URLS.freebuffReferral}>Freebuff</a> ·{" "}
                      <a href={PARTNER_URLS.zapGlm}>Zap GLM</a>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>

            {/* Secondary Navigation Links to Stage 2 Deep-Dives */}
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                paddingTop: "1.25rem",
              }}
            >
              <span style={{ color: "var(--text-parchment)", fontSize: "17px" }}>
                {locale === "vi"
                  ? "Khám phá thêm Stage 2: Blog Kiến Trúc, Kho Tập Phim TUI & Storybook Showroom:"
                  : "Explore Stage 2: Architecture Essays, Synchronized TUI Episodes & Component Showroom:"}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
                <Link
                  href={`/${locale}/blog`}
                  className="touch-target"
                  style={{
                    padding: "0 1rem",
                    backgroundColor: "var(--bg-wok-iron)",
                    color: "var(--accent-jade-wire)",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.nav.blogLink} →
                </Link>
                <Link
                  href={`/${locale}/episodes`}
                  className="touch-target"
                  style={{
                    padding: "0 1rem",
                    backgroundColor: "var(--bg-wok-iron)",
                    color: "var(--accent-wok-gold)",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.nav.episodesLink} →
                </Link>
                <Link
                  href={`/${locale}/showroom`}
                  className="touch-target"
                  style={{
                    padding: "0 1rem",
                    backgroundColor: "var(--bg-wok-iron)",
                    color: "var(--accent-bamboo-green)",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.nav.showroomLink} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
