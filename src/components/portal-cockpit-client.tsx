"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  calculateQuotaSavings,
  resolveConversionCtas,
} from "@/modules/partner-conversion";
import { HARNESS_META } from "./cockpit/cockpit-shared";
import { SignalFlowSection } from "./cockpit/signal-flow-section";
import { XrayWorkbenchSection } from "./cockpit/xray-workbench-section";
import { GreenfieldSubstrateSection } from "./cockpit/greenfield-substrate-section";
import { QuotaPartnerSection } from "./cockpit/quota-partner-section";

export interface PortalCockpitClientProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
  readonly horizons: ReadonlyArray<HorizonSummaryView>;
  readonly showcases: ReadonlyArray<ShowcaseCardView>;
  readonly greenfield: GreenfieldWalkthroughView;
  readonly initialConversion: ConversionBundle;
}

export function PortalCockpitClient({
  locale,
  dictionary,
  horizons,
  showcases,
  greenfield,
  initialConversion,
}: PortalCockpitClientProps): React.JSX.Element {
  const [activeHarness, setActiveHarness] = useState<ReactorNodeId>("freebuff");
  const [activeHorizon, setActiveHorizon] = useState<HorizonTier | "all">("all");
  const [activePlugin, setActivePlugin] = useState<PluginGroup | "all">("all");
  const [selectedShowcaseId, setSelectedShowcaseId] = useState<ShowcaseId>("S8");
  const [activeXrayLayer, setActiveXrayLayer] = useState<
    "all" | 1 | 2 | 3
  >("all");
  const [activeGreenfieldStep, setActiveGreenfieldStep] = useState<number>(1);
  const [activeAudience, setActiveAudience] =
    useState<ConversionAudience>("builders");
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(35);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [heroVisualMode, setHeroVisualMode] = useState<"webgl" | "plate">("webgl");
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);
  const [valvePrunedMode, setValvePrunedMode] = useState<boolean>(true);

  useEffect(() => {
    const cycle: ReadonlyArray<ReactorNodeId> = [
      "freebuff",
      "devin",
      "antigravity",
      "substrate",
    ];
    let idx = 0;
    const timer = window.setInterval(() => {
      idx = (idx + 1) % cycle.length;
      const next = cycle[idx];
      if (next) setActiveHarness(next);
    }, 6400);
    return () => window.clearInterval(timer);
  }, []);

  const filteredShowcases = useMemo(() => {
    return showcases.filter((item) => {
      if (activeHorizon !== "all" && item.horizon !== activeHorizon) {
        return false;
      }
      if (activePlugin !== "all" && item.plugin !== activePlugin) {
        return false;
      }
      return true;
    });
  }, [showcases, activeHorizon, activePlugin]);

  const selectedShowcase = useMemo(() => {
    const inFiltered = filteredShowcases.find(
      (s) => s.id === selectedShowcaseId
    );
    if (inFiltered) return inFiltered;
    return filteredShowcases[0] ?? showcases[0];
  }, [filteredShowcases, selectedShowcaseId, showcases]);

  const activeGreenfieldItem = useMemo(() => {
    return (
      greenfield.steps.find((s) => s.stepNumber === activeGreenfieldStep) ??
      greenfield.steps[0]
    );
  }, [greenfield.steps, activeGreenfieldStep]);

  const liveConversion = useMemo(() => {
    try {
      return resolveConversionCtas({
        locale,
        audience: activeAudience,
        sliceId: selectedShowcase?.id,
      });
    } catch {
      return initialConversion;
    }
  }, [locale, activeAudience, selectedShowcase?.id, initialConversion]);

  const allConversionItems = useMemo(() => {
    try {
      const builders = resolveConversionCtas({
        locale,
        audience: "builders",
        sliceId: selectedShowcase?.id,
      }).items;
      const supporters = resolveConversionCtas({
        locale,
        audience: "supporters",
        sliceId: selectedShowcase?.id,
      }).items;
      const sponsors = resolveConversionCtas({
        locale,
        audience: "sponsors",
        sliceId: selectedShowcase?.id,
      }).items;
      const seen = new Set<string>();
      return [...builders, ...supporters, ...sponsors].filter((item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      });
    } catch {
      return liveConversion.items;
    }
  }, [locale, selectedShowcase?.id, liveConversion.items]);

  const savings = useMemo(
    () => calculateQuotaSavings(hoursPerWeek),
    [hoursPerWeek]
  );

  const handleCopyInstall = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(dictionary.hero.installCommand);
      }
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 1800);
    } catch {
      setCopiedInstall(true);
    }
  };

  const heroLines =
    locale === "vi"
      ? ["Ba Đặc Vụ.", "Một Chảo Lửa."]
      : ["Three Agents.", "One Wok."];

  const activeHarnessInfo = HARNESS_META[activeHarness];

  return (
    <div>
      {/* SECTION 0: FULL-VIEWPORT ASYMMETRIC SPLIT COCKPIT HERO */}
      <section
        id="cockpit"
        style={{
          minHeight: "calc(100dvh - 64px)",
          display: "flex",
          alignItems: "center",
          paddingTop: "clamp(1.75rem, 3.5vw, 3rem)",
          paddingBottom: "clamp(2.5rem, 4.5vw, 4rem)",
          backgroundColor: "var(--bg-wok-iron)",
        }}
      >
        <div className="cyber-shell" style={{ width: "100%" }}>
          <div className="hero-cockpit-grid">
            {/* Left 42%: Focal Point Copy, Command Bar & Node Telemetry Triggers */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              <h1
                style={{
                  fontSize: "clamp(44px, 5vw, 72px)",
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: "-0.035em",
                  margin: 0,
                  color: "var(--text-parchment)",
                }}
              >
                <span className="line-mask">
                  <span data-line="" style={{ ["--i" as string]: 0 }}>
                    {heroLines[0]}
                  </span>
                </span>
                <span className="line-mask">
                  <span
                    data-line=""
                    style={{
                      ["--i" as string]: 1,
                      color: "var(--accent-wok-gold)",
                    }}
                  >
                    {heroLines[1]}
                  </span>
                </span>
              </h1>

              <p
                data-rise=""
                style={{
                  ["--d" as string]: 1,
                  fontSize: "17px",
                  lineHeight: 1.6,
                  color: "var(--text-parchment)",
                  maxWidth: "54ch",
                  margin: 0,
                }}
              >
                {dictionary.hero.subheadline}
              </p>

              {/* Command Bar & Primary Action */}
              <div
                data-rise=""
                data-ui="hero-command-ledger"
                style={{
                  ["--d" as string]: 2,
                  backgroundColor: "var(--bg-smoked-basalt)",
                  padding: "1rem 1.15rem",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.65rem",
                  }}
                >
                  <code
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--accent-jade-wire)",
                      backgroundColor: "var(--bg-wok-iron)",
                      padding: "0.55rem 0.9rem",
                      borderRadius: "6px",
                      flex: "1 1 auto",
                    }}
                  >
                    $ {dictionary.hero.installCommand}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyInstall}
                    className="touch-target"
                    style={{
                      padding: "0 1.1rem",
                      backgroundColor: copiedInstall
                        ? "var(--accent-bamboo-green)"
                        : "var(--accent-wok-gold)",
                      color: "var(--bg-wok-iron)",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {copiedInstall
                      ? dictionary.hero.copiedCommandLabel
                      : dictionary.hero.copyCommandLabel}
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                    fontSize: "14px",
                    color: "var(--text-ash-slate)",
                  }}
                >
                  <span>{dictionary.hero.philosophyBadge}</span>
                  <code>v0.1 Shipped · v0.2 Tri-Harness · Substrate Lab</code>
                </div>
              </div>

              {/* Action CTA Row */}
              <div
                data-rise=""
                style={{
                  ["--d" as string]: 3,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
              >
                <a
                  href="#xray"
                  className="touch-target"
                  style={{
                    padding: "0 1.35rem",
                    backgroundColor: "var(--accent-jade-wire)",
                    color: "var(--bg-wok-iron)",
                    fontWeight: 700,
                    fontSize: "14px",
                    borderRadius: "6px",
                  }}
                >
                  {dictionary.hero.primaryCtaLabel} ↓
                </a>
                <a
                  href="#conversion"
                  className="touch-target"
                  style={{
                    padding: "0 1.25rem",
                    backgroundColor: "var(--bg-smoked-basalt)",
                    color: "var(--accent-wok-gold)",
                    fontWeight: 700,
                    fontSize: "14px",
                    borderRadius: "6px",
                  }}
                >
                  {dictionary.hero.secondaryCtaLabel}
                </a>
              </div>
            </div>

            {/* Right 58%: Interactive 3D WebGL Cyber-Wok Stage + Studio Hardware Cutaway Toggle */}
            <div
              data-rise=""
              style={{
                ["--d" as string]: 2,
                display: "flex",
                flexDirection: "column",
                gap: "0.55rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroVisualMode("webgl");
                      setReducedMotion(false);
                    }}
                    aria-pressed={heroVisualMode === "webgl" && !reducedMotion}
                    className="touch-target"
                    style={{
                      padding: "0 0.7rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor:
                        heroVisualMode === "webgl" && !reducedMotion
                          ? "var(--accent-wok-gold)"
                          : "var(--bg-smoked-basalt)",
                      color:
                        heroVisualMode === "webgl" && !reducedMotion
                          ? "var(--bg-wok-iron)"
                          : "var(--text-parchment)",
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {dictionary.hero.reducedMotionToggleOff}
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroVisualMode("plate")}
                    aria-pressed={heroVisualMode === "plate"}
                    className="touch-target"
                    style={{
                      padding: "0 0.7rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor:
                        heroVisualMode === "plate"
                          ? "var(--accent-jade-wire)"
                          : "var(--bg-smoked-basalt)",
                      color:
                        heroVisualMode === "plate"
                          ? "var(--bg-wok-iron)"
                          : "var(--text-parchment)",
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {locale === "vi" ? "Ảnh Chụp Cắt Lớp Lò" : "Studio Cutaway Plate"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroVisualMode("webgl");
                      setReducedMotion((prev) => !prev);
                    }}
                    aria-pressed={reducedMotion}
                    className="touch-target"
                    style={{
                      padding: "0 0.7rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: reducedMotion
                        ? "var(--accent-bamboo-green)"
                        : "var(--bg-smoked-basalt)",
                      color: reducedMotion
                        ? "var(--bg-wok-iron)"
                        : "var(--text-ash-slate)",
                      fontWeight: 600,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {dictionary.hero.reducedMotionToggleOn}
                  </button>
                </div>
              </div>

              {heroVisualMode === "plate" ? (
                <div
                  data-ui="wok-studio-plate"
                  style={{
                    position: "relative",
                    minHeight: "520px",
                    aspectRatio: "16 / 10",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#06090F",
                  }}
                >
                  <img
                    src="/assets/cyber-wok-hero-plate.jpg"
                    alt="Cyber-Wok Multi-Harness Reactor Hardware Cutaway"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: "auto 1rem 1rem 1rem",
                      backgroundColor: "rgba(8, 11, 16, 0.88)",
                      padding: "1rem 1.25rem",
                      borderRadius: "6px",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div>
                      <strong style={{ color: activeHarnessInfo.color, fontSize: "17px" }}>
                        {activeHarnessInfo.label}
                      </strong>
                      <div style={{ fontSize: "14px", color: "var(--text-ash-slate)" }}>
                        {locale === "vi" ? activeHarnessInfo.roleVi : activeHarnessInfo.roleEn}
                      </div>
                    </div>
                    <code style={{ color: "var(--accent-jade-wire)", fontSize: "14px" }}>
                      {activeHarnessInfo.modelCode}
                    </code>
                  </div>
                </div>
              ) : null}

              <div style={{ display: heroVisualMode === "plate" ? "none" : "block" }}>
                <WokReactorStage
                  activeHarness={activeHarness}
                  activeHorizon={activeHorizon}
                  reducedMotion={reducedMotion}
                  locale={locale}
                  onSelectNode={(node) => setActiveHarness(node)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SignalFlowSection
        locale={locale}
        dictionary={dictionary}
        horizons={horizons}
        activeHorizon={activeHorizon}
        setActiveHorizon={setActiveHorizon}
        activeHarness={activeHarness}
        setActiveHarness={setActiveHarness}
      />

      <XrayWorkbenchSection
        locale={locale}
        dictionary={dictionary}
        activePlugin={activePlugin}
        setActivePlugin={setActivePlugin}
        activeHorizon={activeHorizon}
        setActiveHorizon={setActiveHorizon}
        filteredShowcases={filteredShowcases}
        selectedShowcase={selectedShowcase}
        setSelectedShowcaseId={setSelectedShowcaseId}
        setActiveHarness={setActiveHarness}
        activeXrayLayer={activeXrayLayer}
        setActiveXrayLayer={setActiveXrayLayer}
      />

      <GreenfieldSubstrateSection
        locale={locale}
        dictionary={dictionary}
        greenfield={greenfield}
        activeGreenfieldItem={activeGreenfieldItem}
        setActiveGreenfieldStep={setActiveGreenfieldStep}
        setActiveHarness={setActiveHarness}
        valvePrunedMode={valvePrunedMode}
        setValvePrunedMode={setValvePrunedMode}
      />

      <QuotaPartnerSection
        locale={locale}
        dictionary={dictionary}
        hoursPerWeek={hoursPerWeek}
        setHoursPerWeek={setHoursPerWeek}
        savings={savings}
        activeAudience={activeAudience}
        setActiveAudience={setActiveAudience}
        allConversionItems={allConversionItems}
      />
    </div>
  );
}
