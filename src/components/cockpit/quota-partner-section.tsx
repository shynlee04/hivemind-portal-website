import React from "react";
import type {
  ConversionAudience,
  ConversionBundle,
  ConversionCtaItem,
  Locale,
  PortalDictionary,
} from "@/types/portal";

export interface QuotaPartnerSectionProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
  readonly activeAudience: ConversionAudience;
  readonly setActiveAudience: (aud: ConversionAudience) => void;
  readonly allConversionItems: ReadonlyArray<ConversionCtaItem>;
  readonly conversionBundle: ConversionBundle;
}

export function QuotaPartnerSection({
  locale,
  dictionary,
  activeAudience,
  setActiveAudience,
  allConversionItems,
  conversionBundle,
}: QuotaPartnerSectionProps) {
  return (
    <section
      id="conversion"
      className="stage-screen"
      data-reveal=""
      style={{
        scrollMarginTop: "3.5rem",
        backgroundColor: "var(--bg-akihabara-deck)",
      }}
    >
      <div className="cyber-shell">
        <div data-reveal="" style={{ marginBottom: "0.65rem" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 2.5vw, 36px)",
              fontWeight: 500,
              marginBottom: "0.3rem",
            }}
          >
            {dictionary.conversionSection.sectionTitle}
          </h2>
          <p
            style={{
              color: "var(--text-titanium)",
              maxWidth: "54ch",
              margin: 0,
              fontSize: "16px",
            }}
          >
            {dictionary.conversionSection.sectionSubtitle}
          </p>
        </div>

        <div className="split-36-64">
          {/* Left 36%: Two-Sided Ecosystem Brief + Audience Tabs */}
          <div
            data-reveal=""
            style={{
              backgroundColor: "var(--bg-tokyo-void)",
              borderRadius: "8px",
              padding: "0.85rem 1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div
                style={{
                  backgroundColor: "var(--bg-akihabara-deck)",
                  padding: "0.6rem 0.75rem",
                  borderRadius: "6px",
                }}
              >
                <h3 style={{ fontSize: "20px", fontWeight: 500, margin: "0 0 0.35rem 0" }}>
                  {locale === "vi"
                    ? "Dành Cho Vibecoder (Người Dùng Cuối)"
                    : "For Vibecoders (End-User Subscribers)"}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    color: "var(--text-titanium)",
                    maxWidth: "54ch",
                  }}
                >
                  {locale === "vi"
                    ? "Dùng Hivemind Steward miễn phí để vắt kiệt gói promo $20 Devin swe-2 bằng phiên con ses_* dùng chung, nhận AI miễn phí mỗi ngày từ Freebuff và đổi não sang Zap GLM ngay giữa phiên."
                    : "Use Hivemind Steward free to squeeze $20 Devin swe-2 promos via shared ses_* child sessions, claim daily free AI on Freebuff, and swap live to Zap GLM inside OpenCode."}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "var(--bg-akihabara-deck)",
                  padding: "0.6rem 0.75rem",
                  borderRadius: "6px",
                }}
              >
                <h3 style={{ fontSize: "20px", fontWeight: 500, margin: "0 0 0.35rem 0" }}>
                  {locale === "vi"
                    ? "Dành Cho Nhà Cung Cấp Harness & Coding Pass"
                    : "For Harness, Coding-Pass & Model Providers"}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    color: "var(--text-titanium)",
                    maxWidth: "54ch",
                  }}
                >
                  {locale === "vi"
                    ? "Hệ thống GitHub, YouTube, Reddit và Discord của Hivemind là kênh phân phối uy tín nơi các builder khám phá, kiểm thử và đăng ký gói cước AI thực chiến."
                    : "Our GitHub repos, YouTube showcases, Reddit breakdowns, and Discord community form a high-trust channel where active terminal builders discover and subscribe to your models."}
                </p>
              </div>
            </div>

            {/* Audience Filter Tabs */}
            <div
              style={{
                backgroundColor: "var(--bg-akihabara-deck)",
                padding: "0.85rem 1rem",
                borderRadius: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-cyber-slate)",
                  marginBottom: "0.5rem",
                }}
              >
                {locale === "vi" ? "Chọn Nhóm Đối Tác:" : "Select Audience Track:"}
              </div>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {(
                  [
                    ["builders", dictionary.conversionSection.audienceBuildersTab],
                    ["supporters", dictionary.conversionSection.audienceSupportersTab],
                    ["sponsors", dictionary.conversionSection.audienceSponsorsTab],
                  ] as const
                ).map(([aud, label]) => {
                  const isSelected = activeAudience === aud;
                  return (
                    <button
                      key={aud}
                      type="button"
                      onClick={() => setActiveAudience(aud)}
                      aria-pressed={isSelected}
                      className="touch-target"
                      style={{
                        padding: "0 0.85rem",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: isSelected
                          ? "var(--text-titanium)"
                          : "var(--bg-kabuki-panel)",
                        color: isSelected
                          ? "var(--bg-tokyo-void)"
                          : "var(--text-cyber-slate)",
                        fontWeight: isSelected ? 500 : 400,
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 64%: Balanced 4-Row Partner & Sponsor Matrix Table */}
          <div
            data-reveal=""
            style={{
              backgroundColor: "var(--bg-tokyo-void)",
              borderRadius: "8px",
              padding: "0.85rem 1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.65rem",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: 500, margin: 0 }}>
                {dictionary.conversionSection.sponsorMatrixTitle}
              </h3>
              <code style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                GitHub / YouTube / Reddit / Discord
              </code>
            </div>

            <table className="forge-table">
              <thead>
                <tr>
                  <th style={{ width: "26%" }}>
                    {locale === "vi" ? "Kênh Đối Tác / Gói" : "Partner Pass / Channel"}
                  </th>
                  <th style={{ width: "36%" }}>
                    {locale === "vi" ? "Lợi Ích Cho Vibecoder & Nhà Cung Cấp" : "Value for Vibecoders & Providers"}
                  </th>
                  <th style={{ width: "20%" }}>
                    {locale === "vi" ? "Minh Bạch" : "Disclosure"}
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
                      <strong
                        style={{
                          color: "var(--text-titanium)",
                          display: "block",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {item.headline}
                      </strong>
                      <code style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                        {item.badge}
                      </code>
                    </td>
                    <td style={{ color: "var(--text-titanium)", fontSize: "16px", maxWidth: "50ch" }}>
                      {item.description}
                    </td>
                    <td style={{ color: "var(--text-cyber-slate)", fontSize: "14px" }}>
                      {item.disclosure}
                    </td>
                    <td>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target"
                        style={{
                          padding: "0.3rem 0.7rem",
                          backgroundColor: item.isHighlighted
                            ? "var(--text-titanium)"
                            : "var(--bg-kabuki-panel)",
                          color: item.isHighlighted
                            ? "var(--bg-tokyo-void)"
                            : "var(--text-titanium)",
                          borderRadius: "6px",
                          fontWeight: item.isHighlighted ? 500 : 400,
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
                        <strong
                          style={{
                            color: "var(--text-titanium)",
                            display: "block",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          {tier.name}
                        </strong>
                        <code style={{ fontSize: "14px", color: "var(--accent-cyber-cyan)" }}>
                          {tier.priceLabel}
                        </code>
                      </td>
                      <td style={{ color: "var(--text-titanium)", fontSize: "16px", maxWidth: "50ch" }}>
                        {tier.tagline}
                      </td>
                      <td style={{ color: "var(--text-cyber-slate)", fontSize: "14px" }}>
                        {tier.deliverables.join(" / ")}
                      </td>
                      <td>
                        <a
                          href={tier.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="touch-target"
                          style={{
                            padding: "0.3rem 0.7rem",
                            backgroundColor: "var(--bg-kabuki-panel)",
                            color: "var(--text-titanium)",
                            borderRadius: "6px",
                            fontWeight: 500,
                            fontSize: "14px",
                            textAlign: "center",
                          }}
                        >
                          {tier.ctaLabel}
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
