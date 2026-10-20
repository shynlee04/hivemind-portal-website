import { z } from "zod";

export const SUPPORTED_LOCALES = ["en", "vi"] as const;
export const LocaleSchema = z.enum(SUPPORTED_LOCALES);
export type Locale = z.infer<typeof LocaleSchema>;

export const HORIZON_TIERS = ["shipped", "next-release", "roadmap"] as const;
export const HorizonTierSchema = z.enum(HORIZON_TIERS);
export type HorizonTier = z.infer<typeof HorizonTierSchema>;

export const PLUGIN_GROUPS = ["steward", "substrate", "cross-plugin"] as const;
export const PluginGroupSchema = z.enum(PLUGIN_GROUPS);
export type PluginGroup = z.infer<typeof PluginGroupSchema>;

export const REACTOR_NODE_IDS = [
  "devin",
  "antigravity",
  "freebuff",
  "substrate",
] as const;
export const ReactorNodeIdSchema = z.enum(REACTOR_NODE_IDS);
export type ReactorNodeId = z.infer<typeof ReactorNodeIdSchema>;

export const SHOWCASE_IDS = [
  "S1",
  "S2",
  "S3",
  "S4",
  "S5",
  "S6",
  "S7",
  "S8",
  "S9",
  "S10",
  "M1",
  "M2",
  "M3",
  "M4",
  "M5",
  "M6",
  "M7",
  "M8",
  "M9",
  "C1",
] as const;
export const ShowcaseIdSchema = z.enum(SHOWCASE_IDS);
export type ShowcaseId = z.infer<typeof ShowcaseIdSchema>;

export const CONVERSION_AUDIENCES = [
  "builders",
  "supporters",
  "sponsors",
] as const;
export const ConversionAudienceSchema = z.enum(CONVERSION_AUDIENCES);
export type ConversionAudience = z.infer<typeof ConversionAudienceSchema>;

export const ThreeLayerXRaySchema = z.object({
  humanPrompt: z.string().min(1),
  orchestratorTool: z.string().min(1),
  engineExecution: z.string().min(1),
});
export type ThreeLayerXRay = z.infer<typeof ThreeLayerXRaySchema>;

export interface ShowcaseCardView {
  readonly id: ShowcaseId;
  readonly plugin: PluginGroup;
  readonly horizon: HorizonTier;
  readonly horizonBadge: string;
  readonly harnessNode: ReactorNodeId;
  readonly durationLabel: string;
  readonly title: string;
  readonly subtitle: string;
  readonly summary: string;
  readonly sourceGrounding: string;
  readonly xray: ThreeLayerXRay;
  readonly proNotBroLesson: string;
  readonly highlightsFreebuffReferral: boolean;
}

export interface ShowcaseQuery {
  readonly locale: Locale;
  readonly plugin?: PluginGroup | "all";
  readonly horizon?: HorizonTier | "all";
  readonly harnessNode?: ReactorNodeId | "all";
}

export interface GreenfieldStageStep {
  readonly stepNumber: number;
  readonly phaseCode: "V1" | "V2" | "V3" | "V4" | "V5";
  readonly harnessId: ReactorNodeId;
  readonly modelSlot: string;
  readonly title: string;
  readonly actionSummary: string;
  readonly xray: ThreeLayerXRay;
  readonly verificationGate: string;
}

export interface GreenfieldWalkthroughView {
  readonly id: "GREENFIELD-5MIN";
  readonly title: string;
  readonly subtitle: string;
  readonly durationLabel: string;
  readonly overview: string;
  readonly proNotBroLesson: string;
  readonly steps: ReadonlyArray<GreenfieldStageStep>;
}

export interface HorizonSummaryView {
  readonly horizon: HorizonTier;
  readonly badge: string;
  readonly canonicalScope: string;
  readonly description: string;
  readonly sourceGrounding: string;
  readonly primaryNode: ReactorNodeId;
}

export interface ReactorNodeDescriptor {
  readonly id: ReactorNodeId;
  readonly label: string;
  readonly roleBadge: string;
  readonly modelIds: ReadonlyArray<string>;
  readonly horizon: HorizonTier;
  readonly horizonBadge: string;
  readonly accentHex: string;
  readonly wireProtocol: string;
  readonly description: string;
  readonly sampleCommand: string;
  readonly telemetryMetrics: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
  }>;
}

export interface WokReactorStageProps {
  readonly activeHarness: ReactorNodeId;
  readonly activeHorizon?: HorizonTier | "all";
  readonly reducedMotion?: boolean;
  readonly locale?: Locale;
  readonly onSelectNode?: (id: ReactorNodeId) => void;
}

export interface ConversionCtaItem {
  readonly id: string;
  readonly audience: ConversionAudience;
  readonly label: string;
  readonly badge: string;
  readonly headline: string;
  readonly description: string;
  readonly href: string;
  readonly disclosure: string;
  readonly isHighlighted: boolean;
  readonly accentToken: "wok-gold" | "jade-wire" | "dragon-ember" | "bamboo-green";
}

