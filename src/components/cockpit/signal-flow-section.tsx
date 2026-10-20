import React from "react";
import type {
  Locale,
  PortalDictionary,
  QuotaSavingsEstimate,
  ReactorNodeId,
} from "@/types/portal";
import { PARTNER_URLS } from "@/modules/partner-conversion";
import { HARNESS_META } from "./cockpit-shared";

export interface SignalFlowSectionProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
  readonly activeHarness: ReactorNodeId;
  readonly gatewayMode: "centralized" | "fragmented";
  readonly setGatewayMode: (mode: "centralized" | "fragmented") => void;
  readonly onSelectReactorNode: (nodeId: ReactorNodeId) => void;
  readonly hoursPerWeek: number;
  readonly setHoursPerWeek: (hrs: number) => void;
  readonly savings: QuotaSavingsEstimate;
}

const BRIDGE_MODES: ReadonlyArray<{
  readonly id: ReactorNodeId;
  readonly slotCode: string;
  readonly sharePercent: number;
  readonly titleEn: string;
  readonly titleVi: string;
  readonly models: string;
  readonly dutyEn: string;
  readonly dutyVi: string;
}> = [
  {
    id: "devin",
    slotCode: "MODE 1",
    sharePercent: 100,
    titleEn: "Mode 1: Native TUI & Shared ses_* (/devin)",
    titleVi: "Chế Độ 1: TUI Nguyên Bản & Phiên ses_* (/devin)",
    models: "swe-2-max (ses_*)",
    dutyEn: "Control on OpenCode main menu or reuse shared ses_* child sessions in Devin UI to squeeze $20 promos",
    dutyVi: "Điều khiển ngay trên menu chính OpenCode hoặc tái sử dụng phiên con ses_* trên Devin để vắt gói promo $20",
  },
  {
    id: "antigravity",
    slotCode: "MODE 2",
    sharePercent: 100,
    titleEn: "Mode 2: Foreign Model as Main Agent",
    titleVi: "Chế Độ 2: Model Ngoại Làm Agent Chính",
    models: "argon-4-high + 127+ APIs",
    dutyEn: "Run as OpenCode main agent, delegate across foreign harnesses & 127+ OpenCode providers, resume anywhere",
    dutyVi: "Chạy làm agent chính OpenCode, ủy quyền cho cả Harness khác lẫn 127+ provider OpenCode, đồng bộ hai chiều",
  },
  {
    id: "freebuff",
    slotCode: "MODE 3",
    sharePercent: 100,
    titleEn: "Mode 3: Freebuff Free AI & Live Swap",
    titleVi: "Chế Độ 3: Freebuff Miễn Phí & Đổi Não",
    models: "deepseek-4.1-flash -> glm-5.3-flash",
    dutyEn: "Use $0 daily Freebuff credits in OpenCode, swap models mid-session, and hold leases via keepSlotForResume",
    dutyVi: "Tận dụng credit miễn phí mỗi ngày từ Freebuff, đổi model ngay giữa phiên và giữ lease qua keepSlotForResume",
  },
];

