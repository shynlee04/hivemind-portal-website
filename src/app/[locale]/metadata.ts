import type { Metadata } from "next";
import {
  getPortalDictionary,
  LocaleSchema,
  SUPPORTED_LOCALES,
} from "@/modules/locale-dictionary";

export function buildPageMetadata(
  rawLocale: string,
  page: "home" | "steward" | "substrate",
): Metadata {
  const parsed = LocaleSchema.safeParse(rawLocale);
  const locale = parsed.success ? parsed.data : "en";
  const meta = getPortalDictionary(locale).meta.pages[page];
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      l,
      page === "home" ? `/${l}` : `/${l}/${page}`,
    ]),
  );
  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
    },
  };
}
