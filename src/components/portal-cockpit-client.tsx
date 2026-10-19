"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type {
  ConversionAudience,
  ConversionBundle,
  GreenfieldWalkthroughView,
  HorizonSummaryView,
  HorizonTier,
  Locale,
  PluginGroup,
  PortalDictionary,
  ReactorNodeId,
  ShowcaseCardView,
  ShowcaseId,
} from "@/types/portal";
import { WokReactorStage } from "@/modules/wok-reactor-stage";
import {
  PARTNER_URLS,
  calculateQuotaSavings,
  resolveConversionCtas,
} from "@/modules/partner-conversion";

export interface PortalCockpitClientProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
  readonly horizons: ReadonlyArray<HorizonSummaryView>;
  readonly showcases: ReadonlyArray<ShowcaseCardView>;
  readonly greenfield: GreenfieldWalkthroughView;
  readonly initialConversion: ConversionBundle;
}

const HARNESS_META: Readonly<
  Record<
    ReactorNodeId,
    {
      readonly label: string;
      readonly roleEn: string;
      readonly roleVi: string;
      readonly modelCode: string;
      readonly sharePercent: number;
      readonly color: string;
      readonly latencyLabel: string;
    }
  >
> = {
  freebuff: {
    label: "Freebuff + GLM Pass",
    roleEn: "62% High-Frequency Recon & Fast Edits",
    roleVi: "62% Trinh Sát Nhanh & Sửa Code Tốc Độ Cao",
    modelCode: "deepseek-4.1-flash / glm-5.3-flash",
    sharePercent: 62,
    color: "#FFB800",
    latencyLabel: "fbm1 lease / Ed25519",
  },
  devin: {
    label: "Devin Steward",
    roleEn: "15% Autonomous Deep Modules & TDD",
    roleVi: "15% Dựng Module Sâu & Thực Thi TDD",
    modelCode: "swe-2-max",
    sharePercent: 15,
    color: "#00F0FF",
    latencyLabel: "ACP stdio / ses_*",
  },
  antigravity: {
    label: "Antigravity",
    roleEn: "23% Architecture & Multi-Axis Review",
    roleVi: "23% Kiến Trúc & Kiểm Duyệt Đa Trục",
    modelCode: "argon-4-high",
    sharePercent: 23,
    color: "#FF2A6D",
    latencyLabel: "Fenced Live Switch",
  },
  substrate: {
    label: "Substrate Skeleton",
    roleEn: "Stage 3 Roadmap Memory Engine",
    roleVi: "Khung Lộ Trình Bộ Nhớ Giai Đoạn 3",
    modelCode: "The Spine / The Honeycomb / Working-Set Valve",
    sharePercent: 100,
    color: "#00E5A3",
    latencyLabel: "< 2 ms / < 1,200 tokens",
  },
};

