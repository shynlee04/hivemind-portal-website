import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HomePage } from "../src/components/home/home-page";
import { FOOTER_URLS, SiteFooter } from "../src/components/home/site-footer";
import { getPortalDictionary } from "../src/modules/locale-dictionary";
import { PARTNER_URLS } from "../src/modules/partner-conversion";
import {
  getReactorNodeMetadata,
  REACTOR_NODE_IDS,
  REACTOR_NODES,
  renderDeterministicFallbackSvg,
  WokReactorStage,
} from "../src/modules/wok-reactor-stage";

describe("Phase V2 · WokReactorStageModule & HomePage", () => {
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

  test("HomePage SSR renders the sentence hero, try/setup/keys sections, and truthful copy in en and vi", () => {
    const enHtml = renderToStaticMarkup(
      React.createElement(HomePage, {
        locale: "en",
        dictionary: getPortalDictionary("en"),
      })
    );
    const viHtml = renderToStaticMarkup(
      React.createElement(HomePage, {
        locale: "vi",
        dictionary: getPortalDictionary("vi"),
      })
    );

    expect(enHtml).toContain("Devin and Antigravity, inside OpenCode");
    expect(viHtml).toContain("Devin và Antigravity, ngay trong OpenCode");

    for (const html of [enHtml, viHtml]) {
      expect(html).toContain("opencode plugin add hmoc-steward-acp@0.2.0");
      expect(html).toContain('id="try"');
      expect(html).toContain('id="setup"');
      expect(html).toContain('id="keys"');
      expect(html).toContain(PARTNER_URLS.kofi);
      expect(html).not.toContain("Neo-Tokyo");
      expect(html).not.toContain("swe-2-max");
    }

    const enFooterHtml = renderToStaticMarkup(
      React.createElement(SiteFooter, {
        footer: getPortalDictionary("en").home.footer,
        urls: FOOTER_URLS,
      })
    );
    expect(enFooterHtml).toContain(FOOTER_URLS.github);
    expect(enFooterHtml).toContain(FOOTER_URLS.issues);
    expect(enFooterHtml).toContain("hmoc-steward-acp");

    expect(enHtml).toContain(
      "Opens a new session and sends your task."
    );
    expect(viHtml).toContain("Mở phiên mới và gửi luôn tác vụ.");
  });
});
