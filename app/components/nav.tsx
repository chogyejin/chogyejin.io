import Image from 'next/image';
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
    <aside className="mb-16 -ml-2 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="relative flex scroll-pr-6 flex-row justify-between px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="relative flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center italic">
            by
            <a href="https://github.com/chogyejin" target="_blank">
              <Image
                alt="chogyejin github avatar"
                src="https://github.com/chogyejin.png"
                width="30"
                height="30"
                className="mx-2 rounded-full border border-gray-200"
              />
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
