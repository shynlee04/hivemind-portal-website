import React from "react";
import type {
  HorizonTier,
  Locale,
  ReactorNodeId,
  WokReactorStageProps,
} from "@/types/portal";
import { ShowcaseHarness } from "@/modules/content-showroom";

export interface StoryMeta<TArgs> {
  readonly title: string;
  readonly component: React.ComponentType<TArgs>;
  readonly tags?: ReadonlyArray<string>;
  readonly args?: Partial<TArgs>;
}

export interface StoryObj<TArgs> {
  readonly name: string;
  readonly args: TArgs;
  readonly render?: (args: TArgs) => React.ReactElement;
}

const NODE_TELEMETRY_SUMMARY: Readonly<
  Record<
    ReactorNodeId,
    {
      readonly title: string;
      readonly models: string;
      readonly horizon: HorizonTier;
      readonly wire: string;
    }
  >
> = {
  devin: {
    title: "Devin ACP Steward",
    models: "swe-2-max",
    horizon: "shipped",
    wire: "JSON-RPC stdio · /devin & delegate-devin (ses_*)",
  },
  antigravity: {
    title: "Antigravity ACP Architect",
    models: "argon-4-high",
    horizon: "next-release",
    wire: "JSON-RPC stdio · /antigravity & cross-axis review",
  },
  freebuff: {
    title: "Freebuff 3rd-Harness Candidate",
    models: "deepseek-4.1-flash / glm-5.3-flash",
    horizon: "next-release",
    wire: "Ed25519 signed · rotated fbm1.... handle recovery + keepSlotForResume",
  },
  substrate: {
    title: "Hivemind Substrate 3-Layer Memory",
    models: "The Spine · The Honeycomb · Working-Set Valve",
    horizon: "roadmap",
    wire: ".session-archive/blobs/<sha256>.txt + index.sqlite (< 2 ms pruning)",
  },
};

export function WokReactorStageStoryPreview({
  activeHarness,
  activeHorizon = "all",
  reducedMotion = false,
  locale = "en",
}: WokReactorStageProps) {
  const nodeInfo = NODE_TELEMETRY_SUMMARY[activeHarness];
  const resolvedHorizon: HorizonTier =
    activeHorizon === "all" ? nodeInfo.horizon : activeHorizon;

  return (
    <ShowcaseHarness
      locale={locale as Locale}
      reducedMotion={reducedMotion}
      horizon={resolvedHorizon}
      componentName="WokReactorStage"
      title={`${nodeInfo.title} (${nodeInfo.models})`}
      description={nodeInfo.wire}
    >
      <div
        data-testid={`story-wok-node-${activeHarness}`}
        data-reduced-motion={String(reducedMotion)}
        style={{
          minHeight: "220px",
          display: "grid",
          gap: "0.75rem",
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
        }}
      >
        <div>
          <strong>Active Reactor Node:</strong> {activeHarness} ({nodeInfo.models})
        </div>
        <div>
          <strong>Render Adapter:</strong>{" "}
          {reducedMotion
            ? "DeterministicCanvasFallbackAdapter (Static High-Contrast SVG)"
            : "Three.js Cyber-Wok WebGL Reactor Stage"}
        </div>
        <div>
          <strong>Wire Contract:</strong> {nodeInfo.wire}
        </div>
      </div>
    </ShowcaseHarness>
  );
}

const meta: StoryMeta<WokReactorStageProps> = {
  title: "Cockpit/WokReactorStage",
  component: WokReactorStageStoryPreview,
  tags: ["autodocs"],
  args: {
    activeHarness: "devin",
    activeHorizon: "shipped",
    reducedMotion: false,
    locale: "en",
  },
};

export default meta;

export const DevinShippedWebGL: StoryObj<WokReactorStageProps> = {
  name: "Devin ACP · Shipped v0.1 (EN WebGL)",
  args: {
    activeHarness: "devin",
    activeHorizon: "shipped",
    reducedMotion: false,
    locale: "en",
  },
};

export const AntigravityNextReleaseVi: StoryObj<WokReactorStageProps> = {
  name: "Antigravity ACP · Next Release v0.2 (VI)",
  args: {
    activeHarness: "antigravity",
    activeHorizon: "next-release",
    reducedMotion: false,
    locale: "vi",
  },
};

export const FreebuffDeterministicReducedMotion: StoryObj<WokReactorStageProps> = {
  name: "Freebuff Candidate · Deterministic SVG Fallback",
  args: {
    activeHarness: "freebuff",
    activeHorizon: "next-release",
    reducedMotion: true,
    locale: "en",
  },
};

export const SubstrateRoadmapHoneycombVi: StoryObj<WokReactorStageProps> = {
  name: "Hivemind Substrate · Roadmap 3-Layer Memory (VI Reduced Motion)",
  args: {
    activeHarness: "substrate",
    activeHorizon: "roadmap",
    reducedMotion: true,
    locale: "vi",
  },
};
