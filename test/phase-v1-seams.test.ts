import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  PortalDictionarySchema,
  SUPPORTED_LOCALES,
  getPortalDictionary,
  verifyDictionaryParity,
} from "@/modules/locale-dictionary";
import {
  SHOWCASE_IDS,
  getGreenfieldWalkthrough,
  getHorizonSummaries,
  getShowcaseById,
  queryShowcases,
} from "@/modules/ecosystem-catalog";
import {
  PARTNER_URLS,
  calculateQuotaSavings,
  resolveConversionCtas,
} from "@/modules/partner-conversion";
import type { Locale, ShowcaseId } from "@/types/portal";

describe("LocaleDictionaryModule seam", () => {
  test("verifies 100% recursive leaf key parity between en.json and vi.json", () => {
    const parity = verifyDictionaryParity();
    expect(parity).toEqual({
      valid: true,
      keyCount: 103,
    });
  });

  test("returns schema-validated dictionaries for en and vi with canonical terms preserved", () => {
    expect(SUPPORTED_LOCALES).toEqual(["en", "vi"]);

    const en = getPortalDictionary("en");
    const vi = getPortalDictionary("vi");

    expect(PortalDictionarySchema.parse(en)).toEqual(en);
    expect(PortalDictionarySchema.parse(vi)).toEqual(vi);

    expect(en.hero.installCommand).toBe("npx hmoc-steward-acp");
    expect(vi.hero.installCommand).toBe("npx hmoc-steward-acp");

    expect(en.horizons.shippedBadge).toBe("SHIPPED NOW · v0.1");
    expect(vi.horizons.shippedBadge).toBe("ĐÃ PHÁT HÀNH · v0.1");
    expect(en.horizons.nextReleaseBadge).toBe("NEXT RELEASE · v0.2");
    expect(vi.horizons.nextReleaseBadge).toBe("BẢN KẾ TIẾP · v0.2");
    expect(en.horizons.roadmapBadge).toBe("ROADMAP LAB · SUBSTRATE");
    expect(vi.horizons.roadmapBadge).toBe("PHÒNG LAB LỘ TRÌNH · SUBSTRATE");

    expect(vi.hero.subheadline).toContain("ModelSlotChain");
    expect(vi.hero.subheadline).toContain("The Spine");
    expect(vi.hero.subheadline).toContain("The Honeycomb");
    expect(vi.hero.subheadline).toContain("Working-Set Valve");
  });

  test("rejects unsupported locale codes at the module boundary", () => {
    expect(() => getPortalDictionary("fr" as unknown as Locale)).toThrow();
  });
});

