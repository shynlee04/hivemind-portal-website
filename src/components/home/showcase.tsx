"use client";

import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { PRODUCTS } from "@/modules/ecosystem";
import type { Locale, PortalDictionary } from "@/modules/locale-dictionary";
import { HexImage } from "@/components/hex-image";
import styles from "./home.module.css";

type TabData = PortalDictionary["home"]["showcase"]["tabs"][number];

export function HomeShowcase({
  showcase,
  images,
  locale,
}: {
  readonly showcase: PortalDictionary["home"]["showcase"];
  readonly images: PortalDictionary["common"]["images"];
  readonly locale: Locale;
}) {
  const [active, setActive] = useState(0);
  const tab = showcase.tabs[active] ?? showcase.tabs[0]!;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    setActive(
      (current) =>
        (current + delta + showcase.tabs.length) % showcase.tabs.length,
    );
  };

  return (
    <section className={styles.showcase}>
      <div className={styles.plate}>
        <HexImage
          id={tab.image}
          alt={images[tab.image].alt}
          className={styles.plateImg}
        />
      </div>
      <div className={styles.showcaseText}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label={showcase.tabsLabel}
          onKeyDown={onKeyDown}
        >
          {showcase.tabs.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              data-selected={index === active ? "" : undefined}
              tabIndex={index === active ? 0 : -1}
              className={styles.tab}
              onClick={() => setActive(index)}
            >
              {item.tab}
            </button>
          ))}
        </div>
        <div className={styles.showcaseBody} role="tabpanel">
          <h2 className={styles.showcaseTitle}>{tab.title}</h2>
          <p className={styles.showcaseDesc}>{tab.body}</p>
          <p className={styles.version}>{tab.version}</p>
        </div>
        <div className={styles.actionCells}>
          <Link
            href={`/${locale}/${tab.id}`}
            className={`${styles.cell} ${styles.cellInk}`}
          >
            {tab.primary}
          </Link>
          <a
            href={PRODUCTS[tab.id].npmUrl}
            className={`${styles.cell} ${styles.cellSurface}`}
          >
            {tab.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
