import React from "react";
import Link from "next/link";
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
  readonly setActiveHarness: (id: ReactorNodeId) => void;
  readonly valvePrunedMode: boolean;
  readonly setValvePrunedMode: (mode: boolean) => void;
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
}: GreenfieldSubstrateSectionProps) {
  return (
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
  );
}
