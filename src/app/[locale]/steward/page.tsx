import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StewardPage } from "@/components/steward/steward-page";
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
  return buildPageMetadata(locale, "steward");
}

export default async function LocaleStewardPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const parsed = LocaleSchema.safeParse(rawLocale);
  if (!parsed.success) notFound();
  const dict = getPortalDictionary(parsed.data);
  return <StewardPage dict={dict} locale={parsed.data} />;
}
