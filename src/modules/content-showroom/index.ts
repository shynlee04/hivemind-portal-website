import { z } from "zod";
import {
  HorizonTierSchema,
  LocaleSchema,
  type ArticleDetail,
  type ArticleSummary,
  type EpisodeDetail,
  type EpisodeSummary,
  type HorizonTier,
  type Locale,
} from "@/types/portal";
import {
  ArticlesCollection,
  EpisodesCollection,
  ShowcaseSlicesCollection,
  SponsorsCollection,
   adminOnlyWriteAccess,
  payloadCollections,
  payloadLocalizationConfig,
  publicReadAccess,
  type ArticleQuery,
  type PayloadAccessArgs,
  type PayloadAccessControl,
  type PayloadCollectionConfig,
  type PayloadCollectionSlug,
  type PayloadFieldAdminConfig,
  type PayloadFieldConfig,
  type PayloadFieldPosition,
  type PayloadFindArgs,
  type PayloadFindResult,
  type PayloadLocalApiLike,
  type PayloadLocalizationConfig,
  type PayloadWhereClause,
  type PayloadWhereFieldCondition,
} from "./payload-collections";
import { SEED_ARTICLES, SEED_EPISODES } from "./seed-data";
import {
  ShowcaseHarness,
  type ShowcaseHarnessProps,
  type ShowcaseHarnessRenderState,
} from "./showcase-harness";

export const ArticleListQuerySchema = z.union([
  LocaleSchema,
  z.object({
    locale: LocaleSchema,
    horizon: z.union([HorizonTierSchema, z.literal("all")]).optional(),
    tag: z.string().min(1).optional(),
  }),
]);

export type ArticleListQuery = z.infer<typeof ArticleListQuerySchema>;

function normalizeArticleQuery(input: ArticleListQuery): ArticleQuery {
  const parsed = ArticleListQuerySchema.parse(input);
  if (typeof parsed === "string") {
    return { locale: parsed };
  }
  return parsed;
}

function filterArticles(
  articles: ReadonlyArray<ArticleDetail>,
  query: ArticleQuery
): ReadonlyArray<ArticleDetail> {
  return articles.filter((article) => {
    if (query.horizon && query.horizon !== "all" && article.horizon !== query.horizon) {
      return false;
    }
    if (query.tag && !article.tags.includes(query.tag)) {
      return false;
    }
    return true;
  });
}

export interface ContentShowroomAdapter {
  listEpisodes(locale: Locale): Promise<ReadonlyArray<EpisodeDetail>>;
  getEpisodeBySlug(slug: string, locale: Locale): Promise<EpisodeDetail | undefined>;
  listArticles(query: ArticleListQuery): Promise<ReadonlyArray<ArticleDetail>>;
  getArticleBySlug(slug: string, locale: Locale): Promise<ArticleDetail | undefined>;
}

export class InMemoryContentAdapter implements ContentShowroomAdapter {
  listEpisodesSync(locale: Locale): ReadonlyArray<EpisodeDetail> {
    const validLocale = LocaleSchema.parse(locale);
    return SEED_EPISODES[validLocale];
  }

  getEpisodeBySlugSync(slug: string, locale: Locale): EpisodeDetail | undefined {
    const validLocale = LocaleSchema.parse(locale);
    const normalizedSlug = slug.trim();
    if (!normalizedSlug) {
      return undefined;
    }
    return SEED_EPISODES[validLocale].find((ep) => ep.slug === normalizedSlug);
  }

  listArticlesSync(query: ArticleListQuery): ReadonlyArray<ArticleDetail> {
    const normalized = normalizeArticleQuery(query);
    return filterArticles(SEED_ARTICLES[normalized.locale], normalized);
  }

  getArticleBySlugSync(slug: string, locale: Locale): ArticleDetail | undefined {
    const validLocale = LocaleSchema.parse(locale);
    const normalizedSlug = slug.trim();
    if (!normalizedSlug) {
      return undefined;
    }
    return SEED_ARTICLES[validLocale].find((art) => art.slug === normalizedSlug);
  }

