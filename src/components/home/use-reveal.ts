"use client";

import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (elements.length === 0) {
      return;
    }

    let fired = false;
    let observer: IntersectionObserver | undefined;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          fired = true;
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
      );
      for (const element of elements) {
        observer.observe(element);
      }
    } catch {
      document.documentElement.classList.add("reveal-all");
      return;
    }

    const fallback = window.setTimeout(() => {
      if (!fired) {
        document.documentElement.classList.add("reveal-all");
      }
    }, 2500);

    return () => {
      observer?.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
}
