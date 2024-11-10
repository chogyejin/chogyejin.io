import Link from 'next/link';
import { Suspense } from 'react';
import { getBlogPosts } from 'app/db/blog';
import { Tags } from 'app/components/tags';
import { getFormattedDate } from 'app/utils/date';
import { TagsViewer } from 'app/components/tags-viewer';

export const metadata = {
  title: '글',
  description: '쉽게 읽히고 유용한 글을 전달하고자 합니다.',
};

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { tag: selectedTag } = await searchParams;
  const allBlogs = getBlogPosts();
  const filteredBlogs = selectedTag
    ? allBlogs.filter(({ metadata }) => metadata.tags?.includes(selectedTag))
    : allBlogs;

  const flattedTags = allBlogs
    .map(({ metadata: { tags } }) => tags ?? [])
    .flat();
  const allTags = [...new Set(flattedTags)];

  return (
    <section>
      <h1 className="font-medium text-2xl mb-2 tracking-tighter">글 목록</h1>
      <TagsViewer className="mb-6" tags={allTags} />
      {filteredBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight mr-3">
                {post.metadata.title}
              </p>
              <Tags tags={post.metadata.tags ?? []} />
              <Suspense fallback={<p className="h-6" />}>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {getFormattedDate(post.metadata.publishedAt)}
                </p>
              </Suspense>
            </div>
          </Link>
        ))}
    </section>
  );
}
