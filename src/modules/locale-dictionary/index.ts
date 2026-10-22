import enRaw from "./en.json";
import viRaw from "./vi.json";
import {
  ArtIdSchema,
  LocaleSchema,
  PortalDictionarySchema,
  SUPPORTED_LOCALES,
  type ArtId,
  type Locale,
  type PortalDictionary,
} from "./schema";

export {
  ArtIdSchema,
  LocaleSchema,
  PortalDictionarySchema,
  SUPPORTED_LOCALES,
  type ArtId,
  type Locale,
  type PortalDictionary,
};

const DICTIONARIES: Record<Locale, PortalDictionary> = {
  en: PortalDictionarySchema.parse(enRaw),
  vi: PortalDictionarySchema.parse(viRaw),
};

export function getPortalDictionary(locale: Locale): PortalDictionary {
  return DICTIONARIES[LocaleSchema.parse(locale)];
}

function collectLeafKeyPaths(
  node: Record<string, unknown>,
  prefix: string,
  paths: Array<string>,
): void {
  for (const key of Object.keys(node).sort()) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    const value = node[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      collectLeafKeyPaths(value as Record<string, unknown>, fullPath, paths);
    } else {
      paths.push(fullPath);
    }
  }
}

function collectArrayLengths(
  node: unknown,
  prefix: string,
  lengths: Map<string, number>,
): void {
  if (Array.isArray(node)) {
    lengths.set(prefix, node.length);
    return;
  }
  if (typeof node === "object" && node !== null) {
    for (const key of Object.keys(node)) {
      collectArrayLengths(
        (node as Record<string, unknown>)[key],
        prefix ? `${prefix}.${key}` : key,
        lengths,
      );
    }
  }
}

export function verifyDictionaryParity(): {
  readonly valid: true;
  readonly keyCount: number;
} {
  const enValidated = PortalDictionarySchema.parse(enRaw);
  const viValidated = PortalDictionarySchema.parse(viRaw);

  const enPaths: Array<string> = [];
  const viPaths: Array<string> = [];
  collectLeafKeyPaths(
    enValidated as unknown as Record<string, unknown>,
    "",
    enPaths,
  );
  collectLeafKeyPaths(
    viValidated as unknown as Record<string, unknown>,
    "",
    viPaths,
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

  const enLengths = new Map<string, number>();
  const viLengths = new Map<string, number>();
  collectArrayLengths(enValidated, "", enLengths);
  collectArrayLengths(viValidated, "", viLengths);

  for (const [path, length] of enLengths) {
    if (viLengths.get(path) !== length) {
      throw new Error(
        `Locale dictionary array length mismatch at "${path}": en=${length}, vi=${String(viLengths.get(path))}`,
      );
    }
  }

  return { valid: true, keyCount: enPaths.length };
}
