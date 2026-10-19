import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  ArticlesCollection,
  EpisodesCollection,
  PayloadLocalApiAdapter,
  ShowcaseHarness,
  ShowcaseSlicesCollection,
  SponsorsCollection,
  createContentShowroomRepository,
  getArticleBySlug,
  getEpisodeBySlug,
  listArticles,
  listEpisodes,
  payloadCollections,
  payloadLocalizationConfig,
  type EpisodeDetail,
  type PayloadFindArgs,
  type PayloadFindResult,
  type PayloadLocalApiLike,
} from "@/modules/content-showroom";
import storybookMainConfig from "../.storybook/main";
import storybookPreviewConfig, { withCyberWokHarness } from "../.storybook/preview";
import {
  ContentShowroomStoryView,
  EnglishTeaserAndArchitecture,
  VietnameseTriHarnessGreenfield,
} from "@/stories/ContentShowroom.stories";
import {
  DevinShippedWebGL,
  FreebuffDeterministicReducedMotion,
  WokReactorStageStoryPreview,
} from "@/stories/WokReactorStage.stories";

describe("Phase V4-V5 · Payload CMS 3.0 Collections & Localization Schema", () => {
  test("configures bilingual EN/VI localization with English default and fallback enabled", () => {
    expect(payloadLocalizationConfig.defaultLocale).toBe("en");
    expect(payloadLocalizationConfig.fallback).toBe(true);
    expect(payloadLocalizationConfig.locales.map((l) => l.code)).toEqual([
      "en",
      "vi",
    ]);
  });

  test("registers all four Payload 3.0 collections with public read access and admin-only writes", () => {
    expect(payloadCollections.map((c) => c.slug)).toEqual([
      "episodes",
      "articles",
      "showcase-slices",
      "sponsors",
    ]);

    for (const collection of payloadCollections) {
      expect(collection.access.read({})).toBe(true);
      expect(collection.access.create({ req: { user: null } })).toBe(false);
      expect(
        collection.access.create({
          req: { user: { id: "usr_1", roles: ["editor"] } },
        })
      ).toBe(false);
      expect(
        collection.access.create({
          req: { user: { id: "usr_admin", roles: ["admin"] } },
        })
      ).toBe(true);

      const slugField = collection.fields.find((f) => f.name === "slug");
      expect(slugField?.type).toBe("slug");
      if (slugField?.type === "slug") {
        expect(slugField.useAsSlug).toBe(collection.admin.useAsTitle);
      }
    }

    expect(EpisodesCollection.versions?.drafts).toBe(true);
    expect(ArticlesCollection.versions?.drafts).toBe(true);
    expect(ShowcaseSlicesCollection.versions?.drafts).toBe(true);
    expect(SponsorsCollection.admin.useAsTitle).toBe("name");

    const episodeTitleField = EpisodesCollection.fields.find(
      (f) => f.name === "title"
    );
    expect(episodeTitleField && "localized" in episodeTitleField && episodeTitleField.localized).toBe(
      true
    );
  });
});

