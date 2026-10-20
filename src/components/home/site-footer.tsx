import { PARTNER_URLS } from "@/modules/partner-conversion";
import type { PortalDictionary } from "@/types/portal";

export interface FooterUrls {
  readonly github: string;
  readonly issues: string;
  readonly npm: string;
  readonly kofi: string;
  readonly buyMeACoffee: string;
  readonly freebuff: string;
  readonly zai: string;
}

export const GITHUB_URL = "https://github.com/shynlee04/hmoc-steward-acp";

export const FOOTER_URLS: FooterUrls = {
  github: GITHUB_URL,
  issues: `${GITHUB_URL}/issues`,
  npm: "https://www.npmjs.com/package/hmoc-steward-acp",
  kofi: PARTNER_URLS.kofi,
  buyMeACoffee: PARTNER_URLS.buyMeACoffee,
  freebuff: PARTNER_URLS.freebuffReferral,
  zai: PARTNER_URLS.zapGlm,
};

interface SiteFooterProps {
  readonly footer: PortalDictionary["home"]["footer"];
  readonly urls: FooterUrls;
}

export function SiteFooter({ footer, urls }: SiteFooterProps) {
  return (
    <footer className="site-footer" data-field="sky">
      <div className="site-footer__top">
        <div className="site-footer__notes">
          <p>{footer.note1}</p>
          <p>
            {footer.note2Before}{" "}
            <a href={urls.buyMeACoffee} target="_blank" rel="noopener noreferrer">
              {footer.note2Link}
            </a>
            {footer.note2After}
          </p>
          <p>
            {footer.note3Before}{" "}
            <a href={urls.freebuff} target="_blank" rel="sponsored noopener">
              {footer.note3Freebuff}
            </a>{" "}
            {footer.note3Middle}{" "}
            <a href={urls.zai} target="_blank" rel="sponsored noopener">
              {footer.note3Zai}
            </a>
            {footer.note3After}
          </p>
        </div>
        <a className="site-footer__top-link" href="#top">
          {footer.backToTop}
        </a>
      </div>
      <div className="site-footer__display">
        <a
          className="site-footer__name"
          href={urls.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          hmoc-steward-acp
        </a>
      </div>
      <div className="site-footer__meta">
        <span className="site-footer__meta-links">
          <a href={urls.github} target="_blank" rel="noopener noreferrer">
            {footer.githubLabel}
          </a>
          <a href={urls.npm} target="_blank" rel="noopener noreferrer">
            {footer.npmLabel}
          </a>
          <a href={urls.issues} target="_blank" rel="noopener noreferrer">
            {footer.issuesLabel}
          </a>
        </span>
        <span className="site-footer__meta-credit">{footer.credit}</span>
        <span className="site-footer__meta-copy">{footer.copyright}</span>
      </div>
    </footer>
  );
}
