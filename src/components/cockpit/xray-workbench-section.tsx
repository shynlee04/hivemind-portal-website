import React from "react";
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
import { HARNESS_META } from "./cockpit-shared";

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
  return (
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
  );
}
