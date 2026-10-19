"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { WokReactorStage } from "../modules/wok-reactor-stage";
import type {
  ConversionAudience,
  ConversionBundle,
  ConversionCtaItem,
  GreenfieldWalkthroughView,
  HorizonSummaryView,
  HorizonTier,
  Locale,
  PluginGroup,
  PortalDictionary,
  QuotaSavingsEstimate,
  ReactorNodeId,
  ShowcaseCardView,
} from "../types/portal";

const BAMBOO_ACCENT = "bamboo-green" as const;
const EMBER_ACCENT = "dragon-ember" as const;

export interface PortalCockpitClientProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
  readonly horizons: ReadonlyArray<HorizonSummaryView>;
  readonly showcases: ReadonlyArray<ShowcaseCardView>;
  readonly greenfield: GreenfieldWalkthroughView;
  readonly initialConversion: ConversionBundle;
}

const ACCENT_HEX_BY_TOKEN: Readonly<Record<ConversionCtaItem["accentToken"], string>> = {
  "wok-gold": "#F5A623",
  "jade-wire": "#22D3EE",
  "dragon-ember": "#EF4444",
  "bamboo-green": "#10B981",
};

const S = {
  shell: { display: "flex", flexDirection: "column", gap: "4rem", paddingTop: "2rem", paddingBottom: "3rem" } satisfies CSSProperties,
  heroGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "2.5rem", alignItems: "start" } satisfies CSSProperties,
  col: { display: "flex", flexDirection: "column", gap: "1.15rem" } satisfies CSSProperties,
  rowWrap: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" } satisfies CSSProperties,
  betweenWrap: { display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.75rem" } satisfies CSSProperties,
  grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1rem" } satisfies CSSProperties,
  monoTag: { fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700 } satisfies CSSProperties,
  preBox: { margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--text-parchment)" } satisfies CSSProperties,
  xrayBox: { backgroundColor: "var(--bg-wok-iron)", border: "1px solid var(--border-forge-brass)", padding: "0.85rem", borderRadius: "2px" } satisfies CSSProperties,
};

function computeClientQuotaSavings(hoursPerWeek: number): QuotaSavingsEstimate {
  const clampedHours = Math.min(80, Math.max(5, Math.round(hoursPerWeek)));
  const baselineMonthlyUsd = Math.round(clampedHours * 9.5);
  const optimizedMonthlyUsd = Math.round(clampedHours * 3.15);
  const monthlySavingsUsd = Math.max(0, baselineMonthlyUsd - optimizedMonthlyUsd);
  const savingsPercentage = baselineMonthlyUsd > 0 ? Math.round((monthlySavingsUsd / baselineMonthlyUsd) * 100) : 0;
  return {
    hoursPerWeek: clampedHours,
    baselineMonthlyUsd,
    optimizedMonthlyUsd,
    monthlySavingsUsd,
    savingsPercentage,
    prunedTokensPerMonth: clampedHours * 420_000,
    freebuffOffloadSharePercent: 68,
  };
}

