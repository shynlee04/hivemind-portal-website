import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildInstallPlan } from "@/modules/ecosystem";
import {
  ArtIdSchema,
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

  test("every art id is used by the dictionaries and every dict image is a valid art id", () => {
    const valid = new Set<string>(ArtIdSchema.options);
    const used = new Set<string>();
    for (const locale of SUPPORTED_LOCALES) {
      const dict = JSON.parse(
        readFileSync(
          join(ROOT, "src/modules/locale-dictionary", `${locale}.json`),
          "utf8",
        ),
      ) as unknown;
      const visit = (node: unknown): void => {
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
    }
    for (const id of used) {
      expect(valid.has(id)).toBe(true);
    }
    for (const id of ArtIdSchema.options) {
      expect(used.has(id)).toBe(true);
    }
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
