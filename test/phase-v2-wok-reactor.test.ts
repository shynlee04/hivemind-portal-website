import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PortalCockpitClient } from "../src/components/portal-cockpit-client";
import {
  getReactorNodeMetadata,
  REACTOR_NODE_IDS,
  REACTOR_NODES,
  renderDeterministicFallbackSvg,
  WokReactorStage,
} from "../src/modules/wok-reactor-stage";
import type { PortalDictionary } from "../src/types/portal";

const TEST_DICTIONARY_VI: PortalDictionary = {
  meta: {
    locale: "vi",
    languageLabel: "Tiếng Việt",
    switchLocaleLabel: "EN",
    siteTitle: "Hivemind Portal",
    siteDescription: "Hệ sinh thái đa Harness",
    ogTagline: "{CHINGCHONGCHINGVIBECODING}",
  },
  nav: {
    brandName: "HIVEMIND-*",
    brandSubtag: "[PRO, NOT BRO]",
    cockpitLink: "Buồng lái",
    xrayLink: "X-Ray 3 Tầng",
    greenfieldLink: "Greenfield 5 Phút",
    conversionLink: "Đối tác",
    blogLink: "Bài viết",
    episodesLink: "Tập phim",
    showroomLink: "Showroom",
  },
  hero: {
    eyebrowTag: "[OPENCODE V2 ECOSYSTEM]",
    headline: "Lò phản ứng Đa Harness & Bộ nhớ Tổ ong",
    subheadline: "Kiến trúc kiểm chứng thực tế.",
    philosophyBadge: "{CHINGCHONGCHINGVIBECODING}",
    philosophySummary: "Pro, Not Bro — đường ranh giới sâu, không rác ngữ cảnh.",
    installLabel: "CÀI ĐẶT NHANH QUA NPX",
    installCommand: "npx hmoc-steward-acp",
    copyCommandLabel: "Sao chép",
    copiedCommandLabel: "Đã chép",
    primaryCtaLabel: "Khám phá X-Ray",
    secondaryCtaLabel: "Xem Greenfield",
    reducedMotionToggleOn: "Chế độ tĩnh: BẬT",
    reducedMotionToggleOff: "Chế độ tĩnh: TẮT",
    reactorStageTitle: "Lò phản ứng Cyber-Wok",
    reactorStageHint: "Nhấn vào nút để xem thông số",
  },
  horizons: {
    sectionTitle: "Mô hình 3 Chân trời Phát triển",
    sectionSubtitle: "Phân tách rõ những gì đã phát hành và lộ trình.",
    filterAll: "Tất cả",
    shippedBadge: "ĐÃ PHÁT HÀNH · v0.1",
    shippedScope: "Devin ACP Steward",
    shippedDescription: "Đã phát hành.",
    nextReleaseBadge: "BẢN KẾ TIẾP · v0.2",
    nextReleaseScope: "Tri-Harness Steward",
    nextReleaseDescription: "Sắp phát hành.",
    roadmapBadge: "PHÒNG LAB LỘ TRÌNH · SUBSTRATE",
    roadmapScope: "Hivemind Substrate",
    roadmapDescription: "Lộ trình bộ nhớ.",
  },
  xrayExplorer: {
    sectionTitle: "20 Lát cắt Hệ sinh thái & X-Ray 3 Tầng",
    sectionSubtitle: "Kiểm chứng từng lệnh.",
    pluginFilterLabel: "Bộ lọc Plugin",
    pluginAll: "Tất cả",
    pluginSteward: "Steward",
    pluginSubstrate: "Substrate",
    pluginCross: "Liên kết",
    layer1Label: "Layer 1 · Human Prompt",
    layer2Label: "Layer 2 · Orchestrator Tool",
    layer3Label: "Layer 3 · Engine Execution",
    proNotBroHeader: "BÀI HỌC KIẾN TRÚC · PRO, NOT BRO",
    sourceGroundingLabel: "Nguồn chứng thực",
    inspectSliceCta: "Soi X-Ray",
  },
  greenfieldSection: {
    sectionTitle: "Xây dựng Greenfield 3-Harness trong 5 Phút",
    sectionSubtitle: "Điều phối song song.",
    verificationBadge: "[VERIFIED WORKFLOW]",
  },
  substrateSection: {
    sectionTitle: "Kiến trúc 3 Tầng Hivemind Substrate",
    sectionSubtitle: "Bộ nhớ không mất mát.",
    spineTitle: "The Spine",
    spineSubtitle: "Kho lưu trữ Blob",
    spineDescription: "Lưu trữ nguyên vẹn.",
    honeycombTitle: "The Honeycomb",
    honeycombSubtitle: "Chỉ mục lai SQLite + AST",
    honeycombDescription: "Truy vấn đồ thị.",
    valveTitle: "Viewports & Working-Set Valve",
    valveSubtitle: "Cắt tỉa ngữ cảnh < 2 ms",
    valveDescription: "Giữ gói tiếp nối dưới 1.200 token.",
  },
  conversionSection: {
    sectionTitle: "Trung tâm Chuyển đổi & Đối tác",
    sectionSubtitle: "Dành cho lập trình viên, người ủng hộ và nhà tài trợ.",
    audienceBuildersTab: "Kỹ sư (Builders)",
    audienceSupportersTab: "Người ủng hộ (Supporters)",
    audienceSponsorsTab: "Nhà tài trợ (Sponsors)",
    calculatorTitle: "Bộ ước tính Tiết kiệm Hạn ngạch Token",
    calculatorSubtitle: "Giảm tải sang Freebuff và Substrate.",
    hoursPerWeekLabel: "Số giờ lập trình mỗi tuần",
    baselineCostLabel: "Chi phí cơ sở",
    optimizedCostLabel: "Chi phí tối ưu",
    monthlySavingsLabel: "Tiết kiệm hàng tháng",
    prunedTokensLabel: "Token cắt tỉa",
    sponsorMatrixTitle: "Gói tài trợ B2B",
  },
  blogSection: {
    pageTitle: "Bài viết Kỹ thuật",
    pageSubtitle: "Kiến trúc sâu",
    readArticleCta: "Đọc bài",
    backToBlogCta: "Quay lại",
    proNotBroTakeawayLabel: "Điểm cốt lõi",
  },
  episodesSection: {
    pageTitle: "Tập phim",
    pageSubtitle: "Bản ghi TUI",
    watchEpisodeCta: "Xem tập này",
    transcriptHeading: "Lời thoại",
    tuiReplayHeading: "TUI Replay",
    backToEpisodesCta: "Quay lại",
  },
  showroomSection: {
    pageTitle: "Showroom",
    pageSubtitle: "Kiểm thử thành phần",
    harnessControlsTitle: "Điều khiển",
    storyWokTitle: "Cyber-Wok",
    storyXrayTitle: "X-Ray",
    storyConversionTitle: "Conversion",
    payloadCollectionsTitle: "Payload Collections",
  },
  footer: {
    tagline: "Hivemind-* Ecosystem",
    copyrightNotice: "© 2026 Hivemind",
    builtWithLine: "Next.js 15 + Three.js",
  },
};

