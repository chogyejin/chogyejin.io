import type { Metadata } from 'next';
import { Suspense, cache } from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX, slugify } from 'app/components/mdx';
import { getViewsCount } from 'app/db/queries';
import { getBlogPosts } from 'app/db/blog';
import ViewCounter from '../view-counter';
import { increment } from 'app/db/actions';
import Comments from 'app/components/comments';
import Toc, { TocItem } from 'app/blog/[slug]/toc';
import { isDevelopment } from 'app/constants/env';
import { Tags } from 'app/components/tags';
import { getFormattedDateWithAgo } from 'app/utils/date';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);
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

export default async function Blog({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);

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
      <Tags tags={post.metadata.tags ?? []} />
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {getFormattedDateWithAgo(post.metadata.publishedAt)}
          </p>
        </Suspense>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={post.slug} />
        </Suspense>
      </div>
      <Toc headings={headings} />
      <article className="prose prose-quoteless prose-neutral dark:prose-invert mb-10">
        <CustomMDX source={post.content} />
      </article>
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
