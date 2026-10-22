export const PRODUCTS = {
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
} as const;

export type ProductId = keyof typeof PRODUCTS;

export const LINKS = {
  kofi: "https://ko-fi.com/shynlee04",
  buyMeACoffee: "https://buymeacoffee.com/shynlee04l",
  freebuffReferral:
    "https://freebuff.com/?ref=ref-6c980d54-a29a-4270-a160-35f13e62a2ff",
  zaiReferral: "https://z.ai/subscribe?ic=LTWUT4H2RS",
  video: "https://youtu.be/tgTFweV7bLo",
  channel: "https://www.youtube.com/@Elecosys",
} as const;

export type PluginChoice = "steward" | "substrate" | "both";
export type InstallScope = "global" | "project";
export type InstallNoteId =
  | "stewardGlobal"
  | "stewardProject"
  | "substrateGlobal"
  | "substrateProject"
  | "reload"
  | "setup";

export interface InstallStep {
  readonly kind: "shell" | "json" | "tui";
  readonly text: string;
  readonly note: InstallNoteId;
}

export function buildInstallPlan(
  plugins: PluginChoice,
  scope: InstallScope,
): ReadonlyArray<InstallStep> {
  const steps: Array<InstallStep> = [];
  const stewardRef = PRODUCTS.steward.pkg;
  const substrateRef = PRODUCTS.substrate.pkg;

  if (plugins !== "substrate") {
    steps.push(
      scope === "global"
        ? {
          kind: "shell",
          text: `opencode plugin add ${stewardRef}`,
          note: "stewardGlobal",
        }
        : {
          kind: "json",
          text: JSON.stringify({ plugins: [{ package: stewardRef }] }, null, 2),
          note: "stewardProject",
        },
    );
  }

  if (plugins !== "steward") {
    steps.push(
      scope === "global"
        ? {
          kind: "shell",
          text: `opencode plugin add ${substrateRef}`,
          note: "substrateGlobal",
        }
        : {
          kind: "json",
          text: JSON.stringify({ plugins: [{ package: substrateRef }] }, null, 2),
          note: "substrateProject",
        },
    );
  }

  steps.push({ kind: "shell", text: "opencode", note: "reload" });

  if (plugins !== "substrate") {
    steps.push({ kind: "tui", text: "/hivemind-setup", note: "setup" });
  }

  return steps;
}
