"use client";

import { useEffect, useRef, useState } from "react";

export interface SlotFrame {
  readonly command: string;
  readonly title: string;
  readonly working: string;
}

interface HeroProps {
  readonly accessibleHeadline: string;
  readonly lineOneWord: string;
  readonly lineTwoWord: string;
  readonly support: string;
  readonly installCommand: string;
  readonly copyLabel: string;
  readonly copiedLabel: string;
  readonly copyAriaLabel: string;
  readonly slots: readonly [SlotFrame, SlotFrame];
}

function SlotComposer({ slots }: { readonly slots: readonly [SlotFrame, SlotFrame] }) {
  const [frame, setFrame] = useState<{
    index: 0 | 1;
    typed: string;
    answer: boolean;
  }>({ index: 0, typed: slots[0].command, answer: false });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let cancelled = false;
    const timers: number[] = [];
    const after = (ms: number, fn: () => void) => {
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) {
            fn();
          }
        }, ms),
      );
    };

    let index: 0 | 1 = 0;
    const run = () => {
      const command = slots[index].command;
      setFrame({ index, typed: "", answer: false });
      for (let i = 1; i <= command.length; i += 1) {
        const typed = command.slice(0, i);
        after(i * 85, () => setFrame({ index, typed, answer: false }));
      }
      after(command.length * 85 + 300, () =>
        setFrame({ index, typed: command, answer: true }),
      );
      after(command.length * 85 + 2200, () => {
        index = index === 0 ? 1 : 0;
        run();
      });
    };
    run();

    return () => {
      cancelled = true;
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, [slots]);

  const current = slots[frame.index];
  return (
    <span className="hero__slot" data-ui>
      <span className="hero__slot-in">
        <code className="hero__slot-line">
          <span
            className="hero__slot-cmd"
            data-text={frame.typed || "\u00A0"}
          />
          <span className="hero__slot-caret" />
        </code>
        {frame.answer ? (
          <>
            <code
              className="hero__slot-line hero__slot-title"
              data-text={current.title}
            />
            <code
              className="hero__slot-line hero__slot-working"
              data-text={current.working}
            />
          </>
        ) : null}
      </span>
    </span>
  );
}

export function Hero({
  accessibleHeadline,
  lineOneWord,
  lineTwoWord,
  support,
  installCommand,
  copyLabel,
  copiedLabel,
  copyAriaLabel,
  slots,
}: HeroProps) {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(copyTimer.current);
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero__upper" data-field="white" />
      <div className="hero__lower" data-field="sky" />
      <h1 className="hero__title" aria-label={accessibleHeadline}>
        <span className="hero__copy hero__copy--above" aria-hidden="true">
          <span className="hero__line">
            <SlotComposer slots={slots} />
            <span className="hero__word">{lineOneWord}</span>
          </span>
          <span className="hero__line">{lineTwoWord}</span>
        </span>
        <span className="hero__copy hero__copy--below" aria-hidden="true">
          <span className="hero__line">
            <span className="hero__slot-spacer" />
            <span className="hero__word">{lineOneWord}</span>
          </span>
          <span className="hero__line">{lineTwoWord}</span>
        </span>
      </h1>
      <div className="hero__support">
        <p className="hero__support-text">{support}</p>
        <div className="hero__install">
          <code className="hero__command">{installCommand}</code>
          <button
            type="button"
            className="btn btn--accent"
            onClick={onCopy}
            aria-label={copyAriaLabel}
          >
            {copyLabel}
          </button>
          <span className="hero__copied" role="status" aria-live="polite">
            {copied ? copiedLabel : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