describe("Phase V2 · WokReactorStageModule & PortalCockpitClient", () => {
  test("REACTOR_NODES exposes all 4 canonical reactor nodes with expected model IDs", () => {
    expect(REACTOR_NODES).toHaveLength(4);
    const ids = REACTOR_NODES.map((n) => n.id);
    expect(ids).toEqual(["devin", "antigravity", "freebuff", "substrate"]);

    const devinEn = getReactorNodeMetadata("devin", "en");
    expect(devinEn.modelIds).toContain("swe-2-max");
    expect(devinEn.horizon).toBe("shipped");

    const agyEn = getReactorNodeMetadata("antigravity", "en");
    expect(agyEn.modelIds).toContain("argon-4-high");
    expect(agyEn.horizon).toBe("next-release");

    const freebuffVi = getReactorNodeMetadata("freebuff", "vi");
    expect(freebuffVi.modelIds).toEqual([
      "glm-5.3-flash",
      "deepseek-4.1-flash",
    ]);
    expect(freebuffVi.horizonBadge).toContain("v0.2");

    const substrateVi = getReactorNodeMetadata("substrate", "vi");
    expect(substrateVi.modelIds).toEqual([
      "The Spine",
      "The Honeycomb",
      "Working-Set Valve",
    ]);
    expect(substrateVi.horizon).toBe("roadmap");
  });

  test("renderDeterministicFallbackSvg renders all 4 nodes, canonical model IDs, and active highlight ring", () => {
    for (const activeId of REACTOR_NODE_IDS) {
      const svg = renderDeterministicFallbackSvg({
        activeHarness: activeId,
        activeHorizon: "all",
        reducedMotion: true,
        locale: "en",
      });

      expect(svg).toContain(
        'data-fallback-adapter="DeterministicCanvasFallbackAdapter"'
      );
      expect(svg).toContain(`data-active-harness="${activeId}"`);
      expect(svg).toContain(`data-active-ring="${activeId}"`);
      expect(svg).toContain('data-reactor-node="devin"');
      expect(svg).toContain('data-reactor-node="antigravity"');
      expect(svg).toContain('data-reactor-node="freebuff"');
      expect(svg).toContain('data-reactor-node="substrate"');
      expect(svg).toContain("swe-2-max");
      expect(svg).toContain("argon-4-high");
      expect(svg).toContain("glm-5.3-flash");
      expect(svg).toContain("deepseek-4.1-flash");
      expect(svg).toContain("The Spine");
      expect(svg).toContain("The Honeycomb");
      expect(svg).toContain("Working-Set Valve");
    }
  });

  test("WokReactorStage SSR static markup reserves CLS dimensions, focus-visible ring, and localized telemetry", () => {
    const html = renderToStaticMarkup(
      React.createElement(WokReactorStage, {
        activeHarness: "freebuff",
        reducedMotion: true,
        locale: "vi",
      })
    );

    expect(html).toContain('data-testid="wok-reactor-stage"');
    expect(html).toContain('data-active-harness="freebuff"');
    expect(html).toContain('data-reduced-motion="true"');
    expect(html).toContain('data-locale="vi"');
    expect(html).toContain("min-height:520px");
    expect(html).toContain("aspect-ratio:16 / 10");
    expect(html).toContain(
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
    );
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain("glm-5.3-flash");
    expect(html).toContain("deepseek-4.1-flash");
    expect(html).toContain("keepSlotForResume");
  });

  test("PortalCockpitClient renders Asymmetric Split Hero, 3-Layer X-Ray Drawer, Greenfield Stepper, Substrate & Conversion Hub", () => {
    const html = renderToStaticMarkup(
      React.createElement(PortalCockpitClient, {
        locale: "vi",
        dictionary: TEST_DICTIONARY_VI,
        horizons: [
          {
            horizon: "shipped",
            badge: "ĐÃ PHÁT HÀNH · v0.1",
            canonicalScope: "Devin ACP Steward",
            description: "MVP",
            sourceGrounding: "README.md",
            primaryNode: "devin",
          },
        ],
        showcases: [
          {
            id: "S8",
            plugin: "steward",
            horizon: "next-release",
            horizonBadge: "BẢN KẾ TIẾP · v0.2",
            harnessNode: "freebuff",
            durationLabel: "01:42",
            title: "Rank-Routed Parallel Swarm",
            subtitle: "3-Slot ModelSlotChain",
            summary: "Parallel delegation.",
            sourceGrounding: "targeted-request-broker.ts",
            xray: {
              humanPrompt: "/antigravity fan-out 3 worktrees",
              orchestratorTool: "hivemind-delegate --parallel 3",
              engineExecution: "ses_01 + fbm1.a9f3",
            },
            proNotBroLesson: "Serialize shared state only after separating disjoint lanes.",
            highlightsFreebuffReferral: true,
          },
        ],
        greenfield: {
          id: "GREENFIELD-5MIN",
          title: "Greenfield 5-Min Build",
          subtitle: "Tri-Harness",
          durationLabel: "05:00",
          overview: "Full build.",
          proNotBroLesson: "Deep seams.",
          steps: [
            {
              stepNumber: 1,
              phaseCode: "V1",
              harnessId: "freebuff",
              modelSlot: "deepseek-4.1-flash",
              title: "Recon",
              actionSummary: "Scan repo",
              xray: {
                humanPrompt: "recon",
                orchestratorTool: "hivemind-delegate",
                engineExecution: "fbm1.recon",
              },
              verificationGate: "bun test",
            },
          ],
        },
        initialConversion: {
          locale: "vi",
          activeAudience: "builders",
          sliceId: "S8",
          items: [],
          sponsorTiers: [],
        },
      })
    );

    expect(html).toContain("npx hmoc-steward-acp");
    expect(html).toContain("{CHINGCHONGCHINGVIBECODING}");
    expect(html).toContain('data-testid="xray-inspector-drawer"');
    expect(html).toContain("ses_01 + fbm1.a9f3");
    expect(html).toContain("https://freebuff.com/?ref=ref-6c980d54-a29a-4270-a160-35f13e62a2ff");
    expect(html).toContain("https://z.ai/subscribe?ic=LTWUT4H2RS");
  });
});
