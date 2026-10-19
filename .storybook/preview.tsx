import React, { type ComponentType } from "react";
import {
  HorizonTierSchema,
  LocaleSchema,
  type HorizonTier,
  type Locale,
} from "@/types/portal";
import { ShowcaseHarness } from "@/modules/content-showroom";

export interface StorybookGlobalToolbarItem<TValue extends string> {
  readonly value: TValue;
  readonly title: string;
}

export interface StorybookGlobalTypeConfig<TValue extends string = string> {
  readonly name: string;
  readonly description: string;
  readonly defaultValue: TValue;
  readonly toolbar: {
    readonly icon: string;
    readonly dynamicTitle: boolean;
    readonly items: ReadonlyArray<StorybookGlobalToolbarItem<TValue>>;
  };
}

export interface StorybookContext {
  readonly globals: {
    readonly locale?: string;
    readonly reducedMotion?: string;
    readonly horizon?: string;
  };
  readonly title?: string;
  readonly name?: string;
}

export type StorybookDecorator = (
  Story: ComponentType,
  context: StorybookContext
) => React.ReactElement;

export interface StorybookPreviewConfig {
  readonly globalTypes: {
    readonly locale: StorybookGlobalTypeConfig<Locale>;
    readonly reducedMotion: StorybookGlobalTypeConfig<"off" | "reduce">;
    readonly horizon: StorybookGlobalTypeConfig<HorizonTier>;
  };
  readonly parameters: {
    readonly layout: "fullscreen" | "padded" | "centered";
    readonly backgrounds: {
      readonly default: string;
      readonly values: ReadonlyArray<{
        readonly name: string;
        readonly value: string;
      }>;
    };
  };
  readonly decorators: ReadonlyArray<StorybookDecorator>;
}

export const withCyberWokHarness: StorybookDecorator = (Story, context) => {
  const parsedLocale = LocaleSchema.safeParse(context.globals.locale);
  const locale: Locale = parsedLocale.success ? parsedLocale.data : "en";
  const reducedMotion = context.globals.reducedMotion === "reduce";
  const parsedHorizon = HorizonTierSchema.safeParse(context.globals.horizon);
  const horizon: HorizonTier = parsedHorizon.success
    ? parsedHorizon.data
    : "shipped";

  return (
    <ShowcaseHarness
      locale={locale}
      reducedMotion={reducedMotion}
      horizon={horizon}
      componentName={context.title ?? "PortalStory"}
      title={context.name}
    >
      <Story />
    </ShowcaseHarness>
  );
};

const preview: StorybookPreviewConfig = {
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Bilingual EN / VI portal dictionary switch",
      defaultValue: "en",
      toolbar: {
        icon: "globe",
        dynamicTitle: true,
        items: [
          { value: "en", title: "English (EN)" },
          { value: "vi", title: "Tiếng Việt (VI)" },
        ],
      },
    },
    reducedMotion: {
      name: "Motion Safety",
      description: "Toggle prefers-reduced-motion deterministic SVG schematic",
      defaultValue: "off",
      toolbar: {
        icon: "accessibility",
        dynamicTitle: true,
        items: [
          { value: "off", title: "WebGL 3D Loop (Motion ON)" },
          { value: "reduce", title: "Deterministic SVG Fallback (Reduced Motion)" },
        ],
      },
    },
    horizon: {
      name: "Horizon Tier",
      description: "Active 3-Horizon ecosystem maturity filter",
      defaultValue: "shipped",
      toolbar: {
        icon: "branch",
        dynamicTitle: true,
        items: [
          { value: "shipped", title: "SHIPPED NOW · v0.1" },
          { value: "next-release", title: "NEXT RELEASE · v0.2" },
          { value: "roadmap", title: "ROADMAP LAB · SUBSTRATE" },
        ],
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "wok-iron",
      values: [
        { name: "wok-iron", value: "#080B10" },
        { name: "smoked-basalt", value: "#111622" },
      ],
    },
  },
  decorators: [withCyberWokHarness],
};

export default preview;
