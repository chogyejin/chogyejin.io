export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://chogyejin-io.vercel.app/sitemap.xml',
    host: 'https://chogyejin-io.vercel.app',
  };
}
