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
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--bg-tokyo-void)",
        color: "var(--text-titanium)",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backgroundColor: "rgba(5, 6, 11, 0.92)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="cyber-shell"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            paddingTop: "0.6rem",
            paddingBottom: "0.6rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", minWidth: 0 }}>
            <Link
              href={`/${locale}`}
              className="touch-target"
              style={{
                fontWeight: 700,
                fontSize: "17px",
                color: "var(--accent-cyber-cyan)",
                letterSpacing: "-0.03em",
              }}
            >
              {dict.nav.brandName}
            </Link>
            <code
              className="hide-on-compact"
              style={{
                fontSize: "14px",
                padding: "0.2rem 0.55rem",
                backgroundColor: "var(--bg-akihabara-deck)",
                color: "var(--accent-voltage-gold)",
                borderRadius: "4px",
              }}
            >
              {dict.nav.brandSubtag}
            </code>
          </div>

          <nav
            aria-label="Primary Navigation"
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: "0.25rem",
            }}
          >
            <Link
              href={`/${locale}#cockpit`}
              className="touch-target hide-on-compact"
              style={{
                padding: "0 0.55rem",
                fontSize: "14px",
                color: "var(--text-titanium)",
              }}
            >
              {dict.nav.cockpitLink}
            </Link>
            <Link
              href={`/${locale}#xray`}
              className="touch-target"
              style={{
                padding: "0 0.55rem",
                fontSize: "14px",
                color: "var(--text-titanium)",
              }}
            >
              {dict.nav.xrayLink}
            </Link>
            <Link
              href={`/${locale}#conversion`}
              className="touch-target hide-on-compact"
              style={{
                padding: "0 0.55rem",
                fontSize: "14px",
                color: "var(--accent-voltage-gold)",
                fontWeight: 600,
              }}
            >
              {dict.nav.conversionLink}
            </Link>
            <Link
              href={`/${locale}#greenfield`}
              className="touch-target hide-on-compact"
              style={{
                padding: "0 0.55rem",
                fontSize: "14px",
                color: "var(--text-cyber-slate)",
              }}
            >
              {dict.nav.greenfieldLink}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="touch-target hide-on-compact"
              style={{
                padding: "0 0.55rem",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--accent-cyber-cyan)",
              }}
            >
              {dict.nav.blogLink}
            </Link>
            <Link
              href={`/${alternateLocale}`}
              className="touch-target"
              style={{
                padding: "0 0.75rem",
                backgroundColor: "var(--bg-kabuki-panel)",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--accent-voltage-gold)",
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
          marginTop: "6rem",
          backgroundColor: "var(--bg-akihabara-deck)",
          padding: "3.5rem 0",
        }}
      >
        <div
          className="cyber-shell"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2rem",
          }}
        >
          <div style={{ maxWidth: "56ch" }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "17px",
                color: "var(--accent-cyber-cyan)",
              }}
            >
              {dict.footer.tagline}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "var(--text-cyber-slate)",
                marginTop: "0.45rem",
              }}
            >
              {dict.footer.builtWithLine}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "var(--text-cyber-slate)",
                marginTop: "0.35rem",
              }}
            >
              {dict.footer.copyrightNotice}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            <a
              href="https://github.com/shynlee04/hivemind-steward-oc-devin-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target"
              style={{
                padding: "0 0.9rem",
                backgroundColor: "var(--bg-tokyo-void)",
                color: "var(--text-titanium)",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              GitHub
            </a>
            <a
              href="https://youtube.com/@chingchongchingvibecoding"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target"
              style={{
                padding: "0 0.9rem",
                backgroundColor: "var(--bg-tokyo-void)",
                color: "var(--accent-neon-crimson)",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              YouTube
            </a>
            <a
              href="https://reddit.com/r/opencode"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target"
              style={{
                padding: "0 0.9rem",
                backgroundColor: "var(--bg-tokyo-void)",
                color: "var(--accent-voltage-gold)",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Reddit
            </a>
            <a
              href="https://discord.gg/opencode"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target"
              style={{
                padding: "0 0.9rem",
                backgroundColor: "var(--bg-tokyo-void)",
                color: "var(--accent-cyber-cyan)",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
