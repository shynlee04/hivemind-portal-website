export interface StorybookFrameworkConfig {
  readonly name: "@storybook/nextjs";
  readonly options: {
    readonly builder?: {
      readonly useSWC?: boolean;
    };
  };
}

export interface StorybookMainConfig {
  readonly stories: ReadonlyArray<string>;
  readonly addons: ReadonlyArray<string>;
  readonly framework: StorybookFrameworkConfig;
  readonly staticDirs?: ReadonlyArray<string>;
  readonly docs?: {
    readonly autodocs: "tag" | boolean;
  };
}

const config: StorybookMainConfig = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
