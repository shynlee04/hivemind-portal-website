import React from "react";
import type {
  ConversionAudience,
  ConversionBundle,
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
  readonly setHoursPerWeek: (hrs: number) => void;
  readonly savings: QuotaSavingsEstimate;
  readonly activeAudience: ConversionAudience;
  readonly setActiveAudience: (aud: ConversionAudience) => void;
  readonly allConversionItems: ReadonlyArray<ConversionCtaItem>;
  readonly conversionBundle: ConversionBundle;
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
  conversionBundle,
}: QuotaPartnerSectionProps) {
  return (
      <section
        id="conversion"
        data-reveal=""
        style={{
          scrollMarginTop: "5rem",
          paddingTop: "clamp(4.5rem, 8vw, 7.5rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)",
          backgroundColor: "var(--bg-akihabara-deck)",
        }}
      >
        <div className="cyber-shell">
          <div style={{ marginBottom: "2.5rem" }}>
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
                color: "var(--text-titanium)",
                maxWidth: "64ch",
                margin: 0,
                fontSize: "17px",
              }}
            >
              {dictionary.conversionSection.sectionSubtitle}
            </p>
          </div>

          {/* Interactive Pocket-Savings Calculator & Bar Comparison */}
          <div
            className="split-50-50"
            style={{
              backgroundColor: "var(--bg-tokyo-void)",
              borderRadius: "8px",
              padding: "clamp(1.25rem, 2.5vw, 2.25rem)",
              marginBottom: "3rem",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
              <h3 style={{ fontSize: "22px", margin: 0 }}>
                {dictionary.conversionSection.calculatorTitle}
              </h3>
              <p style={{ margin: 0, color: "var(--text-titanium)", fontSize: "17px" }}>
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
                      fontWeight: 700,
                      color: "var(--accent-voltage-gold)",
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
                  style={{ width: "100%", accentColor: "var(--accent-cyber-cyan)" }}
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
                            ? "var(--accent-cyber-cyan)"
                            : "var(--bg-akihabara-deck)",
                        color:
                          hoursPerWeek === preset
                            ? "var(--bg-tokyo-void)"
                            : "var(--text-titanium)",
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

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
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
                  <span style={{ color: "var(--text-cyber-slate)" }}>
                    {dictionary.conversionSection.baselineCostLabel}
                  </span>
                  <code style={{ color: "var(--accent-neon-crimson)", fontWeight: 700 }}>
                    ${savings.baselineMonthlyUsd}/mo
                  </code>
                </div>
                <div
                  style={{
                    height: "14px",
                    backgroundColor: "var(--bg-akihabara-deck)",
                    borderRadius: "7px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "var(--accent-neon-crimson)",
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
                  <span style={{ color: "var(--text-titanium)", fontWeight: 600 }}>
                    {dictionary.conversionSection.optimizedCostLabel}
                  </span>
                  <code style={{ color: "var(--accent-cyber-cyan)", fontWeight: 700 }}>
                    ${savings.optimizedMonthlyUsd}/mo
                  </code>
                </div>
                <div
                  style={{
                    height: "14px",
                    backgroundColor: "var(--bg-akihabara-deck)",
                    borderRadius: "7px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${100 - savings.savingsPercentage}%`,
                      height: "100%",
                      backgroundColor: "var(--accent-cyber-cyan)",
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
                  paddingTop: "0.4rem",
                  gap: "1rem",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                    {dictionary.conversionSection.monthlySavingsLabel}
                  </div>
                  <strong
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "var(--accent-matrix-mint)",
                    }}
                  >
                    ${savings.monthlySavingsUsd}/mo (-{savings.savingsPercentage}%)
                  </strong>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                    {dictionary.conversionSection.prunedTokensLabel}
                  </div>
                  <code
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--accent-voltage-gold)",
                    }}
                  >
                    {(savings.prunedTokensPerMonth / 1_000_000).toFixed(2)}M tokens
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Referral Vault & Provider / Sponsor Table */}
          <div
            style={{
              backgroundColor: "var(--bg-tokyo-void)",
              borderRadius: "8px",
              padding: "clamp(1.25rem, 2.5vw, 2rem)",
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
                          ? "var(--accent-voltage-gold)"
                          : "var(--bg-akihabara-deck)",
                      color:
                        activeAudience === aud
                          ? "var(--bg-tokyo-void)"
                          : "var(--text-titanium)",
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
                  <th style={{ width: "24%" }}>
                    {locale === "vi" ? "Kênh Đối Tác / Gói" : "Partner Pass / Channel"}
                  </th>
                  <th style={{ width: "33%" }}>
                    {locale === "vi" ? "Lợi Ích Cho Vibecoder & Nhà Cung Cấp" : "Value for Vibecoders & Providers"}
                  </th>
                  <th style={{ width: "25%" }}>
                    {locale === "vi" ? "Minh Bạch Hệ Sinh Thái" : "Ecosystem Disclosure"}
                  </th>
                  <th style={{ width: "18%" }}>
                    {locale === "vi" ? "Kích Hoạt" : "Access"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {allConversionItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong style={{ color: "var(--text-titanium)", display: "block", fontSize: "17px" }}>
                        {item.headline}
                      </strong>
                      <code style={{ fontSize: "14px", color: "var(--accent-voltage-gold)" }}>
                        {item.badge}
                      </code>
                    </td>
                    <td style={{ color: "var(--text-titanium)", fontSize: "17px" }}>
                      {item.description}
                    </td>
                    <td style={{ color: "var(--text-cyber-slate)", fontSize: "17px" }}>
                      {item.disclosure}
                    </td>
                    <td>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target"
                        style={{
                          padding: "0.45rem 0.85rem",
                          backgroundColor: item.isHighlighted
                            ? "var(--accent-voltage-gold)"
                            : "var(--bg-kabuki-panel)",
                          color: item.isHighlighted
                            ? "var(--bg-tokyo-void)"
                            : "var(--accent-cyber-cyan)",
                          borderRadius: "6px",
                          fontWeight: 700,
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        {item.label}
                      </a>
                    </td>
                  </tr>
                ))}
                {activeAudience === "sponsors" &&
                  conversionBundle.sponsorTiers.map((tier) => (
                    <tr key={tier.id}>
                      <td>
                        <strong style={{ color: "var(--text-titanium)", display: "block", fontSize: "17px" }}>
                          {tier.name}
                        </strong>
                        <code style={{ fontSize: "14px", color: "var(--accent-cyber-cyan)" }}>
                          {tier.priceLabel}
                        </code>
                      </td>
                      <td style={{ color: "var(--text-titanium)", fontSize: "17px" }}>
                        {tier.tagline}
                      </td>
                      <td style={{ color: "var(--text-cyber-slate)", fontSize: "17px" }}>
                        {tier.deliverables.join(" / ")}
                      </td>
                      <td>
                        <a
                          href={tier.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="touch-target"
                          style={{
                            padding: "0.45rem 0.85rem",
                            backgroundColor: "var(--accent-cyber-cyan)",
                            color: "var(--bg-tokyo-void)",
                            borderRadius: "6px",
                            fontWeight: 700,
                            fontSize: "14px",
                            textAlign: "center",
                          }}
                        >
                          {tier.ctaLabel}
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
                      <a href={PARTNER_URLS.freebuffReferral}>Freebuff</a> /{" "}
                      <a href={PARTNER_URLS.zapGlm}>Zap GLM</a>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
  );
}
