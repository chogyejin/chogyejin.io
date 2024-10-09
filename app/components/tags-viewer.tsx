'use client';

import { Tags } from 'app/components/tags';
import { cx } from 'app/utils/cx';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function TagsViewer({
  tags,
  className,
}: {
  tags: string[];
  className: string;
}) {
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <button
          className="flex items-center"
          onClick={() => setIsTagsOpen(!isTagsOpen)}
        >
          <span className="font-normal text-xl">태그</span>
          <ArrowIcon
            className={cx('w-6 h-6 transition duration-300', {
              'rotate-180': isTagsOpen,
            })}
          />
        </button>
        {selectedTag && <span># {selectedTag}</span>}
      </div>
      <Tags
        tags={tags}
        className={cx(
          `transition-all duration-300 overflow-hidden ${
            isTagsOpen ? 'max-h-screen' : 'max-h-0'
          }`
        )}
        isAllTags
      />
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
    >
      <path
        d="M12 15a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L12 12.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 12 15z"
        fill="currentColor"
      />
    </svg>
  );
}
