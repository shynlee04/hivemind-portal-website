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
    badge: "[SHOWCASE HARNESS · STORYBOOK 8 & ISOLATED STAGE]",
    defaultTitle: "Cyber-Wok Component Showroom Harness",
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
    badge: "[KHUNG TRÌNH DIỄN · STORYBOOK 8 & SÂN KHẤU ĐỘC LẬP]",
    defaultTitle: "Khung Thử Nghiệm Thành Phần Cyber-Wok",
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
      data-locale={activeLocale}
      data-reduced-motion={String(activeReducedMotion)}
      data-horizon={activeHorizon}
      data-component={componentName}
      style={{
        backgroundColor: "var(--bg-smoked-basalt, #111622)",
        border: "1px solid var(--border-forge-brass, #3A2E1E)",
        borderRadius: "2px",
        color: "var(--text-parchment, #F4EFE6)",
        padding: "1.5rem",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid var(--border-forge-brass, #3A2E1E)",
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
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              
              fontSize: "0.8125rem",
              color: "var(--accent-wok-gold, #F5A623)",
            }}
          >
            {copy.badge} · {componentName}
          </span>
          <span
            data-testid="showcase-harness-horizon-badge"
            style={{
              
              fontSize: "0.8125rem",
              color:
                activeHorizon === "shipped"
                  ? "var(--accent-wok-gold, #F5A623)"
                  : activeHorizon === "next-release"
                    ? "var(--accent-jade-wire, #22D3EE)"
                    : "var(--accent-dragon-ember, #EF4444)",
            }}
          >
            {activeHorizonBadge}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-sans, 'Be Vietnam Pro', system-ui, sans-serif)",
            fontSize: "clamp(1.35rem, 2vw + 0.5rem, 1.85rem)",
            fontWeight: 700,
            lineHeight: 1.24,
            margin: "0 0 0.5rem 0",
          }}
        >
          {resolvedTitle}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans, 'Be Vietnam Pro', system-ui, sans-serif)",
            fontSize: "1rem",
            lineHeight: 1.65,
            color: "var(--text-ash-slate, #94A3B8)",
            margin: 0,
            maxWidth: "66ch",
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
            gap: "0.75rem",
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
                    padding: "0.5rem 0.875rem",
                    borderRadius: "2px",
                    border: "1px solid var(--border-forge-brass, #3A2E1E)",
                    backgroundColor: isSelected
                      ? "var(--accent-wok-gold, #F5A623)"
                      : "var(--bg-scroll-lacquer, #171F2E)",
                    color: isSelected
                      ? "var(--bg-wok-iron, #080B10)"
                      : "var(--text-parchment, #F4EFE6)",
                    
                    fontWeight: 700,
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
                    padding: "0.5rem 0.75rem",
                    borderRadius: "2px",
                    border: "1px solid var(--border-forge-brass, #3A2E1E)",
                    backgroundColor: isSelected
                      ? "var(--accent-jade-wire, #22D3EE)"
                      : "var(--bg-scroll-lacquer, #171F2E)",
                    color: isSelected
                      ? "var(--bg-wok-iron, #080B10)"
                      : "var(--text-parchment, #F4EFE6)",
                    
                    fontSize: "0.8125rem",
                    fontWeight: 600,
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
              padding: "0.5rem 0.875rem",
              borderRadius: "2px",
              border: "1px solid var(--border-forge-brass, #3A2E1E)",
              backgroundColor: activeReducedMotion
                ? "var(--accent-bamboo-green, #10B981)"
                : "var(--bg-scroll-lacquer, #171F2E)",
              color: activeReducedMotion
                ? "var(--bg-wok-iron, #080B10)"
                : "var(--text-parchment, #F4EFE6)",
              
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {activeReducedMotion ? copy.motionLabelOn : copy.motionLabelOff}
          </button>

          <span
            style={{
              
              fontSize: "0.75rem",
              color: "var(--accent-bamboo-green, #10B981)",
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
          backgroundColor: "var(--bg-wok-iron, #080B10)",
          border: "1px solid var(--border-forge-brass, #3A2E1E)",
          borderRadius: "2px",
          padding: "1.25rem",
        }}
      >
        {renderedChildren ?? (
          <div
            data-testid="showcase-harness-default-stage"
            style={{
              
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "var(--text-parchment, #F4EFE6)",
            }}
          >
            <p style={{ margin: "0 0 0.5rem 0" }}>{copy.defaultStageNote}</p>
            <code
              style={{
                display: "block",
                color: "var(--accent-jade-wire, #22D3EE)",
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