export interface SponsorTierView {
  readonly id: "wok-burner" | "honeycomb-core" | "ecosystem-title";
  readonly name: string;
  readonly priceLabel: string;
  readonly tagline: string;
  readonly deliverables: ReadonlyArray<string>;
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

export interface ConversionBundle {
  readonly locale: Locale;
  readonly activeAudience: ConversionAudience;
  readonly sliceId?: ShowcaseId;
  readonly items: ReadonlyArray<ConversionCtaItem>;
  readonly sponsorTiers: ReadonlyArray<SponsorTierView>;
}

export interface QuotaSavingsEstimate {
  readonly hoursPerWeek: number;
  readonly baselineMonthlyUsd: number;
  readonly optimizedMonthlyUsd: number;
  readonly monthlySavingsUsd: number;
  readonly savingsPercentage: number;
  readonly prunedTokensPerMonth: number;
  readonly freebuffOffloadSharePercent: number;
}

export interface EpisodeTranscriptTurn {
  readonly timestamp: string;
  readonly speaker: string;
  readonly harness: ReactorNodeId;
  readonly text: string;
  readonly tuiCommand: string;
  readonly tuiOutput: string;
}

export interface EpisodeSummary {
  readonly slug: string;
  readonly episodeNumber: number;
  readonly locale: Locale;
  readonly horizon: HorizonTier;
  readonly duration: string;
  readonly title: string;
  readonly subtitle: string;
  readonly summary: string;
  readonly publishedAt: string;
  readonly featuredShowcases: ReadonlyArray<ShowcaseId>;
}

export interface EpisodeDetail extends EpisodeSummary {
  readonly youtubeTeaserTitle: string;
  readonly architectureTakeaway: string;
  readonly transcriptTurns: ReadonlyArray<EpisodeTranscriptTurn>;
}

export interface ArticleSummary {
  readonly slug: string;
  readonly locale: Locale;
  readonly horizon: HorizonTier;
  readonly readingTime: string;
  readonly title: string;
  readonly subtitle: string;
  readonly excerpt: string;
  readonly publishedAt: string;
  readonly authorRole: string;
  readonly tags: ReadonlyArray<string>;
}

export interface ArticleSection {
  readonly heading: string;
  readonly bodyParagraphs: ReadonlyArray<string>;
  readonly codeSnippet?: {
    readonly caption: string;
    readonly code: string;
  };
}

export interface ArticleDetail extends ArticleSummary {
  readonly proNotBroTakeaway: string;
  readonly sections: ReadonlyArray<ArticleSection>;
}

const SetupStageSchema = z.object({
  duration: z.string().min(1),
  clause: z.string().min(1),
});

export const PortalDictionarySchema = z.object({
  meta: z.object({
    locale: LocaleSchema,
    languageLabel: z.string().min(1),
    switchLocaleLabel: z.string().min(1),
    siteTitle: z.string().min(1),
    siteDescription: z.string().min(1),
    ogTagline: z.string().min(1),
  }),
  nav: z.object({
    brandName: z.string().min(1),
    tryLink: z.string().min(1),
    setupLink: z.string().min(1),
    keysLink: z.string().min(1),
    installLabel: z.string().min(1),
    menuLabel: z.string().min(1),
  }),
  home: z.object({
    hero: z.object({
      accessibleHeadline: z.string().min(1),
      lineOneWord: z.string().min(1),
      lineTwoWord: z.string().min(1),
      support: z.string().min(1),
      installCommand: z.string().min(1),
      copyLabel: z.string().min(1),
      copiedLabel: z.string().min(1),
      copyAriaLabel: z.string().min(1),
    }),
    try: z.object({
      heading: z.string().min(1),
      inputLabel: z.string().min(1),
      examplesLabel: z.string().min(1),
      sideTitle: z.string().min(1),
      sideBody: z.string().min(1),
    }),
    setup: z.object({
      heading: z.string().min(1),
      requirement: z.string().min(1),
      stages: z.array(SetupStageSchema).length(4),
    }),
    keys: z.object({
      heading: z.string().min(1),
      headingLine1: z.string().min(1),
      headingLine2: z.string().min(1),
      tableName: z.string().min(1),
      cardTitle: z.string().min(1),
      cardCommand: z.string().min(1),
      cardOptions: z.array(z.string().min(1)).length(3),
      caption: z.string().min(1),
    }),
    closing: z.object({
      heading: z.string().min(1),
      headingLine1: z.string().min(1),
      headingLine2: z.string().min(1),
      body: z.string().min(1),
      button: z.string().min(1),
    }),
    footer: z.object({
      note1: z.string().min(1),
      note2Before: z.string().min(1),
      note2Link: z.string().min(1),
      note2After: z.string(),
      note3Before: z.string().min(1),
      note3Freebuff: z.string().min(1),
      note3Middle: z.string().min(1),
      note3Zai: z.string().min(1),
      note3After: z.string().min(1),
      backToTop: z.string().min(1),
      githubLabel: z.string().min(1),
      npmLabel: z.string().min(1),
      issuesLabel: z.string().min(1),
      credit: z.string().min(1),
      copyright: z.string().min(1),
    }),
  }),
  blogSection: z.object({
    pageTitle: z.string().min(1),
    pageSubtitle: z.string().min(1),
    readArticleCta: z.string().min(1),
    backToBlogCta: z.string().min(1),
    proNotBroTakeawayLabel: z.string().min(1),
  }),
  episodesSection: z.object({
    pageTitle: z.string().min(1),
    pageSubtitle: z.string().min(1),
    watchEpisodeCta: z.string().min(1),
    transcriptHeading: z.string().min(1),
    tuiReplayHeading: z.string().min(1),
    backToEpisodesCta: z.string().min(1),
  }),
  showroomSection: z.object({
    pageTitle: z.string().min(1),
    pageSubtitle: z.string().min(1),
    harnessControlsTitle: z.string().min(1),
    storyWokTitle: z.string().min(1),
    storyXrayTitle: z.string().min(1),
    storyConversionTitle: z.string().min(1),
    payloadCollectionsTitle: z.string().min(1),
  }),
});

export type PortalDictionary = z.infer<typeof PortalDictionarySchema>;
