import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "KASPA-NEXUS | The Most Accurate KRC-20 Data Platform",
  description: "Real-time Kaspa & KRC-20 market data, charts, trading signals, and portfolio tools. The most accurate KRC-20 data platform.",
  keywords: ["Kaspa", "KRC-20", "Crypto", "Trading", "Market Data", "Charts", "Portfolio"],
  authors: [{ name: "KASPA-NEXUS" }],
  openGraph: {
    title: "KASPA-NEXUS | The Most Accurate KRC-20 Data Platform",
    description: "Real-time Kaspa & KRC-20 market data, charts, trading signals, and portfolio tools.",
    type: "website",
    locale: "en_US",
    siteName: "KASPA-NEXUS",
  },
  twitter: {
    card: "summary_large_image",
    title: "KASPA-NEXUS | KRC-20 Data Platform",
    description: "Real-time Kaspa & KRC-20 market data, charts, trading signals.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <AppLayout>
            {children}
          </AppLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
