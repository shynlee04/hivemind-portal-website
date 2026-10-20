"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  interpretCommand,
  type CommandAnswer,
} from "@/modules/command-console";
import type { Locale } from "@/types/portal";

interface TryCommandProps {
  readonly locale: Locale;
  readonly prefill: string;
  readonly examples: ReadonlyArray<string>;
  readonly heading: string;
  readonly inputLabel: string;
  readonly examplesLabel: string;
  readonly sideTitle: string;
  readonly sideBody: string;
}

export function TryCommand({
  locale,
  prefill,
  examples,
  heading,
  inputLabel,
  examplesLabel,
  sideTitle,
  sideBody,
}: TryCommandProps) {
  const [value, setValue] = useState(prefill);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  const answer: CommandAnswer = interpretCommand(value, locale);

  useLayoutEffect(() => {
    const mirror = mirrorRef.current;
    const caret = caretRef.current;
    const input = mirror?.parentElement?.querySelector("input");
    if (!mirror || !caret || !input) {
      return;
    }
    const width = Math.min(mirror.offsetWidth, input.clientWidth - 4);
    caret.style.transform = `translateX(${Math.max(0, width)}px)`;
  }, [value]);

  return (
    <section className="try" id="try" data-field="white">
      <h2 className="sr-only">{heading}</h2>
      <div className="try__grid">
        <div className="try__input-row" data-reveal>
          <label className="sr-only" htmlFor="try-command-input">
            {inputLabel}
          </label>
          <div className="try__input-box">
            <input
              id="try-command-input"
              data-ui
              className="try__input"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <span className="try__mirror" aria-hidden="true" ref={mirrorRef}>
              {value}
            </span>
            <span className="try__caret" aria-hidden="true" ref={caretRef} />
          </div>
        </div>
        <div className="try__main">
          <div className="try__answer" data-reveal>
            <pre className="tui" data-ui>
              <span className="tui__title">{answer.title}</span>
              <span className="tui__lines">
                {answer.lines.map((line, index) => (
                  <span
                    className={`tui__line tui__line--${line.tone}`}
                    key={`${line.tone}-${index}`}
                  >
                    {line.label === "" ? null : (
                      <span className="tui__label">{line.label}</span>
                    )}
                    <span className="tui__text">{line.text}</span>
                  </span>
                ))}
              </span>
            </pre>
            <p className="try__summary" aria-live="polite">
              {answer.summary}
            </p>
          </div>
          <div className="try__examples" data-reveal>
            <span className="try__examples-label">{examplesLabel}</span>
            {examples.map((example) => (
              <button
                type="button"
                className="try__example"
                key={example}
                onClick={() => setValue(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
        <div className="try__side" data-reveal>
          <h3 className="try__side-title">{sideTitle}</h3>
          <p className="try__side-body">{sideBody}</p>
        </div>
      </div>
    </section>
  );
}
