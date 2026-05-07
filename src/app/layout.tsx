import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, Great_Vibes } from 'next/font/google';
import './globals.css';
import { config } from '@/lib/config';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-display'
});
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-body'
});
const vibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-script'
});

const siteUrl =
  config.shareUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

const description = `Ju presim më ${config.dateLabel} në ${config.venue.name}, mbi Liqenin e Toblinos — Trentino.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${config.bride} & ${config.groom} · ${config.dateLabelShort}`,
  description,
  applicationName: `${config.bride} & ${config.groom}`,
  authors: [{ name: `${config.bride} & ${config.groom}` }],
  keywords: ['dasma', 'wedding', 'martesë', 'Castel Toblino', 'Trentino', config.bride, config.groom],
  openGraph: {
    title: `${config.bride} & ${config.groom} · Dasma`,
    description,
    type: 'website',
    locale: 'sq_AL',
    siteName: `${config.bride} & ${config.groom}`,
    images: [
      {
        url: config.backgroundImage || '/gallery/castle-aerial.png',
        width: 1200,
        height: 630,
        alt: `${config.venue.name} — ${config.venue.region}`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${config.bride} & ${config.groom} · Dasma`,
    description,
    images: [config.backgroundImage || '/gallery/castle-aerial.png']
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0710',
  colorScheme: 'dark'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="sq"
      className={`${cormorant.variable} ${inter.variable} ${vibes.variable}`}
    >
      <body
        className={config.backgroundImage ? 'grain photo-bg' : 'grain'}
        style={
          config.backgroundImage
            ? ({ ['--bg-image' as string]: `url(${config.backgroundImage})` } as React.CSSProperties)
            : undefined
        }
      >
        {children}
      </body>
    </html>
  );
}
