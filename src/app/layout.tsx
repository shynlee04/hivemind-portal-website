import type { Metadata } from "next";
import { Albert_Sans, Be_Vietnam_Pro } from "next/font/google";
import type { ReactNode } from "react";
import { getPortalDictionary } from "@/modules/locale-dictionary";
import "./globals.css";

const albertSans = Albert_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-albert",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-vi",
});

const home = getPortalDictionary("en").meta.pages.home;

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
};

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${albertSans.variable} ${beVietnamPro.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('reveal-ready')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
