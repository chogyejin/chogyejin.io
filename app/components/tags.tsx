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
    <ul className={cx('flex flex-wrap gap-2 my-1', className)}>
      {tags.map((tag, index) => (
        <li
          key={index}
          className={cx(
            'dark:bg-gray-600',
            'transition duration-300 text-sm truncate rounded-lg border border-gray-400 dark:border-gray-600',
            'hover:bg-white hover:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600',
            isAllTags && selectedTag === tag
              ? 'text-gray-400 bg-white dark:bg-white dark:border-gray-600'
              : 'text-white bg-gray-400'
          )}
        >
          <button className="px-2" onClick={(e) => handleTagClick(e, tag)}>
            {tag}
          </button>
        </li>
      ))}
    </ul>
  );
}
