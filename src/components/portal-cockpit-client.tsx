"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
  PARTNER_URLS,
  calculateQuotaSavings,
  resolveConversionCtas,
} from "@/modules/partner-conversion";

export interface PortalCockpitClientProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
  readonly horizons: ReadonlyArray<HorizonSummaryView>;
  readonly showcases: ReadonlyArray<ShowcaseCardView>;
  readonly greenfield: GreenfieldWalkthroughView;
  readonly initialConversion: ConversionBundle;
}

import { SignalFlowSection } from "./cockpit/signal-flow-section";
import { XrayWorkbenchSection } from "./cockpit/xray-workbench-section";
import { QuotaPartnerSection } from "./cockpit/quota-partner-section";
import { GreenfieldSubstrateSection } from "./cockpit/greenfield-substrate-section";

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
  const [activePluginFilter, setActivePluginFilter] = useState<PluginGroup | "all">("all");
  const [selectedSliceId, setSelectedSliceId] = useState<ShowcaseId>(
    initialConversion.sliceId ?? "S8"
  );
  const [activeGreenfieldStep, setActiveGreenfieldStep] = useState<number>(1);
  const [activeAudience, setActiveAudience] = useState<ConversionAudience>(
    initialConversion.activeAudience
  );
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(35);
  const [copiedCommand, setCopiedCommand] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [valvePrunedMode, setValvePrunedMode] = useState<boolean>(true);
  const [gatewayMode, setGatewayMode] = useState<"centralized" | "fragmented">("centralized");

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const filteredShowcases = useMemo(() => {
    return showcases.filter((item) => {
      if (activeHorizon !== "all" && item.horizon !== activeHorizon) {
        return false;
      }
      if (activePluginFilter !== "all" && item.plugin !== activePluginFilter) {
        return false;
      }
      return true;
    });
  }, [showcases, activeHorizon, activePluginFilter]);

  const activeShowcase: ShowcaseCardView | undefined = useMemo(() => {
    const exact = showcases.find((c) => c.id === selectedSliceId);
    if (exact) return exact;
    return filteredShowcases[0] ?? showcases[0];
  }, [showcases, filteredShowcases, selectedSliceId]);

  const activeGreenfieldItem = useMemo(() => {
    return (
      greenfield.steps.find((s) => s.stepNumber === activeGreenfieldStep) ??
      greenfield.steps[0]
    );
  }, [greenfield.steps, activeGreenfieldStep]);

  const conversionBundle = useMemo(() => {
    return resolveConversionCtas({
      audience: activeAudience,
      locale,
      sliceId: activeShowcase?.id,
    });
  }, [activeAudience, locale, activeShowcase?.id]);

  const allConversionItems = useMemo(() => {
    const bundle = resolveConversionCtas({
      audience: activeAudience,
      locale,
      sliceId: activeShowcase?.id,
    });
    const matched = bundle.items.filter((item) => item.audience === activeAudience);
    return matched.length > 0 ? matched : bundle.items;
  }, [activeAudience, locale, activeShowcase?.id]);

  const savings = useMemo(() => calculateQuotaSavings(hoursPerWeek), [hoursPerWeek]);

  const handleSelectReactorNode = (nodeId: ReactorNodeId) => {
    setActiveHarness(nodeId);
    const matchingClip = showcases.find((clip) => clip.harnessNode === nodeId);
    if (matchingClip) {
      setSelectedSliceId(matchingClip.id);
    }
  };

  const handleCopyInstall = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(dictionary.hero.installCommand);
      }
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    } catch {
      setCopiedCommand(true);
    }
  };

  const heroLines =
    locale === "vi"
      ? ["Mọi Đặc Vụ.", "Một Buồng Lái."]
      : ["All Agents.", "One Cockpit."];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* ACT 1: NEO-TOKYO SPLIT HERO COCKPIT FRONTING HIVEMIND-STEWARD */}
      <section
        id="cockpit"
        style={{
          scrollMarginTop: "5rem",
          paddingTop: "clamp(2.25rem, 4.5vw, 4.25rem)",
          paddingBottom: "clamp(3.5rem, 6.5vw, 5.5rem)",
        }}
      >
        <div className="cyber-shell">
          <div className="hero-cockpit-grid">
            {/* Left 42%: Vibecoder Value Proposition, Install CLI & Stage 1 Social Channels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
              <h1
                style={{
                  fontSize: "clamp(44px, 5vw, 72px)",
                  fontWeight: 700,
                  lineHeight: 1.02,
                  letterSpacing: "-0.038em",
                  margin: 0,
                  color: "var(--text-titanium)",
                }}
              >
                <span className="line-mask">
                  <span data-line="" style={{ "--i": 0 } as React.CSSProperties}>
                    {heroLines[0]}
                  </span>
                </span>
                <span className="line-mask">
                  <span
                    data-line=""
                    style={
                      {
                        "--i": 1,
                        color: "var(--accent-cyber-cyan)",
                      } as React.CSSProperties
                    }
                  >
                    {heroLines[1]}
                  </span>
                </span>
              </h1>

              <p
                data-rise=""
                style={
                  {
                    "--d": 1,
                    fontSize: "17px",
                    lineHeight: 1.6,
                    color: "var(--text-titanium)",
                    margin: 0,
                    maxWidth: "54ch",
                  } as React.CSSProperties
                }
              >
                {dictionary.hero.philosophySummary}
              </p>

              {/* TUI Command Install Bar */}
              <div
                data-rise=""
                style={
                  {
                    "--d": 2,
                    backgroundColor: "var(--bg-akihabara-deck)",
                    padding: "0.9rem 1.1rem",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.55rem",
                  } as React.CSSProperties
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                  }}
                >
                  <code
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--accent-cyber-cyan)",
                    }}
                  >
                    $ {dictionary.hero.installCommand}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyInstall}
                    className="touch-target"
                    style={{
                      padding: "0 1rem",
                      backgroundColor: copiedCommand
                        ? "var(--accent-matrix-mint)"
                        : "var(--accent-cyber-cyan)",
                      color: "var(--bg-tokyo-void)",
                      border: "none",
                      borderRadius: "4px",
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {copiedCommand
                      ? dictionary.hero.copiedCommandLabel
                      : dictionary.hero.copyCommandLabel}
                  </button>
                </div>
                <div style={{ fontSize: "14px", color: "var(--text-cyber-slate)", maxWidth: "58ch" }}>
                  {dictionary.hero.subheadline} 
                </div>
              </div>

              {/* Primary CTAs */}
              <div
                data-rise=""
                style={
                  {
                    "--d": 3,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  } as React.CSSProperties
                }
              >
                <a
                  href="#xray"
                  className="touch-target"
                  style={{
                    padding: "0 1.35rem",
                    backgroundColor: "var(--accent-voltage-gold)",
                    color: "var(--bg-tokyo-void)",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.hero.primaryCtaLabel}
                </a>
                <a
                  href="#conversion"
                  className="touch-target"
                  style={{
                    padding: "0 1.25rem",
                    backgroundColor: "var(--bg-kabuki-panel)",
                    color: "var(--text-titanium)",
                    borderRadius: "6px",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.hero.secondaryCtaLabel}
                </a>
              </div>

              {/* Stage 1 Social Launch & Community Channels (GitHub, YouTube, Reddit, Discord) */}
              <div
                data-rise=""
                style={
                  {
                    "--d": 4,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "0.5rem",
                    paddingTop: "0.25rem",
                  } as React.CSSProperties
                }
              >
                <span style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                  {locale === "vi" ? "Kênh Cộng Đồng Stage 1:" : "Stage 1 Launch Channels:"}
                </span>
                <a
                  href="https://youtube.com/@chingchongchingvibecoding"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-rise=""
                  className="touch-target"
                  style={{
                    padding: "0 0.75rem",
                    backgroundColor: "var(--bg-akihabara-deck)",
                    color: "var(--accent-neon-crimson)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  YouTube
                </a>
                <a
                  href="https://github.com/shynlee04/hivemind-steward-oc-devin-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-rise=""
                  className="touch-target"
                  style={{
                    padding: "0 0.75rem",
                    backgroundColor: "var(--bg-akihabara-deck)",
                    color: "var(--text-titanium)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  GitHub
                </a>
                <a
                  href="https://reddit.com/r/opencode"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-rise=""
                  className="touch-target"
                  style={{
                    padding: "0 0.75rem",
                    backgroundColor: "var(--bg-akihabara-deck)",
                    color: "var(--accent-voltage-gold)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Reddit
                </a>
                <a
                  href="https://discord.com/invite/opencode"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-rise=""
                  className="touch-target"
                  style={{
                    padding: "0 0.75rem",
                    backgroundColor: "var(--bg-akihabara-deck)",
                    color: "var(--accent-cyber-cyan)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Discord
                </a>
              </div>
            </div>

            {/* Right 58%: Interactive 3D Three.js Neo-Tokyo Orbital Command Stage */}
            <div data-rise="" style={{ "--d": 2 } as React.CSSProperties}>
              <WokReactorStage
                activeHarness={activeHarness}
                activeHorizon={activeHorizon}
                reducedMotion={reducedMotion}
                locale={locale}
                onSelectNode={handleSelectReactorNode}
              />
            </div>
          </div>
        </div>
      </section>

      <SignalFlowSection
        locale={locale}
        activeHarness={activeHarness}
        gatewayMode={gatewayMode}
        setGatewayMode={setGatewayMode}
        onSelectReactorNode={handleSelectReactorNode}
      />

      <XrayWorkbenchSection
        locale={locale}
        dictionary={dictionary}
        activeHorizon={activeHorizon}
        setActiveHorizon={setActiveHorizon}
        activePluginFilter={activePluginFilter}
        setActivePluginFilter={setActivePluginFilter}
        activeShowcase={activeShowcase}
        filteredShowcases={filteredShowcases}
        setSelectedSliceId={setSelectedSliceId}
        setActiveHarness={setActiveHarness}
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
        conversionBundle={conversionBundle}
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
    </div>
  );
}
