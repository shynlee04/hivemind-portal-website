import React from "react";
import type {
  HorizonSummaryView,
  HorizonTier,
  Locale,
  PortalDictionary,
  ReactorNodeId,
} from "@/types/portal";
import { HARNESS_META } from "./cockpit-shared";

export interface SignalFlowSectionProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
  readonly horizons: ReadonlyArray<HorizonSummaryView>;
  readonly activeHorizon: HorizonTier | "all";
  readonly setActiveHorizon: (h: HorizonTier | "all") => void;
  readonly activeHarness: ReactorNodeId;
  readonly setActiveHarness: (n: ReactorNodeId) => void;
}

export function SignalFlowSection({
  locale,
  dictionary,
  horizons,
  activeHorizon,
  setActiveHorizon,
  activeHarness,
  setActiveHarness,
}: SignalFlowSectionProps): React.JSX.Element {
  const activeHarnessInfo = HARNESS_META[activeHarness];
  return (
    <section
        id="horizons"
        data-reveal=""
        style={{
          paddingTop: "clamp(5rem, 9vw, 8.5rem)",
          paddingBottom: "clamp(5rem, 9vw, 8.5rem)",
          backgroundColor: "var(--bg-smoked-basalt)",
        }}
      >
        <div className="cyber-shell">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "1.5rem",
              marginBottom: "2.75rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(32px, 3.1vw, 44px)",
                  marginBottom: "0.65rem",
                }}
              >
                {dictionary.horizons.sectionTitle}
              </h2>
              <p
                style={{
                  color: "var(--text-parchment)",
                  maxWidth: "60ch",
                  margin: 0,
                  fontSize: "17px",
                }}
              >
                {dictionary.horizons.sectionSubtitle}
              </p>
            </div>

            {/* Horizon Switcher Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setActiveHorizon("all")}
                aria-pressed={activeHorizon === "all"}
                className="touch-target"
                style={{
                  padding: "0 1rem",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor:
                    activeHorizon === "all"
                      ? "var(--accent-wok-gold)"
                      : "var(--bg-scroll-lacquer)",
                  color:
                    activeHorizon === "all"
                      ? "var(--bg-wok-iron)"
                      : "var(--text-parchment)",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {dictionary.horizons.filterAll}
              </button>
              {horizons.map((h) => {
                const isSelected = activeHorizon === h.horizon;
                return (
                  <button
                    key={h.horizon}
                    type="button"
                    onClick={() => {
                      setActiveHorizon(h.horizon);
                      setActiveHarness(h.primaryNode);
                    }}
                    aria-pressed={isSelected}
                    className="touch-target"
                    style={{
                      padding: "0 1rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: isSelected
                        ? "var(--accent-jade-wire)"
                        : "var(--bg-scroll-lacquer)",
                      color: isSelected
                        ? "var(--bg-wok-iron)"
                        : "var(--text-parchment)",
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {h.badge}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Signal-Flow Infographic + Hardware Plate Split */}
          <div className="split-62-38" style={{ alignItems: "stretch" }}>
            {/* Left 62%: Live Animated Tri-Harness Signal-Flow Schematic */}
            <div
              
              style={{
                backgroundColor: "var(--bg-wok-iron)",
                borderRadius: "8px",
                padding: "clamp(1.25rem, 2.5vw, 2rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.25rem",
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
                <strong style={{ fontSize: "17px", color: "var(--text-parchment)" }}>
                  {locale === "vi"
                    ? "Sơ Đồ Định Tuyến Tín Hiệu ModelSlotChain 3-Slot"
                    : "3-Slot ModelSlotChain Signal-Routing Schematic"}
                </strong>
                <code style={{ fontSize: "14px", color: "var(--accent-jade-wire)" }}>
                  targeted-request-broker.ts · acp-session-core.ts
                </code>
              </div>

              {/* Animated SVG Signal Router Infographic */}
              <svg
                viewBox="0 0 760 320"
                role="img"
                data-ui="tri-harness-signal-infographic" aria-label="Interactive Tri-Harness Signal Router Diagram"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  backgroundColor: "#06090F",
                  borderRadius: "6px",
                }}
              >
                <g fill="#1E293B">
                  {[80, 180, 280, 380, 480, 580, 680].map((cx) =>
                    [60, 160, 260].map((cy) => (
                      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" />
                    ))
                  )}
                </g>

                <path
                  d="M 165 160 C 230 160, 240 68, 310 68"
                  fill="none"
                  stroke="#F5A623"
                  strokeWidth={activeHarness === "freebuff" ? "3.5" : "2"}
                  className="wire-stream-path"
                />
                <path
                  d="M 165 160 C 235 160, 245 160, 310 160"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth={activeHarness === "devin" ? "3.5" : "2"}
                  className="wire-stream-path"
                />
                <path
                  d="M 165 160 C 230 160, 240 252, 310 252"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth={activeHarness === "antigravity" ? "3.5" : "2"}
                  className="wire-stream-path"
                />

                <path
                  d="M 520 68 C 565 68, 575 160, 610 160"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  className="wire-stream-path"
                />
                <path
                  d="M 520 160 L 610 160"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  className="wire-stream-path"
                />
                <path
                  d="M 520 252 C 565 252, 575 160, 610 160"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  className="wire-stream-path"
                />

                <g transform="translate(24, 112)">
                  <rect
                    width="140"
                    height="96"
                    rx="8"
                    fill="#111927"
                    stroke="#22D3EE"
                    strokeWidth="2"
                  />
                  <text x="16" y="34" fill="#EEF2F6" fontSize="14" fontWeight="700">
                    OpenCode V2
                  </text>
                  <text x="16" y="56" fill="#94A3B8" fontSize="14">
                    TUI Host
                  </text>
                  <text x="16" y="78" fill="#22D3EE" fontSize="14" fontWeight="600">
                    /devin · /agy
                  </text>
                </g>

                <g
                  transform="translate(310, 26)"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveHarness("freebuff")}
                >
                  <rect
                    width="210"
                    height="82"
                    rx="8"
                    fill={activeHarness === "freebuff" ? "#1E261E" : "#111826"}
                    stroke="#F5A623"
                    strokeWidth={activeHarness === "freebuff" ? "3" : "1.5"}
                  />
                  <text x="14" y="30" fill="#F5A623" fontSize="14" fontWeight="700">
                    SLOT 1 · FREEBUFF (62%)
                  </text>
                  <text x="14" y="52" fill="#EEF2F6" fontSize="14">
                    deepseek-4.1 / glm-5.3
                  </text>
                  <text x="14" y="72" fill="#94A3B8" fontSize="14">
                    fbm1.... lease recovery
                  </text>
                </g>

                <g
                  transform="translate(310, 119)"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveHarness("devin")}
                >
                  <rect
                    width="210"
                    height="82"
                    rx="8"
                    fill={activeHarness === "devin" ? "#122432" : "#111826"}
                    stroke="#22D3EE"
                    strokeWidth={activeHarness === "devin" ? "3" : "1.5"}
                  />
                  <text x="14" y="30" fill="#22D3EE" fontSize="14" fontWeight="700">
                    SLOT 2 · DEVIN ACP (23%)
                  </text>
                  <text x="14" y="52" fill="#EEF2F6" fontSize="14">
                    swe-2-max · Shipped v0.1
                  </text>
                  <text x="14" y="72" fill="#94A3B8" fontSize="14">
                    delegate-devin (ses_*)
                  </text>
                </g>

                <g
                  transform="translate(310, 212)"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveHarness("antigravity")}
                >
                  <rect
                    width="210"
                    height="82"
                    rx="8"
                    fill={activeHarness === "antigravity" ? "#28161C" : "#111826"}
                    stroke="#EF4444"
                    strokeWidth={activeHarness === "antigravity" ? "3" : "1.5"}
                  />
                  <text x="14" y="30" fill="#EF4444" fontSize="14" fontWeight="700">
                    SLOT 3 · ANTIGRAVITY (15%)
                  </text>
                  <text x="14" y="52" fill="#EEF2F6" fontSize="14">
                    argon-4-high · Next v0.2
                  </text>
                  <text x="14" y="72" fill="#94A3B8" fontSize="14">
                    3D Shaders &amp; 2-Axis Gate
                  </text>
                </g>

                <g
                  transform="translate(610, 100)"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveHarness("substrate")}
                >
                  <rect
                    width="132"
                    height="120"
                    rx="8"
                    fill={activeHarness === "substrate" ? "#112822" : "#111826"}
                    stroke="#10B981"
                    strokeWidth={activeHarness === "substrate" ? "3" : "2"}
                  />
                  <text x="14" y="32" fill="#10B981" fontSize="14" fontWeight="700">
                    SUBSTRATE
                  </text>
                  <text x="14" y="56" fill="#EEF2F6" fontSize="14">
                    The Spine
                  </text>
                  <text x="14" y="78" fill="#EEF2F6" fontSize="14">
                    Honeycomb
                  </text>
                  <text x="14" y="102" fill="#22D3EE" fontSize="14" fontWeight="700">
                    Valve &lt; 2 ms
                  </text>
                </g>
              </svg>

              {/* Visual Horizon Maturity Bar Ledger (unboxed rows inside the shared container) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  backgroundColor: "var(--bg-smoked-basalt)",
                  padding: "1.25rem",
                  borderRadius: "6px",
                }}
              >
                {horizons.map((item) => {
                  const isCurrent =
                    activeHorizon === "all" || activeHorizon === item.horizon;
                  const barColor =
                    item.horizon === "shipped"
                      ? "var(--accent-wok-gold)"
                      : item.horizon === "next-release"
                        ? "var(--accent-jade-wire)"
                        : "var(--accent-bamboo-green)";
                  return (
                    <div
                      key={item.horizon}
                      onClick={() => {
                        setActiveHorizon(item.horizon);
                        setActiveHarness(item.primaryNode);
                      }}
                      style={{
                        opacity: isCurrent ? 1 : 0.55,
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.35rem",
                        }}
                      >
                        <strong style={{ fontSize: "17px", color: barColor }}>
                          {item.canonicalScope}
                        </strong>
                        <code style={{ fontSize: "14px", color: "var(--text-ash-slate)" }}>
                          {item.sourceGrounding}
                        </code>
                      </div>
                      <div
                        style={{
                          height: "6px",
                          backgroundColor: "#080B10",
                          borderRadius: "3px",
                          overflow: "hidden",
                          marginBottom: "0.45rem",
                        }}
                      >
                        <div
                          className="valve-bar-anim"
                          style={{
                            width:
                              item.horizon === "shipped"
                                ? "100%"
                                : item.horizon === "next-release"
                                  ? "84%"
                                  : "68%",
                            height: "100%",
                            backgroundColor: barColor,
                          }}
                        />
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "17px",
                          color: "var(--text-parchment)",
                          lineHeight: 1.55,
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 38%: Bespoke Cutaway Visual Plate + Active Slot Telemetry Breakdown */}
            <div
              style={{
                backgroundColor: "var(--bg-wok-iron)",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ aspectRatio: "16 / 10", overflow: "hidden", backgroundColor: "#05080D" }}>
                <img
                  src="/assets/tri-harness-signal-plate.jpg" className="plate-drift"
                  alt="Tri-Harness Fiber-Optic Relay Cutaway"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3 style={{ fontSize: "22px", margin: 0, color: activeHarnessInfo.color }}>
                  {activeHarnessInfo.label}
                </h3>
                <p style={{ margin: 0, fontSize: "17px", color: "var(--text-parchment)" }}>
                  {locale === "vi" ? activeHarnessInfo.roleVi : activeHarnessInfo.roleEn}
                </p>

                {/* Animated Workload Distribution Bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {(["freebuff", "devin", "antigravity"] as const).map((id) => {
                    const m = HARNESS_META[id];
                    return (
                      <div key={id}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "14px",
                            marginBottom: "0.3rem",
                          }}
                        >
                          <span>{m.label}</span>
                          <code style={{ color: m.color }}>{m.sharePercent}%</code>
                        </div>
                        <div
                          style={{
                            height: "8px",
                            backgroundColor: "var(--bg-smoked-basalt)",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${m.sharePercent}%`,
                              height: "100%",
                              backgroundColor: m.color,
                              transition: "width var(--dur-med) var(--ease-out)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
