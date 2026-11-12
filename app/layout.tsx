import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer, Header, PreviewBanner } from "@/components/Chrome";
import { CurrencyProvider } from "@/components/Currency";
import { getRates } from "@/lib/rates";
import { SITE_DESCRIPTION, SITE_LIVE, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

/** Exchange rates are refreshed twice a day; pages stay cached in between. */
export const revalidate = 43200;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: private India tours with licensed local guides`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: SITE_LIVE ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const rates = await getRates();
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-20 focus:rounded-lg focus:bg-card focus:px-4 focus:py-3"
        >
          Skip to content
        </a>
        <CurrencyProvider rates={rates}>
          <PreviewBanner />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}
