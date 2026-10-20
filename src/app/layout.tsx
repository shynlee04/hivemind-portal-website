import type { Metadata } from "next";
import { Anton, Work_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
});

const workSans = Work_Sans({
  weight: ["400", "600"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-text",
});

export const metadata: Metadata = {
  title: "Hivemind Steward: Devin and Antigravity inside OpenCode",
  description:
    "An OpenCode V2 plugin. Open real Devin or Antigravity sessions in the OpenCode TUI, or let your agent delegate tasks to them.",
};

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${workSans.variable}`}
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
