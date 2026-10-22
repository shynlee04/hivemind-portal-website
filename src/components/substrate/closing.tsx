import { PRODUCTS } from "@/modules/ecosystem";
import type { PortalDictionary } from "@/modules/locale-dictionary";
import { HexImage } from "@/components/hex-image";
import { InstallDialog } from "@/components/install-dialog";
import styles from "./substrate.module.css";

export function SubstrateClosing({
  dict,
}: {
  readonly dict: PortalDictionary;
}) {
  const closing = dict.substrate.closing;
  return (
    <section className={styles.closing}>
      <div className="shell">
        <div className={styles.closingLeft}>
          <HexImage
            id="catba"
            alt={dict.common.images.catba.alt}
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
            <a
              href={PRODUCTS.substrate.issuesUrl}
              className="btn-hex btn-hex--invert"
            >
              {closing.button}
            </a>
            <p className={styles.privacy}>{closing.privacy}</p>
          </div>
        </div>
        <div className={styles.closingRight} data-reveal style={{ "--rd": 3 } as import("react").CSSProperties}>
          <InstallDialog
            install={dict.home.install}
            common={dict.common}
            initialPlugin="substrate"
            initialScope="project"
          />
        </div>
      </div>
    </section>
  );
}
