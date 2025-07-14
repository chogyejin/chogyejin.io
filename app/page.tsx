const OPEN_SOURCES = [
  {
    name: 'Next.js',
    link: 'https://github.com/vercel/next.js/pulls?q=involves%3Achogyejin',
  },
  {
    name: 'TanStack Table',
    link: 'https://github.com/TanStack/table/pulls?q=involves%3Achogyejin',
  },
  {
    name: 'toss Slash Libraries',
    link: 'https://github.com/toss/slash/pulls?q=involves%3Achogyejin',
  },
  {
    name: 'TanStack Query 개념 정리',
    link: 'https://github.com/ssi02014/react-query-tutorial/pulls?q=involves%3Achogyejin',
  },
  {
    name: 'MDN Web Docs',
    link: 'https://github.com/mdn/content/pulls?q=involves%3Achogyejin',
  },
  {
    name: 'Stackflow',
    link: 'https://github.com/daangn/stackflow/pulls?q=involves%3Achogyejin',
  },
  {
    name: 'Next.js Commerce',
    link: 'https://github.com/vercel/commerce/pulls?q=involves%3Achogyejin',
  },
] as const;

const CONTACTS = [
  { name: 'GitHub', link: 'https://github.com/chogyejin' },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/%EA%B3%84%EC%A7%84-%EC%A1%B0-a53248253/',
  },
] as const;

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
        chogyejin.io
      </h1>
      <div className="mb-12">
        <p className="prose prose-neutral dark:prose-invert mb-2">
          세상의 크고 작은 문제를 해결하기 좋아하는 프론트엔드 개발자
          조계진입니다. 조직의 성과에 기여하기 위해 다음과 같은 두 가지 기준을
          지키고자 노력합니다.
        </p>
        <h3 className="font-medium">분할 정복</h3>
        <p className="prose prose-neutral dark:prose-invert mb-2">
          복잡한 문제를 이해하기 쉬운 작은 문제로 분할하고, 각 사례에 대해 모범
          사례(
          <a href="https://en.wikipedia.org/wiki/Best_practice" target="_blank">
            Best practice
          </a>
          )를 적용하여 정복하기 위해 고민합니다. 개발이라는 분야에 있어 완벽한
          정답은 없기 때문에 어떠한 근거를 통해 정답에 가까워지느냐가 중요하다고
          생각합니다.
        </p>
        <h3 className="font-medium">성장</h3>
        <p className="prose prose-neutral dark:prose-invert">
          즐겨했던 카드 게임에서 &quot;아는 만큼 보인다&quot;라는 문장이
          유행했었는데, 이 말처럼 넓은 시야를 가지고 현재에 매몰되지 않게
          노력합니다. 주기적으로 다양한 글과 코드를 접하고 생산적인 토론을
          즐기며 내가 가진 지식을 공유함으로써 개인의 성장이 완성되고, 조직
          성장의 발판이 된다고 생각합니다.
        </p>
      </div>
      <div className="mb-12">
        <h2 className="font-medium text-lg">Open Source Contributions</h2>
        <ul className="list-dash pl-3 text-neutral-900 dark:text-neutral-300">
          {OPEN_SOURCES.map(({ name, link }) => (
            <li key={name}>
              <a href={link} className="hover:underline" target="_blank">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-medium text-lg">Links</h2>
        <ul className="list-dash pl-3 text-neutral-900 dark:text-neutral-300">
          {CONTACTS.map(({ name, link }) => (
            <li key={name}>
              <a href={link} className="hover:underline" target="_blank">
                {name}
              </a>
            </li>
          ))}
          <li>
            <a href="mailto:whrpwls96@naver.com">whrpwls96@naver.com</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
