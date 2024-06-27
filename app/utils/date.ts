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

export function getFormattedDateWithAgo(date: string) {
  const targetDate = new Date(date);
  const currentDate = new Date();
  let formattedDate = '';

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}년 전`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}달 전`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}일 전`;
  } else {
    formattedDate = '오늘';
  }

  return `${getFormattedDate(date)} (${formattedDate})`;
}
