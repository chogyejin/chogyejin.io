'use client';

import { useEffect } from 'react';

const Comments = () => {
  useEffect(() => {
    const script = document.createElement('script');
    const commentsDiv = document.getElementById('comments');

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
    try {
      commentsDiv.appendChild(script);
    } catch (error) {
      console.error('Error while rendering giscus widget.', error);
    }
  }, []);

  return <div id="comments" />;
};

export default Comments;
