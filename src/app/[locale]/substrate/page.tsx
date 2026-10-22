import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubstratePage } from "@/components/substrate/substrate-page";
import {
  getPortalDictionary,
  LocaleSchema,
} from "@/modules/locale-dictionary";
import { buildPageMetadata } from "../metadata";

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "substrate");
}

export default async function LocaleSubstratePage({
  params,
}: {
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const parsed = LocaleSchema.safeParse(rawLocale);
  if (!parsed.success) notFound();
  const dict = getPortalDictionary(parsed.data);
  return <SubstratePage dict={dict} locale={parsed.data} />;
}
