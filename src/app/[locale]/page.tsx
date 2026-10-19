import type { Metadata } from "next";
import { PortalCockpitClient } from "@/components/portal-cockpit-client";
import {
  getGreenfieldWalkthrough,
  getHorizonSummaries,
  queryShowcases,
} from "@/modules/ecosystem-catalog";
import {
  getPortalDictionary,
  LocaleSchema,
  type Locale,
} from "@/modules/locale-dictionary";
import { resolveConversionCtas } from "@/modules/partner-conversion";

function resolveLocale(raw: string): Locale {
  const parsed = LocaleSchema.safeParse(raw);
  return parsed.success ? parsed.data : "en";
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getPortalDictionary(locale);

  return {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    openGraph: {
      title: dict.meta.siteTitle,
      description: dict.meta.ogTagline,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.siteTitle,
      description: dict.meta.ogTagline,
    },
  };
}

export default async function LocalePortalHomePage({
  params,
}: {
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = getPortalDictionary(locale);
  const horizons = getHorizonSummaries(locale);
  const showcases = queryShowcases({ locale, plugin: "all", horizon: "all" });
  const greenfield = getGreenfieldWalkthrough(locale);
  const initialConversion = resolveConversionCtas({
    locale,
    audience: "builders",
    sliceId: "S8",
  });

  return (
    <PortalCockpitClient
      locale={locale}
      dictionary={dictionary}
      horizons={horizons}
      showcases={showcases}
      greenfield={greenfield}
      initialConversion={initialConversion}
    />
  );
}
