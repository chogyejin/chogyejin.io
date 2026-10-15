// Serialized into the document head: keep this function self-contained.
export function initializeTheme(storageKey: string) {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(storageKey);
  } catch {
    // Fall back to the system preference when storage is unavailable.
  }

  const root = document.documentElement;
  const mode = stored === 'light' || stored === 'dark' ? stored : 'system';
  const isDark =
    mode === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : mode === 'dark';

  root.dataset.themeMode = mode;
  root.classList.toggle('dark', isDark);
  root.classList.toggle('light', !isDark);
}
