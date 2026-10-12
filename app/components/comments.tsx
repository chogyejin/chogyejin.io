'use client';

import { useEffect } from 'react';

const COMMENT_ID = 'comments';

export default function Comments() {
  useEffect(() => {
    const script = document.createElement('script');
    const commentsDiv = document.getElementById(COMMENT_ID);

    if (!commentsDiv) {
      return;
    }

    const getTheme = () =>
      document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const syncTheme = () => {
      const iframe = commentsDiv.querySelector<HTMLIFrameElement>(
        'iframe.giscus-frame'
      );
      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: getTheme() } } },
        'https://giscus.app'
      );
    };

    script.async = true;
    script.setAttribute('src', 'https://giscus.app/client.js');
    script.setAttribute('data-repo', 'chogyejin/chogyejin.io');
    script.setAttribute('data-repo-id', 'R_kgDOLaEzGQ');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOLaEzGc4CeLRX');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', getTheme());
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    commentsDiv.addEventListener('load', syncTheme, true);
    commentsDiv.appendChild(script);

    return () => {
      observer.disconnect();
      commentsDiv.removeEventListener('load', syncTheme, true);
      commentsDiv.replaceChildren();
    };
  }, []);

  return <div id={COMMENT_ID} />;
}
