import React, { useMemo } from "react";
import Link from "next/link";
import type {
  HorizonTier,
  Locale,
  PluginGroup,
  PortalDictionary,
  ReactorNodeId,
  ShowcaseCardView,
  ShowcaseId,
} from "@/types/portal";
import { PARTNER_URLS } from "@/modules/partner-conversion";

export interface XrayWorkbenchSectionProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
  readonly activeHorizon: HorizonTier | "all";
  readonly setActiveHorizon: (h: HorizonTier | "all") => void;
  readonly activePluginFilter: PluginGroup | "all";
  readonly setActivePluginFilter: (p: PluginGroup | "all") => void;
  readonly activeShowcase: ShowcaseCardView | undefined;
  readonly filteredShowcases: ReadonlyArray<ShowcaseCardView>;
  readonly setSelectedSliceId: (id: ShowcaseId) => void;
  readonly setActiveHarness: (id: ReactorNodeId) => void;
}

const PRIORITY_SLICE_ORDER: ReadonlyArray<ShowcaseId> = [
  "S8",
  "S9",
  "S10",
  "S1",
  "S2",
  "S3",
  "S6",
  "S7",
  "M1",
  "M3",
  "M5",
  "C1",
];

export function XrayWorkbenchSection({
  locale,
  dictionary,
  activeHorizon,
  setActiveHorizon,
  activePluginFilter,
  setActivePluginFilter,
  activeShowcase,
  filteredShowcases,
  setSelectedSliceId,
  setActiveHarness,
}: XrayWorkbenchSectionProps) {
  const visibleShowcases = useMemo(() => {
    const rank = (id: ShowcaseId): number => {
      const idx = PRIORITY_SLICE_ORDER.indexOf(id);
      return idx === -1 ? 999 : idx;
    };
    return [...filteredShowcases]
      .sort((a, b) => rank(a.id) - rank(b.id))
      .slice(0, 12);
  }, [filteredShowcases]);

  return (
    <section
      id="xray"
      className="stage-screen"
      data-reveal=""
      style={{
        scrollMarginTop: "3.5rem",
        backgroundColor: "var(--bg-tokyo-void)",
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
            gap: "1rem",
            marginBottom: "0.65rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(28px, 2.5vw, 36px)",
                fontWeight: 500,
                marginBottom: "0.3rem",
              }}
            >
              {dictionary.xrayExplorer.sectionTitle}
            </h2>
            <p
              style={{
                color: "var(--text-titanium)",
                maxWidth: "54ch",
                margin: 0,
                fontSize: "16px",
              }}
            >
              {dictionary.xrayExplorer.sectionSubtitle}
            </p>
          </div>

          {/* Filter by Horizon */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {(
              [
                ["all", dictionary.horizons.filterAll],
                ["shipped", "v0.1 Shipped (Devin)"],
                ["next-release", "v0.2 Next (Multi-Pass)"],
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

        <div className="split-60-40">
          {/* Left 60%: Live 3-Layer Terminal X-Ray Drawer */}
          <div
            data-testid="xray-inspector-drawer"
            data-ui="true"
            data-reveal=""
            style={{
              backgroundColor: "var(--bg-akihabara-deck)",
              borderRadius: "8px",
              padding: "0.85rem 1.05rem",
            }}
          >
            {activeShowcase ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.65rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                    <code
                      style={{
                        padding: "0.2rem 0.55rem",
                        backgroundColor: "var(--bg-tokyo-void)",
                        color: "var(--accent-cyber-cyan)",
                        borderRadius: "4px",
                        fontWeight: 500,
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
                      padding: "0 0.8rem",
                      backgroundColor: "var(--bg-kabuki-panel)",
                      color: "var(--text-titanium)",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {locale === "vi" ? "Xem Video & Bản Ghi" : "Watch Video & Replay"}
                  </Link>
                </div>

                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 500, marginBottom: "0.25rem" }}>
                    {activeShowcase.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-titanium)",
                      margin: 0,
                      fontSize: "16px",
                      maxWidth: "54ch",
                    }}
                  >
                    {activeShowcase.summary}
                  </p>
                </div>

                {/* 3-Layer X-Ray Pipeline */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div
                    data-reveal=""
                    style={{
                      backgroundColor: "transparent",
                      borderLeft: "2px solid var(--bg-elevated-slate)",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "0px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--text-cyber-slate)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {dictionary.xrayExplorer.layer1Label}
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "var(--text-titanium)",
                        fontSize: "14px",
                      }}
                    >
                      <code>{activeShowcase.xray.humanPrompt}</code>
                    </pre>
                  </div>

                  <div
                    data-reveal=""
                    style={{
                      backgroundColor: "transparent",
                      borderLeft: "2px solid var(--bg-elevated-slate)",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "0px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--accent-cyber-cyan)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {dictionary.xrayExplorer.layer2Label}
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "var(--accent-cyber-cyan)",
                        fontSize: "14px",
                      }}
                    >
                      <code>{activeShowcase.xray.orchestratorTool}</code>
                    </pre>
                  </div>

                  <div
                    data-reveal=""
                    style={{
                      backgroundColor: "transparent",
                      borderLeft: "2px solid var(--bg-elevated-slate)",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "0px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--text-cyber-slate)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {dictionary.xrayExplorer.layer3Label}
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "var(--text-titanium)",
                        fontSize: "14px",
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
                    padding: "0.7rem 0.9rem",
                    borderRadius: "6px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ maxWidth: "54ch" }}>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--text-cyber-slate)",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {dictionary.xrayExplorer.proNotBroHeader}
                    </strong>
                    <span style={{ fontSize: "14px", color: "var(--text-titanium)" }}>
                      {activeShowcase.proNotBroLesson}
                    </span>
                  </div>

                  {activeShowcase.highlightsFreebuffReferral ? (
                    <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                      <a
                        href={PARTNER_URLS.freebuffReferral}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target"
                        style={{
                          padding: "0 0.85rem",
                          backgroundColor: "var(--accent-cyber-cyan)",
                          color: "var(--bg-tokyo-void)",
                          borderRadius: "6px",
                          fontWeight: 500,
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
                          padding: "0 0.85rem",
                          backgroundColor: "var(--bg-tokyo-void)",
                          color: "var(--text-titanium)",
                          borderRadius: "6px",
                          fontWeight: 400,
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

          {/* Right 40%: Non-Clipping Patch-Bay Selector Grid (S8 First, Zero Clipped Rows) */}
          <div
            data-ui="true"
            data-reveal=""
            style={{
              backgroundColor: "var(--bg-akihabara-deck)",
              borderRadius: "8px",
              padding: "1.1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "0.65rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.4rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                {(
                  [
                    ["all", dictionary.xrayExplorer.pluginAll],
                    ["steward", dictionary.xrayExplorer.pluginSteward],
                    ["substrate", dictionary.xrayExplorer.pluginSubstrate],
                  ] as const
                ).map(([plugKey, label]) => {
                  const isSelected = activePluginFilter === plugKey;
                  return (
                    <button
                      key={plugKey}
                      type="button"
                      onClick={() => setActivePluginFilter(plugKey)}
                      aria-pressed={isSelected}
                      className="touch-target"
                      style={{
                        padding: "0 0.7rem",
                        borderRadius: "4px",
                        border: "none",
                        backgroundColor: isSelected
                          ? "var(--text-titanium)"
                          : "var(--bg-kabuki-panel)",
                        color: isSelected
                          ? "var(--bg-tokyo-void)"
                          : "var(--text-cyber-slate)",
                        fontSize: "14px",
                        fontWeight: isSelected ? 500 : 400,
                        cursor: "pointer",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <code style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                {filteredShowcases.length} {locale === "vi" ? "lát cắt" : "slices"}
              </code>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "0.45rem",
              }}
            >
              {visibleShowcases.map((clip) => {
                const isSelected = activeShowcase?.id === clip.id;
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
                      justifyContent: "flex-start",
                      padding: "0.45rem 0.65rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: isSelected
                        ? "var(--text-titanium)"
                        : "var(--bg-kabuki-panel)",
                      color: isSelected
                        ? "var(--bg-tokyo-void)"
                        : "var(--text-titanium)",
                      cursor: "pointer",
                      textAlign: "left",
                      gap: "0.5rem",
                      minWidth: 0,
                    }}
                  >
                    <code
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: isSelected
                          ? "var(--bg-tokyo-void)"
                          : "var(--accent-cyber-cyan)",
                        flexShrink: 0,
                      }}
                    >
                      {clip.id}
                    </code>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: isSelected ? 500 : 400,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        minWidth: 0,
                      }}
                    >
                      {clip.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                backgroundColor: "var(--bg-tokyo-void)",
                borderRadius: "6px",
                padding: "0.65rem 0.8rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                {locale === "vi"
                  ? "Mở trọn bộ 20 lát cắt trong Showroom:"
                  : "Inspect all 20 slices in Showroom:"}
              </span>
              <Link
                href={`/${locale}/showroom`}
                className="touch-target"
                style={{
                  minHeight: "38px",
                  padding: "0 0.75rem",
                  backgroundColor: "var(--bg-kabuki-panel)",
                  color: "var(--text-titanium)",
                  borderRadius: "4px",
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
  );
}
