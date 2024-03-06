import { getBlogPosts } from 'app/db/blog';

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `https://leerob.io/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ['', '/blog', '/guestbook', '/uses', '/work'].map((route) => ({
    url: `https://leerob.io${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
