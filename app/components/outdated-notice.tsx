export function OutdatedNotice({ monthsDiff }: { monthsDiff: number }) {
  if (monthsDiff < 12) {
    return null;
  }

  const yearsAgo = Math.round(monthsDiff / 12);

  return (
    <aside className="mb-8 px-4 py-3 border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
      <p className="text-sm text-neutral-900 dark:text-neutral-100">
        ⚠️ 이 글은 약 {yearsAgo}년 전에 작성되었습니다. 일부 정보가 최신 내용과
        다를 수 있습니다.
      </p>
    </aside>
  );
}
