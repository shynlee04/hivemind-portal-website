"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale, PortalDictionary } from "@/modules/locale-dictionary";
import styles from "./site-header.module.css";

function HexGlyph() {
  return (
    <svg
      className={styles.glyph}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="50,2 97,26 97,74 50,98 3,74 3,26" fill="currentColor" />
    </svg>
  );
}

export function SiteHeader({
  locale,
  nav,
  switchLabel,
}: {
  readonly locale: Locale;
  readonly nav: PortalDictionary["nav"];
  readonly switchLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const other: Locale = locale === "en" ? "vi" : "en";
  const switched = pathname.replace(/^\/(en|vi)(\/|$)/, `/${other}$2`);
  const homeHref = `/${locale}`;
  const links = [
    { href: `/${locale}/steward`, label: nav.steward, key: "steward" },
    { href: `/${locale}/substrate`, label: nav.substrate, key: "substrate" },
  ];
  const isActive = (href: string) => pathname === href;

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href={homeHref} className={styles.brand}>
          <HexGlyph />
          <span>{nav.brand}</span>
        </Link>
        <nav className={styles.nav} aria-label={nav.menu}>
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={styles.navLink}
              aria-current={isActive(link.href) ? "page" : undefined}
              data-active={isActive(link.href) ? "" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link href={switched} className={styles.navLink}>
            {switchLabel}
          </Link>
        </nav>
        <div className={styles.actions}>
          <Link href={`${homeHref}#install`} className={styles.install}>
            {nav.install}
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? nav.close : nav.menu}
          </button>
        </div>
      </div>
      {open ? (
        <nav className={styles.phoneNav}>
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={styles.phoneLink}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={switched}
            className={styles.phoneLink}
            onClick={() => setOpen(false)}
          >
            {switchLabel}
          </Link>
          <Link
            href={`${homeHref}#install`}
            className={styles.phoneLink}
            onClick={() => setOpen(false)}
          >
            {nav.install}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
