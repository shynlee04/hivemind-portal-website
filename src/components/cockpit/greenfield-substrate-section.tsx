import React from "react";
import type {
  GreenfieldWalkthroughView,
  Locale,
  PortalDictionary,
  ReactorNodeId,
} from "@/types/portal";
import { HARNESS_META } from "./cockpit-shared";

export interface GreenfieldSubstrateSectionProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
  readonly greenfield: GreenfieldWalkthroughView;
  readonly activeGreenfieldItem: GreenfieldWalkthroughView["steps"][number] | undefined;
  readonly setActiveGreenfieldStep: (step: number) => void;
  readonly setActiveHarness: (n: ReactorNodeId) => void;
  readonly valvePrunedMode: boolean;
  readonly setValvePrunedMode: (v: boolean) => void;
}

export function GreenfieldSubstrateSection({
  locale,
  dictionary,
  greenfield,
  activeGreenfieldItem,
  setActiveGreenfieldStep,
  setActiveHarness,
  valvePrunedMode,
  setValvePrunedMode,
}: GreenfieldSubstrateSectionProps): React.JSX.Element {
  return (
    <section
        id="greenfield"
        data-reveal=""
        style={{
          paddingTop: "clamp(5rem, 9vw, 8.5rem)",
          paddingBottom: "clamp(5rem, 9vw, 8.5rem)",
          backgroundColor: "var(--bg-smoked-basalt)",
        }}
      >
        <div className="cyber-shell">
          {/* Part A: Interactive 5-Minute Greenfield Timeline Scrubber */}
          <div style={{ marginBottom: "4.5rem" }}>
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
                  {dictionary.greenfieldSection.sectionTitle}
                </h2>
                <p
                  style={{
                    color: "var(--text-parchment)",
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
                  padding: "0.45rem 0.85rem",
                  backgroundColor: "var(--bg-wok-iron)",
                  color: "var(--accent-bamboo-green)",
                  borderRadius: "6px",
                }}
              >
                {dictionary.greenfieldSection.verificationBadge}
              </code>
            </div>

            {/* Interactive V1 - V5 Timeline Scrubber Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                backgroundColor: "var(--bg-wok-iron)",
                padding: "0.6rem",
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
                      flex: "1 1 160px",
                      padding: "0.65rem 0.9rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: isSelected
                        ? "var(--bg-scroll-lacquer)"
                        : "transparent",
                      color: "var(--text-parchment)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                      textAlign: "left",
                    }}
                  >
                    <code style={{ color: hMeta.color, fontWeight: 800, fontSize: "14px" }}>
                      {step.phaseCode} · {hMeta.label}
                    </code>
                  </button>
                );
              })}
            </div>

            {/* Active Greenfield Slice Inspector + Horological Forge Plate */}
            {activeGreenfieldItem ? (
              <div
                className="split-62-38"
                
                style={{
                  backgroundColor: "var(--bg-wok-iron)",
                  borderRadius: "8px",
                  padding: "clamp(1.25rem, 2.5vw, 2rem)",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
                      {activeGreenfieldItem.phaseCode} · {HARNESS_META[activeGreenfieldItem.harnessId].label}
                    </h3>
                    <code
                      style={{
                        fontSize: "14px",
                        color: "var(--accent-wok-gold)",
                        backgroundColor: "var(--bg-smoked-basalt)",
                        padding: "0.3rem 0.65rem",
                        borderRadius: "4px",
                      }}
                    >
                      {activeGreenfieldItem.modelSlot}
                    </code>
                  </div>

                  <p style={{ margin: 0, fontWeight: 700, fontSize: "17px", color: "var(--text-parchment)" }}>
                    {activeGreenfieldItem.title}
                  </p>

                  <p style={{ margin: 0, color: "var(--text-parchment)", fontSize: "17px" }}>
                    {activeGreenfieldItem.actionSummary}
                  </p>

                  <pre
                    style={{
                      margin: 0,
                      padding: "1rem",
                      backgroundColor: "#05080D",
                      borderRadius: "6px",
                      fontSize: "14px",
                      color: "var(--accent-jade-wire)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <code>
                      $ {activeGreenfieldItem.xray.orchestratorTool}
                      {"\n"}→ {activeGreenfieldItem.xray.engineExecution}
                      {"\n"}[PASS] Gate: {activeGreenfieldItem.verificationGate}
                    </code>
                  </pre>
                </div>

                <div
                  style={{
                    borderRadius: "6px",
                    overflow: "hidden",
                    aspectRatio: "16 / 10",
                    backgroundColor: "#05080D",
                  }}
                >
                  <img
                    src="/assets/greenfield-forge-plate.jpg" className="plate-drift"
                    alt="Tri-Harness Greenfield Forge Escapement"
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

          {/* Part B: Interactive 3-Layer Substrate Memory & Context-Pruning Infographic */}
          <div>
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
                  {dictionary.substrateSection.sectionTitle}
                </h2>
                <p
                  style={{
                    color: "var(--text-parchment)",
                    maxWidth: "60ch",
                    margin: 0,
                    fontSize: "17px",
                  }}
                >
                  {dictionary.substrateSection.sectionSubtitle}
                </p>
              </div>

              {/* Interactive Valve Toggle: Raw 48K Bloat vs < 1,200-Token Pruned Packet */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => setValvePrunedMode(false)}
                  aria-pressed={!valvePrunedMode}
                  className="touch-target"
                  style={{
                    padding: "0 1rem",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: !valvePrunedMode
                      ? "var(--accent-dragon-ember)"
                      : "var(--bg-wok-iron)",
                    color: "var(--text-parchment)",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {locale === "vi" ? "Trước Khi Tỉa: 48.000 Token" : "Unpruned Dump: 48,000 Tokens"}
                </button>
                <button
                  type="button"
                  onClick={() => setValvePrunedMode(true)}
                  aria-pressed={valvePrunedMode}
                  className="touch-target"
                  style={{
                    padding: "0 1rem",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: valvePrunedMode
                      ? "var(--accent-bamboo-green)"
                      : "var(--bg-wok-iron)",
                    color: valvePrunedMode
                      ? "var(--bg-wok-iron)"
                      : "var(--text-parchment)",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {locale === "vi"
                    ? "Qua Van < 2 ms: 1.140 Token (-97,6%)"
                    : "Working-Set Valve < 2 ms: 1,140 Tokens (-97.6%)"}
                </button>
              </div>
            </div>

            {/* Unified Tonal Ledger + Substrate Honeycomb Visual Plate (unboxed child columns to prevent card-rows) */}
            <div
              style={{
                backgroundColor: "var(--bg-wok-iron)",
                borderRadius: "8px",
                padding: "clamp(1.5rem, 3vw, 2.25rem)",
              }}
            >
              <div className="tonal-4-grid">
                <div>
                  <code style={{ color: "var(--accent-wok-gold)", fontSize: "14px" }}>
                    .session-archive/blobs/
                  </code>
                  <h3 style={{ fontSize: "22px", margin: "0.5rem 0" }}>
                    The Spine
                  </h3>
                  <p style={{ margin: 0, fontSize: "17px", color: "var(--text-parchment)" }}>
                    {dictionary.substrateSection.spineDescription}
                  </p>
                </div>

                <div>
                  <code style={{ color: "var(--accent-jade-wire)", fontSize: "14px" }}>
                    index.sqlite · BM25 + AST
                  </code>
                  <h3 style={{ fontSize: "22px", margin: "0.5rem 0" }}>
                    The Honeycomb
                  </h3>
                  <p style={{ margin: 0, fontSize: "17px", color: "var(--text-parchment)" }}>
                    {dictionary.substrateSection.honeycombDescription}
                  </p>
                </div>

                <div>
                  <code style={{ color: "var(--accent-bamboo-green)", fontSize: "14px" }}>
                    &lt; 2 ms · &lt; 1,200 tokens
                  </code>
                  <h3 style={{ fontSize: "22px", margin: "0.5rem 0" }}>
                    Working-Set Valve
                  </h3>
                  <p style={{ margin: 0, fontSize: "17px", color: "var(--text-parchment)" }}>
                    {dictionary.substrateSection.valveDescription}
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem" }}>
                  <div>
                    <code style={{ color: "var(--accent-wok-gold)", fontSize: "14px" }}>
                      CompactionContinuationPacket
                    </code>
                    <h3 style={{ fontSize: "22px", margin: "0.5rem 0" }}>
                      {valvePrunedMode ? "1,140 Tokens" : "48,000 Tokens"}
                    </h3>
                    <div
                      style={{
                        height: "12px",
                        backgroundColor: "var(--bg-smoked-basalt)",
                        borderRadius: "6px",
                        overflow: "hidden",
                        margin: "0.65rem 0",
                      }}
                    >
                      <div
                        style={{
                          width: valvePrunedMode ? "8%" : "100%",
                          height: "100%",
                          backgroundColor: valvePrunedMode
                            ? "var(--accent-bamboo-green)"
                            : "var(--accent-dragon-ember)",
                          transition: "width var(--dur-med) var(--ease-out)",
                        }}
                      />
                    </div>
                  </div>
                  <img
                    src="/assets/substrate-honeycomb-plate.jpg" className="plate-drift"
                    alt="Hivemind Substrate 3-Layer Memory Vault"
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
          </div>
        </div>
      </section>
  );
}
