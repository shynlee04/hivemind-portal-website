import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale, PortalDictionary } from "@/modules/locale-dictionary";
import { HexHero } from "@/components/hex-hero";
import styles from "./home.module.css";

export function HomeHero({
  dict,
  locale,
}: {
  readonly dict: PortalDictionary;
  readonly locale: Locale;
}) {
  const hero = dict.home.hero;
  const fragments = [dict.fragments.hosted, dict.fragments.delegate, dict.fragments.trace];

  return (
    <section className={styles.hero}>
      <div className={`${styles.heroInner} shell`}>
        <div className={styles.heroText}>
          <h1 className={styles.headline} data-reveal aria-label={hero.accessibleHeadline}>
            <span aria-hidden="true">{hero.line1}</span>
            <span aria-hidden="true">{hero.line2}</span>
          </h1>
          <p className={styles.support} data-reveal style={{ "--rd": 1 } as CSSProperties}>
            {hero.support}
          </p>
          <div className={styles.heroActions} data-reveal style={{ "--rd": 2 } as CSSProperties}>
            <Link href={`/${locale}#install`} className="btn-hex">
              {hero.primary}
            </Link>
            <Link href={`/${locale}/steward`} className={styles.textLink}>
              {hero.links[0]}
            </Link>
            <Link href={`/${locale}/substrate`} className={styles.textLink}>
              {hero.links[1]}
            </Link>
          </div>
        </div>
      </div>
      <HexHero fragments={fragments} mode="crossfade" />
    </section>
  );
}
