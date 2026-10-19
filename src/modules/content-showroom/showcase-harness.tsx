"use client";

import React, { useState, type ReactNode } from "react";
import {
  HORIZON_TIERS,
  SUPPORTED_LOCALES,
  type HorizonTier,
  type Locale,
} from "@/types/portal";

export interface ShowcaseHarnessRenderState {
  readonly locale: Locale;
  readonly reducedMotion: boolean;
  readonly horizon: HorizonTier;
}

export interface ShowcaseHarnessProps {
  readonly title?: string;
  readonly description?: string;
  readonly locale?: Locale;
  readonly defaultLocale?: Locale;
  readonly reducedMotion?: boolean;
  readonly defaultReducedMotion?: boolean;
  readonly horizon?: HorizonTier;
  readonly defaultHorizon?: HorizonTier;
  readonly componentName?: string;
  readonly onLocaleChange?: (locale: Locale) => void;
  readonly onReducedMotionChange?: (reducedMotion: boolean) => void;
  readonly onHorizonChange?: (horizon: HorizonTier) => void;
  readonly children?:
    | ReactNode
    | ((state: ShowcaseHarnessRenderState) => ReactNode);
}

const HORIZON_BADGE_MAP: Readonly<
  Record<Locale, Readonly<Record<HorizonTier, string>>>
> = {
  en: {
    shipped: "[SHIPPED NOW · v0.1]",
    "next-release": "[NEXT RELEASE · v0.2]",
    roadmap: "[ROADMAP LAB · SUBSTRATE]",
  },
  vi: {
    shipped: "[ĐÃ PHÁT HÀNH · v0.1]",
    "next-release": "[BẢN KẾ TIẾP · v0.2]",
    roadmap: "[PHÒNG LAB LỘ TRÌNH · SUBSTRATE]",
  },
};

const HARNESS_CHROME_COPY: Readonly<
  Record<
    Locale,
    {
      readonly badge: string;
      readonly defaultTitle: string;
      readonly defaultDescription: string;
      readonly localeGroupLabel: string;
      readonly motionLabelOn: string;
      readonly motionLabelOff: string;
      readonly horizonGroupLabel: string;
      readonly a11yStatusLabel: string;
      readonly defaultStageNote: string;
    }
  >
> = {
  en: {
    badge: "Storybook 8 & Isolated UI Stage",
    defaultTitle: "Neo-Tokyo Component Showroom Harness",
    defaultDescription:
      "Inspect isolated portal modules with live EN/VI dictionary switching, 3-Horizon maturity filtering, and deterministic reduced-motion SVG fallbacks.",
    localeGroupLabel: "Locale",
    motionLabelOn: "Reduced Motion: ON (Deterministic SVG)",
    motionLabelOff: "Reduced Motion: OFF (WebGL 3D Loop)",
    horizonGroupLabel: "Horizon Tier",
    a11yStatusLabel: "WCAG AA/AAA · >= 44×44px Hit Targets",
    defaultStageNote:
      "Active isolated showroom stage ready. Toggle EN/VI, HorizonTier, or Reduced Motion above to verify deterministic rendering.",
  },
  vi: {
    badge: "Storybook 8 & Sân Khấu UI Độc Lập",
    defaultTitle: "Khung Thử Nghiệm Thành Phần Neo-Tokyo",
    defaultDescription:
      "Kiểm tra độc lập từng mô-đun cổng thông tin với chuyển đổi song ngữ EN/VI tức thời, bộ lọc 3 Chân Trời và chế độ SVG dự phòng tất định.",
    localeGroupLabel: "Ngôn ngữ",
    motionLabelOn: "Giảm Chuyển Động: BẬT (SVG Tất Định)",
    motionLabelOff: "Giảm Chuyển Động: TẮT (Vòng Lặp WebGL 3D)",
    horizonGroupLabel: "Chân Trời",
    a11yStatusLabel: "Chuẩn WCAG AA/AAA · Vùng Chạm >= 44×44px",
    defaultStageNote:
      "Sân khấu trình diễn độc lập đã sẵn sàng. Chuyển đổi EN/VI, Chân Trời hoặc Giảm Chuyển Động phía trên để kiểm chứng hiển thị tất định.",
  },
};

