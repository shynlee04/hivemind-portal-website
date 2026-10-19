import { z } from "zod";
import {
  HorizonTierSchema,
  LocaleSchema,
  PluginGroupSchema,
  ReactorNodeIdSchema,
  SHOWCASE_IDS,
  ShowcaseIdSchema,
  ThreeLayerXRaySchema,
  type GreenfieldWalkthroughView,
  type HorizonSummaryView,
  type Locale,
  type ShowcaseCardView,
  type ShowcaseId,
  type ShowcaseQuery,
} from "@/types/portal";
import {
  RAW_SHOWCASES,
  buildGreenfieldWalkthrough,
  buildHorizonSummaries,
  localizeShowcaseCard,
} from "./catalog-data";

export {
  SHOWCASE_IDS,
  ShowcaseIdSchema,
  ThreeLayerXRaySchema,
  type GreenfieldWalkthroughView,
  type HorizonSummaryView,
  type ShowcaseCardView,
  type ShowcaseId,
  type ShowcaseQuery,
};

const ShowcaseQuerySchema = z.object({
  locale: LocaleSchema,
  plugin: z.union([PluginGroupSchema, z.literal("all")]).optional(),
  horizon: z.union([HorizonTierSchema, z.literal("all")]).optional(),
  harnessNode: z.union([ReactorNodeIdSchema, z.literal("all")]).optional(),
});

for (const record of RAW_SHOWCASES) {
  ThreeLayerXRaySchema.parse(record.xray);
}

export function queryShowcases(
  query: ShowcaseQuery,
): ReadonlyArray<ShowcaseCardView> {
  const parsed = ShowcaseQuerySchema.parse(query);
  const pluginFilter = parsed.plugin ?? "all";
  const horizonFilter = parsed.horizon ?? "all";
  const harnessFilter = parsed.harnessNode ?? "all";

  return RAW_SHOWCASES.filter((item) => {
    if (pluginFilter !== "all" && item.plugin !== pluginFilter) {
      return false;
    }
    if (horizonFilter !== "all" && item.horizon !== horizonFilter) {
      return false;
    }
    if (harnessFilter !== "all" && item.harnessNode !== harnessFilter) {
      return false;
    }
    return true;
  }).map((item) => localizeShowcaseCard(item, parsed.locale));
}

export function getShowcaseById(
  id: ShowcaseId,
  locale: Locale,
): ShowcaseCardView | undefined {
  const parsedLocale = LocaleSchema.parse(locale);
  const parsedIdResult = ShowcaseIdSchema.safeParse(id);
  if (!parsedIdResult.success) {
    return undefined;
  }

  const found = RAW_SHOWCASES.find((item) => item.id === parsedIdResult.data);
  if (!found) {
    return undefined;
  }

  return localizeShowcaseCard(found, parsedLocale);
}

export function getGreenfieldWalkthrough(
  locale: Locale,
): GreenfieldWalkthroughView {
  const parsedLocale = LocaleSchema.parse(locale);
  const walkthrough = buildGreenfieldWalkthrough(parsedLocale);
  for (const step of walkthrough.steps) {
    ThreeLayerXRaySchema.parse(step.xray);
  }
  return walkthrough;
}

export function getHorizonSummaries(
  locale: Locale,
): ReadonlyArray<HorizonSummaryView> {
  const parsedLocale = LocaleSchema.parse(locale);
  return buildHorizonSummaries(parsedLocale);
}
