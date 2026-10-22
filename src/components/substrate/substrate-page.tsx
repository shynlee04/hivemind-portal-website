import type { Locale, PortalDictionary } from "@/modules/locale-dictionary";
import { Revealer } from "@/components/revealer";
import { StatementWithThumbs } from "@/components/statement";
import { SwitchBands } from "@/components/switch-bands";
import { SubstrateHero } from "./hero";
import { SubstrateLayers } from "./layers";
import { SubstrateTrace } from "./trace";
import { SubstrateCommands } from "./commands";
import { SubstrateClosing } from "./closing";
import styles from "./substrate.module.css";

export function SubstratePage({
  dict,
  locale,
}: {
  readonly dict: PortalDictionary;
  readonly locale: Locale;
}) {
  return (
    <Revealer>
      <SubstrateHero dict={dict} />
      <section className={styles.intro}>
        <div className="shell">
          <div className={styles.introInner}>
            <StatementWithThumbs
              segments={dict.substrate.intro}
              alts={dict.common.images}
            />
          </div>
        </div>
      </section>
      <SubstrateLayers layers={dict.substrate.layers} />
      <SubstrateTrace dict={dict} locale={locale} />
      <SwitchBands
        label={dict.substrate.switches.label}
        items={dict.substrate.switches.items}
      />
      <SubstrateCommands dict={dict} />
      <SubstrateClosing dict={dict} />
    </Revealer>
  );
}
