import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SandpackCSS } from './blog/[slug]/sandpack';
import { cx } from 'app/utils/cx';

export const metadata: Metadata = {
  metadataBase: new URL('https://chogyejin-io.vercel.app'),
  title: {
    default: 'chogyejin.io',
    template: '%s | chogyejin.io',
  },
  description: '프론트엔드 개발자 조계진입니다.',
  openGraph: {
    title: 'chogyejin.io',
    description: '프론트엔드 개발자 조계진입니다.',
    url: 'https://chogyejin-io.vercel.app',
    siteName: 'chogyejin.io',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'chogyejin.io',
    card: 'summary_large_image',
  },
  verification: {
    google: 'osWsLfvL2QOsigKqh9mxLTfkls1-Wv2vNo1GD8mIAk0',
    other: {
      'naver-site-verification': 'e87057f2a53827bab8f2d095ccdbc7f70ace5161',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-[#111010]',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <SandpackCSS />
      </head>
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