export function PortalCockpitClient({
  locale,
  dictionary,
  horizons,
  showcases,
  greenfield,
  initialConversion,
}: PortalCockpitClientProps) {
  const [activeHarness, setActiveHarness] = useState<ReactorNodeId>("devin");
  const [activeHorizon, setActiveHorizon] = useState<HorizonTier | "all">("all");
  const [activePluginFilter, setActivePluginFilter] = useState<PluginGroup | "all">("all");
  const [selectedSliceId, setSelectedSliceId] = useState<ShowcaseId>(
    initialConversion.sliceId ?? "S8"
  );
  const [activeGreenfieldStep, setActiveGreenfieldStep] = useState<number>(1);
  const [activeAudience, setActiveAudience] = useState<ConversionAudience>(
    initialConversion.activeAudience
  );
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(35);
  const [copiedCommand, setCopiedCommand] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [valvePrunedMode, setValvePrunedMode] = useState<boolean>(true);
  const [gatewayMode, setGatewayMode] = useState<"centralized" | "fragmented">("centralized");

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const filteredShowcases = useMemo(() => {
    return showcases.filter((item) => {
      if (activeHorizon !== "all" && item.horizon !== activeHorizon) {
        return false;
      }
      if (activePluginFilter !== "all" && item.plugin !== activePluginFilter) {
        return false;
      }
      return true;
    });
  }, [showcases, activeHorizon, activePluginFilter]);

  const activeShowcase: ShowcaseCardView | undefined = useMemo(() => {
    const exact = showcases.find((c) => c.id === selectedSliceId);
    if (exact) return exact;
    return filteredShowcases[0] ?? showcases[0];
  }, [showcases, filteredShowcases, selectedSliceId]);

  const activeGreenfieldItem = useMemo(() => {
    return (
      greenfield.steps.find((s) => s.stepNumber === activeGreenfieldStep) ??
      greenfield.steps[0]
    );
  }, [greenfield.steps, activeGreenfieldStep]);

  const conversionBundle = useMemo(() => {
    return resolveConversionCtas({
      audience: activeAudience,
      locale,
      sliceId: activeShowcase?.id,
    });
  }, [activeAudience, locale, activeShowcase?.id]);

  const allConversionItems = useMemo(() => {
    const bundle = resolveConversionCtas({
      audience: activeAudience,
      locale,
      sliceId: activeShowcase?.id,
    });
    const matched = bundle.items.filter((item) => item.audience === activeAudience);
    return matched.length > 0 ? matched : bundle.items;
  }, [activeAudience, locale, activeShowcase?.id]);

  const savings = useMemo(() => calculateQuotaSavings(hoursPerWeek), [hoursPerWeek]);

  const handleSelectReactorNode = (nodeId: ReactorNodeId) => {
    setActiveHarness(nodeId);
    const matchingClip = showcases.find((clip) => clip.harnessNode === nodeId);
    if (matchingClip) {
      setSelectedSliceId(matchingClip.id);
    }
  };

  const handleCopyInstall = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(dictionary.hero.installCommand);
      }
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    } catch {
      setCopiedCommand(true);
    }
  };

  const heroLines =
    locale === "vi"
      ? ["Mọi Đặc Vụ.", "Một Buồng Lái."]
      : ["All Agents.", "One Cockpit."];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* ACT 1: NEO-TOKYO SPLIT HERO COCKPIT FRONTING HIVEMIND-STEWARD */}
      <section
        id="cockpit"
        style={{
          scrollMarginTop: "5rem",
          paddingTop: "clamp(2.25rem, 4.5vw, 4.25rem)",
          paddingBottom: "clamp(3.5rem, 6.5vw, 5.5rem)",
        }}
      >
        <div className="cyber-shell">
          <div className="hero-cockpit-grid">
            {/* Left 42%: Vibecoder Value Proposition, Install CLI & Stage 1 Social Channels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
              <h1
                style={{
                  fontSize: "clamp(44px, 5vw, 72px)",
                  fontWeight: 700,
                  lineHeight: 1.02,
                  letterSpacing: "-0.038em",
                  margin: 0,
                  color: "var(--text-titanium)",
                }}
              >
                <span className="line-mask">
                  <span data-line="" style={{ "--i": 0 } as React.CSSProperties}>
                    {heroLines[0]}
                  </span>
                </span>
                <span className="line-mask">
                  <span
                    data-line=""
                    style={
                      {
                        "--i": 1,
                        color: "var(--accent-cyber-cyan)",
                      } as React.CSSProperties
                    }
                  >
                    {heroLines[1]}
                  </span>
                </span>
              </h1>

              <p
                data-rise=""
                style={
                  {
                    "--d": 1,
                    fontSize: "17px",
                    lineHeight: 1.6,
                    color: "var(--text-titanium)",
                    margin: 0,
                    maxWidth: "54ch",
                  } as React.CSSProperties
                }
              >
                {dictionary.hero.philosophySummary}
              </p>

              {/* TUI Command Install Bar */}
              <div
                data-rise=""
                style={
                  {
                    "--d": 2,
                    backgroundColor: "var(--bg-akihabara-deck)",
                    padding: "0.9rem 1.1rem",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.55rem",
                  } as React.CSSProperties
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                  }}
                >
                  <code
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--accent-cyber-cyan)",
                    }}
                  >
                    $ {dictionary.hero.installCommand}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyInstall}
                    className="touch-target"
                    style={{
                      padding: "0 1rem",
                      backgroundColor: copiedCommand
                        ? "var(--accent-matrix-mint)"
                        : "var(--accent-cyber-cyan)",
                      color: "var(--bg-tokyo-void)",
                      border: "none",
                      borderRadius: "4px",
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {copiedCommand
                      ? dictionary.hero.copiedCommandLabel
                      : dictionary.hero.copyCommandLabel}
                  </button>
                </div>
                <div style={{ fontSize: "14px", color: "var(--text-cyber-slate)", maxWidth: "58ch" }}>
                  {dictionary.hero.subheadline} 
                </div>
              </div>

              {/* Primary CTAs */}
              <div
                data-rise=""
                style={
                  {
                    "--d": 3,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  } as React.CSSProperties
                }
              >
                <a
                  href="#xray"
                  className="touch-target"
                  style={{
                    padding: "0 1.35rem",
                    backgroundColor: "var(--accent-voltage-gold)",
                    color: "var(--bg-tokyo-void)",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.hero.primaryCtaLabel}
                </a>
                <a
                  href="#conversion"
                  className="touch-target"
                  style={{
                    padding: "0 1.25rem",
                    backgroundColor: "var(--bg-kabuki-panel)",
                    color: "var(--text-titanium)",
                    borderRadius: "6px",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.hero.secondaryCtaLabel}
                </a>
              </div>

              {/* Stage 1 Social Launch & Community Channels (GitHub, YouTube, Reddit, Discord) */}
              <div
                data-rise=""
                style={
                  {
                    "--d": 4,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "0.5rem",
                    paddingTop: "0.25rem",
                  } as React.CSSProperties
                }
              >
                <span style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                  {locale === "vi" ? "Kênh Cộng Đồng Stage 1:" : "Stage 1 Launch Channels:"}
                </span>
                <a
                  href="https://youtube.com/@chingchongchingvibecoding"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-rise=""
                  className="touch-target"
                  style={{
                    padding: "0 0.75rem",
                    backgroundColor: "var(--bg-akihabara-deck)",
                    color: "var(--accent-neon-crimson)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  YouTube
                </a>
                <a
                  href="https://github.com/shynlee04/hivemind-steward-oc-devin-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-rise=""
                  className="touch-target"
                  style={{
                    padding: "0 0.75rem",
                    backgroundColor: "var(--bg-akihabara-deck)",
                    color: "var(--text-titanium)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  GitHub
                </a>
                <a
                  href="https://reddit.com/r/opencode"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-rise=""
                  className="touch-target"
                  style={{
                    padding: "0 0.75rem",
                    backgroundColor: "var(--bg-akihabara-deck)",
                    color: "var(--accent-voltage-gold)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Reddit
                </a>
                <a
                  href="https://discord.com/invite/opencode"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-rise=""
                  className="touch-target"
                  style={{
                    padding: "0 0.75rem",
                    backgroundColor: "var(--bg-akihabara-deck)",
                    color: "var(--accent-cyber-cyan)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Discord
                </a>
              </div>
            </div>

            {/* Right 58%: Interactive 3D Three.js Neo-Tokyo Orbital Command Stage */}
            <div data-rise="" style={{ "--d": 2 } as React.CSSProperties}>
              <WokReactorStage
                activeHarness={activeHarness}
                activeHorizon={activeHorizon}
                reducedMotion={reducedMotion}
                locale={locale}
                onSelectNode={handleSelectReactorNode}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ACT 2: VIBECODER POCKET PAIN VS HIVEMIND-STEWARD CENTRAL GATEWAY INFOGRAPHIC */}
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

      {/* ACT 3: HIVEMIND-STEWARD VIDEO SHOWCASE THEATER & 3-LAYER TERMINAL X-RAY */}
      <section
        id="xray"
        data-reveal=""
        style={{
          scrollMarginTop: "5rem",
          paddingTop: "clamp(4.5rem, 8vw, 7.5rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)",
          backgroundColor: "var(--bg-tokyo-void)",
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
              marginBottom: "2.25rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(32px, 3.1vw, 44px)",
                  marginBottom: "0.5rem",
                }}
              >
                {dictionary.xrayExplorer.sectionTitle}
              </h2>
              <p
                style={{
                  color: "var(--text-titanium)",
                  maxWidth: "60ch",
                  margin: 0,
                  fontSize: "17px",
                }}
              >
                {dictionary.xrayExplorer.sectionSubtitle}
              </p>
            </div>

            {/* Filter by Horizon & Plugin */}
            <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
              {(
                [
                  ["all", dictionary.horizons.filterAll],
                  ["shipped", "v0.1 Shipped (Devin)"],
                  ["next-release", "v0.2 Next (Tri-Harness)"],
                  ["roadmap", "Stage 3 (Substrate)"],
                ] as const
              ).map(([tierKey, label]) => {
                const isSelected = activeHorizon === tierKey;
                return (
                  <button
                    key={tierKey}
                    type="button"
                    onClick={() => setActiveHorizon(tierKey)}
                    aria-pressed={isSelected}
                    className="touch-target"
                    style={{
                      padding: "0 0.85rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: isSelected
                        ? "var(--accent-cyber-cyan)"
                        : "var(--bg-akihabara-deck)",
                      color: isSelected
                        ? "var(--bg-tokyo-void)"
                        : "var(--text-titanium)",
                      fontWeight: 700,
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

          <div className="split-62-38">
            {/* Left 62%: Live 3-Layer Terminal X-Ray & Video Showcase Stage */}
            <div
              data-testid="xray-inspector-drawer"
              data-ui="true"
              style={{
                backgroundColor: "var(--bg-akihabara-deck)",
                borderRadius: "8px",
                padding: "clamp(1.25rem, 2.5vw, 2rem)",
              }}
            >
              {activeShowcase ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <code
                        style={{
                          padding: "0.25rem 0.65rem",
                          backgroundColor: "var(--bg-tokyo-void)",
                          color: HARNESS_META[activeShowcase.harnessNode].color,
                          borderRadius: "4px",
                          fontWeight: 700,
                          fontSize: "14px",
                        }}
                      >
                        {activeShowcase.id} ({activeShowcase.durationLabel})
                      </code>
                      <code style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                        {activeShowcase.sourceGrounding}
                      </code>
                    </div>
                    <Link
                      href={`/${locale}/episodes`}
                      className="touch-target"
                      style={{
                        padding: "0 0.85rem",
                        backgroundColor: "var(--bg-tokyo-void)",
                        color: "var(--accent-neon-crimson)",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      {locale === "vi" ? "Xem Video & Bản Ghi" : "Watch Video & Replay"}
                    </Link>
                  </div>

                  <div>
                    <h3 style={{ fontSize: "22px", marginBottom: "0.35rem" }}>
                      {activeShowcase.title}
                    </h3>
                    <p style={{ color: "var(--text-titanium)", margin: 0, fontSize: "17px" }}>
                      {activeShowcase.summary}
                    </p>
                  </div>

                  {/* 3-Layer X-Ray Pipeline */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div
                      style={{
                        backgroundColor: "var(--bg-tokyo-void)",
                        padding: "0.95rem 1.15rem",
                        borderRadius: "6px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--accent-voltage-gold)",
                          marginBottom: "0.3rem",
                        }}
                      >
                        1. {dictionary.xrayExplorer.layer1Label}
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          color: "var(--text-titanium)",
                        }}
                      >
                        <code>{activeShowcase.xray.humanPrompt}</code>
                      </pre>
                    </div>

                    <div
                      style={{
                        backgroundColor: "var(--bg-tokyo-void)",
                        padding: "0.95rem 1.15rem",
                        borderRadius: "6px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--accent-cyber-cyan)",
                          marginBottom: "0.3rem",
                        }}
                      >
                        2. {dictionary.xrayExplorer.layer2Label}
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          color: "var(--accent-cyber-cyan)",
                        }}
                      >
                        <code>{activeShowcase.xray.orchestratorTool}</code>
                      </pre>
                    </div>

                    <div
                      style={{
                        backgroundColor: "var(--bg-tokyo-void)",
                        padding: "0.95rem 1.15rem",
                        borderRadius: "6px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--accent-matrix-mint)",
                          marginBottom: "0.3rem",
                        }}
                      >
                        3. {dictionary.xrayExplorer.layer3Label}
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          color: "var(--text-titanium)",
                        }}
                      >
                        <code>{activeShowcase.xray.engineExecution}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Takeaway + Contextual Referral CTA */}
                  <div
                    style={{
                      backgroundColor: "var(--bg-kabuki-panel)",
                      padding: "1rem 1.15rem",
                      borderRadius: "6px",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ maxWidth: "54ch" }}>
                      <strong
                        style={{
                          display: "block",
                          fontSize: "14px",
                          color: "var(--accent-voltage-gold)",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {dictionary.xrayExplorer.proNotBroHeader}
                      </strong>
                      <span style={{ fontSize: "17px", color: "var(--text-titanium)" }}>
                        {activeShowcase.proNotBroLesson}
                      </span>
                    </div>

                    {activeShowcase.highlightsFreebuffReferral ? (
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <a
                          href={PARTNER_URLS.freebuffReferral}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="touch-target"
                          style={{
                            padding: "0 0.9rem",
                            backgroundColor: "var(--accent-voltage-gold)",
                            color: "var(--bg-tokyo-void)",
                            borderRadius: "6px",
                            fontWeight: 700,
                            fontSize: "14px",
                          }}
                        >
                          Freebuff Pass
                        </a>
                        <a
                          href={PARTNER_URLS.zapGlm}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="touch-target"
                          style={{
                            padding: "0 0.9rem",
                            backgroundColor: "var(--bg-tokyo-void)",
                            color: "var(--accent-cyber-cyan)",
                            borderRadius: "6px",
                            fontWeight: 700,
                            fontSize: "14px",
                          }}
                        >
                          Zap GLM Pass
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Right 38%: Compact 20-Clip Video Selector List */}
            <div
              data-ui="true"
              style={{
                backgroundColor: "var(--bg-akihabara-deck)",
                borderRadius: "8px",
                padding: "1.1rem",
                maxHeight: "650px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.35rem",
                  flexWrap: "wrap",
                  paddingBottom: "0.6rem",
                }}
              >
                {(
                  [
                    ["all", dictionary.xrayExplorer.pluginAll],
                    ["steward", dictionary.xrayExplorer.pluginSteward],
                    ["substrate", dictionary.xrayExplorer.pluginSubstrate],
                  ] as const
                ).map(([plugKey, label]) => (
                  <button
                    key={plugKey}
                    type="button"
                    onClick={() => setActivePluginFilter(plugKey)}
                    aria-pressed={activePluginFilter === plugKey}
                    className="touch-target"
                    style={{
                      padding: "0 0.7rem",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor:
                        activePluginFilter === plugKey
                          ? "var(--bg-kabuki-panel)"
                          : "var(--bg-tokyo-void)",
                      color:
                        activePluginFilter === plugKey
                          ? "var(--accent-cyber-cyan)"
                          : "var(--text-cyber-slate)",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {filteredShowcases.map((clip) => {
                const isSelected = activeShowcase?.id === clip.id;
                const nodeMeta = HARNESS_META[clip.harnessNode];
                return (
                  <button
                    key={clip.id}
                    type="button"
                    onClick={() => {
                      setSelectedSliceId(clip.id);
                      setActiveHarness(clip.harnessNode);
                    }}
                    aria-pressed={isSelected}
                    className="touch-target"
                    style={{
                      width: "100%",
                      justifyContent: "space-between",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: isSelected
                        ? "var(--bg-kabuki-panel)"
                        : "transparent",
                      color: "var(--text-titanium)",
                      cursor: "pointer",
                      textAlign: "left",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.65rem",
                        minWidth: 0,
                      }}
                    >
                      <code
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: isSelected
                            ? "var(--accent-voltage-gold)"
                            : nodeMeta.color,
                          flexShrink: 0,
                        }}
                      >
                        {clip.id}
                      </code>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: isSelected ? 700 : 500,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {clip.title}
                      </span>
                    </div>

                    <code
                      style={{
                        fontSize: "14px",
                        color: "var(--text-cyber-slate)",
                        flexShrink: 0,
                      }}
                    >
                      {clip.durationLabel}
                    </code>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ACT 4: VIBECODER REFERRAL VAULT & CODING-PASS PROVIDER / SPONSOR PROSPECTUS */}
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

      {/* ACT 5: 5-MIN GREENFIELD BUILD + LIGHTWEIGHT HIVEMIND-SUBSTRATE ROADMAP SKELETON & STAGE 2 HUB */}
      <section
        id="greenfield"
        data-reveal=""
        style={{
          scrollMarginTop: "5rem",
          paddingTop: "clamp(4.5rem, 8vw, 7.5rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)",
          backgroundColor: "var(--bg-tokyo-void)",
        }}
      >
        <div className="cyber-shell">
          {/* Part A: 5-Minute Tri-Harness Greenfield Build Scrubber */}
          <div style={{ marginBottom: "4rem" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "1.25rem",
                marginBottom: "1.75rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 3.1vw, 44px)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {dictionary.greenfieldSection.sectionTitle}
                </h2>
                <p
                  style={{
                    color: "var(--text-titanium)",
                    maxWidth: "60ch",
                    margin: 0,
                    fontSize: "17px",
                  }}
                >
                  {dictionary.greenfieldSection.sectionSubtitle}
                </p>
              </div>
              <code
                style={{
                  fontSize: "14px",
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "var(--bg-akihabara-deck)",
                  color: "var(--accent-matrix-mint)",
                  borderRadius: "6px",
                }}
              >
                {dictionary.greenfieldSection.verificationBadge}
              </code>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                backgroundColor: "var(--bg-akihabara-deck)",
                padding: "0.55rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
              }}
            >
              {greenfield.steps.map((step) => {
                const isSelected = activeGreenfieldItem?.stepNumber === step.stepNumber;
                const hMeta = HARNESS_META[step.harnessId];
                return (
                  <button
                    key={step.phaseCode}
                    type="button"
                    onClick={() => {
                      setActiveGreenfieldStep(step.stepNumber);
                      setActiveHarness(step.harnessId);
                    }}
                    aria-pressed={isSelected}
                    className="touch-target"
                    style={{
                      flex: "1 1 150px",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: isSelected
                        ? "var(--bg-kabuki-panel)"
                        : "transparent",
                      color: "var(--text-titanium)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                      textAlign: "left",
                    }}
                  >
                    <code style={{ color: hMeta.color, fontWeight: 700, fontSize: "14px" }}>
                      {step.phaseCode} ({hMeta.label})
                    </code>
                  </button>
                );
              })}
            </div>

            {activeGreenfieldItem ? (
              <div
                className="split-62-38"
                style={{
                  backgroundColor: "var(--bg-akihabara-deck)",
                  borderRadius: "8px",
                  padding: "clamp(1.25rem, 2.5vw, 2rem)",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.95rem" }}>
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
                      {activeGreenfieldItem.phaseCode}: {HARNESS_META[activeGreenfieldItem.harnessId].label}
                    </h3>
                    <code
                      style={{
                        fontSize: "14px",
                        color: "var(--accent-voltage-gold)",
                        backgroundColor: "var(--bg-tokyo-void)",
                        padding: "0.3rem 0.65rem",
                        borderRadius: "4px",
                      }}
                    >
                      {activeGreenfieldItem.modelSlot}
                    </code>
                  </div>

                  <p style={{ margin: 0, fontWeight: 700, fontSize: "17px", color: "var(--text-titanium)" }}>
                    {activeGreenfieldItem.title}
                  </p>

                  <p style={{ margin: 0, color: "var(--text-titanium)", fontSize: "17px" }}>
                    {activeGreenfieldItem.actionSummary}
                  </p>

                  <pre
                    style={{
                      margin: 0,
                      padding: "0.95rem 1.15rem",
                      backgroundColor: "var(--bg-tokyo-void)",
                      borderRadius: "6px",
                      color: "var(--accent-cyber-cyan)",
                      overflowX: "hidden",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    <code>
                      $ {activeGreenfieldItem.xray.orchestratorTool}
                      {"\n"}
                      {activeGreenfieldItem.xray.engineExecution}
                    </code>
                  </pre>
                </div>

                <div
                  style={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#040509",
                  }}
                >
                  <img
                    src="/assets/greenfield-forge-plate.jpg"
                    className="plate-drift"
                    alt="Neo-Tokyo Broadcast Video Deck"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          {/* Part B: Lightweight Hivemind-Substrate Roadmap Skeleton & Stage 2 Content Hub */}
          <div
            style={{
              backgroundColor: "var(--bg-akihabara-deck)",
              borderRadius: "8px",
              padding: "clamp(1.35rem, 2.5vw, 2.25rem)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "1.25rem",
                marginBottom: "1.75rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 3.1vw, 44px)",
                    margin: "0 0 0.45rem 0",
                  }}
                >
                  {dictionary.substrateSection.sectionTitle}
                </h2>
                <p
                  style={{
                    color: "var(--text-titanium)",
                    maxWidth: "60ch",
                    margin: 0,
                    fontSize: "17px",
                  }}
                >
                  {dictionary.substrateSection.sectionSubtitle}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => setValvePrunedMode(false)}
                  aria-pressed={!valvePrunedMode}
                  className="touch-target"
                  style={{
                    padding: "0 0.9rem",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: !valvePrunedMode
                      ? "var(--accent-neon-crimson)"
                      : "var(--bg-tokyo-void)",
                    color: "var(--text-titanium)",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {locale === "vi" ? "Raw Log: 48.000 Token" : "Raw Session: 48,000 Tokens"}
                </button>
                <button
                  type="button"
                  onClick={() => setValvePrunedMode(true)}
                  aria-pressed={valvePrunedMode}
                  className="touch-target"
                  style={{
                    padding: "0 0.9rem",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: valvePrunedMode
                      ? "var(--accent-matrix-mint)"
                      : "var(--bg-tokyo-void)",
                    color: valvePrunedMode
                      ? "var(--bg-tokyo-void)"
                      : "var(--text-titanium)",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {locale === "vi" ? "Qua Van < 2 ms: 1.140 Token" : "Valve < 2 ms: 1,140 Tokens"}
                </button>
              </div>
            </div>

            <div className="tonal-4-grid">
              <div>
                <h3 style={{ fontSize: "22px", margin: "0 0 0.45rem 0", color: "var(--accent-voltage-gold)" }}>
                  The Spine
                </h3>
                <p style={{ margin: 0, fontSize: "17px", color: "var(--text-titanium)" }}>
                  {dictionary.substrateSection.spineDescription}
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "22px", margin: "0 0 0.45rem 0", color: "var(--accent-cyber-cyan)" }}>
                  The Honeycomb
                </h3>
                <p style={{ margin: 0, fontSize: "17px", color: "var(--text-titanium)" }}>
                  {dictionary.substrateSection.honeycombDescription}
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "22px", margin: "0 0 0.45rem 0", color: "var(--accent-matrix-mint)" }}>
                  Working-Set Valve
                </h3>
                <p style={{ margin: 0, fontSize: "17px", color: "var(--text-titanium)" }}>
                  {dictionary.substrateSection.valveDescription}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "0.85rem" }}>
                <h3 style={{ fontSize: "22px", margin: 0, color: "var(--accent-cyber-cyan)" }}>
                  {valvePrunedMode ? "1,140 Tokens" : "48,000 Tokens"}
                </h3>
                <img
                  src="/assets/substrate-honeycomb-plate.jpg"
                  className="plate-drift"
                  alt="Hivemind Substrate Roadmap Skeleton"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    display: "block",
                  }}
                />
              </div>
            </div>

            {/* Stage 2 Content & Component Showroom Bar (Payload CMS 3.0 + Storybook 8) */}
            <div
              style={{
                marginTop: "2rem",
                paddingTop: "1.35rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span style={{ color: "var(--text-titanium)", fontSize: "17px" }}>
                {locale === "vi"
                  ? "Khung Stage 2 (Payload CMS 3.0 & Storybook 8): Bài hướng dẫn, Tập phim & Showroom"
                  : "Stage 2 Scaffold (Payload CMS 3.0 & Storybook 8): Tutorials, Video Episodes & Showroom"}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                <Link
                  href={`/${locale}/blog`}
                  className="touch-target"
                  style={{
                    padding: "0 1rem",
                    backgroundColor: "var(--bg-tokyo-void)",
                    color: "var(--accent-cyber-cyan)",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.nav.blogLink}
                </Link>
                <Link
                  href={`/${locale}/episodes`}
                  className="touch-target"
                  style={{
                    padding: "0 1rem",
                    backgroundColor: "var(--bg-tokyo-void)",
                    color: "var(--accent-voltage-gold)",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.nav.episodesLink}
                </Link>
                <Link
                  href={`/${locale}/showroom`}
                  className="touch-target"
                  style={{
                    padding: "0 1rem",
                    backgroundColor: "var(--bg-tokyo-void)",
                    color: "var(--accent-matrix-mint)",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.nav.showroomLink}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
