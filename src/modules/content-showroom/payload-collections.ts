import {
  HORIZON_TIERS,
  PLUGIN_GROUPS,
  REACTOR_NODE_IDS,
  SHOWCASE_IDS,
  SUPPORTED_LOCALES,
  type HorizonTier,
  type Locale,
} from "@/types/portal";

export type PayloadFieldPosition = "sidebar" | "main";

export interface PayloadFieldAdminConfig {
  readonly position?: PayloadFieldPosition;
  readonly description?: string;
}

export type PayloadFieldConfig =
  | {
      readonly name: string;
      readonly type: "text" | "textarea" | "date" | "code";
      readonly required?: boolean;
      readonly unique?: boolean;
      readonly index?: boolean;
      readonly localized?: boolean;
      readonly admin?: PayloadFieldAdminConfig;
    }
  | {
      readonly name: string;
      readonly type: "slug";
      readonly useAsSlug: string;
      readonly required?: boolean;
      readonly unique?: boolean;
      readonly index?: boolean;
      readonly admin?: PayloadFieldAdminConfig;
    }
  | {
      readonly name: string;
      readonly type: "number" | "checkbox";
      readonly required?: boolean;
      readonly index?: boolean;
      readonly defaultValue?: number | boolean;
      readonly admin?: PayloadFieldAdminConfig;
    }
  | {
      readonly name: string;
      readonly type: "select";
      readonly required?: boolean;
      readonly hasMany?: boolean;
      readonly index?: boolean;
      readonly options: ReadonlyArray<string>;
      readonly admin?: PayloadFieldAdminConfig;
    }
  | {
      readonly name: string;
      readonly type: "group" | "array";
      readonly required?: boolean;
      readonly localized?: boolean;
      readonly fields: ReadonlyArray<PayloadFieldConfig>;
      readonly admin?: PayloadFieldAdminConfig;
    };

export interface PayloadAccessArgs {
  readonly req?: {
    readonly user?: {
      readonly id: string;
      readonly roles?: ReadonlyArray<string>;
    } | null;
  };
}

export type PayloadAccessControl = (args: PayloadAccessArgs) => boolean;

export interface PayloadCollectionConfig {
  readonly slug: "episodes" | "articles" | "showcase-slices" | "sponsors";
  readonly admin: {
    readonly useAsTitle: string;
    readonly defaultColumns: ReadonlyArray<string>;
    readonly group: string;
  };
  readonly versions?: {
    readonly drafts: boolean;
  };
  readonly access: {
    readonly read: PayloadAccessControl;
    readonly create: PayloadAccessControl;
    readonly update: PayloadAccessControl;
    readonly delete: PayloadAccessControl;
  };
  readonly timestamps: boolean;
  readonly fields: ReadonlyArray<PayloadFieldConfig>;
}

export interface PayloadLocalizationConfig {
  readonly locales: ReadonlyArray<{
    readonly code: Locale;
    readonly label: string;
  }>;
  readonly defaultLocale: Locale;
  readonly fallback: boolean;
}

export type PayloadCollectionSlug = PayloadCollectionConfig["slug"];

export interface PayloadWhereFieldCondition {
  readonly equals?: string | number | boolean;
  readonly in?: ReadonlyArray<string | number>;
}

export type PayloadWhereClause = Readonly<
  Record<string, PayloadWhereFieldCondition | undefined>
>;

export interface PayloadFindArgs<TSlug extends PayloadCollectionSlug = PayloadCollectionSlug> {
  readonly collection: TSlug;
  readonly locale: Locale;
  readonly fallbackLocale?: Locale;
  readonly where?: PayloadWhereClause;
  readonly limit?: number;
  readonly sort?: string;
  readonly overrideAccess?: boolean;
}

export interface PayloadFindResult<TDoc> {
  readonly docs: ReadonlyArray<TDoc>;
  readonly totalDocs: number;
}

export interface PayloadLocalApiLike {
  find<TDoc = Record<string, unknown>>(
    args: PayloadFindArgs
  ): Promise<PayloadFindResult<TDoc>>;
}

export const publicReadAccess: PayloadAccessControl = () => true;

export const adminOnlyWriteAccess: PayloadAccessControl = ({ req }) =>
  Boolean(req?.user?.roles?.includes("admin"));

export const payloadLocalizationConfig: PayloadLocalizationConfig = {
  locales: SUPPORTED_LOCALES.map((code) => ({
    code,
    label: code === "en" ? "English (EN)" : "Tiếng Việt (VI)",
  })),
  defaultLocale: "en",
  fallback: true,
};

