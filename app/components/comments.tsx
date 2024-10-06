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
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');

    commentsDiv.appendChild(script);
  }, []);

  return <div id={COMMENT_ID} />;
}
