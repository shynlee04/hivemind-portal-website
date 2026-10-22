import type { ImageId } from "@/modules/locale-dictionary";

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

export interface PhotoCredit {
  readonly id: ImageId;
  readonly file: string;
  readonly title: string;
  readonly creator: string;
  readonly license: string;
  readonly licenseUrl: string;
  readonly page: string;
}

export const PHOTO_CREDITS: ReadonlyArray<PhotoCredit> = [
  {
    id: "queen",
    file: "images/queen.jpg",
    title: "Apis mellifera scutellata 1355021",
    creator: "Scott Bauer, USDA Agricultural Research Service",
    license: "public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    page: "https://commons.wikimedia.org/wiki/File:Apis_mellifera_scutellata_1355021.jpg",
  },
  {
    id: "comb",
    file: "images/comb.jpg",
    title: "Western honey bee on a honeycomb",
    creator: "Matthew T Rader",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Western_honey_bee_on_a_honeycomb.jpg",
  },
  {
    id: "freshComb",
    file: "images/freshComb.jpg",
    title: "Fresh honeycomb dripping honey India",
    creator: "Vraj Acharya",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Fresh_honeycomb_dripping_honey_India.jpg",
  },
  {
    id: "catba",
    file: "images/catba.jpg",
    title: "Một số tổ ong tại Cát Bà",
    creator: "vi:User:Goodmorninghpvn",
    license: "public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    page: "https://commons.wikimedia.org/wiki/File:M%E1%BB%99t_s%E1%BB%91_t%E1%BB%95_ong_t%E1%BA%A1i_C%C3%A1t_B%C3%A0.jpg",
  },
  {
    id: "nectar",
    file: "images/nectar.jpg",
    title: "European honey bee extracts nectar",
    creator: "John Severns ( Severnjc )",
    license: "public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    page: "https://commons.wikimedia.org/wiki/File:European_honey_bee_extracts_nectar.jpg",
  },
  {
    id: "plate",
    file: "images/plate.jpg",
    title: "A practical treatise on the hive and honey-bee BHL22706778",
    creator: "Langstroth, Lorenzo Lorraine.",
    license: "public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    page: "https://commons.wikimedia.org/wiki/File:A_practical_treatise_on_the_hive_and_honey-bee_BHL22706778.jpg",
  },
];
