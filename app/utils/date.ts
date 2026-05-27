import { unstable_noStore as noStore } from 'next/cache';

export function getFormattedDate(date: string) {
  noStore();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);
  const fullDate = targetDate.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Seoul',
  });

  return `${fullDate}`;
}

export function getMonthsDiff(date: string) {
  const targetDate = new Date(date);

  const [datePart] = date.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  if (
    targetDate.getFullYear() !== year ||
    targetDate.getMonth() + 1 !== month ||
    targetDate.getDate() !== day
  ) {
    throw new Error(`Invalid date: ${date}`);
  }

  const currentDate = new Date();
  return (
    (currentDate.getFullYear() - targetDate.getFullYear()) * 12 +
    (currentDate.getMonth() - targetDate.getMonth())
  );
}
