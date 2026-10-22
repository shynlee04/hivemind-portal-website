import Link from "next/link";
import type { Locale, PortalDictionary } from "@/modules/locale-dictionary";
import { LINKS, PRODUCTS } from "@/modules/ecosystem";
import { HexMark } from "./hex-mark";
import styles from "./site-footer.module.css";

type FooterDict = PortalDictionary["footer"];

export function SiteFooter({
  locale,
  footer,
}: {
  readonly locale: Locale;
  readonly footer: FooterDict;
}) {
  const columns: ReadonlyArray<{
    readonly label: string;
    readonly links: ReadonlyArray<{ readonly href: string; readonly text: string }>;
  }> = [
      {
        label: footer.columns.plugins,
        links: [
          { href: `/${locale}/steward`, text: footer.links.steward },
          { href: `/${locale}/substrate`, text: footer.links.substrate },
        ],
      },
      {
        label: footer.columns.install,
        links: [
          { href: PRODUCTS.steward.npmUrl, text: footer.links.stewardNpm },
          { href: PRODUCTS.substrate.npmUrl, text: footer.links.substrateNpm },
        ],
      },
      {
        label: footer.columns.source,
        links: [
          { href: PRODUCTS.steward.repoUrl, text: footer.links.stewardGithub },
          { href: PRODUCTS.substrate.repoUrl, text: footer.links.substrateGithub },
        ],
      },
      {
        label: footer.columns.watch,
        links: [
          { href: LINKS.video, text: footer.links.video },
          { href: LINKS.channel, text: footer.links.channel },
        ],
      },
      {
        label: footer.columns.support,
        links: [
          { href: LINKS.kofi, text: footer.links.kofi },
          { href: LINKS.buyMeACoffee, text: footer.links.bmc },
        ],
      },
    ];

  return (
    <footer className={styles.footer}>
      <div className={styles.band}>
        <HexMark />
        <p className={styles.wordmark}>{footer.tagline}</p>
      </div>
      <div className={styles.columns}>
        {columns.map((column) => (
          <div key={column.label} className={styles.column}>
            <h3 className={styles.columnLabel}>{column.label}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className={styles.referral}>
        {footer.referralBefore}{" "}
        <a href={LINKS.freebuffReferral} className={styles.link}>
          {footer.referralFreebuff}
        </a>{" "}
        {footer.referralMiddle}{" "}
        <a href={LINKS.zaiReferral} className={styles.link}>
          {footer.referralZai}
        </a>
        {footer.referralAfter}
      </p>
      <div className={styles.lastRow}>
        <p className={styles.copyright}>{footer.copyright}</p>
        <Link href="#top" className={styles.topButton}>
          <span className={styles.topGlyph} aria-hidden="true" />
          {footer.backToTop}
        </Link>
      </div>
    </footer>
  );
}
