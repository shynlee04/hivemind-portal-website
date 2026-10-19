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
import { SignalFlowSection } from "./cockpit/signal-flow-section";
import { XrayWorkbenchSection } from "./cockpit/xray-workbench-section";
import { QuotaPartnerSection } from "./cockpit/quota-partner-section";
import { GreenfieldSubstrateSection } from "./cockpit/greenfield-substrate-section";

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

    if (!mq.matches) {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-line], [data-rise], [data-reveal]")
      );
      const timers: number[] = [];
      nodes.forEach((el, idx) => {
        const t = window.setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translate3d(0px, 0px, 0px)";
        }, 120 + (idx % 12) * 45);
        timers.push(t);
      });

      let io: IntersectionObserver | null = null;
      if (typeof IntersectionObserver !== "undefined") {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry, idx) => {
              if (entry.isIntersecting && entry.target instanceof HTMLElement) {
                const target = entry.target;
                target.style.opacity = "1";
                target.style.transform = `translateY(${idx % 2 === 0 ? "0px" : "0.01px"})`;
              }
            });
          },
          { threshold: 0.08 }
        );
        nodes.forEach((el) => io?.observe(el));
      }

      return () => {
        mq.removeEventListener("change", listener);
        timers.forEach((id) => window.clearTimeout(id));
        io?.disconnect();
      };
    }

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
    if (activeAudience === "sponsors") {
      return bundle.items.filter((item) => item.audience === "sponsors");
    }
    return bundle.items.filter(
      (item) => item.audience === "builders" || item.audience === "supporters"
    );
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
      ? ["Mọi Harness.", "Một Buồng Lái."]
      : ["All Harnesses.", "One Cockpit."];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* SCREEN 1 (0..900px): .site-header (56px) + #cockpit.stage-hero (844px) */}
      <section
        id="cockpit"
        className="stage-hero"
        style={{
          scrollMarginTop: "3.5rem",
          backgroundColor: "var(--bg-tokyo-void)",
        }}
      >
        <div className="cyber-shell">
          <div className="hero-cockpit-grid">
            {/* Left 42%: Vibecoder Value Proposition, Install CLI & Stage 1 Social Channels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h1
                style={{
                  fontSize: "clamp(32px, 3.8vw, 52px)",
                  fontWeight: 500,
                  lineHeight: 1.06,
                  letterSpacing: "-0.03em",
                  margin: 0,
                  color: "var(--text-titanium)",
                }}
              >
                <span className="line-mask">
                  <span data-line="" style={{ "--i": 0, whiteSpace: "nowrap" } as React.CSSProperties}>
                    {heroLines[0]}
                  </span>
                </span>
                <span className="line-mask">
                  <span
                    data-line=""
                    style={
                      {
                        "--i": 1,
                        whiteSpace: "nowrap",
                        color: "var(--text-titanium)",
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
                    fontSize: "16px",
                    lineHeight: 1.55,
                    color: "var(--text-titanium)",
                    margin: 0,
                    maxWidth: "54ch",
                  } as React.CSSProperties
                }
              >
                {dictionary.hero.subheadline}
              </p>

              {/* TUI Command Install Bar */}
              <div
                data-rise=""
                style={
                  {
                    "--d": 2,
                    backgroundColor: "var(--bg-akihabara-deck)",
                    padding: "0.85rem 1rem",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.45rem",
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
                      fontWeight: 500,
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
                      padding: "0 0.9rem",
                      backgroundColor: copiedCommand
                        ? "var(--text-titanium)"
                        : "var(--bg-kabuki-panel)",
                      color: copiedCommand
                        ? "var(--bg-tokyo-void)"
                        : "var(--text-titanium)",
                      border: "none",
                      borderRadius: "4px",
                      fontWeight: 500,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {copiedCommand
                      ? dictionary.hero.copiedCommandLabel
                      : dictionary.hero.copyCommandLabel}
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    color: "var(--text-titanium)",
                    margin: 0,
                    maxWidth: "54ch",
                  }}
                >
                  {dictionary.hero.philosophySummary}
                </p>
              </div>

              {/* Single Primary CTA + Monochrome Secondary CTA */}
              <div
                data-rise=""
                style={
                  {
                    "--d": 3,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.65rem",
                  } as React.CSSProperties
                }
              >
                <a
                  href="#xray"
                  className="touch-target"
                  style={{
                    padding: "0 1.25rem",
                    backgroundColor: "var(--accent-cyber-cyan)",
                    color: "var(--bg-tokyo-void)",
                    borderRadius: "6px",
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.hero.primaryCtaLabel}
                </a>
                <a
                  href="#gateway"
                  className="touch-target"
                  style={{
                    padding: "0 1.15rem",
                    backgroundColor: "var(--bg-kabuki-panel)",
                    color: "var(--text-titanium)",
                    borderRadius: "6px",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {dictionary.hero.secondaryCtaLabel}
                </a>
              </div>

              {/* Stage 1 Social Launch & Community Channels */}
              <div
                data-rise=""
                style={
                  {
                    "--d": 4,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "0.45rem",
                  } as React.CSSProperties
                }
              >
                <span style={{ fontSize: "14px", color: "var(--text-cyber-slate)" }}>
                  {locale === "vi" ? "Kênh Cộng Đồng:" : "Community Channels:"}
                </span>
                <a
                  href="https://youtube.com/@chingchongchingvibecoding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target"
                  style={{
                    padding: "0 0.7rem",
                    backgroundColor: "var(--bg-kabuki-panel)",
                    color: "var(--text-cyber-slate)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  YouTube
                </a>
                <a
                  href="https://github.com/shynlee04/hivemind-steward-oc-devin-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target"
                  style={{
                    padding: "0 0.7rem",
                    backgroundColor: "var(--bg-kabuki-panel)",
                    color: "var(--text-cyber-slate)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  GitHub
                </a>
                <a
                  href="https://reddit.com/r/opencode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target"
                  style={{
                    padding: "0 0.7rem",
                    backgroundColor: "var(--bg-kabuki-panel)",
                    color: "var(--text-cyber-slate)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  Reddit
                </a>
                <a
                  href="https://discord.com/invite/opencode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target"
                  style={{
                    padding: "0 0.7rem",
                    backgroundColor: "var(--bg-kabuki-panel)",
                    color: "var(--text-cyber-slate)",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 400,
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

      {/* SCREEN 2 (900..1800px): #gateway.stage-screen */}
      <SignalFlowSection
        locale={locale}
        dictionary={dictionary}
        activeHarness={activeHarness}
        gatewayMode={gatewayMode}
        setGatewayMode={setGatewayMode}
        onSelectReactorNode={handleSelectReactorNode}
        hoursPerWeek={hoursPerWeek}
        setHoursPerWeek={setHoursPerWeek}
        savings={savings}
      />

      {/* SCREEN 3 (1800..2700px): #xray.stage-screen */}
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

      {/* SCREEN 4 (2700..3600px): #conversion.stage-screen */}
      <QuotaPartnerSection
        locale={locale}
        dictionary={dictionary}
        activeAudience={activeAudience}
        setActiveAudience={setActiveAudience}
        allConversionItems={allConversionItems}
        conversionBundle={conversionBundle}
      />

      {/* SCREEN 5 (3600..4500px): #greenfield.stage-final + .site-footer */}
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
