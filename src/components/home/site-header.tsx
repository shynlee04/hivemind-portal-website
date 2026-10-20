"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Locale, PortalDictionary } from "@/types/portal";
import { useReveal } from "./use-reveal";

interface SiteHeaderProps {
  readonly locale: Locale;
  readonly alternateLocale: Locale;
  readonly nav: PortalDictionary["nav"];
  readonly switchLabel: string;
}

export function SiteHeader({
  locale,
  alternateLocale,
  nav,
  switchLabel,
}: SiteHeaderProps) {
  useReveal();

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const fields = Array.from(
      document.querySelectorAll<HTMLElement>("[data-field]"),
    );
    if (!header || fields.length === 0) {
      return;
    }

    const pickChapter = () => {
      const line = header.getBoundingClientRect().bottom - 1;
      for (const field of fields) {
        const rect = field.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          header.dataset.chapter = field.dataset.field;
          return;
        }
      }
    };

    const observer = new IntersectionObserver(pickChapter, {
      threshold: [0, 0.05, 0.5, 1],
    });
    for (const field of fields) {
      observer.observe(field);
    }
    pickChapter();
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header" data-chapter="white">
      <div className="site-header__inner">
        <Link href={`/${locale}`} className="site-header__wordmark">
          {nav.brandName}
        </Link>
        <div className="site-header__actions">
          <nav className="site-header__links" aria-label="Sections">
            <a href={`/${locale}#try`}>{nav.tryLink}</a>
            <a href={`/${locale}#setup`}>{nav.setupLink}</a>
            <a href={`/${locale}#keys`}>{nav.keysLink}</a>
            <Link href={`/${alternateLocale}`}>{switchLabel}</Link>
          </nav>
          <details className="site-header__menu">
            <summary>{nav.menuLabel}</summary>
            <div className="site-header__menu-panel">
              <a href={`/${locale}#try`}>{nav.tryLink}</a>
              <a href={`/${locale}#setup`}>{nav.setupLink}</a>
              <a href={`/${locale}#keys`}>{nav.keysLink}</a>
              <Link href={`/${alternateLocale}`}>{switchLabel}</Link>
            </div>
          </details>
          <a className="btn btn--accent" href={`/${locale}#setup`}>
            {nav.installLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
