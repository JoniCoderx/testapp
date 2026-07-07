import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import PwaProvider from '@/components/PwaProvider';
import InstallBanner from '@/components/InstallBanner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE = 'https://marketpulsex.online';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  applicationName: 'MarketPulse X',
  title: 'MarketPulse X — Real-time social signals, market impact decoded by AI',
  description:
    'MarketPulse X tracks posts from the most-followed voices across X, Reddit, YouTube, Bluesky and more, and uses AI to estimate their potential impact on global and crypto markets. Not financial advice.',
  keywords: [
    'market intelligence',
    'social signals',
    'crypto',
    'AI analysis',
    'X posts',
    'market impact',
  ],
  authors: [{ name: 'MarketPulse X' }],
  manifest: '/manifest.webmanifest',
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MarketPulse X',
  },
  openGraph: {
    title: 'MarketPulse X',
    description: 'Real-time social signals. Market impact decoded by AI.',
    url: SITE,
    siteName: 'MarketPulse X',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MarketPulse X' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MarketPulse X',
    description: 'Real-time social signals. Market impact decoded by AI.',
    images: ['/og-image.png'],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#05070d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-[100dvh] bg-base-900 font-sans text-white/90 antialiased">
        <PwaProvider>
          {children}
          <InstallBanner />
        </PwaProvider>
      </body>
    </html>
  );
}
