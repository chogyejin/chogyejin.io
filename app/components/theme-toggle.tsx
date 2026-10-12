'use client';

import { setThemeMode, useThemeMode, type ThemeMode } from 'app/utils/theme';

const MODES = ['system', 'light', 'dark'] as const;

const LABEL: Record<ThemeMode, string> = {
  system: '시스템 테마 사용 중 · 클릭하면 라이트 모드로 전환',
  light: '라이트 모드 사용 중 · 클릭하면 다크 모드로 전환',
  dark: '다크 모드 사용 중 · 클릭하면 시스템 설정을 따름',
};

function SystemIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-6v2.25h2.25a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h2.25V16.5h-6A1.5 1.5 0 0 1 3 15V4.5Zm1.5 0v9h15v-9h-15Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const ICON: Record<ThemeMode, () => React.JSX.Element> = {
  system: SystemIcon,
  light: SunIcon,
  dark: MoonIcon,
};

export function ThemeToggle() {
  const mode = useThemeMode();
  const Icon = ICON[mode];

  return (
    <button
      type="button"
      onClick={() => setThemeMode(MODES[(MODES.indexOf(mode) + 1) % MODES.length])}
      aria-label={LABEL[mode]}
      title={LABEL[mode]}
      className="flex size-8 cursor-pointer items-center justify-center rounded-sm transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:hover:bg-neutral-800"
    >
      <Icon />
    </button>
  );
}
