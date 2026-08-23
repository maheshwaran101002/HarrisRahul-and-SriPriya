import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import SmoothScrolling from '@/components/SmoothScrolling';
import CustomCursor from '@/components/CustomCursor';
import FloatingHearts from '@/components/FloatingHearts';
import './globals.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Harris Rahul & Sri Priya — Wedding Invitation',
  description: 'Join us to celebrate the wedding of Harris Rahul and Sri Priya on Sunday, 13 September 2026 at Arulmigu Tiruvengadamudayan Temple.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Great+Vibes&family=Playfair+Display:ital,wght@1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${dmSans.variable} font-sans antialiased bg-[#0a0510] text-[#f8f5f0] cinematic-grade`}
      >
        <div className="film-grain" />
        <div className="cinematic-vignette" />
        <CustomCursor />
        <FloatingHearts />
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
