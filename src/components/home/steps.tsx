import type { CSSProperties } from "react";
import type { PortalDictionary } from "@/modules/locale-dictionary";
import { HexImage } from "@/components/hex-image";
import styles from "./home.module.css";

const TILE_CLASSES = [styles.tile1, styles.tile2, styles.tile3] as const;

export function HomeSteps({ dict }: { readonly dict: PortalDictionary }) {
  const steps = dict.home.steps;
  return (
    <section className={styles.steps}>
      <div className="shell">
        <div className={styles.tiles}>
          <h2 className={styles.stepsHeading} data-reveal>
            {steps.heading}
          </h2>
          {steps.items.map((item, index) => (
            <div
              key={item.name}
              className={`${styles.tile} ${TILE_CLASSES[index] ?? ""}`}
              data-reveal
              style={{ "--rd": index + 1 } as CSSProperties}
            >
              <div className={styles.tileBox}>
                <HexImage
                  id={item.image}
                  alt={dict.common.images[item.image].alt}
                />
              </div>
              <p className={styles.tileName}>{item.name}</p>
              <p className={styles.tileBody}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