describe("EcosystemCatalogModule seam", () => {
  test("returns all 20 showcase clips in canonical order with complete 3-Layer X-Ray traces", () => {
    const enShowcases = queryShowcases({ locale: "en" });
    const viShowcases = queryShowcases({ locale: "vi" });

    expect(enShowcases).toHaveLength(20);
    expect(viShowcases).toHaveLength(20);
    expect(enShowcases.map((item) => item.id)).toEqual([...SHOWCASE_IDS]);
    expect(viShowcases.map((item) => item.id)).toEqual([...SHOWCASE_IDS]);

    for (let index = 0; index < enShowcases.length; index += 1) {
      const enItem = enShowcases[index]!;
      const viItem = viShowcases[index]!;

      expect(enItem.title.length).toBeGreaterThan(5);
      expect(viItem.title.length).toBeGreaterThan(5);
      expect(enItem.title).not.toBe(viItem.title);
      expect(enItem.proNotBroLesson).not.toBe(viItem.proNotBroLesson);

      expect(enItem.xray.humanPrompt.length).toBeGreaterThan(5);
      expect(enItem.xray.orchestratorTool.length).toBeGreaterThan(5);
      expect(enItem.xray.engineExecution.length).toBeGreaterThan(5);
    }
  });

  test("filters showcases accurately by plugin, horizon, and harnessNode", () => {
    const stewardClips = queryShowcases({ locale: "en", plugin: "steward" });
    const substrateClips = queryShowcases({ locale: "en", plugin: "substrate" });
    const crossClips = queryShowcases({ locale: "en", plugin: "cross-plugin" });

    expect(stewardClips.map((c) => c.id)).toEqual([
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
    ]);
    expect(substrateClips.map((c) => c.id)).toEqual([
      "M1",
      "M2",
      "M3",
      "M4",
      "M5",
      "M6",
      "M7",
      "M8",
      "M9",
    ]);
    expect(crossClips.map((c) => c.id)).toEqual(["C1"]);

    const shippedClips = queryShowcases({ locale: "en", horizon: "shipped" });
    const nextReleaseClips = queryShowcases({
      locale: "en",
      horizon: "next-release",
    });
    const roadmapClips = queryShowcases({ locale: "en", horizon: "roadmap" });

    expect(shippedClips.map((c) => c.id)).toEqual([
      "S1",
      "S2",
      "S3",
      "S4",
      "S5",
    ]);
    expect(nextReleaseClips.map((c) => c.id)).toEqual([
      "S6",
      "S7",
      "S8",
      "S9",
      "S10",
    ]);
    expect(roadmapClips).toHaveLength(10);

    const antigravityClips = queryShowcases({
      locale: "en",
      harnessNode: "antigravity",
    });
    const freebuffClips = queryShowcases({
      locale: "en",
      harnessNode: "freebuff",
    });

    expect(antigravityClips.map((c) => c.id)).toEqual(["S6", "S7"]);
    expect(freebuffClips.map((c) => c.id)).toEqual(["S8", "S9", "S10"]);
  });

  test("marks highlightsFreebuffReferral true only on S8, S9, and S10", () => {
    const highlightedIds = queryShowcases({ locale: "en" })
      .filter((item) => item.highlightsFreebuffReferral)
      .map((item) => item.id);

    expect(highlightedIds).toEqual(["S8", "S9", "S10"]);
  });

  test("looks up individual showcases by ID and returns undefined for unknown IDs", () => {
    const s9En = getShowcaseById("S9", "en");
    const m5Vi = getShowcaseById("M5", "vi");
    const unknown = getShowcaseById("UNKNOWN" as unknown as ShowcaseId, "en");

    expect(s9En?.harnessNode).toBe("freebuff");
    expect(s9En?.title).toContain("fbm1....");
    expect(m5Vi?.plugin).toBe("substrate");
    expect(m5Vi?.horizonBadge).toBe("PHÒNG LAB LỘ TRÌNH · SUBSTRATE");
    expect(unknown).toBeUndefined();
  });

  test("returns the 5-step GREENFIELD-5MIN walkthrough and 3 horizon summaries in both locales", () => {
    const walkthroughEn = getGreenfieldWalkthrough("en");
    const walkthroughVi = getGreenfieldWalkthrough("vi");

    expect(walkthroughEn.id).toBe("GREENFIELD-5MIN");
    expect(walkthroughEn.steps).toHaveLength(5);
    expect(walkthroughVi.steps).toHaveLength(5);
    expect(walkthroughEn.steps.map((s) => s.phaseCode)).toEqual([
      "V1",
      "V2",
      "V3",
      "V4",
      "V5",
    ]);
    expect(walkthroughEn.steps[0]?.modelSlot).toContain("deepseek-4.1-flash");
    expect(walkthroughEn.steps[0]?.modelSlot).toContain("glm-5.3-flash");
    expect(walkthroughEn.steps[1]?.modelSlot).toContain("argon-4-high");
    expect(walkthroughEn.steps[2]?.modelSlot).toContain("swe-2-max");

    const horizonsEn = getHorizonSummaries("en");
    const horizonsVi = getHorizonSummaries("vi");

    expect(horizonsEn).toHaveLength(3);
    expect(horizonsVi).toHaveLength(3);
    expect(horizonsEn.map((h) => h.horizon)).toEqual([
      "shipped",
      "next-release",
      "roadmap",
    ]);
    expect(horizonsVi[0]?.badge).toBe("ĐÃ PHÁT HÀNH · v0.1");
  });
});

