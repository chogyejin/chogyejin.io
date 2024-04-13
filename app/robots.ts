import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
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
