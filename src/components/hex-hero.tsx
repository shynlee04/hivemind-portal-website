"use client";

import { useEffect, useRef, useState } from "react";
import { TuiFragment, type TuiLine } from "./tui-fragment";
import styles from "./hex-hero.module.css";

export interface HeroFragment {
  readonly caption?: string;
  readonly lines: ReadonlyArray<TuiLine>;
}

const HOLD_MS = 5500;

export function HexHero({
  fragments,
  mode = "crossfade",
}: {
  readonly fragments: ReadonlyArray<HeroFragment>;
  readonly mode?: "crossfade" | "reveal";
}) {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (mode !== "crossfade" || fragments.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => {
      timer.current = setInterval(() => {
        setActive((index) => (index + 1) % fragments.length);
      }, HOLD_MS);
    };
    const stop = () => {
      if (timer.current !== null) clearInterval(timer.current);
      timer.current = null;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mode, fragments.length]);

  return (
    <div className={styles.hexfield} aria-hidden="true">
      <div className={styles.hex}>
        {mode === "crossfade"
          ? fragments.map((fragment, index) => (
            <div
              key={index}
              className={
                index === active ? styles.pane : styles.paneHidden
              }
            >
              <TuiFragment lines={fragment.lines} />
            </div>
          ))
          : fragments.map((fragment, index) => (
            <div key={index} className={styles.pane}>
              <pre className="tui" data-ui>
                {fragment.lines.map((line, lineIndex) => (
                  <div
                    key={lineIndex}
                    className={`tui__line tui__line--${line.tone} ${styles.revealLine}`}
                    style={{ animationDelay: `${400 + lineIndex * 160}ms` }}
                  >
                    <span className="tui__label">{line.label}</span>
                    <span className="tui__text">{line.text}</span>
                  </div>
                ))}
              </pre>
            </div>
          ))}
      </div>
    </div>
  );
}
