import React from "react";
import type { Locale, ReactorNodeId } from "@/types/portal";
import { PARTNER_URLS } from "@/modules/partner-conversion";
import { HARNESS_META } from "./cockpit-shared";

export interface SignalFlowSectionProps {
  readonly locale: Locale;
  readonly activeHarness: ReactorNodeId;
  readonly gatewayMode: "centralized" | "fragmented";
  readonly setGatewayMode: (mode: "centralized" | "fragmented") => void;
  readonly onSelectReactorNode: (nodeId: ReactorNodeId) => void;
}

export function SignalFlowSection({
  locale,
  activeHarness,
  gatewayMode,
  setGatewayMode,
  onSelectReactorNode,
}: SignalFlowSectionProps) {
  const handleSelectReactorNode = onSelectReactorNode;
  return (
      <section
        data-reveal=""
        style={{
          paddingTop: "clamp(4rem, 7vw, 6.5rem)",
          paddingBottom: "clamp(4rem, 7vw, 6.5rem)",
          backgroundColor: "var(--bg-akihabara-deck)",
        }}
      >
        <div className="cyber-shell">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "1.25rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(32px, 3.1vw, 44px)",
                  marginBottom: "0.5rem",
                }}
              >
                {locale === "vi"
                  ? "Xóa Thuế Đa Cửa Sổ"
                  : "Kill the Agent Tax"}
              </h2>
              <p
                style={{
                  color: "var(--text-titanium)",
                  maxWidth: "62ch",
                  margin: 0,
                  fontSize: "17px",
                }}
              >
                {locale === "vi"
                  ? "Thay vì trả lẻ từng gói $20-$200 và bị khóa hạn ngạch giữa chừng, Hivemind-Steward biến OpenCode thành trạm điều phối trung tâm giúp bạn tận dụng gói cước Freebuff và GLM giá rẻ."
                  : "Vibecoders waste hundreds each month switching between isolated coding apps and hitting quota walls. Hivemind-Steward turns OpenCode into a single gateway that routes 62% of daily work to affordable Freebuff and GLM passes."}
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setGatewayMode("fragmented")}
                aria-pressed={gatewayMode === "fragmented"}
                className="touch-target"
                style={{
                  padding: "0 1rem",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor:
                    gatewayMode === "fragmented"
                      ? "var(--accent-neon-crimson)"
                      : "var(--bg-tokyo-void)",
                  color: "var(--text-titanium)",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {locale === "vi" ? "Trước: 5 Cửa Sổ Rời Rạc ($485/tháng)" : "Without Steward: 5 Isolated Apps ($485/mo)"}
              </button>
              <button
                type="button"
                onClick={() => setGatewayMode("centralized")}
                aria-pressed={gatewayMode === "centralized"}
                className="touch-target"
                style={{
                  padding: "0 1rem",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor:
                    gatewayMode === "centralized"
                      ? "var(--accent-cyber-cyan)"
                      : "var(--bg-tokyo-void)",
                  color:
                    gatewayMode === "centralized"
                      ? "var(--bg-tokyo-void)"
                      : "var(--text-titanium)",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {locale === "vi" ? "Có Steward: 1 Cổng OpenCode (-65% Chi Phí)" : "With Hivemind-Steward: 1 Gateway (-65% Cost)"}
              </button>
            </div>
          </div>

          <div className="split-62-38" style={{ alignItems: "stretch" }}>
            {/* Interactive Animated SVG Neo-Tokyo Gateway Infographic */}
            <div
              style={{
                backgroundColor: "var(--bg-tokyo-void)",
                borderRadius: "8px",
                padding: "clamp(1.1rem, 2vw, 1.75rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <h3 style={{ fontSize: "22px", margin: 0 }}>
                  {gatewayMode === "centralized"
                    ? locale === "vi"
                      ? "Luồng Điều Phối Hivemind-Steward Trực Tiếp"
                      : "Hivemind-Steward Smart Subscription Router"
                    : locale === "vi"
                      ? "Cảnh Hỗn Loạn Khi Thiếu Cổng Điều Phối"
                      : "Fragmented Multi-Window Quota Burn"}
                </h3>
                <code
                  style={{
                    fontSize: "14px",
                    color:
                      gatewayMode === "centralized"
                        ? "var(--accent-matrix-mint)"
                        : "var(--accent-neon-crimson)",
                  }}
                >
                  {gatewayMode === "centralized"
                    ? "62% Freebuff/GLM + 23% Agy + 15% Devin"
                    : "100% Unrouted Flagship Overages"}
                </code>
              </div>

              <svg
                viewBox="0 0 760 256"
                role="img"
                aria-label="Hivemind-Steward Subscription Routing Diagram"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  backgroundColor: "#040509",
                  borderRadius: "6px",
                }}
              >
                <defs>
                  <linearGradient id="streamGold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FFB800" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="streamCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="streamCrimson" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FF2A6D" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Central OpenCode Steward Gateway Hub */}
                <g transform="translate(24, 72)">
                  <rect
                    width="235"
                    height="116"
                    rx="8"
                    fill="#0B0F1A"
                    stroke={gatewayMode === "centralized" ? "#00F0FF" : "#FF2A6D"}
                    strokeWidth="2"
                  />
                  <text x="18" y="34" fill="#00F0FF" fontSize="14" fontFamily="Chakra Petch, sans-serif" fontWeight="700">
                    {gatewayMode === "centralized" ? "Hivemind-Steward" : "Isolated Terminals"}
                  </text>
                  <text x="18" y="64" fill="#F0F5FA" fontSize="17" fontFamily="Chakra Petch, sans-serif" fontWeight="700">
                    {gatewayMode === "centralized" ? "OpenCode V2 Gateway" : "Manual Copy-Paste"}
                  </text>
                  <text x="18" y="92" fill="#8E9FB5" fontSize="14" fontFamily="Chakra Petch, sans-serif">
                    {gatewayMode === "centralized" ? "npx hmoc-steward-acp" : "Quota Lockout Risk"}
                  </text>
                </g>

                {/* Animated Optical Signal Conduits */}
                <path
                  d="M 259 110 C 370 110, 400 52, 515 52"
                  fill="none"
                  stroke="url(#streamGold)"
                  strokeWidth={activeHarness === "freebuff" ? "4" : "2.5"}
                  className="wire-stream-path"
                />
                <path
                  d="M 259 130 C 370 130, 400 130, 515 130"
                  fill="none"
                  stroke="url(#streamCrimson)"
                  strokeWidth={activeHarness === "antigravity" ? "4" : "2.5"}
                  className="wire-stream-path"
                />
                <path
                  d="M 259 150 C 370 150, 400 208, 515 208"
                  fill="none"
                  stroke="url(#streamCyan)"
                  strokeWidth={activeHarness === "devin" ? "4" : "2.5"}
                  className="wire-stream-path"
                />

                {/* Lane 1: Freebuff + GLM Coding Pass (62%) */}
                <g
                  transform="translate(515, 16)"
                  onClick={() => handleSelectReactorNode("freebuff")}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    width="285"
                    height="68"
                    rx="6"
                    fill={activeHarness === "freebuff" ? "#161E31" : "#0B0F1A"}
                    stroke="#FFB800"
                    strokeWidth={activeHarness === "freebuff" ? "2.5" : "1.2"}
                  />
                  <text x="16" y="28" fill="#FFB800" fontSize="14" fontFamily="Chakra Petch, sans-serif" fontWeight="700">
                    62% Load: Freebuff + Zap GLM Pass
                  </text>
                  <text x="16" y="52" fill="#F0F5FA" fontSize="14" fontFamily="Chakra Petch, sans-serif">
                    deepseek-4.1-flash / glm-5.3-flash
                  </text>
                </g>

                {/* Lane 2: Antigravity (23%) */}
                <g
                  transform="translate(515, 96)"
                  onClick={() => handleSelectReactorNode("antigravity")}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    width="285"
                    height="68"
                    rx="6"
                    fill={activeHarness === "antigravity" ? "#161E31" : "#0B0F1A"}
                    stroke="#FF2A6D"
                    strokeWidth={activeHarness === "antigravity" ? "2.5" : "1.2"}
                  />
                  <text x="16" y="28" fill="#FF2A6D" fontSize="14" fontFamily="Chakra Petch, sans-serif" fontWeight="700">
                    23% Load: Antigravity (/antigravity)
                  </text>
                  <text x="16" y="52" fill="#F0F5FA" fontSize="14" fontFamily="Chakra Petch, sans-serif">
                    argon-4-high Architecture &amp; Review
                  </text>
                </g>

                {/* Lane 3: Devin Steward (15%) */}
                <g
                  transform="translate(515, 176)"
                  onClick={() => handleSelectReactorNode("devin")}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    width="285"
                    height="68"
                    rx="6"
                    fill={activeHarness === "devin" ? "#161E31" : "#0B0F1A"}
                    stroke="#00F0FF"
                    strokeWidth={activeHarness === "devin" ? "2.5" : "1.2"}
                  />
                  <text x="16" y="28" fill="#00F0FF" fontSize="14" fontFamily="Chakra Petch, sans-serif" fontWeight="700">
                    15% Load: Devin Steward (/devin)
                  </text>
                  <text x="16" y="52" fill="#F0F5FA" fontSize="14" fontFamily="Chakra Petch, sans-serif">
                    swe-2-max Deep Module TDD
                  </text>
                </g>
              </svg>

              {/* Direct Referral Pass Callout Bar */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.75rem",
                  paddingTop: "0.25rem",
                }}
              >
                <span style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                  {locale === "vi"
                    ? "Mở khóa gói cước giá rẻ qua liên kết đối tác chính thức:"
                    : "Activate low-cost coding passes via verified project referral links:"}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  <a
                    href={PARTNER_URLS.freebuffReferral}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target"
                    style={{
                      padding: "0 0.9rem",
                      backgroundColor: "var(--accent-voltage-gold)",
                      color: "var(--bg-tokyo-void)",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    Freebuff Referral Pass
                  </a>
                  <a
                    href={PARTNER_URLS.zapGlm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target"
                    style={{
                      padding: "0 0.9rem",
                      backgroundColor: "var(--bg-kabuki-panel)",
                      color: "var(--accent-cyber-cyan)",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    Zap GLM Coding Plan
                  </a>
                </div>
              </div>
            </div>

            {/* Right 38%: Neo-Tokyo Signal Router Hardware Plate */}
            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "var(--bg-tokyo-void)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <img
                src="/assets/tri-harness-signal-plate.jpg"
                className="plate-drift"
                alt="Neo-Tokyo Multi-Harness Signal Router"
                style={{
                  width: "100%",
                  height: "280px",
                  flex: 1,
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div style={{ padding: "1.25rem" }}>
                <h3 style={{ fontSize: "22px", marginBottom: "0.45rem" }}>
                  {HARNESS_META[activeHarness].label}
                </h3>
                <p style={{ margin: "0 0 0.65rem 0", fontSize: "17px", color: "var(--text-titanium)" }}>
                  {locale === "vi"
                    ? HARNESS_META[activeHarness].roleVi
                    : HARNESS_META[activeHarness].roleEn}
                </p>
                <code style={{ fontSize: "14px", color: "var(--accent-cyber-cyan)" }}>
                  {HARNESS_META[activeHarness].modelCode}
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
