import React from "react";
import type {
  HorizonTier,
  Locale,
  PluginGroup,
  PortalDictionary,
  ReactorNodeId,
  ShowcaseCardView,
  ShowcaseId,
} from "@/types/portal";
import { HARNESS_META } from "./cockpit-shared";

export interface XrayWorkbenchSectionProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
  readonly activePlugin: PluginGroup | "all";
  readonly setActivePlugin: (p: PluginGroup | "all") => void;
  readonly activeHorizon: HorizonTier | "all";
  readonly setActiveHorizon: (h: HorizonTier | "all") => void;
  readonly filteredShowcases: ReadonlyArray<ShowcaseCardView>;
  readonly selectedShowcase: ShowcaseCardView | undefined;
  readonly setSelectedShowcaseId: (id: ShowcaseId) => void;
  readonly setActiveHarness: (n: ReactorNodeId) => void;
  readonly activeXrayLayer: "all" | 1 | 2 | 3;
  readonly setActiveXrayLayer: (t: "all" | 1 | 2 | 3) => void;
}

export function XrayWorkbenchSection({
  locale,
  dictionary,
  activePlugin,
  setActivePlugin,
  activeHorizon,
  setActiveHorizon,
  filteredShowcases,
  selectedShowcase,
  setSelectedShowcaseId,
  setActiveHarness,
  activeXrayLayer,
  setActiveXrayLayer,
}: XrayWorkbenchSectionProps): React.JSX.Element {
  return (
    <section
        id="xray"
        data-reveal=""
        style={{
          paddingTop: "clamp(5rem, 9vw, 8.5rem)",
          paddingBottom: "clamp(5rem, 9vw, 8.5rem)",
          backgroundColor: "var(--bg-wok-iron)",
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
                  marginBottom: "0.6rem",
                }}
              >
                {dictionary.xrayExplorer.sectionTitle}
              </h2>
              <p
                style={{
                  color: "var(--text-parchment)",
                  maxWidth: "60ch",
                  margin: 0,
                  fontSize: "17px",
                }}
              >
                {dictionary.xrayExplorer.sectionSubtitle}
              </p>
            </div>

            {/* Plugin Seam Filter Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              {(
                [
                  ["all", dictionary.xrayExplorer.pluginAll],
                  ["steward", dictionary.xrayExplorer.pluginSteward],
                  ["substrate", dictionary.xrayExplorer.pluginSubstrate],
                  ["cross-plugin", dictionary.xrayExplorer.pluginCross],
                ] as const
              ).map(([pluginKey, label]) => {
                const isSelected = activePlugin === pluginKey;
                return (
                  <button
                    key={pluginKey}
                    type="button"
                    onClick={() => setActivePlugin(pluginKey)}
                    aria-pressed={isSelected}
                    className="touch-target"
                    style={{
                      padding: "0 0.95rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: isSelected
                        ? "var(--accent-wok-gold)"
                        : "var(--bg-smoked-basalt)",
                      color: isSelected
                        ? "var(--bg-wok-iron)"
                        : "var(--text-parchment)",
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
            {/* Left 62%: Interactive 3-Layer X-Ray Pipeline Workbench (data-ui) */}
            {selectedShowcase ? (
              <div
                data-testid="xray-inspector-drawer"
                data-ui="xray-inspector-workbench"
                style={{
                  maxHeight: "980px",
                  overflowY: "auto",
                  backgroundColor: "var(--bg-smoked-basalt)",
                  borderRadius: "8px",
                  padding: "clamp(1.35rem, 2.5vw, 2rem)",
                  display: "flex",
                  flexDirection: "column",
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
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <code
                      style={{
                        padding: "0.3rem 0.65rem",
                        backgroundColor: "var(--accent-wok-gold)",
                        color: "var(--bg-wok-iron)",
                        fontWeight: 800,
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    >
                      {selectedShowcase.id}
                    </code>
                    <strong style={{ fontSize: "17px" }}>
                      {selectedShowcase.title}
                    </strong>
                  </div>
                  <code
                    style={{
                      fontSize: "14px",
                      color: "var(--accent-jade-wire)",
                      backgroundColor: "var(--bg-wok-iron)",
                      padding: "0.3rem 0.65rem",
                      borderRadius: "4px",
                    }}
                  >
                    {selectedShowcase.horizonBadge} · {selectedShowcase.durationLabel}
                  </code>
                </div>

                <p style={{ margin: 0, color: "var(--text-parchment)", fontSize: "17px" }}>
                  {selectedShowcase.summary}
                </p>

                {/* Visual 3-Stage Pipeline Selector Infographic */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    backgroundColor: "var(--bg-wok-iron)",
                    padding: "0.45rem",
                    borderRadius: "6px",
                  }}
                >
                  {(
                    [
                      ["all", locale === "vi" ? "Trọn 3 Tầng" : "All 3 Layers", "#EEF2F6"],
                      [1, "1 · Prompt", "#F5A623"],
                      [2, "2 · JSON-RPC", "#22D3EE"],
                      [3, "3 · Engine Wire", "#10B981"],
                    ] as const
                  ).map(([layerId, label, accent]) => {
                    const isSelected = activeXrayLayer === layerId;
                    return (
                      <button
                        key={String(layerId)}
                        type="button"
                        onClick={() => setActiveXrayLayer(layerId)}
                        aria-pressed={isSelected}
                        className="touch-target"
                        style={{
                          flex: "1 1 110px",
                          padding: "0.45rem 0.65rem",
                          borderRadius: "4px",
                          border: "none",
                          backgroundColor: isSelected
                            ? "var(--bg-scroll-lacquer)"
                            : "transparent",
                          color: isSelected ? accent : "var(--text-ash-slate)",
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

                {/* Animated 3-Layer Wire Execution Flow */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "#06090F", padding: "1.15rem", borderRadius: "6px" }}>
                  {(activeXrayLayer === "all" || activeXrayLayer === 1) && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          color: "var(--accent-wok-gold)",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <strong>{dictionary.xrayExplorer.layer1Label}</strong>
                        <code>OpenCode TUI Stdin</code>
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          whiteSpace: "pre-wrap",
                          fontSize: "14px",
                          color: "var(--text-parchment)",
                        }}
                      >
                        <code>{selectedShowcase.xray.humanPrompt}</code>
                      </pre>
                    </div>
                  )}

                  {(activeXrayLayer === "all" || activeXrayLayer === 2) && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          color: "var(--accent-jade-wire)",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <strong>{dictionary.xrayExplorer.layer2Label}</strong>
                        <code>{selectedShowcase.sourceGrounding}</code>
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          whiteSpace: "pre-wrap",
                          fontSize: "14px",
                          color: "var(--accent-jade-wire)",
                        }}
                      >
                        <code>{selectedShowcase.xray.orchestratorTool}</code>
                      </pre>
                    </div>
                  )}

                  {(activeXrayLayer === "all" || activeXrayLayer === 3) && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          color: "var(--accent-bamboo-green)",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <strong>{dictionary.xrayExplorer.layer3Label}</strong>
                        <code>{selectedShowcase.harnessNode.toUpperCase()}</code>
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          whiteSpace: "pre-wrap",
                          fontSize: "14px",
                          color: "var(--accent-bamboo-green)",
                        }}
                      >
                        <code>{selectedShowcase.xray.engineExecution}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* Pro, Not Bro Architectural Pass-Down Footer */}
                <div
                  style={{
                    backgroundColor: "var(--bg-scroll-lacquer)",
                    padding: "1rem 1.2rem",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                  }}
                >
                  <strong style={{ fontSize: "14px", color: "var(--accent-wok-gold)" }}>
                    {dictionary.xrayExplorer.proNotBroHeader}
                  </strong>
                  <p style={{ margin: 0, fontSize: "17px", color: "var(--text-parchment)" }}>
                    {selectedShowcase.proNotBroLesson}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Right 38%: Compact Two-Ended 20-Slice Interactive Trace Selector */}
            <div
              data-ui="xray-slice-selector"
              style={{
                backgroundColor: "var(--bg-smoked-basalt)",
                borderRadius: "8px",
                padding: "1.25rem",
                maxHeight: "660px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.25rem 0.5rem 0.65rem 0.5rem",
                  fontSize: "14px",
                  color: "var(--text-ash-slate)",
                }}
              >
                <strong>
                  {locale === "vi"
                    ? `Danh Mục Lát Cắt (${filteredShowcases.length}/20)`
                    : `Capability Trace Index (${filteredShowcases.length}/20)`}
                </strong>
                <code>Click row to X-Ray</code>
              </div>

              {filteredShowcases.map((clip) => {
                const isSelected = selectedShowcase?.id === clip.id;
                const nodeMeta = HARNESS_META[clip.harnessNode];
                return (
                  <button
                    key={clip.id}
                    type="button"
                    onClick={() => {
                      setSelectedShowcaseId(clip.id);
                      setActiveHarness(clip.harnessNode);
                    }}
                    aria-pressed={isSelected}
                    className="touch-target"
                    style={{
                      width: "100%",
                      justifyContent: "space-between",
                      padding: "0.55rem 0.85rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: isSelected
                        ? "var(--bg-scroll-lacquer)"
                        : "transparent",
                      color: "var(--text-parchment)",
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
                            ? "var(--accent-wok-gold)"
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

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexShrink: 0,
                      }}
                    >
                      <code
                        style={{
                          fontSize: "14px",
                          color: "var(--text-ash-slate)",
                        }}
                      >
                        {clip.durationLabel}
                      </code>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
  );
}
