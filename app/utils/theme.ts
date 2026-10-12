'use client';

import { useSyncExternalStore } from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';
export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const listeners = new Set<() => void>();
const media =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
let mode: ThemeMode | undefined;

function readMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // The toggle still works for this page when storage is unavailable.
    return mode ?? 'system';
  }
  return 'system';
}

function getMode(): ThemeMode {
  return (mode ??= readMode());
}

function getTheme(): Theme {
  const currentMode = getMode();
  return currentMode === 'system'
    ? media?.matches
      ? 'dark'
      : 'light'
    : currentMode;
}

function updateTheme() {
  const isDark = getTheme() === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.classList.toggle('light', !isDark);
  listeners.forEach((listener) => listener());
}

export function setThemeMode(nextMode: ThemeMode) {
  mode = nextMode;
  try {
    if (mode === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  } catch {
    // Keep the in-memory selection if persistence is blocked.
  }
  updateTheme();
}

function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) {
    return;
  }
  try {
    if (event.storageArea !== localStorage) return;
  } catch {
    return;
  }
  mode = readMode();
  updateTheme();
}

function onSystemChange() {
  if (getMode() === 'system') {
    updateTheme();
  }
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    // A different tab may have changed storage before this component hydrated.
    mode = readMode();
    window.addEventListener('storage', onStorage);
    media?.addEventListener('change', onSystemChange);
    updateTheme();
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener('storage', onStorage);
      media?.removeEventListener('change', onSystemChange);
    }
  };
}

export function useThemeMode() {
  return useSyncExternalStore(subscribe, getMode, () => 'system' as const);
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'light' as const);
}
