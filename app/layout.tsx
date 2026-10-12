import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SandpackCSS } from './blog/[slug]/sandpack';
import { cx } from 'app/utils/cx';

// A plain <script> tag (not next/script) so this runs synchronously while the
// browser parses <head>, before the page content can paint.
const themeInitScript = `
(function () {
  var stored;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  var isDark = stored === 'dark' ||
    (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.classList.toggle('light', !isDark);
})();
`;

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
      suppressHydrationWarning
      className={cx(
        'bg-white text-black dark:bg-[#111010] dark:text-white',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <SandpackCSS />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="mx-4 mt-8 mb-40 flex max-w-2xl flex-col antialiased md:flex-row lg:mx-auto">
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
