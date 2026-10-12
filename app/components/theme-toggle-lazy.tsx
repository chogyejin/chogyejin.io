'use client';

import dynamic from 'next/dynamic';

// Rendered purely client-side: the server can't know the stored theme, so
// skipping SSR here avoids ever painting a wrong icon during hydration.
export const ThemeToggle = dynamic(
  () => import('./theme-toggle').then((mod) => mod.ThemeToggle),
  { ssr: false, loading: () => <div className="size-8" aria-hidden="true" /> }
);
