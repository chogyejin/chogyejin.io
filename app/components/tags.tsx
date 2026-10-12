'use client';

import { cx } from 'app/utils/cx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function Tags({
  tags,
  className,
  isAllTags,
}: {
  tags: string[];
  className?: string;
  isAllTags?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTag = searchParams.get('tag');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: string
  ) => {
    e.preventDefault();
    if (selectedTag === tag) {
      router.push(pathname);
      return;
    }

    router.push('/blog' + '?' + createQueryString('tag', tag));
  };

  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className={cx('my-1 flex flex-wrap gap-2', className)}>
      {tags.map((tag, index) => (
        <li
          key={index}
          className={cx(
            'truncate rounded-lg border border-gray-400 text-sm transition duration-300 dark:border-gray-600',
            'hover:border-gray-400 hover:bg-white hover:text-gray-400 dark:hover:border-gray-600',
            isAllTags && selectedTag === tag
              ? 'bg-white text-gray-400 dark:bg-white'
              : 'bg-gray-400 text-white dark:bg-gray-600'
          )}
        >
          <button
            className="cursor-pointer px-2"
            onClick={(e) => handleTagClick(e, tag)}
          >
            {tag}
          </button>
        </li>
      ))}
    </ul>
  );
}
