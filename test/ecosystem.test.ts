import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  buildInstallPlan,
  LINKS,
  PHOTO_CREDITS,
  PRODUCTS,
  type InstallNoteId,
  type InstallScope,
  type PluginChoice,
} from "@/modules/ecosystem";
import {
  getPortalDictionary,
  ImageIdSchema,
  SUPPORTED_LOCALES,
} from "@/modules/locale-dictionary";

const ROOT = process.cwd();
const STEWARD_REF = "hmoc-steward-acp@0.4.0";
const SUBSTRATE_REF = "hivemind-substrate@0.2.0-beta.1";
const STEWARD_PROJECT_JSON = `{
  "plugins": [
    {
      "package": "${STEWARD_REF}"
    }
  ]
}`;

describe("EcosystemModule products and links", () => {
  test("PRODUCTS carries exact package identities and URLs", () => {
    expect(PRODUCTS).toEqual({
      steward: {
        name: "Steward",
        pkg: "hmoc-steward-acp",
        version: "0.4.0",
        channel: "latest",
        npmUrl: "https://www.npmjs.com/package/hmoc-steward-acp",
        repoUrl: "https://github.com/shynlee04/hmoc-steward-acp",
        issuesUrl: "https://github.com/shynlee04/hmoc-steward-acp/issues",
      },
      substrate: {
        name: "Substrate",
        pkg: "hivemind-substrate",
        version: "0.2.0-beta.1",
        channel: "beta",
        npmUrl: "https://www.npmjs.com/package/hivemind-substrate",
        repoUrl: "https://github.com/shynlee04/opencode-session-archive",
        issuesUrl:
          "https://github.com/shynlee04/opencode-session-archive/issues",
      },
    });
  });

  test("LINKS carries the exact referral, video and support URLs", () => {
    expect(LINKS).toEqual({
      kofi: "https://ko-fi.com/shynlee04",
      buyMeACoffee: "https://buymeacoffee.com/shynlee04l",
      freebuffReferral:
        "https://freebuff.com/?ref=ref-6c980d54-a29a-4270-a160-35f13e62a2ff",
      zaiReferral: "https://z.ai/subscribe?ic=LTWUT4H2RS",
      video: "https://youtu.be/tgTFweV7bLo",
      channel: "https://www.youtube.com/@Elecosys",
    });
  });
});

describe("EcosystemModule install plans", () => {
  const expected: Record<
    PluginChoice,
    Record<
      InstallScope,
      ReadonlyArray<{
        kind: "shell" | "json" | "tui";
        text: string;
        note: InstallNoteId;
      }>
    >
  > = {
    steward: {
      global: [
        {
          kind: "shell",
          text: `opencode plugin add ${STEWARD_REF}`,
          note: "stewardGlobal",
        },
        { kind: "shell", text: "opencode", note: "reload" },
        { kind: "tui", text: "/hivemind-setup", note: "setup" },
      ],
      project: [
        { kind: "json", text: STEWARD_PROJECT_JSON, note: "stewardProject" },
        { kind: "shell", text: "opencode", note: "reload" },
        { kind: "tui", text: "/hivemind-setup", note: "setup" },
      ],
    },
    substrate: {
      global: [
        {
          kind: "shell",
          text: `npx ${SUBSTRATE_REF} --global`,
          note: "substrateGlobal",
        },
        { kind: "shell", text: "opencode", note: "reload" },
      ],
      project: [
        {
          kind: "shell",
          text: `npx ${SUBSTRATE_REF}`,
          note: "substrateProject",
        },
        { kind: "shell", text: "opencode", note: "reload" },
      ],
    },
    both: {
      global: [
        {
          kind: "shell",
          text: `opencode plugin add ${STEWARD_REF}`,
          note: "stewardGlobal",
        },
        {
          kind: "shell",
          text: `npx ${SUBSTRATE_REF} --global`,
          note: "substrateGlobal",
        },
        { kind: "shell", text: "opencode", note: "reload" },
        { kind: "tui", text: "/hivemind-setup", note: "setup" },
      ],
      project: [
        { kind: "json", text: STEWARD_PROJECT_JSON, note: "stewardProject" },
        {
          kind: "shell",
          text: `npx ${SUBSTRATE_REF}`,
          note: "substrateProject",
        },
        { kind: "shell", text: "opencode", note: "reload" },
        { kind: "tui", text: "/hivemind-setup", note: "setup" },
      ],
    },
  };

  for (const plugin of ["steward", "substrate", "both"] as const) {
    for (const scope of ["global", "project"] as const) {
      test(`${plugin} × ${scope} produces the exact step sequence`, () => {
        expect(buildInstallPlan(plugin, scope)).toEqual(
          expected[plugin][scope],
        );
      });
    }
  }

  test("every note id exists in the dictionary install notes", () => {
    for (const locale of SUPPORTED_LOCALES) {
      const notes = getPortalDictionary(locale).home.install.notes;
      for (const plugin of ["steward", "substrate", "both"] as const) {
        for (const scope of ["global", "project"] as const) {
          for (const step of buildInstallPlan(plugin, scope)) {
            expect(typeof notes[step.note]).toBe("string");
            expect(notes[step.note].length).toBeGreaterThan(0);
          }
        }
      }
    }
  });
});

describe("EcosystemModule photo credits", () => {
  test("covers every image id used by the dictionaries", () => {
    const credited = new Set(PHOTO_CREDITS.map((credit) => credit.id));
    for (const id of ImageIdSchema.options) {
      expect(credited.has(id)).toBe(true);
    }

    for (const locale of SUPPORTED_LOCALES) {
      const dict = JSON.parse(
        readFileSync(
          join(ROOT, "src/modules/locale-dictionary", `${locale}.json`),
          "utf8",
        ),
      );
      const used = new Set<string>();
      const visit = (node: unknown) => {
        if (typeof node !== "object" || node === null) return;
        if (Array.isArray(node)) {
          node.forEach(visit);
          return;
        }
        for (const [key, value] of Object.entries(node)) {
          if (key === "image" && typeof value === "string") used.add(value);
          visit(value);
        }
      };
      visit(dict);
      for (const id of used) {
        expect(credited.has(id as (typeof ImageIdSchema.options)[number])).toBe(
          true,
        );
      }
    }
  });

  test("every credited image file exists under public/images", () => {
    for (const credit of PHOTO_CREDITS) {
      expect(existsSync(join(ROOT, "public", credit.file))).toBe(true);
    }
  });
});
