# chogyejin.io

- chogyejin.io inspired by [leerob.io](https://github.com/leerob/leerob.io)
- Check out [this article](https://chogyejin-io.vercel.app/blog/2024-blog) for the production details!

## How To Run In Local(Node.js v22.17.0)

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

- Package Manager: [Bun](https://bun.sh/) 1.3.5
- UI Library: [React](https://react.dev/) 19.1.0
- Framework: [Next.js App Router](https://nextjs.org/docs/app) 15.3.8
- Authentication: [Auth.js](https://authjs.dev/) 5.0.0-beta.29
- Styling: [Tailwind CSS](https://tailwindcss.com/) 3.4.3
- Markdown: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) 4.4.1
- Hosting & Deployment: [Vercel](https://vercel.com)(Free plan)

## What's Added

- GitHub shortcut header
- TypeScript [strict mode](https://www.typescriptlang.org/tsconfig/#strict)
- Comments system([giscus](https://giscus.app/))
- Table of contents
- MDX components(`CaptionImage`)
- Front matter(tags for slug)

## To Be Added..

- Theme switch
- Scroll indicator
- Front matter(updatedAt, series, ...)
- Korean spell check in PR using [GitHub Actions](https://github.com/features/actions)
- [Feature-Sliced Design](https://feature-sliced.design/) structure
- Structured data