  async listEpisodes(locale: Locale): Promise<ReadonlyArray<EpisodeDetail>> {
    return this.listEpisodesSync(locale);
  }

  async getEpisodeBySlug(
    slug: string,
    locale: Locale
  ): Promise<EpisodeDetail | undefined> {
    return this.getEpisodeBySlugSync(slug, locale);
  }

  async listArticles(
    query: ArticleListQuery
  ): Promise<ReadonlyArray<ArticleDetail>> {
    return this.listArticlesSync(query);
  }

  async getArticleBySlug(
    slug: string,
    locale: Locale
  ): Promise<ArticleDetail | undefined> {
    return this.getArticleBySlugSync(slug, locale);
  }
}

export interface PayloadLocalApiAdapterOptions {
  readonly payload?: PayloadLocalApiLike | null;
  readonly fallbackAdapter?: ContentShowroomAdapter;
}

export class PayloadLocalApiAdapter implements ContentShowroomAdapter {
  private readonly payload: PayloadLocalApiLike | null;
  private readonly fallback: ContentShowroomAdapter;

  constructor(
    payloadOrOptions?: PayloadLocalApiLike | PayloadLocalApiAdapterOptions | null
  ) {
    if (payloadOrOptions && "find" in payloadOrOptions) {
      this.payload = payloadOrOptions;
      this.fallback = new InMemoryContentAdapter();
    } else {
      this.payload = payloadOrOptions?.payload ?? null;
      this.fallback =
        payloadOrOptions?.fallbackAdapter ?? new InMemoryContentAdapter();
    }
  }

  async listEpisodes(locale: Locale): Promise<ReadonlyArray<EpisodeDetail>> {
    const validLocale = LocaleSchema.parse(locale);
    if (!this.payload) {
      return this.fallback.listEpisodes(validLocale);
    }
    try {
      const result = await this.payload.find<EpisodeDetail>({
        collection: "episodes",
        locale: validLocale,
        fallbackLocale: payloadLocalizationConfig.defaultLocale,
        sort: "episodeNumber",
        limit: 50,
        overrideAccess: false,
      });
      if (result.docs.length > 0) {
        return result.docs;
      }
      return this.fallback.listEpisodes(validLocale);
    } catch {
      return this.fallback.listEpisodes(validLocale);
    }
  }

  async getEpisodeBySlug(
    slug: string,
    locale: Locale
  ): Promise<EpisodeDetail | undefined> {
    const validLocale = LocaleSchema.parse(locale);
    const normalizedSlug = slug.trim();
    if (!normalizedSlug) {
      return undefined;
    }
    if (!this.payload) {
      return this.fallback.getEpisodeBySlug(normalizedSlug, validLocale);
    }
    try {
      const result = await this.payload.find<EpisodeDetail>({
        collection: "episodes",
        locale: validLocale,
        fallbackLocale: payloadLocalizationConfig.defaultLocale,
        where: {
          slug: { equals: normalizedSlug },
        },
        limit: 1,
        overrideAccess: false,
      });
      return result.docs[0] ?? this.fallback.getEpisodeBySlug(normalizedSlug, validLocale);
    } catch {
      return this.fallback.getEpisodeBySlug(normalizedSlug, validLocale);
    }
  }

  async listArticles(
    query: ArticleListQuery
  ): Promise<ReadonlyArray<ArticleDetail>> {
    const normalized = normalizeArticleQuery(query);
    if (!this.payload) {
      return this.fallback.listArticles(normalized);
    }
    try {
      const where: Record<string, { equals: string }> = {};
      if (normalized.horizon && normalized.horizon !== "all") {
        where.horizon = { equals: normalized.horizon };
      }
      const result = await this.payload.find<ArticleDetail>({
        collection: "articles",
        locale: normalized.locale,
        fallbackLocale: payloadLocalizationConfig.defaultLocale,
        where: Object.keys(where).length > 0 ? where : undefined,
        sort: "-publishedAt",
        limit: 50,
        overrideAccess: false,
      });
      if (result.docs.length > 0) {
        return filterArticles(result.docs, normalized);
      }
      return this.fallback.listArticles(normalized);
    } catch {
      return this.fallback.listArticles(normalized);
    }
  }

