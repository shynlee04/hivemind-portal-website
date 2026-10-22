import { z } from "zod";

export const SUPPORTED_LOCALES = ["en", "vi"] as const;
export const LocaleSchema = z.enum(SUPPORTED_LOCALES);
export type Locale = z.infer<typeof LocaleSchema>;

export const ArtIdSchema = z.enum([
  "agent",
  "honeycomb",
  "yield",
  "build",
  "orbit",
  "diagram",
]);
export type ArtId = z.infer<typeof ArtIdSchema>;

const TuiToneSchema = z.enum([
  "prompt",
  "agent",
  "tool",
  "plan",
  "muted",
  "ok",
]);

const TuiLineSchema = z
  .object({ tone: TuiToneSchema, label: z.string(), text: z.string() })
  .strict();

const TuiFragmentSchema = z
  .object({ caption: z.string(), lines: z.array(TuiLineSchema) })
  .strict();

const IntroSegmentSchema = z.union([
  z.object({ text: z.string() }).strict(),
  z.object({ image: ArtIdSchema }).strict(),
]);

const HeadlineSchema = z
  .object({
    accessibleHeadline: z.string(),
    line1: z.string(),
    line2: z.string(),
    support: z.string(),
  })
  .strict();

const ProductHeroSchema = HeadlineSchema.extend({
  installCommand: z.string(),
  installNote: z.string(),
}).strict();

const SwitchesSchema = z
  .object({
    label: z.string(),
    items: z.array(
      z
        .object({
          sentence: z.string(),
          consequence: z.string(),
          on: z.boolean(),
        })
        .strict(),
    ),
  })
  .strict();

const InstallNotesSchema = z
  .object({
    stewardGlobal: z.string(),
    stewardProject: z.string(),
    substrateGlobal: z.string(),
    substrateProject: z.string(),
    reload: z.string(),
    setup: z.string(),
  })
  .strict();

