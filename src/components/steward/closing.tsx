import { LINKS } from "@/modules/ecosystem";
import type { PortalDictionary } from "@/modules/locale-dictionary";
import { HexArt } from "@/components/hex-art";
import styles from "./steward.module.css";

export function StewardClosing({ dict }: { readonly dict: PortalDictionary }) {
  const closing = dict.steward.closing;
  return (
    <section className={styles.closing}>
      <div className="shell">
        <div className={styles.closingLeft}>
          <HexArt
            id="agent"
            alt={dict.common.images.agent.alt}
            className={styles.closingPhoto}
          />
          <h2 className={styles.closingHeadline} data-reveal>
            <span>{closing.line1}</span>
            <span>{closing.line2}</span>
          </h2>
          <p className={styles.closingBody} data-reveal style={{ "--rd": 1 } as import("react").CSSProperties}>
            {closing.body}
          </p>
          <div className={styles.closingActions} data-reveal style={{ "--rd": 2 } as import("react").CSSProperties}>
            <a href={LINKS.kofi} className="btn-hex btn-hex--invert">
              {closing.button}
            </a>
            <a href={LINKS.buyMeACoffee} className={styles.closingAlt}>
              {closing.alt}
            </a>
          </div>
        </div>
        <div className={styles.closingRight} data-reveal style={{ "--rd": 3 } as import("react").CSSProperties}>
          <div className={styles.roadmap} data-ui>
            <p className={styles.roadmapTitle}>{closing.roadmapTitle}</p>
            {closing.roadmap.map((row) => (
              <div key={row.name} className={styles.roadmapRow}>
                <span>{row.name}</span>
                <span className={styles.roadmapState}>{row.state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
