export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'chogyejin.io',
    alternateName: ['chogyejin', '조계진'],
    url: 'https://chogyejin-io.vercel.app/',
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        프론트엔드 개발자 조계진입니다.
      </h1>
      <p className="prose prose-neutral dark:prose-invert"></p>
    </section>
  );
}
