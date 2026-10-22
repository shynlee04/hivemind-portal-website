"use client";

import { useEffect, useRef, useState } from "react";

export function CopyButton({
  text,
  label,
  copiedLabel,
  ariaLabel,
  className,
}: {
  readonly text: string;
  readonly label: string;
  readonly copiedLabel: string;
  readonly ariaLabel: string;
  readonly className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, []);

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        void navigator.clipboard
          .writeText(text)
          .then(() => {
            setCopied(true);
            if (timer.current !== null) clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1600);
          })
          .catch(() => setCopied(false));
      }}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
