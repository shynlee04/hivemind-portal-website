import type { Locale, PortalDictionary } from "@/modules/locale-dictionary";
import { Revealer } from "@/components/revealer";
import { SwitchBands } from "@/components/switch-bands";
import { StewardHero } from "./hero";
import { TryCommand } from "./try-command";
import { StewardSetup } from "./setup";
import { StewardKeys } from "./keys";
import { StewardClosing } from "./closing";

export function StewardPage({
  dict,
  locale,
}: {
  readonly dict: PortalDictionary;
  readonly locale: Locale;
}) {
  return (
    <Revealer>
      <StewardHero dict={dict} />
      <SwitchBands
        label={dict.steward.switches.label}
        items={dict.steward.switches.items}
      />
      <TryCommand dict={dict} locale={locale} />
      <StewardSetup dict={dict} />
      <StewardKeys dict={dict} locale={locale} />
      <StewardClosing dict={dict} />
    </Revealer>
  );
}
