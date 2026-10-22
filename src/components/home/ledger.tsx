import type { PortalDictionary } from "@/modules/locale-dictionary";
import { HexImage } from "@/components/hex-image";
import styles from "./home.module.css";

export function HomeLedger({ dict }: { readonly dict: PortalDictionary }) {
  const ledger = dict.home.ledger;
  return (
    <section className={styles.ledger}>
      <div className="shell">
        <h2 className={styles.ledgerHeading} data-reveal>
          {ledger.heading}
        </h2>
        <p className={styles.ledgerName}>{ledger.tableName}</p>
        <div className={styles.ledgerTable} data-reveal>
          {ledger.groups.map((group, index) => (
            <div key={index} className={styles.ledgerGroup}>
              {group.rows.map((row) => (
                <div key={`${row.kind}-${row.what}`} className={styles.ledgerRow}>
                  <span className={styles.ledgerKind}>
                    <span className="hex-bullet" aria-hidden="true" />
                    {row.kind}
                  </span>
                  <span className={styles.ledgerWhat}>{row.what}</span>
                  <span className={styles.ledgerValue}>{row.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.ledgerPhoto} data-reveal style={{ "--rd": 1 } as import("react").CSSProperties}>
          <HexImage
            id={ledger.image}
            alt={dict.common.images[ledger.image].alt}
          />
        </div>
      </div>
    </section>
  );
}
