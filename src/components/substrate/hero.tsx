import type { CSSProperties } from "react";
import type { PortalDictionary } from "@/modules/locale-dictionary";
import { CopyButton } from "@/components/copy-button";
import { HexHero } from "@/components/hex-hero";
import styles from "./substrate.module.css";

export function SubstrateHero({ dict }: { readonly dict: PortalDictionary }) {
  const hero = dict.substrate.hero;
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
          <div className={styles.installBox} data-reveal style={{ "--rd": 2 } as CSSProperties}>
            <code className={styles.installCode}>{hero.installCommand}</code>
            <CopyButton
              text={hero.installCommand}
              label={dict.common.copy}
              copiedLabel={dict.common.copied}
              ariaLabel={dict.common.copyAria}
              className={styles.installCopy}
            />
          </div>
          <p className={styles.installNote} data-reveal style={{ "--rd": 3 } as CSSProperties}>
            {hero.installNote}
          </p>
        </div>
      </div>
      <HexHero fragments={[dict.fragments.trace]} mode="reveal" />
    </section>
  );
}
