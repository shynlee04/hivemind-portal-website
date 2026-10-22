import type { Locale, PortalDictionary } from "@/modules/locale-dictionary";
import { Revealer } from "@/components/revealer";
import { HomeHero } from "./hero";
import { HomeIntro } from "./intro";
import { HomeShowcase } from "./showcase";
import { HomeSteps } from "./steps";
import { HomeLedger } from "./ledger";
import { HomeInstall } from "./install";

export function HomePage({
  dict,
  locale,
}: {
  readonly dict: PortalDictionary;
  readonly locale: Locale;
}) {
  return (
    <Revealer>
      <HomeHero dict={dict} locale={locale} />
      <HomeIntro dict={dict} />
      <HomeShowcase
        showcase={dict.home.showcase}
        images={dict.common.images}
        locale={locale}
      />
      <HomeSteps dict={dict} />
      <HomeLedger dict={dict} />
      <HomeInstall dict={dict} />
    </Revealer>
  );
}