export function ShowcaseHarness({
  title,
  description,
  locale: controlledLocale,
  defaultLocale = "en",
  reducedMotion: controlledReducedMotion,
  defaultReducedMotion = false,
  horizon: controlledHorizon,
  defaultHorizon = "shipped",
  componentName = "WokReactorStage",
  onLocaleChange,
  onReducedMotionChange,
  onHorizonChange,
  children,
}: ShowcaseHarnessProps) {
  const [internalLocale, setInternalLocale] = useState<Locale>(
    controlledLocale ?? defaultLocale
  );
  const [internalReducedMotion, setInternalReducedMotion] = useState<boolean>(
    controlledReducedMotion ?? defaultReducedMotion
  );
  const [internalHorizon, setInternalHorizon] = useState<HorizonTier>(
    controlledHorizon ?? defaultHorizon
  );

  const activeLocale = controlledLocale ?? internalLocale;
  const activeReducedMotion = controlledReducedMotion ?? internalReducedMotion;
  const activeHorizon = controlledHorizon ?? internalHorizon;

  const copy = HARNESS_CHROME_COPY[activeLocale];
  const activeHorizonBadge = HORIZON_BADGE_MAP[activeLocale][activeHorizon];
  const resolvedTitle = title ?? copy.defaultTitle;
  const resolvedDescription = description ?? copy.defaultDescription;

  const handleLocaleSelect = (nextLocale: Locale) => {
    setInternalLocale(nextLocale);
    onLocaleChange?.(nextLocale);
  };

  const handleReducedMotionToggle = () => {
    const nextValue = !activeReducedMotion;
    setInternalReducedMotion(nextValue);
    onReducedMotionChange?.(nextValue);
  };

  const handleHorizonSelect = (nextHorizon: HorizonTier) => {
    setInternalHorizon(nextHorizon);
    onHorizonChange?.(nextHorizon);
  };

  const renderState: ShowcaseHarnessRenderState = {
    locale: activeLocale,
    reducedMotion: activeReducedMotion,
    horizon: activeHorizon,
  };

  const renderedChildren =
    typeof children === "function" ? children(renderState) : children;

  return (
    <section
      data-testid="showcase-harness"
      data-ui="showcase-harness"
      data-locale={activeLocale}
      data-reduced-motion={String(activeReducedMotion)}
      data-horizon={activeHorizon}
      data-component={componentName}
      style={{
        backgroundColor: "var(--bg-akihabara-deck, #0E1015)",
        borderRadius: "6px",
        color: "var(--text-titanium, #F2F4F8)",
        padding: "1.5rem",
      }}
    >
      <header
        style={{
          paddingBottom: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            marginBottom: "0.45rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-sans, 'Be Vietnam Pro', system-ui, sans-serif)",
              fontSize: "clamp(28px, 2.5vw, 36px)",
              fontWeight: 500,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {resolvedTitle}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "14px",
                color: "var(--text-cyber-slate, #A8B3C4)",
              }}
            >
              {copy.badge} / {componentName}
            </span>
            <span
              data-testid="showcase-harness-horizon-badge"
              style={{
                fontSize: "14px",
                color: "var(--accent-cyber-cyan, #00E5FF)",
              }}
            >
              {activeHorizonBadge}
            </span>
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--font-sans, 'Be Vietnam Pro', system-ui, sans-serif)",
            fontSize: "16px",
            lineHeight: 1.55,
            color: "var(--text-titanium, #F2F4F8)",
            margin: 0,
            maxWidth: "54ch",
          }}
        >
          {resolvedDescription}
        </p>

        <div
          role="toolbar"
          aria-label={copy.badge}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.65rem",
            marginTop: "1rem",
          }}
        >
          <div
            role="group"
            aria-label={copy.localeGroupLabel}
            style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}
          >
            {SUPPORTED_LOCALES.map((loc) => {
              const isSelected = loc === activeLocale;
              return (
                <button
                  key={loc}
                  type="button"
                  data-testid={`harness-locale-${loc}`}
                  aria-pressed={isSelected}
                  onClick={() => handleLocaleSelect(loc)}
                  className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
                  style={{
                    minHeight: "44px",
                    minWidth: "44px",
                    padding: "0.45rem 0.85rem",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: isSelected
                      ? "var(--text-titanium, #F2F4F8)"
                      : "var(--bg-kabuki-panel, #161920)",
                    color: isSelected
                      ? "var(--bg-tokyo-void, #07080B)"
                      : "var(--text-cyber-slate, #A8B3C4)",
                    fontSize: "14px",
                    fontWeight: isSelected ? 500 : 400,
                    cursor: "pointer",
                  }}
                >
                  {loc.toUpperCase()}
                </button>
              );
            })}
          </div>

          <div
            role="group"
            aria-label={copy.horizonGroupLabel}
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.375rem" }}
          >
            {HORIZON_TIERS.map((tier) => {
              const isSelected = tier === activeHorizon;
              return (
                <button
                  key={tier}
                  type="button"
                  data-testid={`harness-horizon-${tier}`}
                  aria-pressed={isSelected}
                  onClick={() => handleHorizonSelect(tier)}
                  className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
                  style={{
                    minHeight: "44px",
                    minWidth: "44px",
                    padding: "0.45rem 0.75rem",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: isSelected
                      ? "var(--text-titanium, #F2F4F8)"
                      : "var(--bg-kabuki-panel, #161920)",
                    color: isSelected
                      ? "var(--bg-tokyo-void, #07080B)"
                      : "var(--text-cyber-slate, #A8B3C4)",
                    fontSize: "14px",
                    fontWeight: isSelected ? 500 : 400,
                    cursor: "pointer",
                  }}
                >
                  {HORIZON_BADGE_MAP[activeLocale][tier]}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            data-testid="harness-reduced-motion-toggle"
            aria-pressed={activeReducedMotion}
            onClick={handleReducedMotionToggle}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
            style={{
              minHeight: "44px",
              minWidth: "44px",
              padding: "0.45rem 0.85rem",
              borderRadius: "4px",
              border: "none",
              backgroundColor: activeReducedMotion
                ? "var(--text-titanium, #F2F4F8)"
                : "var(--bg-kabuki-panel, #161920)",
              color: activeReducedMotion
                ? "var(--bg-tokyo-void, #07080B)"
                : "var(--text-cyber-slate, #A8B3C4)",
              fontSize: "14px",
              fontWeight: activeReducedMotion ? 500 : 400,
              cursor: "pointer",
            }}
          >
            {activeReducedMotion ? copy.motionLabelOn : copy.motionLabelOff}
          </button>

          <span
            style={{
              fontSize: "14px",
              color: "var(--text-cyber-slate, #A8B3C4)",
              marginLeft: "auto",
            }}
          >
            {copy.a11yStatusLabel}
          </span>
        </div>
      </header>

      <div
        data-testid="showcase-harness-canvas"
        style={{
          backgroundColor: "var(--bg-tokyo-void, #07080B)",
          borderRadius: "6px",
          padding: "1.25rem",
        }}
      >
        {renderedChildren ?? (
          <div
            data-testid="showcase-harness-default-stage"
            style={{
              fontSize: "16px",
              lineHeight: 1.55,
              color: "var(--text-titanium, #F2F4F8)",
            }}
          >
            <p style={{ margin: "0 0 0.5rem 0", maxWidth: "54ch" }}>{copy.defaultStageNote}</p>
            <code
              style={{
                display: "block",
                fontSize: "14px",
                color: "var(--accent-cyber-cyan, #00E5FF)",
              }}
            >
              {`{ locale: "${activeLocale}", horizon: "${activeHorizon}", reducedMotion: ${String(activeReducedMotion)} }`}
            </code>
          </div>
        )}
      </div>
    </section>
  );
}