describe("Phase V4-V5 · Bilingual Episodes & Technical Articles Seed Queries", () => {
  test("lists and retrieves all 3 bilingual episodes with synchronized TUI replay turns in EN and VI", () => {
    const enEpisodes = listEpisodes("en");
    const viEpisodes = listEpisodes("vi");

    expect(enEpisodes).toHaveLength(3);
    expect(viEpisodes).toHaveLength(3);
    expect(enEpisodes.map((ep) => ep.slug)).toEqual([
      "ep-01-what-if-opencode-used-every-agent",
      "ep-02-tri-harness-greenfield-wok",
      "ep-03-substrate-spine-honeycomb-valve",
    ]);
    expect(viEpisodes.map((ep) => ep.slug)).toEqual(
      enEpisodes.map((ep) => ep.slug)
    );

    const ep1En = getEpisodeBySlug("ep-01-what-if-opencode-used-every-agent", "en");
    const ep1Vi = getEpisodeBySlug("ep-01-what-if-opencode-used-every-agent", "vi");
    expect(ep1En?.title).toContain("What If OpenCode Could Use Every AI Coding Agent?");
    expect(ep1Vi?.title).toContain("OpenCode Dùng Được Mọi AI Coding Agent?");
    expect(ep1En?.transcriptTurns.length).toBeGreaterThanOrEqual(3);
    expect(ep1En?.transcriptTurns[0]?.tuiCommand).toContain("npx hmoc-steward-acp");

    const ep2En = getEpisodeBySlug("ep-02-tri-harness-greenfield-wok", "en");
    expect(ep2En?.horizon).toBe("next-release");
    expect(
      ep2En?.transcriptTurns.some((t) => t.tuiCommand.includes("deepseek-4.1-flash"))
    ).toBe(true);

    const ep3Vi = getEpisodeBySlug("ep-03-substrate-spine-honeycomb-valve", "vi");
    expect(ep3Vi?.horizon).toBe("roadmap");
    expect(
      ep3Vi?.transcriptTurns.some((t) =>
        t.tuiOutput.includes("CompactionContinuationPacket")
      )
    ).toBe(true);

    expect(getEpisodeBySlug("non-existent-slug", "en")).toBeUndefined();
    expect(getEpisodeBySlug("   ", "vi")).toBeUndefined();
  });

  test("lists, filters, and retrieves all 3 bilingual deep-dive articles in EN and VI", () => {
    const enArticles = listArticles("en");
    const viArticles = listArticles({ locale: "vi", horizon: "all" });

    expect(enArticles).toHaveLength(3);
    expect(viArticles).toHaveLength(3);
    expect(enArticles.map((a) => a.slug)).toEqual([
      "three-horizon-ecosystem-architecture",
      "fenced-live-switching-and-freebuff-leases",
      "inside-hivemind-substrate-memory-engine",
    ]);

    const nextReleaseArticles = listArticles({
      locale: "en",
      horizon: "next-release",
    });
    expect(nextReleaseArticles).toHaveLength(1);
    expect(nextReleaseArticles[0]?.slug).toBe(
      "fenced-live-switching-and-freebuff-leases"
    );

    const substrateTaggedVi = listArticles({
      locale: "vi",
      tag: "substrate",
    });
    expect(substrateTaggedVi).toHaveLength(1);
    expect(substrateTaggedVi[0]?.slug).toBe(
      "inside-hivemind-substrate-memory-engine"
    );

    const articleVi = getArticleBySlug(
      "inside-hivemind-substrate-memory-engine",
      "vi"
    );
    expect(articleVi?.proNotBroTakeaway).toContain("The Spine");
    expect(articleVi?.sections.length).toBeGreaterThanOrEqual(2);
    expect(getArticleBySlug("missing-article", "en")).toBeUndefined();
  });
});

describe("Phase V4-V5 · PayloadLocalApiAdapter Live Mock & Offline Fallback", () => {
  test("queries custom PayloadLocalApiLike mock with collection, locale, where, limit, and overrideAccess: false", async () => {
    const recordedCalls: Array<PayloadFindArgs> = [];

    const mockCustomEpisode: EpisodeDetail = {
      slug: "ep-99-live-payload-cms-probe",
      episodeNumber: 99,
      locale: "vi",
      horizon: "next-release",
      duration: "03:45",
      title: "Tập Thử Nghiệm Trực Tiếp Từ Payload 3.0 Local API",
      subtitle: "Kiểm chứng PayloadLocalApiAdapter",
      summary: "Truy vấn trực tiếp qua payload.find với overrideAccess: false.",
      publishedAt: "2026-10-20",
      featuredShowcases: ["S7"],
      youtubeTeaserTitle: "Payload 3.0 Live Local API Probe",
      architectureTakeaway: "Local API respects access control by default.",
      transcriptTurns: [
        {
          timestamp: "00:00",
          speaker: "Payload Local API",
          harness: "devin",
          text: "Connected to live Payload 3.0 collection.",
          tuiCommand: "payload.find({ collection: 'episodes', locale: 'vi' })",
          tuiOutput: "{ totalDocs: 1 }",
        },
      ],
    };

    const mockPayloadApi: PayloadLocalApiLike = {
      async find<TDoc>(args: PayloadFindArgs): Promise<PayloadFindResult<TDoc>> {
        recordedCalls.push(args);
        if (args.collection === "episodes") {
          return {
            docs: [mockCustomEpisode as unknown as TDoc],
            totalDocs: 1,
          };
        }
        return {
          docs: [],
          totalDocs: 0,
        };
      },
    };

    const repo = createContentShowroomRepository(
      new PayloadLocalApiAdapter({ payload: mockPayloadApi })
    );

    const foundEpisode = await repo.getEpisodeBySlug(
      "ep-99-live-payload-cms-probe",
      "vi"
    );
    expect(foundEpisode?.title).toBe(
      "Tập Thử Nghiệm Trực Tiếp Từ Payload 3.0 Local API"
    );
    expect(recordedCalls[0]).toEqual({
      collection: "episodes",
      locale: "vi",
      fallbackLocale: "en",
      where: {
        slug: { equals: "ep-99-live-payload-cms-probe" },
      },
      limit: 1,
      overrideAccess: false,
    });

    const fallbackArticles = await repo.listArticles({
      locale: "en",
      horizon: "shipped",
    });
    expect(fallbackArticles).toHaveLength(1);
    expect(fallbackArticles[0]?.slug).toBe("three-horizon-ecosystem-architecture");
  });

  test("falls back seamlessly to InMemoryContentAdapter when Payload instance is null or throws", async () => {
    const throwingPayload: PayloadLocalApiLike = {
      async find() {
        throw new Error("Database connection offline");
      },
    };

    const offlineRepo = createContentShowroomRepository(throwingPayload);
    const episodes = await offlineRepo.listEpisodes("en");
    expect(episodes).toHaveLength(3);

    const article = await offlineRepo.getArticleBySlug(
      "fenced-live-switching-and-freebuff-leases",
      "vi"
    );
    expect(article?.horizon).toBe("next-release");
  });
});

