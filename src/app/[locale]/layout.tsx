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
      <header className="site-header">
        <div
          className="cyber-shell"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexShrink: 0, whiteSpace: "nowrap" }}>
            <Link
              href={`/${locale}`}
              className="touch-target"
              style={{
                fontWeight: 500,
                fontSize: "16px",
                color: "var(--text-titanium)",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {dict.nav.brandName}
            </Link>
            <code
              className="hide-on-compact"
              style={{
                fontSize: "14px",
                padding: "0.18rem 0.5rem",
                backgroundColor: "var(--bg-kabuki-panel)",
                color: "var(--text-cyber-slate)",
                borderRadius: "4px",
                whiteSpace: "nowrap",
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
              flexWrap: "nowrap",
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
                fontWeight: 400,
                color: "var(--text-cyber-slate)",
              }}
            >
              {dict.nav.cockpitLink}
            </Link>
            <Link
              href={`/${locale}#gateway`}
              className="touch-target hide-on-compact"
              style={{
                padding: "0 0.55rem",
                fontSize: "14px",
                fontWeight: 400,
                color: "var(--text-cyber-slate)",
              }}
            >
              {locale === "vi" ? "3 Chế Độ" : "Bridge Modes"}
            </Link>
            <Link
              href={`/${locale}#xray`}
              className="touch-target"
              style={{
                padding: "0 0.55rem",
                fontSize: "14px",
                fontWeight: 400,
                color: "var(--text-cyber-slate)",
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
                fontWeight: 500,
                color: "var(--text-titanium)",
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
                fontWeight: 400,
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
                fontWeight: 400,
                color: "var(--text-cyber-slate)",
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
                fontWeight: 500,
                color: "var(--text-titanium)",
              }}
            >
              {dict.meta.switchLocaleLabel}
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>{children}</main>

      <footer className="site-footer">
        <div
          className="cyber-shell"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          <span
            style={{
              fontWeight: 500,
              fontSize: "14px",
              color: "var(--text-titanium)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {locale === "vi"
              ? "© 2026 Hệ Sinh Thái Hivemind-* OpenCode V2 (shynlee04)"
              : "© 2026 Hivemind-* OpenCode V2 Ecosystem (shynlee04)"}
          </span>

          <div style={{ display: "flex", flexWrap: "nowrap", gap: "0.45rem", flexShrink: 0 }}>
            <a
              href="https://github.com/shynlee04/hivemind-steward-oc-devin-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target"
              style={{
                minHeight: "38px",
                padding: "0 0.75rem",
                backgroundColor: "var(--bg-kabuki-panel)",
                color: "var(--text-titanium)",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 400,
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
                minHeight: "38px",
                padding: "0 0.75rem",
                backgroundColor: "var(--bg-kabuki-panel)",
                color: "var(--text-titanium)",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 400,
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
                minHeight: "38px",
                padding: "0 0.75rem",
                backgroundColor: "var(--bg-kabuki-panel)",
                color: "var(--text-titanium)",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 400,
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
                minHeight: "38px",
                padding: "0 0.75rem",
                backgroundColor: "var(--bg-kabuki-panel)",
                color: "var(--text-titanium)",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 400,
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
