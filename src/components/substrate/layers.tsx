"use client";

import { useState, type KeyboardEvent } from "react";
import { PRODUCTS } from "@/modules/ecosystem";
import type { PortalDictionary } from "@/modules/locale-dictionary";
import styles from "./substrate.module.css";

export function SubstrateLayers({
  layers,
}: {
  readonly layers: PortalDictionary["substrate"]["layers"];
}) {
  const [active, setActive] = useState(0);
  const tab = layers.tabs[active] ?? layers.tabs[0]!;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    setActive((current) => (current + delta + layers.tabs.length) % layers.tabs.length);
  };

  return (
    <section className={styles.layers}>
      <div className={styles.plate}>
        <div className={styles.plateHex} data-ui>
          <code className={styles.plateLines}>
            {tab.plate.map((line) => (
              <span key={line} className={styles.plateLine}>
                {line}
              </span>
            ))}
          </code>
        </div>
      </div>
      <div className={styles.layersText}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label={layers.tabsLabel}
          onKeyDown={onKeyDown}
        >
          {layers.tabs.map((item, index) => (
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
        <div className={styles.layersBody} role="tabpanel">
          <h2 className={styles.layersTitle}>{tab.title}</h2>
          <p className={styles.layersDesc}>{tab.body}</p>
        </div>
        <div className={styles.actionCells}>
          <a href="#trace" className={`${styles.cell} ${styles.cellInk}`}>
            {layers.primary}
          </a>
          <a
            href={PRODUCTS.substrate.npmUrl}
            className={`${styles.cell} ${styles.cellField}`}
          >
            {layers.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
