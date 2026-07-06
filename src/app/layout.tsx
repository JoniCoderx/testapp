import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  metadataBase: new URL('https://marketpulsex.online'),
  title: 'MarketPulse X — Real-time social signals, market impact decoded by AI',
  description:
    'MarketPulse X tracks posts from the most-followed voices on X and uses AI to estimate their potential impact on global and crypto markets. Not financial advice.',
  keywords: [
    'market intelligence',
    'social signals',
    'crypto',
    'AI analysis',
    'X posts',
    'market impact',
  ],
  authors: [{ name: 'MarketPulse X' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'MarketPulse X',
    description: 'Real-time social signals. Market impact decoded by AI.',
    url: 'https://marketpulsex.online',
    siteName: 'MarketPulse X',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MarketPulse X',
    description: 'Real-time social signals. Market impact decoded by AI.',
  },
};

export const viewport: Viewport = {
  themeColor: '#05070d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-base-900 font-sans text-white/90 antialiased">
        {children}
      </body>
    </html>
  );
}
