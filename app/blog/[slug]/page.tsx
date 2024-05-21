import type { Metadata } from 'next';
import { Suspense, cache } from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX, slugify } from 'app/components/mdx';
import { getViewsCount } from 'app/db/queries';
import { getBlogPosts } from 'app/db/blog';
import ViewCounter from '../view-counter';
import { increment } from 'app/db/actions';
import { unstable_noStore as noStore } from 'next/cache';
import Comments from 'app/components/comments';
import Toc, { TocItem } from 'app/blog/[slug]/toc';
import { isDevelopment } from 'app/constants/env';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? `https://chogyejin-io.vercel.app${image}`
    : `https://chogyejin-io.vercel.app/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://chogyejin-io.vercel.app/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

function formatDate(date: string) {
  noStore();
  const currentDate = new Date();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}년 전`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}달 전`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}일 전`;
  } else {
    formattedDate = '오늘';
  }

  const fullDate = targetDate.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Seoul',
  });

  return `${fullDate} (${formattedDate})`;
}

function hasDuplicates(strArray: string[]) {
  const seen = new Set();

  for (const str of strArray) {
    if (seen.has(str)) {
      return true;
    }
    seen.add(str);
  }

  return false;
}

function extractHeadings(content: string) {
  const lines = content.split('\n');
  const headings: TocItem[] = [];

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      const text = line.replace(/##\s/g, '');
      headings.push({
        level: 2,
        text,
        id: slugify(text),
      });
    } else if (line.startsWith('### ')) {
      const text = line.replace(/###\s/g, '');
      headings.push({
        level: 3,
        text,
        id: slugify(text),
      });
    }
  });

  const textOnlyHeadings = headings.map((ele) => ele.text);
  if (isDevelopment && hasDuplicates(textOnlyHeadings)) {
    console.warn('There are duplicated heading tag texts.');
  }

  return headings;
}

export default function Blog({ params }: Props) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    description: post.metadata.summary,
    image: post.metadata.image
      ? `https://chogyejin-io.vercel.app${post.metadata.image}`
      : `https://chogyejin-io.vercel.app/og?title=${post.metadata.title}`,
    url: `https://chogyejin-io.vercel.app/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: '조계진',
    },
  };

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </Suspense>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={post.slug} />
        </Suspense>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
      <Toc headings={headings} />
      <Comments />
    </section>
  );
}

const incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  const views = await getViewsCount();
  incrementViews(slug);
  return <ViewCounter allViews={views} slug={slug} />;
}
