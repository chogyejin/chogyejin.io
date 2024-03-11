import Link from 'next/link';

const navItems = {
  '/': {
    name: '소개',
  },
  '/blog': {
    name: '글',
  },
  '/guestbook': {
    name: '방명록',
  },
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center italic">
            by
            <a href="https://github.com/chogyejin" target="_blank">
              <img
                alt="chogyejin"
                src="https://github.com/chogyejin.png"
                width="30"
                height="30"
                className="mx-2 rounded-full"
              />
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
