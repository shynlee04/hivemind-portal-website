import {
  LocaleSchema,
  PortalDictionarySchema,
  SUPPORTED_LOCALES,
  type Locale,
  type PortalDictionary,
} from "@/types/portal";
import enRaw from "./en.json";
import viRaw from "./vi.json";

export {
  LocaleSchema,
  PortalDictionarySchema,
  SUPPORTED_LOCALES,
  type Locale,
  type PortalDictionary,
};

const DICTIONARIES: Record<Locale, PortalDictionary> = {
  en: PortalDictionarySchema.parse(enRaw),
  vi: PortalDictionarySchema.parse(viRaw),
};

function collectLeafKeyPaths(
  node: Record<string, unknown>,
  prefix = "",
): ReadonlyArray<string> {
  const keys = Object.keys(node).sort();
  const paths: string[] = [];

  for (const key of keys) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    const value = node[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      paths.push(
        ...collectLeafKeyPaths(value as Record<string, unknown>, fullPath),
      );
    } else {
      paths.push(fullPath);
    }
  }

  return paths;
}

export function getPortalDictionary(locale: Locale): PortalDictionary {
  const parsedLocale = LocaleSchema.parse(locale);
  return DICTIONARIES[parsedLocale];
}

export function verifyDictionaryParity(): {
  readonly valid: true;
  readonly keyCount: number;
} {
  const enValidated = PortalDictionarySchema.parse(enRaw);
  const viValidated = PortalDictionarySchema.parse(viRaw);

  const enPaths = collectLeafKeyPaths(
    enValidated as unknown as Record<string, unknown>,
  );
  const viPaths = collectLeafKeyPaths(
    viValidated as unknown as Record<string, unknown>,
  );

  if (enPaths.length !== viPaths.length) {
    throw new Error(
      `Locale dictionary key count mismatch: en=${enPaths.length}, vi=${viPaths.length}`,
    );
  }

  for (let index = 0; index < enPaths.length; index += 1) {
    const enPath = enPaths[index];
    const viPath = viPaths[index];
    if (enPath !== viPath) {
      throw new Error(
        `Locale dictionary path mismatch at index ${index}: en="${String(enPath)}" vs vi="${String(viPath)}"`,
      );
    }
  }

  return {
    valid: true,
    keyCount: enPaths.length,
  };
}
