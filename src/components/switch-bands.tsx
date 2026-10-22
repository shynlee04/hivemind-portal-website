"use client";

import { useCallback, useState } from "react";
import styles from "./switch-bands.module.css";

export interface SwitchItem {
  readonly sentence: string;
  readonly consequence: string;
  readonly on: boolean;
}

const FILLS = ["field", "ink", "surface"] as const;

export function SwitchBands({
  label,
  items,
}: {
  readonly label: string;
  readonly items: ReadonlyArray<SwitchItem>;
}) {
  const [states, setStates] = useState<ReadonlyArray<boolean>>(
    items.map((item) => item.on),
  );

  const toggle = useCallback((index: number) => {
    setStates((current) =>
      current.map((value, i) => (i === index ? !value : value)),
    );
  }, []);

  return (
    <section className={styles.bands} aria-label={label}>
      <h2 className="visually-hidden">{label}</h2>
      {items.map((item, index) => {
        const on = states[index] === true;
        return (
          <div
            key={index}
            className={styles.band}
            data-on={on ? "" : undefined}
            data-fill={FILLS[index % FILLS.length]}
          >
            <p className={styles.sentence}>{item.sentence}</p>
            <button
              type="button"
              role="switch"
              aria-checked={on}
              aria-label={item.sentence}
              className={styles.toggle}
              data-ui
              onClick={() => toggle(index)}
            >
              <span className={styles.track} aria-hidden="true" />
              <span className={styles.knob} aria-hidden="true" />
            </button>
            <p className={styles.consequence} aria-hidden={!on}>
              {item.consequence}
            </p>
          </div>
        );
      })}
    </section>
  );
}