export function SignalFlowSection({
  locale,
  dictionary,
  activeHarness,
  gatewayMode,
  setGatewayMode,
  onSelectReactorNode,
  hoursPerWeek,
  setHoursPerWeek,
  savings,
}: SignalFlowSectionProps) {
  return (
    <section
      id="gateway"
      className="stage-screen"
      data-reveal=""
      style={{
        scrollMarginTop: "3.5rem",
        backgroundColor: "var(--bg-akihabara-deck)",
      }}
    >
      <div className="cyber-shell">
        <div
          data-reveal=""
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "0.85rem",
            marginBottom: "0.85rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(28px, 2.5vw, 36px)",
                fontWeight: 500,
                marginBottom: "0.25rem",
              }}
            >
              {locale === "vi"
                ? "Phá Khóa Độc Quyền Harness"
                : "Break Harness Lock-In"}
            </h2>
            <p
              style={{
                color: "var(--text-titanium)",
                maxWidth: "54ch",
                margin: 0,
                fontSize: "16px",
              }}
            >
              {locale === "vi"
                ? "OpenCode đã hỗ trợ hơn 127 API provider và đổi tài khoản. Hivemind Steward giải quyết điều API key không làm được: mở khóa các model bị khóa cứng theo Harness ngay trong OpenCode."
                : "OpenCode already supports 127+ API providers and multi-account switching. Hivemind Steward solves what API keys cannot: bridging harness-exclusive models and coding passes inside OpenCode."}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setGatewayMode("fragmented")}
              aria-pressed={gatewayMode === "fragmented"}
              className="touch-target"
              style={{
                padding: "0 0.85rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor:
                  gatewayMode === "fragmented"
                    ? "var(--text-titanium)"
                    : "var(--bg-kabuki-panel)",
                color:
                  gatewayMode === "fragmented"
                    ? "var(--bg-tokyo-void)"
                    : "var(--text-cyber-slate)",
                fontWeight: gatewayMode === "fragmented" ? 500 : 400,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {locale === "vi"
                ? "Khi Thiếu Steward: Bị Khóa Theo Từng App & Chép Tay"
                : "Without Steward: Locked Harnesses & Manual Copy-Paste"}
            </button>
            <button
              type="button"
              onClick={() => setGatewayMode("centralized")}
              aria-pressed={gatewayMode === "centralized"}
              className="touch-target"
              style={{
                padding: "0 0.85rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor:
                  gatewayMode === "centralized"
                    ? "var(--text-titanium)"
                    : "var(--bg-kabuki-panel)",
                color:
                  gatewayMode === "centralized"
                    ? "var(--bg-tokyo-void)"
                    : "var(--text-cyber-slate)",
                fontWeight: gatewayMode === "centralized" ? 500 : 400,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {locale === "vi"
                ? "Có Hivemind Steward: Đồng Bộ Hai Chiều Trong OpenCode"
                : "With Hivemind Steward: Bi-Directional OpenCode Sync"}
            </button>
          </div>
        </div>

        <div className="split-58-42">
          {/* Left 58%: 3 Bi-Directional Bridge Modes + Referral Pass Callout */}
          <div
            data-reveal=""
            style={{
              backgroundColor: "var(--bg-tokyo-void)",
              borderRadius: "8px",
              padding: "1rem 1.15rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.65rem",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: 500, margin: 0 }}>
                {gatewayMode === "centralized"
                  ? locale === "vi"
                    ? "Cầu Nối Hai Chiều Giữa Ngoại Harness & 127+ Provider OpenCode"
                    : "Bi-Directional Bridge: Foreign Harnesses + 127+ OpenCode APIs"
                  : locale === "vi"
                    ? "Nỗi Đau Khi Các Model Bị Khóa Cứng Theo Từng Harness"
                    : "The Pain of Harness-Locked Models & Isolated Sessions"}
              </h3>
              <code
                style={{
                  fontSize: "14px",
                  color:
                    gatewayMode === "centralized"
                      ? "var(--accent-cyber-cyan)"
                      : "var(--text-cyber-slate)",
                }}
              >
                {gatewayMode === "centralized"
                  ? "Zero UX Compromise / Shared ses_*"
                  : "Manual Handoff / Broken Hierarchy"}
              </code>
            </div>

            <div
              className="gateway-router-grid"
              role="region"
              aria-label="Hivemind Steward Bi-Directional Bridge Modes"
            >
              {/* Left Hub Card: Hivemind Steward */}
              <div
                style={{
                  backgroundColor: "var(--bg-akihabara-deck)",
                  borderRadius: "6px",
                  padding: "0.9rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "0.65rem",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 500, margin: "0 0 0.35rem 0" }}>
                    {gatewayMode === "centralized"
                      ? "Hivemind Steward"
                      : locale === "vi"
                        ? "Harness Rời Rạc"
                        : "Locked Harnesses"}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      color: "var(--text-titanium)",
                      maxWidth: "54ch",
                    }}
                  >
                    {gatewayMode === "centralized"
                      ? locale === "vi"
                        ? "Mở khóa Devin, Antigravity, Freebuff (và sắp tới là Cursor, Claude Code, Codex) ngay trong TUI OpenCode."
                        : "Bridge Devin, Antigravity, Freebuff (and future Cursor, Claude Code, Codex) directly inside OpenCode TUI."
                      : locale === "vi"
                        ? "Phải học nhiều nền tảng, tự chép tay ngữ cảnh và rối loạn khái niệm phiên cha/con giữa các công cụ."
                        : "Forced to learn multiple UIs, copy-paste context by hand, and lose parent/child session hierarchy across tools."}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "var(--bg-tokyo-void)",
                    padding: "0.55rem 0.7rem",
                    borderRadius: "4px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <code style={{ fontSize: "14px", color: "var(--accent-cyber-cyan)" }}>
                      $ npx hmoc-steward-acp
                    </code>
                    <a
                      href="https://www.npmjs.com/package/hmoc-steward-acp"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "14px", color: "var(--text-titanium)", textDecoration: "underline" }}
                    >
                      npm package
                    </a>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "var(--text-cyber-slate)",
                      marginTop: "0.2rem",
                    }}
                  >
                    {HARNESS_META[activeHarness].label} ({HARNESS_META[activeHarness].latencyLabel})
                  </div>
                </div>
              </div>

              {/* Right Stack of 3 Interactive Bridge Mode <button> Cards */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.55rem",
                }}
              >
                {BRIDGE_MODES.map((slot) => {
                  const isSelected = activeHarness === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      data-reveal=""
                      onClick={() => onSelectReactorNode(slot.id)}
                      aria-pressed={isSelected}
                      className="touch-target"
                      style={{
                        width: "100%",
                        maxHeight: "82px",
                        overflow: "hidden",
                        padding: "0.42rem 0.75rem",
                        borderRadius: "0px",
                        border: "none",
                        borderLeft: isSelected
                          ? "2px solid var(--accent-cyber-cyan)"
                          : "2px solid var(--bg-elevated-slate)",
                        backgroundColor: "transparent",
                        color: "var(--text-titanium)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        gap: "0.28rem",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "0.5rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: isSelected ? 500 : 400,
                            color: "var(--text-titanium)",
                          }}
                        >
                          {locale === "vi" ? slot.titleVi : slot.titleEn}
                        </span>
                        <code
                          style={{
                            fontSize: "14px",
                            color: isSelected
                              ? "var(--accent-cyber-cyan)"
                              : "var(--text-cyber-slate)",
                          }}
                        >
                          {slot.models}
                        </code>
                      </div>

                      <div
                        style={{
                          fontSize: "14px",
                          color: "var(--text-cyber-slate)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {locale === "vi" ? slot.dutyVi : slot.dutyEn}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Referral Pass Callout Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.65rem",
                paddingTop: "0.1rem",
              }}
            >
              <span style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                {locale === "vi"
                  ? "Nhận AI miễn phí mỗi ngày & gói GLM tốc độ cao ngay trong OpenCode:"
                  : "Bridge daily free AI & high-speed GLM swaps inside OpenCode:"}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <a
                  href={PARTNER_URLS.freebuffReferral}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target"
                  style={{
                    padding: "0 0.9rem",
                    backgroundColor: "var(--accent-cyber-cyan)",
                    color: "var(--bg-tokyo-void)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Freebuff Daily Free AI
                </a>
                <a
                  href={PARTNER_URLS.zapGlm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target"
                  style={{
                    padding: "0 0.9rem",
                    backgroundColor: "var(--bg-kabuki-panel)",
                    color: "var(--text-titanium)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  Zap GLM Coding Plan
                </a>
              </div>
            </div>
          </div>

          {/* Right 42%: Promo & Daily-Credit Squeezing Estimator + Hardware Plate */}
          <div
            data-reveal=""
            style={{
              backgroundColor: "var(--bg-tokyo-void)",
              borderRadius: "8px",
              padding: "1rem 1.15rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "0.75rem",
            }}
          >
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 500, margin: "0 0 0.2rem 0" }}>
                {dictionary.conversionSection.calculatorTitle}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-titanium)",
                  fontSize: "16px",
                  maxWidth: "54ch",
                }}
              >
                {dictionary.conversionSection.calculatorSubtitle}
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.3rem",
                }}
              >
                <label htmlFor="hours-slider" style={{ fontWeight: 500, fontSize: "14px" }}>
                  {dictionary.conversionSection.hoursPerWeekLabel}
                </label>
                <code
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--accent-cyber-cyan)",
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
              <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.35rem", flexWrap: "wrap" }}>
                {[15, 35, 60, 80].map((preset) => {
                  const isActive = hoursPerWeek === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setHoursPerWeek(preset)}
                      className="touch-target"
                      style={{
                        padding: "0 0.75rem",
                        borderRadius: "4px",
                        border: "none",
                        backgroundColor: isActive
                          ? "var(--text-titanium)"
                          : "var(--bg-kabuki-panel)",
                        color: isActive
                          ? "var(--bg-tokyo-void)"
                          : "var(--text-cyber-slate)",
                        fontWeight: isActive ? 500 : 400,
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      {preset}h/wk
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    marginBottom: "0.18rem",
                  }}
                >
                  <span style={{ color: "var(--text-cyber-slate)" }}>
                    {dictionary.conversionSection.baselineCostLabel}
                  </span>
                  <code style={{ color: "var(--text-titanium)", fontWeight: 500, fontSize: "14px" }}>
                    ${savings.baselineMonthlyUsd}/mo
                  </code>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "var(--bg-kabuki-panel)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "var(--text-cyber-slate)",
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
                    marginBottom: "0.18rem",
                  }}
                >
                  <span style={{ color: "var(--text-titanium)", fontWeight: 500 }}>
                    {dictionary.conversionSection.optimizedCostLabel}
                  </span>
                  <code style={{ color: "var(--accent-cyber-cyan)", fontWeight: 500, fontSize: "14px" }}>
                    ${savings.optimizedMonthlyUsd}/mo
                  </code>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "var(--bg-kabuki-panel)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${100 - savings.savingsPercentage}%`,
                      height: "100%",
                      backgroundColor: "var(--accent-cyber-cyan)",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "0.1rem",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                    {dictionary.conversionSection.monthlySavingsLabel}
                  </div>
                  <strong
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "var(--accent-cyber-cyan)",
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
                      fontWeight: 500,
                      color: "var(--text-titanium)",
                    }}
                  >
                    {(savings.prunedTokensPerMonth / 1_000_000).toFixed(2)}M tokens
                  </code>
                </div>
              </div>
            </div>

            <img
              src="/assets/tri-harness-signal-plate.jpg"
              alt="Neo-Tokyo Multi-Harness Signal Router"
              style={{
                width: "100%",
                height: "130px",
                objectFit: "cover",
                borderRadius: "6px",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
