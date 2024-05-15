'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from 'app/utils/cx';
import { usePathname } from 'next/navigation';

export type TocItem = {
  level: 2 | 3;
  text: string;
  id: string;
};

type Props = {
  headings: TocItem[];
};

function getHeaderAnchors() {
  return Array.from(document.getElementsByClassName('anchor')).filter(
    (element): element is HTMLAnchorElement =>
      element.parentNode?.nodeName === 'H2' ||
      element.parentNode?.nodeName === 'H3'
  );
}

const TOP_OFFSET = 20;

function useTocHighlight() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    function updateActiveLink() {
      const pageHeight = document.body.scrollHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
      const headersAnchors = getHeaderAnchors();

      if (scrollPosition >= 0 && pageHeight - scrollPosition <= 0) {
        // Scrolled to end of page.
        setCurrentIndex(headersAnchors.length - 1);
        return;
      }

      // Find index where "top" is greater than offset.
      let index = -1;
      while (index < headersAnchors.length - 1) {
        const headerAnchor = headersAnchors[index + 1];
        const { top } = headerAnchor.getBoundingClientRect();

        if (top >= TOP_OFFSET) {
          break;
        }
        index += 1;
      }

      setCurrentIndex(index);
    }

    function throttledUpdateActiveLink() {
      if (timeoutRef.current === null) {
        timeoutRef.current = window.setTimeout(() => {
          timeoutRef.current = null;
          updateActiveLink();
        }, 100);
      }
    }

    document.addEventListener('scroll', throttledUpdateActiveLink);

    updateActiveLink(); // For first render.

    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      document.removeEventListener('scroll', throttledUpdateActiveLink);
    };
  }, []);

  return {
    currentIndex,
  };
}

function Toc({ headings }: Props) {
  const pathname = usePathname();
  const { currentIndex } = useTocHighlight();

  return (
    <nav
      className={cx(
        'hidden xl:block transition-all text-sm overflow-scroll fixed right-10 w-60 h-full max-h-[calc(100vh-8rem)] break-word',
        currentIndex >= 0 ? 'top-10' : 'top-60'
      )}
    >
      <ul>
        {headings.map(({ level, text, id }, index) => (
          <li key={id}>
            <a
              className={cx(
                'transition-all flex py-1',
                currentIndex === index
                  ? 'font-bold text-neutral-900 dark:text-neutral-200'
                  : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200',
                {
                  'ps-5': level === 3,
                }
              )}
              href={`${pathname}#${id}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Toc;