export const PortalDictionarySchema = z
  .object({
    meta: z
      .object({
        locale: LocaleSchema,
        languageLabel: z.string(),
        switchLocaleLabel: z.string(),
        pages: z
          .object({
            home: z
              .object({ title: z.string(), description: z.string() })
              .strict(),
            steward: z
              .object({ title: z.string(), description: z.string() })
              .strict(),
            substrate: z
              .object({ title: z.string(), description: z.string() })
              .strict(),
          })
          .strict(),
      })
      .strict(),
    nav: z
      .object({
        brand: z.string(),
        steward: z.string(),
        substrate: z.string(),
        install: z.string(),
        menu: z.string(),
        close: z.string(),
        skip: z.string(),
      })
      .strict(),
    common: z
      .object({
        copy: z.string(),
        copied: z.string(),
        copyAria: z.string(),
        copyAll: z.string(),
        npm: z.string(),
        github: z.string(),
        example: z.string(),
        images: z
          .object({
            agent: z.object({ alt: z.string() }).strict(),
            honeycomb: z.object({ alt: z.string() }).strict(),
            yield: z.object({ alt: z.string() }).strict(),
            build: z.object({ alt: z.string() }).strict(),
            orbit: z.object({ alt: z.string() }).strict(),
            diagram: z.object({ alt: z.string() }).strict(),
          })
          .strict(),
      })
      .strict(),
    fragments: z
      .object({
        hosted: TuiFragmentSchema,
        delegate: TuiFragmentSchema,
        trace: TuiFragmentSchema,
      })
      .strict(),
    home: z
      .object({
        hero: HeadlineSchema.extend({
          primary: z.string(),
          links: z.array(z.string()),
        }).strict(),
        intro: z.array(IntroSegmentSchema),
        showcase: z
          .object({
            tabsLabel: z.string(),
            tabs: z.array(
              z
                .object({
                  id: z.enum(["steward", "substrate"]),
                  tab: z.string(),
                  image: ArtIdSchema,
                  title: z.string(),
                  body: z.string(),
                  version: z.string(),
                  primary: z.string(),
                  secondary: z.string(),
                })
                .strict(),
            ),
          })
          .strict(),
        steps: z
          .object({
            heading: z.string(),
            items: z.array(
              z
                .object({
                  image: ArtIdSchema,
                  name: z.string(),
                  body: z.string(),
                })
                .strict(),
            ),
          })
          .strict(),
        ledger: z
          .object({
            heading: z.string(),
            tableName: z.string(),
            image: ArtIdSchema,
            groups: z.array(
              z
                .object({
                  rows: z.array(
                    z
                      .object({
                        kind: z.string(),
                        what: z.string(),
                        value: z.string(),
                      })
                      .strict(),
                  ),
                })
                .strict(),
            ),
          })
          .strict(),
        install: z
          .object({
            line1: z.string(),
            line2: z.string(),
            body: z.string(),
            dialogTitle: z.string(),
            pluginLabel: z.string(),
            plugins: z
              .object({
                steward: z.string(),
                substrate: z.string(),
                both: z.string(),
              })
              .strict(),
            scopeLabel: z.string(),
            scopes: z
              .object({ global: z.string(), project: z.string() })
              .strict(),
            stepsLabel: z.string(),
            notes: InstallNotesSchema,
          })
          .strict(),
      })
      .strict(),
    steward: z
      .object({
        hero: ProductHeroSchema,
        switches: SwitchesSchema,
        try: z
          .object({
            heading: z.string(),
            inputLabel: z.string(),
            examplesLabel: z.string(),
            sideTitle: z.string(),
            sideBody: z.string(),
          })
          .strict(),
        setup: z
          .object({
            heading: z.string(),
            body: z.string(),
            steps: z.array(
              z.object({ command: z.string(), what: z.string() }).strict(),
            ),
            card: z
              .object({
                title: z.string(),
                options: z.array(z.string()),
                hint: z.string(),
                health: z.string(),
              })
              .strict(),
            needsHeading: z.string(),
            needs: z.array(z.string()),
            needsNote: z.string(),
          })
          .strict(),
        keys: z
          .object({
            line1: z.string(),
            line2: z.string(),
            tableName: z.string(),
            image: ArtIdSchema,
          })
          .strict(),
        closing: z
          .object({
            line1: z.string(),
            line2: z.string(),
            body: z.string(),
            button: z.string(),
            alt: z.string(),
            roadmapTitle: z.string(),
            roadmap: z.array(
              z.object({ name: z.string(), state: z.string() }).strict(),
            ),
          })
          .strict(),
      })
      .strict(),
    substrate: z
      .object({
        hero: ProductHeroSchema,
        intro: z.array(IntroSegmentSchema),
        layers: z
          .object({
            tabsLabel: z.string(),
            tabs: z.array(
              z
                .object({
                  id: z.enum(["spine", "honeycomb", "viewports"]),
                  tab: z.string(),
                  title: z.string(),
                  body: z.string(),
                  plate: z.array(z.string()),
                })
                .strict(),
            ),
            primary: z.string(),
            secondary: z.string(),
          })
          .strict(),
        trace: z
          .object({
            heading: z.string(),
            body: z.string(),
            demoTitle: z.string(),
            demoNote: z.string(),
            packageLabel: z.string(),
            leafLabel: z.string(),
            pickBranch: z.string(),
          })
          .strict(),
        switches: SwitchesSchema,
        commands: z
          .object({
            line1: z.string(),
            line2: z.string(),
            tableName: z.string(),
            image: ArtIdSchema,
            groups: z.array(
              z
                .object({
                  label: z.string(),
                  rows: z.array(
                    z.object({ key: z.string(), what: z.string() }).strict(),
                  ),
                })
                .strict(),
            ),
          })
          .strict(),
        closing: z
          .object({
            line1: z.string(),
            line2: z.string(),
            body: z.string(),
            button: z.string(),
            privacy: z.string(),
          })
          .strict(),
      })
      .strict(),
    footer: z
      .object({
        tagline: z.string(),
        columns: z
          .object({
            plugins: z.string(),
            install: z.string(),
            source: z.string(),
            watch: z.string(),
            support: z.string(),
          })
          .strict(),
        links: z
          .object({
            steward: z.string(),
            substrate: z.string(),
            stewardNpm: z.string(),
            substrateNpm: z.string(),
            stewardGithub: z.string(),
            substrateGithub: z.string(),
            video: z.string(),
            channel: z.string(),
            kofi: z.string(),
            bmc: z.string(),
          })
          .strict(),
        referralBefore: z.string(),
        referralFreebuff: z.string(),
        referralMiddle: z.string(),
        referralZai: z.string(),
        referralAfter: z.string(),
        backToTop: z.string(),
        copyright: z.string(),
      })
      .strict(),
  })
  .strict();

export type PortalDictionary = z.infer<typeof PortalDictionarySchema>;
