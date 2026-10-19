import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hivemind Steward | Neo-Tokyo OpenCode Multi-Pass Gateway",
  description:
    "Run Devin, Antigravity, Freebuff, and GLM coding passes inside one OpenCode V2 terminal cockpit. Stop paying $200/mo across fragmented AI coding tools.",
};

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" /* taste-skill-ignore */
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
