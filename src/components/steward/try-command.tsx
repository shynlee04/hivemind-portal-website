"use client";

import { useMemo, useState } from "react";
import {
  commandExamples,
  commandPrefill,
  interpretCommand,
} from "@/modules/command-console";
import type { Locale, PortalDictionary } from "@/modules/locale-dictionary";
import { HexImage } from "@/components/hex-image";
import { TuiFragment } from "@/components/tui-fragment";
import styles from "./steward.module.css";

export function TryCommand({
  dict,
  locale,
}: {
  readonly dict: PortalDictionary;
  readonly locale: Locale;
}) {
  const section = dict.steward.try;
  const [input, setInput] = useState(() => commandPrefill(locale));
  const answer = useMemo(
    () => interpretCommand(input, locale),
    [input, locale],
  );
  const examples = commandExamples(locale);

  return (
    <section className={styles.try}>
      <div className="shell">
        <div className={styles.tryPlate}>
          <div className={styles.tryAnswer}>
            <code className={styles.answerTitle}>{answer.title}</code>
            <TuiFragment lines={answer.lines} />
            <p className={styles.answerSummary}>{answer.summary}</p>
          </div>
          <HexImage
            id="nectar"
            alt={dict.common.images.nectar.alt}
            className={styles.tryPhoto}
          />
        </div>
        <div className={styles.tryRight}>
          <h2 className={styles.tryHeading} data-reveal>
            {section.heading}
          </h2>
          <div data-reveal style={{ "--rd": 1 } as import("react").CSSProperties}>
            <label htmlFor="try-input" className={styles.inputLabel}>
              {section.inputLabel}
            </label>
            <input
              id="try-input"
              className={styles.tryInput}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div className={styles.examples} data-reveal style={{ "--rd": 2 } as import("react").CSSProperties}>
            <span className={styles.examplesLabel}>{section.examplesLabel}</span>
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                className={styles.example}
                onClick={() => setInput(example)}
              >
                <code>{example}</code>
              </button>
            ))}
          </div>
          <h3 className={styles.trySideTitle}>{section.sideTitle}</h3>
          <p className={styles.trySideBody}>{section.sideBody}</p>
        </div>
      </div>
    </section>
  );
}