function getFallbackAudienceItems(locale: Locale, highlightFreebuff: boolean): ReadonlyArray<ConversionCtaItem> {
  const isVi = locale === "vi";
  return [
    {
      id: "cta-freebuff-referral",
      audience: "builders",
      label: isVi ? "Đăng ký Freebuff (Nhận tín dụng thưởng)" : "Claim Freebuff Referral Slot",
      badge: isVi ? "[HARNESS THỨ 3 · FREEBUFF]" : "[3RD HARNESS · FREEBUFF]",
      headline: "Freebuff · glm-5.3-flash & deepseek-4.1-flash",
      description: isVi
        ? "Giảm tải trinh sát mã nguồn và vòng lặp TDD sang Freebuff với khôi phục thẻ xoay vòng fbm1.... và keepSlotForResume."
        : "Offload codebase recon and rapid TDD loops to Freebuff with rotated fbm1.... handle recovery and keepSlotForResume continuity.",
      href: "https://freebuff.com/?ref=ref-6c980d54-a29a-4270-a160-35f13e62a2ff",
      disclosure: isVi
        ? "Liên kết giới thiệu minh bạch: hỗ trợ phát triển hệ sinh thái Hivemind-* mà không tăng chi phí của bạn."
        : "Transparent referral link: supports Hivemind-* open-source maintenance at zero extra cost to you.",
      isHighlighted: highlightFreebuff,
      accentToken: BAMBOO_ACCENT,
    },
    {
      id: "cta-zap-glm-plan",
      audience: "builders",
      label: isVi ? "Kích hoạt gói Zap GLM Coding Plan" : "Activate Zap GLM Coding Plan",
      badge: isVi ? "[ĐỐI TÁC SUY LUẬN · Z.AI]" : "[INFERENCE PARTNER · Z.AI]",
      headline: isVi ? "Z.AI GLM Coding Plan · Thông lượng cao cho OpenCode" : "Z.AI GLM Coding Plan · High-Throughput Swarm Tier",
      description: isVi
        ? "Tối ưu chi phí token hàng tháng khi chạy song song nhiều subagent với mô hình họ GLM tốc độ cao."
        : "Slash monthly token burn when fanning out parallel multi-harness delegations across OpenCode V2 worktrees.",
      href: "https://z.ai/subscribe?ic=LTWUT4H2RS",
      disclosure: isVi
        ? "Mã giới thiệu đối tác chính thức (ic=LTWUT4H2RS) dành cho cộng đồng Hivemind."
        : "Official partner invite code (ic=LTWUT4H2RS) supporting Hivemind ecosystem benchmarks.",
      isHighlighted: highlightFreebuff,
      accentToken: "wok-gold",
    },
    {
      id: "cta-kofi-support",
      audience: "supporters",
      label: isVi ? "Ủng hộ qua Ko-fi (@shynlee04)" : "Support on Ko-fi (@shynlee04)",
      badge: isVi ? "[CỘNG ĐỒNG BẢO TRỢ · KO-FI]" : "[COMMUNITY BACKER · KO-FI]",
      headline: isVi ? "Tiếp lửa cho phòng lab mã nguồn mở Hivemind-*" : "Fuel the Hivemind-* Open-Source Forge",
      description: isVi
        ? "Đóng góp trực tiếp giúp duy trì kiểm thử giao thức ACP thực tế và phát triển Hivemind Substrate."
        : "Directly fund live ACP binary regression gates, multi-OS packaging, and bilingual architecture documentation.",
      href: "https://ko-fi.com/shynlee04",
      disclosure: isVi
        ? "100% đóng góp dành cho chi phí hạ tầng kiểm thử và tài liệu song ngữ."
        : "100% of community backing funds test-runner infrastructure and open specs.",
      isHighlighted: false,
      accentToken: "jade-wire",
    },
    {
      id: "cta-bmac-support",
      audience: "supporters",
      label: isVi ? "Mua cà phê cho tác giả (Buy Me a Coffee)" : "Buy Me a Coffee (@shynlee04l)",
      badge: isVi ? "[TIẾP SỨC · BMAC]" : "[CREATOR FUEL · BMAC]",
      headline: "Buy Me a Coffee · shynlee04l",
      description: isVi
        ? "Ủng hộ nhanh một ly cà phê để duy trì chuỗi bài viết kỹ thuật sâu và tập phim X-Ray mới."
        : "Back the maintainer directly to keep shipping 3-Layer X-Ray deep-dives and new multi-harness episodes.",
      href: "https://buymeacoffee.com/shynlee04l",
      disclosure: isVi ? "Kênh ủng hộ trực tiếp của tác giả dự án." : "Direct maintainer support channel.",
      isHighlighted: false,
      accentToken: EMBER_ACCENT,
    },
  ];
}

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
  const [activePlugin, setActivePlugin] = useState<PluginGroup | "all">("all");
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);
  const [selectedShowcaseId, setSelectedShowcaseId] = useState<string>(showcases[0]?.id ?? "S1");
  const [activeGreenfieldStep, setActiveGreenfieldStep] = useState<number>(1);
  const [activeAudience, setActiveAudience] = useState<ConversionAudience>(initialConversion.activeAudience);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(35);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
    }
  }, []);

  const filteredShowcases = useMemo(
    () =>
      showcases.filter(
        (item) =>
          (activeHorizon === "all" || item.horizon === activeHorizon) &&
          (activePlugin === "all" || item.plugin === activePlugin)
      ),
    [showcases, activeHorizon, activePlugin]
  );

  const selectedShowcase: ShowcaseCardView | undefined = useMemo(
    () =>
      filteredShowcases.find((item) => item.id === selectedShowcaseId) ??
      filteredShowcases[0] ??
      showcases[0],
    [filteredShowcases, selectedShowcaseId, showcases]
  );

  const isFreebuffSliceActive = Boolean(
    selectedShowcase &&
      (selectedShowcase.highlightsFreebuffReferral ||
        selectedShowcase.id === "S8" ||
        selectedShowcase.id === "S9" ||
        selectedShowcase.id === "S10")
  );

  const activeGreenfieldStage = useMemo(
    () => greenfield.steps.find((s) => s.stepNumber === activeGreenfieldStep) ?? greenfield.steps[0],
    [greenfield.steps, activeGreenfieldStep]
  );

  const visibleConversionItems = useMemo(() => {
    const fallback = getFallbackAudienceItems(locale, isFreebuffSliceActive);
    const mergedMap = new Map<string, ConversionCtaItem>();
    for (const item of fallback) {
      mergedMap.set(item.id, item);
    }
    for (const item of initialConversion.items) {
      mergedMap.set(item.id, {
        ...item,
        isHighlighted: item.isHighlighted || (item.audience === "builders" && isFreebuffSliceActive),
      });
    }
    return Array.from(mergedMap.values()).filter((item) => item.audience === activeAudience);
  }, [initialConversion.items, locale, isFreebuffSliceActive, activeAudience]);

  const quotaEstimate = useMemo(() => computeClientQuotaSavings(hoursPerWeek), [hoursPerWeek]);

  const handleCopyInstallCommand = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(dictionary.hero.installCommand);
      }
      setCopiedInstall(true);
      window.setTimeout(() => setCopiedInstall(false), 2200);
    } catch {
      setCopiedInstall(true);
    }
  };

  return (
    <div className="cyber-shell" style={S.shell}>
      <section id="cockpit" aria-label="Cockpit Hero" style={S.heroGrid}>
        <div style={S.col}>
          <div style={S.rowWrap}>
            <span
              style={{
                ...S.monoTag,
                padding: "0.25rem 0.6rem",
                backgroundColor: "var(--bg-smoked-basalt)",
                border: "1px solid var(--accent-wok-gold)",
                color: "var(--accent-wok-gold)",
              }}
            >
              {dictionary.hero.eyebrowTag}
            </span>
            <span
              style={{
                ...S.monoTag,
                padding: "0.25rem 0.6rem",
                backgroundColor: "var(--bg-scroll-lacquer)",
                border: "1px solid var(--accent-jade-wire)",
                color: "var(--accent-jade-wire)",
              }}
            >
              {dictionary.hero.philosophyBadge}
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.25rem, 4vw + 1rem, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.18,
              color: "var(--text-parchment)",
              margin: 0,
            }}
          >
            {dictionary.hero.headline}
          </h1>

          <p style={{ fontSize: "1.0625rem", lineHeight: 1.65, color: "var(--text-ash-slate)", margin: 0, maxWidth: "64ch" }}>
            {dictionary.hero.subheadline}
          </p>

          <div
            className="cyber-chamfer"
            style={{ padding: "0.85rem 1rem", borderLeft: "3px solid var(--accent-wok-gold)", fontSize: "0.9375rem" }}
          >
            {dictionary.hero.philosophySummary}
          </div>

          <div className="cyber-chamfer" style={{ padding: "1rem", backgroundColor: "var(--bg-scroll-lacquer)", ...S.col, gap: "0.6rem" }}>
            <div style={{ ...S.monoTag, color: "var(--accent-wok-gold)" }}>{dictionary.hero.installLabel}</div>
            <div
              style={{
                ...S.betweenWrap,
                backgroundColor: "var(--bg-wok-iron)",
                border: "1px solid var(--border-forge-brass)",
                padding: "0.6rem 0.85rem",
                borderRadius: "2px",
              }}
            >
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.9375rem", color: "var(--accent-jade-wire)", fontWeight: 600 }}>
                $ {dictionary.hero.installCommand}
              </code>
              <button
                type="button"
                onClick={handleCopyInstallCommand}
                className="touch-target"
                style={{
                  ...S.monoTag,
                  padding: "0 0.85rem",
                  backgroundColor: copiedInstall ? "var(--accent-bamboo-green)" : "var(--accent-wok-gold)",
                  color: "#080B10",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                {copiedInstall ? dictionary.hero.copiedCommandLabel : dictionary.hero.copyCommandLabel}
              </button>
            </div>
          </div>

          <div style={S.rowWrap}>
            <a
              href="#xray"
              className="touch-target"
              style={{
                ...S.monoTag,
                padding: "0 1.25rem",
                backgroundColor: "var(--accent-wok-gold)",
                color: "#080B10",
                fontSize: "0.875rem",
                borderRadius: "2px",
              }}
            >
              {dictionary.hero.primaryCtaLabel}
            </a>
            <a
              href="#greenfield"
              className="touch-target cyber-chamfer"
              style={{ ...S.monoTag, padding: "0 1.15rem", color: "var(--accent-jade-wire)", fontSize: "0.875rem" }}
            >
              {dictionary.hero.secondaryCtaLabel}
            </a>
            <button
              type="button"
              aria-pressed={reducedMotion}
              onClick={() => setReducedMotion((prev) => !prev)}
              className="touch-target cyber-chamfer"
              style={{ ...S.monoTag, padding: "0 0.9rem", color: "var(--text-parchment)", cursor: "pointer" }}
            >
              {reducedMotion ? dictionary.hero.reducedMotionToggleOn : dictionary.hero.reducedMotionToggleOff}
            </button>
          </div>
        </div>

        <div>
          <WokReactorStage
            activeHarness={activeHarness}
            activeHorizon={activeHorizon}
            reducedMotion={reducedMotion}
            locale={locale}
            onSelectNode={(nodeId) => setActiveHarness(nodeId)}
          />
        </div>
      </section>

      <section aria-label={dictionary.horizons.sectionTitle} style={S.col}>
        <div>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.2vw + 0.5rem, 2.25rem)", marginBottom: "0.35rem" }}>
            {dictionary.horizons.sectionTitle}
          </h2>
          <p style={{ margin: 0, color: "var(--text-ash-slate)" }}>{dictionary.horizons.sectionSubtitle}</p>
        </div>

        <div style={S.grid3}>
          {horizons.map((h) => {
            const borderColor =
              h.horizon === "shipped"
                ? "var(--accent-wok-gold)"
                : h.horizon === "next-release"
                  ? "var(--accent-jade-wire)"
                  : "var(--accent-dragon-ember)";
            return (
              <div
                key={h.horizon}
                className="cyber-chamfer"
                style={{
                  padding: "1.15rem",
                  borderColor: activeHorizon === h.horizon ? borderColor : "var(--border-forge-brass)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                }}
              >
                <div style={{ ...S.col, gap: "0.45rem" }}>
                  <span style={{ ...S.monoTag, color: borderColor }}>{h.badge}</span>
                  <h3 style={{ margin: 0, fontSize: "1.125rem" }}>{h.canonicalScope}</h3>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-ash-slate)" }}>{h.description}</p>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--text-ash-slate)",
                    borderTop: "1px solid var(--border-forge-brass)",
                    paddingTop: "0.5rem",
                  }}
                >
                  {dictionary.xrayExplorer.sourceGroundingLabel}: {h.sourceGrounding}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="xray" aria-label={dictionary.xrayExplorer.sectionTitle} style={S.col}>
        <div style={S.betweenWrap}>
          <div>
            <h2 style={{ fontSize: "clamp(1.65rem, 2.5vw + 0.5rem, 2.5rem)", marginBottom: "0.35rem" }}>
              {dictionary.xrayExplorer.sectionTitle}
            </h2>
            <p style={{ margin: 0, color: "var(--text-ash-slate)" }}>{dictionary.xrayExplorer.sectionSubtitle}</p>
          </div>

          <div style={S.rowWrap}>
            {(
              [
                { id: "all", label: dictionary.horizons.filterAll },
                { id: "shipped", label: dictionary.horizons.shippedBadge },
                { id: "next-release", label: dictionary.horizons.nextReleaseBadge },
                { id: "roadmap", label: dictionary.horizons.roadmapBadge },
              ] as const
            ).map((tab) => {
              const active = activeHorizon === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveHorizon(tab.id)}
                  className="touch-target cyber-chamfer"
                  style={{
                    ...S.monoTag,
                    padding: "0 0.75rem",
                    backgroundColor: active ? "var(--bg-scroll-lacquer)" : "var(--bg-smoked-basalt)",
                    color: active ? "var(--accent-wok-gold)" : "var(--text-parchment)",
                    borderColor: active ? "var(--accent-wok-gold)" : "var(--border-forge-brass)",
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={S.rowWrap}>
          <span style={{ ...S.monoTag, color: "var(--text-ash-slate)" }}>{dictionary.xrayExplorer.pluginFilterLabel}:</span>
          {(
            [
              { id: "all", label: dictionary.xrayExplorer.pluginAll },
              { id: "steward", label: dictionary.xrayExplorer.pluginSteward },
              { id: "substrate", label: dictionary.xrayExplorer.pluginSubstrate },
              { id: "cross-plugin", label: dictionary.xrayExplorer.pluginCross },
            ] as const
          ).map((pluginTab) => {
            const active = activePlugin === pluginTab.id;
            return (
              <button
                key={pluginTab.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActivePlugin(pluginTab.id)}
                className="touch-target cyber-chamfer"
                style={{
                  ...S.monoTag,
                  padding: "0 0.75rem",
                  backgroundColor: active ? "var(--bg-scroll-lacquer)" : "var(--bg-smoked-basalt)",
                  color: active ? "var(--accent-jade-wire)" : "var(--text-parchment)",
                  borderColor: active ? "var(--accent-jade-wire)" : "var(--border-forge-brass)",
                  cursor: "pointer",
                }}
              >
                {pluginTab.label}
              </button>
            );
          })}
        </div>

        {selectedShowcase && (
          <div
            data-testid="xray-inspector-drawer"
            data-selected-slice={selectedShowcase.id}
            className="cyber-chamfer"
            style={{
              ...S.col,
              padding: "1.5rem",
              backgroundColor: "var(--bg-scroll-lacquer)",
              border: "1px solid var(--accent-jade-wire)",
            }}
          >
            <div style={{ ...S.betweenWrap, borderBottom: "1px solid var(--border-forge-brass)", paddingBottom: "0.75rem" }}>
              <div>
                <span style={{ ...S.monoTag, color: "var(--accent-wok-gold)" }}>
                  [{selectedShowcase.id}] · {selectedShowcase.horizonBadge} · {selectedShowcase.durationLabel}
                </span>
                <h3 style={{ margin: "0.25rem 0 0 0", fontSize: "1.35rem" }}>
                  {selectedShowcase.title} — {selectedShowcase.subtitle}
                </h3>
              </div>
              {isFreebuffSliceActive && (
                <a
                  href="#conversion"
                  className="touch-target"
                  style={{
                    ...S.monoTag,
                    padding: "0 0.85rem",
                    backgroundColor: "var(--accent-bamboo-green)",
                    color: "#080B10",
                    borderRadius: "2px",
                  }}
                >
                  [FREEBUFF + ZAP GLM REFERRAL ACTIVE]
                </a>
              )}
            </div>

            <div style={S.grid3}>
              <div style={S.xrayBox}>
                <div style={{ ...S.monoTag, color: "var(--accent-wok-gold)", marginBottom: "0.45rem" }}>
                  {dictionary.xrayExplorer.layer1Label}
                </div>
                <pre style={S.preBox}>{selectedShowcase.xray.humanPrompt}</pre>
              </div>
              <div style={S.xrayBox}>
                <div style={{ ...S.monoTag, color: "var(--accent-jade-wire)", marginBottom: "0.45rem" }}>
                  {dictionary.xrayExplorer.layer2Label}
                </div>
                <pre style={S.preBox}>{selectedShowcase.xray.orchestratorTool}</pre>
              </div>
              <div style={S.xrayBox}>
                <div style={{ ...S.monoTag, color: "var(--accent-bamboo-green)", marginBottom: "0.45rem" }}>
                  {dictionary.xrayExplorer.layer3Label}
                </div>
                <pre style={S.preBox}>{selectedShowcase.xray.engineExecution}</pre>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--bg-smoked-basalt)",
                borderLeft: "3px solid var(--accent-wok-gold)",
                padding: "0.85rem 1rem",
              }}
            >
              <div style={{ ...S.monoTag, color: "var(--accent-wok-gold)", marginBottom: "0.25rem" }}>
                {dictionary.xrayExplorer.proNotBroHeader}
              </div>
              <p style={{ margin: 0, fontSize: "0.9375rem" }}>{selectedShowcase.proNotBroLesson}</p>
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {filteredShowcases.map((card) => {
            const isSelected = selectedShowcase?.id === card.id;
            return (
              <article
                key={card.id}
                data-showcase-card={card.id}
                className="cyber-chamfer"
                style={{
                  padding: "1.1rem",
                  borderColor: isSelected ? "var(--accent-jade-wire)" : "var(--border-forge-brass)",
                  backgroundColor: isSelected ? "var(--bg-scroll-lacquer)" : "var(--bg-smoked-basalt)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "0.85rem",
                }}
              >
                <div style={{ ...S.col, gap: "0.4rem" }}>
                  <div style={{ ...S.betweenWrap, fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
                    <span style={{ color: "var(--accent-wok-gold)", fontWeight: 700 }}>
                      [{card.id}] · {card.horizonBadge}
                    </span>
                    <span style={{ color: "var(--text-ash-slate)" }}>{card.durationLabel}</span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{card.title}</h3>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent-jade-wire)" }}>
                    {card.subtitle}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-ash-slate)" }}>{card.summary}</p>
                </div>

                <div style={{ ...S.betweenWrap, borderTop: "1px solid var(--border-forge-brass)", paddingTop: "0.65rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-ash-slate)" }}>
                    {card.sourceGrounding}
                  </span>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedShowcaseId(card.id);
                      setActiveHarness(card.harnessNode);
                    }}
                    className="touch-target cyber-chamfer"
                    style={{
                      ...S.monoTag,
                      padding: "0 0.75rem",
                      color: isSelected ? "var(--accent-wok-gold)" : "var(--accent-jade-wire)",
                      cursor: "pointer",
                    }}
                  >
                    {dictionary.xrayExplorer.inspectSliceCta}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="greenfield"
        aria-label={dictionary.greenfieldSection.sectionTitle}
        className="cyber-chamfer"
        style={{ ...S.col, padding: "1.75rem" }}
      >
        <div>
          <span style={{ ...S.monoTag, color: "var(--accent-bamboo-green)" }}>
            {dictionary.greenfieldSection.verificationBadge} · {greenfield.durationLabel}
          </span>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.2vw + 0.5rem, 2.2rem)", margin: "0.25rem 0" }}>{greenfield.title}</h2>
          <p style={{ margin: 0, color: "var(--text-ash-slate)" }}>{greenfield.overview}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.5rem" }}>
          {greenfield.steps.map((step) => {
            const isStepActive = activeGreenfieldStage?.stepNumber === step.stepNumber;
            return (
              <button
                key={step.phaseCode}
                type="button"
                aria-pressed={isStepActive}
                onClick={() => {
                  setActiveGreenfieldStep(step.stepNumber);
                  setActiveHarness(step.harnessId);
                }}
                className="touch-target cyber-chamfer"
                style={{
                  padding: "0.6rem 0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  backgroundColor: isStepActive ? "var(--bg-scroll-lacquer)" : "var(--bg-wok-iron)",
                  borderColor: isStepActive ? "var(--accent-wok-gold)" : "var(--border-forge-brass)",
                  color: "var(--text-parchment)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ ...S.monoTag, color: isStepActive ? "var(--accent-wok-gold)" : "var(--accent-jade-wire)" }}>
                  {step.phaseCode} · {step.harnessId.toUpperCase()}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-ash-slate)" }}>
                  {step.modelSlot}
                </span>
              </button>
            );
          })}
        </div>

        {activeGreenfieldStage && (
          <div style={{ ...S.xrayBox, padding: "1.25rem", ...S.col, gap: "0.85rem" }}>
            <div style={S.betweenWrap}>
              <h3 style={{ margin: 0, fontSize: "1.2rem" }}>
                [{activeGreenfieldStage.phaseCode}] {activeGreenfieldStage.title}
              </h3>
              <span style={{ ...S.monoTag, color: "var(--accent-bamboo-green)" }}>
                GATE: {activeGreenfieldStage.verificationGate}
              </span>
            </div>
            <p style={{ margin: 0, color: "var(--text-ash-slate)" }}>{activeGreenfieldStage.actionSummary}</p>
            <div style={{ ...S.grid3, fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
              <div className="cyber-chamfer" style={{ padding: "0.75rem" }}>
                <div style={{ color: "var(--accent-wok-gold)", fontWeight: 700 }}>{dictionary.xrayExplorer.layer1Label}</div>
                <div style={{ marginTop: "0.3rem" }}>{activeGreenfieldStage.xray.humanPrompt}</div>
              </div>
              <div className="cyber-chamfer" style={{ padding: "0.75rem" }}>
                <div style={{ color: "var(--accent-jade-wire)", fontWeight: 700 }}>{dictionary.xrayExplorer.layer2Label}</div>
                <div style={{ marginTop: "0.3rem" }}>{activeGreenfieldStage.xray.orchestratorTool}</div>
              </div>
              <div className="cyber-chamfer" style={{ padding: "0.75rem" }}>
                <div style={{ color: "var(--accent-bamboo-green)", fontWeight: 700 }}>{dictionary.xrayExplorer.layer3Label}</div>
                <div style={{ marginTop: "0.3rem" }}>{activeGreenfieldStage.xray.engineExecution}</div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section id="substrate" aria-label={dictionary.substrateSection.sectionTitle} style={S.col}>
        <div>
          <h2 style={{ fontSize: "clamp(1.65rem, 2.5vw + 0.5rem, 2.5rem)", marginBottom: "0.35rem" }}>
            {dictionary.substrateSection.sectionTitle}
          </h2>
          <p style={{ margin: 0, color: "var(--text-ash-slate)" }}>{dictionary.substrateSection.sectionSubtitle}</p>
        </div>

        <div style={S.grid3}>
          {[
            {
              layer: "LAYER 01 · .session-archive/blobs/<sha256>.txt",
              accent: "var(--accent-wok-gold)",
              subAccent: "var(--accent-jade-wire)",
              title: dictionary.substrateSection.spineTitle,
              subtitle: dictionary.substrateSection.spineSubtitle,
              desc: dictionary.substrateSection.spineDescription,
            },
            {
              layer: "LAYER 02 · index.sqlite + AST + PageRank RepoMap",
              accent: "var(--accent-jade-wire)",
              subAccent: "var(--accent-wok-gold)",
              title: dictionary.substrateSection.honeycombTitle,
              subtitle: dictionary.substrateSection.honeycombSubtitle,
              desc: dictionary.substrateSection.honeycombDescription,
            },
            {
              layer: "LAYER 03 · < 2 ms Prune · < 1,200 Tokens",
              accent: "var(--accent-bamboo-green)",
              subAccent: "var(--accent-dragon-ember)",
              title: dictionary.substrateSection.valveTitle,
              subtitle: dictionary.substrateSection.valveSubtitle,
              desc: dictionary.substrateSection.valveDescription,
            },
          ].map((card) => (
            <div key={card.layer} className="cyber-chamfer" style={{ padding: "1.25rem" }}>
              <div style={{ ...S.monoTag, color: card.accent }}>{card.layer}</div>
              <h3 style={{ margin: "0.35rem 0", fontSize: "1.25rem" }}>{card.title}</h3>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: card.subAccent, marginBottom: "0.5rem" }}>
                {card.subtitle}
              </div>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-ash-slate)" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="conversion" aria-label={dictionary.conversionSection.sectionTitle} style={S.col}>
        <div style={S.betweenWrap}>
          <div>
            <h2 style={{ fontSize: "clamp(1.65rem, 2.5vw + 0.5rem, 2.5rem)", marginBottom: "0.35rem" }}>
              {dictionary.conversionSection.sectionTitle}
            </h2>
            <p style={{ margin: 0, color: "var(--text-ash-slate)" }}>{dictionary.conversionSection.sectionSubtitle}</p>
          </div>

          <div style={S.rowWrap}>
            {(
              [
                { id: "builders", label: dictionary.conversionSection.audienceBuildersTab },
                { id: "supporters", label: dictionary.conversionSection.audienceSupportersTab },
                { id: "sponsors", label: dictionary.conversionSection.audienceSponsorsTab },
              ] as const
            ).map((tab) => {
              const active = activeAudience === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveAudience(tab.id)}
                  className="touch-target cyber-chamfer"
                  style={{
                    ...S.monoTag,
                    padding: "0 0.9rem",
                    fontSize: "0.8125rem",
                    backgroundColor: active ? "var(--bg-scroll-lacquer)" : "var(--bg-smoked-basalt)",
                    color: active ? "var(--accent-wok-gold)" : "var(--text-parchment)",
                    borderColor: active ? "var(--accent-wok-gold)" : "var(--border-forge-brass)",
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeAudience !== "sponsors" ? (
          <div style={S.grid3}>
            {visibleConversionItems.map((item) => {
              const accentHex = ACCENT_HEX_BY_TOKEN[item.accentToken];
              return (
                <div
                  key={item.id}
                  className="cyber-chamfer"
                  style={{
                    padding: "1.25rem",
                    borderColor: item.isHighlighted ? accentHex : "var(--border-forge-brass)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "0.85rem",
                  }}
                >
                  <div>
                    <span style={{ ...S.monoTag, color: accentHex }}>{item.badge}</span>
                    <h3 style={{ margin: "0.35rem 0", fontSize: "1.2rem" }}>{item.headline}</h3>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-ash-slate)" }}>{item.description}</p>
                  </div>
                  <div style={{ ...S.col, gap: "0.5rem" }}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target"
                      style={{
                        ...S.monoTag,
                        padding: "0 1rem",
                        backgroundColor: accentHex,
                        color: "#080B10",
                        fontSize: "0.8125rem",
                        borderRadius: "2px",
                        alignSelf: "flex-start",
                      }}
                    >
                      {item.label} ↗
                    </a>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-ash-slate)" }}>{item.disclosure}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={S.grid3}>
            {initialConversion.sponsorTiers.map((tier) => (
              <div
                key={tier.id}
                className="cyber-chamfer"
                style={{
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <div>
                  <div style={{ ...S.monoTag, color: "var(--accent-wok-gold)", fontSize: "0.8rem" }}>{tier.priceLabel}</div>
                  <h3 style={{ margin: "0.25rem 0", fontSize: "1.25rem" }}>{tier.name}</h3>
                  <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.875rem", color: "var(--text-ash-slate)" }}>{tier.tagline}</p>
                  <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.85rem", color: "var(--text-parchment)" }}>
                    {tier.deliverables.map((d) => (
                      <li key={d} style={{ marginBottom: "0.3rem" }}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tier.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target cyber-chamfer"
                  style={{ ...S.monoTag, padding: "0 1rem", fontSize: "0.8rem", color: "var(--accent-jade-wire)", borderColor: "var(--accent-jade-wire)" }}
                >
                  {tier.ctaLabel}
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="cyber-chamfer" style={{ ...S.col, padding: "1.5rem", backgroundColor: "var(--bg-scroll-lacquer)" }}>
          <div>
            <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.25rem" }}>{dictionary.conversionSection.calculatorTitle}</h3>
            <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-ash-slate)" }}>
              {dictionary.conversionSection.calculatorSubtitle}
            </p>
          </div>

          <div style={{ ...S.col, gap: "0.5rem" }}>
            <label htmlFor="quota-hours-slider" style={{ ...S.monoTag, fontSize: "0.875rem", color: "var(--accent-wok-gold)" }}>
              {dictionary.conversionSection.hoursPerWeekLabel}: {quotaEstimate.hoursPerWeek} hrs/wk
            </label>
            <input
              id="quota-hours-slider"
              type="range"
              min={5}
              max={80}
              step={5}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent-wok-gold)" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem", fontFamily: "var(--font-mono)" }}>
            <div style={S.xrayBox}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-ash-slate)" }}>{dictionary.conversionSection.baselineCostLabel}</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>${quotaEstimate.baselineMonthlyUsd}/mo</div>
            </div>
            <div style={S.xrayBox}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-ash-slate)" }}>{dictionary.conversionSection.optimizedCostLabel}</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--accent-jade-wire)" }}>${quotaEstimate.optimizedMonthlyUsd}/mo</div>
            </div>
            <div style={S.xrayBox}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-ash-slate)" }}>{dictionary.conversionSection.monthlySavingsLabel}</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--accent-bamboo-green)" }}>
                ${quotaEstimate.monthlySavingsUsd}/mo ({quotaEstimate.savingsPercentage}%)
              </div>
            </div>
            <div style={S.xrayBox}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-ash-slate)" }}>{dictionary.conversionSection.prunedTokensLabel}</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--accent-wok-gold)" }}>
                {(quotaEstimate.prunedTokensPerMonth / 1_000_000).toFixed(1)}M tok
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
