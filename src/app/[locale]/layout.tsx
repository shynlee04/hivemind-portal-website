import type { ReactNode } from "react";
import { FOOTER_URLS, SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import {
  getPortalDictionary,
  LocaleSchema,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/modules/locale-dictionary";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

function resolveLocale(raw: string): Locale {
  const parsed = LocaleSchema.safeParse(raw);
  return parsed.success ? parsed.data : "en";
}

export default async function LocaleLayout({
  children,
  params,
}: {
  readonly children: ReactNode;
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getPortalDictionary(locale);
  const alternateLocale: Locale = locale === "en" ? "vi" : "en";

  return (
    <div lang={locale} data-locale={locale} id="top">
      <SiteHeader
        locale={locale}
        alternateLocale={alternateLocale}
        nav={dict.nav}
        switchLabel={dict.meta.switchLocaleLabel}
      />
      <main>{children}</main>
      <SiteFooter footer={dict.home.footer} urls={FOOTER_URLS} />
    </div>
  );
}
