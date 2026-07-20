# chogyejin.io

- chogyejin.io inspired by [leerob.io](https://github.com/leerob/leerob.io)
- Check out [this article](https://chogyejin-io.vercel.app/blog/2024-blog) for the production details!

## How To Run In Local(Node.js v24.15.0)

```bash
git clone https://github.com/chogyejin/chogyejin.io.git
cd chogyejin.io
bun install
bun run dev
```

```bash
bun run build
bun run start
```

## Skills

- Package Manager: [Bun](https://bun.sh/) 1.3.13
- UI Library: [React](https://react.dev/) 19.2.7
- Framework: [Next.js App Router](https://nextjs.org/docs/app) 16.2.10
- Authentication: [Auth.js](https://authjs.dev/) 5.0.0-beta.29
- Styling: [Tailwind CSS](https://tailwindcss.com/) 4.3.2
- Markdown: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) 6.0.0
- Hosting & Deployment: [Vercel](https://vercel.com)(Free plan)

## What's Added

- GitHub shortcut header
- TypeScript [strict mode](https://www.typescriptlang.org/tsconfig/#strict)
- Comments system([giscus](https://giscus.app/))
- Table of contents
- MDX components(`CaptionImage`)
- Front matter(tags for slug)
- Structured data(JSON-LD)

## To Be Added..

- Theme switch
- Scroll indicator
- Front matter(updatedAt, series, ...)
- Korean spell check in PR using [GitHub Actions](https://github.com/features/actions)
- [Feature-Sliced Design](https://feature-sliced.design/) structure
- 개인블로그 .md 지원
