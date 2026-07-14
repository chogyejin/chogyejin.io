import React from 'react';

type NoticeVariant = 'neutral' | 'danger';

const variantClasses: Record<NoticeVariant, string> = {
  neutral:
    'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100',
  danger: 'border-red-700 bg-red-200 text-red-900',
};

/**
 * Bordered notice box used for callouts and inline error fallbacks.
 * Single source of truth for the box shape; variants only swap colors.
 */
export function NoticeBox({
  variant = 'neutral',
  children,
}: {
  variant?: NoticeVariant;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center mb-8 px-4 py-3 text-sm border rounded-sm ${variantClasses[variant]}`}
    >
      {children}
    </div>
  );
}
