import { describe, expect, test } from "bun:test";
import {
  buildInstallPlan,
  LINKS,
  PRODUCTS,
  type InstallNoteId,
  type InstallScope,
  type PluginChoice,
} from "@/modules/ecosystem";
import {
  getPortalDictionary,
  SUPPORTED_LOCALES,
} from "@/modules/locale-dictionary";
const STEWARD_REF = "hmoc-steward-acp";
const SUBSTRATE_REF = "hivemind-substrate";
const STEWARD_PROJECT_JSON = `{
  "plugins": [
    {
      "package": "${STEWARD_REF}"
    }
  ]
}`;
const SUBSTRATE_PROJECT_JSON = `{
  "plugins": [
    {
      "package": "${SUBSTRATE_REF}"
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
          text: `opencode plugin add ${SUBSTRATE_REF}`,
          note: "substrateGlobal",
        },
        { kind: "shell", text: "opencode", note: "reload" },
      ],
      project: [
        { kind: "json", text: SUBSTRATE_PROJECT_JSON, note: "substrateProject" },
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
          text: `opencode plugin add ${SUBSTRATE_REF}`,
          note: "substrateGlobal",
        },
        { kind: "shell", text: "opencode", note: "reload" },
        { kind: "tui", text: "/hivemind-setup", note: "setup" },
      ],
      project: [
        { kind: "json", text: STEWARD_PROJECT_JSON, note: "stewardProject" },
        { kind: "json", text: SUBSTRATE_PROJECT_JSON, note: "substrateProject" },
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