describe("PartnerConversionModule seam & LAUNCH_PACK.md", () => {
  test("exports exact verified PARTNER_URLS", () => {
    expect(PARTNER_URLS).toEqual({
      freebuffReferral:
        "https://freebuff.com/?ref=ref-6c980d54-a29a-4270-a160-35f13e62a2ff",
      zapGlm: "https://z.ai/subscribe?ic=LTWUT4H2RS",
      kofi: "https://ko-fi.com/shynlee04",
      buyMeACoffee: "https://buymeacoffee.com/shynlee04l",
    });
  });

  test("highlights Freebuff and Zap GLM CTAs contextually when S8, S9, or S10 is selected", () => {
    const s8Bundle = resolveConversionCtas({
      audience: "builders",
      locale: "en",
      sliceId: "S8",
    });
    const s1Bundle = resolveConversionCtas({
      audience: "builders",
      locale: "en",
      sliceId: "S1",
    });
    const supportersVi = resolveConversionCtas({
      audience: "supporters",
      locale: "vi",
    });

    const s8Freebuff = s8Bundle.items.find(
      (item) => item.href === PARTNER_URLS.freebuffReferral,
    );
    const s8Zap = s8Bundle.items.find(
      (item) => item.href === PARTNER_URLS.zapGlm,
    );
    const s1Freebuff = s1Bundle.items.find(
      (item) => item.href === PARTNER_URLS.freebuffReferral,
    );

    expect(s8Freebuff?.isHighlighted).toBe(true);
    expect(s8Zap?.isHighlighted).toBe(true);
    expect(s1Freebuff?.isHighlighted).toBe(false);

    expect(supportersVi.items[0]?.audience).toBe("supporters");
    expect(supportersVi.items[0]?.isHighlighted).toBe(true);
    expect(supportersVi.sponsorTiers.map((t) => t.id)).toEqual([
      "wok-burner",
      "honeycomb-core",
      "ecosystem-title",
    ]);
  });

  test("computes deterministic, monotonic quota savings across coding hours", () => {
    const low = calculateQuotaSavings(10);
    const high = calculateQuotaSavings(45);
    const clampedMin = calculateQuotaSavings(1);
    const clampedMax = calculateQuotaSavings(120);

    expect(clampedMin.hoursPerWeek).toBe(5);
    expect(clampedMax.hoursPerWeek).toBe(80);

    expect(high.baselineMonthlyUsd).toBeGreaterThan(low.baselineMonthlyUsd);
    expect(high.optimizedMonthlyUsd).toBeGreaterThan(low.optimizedMonthlyUsd);
    expect(high.monthlySavingsUsd).toBeGreaterThan(low.monthlySavingsUsd);
    expect(high.prunedTokensPerMonth).toBeGreaterThan(low.prunedTokensPerMonth);
    expect(high.savingsPercentage).toBe(65);
    expect(high.freebuffOffloadSharePercent).toBe(62);

    expect(() => calculateQuotaSavings(Number.NaN)).toThrow();
  });

  test("verifies docs/LAUNCH_PACK.md contains all 4 verified partner and supporter URLs", () => {
    const launchPackPath = join(process.cwd(), "docs", "LAUNCH_PACK.md");
    const content = readFileSync(launchPackPath, "utf8");

    expect(content).toContain(PARTNER_URLS.freebuffReferral);
    expect(content).toContain(PARTNER_URLS.zapGlm);
    expect(content).toContain(PARTNER_URLS.kofi);
    expect(content).toContain(PARTNER_URLS.buyMeACoffee);
    expect(content).toContain("npx hmoc-steward-acp");
    expect(content).toContain("https://www.npmjs.com/package/hmoc-steward-acp");
  });
});
