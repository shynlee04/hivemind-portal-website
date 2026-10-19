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
      className="stage-final"
      data-reveal=""
      style={{
        scrollMarginTop: "3.5rem",
        backgroundColor: "var(--bg-tokyo-void)",
      }}
    >
      <div className="cyber-shell" style={{ display: "flex", flexDirection: "column", gap: "0.42rem" }}>
        {/* Top Half: Compact 5-Minute Greenfield Stepper */}
        <div
          data-reveal=""
          style={{
            backgroundColor: "var(--bg-akihabara-deck)",
            borderRadius: "8px",
            padding: "0.45rem 0.85rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.65rem",
              marginBottom: "0.28rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(24px, 2.1vw, 30px)",
                  lineHeight: 1.12,
                  fontWeight: 500,
                  marginBottom: "0.15rem",
                }}
              >
                {dictionary.greenfieldSection.sectionTitle}
              </h2>
              <p
                style={{
                  color: "var(--text-titanium)",
                  maxWidth: "54ch",
                  margin: 0,
                  fontSize: "16px",
                }}
              >
                {dictionary.greenfieldSection.sectionSubtitle}
              </p>
            </div>
            <code
              style={{
                fontSize: "14px",
                padding: "0.25rem 0.6rem",
                backgroundColor: "var(--bg-tokyo-void)",
                color: "var(--accent-cyber-cyan)",
                borderRadius: "4px",
              }}
            >
              {dictionary.greenfieldSection.verificationBadge}
            </code>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
              marginBottom: "0.28rem",
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
                    flex: "1 1 130px",
                    padding: "0.35rem 0.7rem",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: isSelected
                      ? "var(--text-titanium)"
                      : "var(--bg-kabuki-panel)",
                    color: isSelected
                      ? "var(--bg-tokyo-void)"
                      : "var(--text-cyber-slate)",
                    fontWeight: isSelected ? 500 : 400,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.4rem",
                    textAlign: "left",
                  }}
                >
                  <code
                    style={{
                      color: isSelected ? "var(--bg-tokyo-void)" : "var(--text-titanium)",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    {step.phaseCode} ({hMeta.label})
                  </code>
                </button>
              );
            })}
          </div>

          {activeGreenfieldItem ? (
            <div className="split-62-38" style={{ alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <h3 style={{ fontSize: "20px", fontWeight: 500, margin: 0 }}>
                    {activeGreenfieldItem.phaseCode}: {activeGreenfieldItem.title}
                  </h3>
                  <code
                    style={{
                      fontSize: "14px",
                      color: "var(--accent-cyber-cyan)",
                      backgroundColor: "var(--bg-tokyo-void)",
                      padding: "0.18rem 0.5rem",
                      borderRadius: "4px",
                    }}
                  >
                    {activeGreenfieldItem.modelSlot}
                  </code>
                </div>

                <p
                  style={{
                    margin: 0,
                    color: "var(--text-titanium)",
                    fontSize: "16px",
                    maxWidth: "54ch",
                  }}
                >
                  {activeGreenfieldItem.actionSummary}
                </p>

                <pre
                  style={{
                    margin: 0,
                    padding: "0.35rem 0.65rem",
                    backgroundColor: "var(--bg-tokyo-void)",
                    borderRadius: "6px",
                    color: "var(--accent-cyber-cyan)",
                    overflowX: "hidden",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontSize: "14px",
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
                  borderRadius: "6px",
                  overflow: "hidden",
                  backgroundColor: "var(--bg-tokyo-void)",
                  backgroundImage: "url('/assets/greenfield-forge-plate.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <video
                  src="/assets/greenfield-loop.mp4"
                  poster="/assets/greenfield-forge-plate.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Neo-Tokyo Broadcast Video Deck"
                  style={{
                    width: "100%",
                    height: "96px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* Bottom Half: Compact 4-Column Hivemind-Substrate Roadmap Skeleton & Stage 2 Links */}
        <div
          data-reveal=""
          style={{
            backgroundColor: "var(--bg-akihabara-deck)",
            borderRadius: "8px",
            padding: "0.45rem 0.85rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.65rem",
              marginBottom: "0.28rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(24px, 2.1vw, 30px)",
                  lineHeight: 1.12,
                  fontWeight: 500,
                  margin: "0 0 0.15rem 0",
                }}
              >
                {dictionary.substrateSection.sectionTitle}
              </h2>
              <p
                style={{
                  color: "var(--text-titanium)",
                  maxWidth: "54ch",
                  margin: 0,
                  fontSize: "16px",
                }}
              >
                {dictionary.substrateSection.sectionSubtitle}
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="https://youtu.be/tgTFweV7bLo"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target"
                style={{
                  padding: "0 0.75rem",
                  borderRadius: "6px",
                  backgroundColor: "var(--bg-kabuki-panel)",
                  color: "var(--accent-cyber-cyan)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                {locale === "vi" ? "Xem Video Substrate" : "Watch Substrate Teaser"}
              </a>
              <button
                type="button"
                onClick={() => setValvePrunedMode(false)}
                aria-pressed={!valvePrunedMode}
                className="touch-target"
                style={{
                  padding: "0 0.8rem",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: !valvePrunedMode
                    ? "var(--text-titanium)"
                    : "var(--bg-kabuki-panel)",
                  color: !valvePrunedMode
                    ? "var(--bg-tokyo-void)"
                    : "var(--text-cyber-slate)",
                  fontWeight: !valvePrunedMode ? 500 : 400,
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
                  padding: "0 0.8rem",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: valvePrunedMode
                    ? "var(--text-titanium)"
                    : "var(--bg-kabuki-panel)",
                  color: valvePrunedMode
                    ? "var(--bg-tokyo-void)"
                    : "var(--text-cyber-slate)",
                  fontWeight: valvePrunedMode ? 500 : 400,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {locale === "vi" ? "Qua Van < 2 ms: 1.140 Token" : "Valve < 2 ms: 1,140 Tokens"}
              </button>
            </div>
          </div>

          {/* Open typographic 4-column layout (no boxed card backgrounds) */}
          <div className="tonal-4-grid">
            <div data-reveal="" style={{ padding: "0.15rem 0" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 500, margin: "0 0 0.2rem 0" }}>
                {dictionary.substrateSection.spineTitle}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  color: "var(--text-titanium)",
                  maxWidth: "48ch",
                }}
              >
                {dictionary.substrateSection.spineDescription}
              </p>
            </div>

            <div data-reveal="" style={{ padding: "0.15rem 0" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 500, margin: "0 0 0.2rem 0" }}>
                {dictionary.substrateSection.honeycombTitle}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  color: "var(--text-titanium)",
                  maxWidth: "48ch",
                }}
              >
                {dictionary.substrateSection.honeycombDescription}
              </p>
            </div>

            <div data-reveal="" style={{ padding: "0.15rem 0" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 500, margin: "0 0 0.2rem 0" }}>
                {dictionary.substrateSection.valveTitle}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  color: "var(--text-titanium)",
                  maxWidth: "48ch",
                }}
              >
                {dictionary.substrateSection.valveDescription}
              </p>
            </div>

            <div
              data-reveal=""
              style={{
                padding: "0.15rem 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.35rem",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: 500, margin: 0, color: "var(--accent-cyber-cyan)" }}>
                {valvePrunedMode ? "1,140 Tokens" : "48,000 Tokens"}
              </h3>
              <img
                src="/assets/substrate-honeycomb-plate.jpg"
                alt="Hivemind Substrate Roadmap Skeleton"
                style={{
                  width: "100%",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Stage 2 Content & Component Showroom Bar */}
          <div
            style={{
              marginTop: "0.28rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.65rem",
            }}
          >
            <span style={{ color: "var(--text-cyber-slate)", fontSize: "14px" }}>
              {locale === "vi"
                ? "Khung Stage 2 (Payload CMS 3.0 & Storybook 8): Bài viết kỹ thuật, Video thực chiến & Phòng thử UI"
                : "Stage 2 Scaffold (Payload CMS 3.0 & Storybook 8): Engineering Notes, Video Showcases & UI Showroom"}
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              <Link
                href={`/${locale}/blog`}
                className="touch-target"
                style={{
                  minHeight: "38px",
                  padding: "0 0.85rem",
                  backgroundColor: "var(--accent-cyber-cyan)",
                  color: "var(--bg-tokyo-void)",
                  borderRadius: "6px",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                {dictionary.nav.blogLink}
              </Link>
              <Link
                href={`/${locale}/episodes`}
                className="touch-target"
                style={{
                  minHeight: "38px",
                  padding: "0 0.85rem",
                  backgroundColor: "var(--bg-kabuki-panel)",
                  color: "var(--text-titanium)",
                  borderRadius: "6px",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              >
                {dictionary.nav.episodesLink}
              </Link>
              <Link
                href={`/${locale}/showroom`}
                className="touch-target"
                style={{
                  minHeight: "38px",
                  padding: "0 0.85rem",
                  backgroundColor: "var(--bg-kabuki-panel)",
                  color: "var(--text-titanium)",
                  borderRadius: "6px",
                  fontWeight: 400,
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
