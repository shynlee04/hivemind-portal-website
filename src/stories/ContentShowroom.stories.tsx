import React from "react";
import type { HorizonTier, Locale } from "@/types/portal";
import {
  ShowcaseHarness,
  getArticleBySlug,
  getEpisodeBySlug,
  listArticles,
  listEpisodes,
  payloadCollections,
} from "@/modules/content-showroom";
import type { StoryMeta, StoryObj } from "./WokReactorStage.stories";

export interface ContentShowroomStoryProps {
  readonly locale: Locale;
  readonly horizon: HorizonTier;
  readonly reducedMotion: boolean;
  readonly activeEpisodeSlug: string;
  readonly activeArticleSlug: string;
}

export function ContentShowroomStoryView({
  locale,
  horizon,
  reducedMotion,
  activeEpisodeSlug,
  activeArticleSlug,
}: ContentShowroomStoryProps) {
  const episodes = listEpisodes(locale);
  const articles = listArticles({ locale, horizon });
  const selectedEpisode =
    getEpisodeBySlug(activeEpisodeSlug, locale) ?? episodes[0];
  const selectedArticle =
    getArticleBySlug(activeArticleSlug, locale) ?? articles[0];

  return (
    <ShowcaseHarness
      locale={locale}
      horizon={horizon}
      reducedMotion={reducedMotion}
      componentName="ContentShowroomModule"
      title={
        locale === "vi"
          ? "Phòng Trưng Bày Nội Dung Payload CMS 3.0 & Tập Phát Sóng"
          : "Payload CMS 3.0 Content Showroom & Episode Hub"
      }
      description={
        locale === "vi"
          ? `Đã đăng ký ${payloadCollections.length} bộ sưu tập Payload 3.0 đa ngôn ngữ (EN/VI).`
          : `Registered ${payloadCollections.length} localized Payload 3.0 collections (EN/VI).`
      }
    >
      <div
        data-testid="content-showroom-story-grid"
        style={{
          display: "grid",
          gap: "1rem",
          fontFamily: "var(--font-sans, 'Be Vietnam Pro', system-ui, sans-serif)",
        }}
      >
        {selectedEpisode ? (
          <article
            data-testid="story-episode-card"
            style={{
              padding: "1rem",
              border: "1px solid var(--border-forge-brass, #3A2E1E)",
              borderRadius: "2px",
              backgroundColor: "var(--bg-smoked-basalt, #111622)",
            }}
          >
            <div
              style={{
                
                fontSize: "0.75rem",
                color: "var(--accent-wok-gold, #F5A623)",
              }}
            >
              EPISODE #{selectedEpisode.episodeNumber} · {selectedEpisode.duration} ·{" "}
              {selectedEpisode.slug}
            </div>
            <h3 style={{ margin: "0.375rem 0", lineHeight: 1.24 }}>
              {selectedEpisode.title}
            </h3>
            <p style={{ margin: 0, color: "var(--text-ash-slate, #94A3B8)" }}>
              {selectedEpisode.summary}
            </p>
          </article>
        ) : null}

        {selectedArticle ? (
          <article
            data-testid="story-article-card"
            style={{
              padding: "1rem",
              border: "1px solid var(--border-forge-brass, #3A2E1E)",
              borderRadius: "2px",
              backgroundColor: "var(--bg-smoked-basalt, #111622)",
            }}
          >
            <div
              style={{
                
                fontSize: "0.75rem",
                color: "var(--accent-jade-wire, #22D3EE)",
              }}
            >
              ARTICLE · {selectedArticle.readingTime} · {selectedArticle.slug}
            </div>
            <h3 style={{ margin: "0.375rem 0", lineHeight: 1.24 }}>
              {selectedArticle.title}
            </h3>
            <p style={{ margin: 0, color: "var(--text-ash-slate, #94A3B8)" }}>
              {selectedArticle.proNotBroTakeaway}
            </p>
          </article>
        ) : null}
      </div>
    </ShowcaseHarness>
  );
}

const meta: StoryMeta<ContentShowroomStoryProps> = {
  title: "Showroom/ContentShowroomModule",
  component: ContentShowroomStoryView,
  tags: ["autodocs"],
  args: {
    locale: "en",
    horizon: "shipped",
    reducedMotion: false,
    activeEpisodeSlug: "ep-01-what-if-opencode-used-every-agent",
    activeArticleSlug: "three-horizon-ecosystem-architecture",
  },
};

export default meta;

export const EnglishTeaserAndArchitecture: StoryObj<ContentShowroomStoryProps> = {
  name: "EN · Episode 01 Teaser & 3-Horizon Article",
  args: {
    locale: "en",
    horizon: "shipped",
    reducedMotion: false,
    activeEpisodeSlug: "ep-01-what-if-opencode-used-every-agent",
    activeArticleSlug: "three-horizon-ecosystem-architecture",
  },
};

export const VietnameseTriHarnessGreenfield: StoryObj<ContentShowroomStoryProps> = {
  name: "VI · Episode 02 3-Harness Greenfield & Freebuff Leases",
  args: {
    locale: "vi",
    horizon: "next-release",
    reducedMotion: false,
    activeEpisodeSlug: "ep-02-tri-harness-greenfield-wok",
    activeArticleSlug: "fenced-live-switching-and-freebuff-leases",
  },
};

export const SubstrateDeepDiveReducedMotion: StoryObj<ContentShowroomStoryProps> = {
  name: "EN/VI · Episode 03 Substrate Memory & < 2 ms Valve",
  args: {
    locale: "vi",
    horizon: "roadmap",
    reducedMotion: true,
    activeEpisodeSlug: "ep-03-substrate-spine-honeycomb-valve",
    activeArticleSlug: "inside-hivemind-substrate-memory-engine",
  },
};
