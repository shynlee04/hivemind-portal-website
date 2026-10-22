import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getPortalDictionary,
  LocaleSchema,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/modules/locale-dictionary";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  readonly children: ReactNode;
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const parsed = LocaleSchema.safeParse(rawLocale);
  if (!parsed.success) notFound();
  const locale: Locale = parsed.data;
  const dict = getPortalDictionary(locale);

  return (
    <div id="top" lang={locale}>
      <SiteHeader
        locale={locale}
        nav={dict.nav}
        switchLabel={dict.meta.switchLocaleLabel}
      />
      <main>{children}</main>
      <SiteFooter locale={locale} footer={dict.footer} />
    </div>
  );
}
