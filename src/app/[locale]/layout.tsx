import Link from "next/link";
import type { ReactNode } from "react";
import {
  getPortalDictionary,
  LocaleSchema,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/modules/locale-dictionary";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

function resolveLocale(raw: string): Locale {
  const parsed = LocaleSchema.safeParse(raw);
  return parsed.success ? parsed.data : "en";
}

export default async function LocaleLayout({
  children,
  params,
}: {
  readonly children: ReactNode;
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getPortalDictionary(locale);
  const alternateLocale: Locale = locale === "en" ? "vi" : "en";

  return (
    <div
      data-locale={locale}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--bg-wok-iron)",
        color: "var(--text-parchment)",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backgroundColor: "rgba(8, 11, 16, 0.94)",
          borderBottom: "1px solid var(--border-forge-brass)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          className="cyber-shell"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              href={`/${locale}`}
              className="touch-target"
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--accent-wok-gold)",
                letterSpacing: "-0.02em",
              }}
            >
              {dict.nav.brandName}
            </Link>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                padding: "0.2rem 0.5rem",
                backgroundColor: "var(--bg-smoked-basalt)",
                border: "1px solid var(--border-forge-brass)",
                color: "var(--accent-jade-wire)",
              }}
            >
              {dict.nav.brandSubtag}
            </span>
          </div>

          <nav
            aria-label="Primary Navigation"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Link
              href={`/${locale}#cockpit`}
              className="touch-target"
              style={{
                padding: "0 0.75rem",
                fontSize: "0.875rem",
                color: "var(--text-parchment)",
              }}
            >
              {dict.nav.cockpitLink}
            </Link>
            <Link
              href={`/${locale}#xray`}
              className="touch-target"
              style={{
                padding: "0 0.75rem",
                fontSize: "0.875rem",
                color: "var(--text-parchment)",
              }}
            >
              {dict.nav.xrayLink}
            </Link>
            <Link
              href={`/${locale}#greenfield`}
              className="touch-target"
              style={{
                padding: "0 0.75rem",
                fontSize: "0.875rem",
                color: "var(--text-parchment)",
              }}
            >
              {dict.nav.greenfieldLink}
            </Link>
            <Link
              href={`/${locale}#conversion`}
              className="touch-target"
              style={{
                padding: "0 0.75rem",
                fontSize: "0.875rem",
                color: "var(--text-parchment)",
              }}
            >
              {dict.nav.conversionLink}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="touch-target"
              style={{
                padding: "0 0.75rem",
                fontSize: "0.875rem",
                color: "var(--accent-jade-wire)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {dict.nav.blogLink}
            </Link>
            <Link
              href={`/${locale}/episodes`}
              className="touch-target"
              style={{
                padding: "0 0.75rem",
                fontSize: "0.875rem",
                color: "var(--accent-wok-gold)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {dict.nav.episodesLink}
            </Link>
            <Link
              href={`/${locale}/showroom`}
              className="touch-target"
              style={{
                padding: "0 0.75rem",
                fontSize: "0.875rem",
                color: "var(--accent-bamboo-green)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {dict.nav.showroomLink}
            </Link>
            <Link
              href={`/${alternateLocale}`}
              className="touch-target cyber-chamfer"
              style={{
                padding: "0 0.85rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--accent-wok-gold)",
              }}
            >
              {dict.meta.switchLocaleLabel}
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>{children}</main>

      <footer
        style={{
          marginTop: "4rem",
          borderTop: "1px solid var(--border-forge-brass)",
          backgroundColor: "var(--bg-smoked-basalt)",
          padding: "2.5rem 0",
        }}
      >
        <div
          className="cyber-shell"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                color: "var(--accent-wok-gold)",
              }}
            >
              {dict.footer.tagline}
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "var(--text-ash-slate)",
                marginTop: "0.25rem",
              }}
            >
              {dict.footer.builtWithLine}
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--text-ash-slate)",
            }}
          >
            {dict.footer.copyrightNotice}
          </div>
        </div>
      </footer>
    </div>
  );
}
