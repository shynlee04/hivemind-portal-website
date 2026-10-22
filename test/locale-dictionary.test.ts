import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildInstallPlan } from "@/modules/ecosystem";
import {
  getPortalDictionary,
  PortalDictionarySchema,
  SUPPORTED_LOCALES,
  verifyDictionaryParity,
  type Locale,
} from "@/modules/locale-dictionary";

const ROOT = process.cwd();

describe("LocaleDictionaryModule seam", () => {
  test("both dictionaries parse with the strict schema", () => {
    for (const locale of SUPPORTED_LOCALES) {
      const raw = JSON.parse(
        readFileSync(
          join(ROOT, "src/modules/locale-dictionary", `${locale}.json`),
          "utf8",
        ),
      );
      expect(() => PortalDictionarySchema.parse(raw)).not.toThrow();
    }
  });

  test("en and vi have full recursive key and array-length parity", () => {
    const parity = verifyDictionaryParity();
    expect(parity.valid).toBe(true);
    expect(parity.keyCount).toBeGreaterThan(0);
  });

  test("getPortalDictionary rejects unsupported locales", () => {
    expect(() => getPortalDictionary("fr" as unknown as Locale)).toThrow();
  });

  test("hero install commands equal the strings built by buildInstallPlan", () => {
    const stewardGlobal = buildInstallPlan("steward", "global")[0]!.text;
    const substrateGlobal = buildInstallPlan("substrate", "global")[0]!.text;
    for (const locale of SUPPORTED_LOCALES) {
      const dict = getPortalDictionary(locale);
      expect(dict.steward.hero.installCommand).toBe(stewardGlobal);
      expect(dict.substrate.hero.installCommand).toBe(substrateGlobal);
    }
  });
});
