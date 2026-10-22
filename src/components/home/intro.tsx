import type { PortalDictionary } from "@/modules/locale-dictionary";
import { StatementWithThumbs } from "@/components/statement";
import styles from "./home.module.css";

export function HomeIntro({ dict }: { readonly dict: PortalDictionary }) {
  return (
    <section className={styles.intro}>
      <div className="shell">
        <div className={styles.introInner} data-reveal>
          <StatementWithThumbs
            segments={dict.home.intro}
            alts={dict.common.images}
          />
        </div>
      </div>
    </section>
  );
}