describe("Phase V4-V5 · ShowcaseHarness & Storybook 8 Rendering", () => {
  test("renders ShowcaseHarness static markup in EN and VI with >= 44x44px hit targets and reducedMotion state", () => {
    const enHtml = renderToStaticMarkup(
      React.createElement(ShowcaseHarness, {
        locale: "en",
        horizon: "shipped",
        reducedMotion: false,
        componentName: "WokReactorStage",
        title: "Isolated Cyber-Wok Stage",
      })
    );

    expect(enHtml).toContain('data-testid="showcase-harness"');
    expect(enHtml).toContain('data-locale="en"');
    expect(enHtml).toContain('data-reduced-motion="false"');
    expect(enHtml).toContain("[SHIPPED NOW · v0.1]");
    expect(enHtml).toContain("min-height:44px;min-width:44px");
    expect(enHtml).toContain("Isolated Cyber-Wok Stage");

    const viReducedHtml = renderToStaticMarkup(
      React.createElement(ShowcaseHarness, {
        locale: "vi",
        horizon: "roadmap",
        reducedMotion: true,
        componentName: "SubstrateValve",
        children: (state) =>
          React.createElement(
            "div",
            { "data-testid": "render-prop-child" },
            `State:${state.locale}:${state.horizon}:${String(state.reducedMotion)}`
          ),
      })
    );

    expect(viReducedHtml).toContain('data-locale="vi"');
    expect(viReducedHtml).toContain('data-reduced-motion="true"');
    expect(viReducedHtml).toContain("[PHÒNG LAB LỘ TRÌNH · SUBSTRATE]");
    expect(viReducedHtml).toContain("Giảm Chuyển Động: BẬT (SVG Tất Định)");
    expect(viReducedHtml).toContain("State:vi:roadmap:true");
  });

  test("verifies Storybook 8 configuration, global toolbar decorator, and story components", () => {
    expect(storybookMainConfig.framework.name).toBe("@storybook/nextjs");
    expect(storybookPreviewConfig.globalTypes.locale.defaultValue).toBe("en");
    expect(storybookPreviewConfig.globalTypes.reducedMotion.defaultValue).toBe("off");

    const decoratedElement = withCyberWokHarness(
      () => React.createElement("span", null, "Decorated Story Child"),
      {
        globals: { locale: "vi", reducedMotion: "reduce", horizon: "next-release" },
        title: "Cockpit/WokReactorStage",
        name: "Vietnamese Reduced Motion Story",
      }
    );
    const decoratedHtml = renderToStaticMarkup(decoratedElement);
    expect(decoratedHtml).toContain("Decorated Story Child");
    expect(decoratedHtml).toContain("[BẢN KẾ TIẾP · v0.2]");

    const wokHtml = renderToStaticMarkup(
      React.createElement(
        WokReactorStageStoryPreview,
        FreebuffDeterministicReducedMotion.args
      )
    );
    expect(wokHtml).toContain("DeterministicCanvasFallbackAdapter");
    expect(wokHtml).toContain("deepseek-4.1-flash / glm-5.3-flash");

    const devinHtml = renderToStaticMarkup(
      React.createElement(WokReactorStageStoryPreview, DevinShippedWebGL.args)
    );
    expect(devinHtml).toContain("swe-2-max");

    const showroomEnHtml = renderToStaticMarkup(
      React.createElement(
        ContentShowroomStoryView,
        EnglishTeaserAndArchitecture.args
      )
    );
    expect(showroomEnHtml).toContain("ep-01-what-if-opencode-used-every-agent");

    const showroomViHtml = renderToStaticMarkup(
      React.createElement(
        ContentShowroomStoryView,
        VietnameseTriHarnessGreenfield.args
      )
    );
    expect(showroomViHtml).toContain("ep-02-tri-harness-greenfield-wok");
  });
});