  async getArticleBySlug(
    slug: string,
    locale: Locale
  ): Promise<ArticleDetail | undefined> {
    const validLocale = LocaleSchema.parse(locale);
    const normalizedSlug = slug.trim();
    if (!normalizedSlug) {
      return undefined;
    }
    if (!this.payload) {
      return this.fallback.getArticleBySlug(normalizedSlug, validLocale);
    }
    try {
      const result = await this.payload.find<ArticleDetail>({
        collection: "articles",
        locale: validLocale,
        fallbackLocale: payloadLocalizationConfig.defaultLocale,
        where: {
          slug: { equals: normalizedSlug },
        },
        limit: 1,
        overrideAccess: false,
      });
      return result.docs[0] ?? this.fallback.getArticleBySlug(normalizedSlug, validLocale);
    } catch {
      return this.fallback.getArticleBySlug(normalizedSlug, validLocale);
    }
  }
}

export interface ContentShowroomRepository {
  listEpisodes(locale: Locale): Promise<ReadonlyArray<EpisodeDetail>>;
  getEpisodeBySlug(slug: string, locale: Locale): Promise<EpisodeDetail | undefined>;
  listArticles(query: ArticleListQuery): Promise<ReadonlyArray<ArticleDetail>>;
  getArticleBySlug(slug: string, locale: Locale): Promise<ArticleDetail | undefined>;
}

const defaultInMemoryAdapter = new InMemoryContentAdapter();

export function createContentShowroomRepository(
  adapter?: ContentShowroomAdapter | PayloadLocalApiLike | null
): ContentShowroomRepository {
  if (!adapter) {
    return defaultInMemoryAdapter;
  }
  if ("listEpisodes" in adapter) {
    return adapter;
  }
  return new PayloadLocalApiAdapter(adapter);
}

export function listEpisodes(locale: Locale): ReadonlyArray<EpisodeDetail> {
  return defaultInMemoryAdapter.listEpisodesSync(locale);
}

export function getEpisodeBySlug(
  slug: string,
  locale: Locale
): EpisodeDetail | undefined {
  return defaultInMemoryAdapter.getEpisodeBySlugSync(slug, locale);
}

export function listArticles(
  query: ArticleListQuery
): ReadonlyArray<ArticleDetail> {
  return defaultInMemoryAdapter.listArticlesSync(query);
}

export function getArticleBySlug(
  slug: string,
  locale: Locale
): ArticleDetail | undefined {
  return defaultInMemoryAdapter.getArticleBySlugSync(slug, locale);
}

export {
  ArticlesCollection,
  EpisodesCollection,
  SEED_ARTICLES,
  SEED_EPISODES,
  ShowcaseHarness,
  ShowcaseSlicesCollection,
  SponsorsCollection,
  adminOnlyWriteAccess,
  payloadCollections,
  payloadLocalizationConfig,
  publicReadAccess,
};

export type {
  ArticleDetail,
  ArticleQuery,
  ArticleSummary,
  EpisodeDetail,
  EpisodeSummary,
  HorizonTier,
  Locale,
  PayloadAccessArgs,
  PayloadAccessControl,
  PayloadCollectionConfig,
  PayloadCollectionSlug,
  PayloadFieldAdminConfig,
  PayloadFieldConfig,
  PayloadFieldPosition,
  PayloadFindArgs,
  PayloadFindResult,
  PayloadLocalApiLike,
  PayloadLocalizationConfig,
  PayloadWhereClause,
  PayloadWhereFieldCondition,
  ShowcaseHarnessProps,
  ShowcaseHarnessRenderState,
};