export const EpisodesCollection: PayloadCollectionConfig = {
  slug: "episodes",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["episodeNumber", "title", "horizon", "_status", "publishedAt"],
    group: "Hivemind Content Showroom",
  },
  versions: {
    drafts: true,
  },
  access: {
    read: publicReadAccess,
    create: adminOnlyWriteAccess,
    update: adminOnlyWriteAccess,
    delete: adminOnlyWriteAccess,
  },
  timestamps: true,
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "slug",
      useAsSlug: "title",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "episodeNumber",
      type: "number",
      required: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "horizon",
      type: "select",
      required: true,
      index: true,
      options: HORIZON_TIERS,
      admin: { position: "sidebar" },
    },
    {
      name: "duration",
      type: "text",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "youtubeTeaserTitle",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "architectureTakeaway",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "featuredShowcases",
      type: "select",
      hasMany: true,
      required: true,
      options: SHOWCASE_IDS,
      admin: { position: "sidebar" },
    },
    {
      name: "transcriptTurns",
      type: "array",
      required: true,
      localized: true,
      fields: [
        { name: "timestamp", type: "text", required: true },
        { name: "speaker", type: "text", required: true },
        {
          name: "harness",
          type: "select",
          required: true,
          options: REACTOR_NODE_IDS,
        },
        { name: "text", type: "textarea", required: true, localized: true },
        { name: "tuiCommand", type: "code", required: true },
        { name: "tuiOutput", type: "code", required: true },
      ],
    },
  ],
};

export const ArticlesCollection: PayloadCollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "horizon", "readingTime", "_status", "publishedAt"],
    group: "Hivemind Content Showroom",
  },
  versions: {
    drafts: true,
  },
  access: {
    read: publicReadAccess,
    create: adminOnlyWriteAccess,
    update: adminOnlyWriteAccess,
    delete: adminOnlyWriteAccess,
  },
  timestamps: true,
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "slug",
      useAsSlug: "title",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "horizon",
      type: "select",
      required: true,
      index: true,
      options: HORIZON_TIERS,
      admin: { position: "sidebar" },
    },
    {
      name: "readingTime",
      type: "text",
      required: true,
      localized: true,
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "authorRole",
      type: "text",
      required: true,
      localized: true,
      admin: { position: "sidebar" },
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "proNotBroTakeaway",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "tags",
      type: "array",
      required: true,
      localized: true,
      fields: [{ name: "tag", type: "text", required: true, localized: true }],
    },
    {
      name: "sections",
      type: "array",
      required: true,
      localized: true,
      fields: [
        { name: "heading", type: "text", required: true, localized: true },
        {
          name: "bodyParagraphs",
          type: "array",
          required: true,
          localized: true,
          fields: [
            { name: "paragraph", type: "textarea", required: true, localized: true },
          ],
        },
        {
          name: "codeSnippet",
          type: "group",
          fields: [
            { name: "caption", type: "text", localized: true },
            { name: "code", type: "code" },
          ],
        },
      ],
    },
  ],
};

export const ShowcaseSlicesCollection: PayloadCollectionConfig = {
  slug: "showcase-slices",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["sliceId", "title", "plugin", "horizon", "harnessNode"],
    group: "Hivemind Content Showroom",
  },
  versions: {
    drafts: true,
  },
  access: {
    read: publicReadAccess,
    create: adminOnlyWriteAccess,
    update: adminOnlyWriteAccess,
    delete: adminOnlyWriteAccess,
  },
  timestamps: true,
  fields: [
    {
      name: "sliceId",
      type: "select",
      required: true,
      options: SHOWCASE_IDS,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "slug",
      useAsSlug: "title",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "plugin",
      type: "select",
      required: true,
      index: true,
      options: PLUGIN_GROUPS,
      admin: { position: "sidebar" },
    },
    {
      name: "horizon",
      type: "select",
      required: true,
      index: true,
      options: HORIZON_TIERS,
      admin: { position: "sidebar" },
    },
    {
      name: "harnessNode",
      type: "select",
      required: true,
      index: true,
      options: REACTOR_NODE_IDS,
      admin: { position: "sidebar" },
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "proNotBroLesson",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "xray",
      type: "group",
      required: true,
      fields: [
        { name: "humanPrompt", type: "code", required: true },
        { name: "orchestratorTool", type: "code", required: true },
        { name: "engineExecution", type: "code", required: true },
      ],
    },
  ],
};

export const SponsorsCollection: PayloadCollectionConfig = {
  slug: "sponsors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["tierId", "name", "priceLabel", "updatedAt"],
    group: "Hivemind Content Showroom",
  },
  access: {
    read: publicReadAccess,
    create: adminOnlyWriteAccess,
    update: adminOnlyWriteAccess,
    delete: adminOnlyWriteAccess,
  },
  timestamps: true,
  fields: [
    {
      name: "tierId",
      type: "select",
      required: true,
      index: true,
      options: ["wok-burner", "honeycomb-core", "ecosystem-title"],
      admin: { position: "sidebar" },
    },
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "slug",
      useAsSlug: "name",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "priceLabel",
      type: "text",
      required: true,
      localized: true,
      admin: { position: "sidebar" },
    },
    {
      name: "tagline",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "deliverables",
      type: "array",
      required: true,
      localized: true,
      fields: [
        { name: "deliverable", type: "text", required: true, localized: true },
      ],
    },
    {
      name: "ctaLabel",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "ctaHref",
      type: "text",
      required: true,
    },
  ],
};

export const payloadCollections: ReadonlyArray<PayloadCollectionConfig> = [
  EpisodesCollection,
  ArticlesCollection,
  ShowcaseSlicesCollection,
  SponsorsCollection,
];

export interface ArticleQuery {
  readonly locale: Locale;
  readonly horizon?: HorizonTier | "all";
  readonly tag?: string;
}
