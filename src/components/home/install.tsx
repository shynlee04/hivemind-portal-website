import type { PortalDictionary } from "@/modules/locale-dictionary";
import { InstallDialog } from "@/components/install-dialog";
import styles from "./home.module.css";

export function HomeInstall({ dict }: { readonly dict: PortalDictionary }) {
  const install = dict.home.install;
  return (
    <section className={styles.install} id="install">
      <div className={`${styles.installShell} shell`}>
        <div className={styles.installLeft}>
          <h2 className={styles.installHeadline} data-reveal>
            <span>{install.line1}</span>
            <span>{install.line2}</span>
          </h2>
          <p className={styles.installBody} data-reveal style={{ "--rd": 1 } as import("react").CSSProperties}>
            {install.body}
          </p>
        </div>
        <div className={styles.installRight} data-reveal style={{ "--rd": 2 } as import("react").CSSProperties}>
          <InstallDialog install={install} common={dict.common} />
        </div>
      </div>
    </section>
  );
}
