import { SparkRoot } from "@/components/site/spark-root";
import { site } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["Georgia", "serif"],
});


export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.displayName} — Developer portfolio`,
    template: `%s — ${site.displayName}`,
  },
  description: site.intro,
  applicationName: `${site.displayName} Portfolio`,
  authors: [{ name: site.fullName, url: site.siteUrl }],
  creator: site.fullName,
  keywords: [
    "Malik Fajar",
    "Muhammad Malik Fajar El Syarif",
    "frontend",
    "portfolio",
    "Cimahi",
    "PPLG",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.siteUrl,
    siteName: site.displayName,
    title: `${site.displayName} — ${site.headline}`,
    description: site.intro,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.displayName} — Developer portfolio`,
    description: site.intro,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SparkRoot>{children}</SparkRoot>
      </body>
    </html>
  );
}
